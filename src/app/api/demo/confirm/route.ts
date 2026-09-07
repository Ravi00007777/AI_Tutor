import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { generateSchedule, createScheduledClasses } from "@/engines/scheduling-engine";

// POST /api/demo/confirm — Confirm teacher after demo, triggers automatic scheduling
export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user || !session.user.studentProfileId) {
      return NextResponse.json(
        { success: false, error: "Student authentication required" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { enrollmentId, classesPerWeek, classDuration, monthlyFee } = body;

    if (!enrollmentId) {
      return NextResponse.json(
        { success: false, error: "Enrollment ID is required" },
        { status: 400 }
      );
    }

    // Fetch enrollment
    const enrollment = await prisma.enrollment.findUnique({
      where: { id: enrollmentId },
      include: {
        teacherProfile: {
          include: { user: { select: { id: true, name: true } } },
        },
        studentProfile: true,
      },
    });

    if (!enrollment) {
      return NextResponse.json(
        { success: false, error: "Enrollment not found" },
        { status: 404 }
      );
    }

    if (enrollment.studentProfileId !== session.user.studentProfileId) {
      return NextResponse.json(
        { success: false, error: "Not authorized" },
        { status: 403 }
      );
    }

    if (enrollment.status !== "DEMO_COMPLETED") {
      return NextResponse.json(
        { success: false, error: "Demo must be completed before confirming teacher" },
        { status: 400 }
      );
    }

    // Activate enrollment
    const updatedEnrollment = await prisma.enrollment.update({
      where: { id: enrollmentId },
      data: {
        status: "ACTIVE",
        classesPerWeek: classesPerWeek || 3,
        classDuration: classDuration || 60,
        monthlyFee: monthlyFee || enrollment.teacherProfile.monthlyRate,
        startDate: new Date(),
      },
    });

    // Increment teacher's student count
    await prisma.teacherProfile.update({
      where: { id: enrollment.teacherProfileId },
      data: { currentStudents: { increment: 1 } },
    });

    // Auto-generate schedule
    const scheduleResult = await generateSchedule({
      enrollmentId,
      studentProfileId: enrollment.studentProfileId,
      teacherProfileId: enrollment.teacherProfileId,
      classesPerWeek: classesPerWeek || 3,
      classDuration: classDuration || 60,
      startDate: new Date(),
      weeksAhead: 4,
    });

    let classesCreated = 0;
    if (scheduleResult.success && scheduleResult.schedule.length > 0) {
      const result = await createScheduledClasses(
        enrollmentId,
        enrollment.teacherProfileId,
        enrollment.studentProfileId,
        enrollment.subject,
        scheduleResult.schedule
      );
      classesCreated = result.count;
    }

    // Notify teacher
    await prisma.notification.create({
      data: {
        userId: enrollment.teacherProfile.user.id,
        title: "New Student Confirmed! 🎉",
        message: `A student has confirmed you as their ${enrollment.subject} teacher. ${classesCreated} classes have been automatically scheduled.`,
        type: "SYSTEM",
        actionUrl: "/teacher/students",
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        enrollment: updatedEnrollment,
        scheduleCreated: scheduleResult.success,
        classesCreated,
        recurringSlots: scheduleResult.recurringSlots,
        scheduleMessage: scheduleResult.message,
      },
      message: scheduleResult.success
        ? `Teacher confirmed and ${classesCreated} classes scheduled automatically!`
        : "Teacher confirmed. Schedule could not be auto-generated — please set up availability.",
    });
  } catch (error) {
    console.error("Confirm teacher error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to confirm teacher" },
      { status: 500 }
    );
  }
}
