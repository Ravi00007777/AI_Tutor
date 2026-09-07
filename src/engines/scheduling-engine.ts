import prisma from "@/lib/prisma";
import { timeToMinutes, minutesToTime } from "@/lib/utils";
import {
  addDays,
  addWeeks,
  format,
  isAfter,
  isBefore,
  isSameDay,
  parseISO,
  setHours,
  setMinutes,
  startOfDay,
} from "date-fns";
import type { DayOfWeek } from "@prisma/client";

/**
 * Automated Scheduling Engine
 *
 * Finds optimal recurring class schedules considering both
 * student and teacher availability, existing bookings, holidays,
 * and scoring for consistency and workload balance.
 */

interface ScheduleInput {
  enrollmentId: string;
  studentProfileId: string;
  teacherProfileId: string;
  classesPerWeek: number;
  classDuration: number; // minutes
  startDate: Date;
  weeksAhead?: number;
}

interface ScheduleSlot {
  dayOfWeek: DayOfWeek;
  startTime: string; // HH:mm
  endTime: string; // HH:mm
}

interface ScheduleResult {
  success: boolean;
  schedule: GeneratedClass[];
  recurringSlots: ScheduleSlot[];
  score: number;
  message: string;
  alternatives?: {
    schedule: GeneratedClass[];
    recurringSlots: ScheduleSlot[];
    score: number;
    issue: string;
  }[];
}

interface GeneratedClass {
  scheduledAt: Date;
  duration: number;
  dayOfWeek: string;
  startTime: string;
}

const DAY_MAP: Record<string, number> = {
  SUNDAY: 0,
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
};

const BUFFER_MINUTES = 15; // Minimum gap between classes

export async function generateSchedule(input: ScheduleInput): Promise<ScheduleResult> {
  const {
    enrollmentId,
    studentProfileId,
    teacherProfileId,
    classesPerWeek,
    classDuration,
    startDate,
    weeksAhead = 4,
  } = input;

  // 1. Fetch availability for both parties
  const [teacherAvailability, studentAvailability, existingClasses, holidays] =
    await Promise.all([
      prisma.teacherAvailability.findMany({
        where: { teacherProfileId, isAvailable: true, isRecurring: true },
      }),
      prisma.studentAvailability.findMany({
        where: { studentProfileId },
      }),
      prisma.scheduledClass.findMany({
        where: {
          OR: [{ teacherProfileId }, { studentProfileId }],
          scheduledAt: {
            gte: startDate,
            lte: addWeeks(startDate, weeksAhead),
          },
          status: { in: ["SCHEDULED", "IN_PROGRESS"] },
        },
      }),
      prisma.holiday.findMany({
        where: {
          date: {
            gte: startDate,
            lte: addWeeks(startDate, weeksAhead),
          },
        },
      }),
    ]);

  // 2. Find overlapping time slots
  const overlappingSlots = findOverlappingSlots(
    teacherAvailability,
    studentAvailability,
    classDuration
  );

  if (overlappingSlots.length === 0) {
    return {
      success: false,
      schedule: [],
      recurringSlots: [],
      score: 0,
      message:
        "No overlapping availability found between student and teacher. Please adjust availability.",
    };
  }

  // 3. Generate candidate schedules
  const candidates = generateCandidates(overlappingSlots, classesPerWeek);

  if (candidates.length === 0) {
    return {
      success: false,
      schedule: [],
      recurringSlots: [],
      score: 0,
      message: `Could not find ${classesPerWeek} compatible slots per week. Please increase availability or reduce class frequency.`,
    };
  }

  // 4. Score each candidate
  const scoredCandidates = candidates.map((candidate) => ({
    slots: candidate,
    score: scoreSchedule(candidate, teacherAvailability, existingClasses, classDuration),
  }));

  // Sort by score descending
  scoredCandidates.sort((a, b) => b.score - a.score);

  // 5. Generate actual class instances for the best candidate
  const bestCandidate = scoredCandidates[0];
  const holidayDates = holidays.map((h) => h.date);

  const classes = generateClassInstances(
    bestCandidate.slots,
    classDuration,
    startDate,
    weeksAhead,
    existingClasses,
    holidayDates
  );

  // 6. Prepare alternatives
  const alternatives = scoredCandidates.slice(1, 4).map((alt) => ({
    schedule: generateClassInstances(
      alt.slots,
      classDuration,
      startDate,
      weeksAhead,
      existingClasses,
      holidayDates
    ),
    recurringSlots: alt.slots,
    score: alt.score,
    issue: alt.score < bestCandidate.score * 0.8
      ? "Significantly lower compatibility"
      : "Slightly less optimal timing",
  }));

  return {
    success: true,
    schedule: classes,
    recurringSlots: bestCandidate.slots,
    score: bestCandidate.score,
    message: `Found optimal schedule: ${bestCandidate.slots
      .map((s) => `${s.dayOfWeek} ${s.startTime}`)
      .join(", ")}`,
    alternatives: alternatives.length > 0 ? alternatives : undefined,
  };
}

/**
 * Find time windows where both teacher and student are available
 */
function findOverlappingSlots(
  teacherSlots: { dayOfWeek: DayOfWeek; startTime: string; endTime: string }[],
  studentSlots: { dayOfWeek: DayOfWeek; startTime: string; endTime: string }[],
  classDuration: number
): ScheduleSlot[] {
  const overlaps: ScheduleSlot[] = [];

  for (const tSlot of teacherSlots) {
    for (const sSlot of studentSlots) {
      if (tSlot.dayOfWeek !== sSlot.dayOfWeek) continue;

      // Find overlap window
      const overlapStart = Math.max(
        timeToMinutes(tSlot.startTime),
        timeToMinutes(sSlot.startTime)
      );
      const overlapEnd = Math.min(
        timeToMinutes(tSlot.endTime),
        timeToMinutes(sSlot.endTime)
      );

      // Check if overlap is enough for a class
      if (overlapEnd - overlapStart >= classDuration) {
        // Generate possible start times within this window (30-min increments)
        for (let start = overlapStart; start + classDuration <= overlapEnd; start += 30) {
          overlaps.push({
            dayOfWeek: tSlot.dayOfWeek,
            startTime: minutesToTime(start),
            endTime: minutesToTime(start + classDuration),
          });
        }
      }
    }
  }

  return overlaps;
}

/**
 * Generate all possible combinations of N slots per week
 */
function generateCandidates(
  slots: ScheduleSlot[],
  classesPerWeek: number
): ScheduleSlot[][] {
  if (classesPerWeek > slots.length) return [];

  const results: ScheduleSlot[][] = [];

  function combine(start: number, current: ScheduleSlot[]) {
    if (current.length === classesPerWeek) {
      // Ensure slots are on different days (avoid 2 classes on same day)
      const days = new Set(current.map((s) => s.dayOfWeek));
      if (days.size === classesPerWeek) {
        results.push([...current]);
      }
      return;
    }

    // Limit combinations to avoid explosion
    if (results.length >= 50) return;

    for (let i = start; i < slots.length; i++) {
      current.push(slots[i]);
      combine(i + 1, current);
      current.pop();
    }
  }

  combine(0, []);
  return results;
}

/**
 * Score a candidate schedule (0–100)
 */
function scoreSchedule(
  slots: ScheduleSlot[],
  teacherAvailability: { dayOfWeek: DayOfWeek; startTime: string; endTime: string }[],
  existingClasses: { scheduledAt: Date; duration: number }[],
  classDuration: number
): number {
  let score = 100;

  // Penalty for inconsistent timing (variance in start times)
  const startMinutes = slots.map((s) => timeToMinutes(s.startTime));
  const avgStart = startMinutes.reduce((a, b) => a + b, 0) / startMinutes.length;
  const variance =
    startMinutes.reduce((sum, t) => sum + Math.pow(t - avgStart, 2), 0) /
    startMinutes.length;
  const consistencyPenalty = Math.min(variance / 100, 20);
  score -= consistencyPenalty;

  // Bonus for evenly spaced days
  const dayNumbers = slots.map((s) => DAY_MAP[s.dayOfWeek]).sort((a, b) => a - b);
  if (dayNumbers.length >= 2) {
    const idealGap = 7 / dayNumbers.length;
    let gapVariance = 0;
    for (let i = 1; i < dayNumbers.length; i++) {
      const gap = dayNumbers[i] - dayNumbers[i - 1];
      gapVariance += Math.pow(gap - idealGap, 2);
    }
    const spacingPenalty = Math.min(gapVariance * 3, 15);
    score -= spacingPenalty;
  }

  // Penalty for slots close to teacher availability edges (prefer middle of window)
  for (const slot of slots) {
    const matching = teacherAvailability.find(
      (a) => a.dayOfWeek === slot.dayOfWeek
    );
    if (matching) {
      const windowSize =
        timeToMinutes(matching.endTime) - timeToMinutes(matching.startTime);
      const slotStart = timeToMinutes(slot.startTime) - timeToMinutes(matching.startTime);
      const distFromCenter = Math.abs(slotStart - windowSize / 2) / windowSize;
      score -= distFromCenter * 5;
    }
  }

  return Math.max(0, Math.round(score));
}

/**
 * Generate actual class dates from recurring slots
 */
function generateClassInstances(
  recurringSlots: ScheduleSlot[],
  classDuration: number,
  startDate: Date,
  weeksAhead: number,
  existingClasses: { scheduledAt: Date; duration: number }[],
  holidays: Date[]
): GeneratedClass[] {
  const classes: GeneratedClass[] = [];
  const endDate = addWeeks(startDate, weeksAhead);

  for (let week = 0; week < weeksAhead; week++) {
    for (const slot of recurringSlots) {
      const targetDay = DAY_MAP[slot.dayOfWeek];
      // Find the date for this day of week in this week
      const weekStart = addWeeks(startDate, week);
      let classDate = startOfDay(weekStart);

      // Adjust to the correct day of week
      const currentDay = classDate.getDay();
      const dayDiff = (targetDay - currentDay + 7) % 7;
      classDate = addDays(classDate, dayDiff);

      // Skip if before start date or after end date
      if (isBefore(classDate, startOfDay(startDate)) || isAfter(classDate, endDate)) {
        continue;
      }

      // Skip holidays
      if (holidays.some((h) => isSameDay(h, classDate))) {
        continue;
      }

      // Set the time
      const [hours, minutes] = slot.startTime.split(":").map(Number);
      const scheduledAt = setMinutes(setHours(classDate, hours), minutes);

      // Check for conflicts with existing classes
      const hasConflict = existingClasses.some((existing) => {
        const existingEnd = new Date(
          existing.scheduledAt.getTime() + existing.duration * 60000
        );
        const newEnd = new Date(scheduledAt.getTime() + classDuration * 60000);

        // Add buffer
        const bufferedExistingEnd = new Date(
          existingEnd.getTime() + BUFFER_MINUTES * 60000
        );
        const bufferedNewEnd = new Date(newEnd.getTime() + BUFFER_MINUTES * 60000);

        return (
          (scheduledAt >= existing.scheduledAt && scheduledAt < bufferedExistingEnd) ||
          (bufferedNewEnd > existing.scheduledAt && scheduledAt < existing.scheduledAt)
        );
      });

      if (!hasConflict) {
        classes.push({
          scheduledAt,
          duration: classDuration,
          dayOfWeek: slot.dayOfWeek,
          startTime: slot.startTime,
        });
      }
    }
  }

  return classes.sort((a, b) => a.scheduledAt.getTime() - b.scheduledAt.getTime());
}

/**
 * Create scheduled classes in the database and return them
 */
export async function createScheduledClasses(
  enrollmentId: string,
  teacherProfileId: string,
  studentProfileId: string,
  subject: string,
  classes: GeneratedClass[]
) {
  const created = await prisma.scheduledClass.createMany({
    data: classes.map((cls) => ({
      enrollmentId,
      teacherProfileId,
      studentProfileId,
      subject,
      scheduledAt: cls.scheduledAt,
      duration: cls.duration,
      status: "SCHEDULED",
    })),
  });

  return created;
}

/**
 * Check for scheduling conflicts before creating a class
 */
export async function checkConflicts(
  teacherProfileId: string,
  studentProfileId: string,
  scheduledAt: Date,
  duration: number
): Promise<{ hasConflict: boolean; conflictWith?: string }> {
  const classEnd = new Date(scheduledAt.getTime() + duration * 60000);
  const bufferStart = new Date(scheduledAt.getTime() - BUFFER_MINUTES * 60000);
  const bufferEnd = new Date(classEnd.getTime() + BUFFER_MINUTES * 60000);

  // Check teacher conflicts
  const teacherConflict = await prisma.scheduledClass.findFirst({
    where: {
      teacherProfileId,
      status: { in: ["SCHEDULED", "IN_PROGRESS"] },
      scheduledAt: { gte: bufferStart, lt: bufferEnd },
    },
    include: { studentProfile: { include: { user: { select: { name: true } } } } },
  });

  if (teacherConflict) {
    return {
      hasConflict: true,
      conflictWith: `Teacher has a class with ${teacherConflict.studentProfile.user.name} at this time`,
    };
  }

  // Check student conflicts
  const studentConflict = await prisma.scheduledClass.findFirst({
    where: {
      studentProfileId,
      status: { in: ["SCHEDULED", "IN_PROGRESS"] },
      scheduledAt: { gte: bufferStart, lt: bufferEnd },
    },
  });

  if (studentConflict) {
    return {
      hasConflict: true,
      conflictWith: "Student already has a class at this time",
    };
  }

  return { hasConflict: false };
}
