import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { generateSchedule, createScheduledClasses } from "@/engines/scheduling-engine";
import { scheduleRequestSchema } from "@/lib/validators";
import prisma from "@/lib/prisma";

// POST /api/scheduling — Generate and create a recurring schedule
export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validation = scheduleRequestSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: validation.error.errors[0]?.message },
        { status: 400 }
      );
    }

    const { enrollmentId, startDate, weeksAhead } = validation.data;

    // Fetch enrollment details
    const enrollment = await prisma.enrollment.findUnique({
      where: { id: enrollmentId },
      include: {
        studentProfile: true,
        teacherProfile: true,
      },
    });

    if (!enrollment) {
      return NextResponse.json(
        { success: false, error: "Enrollment not found" },
        { status: 404 }
      );
    }

    // Verify the user is authorized (student, teacher, or admin)
    const isAuthorized =
      session.user.role === "ADMIN" ||
      session.user.studentProfileId === enrollment.studentProfileId ||
      session.user.teacherProfileId === enrollment.teacherProfileId;

    if (!isAuthorized) {
      return NextResponse.json(
        { success: false, error: "Not authorized for this enrollment" },
        { status: 403 }
      );
    }

    // Generate schedule
    const result = await generateSchedule({
      enrollmentId,
      studentProfileId: enrollment.studentProfileId,
      teacherProfileId: enrollment.teacherProfileId,
      classesPerWeek: enrollment.classesPerWeek,
      classDuration: enrollment.classDuration,
      startDate: new Date(startDate),
      weeksAhead,
    });

    if (!result.success) {
      return NextResponse.json({
        success: false,
        error: result.message,
        alternatives: result.alternatives,
      }, { status: 422 });
    }

    // Create scheduled classes in the database
    if (body.confirm) {
      const created = await createScheduledClasses(
        enrollmentId,
        enrollment.teacherProfileId,
        enrollment.studentProfileId,
        enrollment.subject,
        result.schedule
      );

      return NextResponse.json({
        success: true,
        data: {
          classesCreated: created.count,
          recurringSlots: result.recurringSlots,
          schedule: result.schedule,
          score: result.score,
        },
        message: result.message,
      });
    }

    // Preview mode — return schedule without creating
    return NextResponse.json({
      success: true,
      data: {
        preview: true,
        recurringSlots: result.recurringSlots,
        schedule: result.schedule,
        score: result.score,
        alternatives: result.alternatives,
      },
      message: result.message,
    });
  } catch (error) {
    console.error("Scheduling error:", error);
    return NextResponse.json(
      { success: false, error: "Scheduling failed" },
      { status: 500 }
    );
  }
}
