import prisma from "@/lib/prisma";
import type { MatchScore } from "@/types";
import type { StudentProfile, TeacherProfile } from "@prisma/client";

/**
 * Smart Teacher Matching Engine
 *
 * Calculates a compatibility score (0–100) between a student and
 * available teachers based on multiple weighted factors.
 */

interface MatchingInput {
  studentProfileId: string;
  subject?: string;
  limit?: number;
}

interface TeacherWithAvailability extends TeacherProfile {
  user: { name: string; avatarUrl: string | null };
  availability: {
    dayOfWeek: string;
    startTime: string;
    endTime: string;
    isAvailable: boolean;
  }[];
  _count: { enrollments: number; reviews: number };
}

const WEIGHTS = {
  subjectMatch: 20,
  gradeMatch: 15,
  boardMatch: 10,
  budgetMatch: 15,
  availabilityMatch: 15,
  languageMatch: 5,
  ratingScore: 10,
  experienceScore: 5,
  workloadScore: 5,
};

export async function findMatchingTeachers(
  input: MatchingInput
): Promise<MatchScore[]> {
  const { studentProfileId, subject, limit = 10 } = input;

  // 1. Fetch student profile with availability
  const student = await prisma.studentProfile.findUnique({
    where: { id: studentProfileId },
    include: {
      availability: true,
    },
  });

  if (!student) {
    throw new Error("Student profile not found");
  }

  // 2. Fetch approved teachers with profiles
  const teachers = await prisma.teacherProfile.findMany({
    where: {
      status: "APPROVED",
      isApproved: true,
      user: { isActive: true },
      ...(subject ? { subjects: { has: subject } } : {}),
    },
    include: {
      user: { select: { name: true, avatarUrl: true } },
      availability: {
        where: { isAvailable: true },
      },
      _count: {
        select: { enrollments: true, reviews: true },
      },
    },
  });

  // 3. Score each teacher
  const scores: MatchScore[] = teachers.map((teacher) =>
    calculateMatchScore(student, teacher as TeacherWithAvailability, subject)
  );

  // 4. Sort by score descending and limit
  return scores
    .sort((a, b) => b.overallScore - a.overallScore)
    .slice(0, limit);
}

function calculateMatchScore(
  student: StudentProfile & { availability: { dayOfWeek: string; startTime: string; endTime: string }[] },
  teacher: TeacherWithAvailability,
  preferredSubject?: string
): MatchScore {
  const breakdown = {
    subjectMatch: 0,
    gradeMatch: 0,
    boardMatch: 0,
    budgetMatch: 0,
    availabilityMatch: 0,
    languageMatch: 0,
    ratingScore: 0,
    experienceScore: 0,
    workloadScore: 0,
  };
  const reasons: string[] = [];

  // --- Subject Match (20 pts) ---
  const studentSubjects = student.subjects || [];
  const teacherSubjects = teacher.subjects || [];
  if (preferredSubject && teacherSubjects.includes(preferredSubject)) {
    breakdown.subjectMatch = WEIGHTS.subjectMatch;
    reasons.push(`Teaches ${preferredSubject}`);
  } else {
    const overlap = studentSubjects.filter((s) => teacherSubjects.includes(s));
    const ratio = studentSubjects.length > 0 ? overlap.length / studentSubjects.length : 0;
    breakdown.subjectMatch = Math.round(ratio * WEIGHTS.subjectMatch);
    if (overlap.length > 0) {
      reasons.push(`Teaches ${overlap.join(", ")}`);
    }
  }

  // --- Grade Match (15 pts) ---
  if (student.grade && teacher.grades.includes(student.grade)) {
    breakdown.gradeMatch = WEIGHTS.gradeMatch;
    reasons.push(`Experienced with ${student.grade} grade`);
  }

  // --- Board Match (10 pts) ---
  if (student.board && teacher.boards.includes(student.board)) {
    breakdown.boardMatch = WEIGHTS.boardMatch;
    reasons.push(`${student.board} curriculum expert`);
  }

  // --- Budget Match (15 pts) ---
  if (student.monthlyBudget && teacher.monthlyRate) {
    if (teacher.monthlyRate <= student.monthlyBudget) {
      breakdown.budgetMatch = WEIGHTS.budgetMatch;
      reasons.push("Within your budget");
    } else if (teacher.monthlyRate <= student.monthlyBudget * 1.2) {
      breakdown.budgetMatch = Math.round(WEIGHTS.budgetMatch * 0.6);
      reasons.push("Slightly above budget");
    }
  } else {
    // No budget constraint — full score
    breakdown.budgetMatch = WEIGHTS.budgetMatch;
  }

  // --- Availability Match (15 pts) ---
  const studentAvail = student.availability || [];
  const teacherAvail = teacher.availability || [];
  if (studentAvail.length > 0 && teacherAvail.length > 0) {
    let overlappingDays = 0;
    const studentDays = studentAvail.map((a) => a.dayOfWeek);
    const teacherDays = teacherAvail.map((a) => a.dayOfWeek);
    const commonDays = studentDays.filter((d) => teacherDays.includes(d));
    overlappingDays = commonDays.length;

    const ratio = studentDays.length > 0 ? overlappingDays / studentDays.length : 0;
    breakdown.availabilityMatch = Math.round(Math.min(ratio, 1) * WEIGHTS.availabilityMatch);
    if (overlappingDays > 0) {
      reasons.push(`Available on ${overlappingDays} of your preferred days`);
    }
  } else {
    breakdown.availabilityMatch = Math.round(WEIGHTS.availabilityMatch * 0.5);
  }

  // --- Language Match (5 pts) ---
  const studentLang = student.preferredLanguage;
  if (studentLang && teacher.languages.includes(studentLang)) {
    breakdown.languageMatch = WEIGHTS.languageMatch;
    reasons.push(`Teaches in ${studentLang}`);
  }

  // --- Rating Score (10 pts) ---
  if (teacher.totalReviews > 0) {
    breakdown.ratingScore = Math.round((teacher.rating / 5) * WEIGHTS.ratingScore);
    if (teacher.rating >= 4.5) {
      reasons.push(`Highly rated (${teacher.rating}/5)`);
    } else if (teacher.rating >= 4.0) {
      reasons.push(`Well rated (${teacher.rating}/5)`);
    }
  } else {
    breakdown.ratingScore = Math.round(WEIGHTS.ratingScore * 0.5); // New teacher bonus
  }

  // --- Experience Score (5 pts) ---
  const expYears = teacher.experienceYears || 0;
  if (expYears >= 5) {
    breakdown.experienceScore = WEIGHTS.experienceScore;
    reasons.push(`${expYears} years experience`);
  } else if (expYears >= 2) {
    breakdown.experienceScore = Math.round(WEIGHTS.experienceScore * 0.7);
    reasons.push(`${expYears} years experience`);
  } else {
    breakdown.experienceScore = Math.round(WEIGHTS.experienceScore * 0.4);
  }

  // --- Workload Score (5 pts) ---
  const capacityUsed = teacher.currentStudents / teacher.maxStudents;
  if (capacityUsed < 0.5) {
    breakdown.workloadScore = WEIGHTS.workloadScore;
    reasons.push("Has availability for new students");
  } else if (capacityUsed < 0.8) {
    breakdown.workloadScore = Math.round(WEIGHTS.workloadScore * 0.6);
  } else if (capacityUsed < 1) {
    breakdown.workloadScore = Math.round(WEIGHTS.workloadScore * 0.3);
    reasons.push("Limited availability");
  } else {
    breakdown.workloadScore = 0;
    reasons.push("At full capacity");
  }

  // --- Calculate Overall ---
  const overallScore = Object.values(breakdown).reduce((sum, v) => sum + v, 0);

  return {
    teacherId: teacher.id,
    overallScore,
    breakdown,
    reasons,
  };
}

/**
 * Get full teacher details with match score for display
 */
export async function getRecommendedTeachers(studentProfileId: string, subject?: string) {
  const scores = await findMatchingTeachers({
    studentProfileId,
    subject,
    limit: 20,
  });

  // Fetch full teacher details for display
  const teacherIds = scores.map((s) => s.teacherId);
  const teachers = await prisma.teacherProfile.findMany({
    where: { id: { in: teacherIds } },
    include: {
      user: { select: { name: true, avatarUrl: true } },
      _count: { select: { enrollments: true, reviews: true } },
    },
  });

  // Merge teacher data with scores
  return scores.map((score) => {
    const teacher = teachers.find((t) => t.id === score.teacherId)!;
    return {
      ...score,
      teacher: {
        id: teacher.id,
        userId: teacher.userId,
        name: teacher.user.name,
        avatarUrl: teacher.user.avatarUrl,
        bio: teacher.bio,
        subjects: teacher.subjects,
        grades: teacher.grades,
        boards: teacher.boards,
        languages: teacher.languages,
        experienceYears: teacher.experienceYears,
        hourlyRate: teacher.hourlyRate,
        monthlyRate: teacher.monthlyRate,
        rating: teacher.rating,
        totalReviews: teacher.totalReviews,
        currentStudents: teacher.currentStudents,
        maxStudents: teacher.maxStudents,
        isVerified: teacher.isVerified,
        teachingStyle: teacher.teachingStyle,
      },
    };
  });
}
