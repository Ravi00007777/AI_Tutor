import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { demoBookingSchema } from "@/lib/validators";
import { notifyDemoBooked } from "@/engines/notification-engine";
import { formatDateTime } from "@/lib/utils";

// POST /api/demo/book — Book a demo class with a teacher
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
    const validation = demoBookingSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: validation.error.errors[0]?.message },
        { status: 400 }
      );
    }

    const { teacherProfileId, subject, scheduledAt, duration } = validation.data;

    // Verify teacher exists and is approved
    const teacher = await prisma.teacherProfile.findUnique({
      where: { id: teacherProfileId },
      include: { user: { select: { id: true, name: true, email: true } } },
    });

    if (!teacher || teacher.status !== "APPROVED") {
      return NextResponse.json(
        { success: false, error: "Teacher not found or not available" },
        { status: 404 }
      );
    }

    // Check if enrollment already exists
    const existingEnrollment = await prisma.enrollment.findFirst({
      where: {
        studentProfileId: session.user.studentProfileId,
        teacherProfileId,
        subject,
        status: { in: ["DEMO_PENDING", "DEMO_COMPLETED", "ACTIVE"] },
      },
    });

    if (existingEnrollment) {
      return NextResponse.json(
        { success: false, error: "You already have a demo or active enrollment with this teacher for this subject" },
        { status: 409 }
      );
    }

    // Check for scheduling conflicts
    const scheduledDate = new Date(scheduledAt);
    const endTime = new Date(scheduledDate.getTime() + (duration || 30) * 60000);

    const teacherConflict = await prisma.scheduledClass.findFirst({
      where: {
        teacherProfileId,
        scheduledAt: { gte: scheduledDate, lt: endTime },
        status: { in: ["SCHEDULED", "IN_PROGRESS"] },
      },
    });

    const demoConflict = await prisma.demoClass.findFirst({
      where: {
        teacherProfileId,
        scheduledAt: { gte: scheduledDate, lt: endTime },
        status: "SCHEDULED",
      },
    });

    if (teacherConflict || demoConflict) {
      return NextResponse.json(
        { success: false, error: "Teacher has a scheduling conflict at this time. Please choose another slot." },
        { status: 409 }
      );
    }

    // Create enrollment and demo class in a transaction
    const result = await prisma.$transaction(async (tx) => {
      const enrollment = await tx.enrollment.create({
        data: {
          studentProfileId: session.user.studentProfileId!,
          teacherProfileId,
          subject,
          status: "DEMO_PENDING",
        },
      });

      const demoClass = await tx.demoClass.create({
        data: {
          enrollmentId: enrollment.id,
          studentProfileId: session.user.studentProfileId!,
          teacherProfileId,
          scheduledAt: scheduledDate,
          duration: duration || 30,
          status: "SCHEDULED",
          // Google Calendar event + Meet link would be created here
          // when teacher has Google Calendar connected
          meetLink: `https://meet.google.com/demo-${enrollment.id.slice(0, 8)}`,
        },
      });

      return { enrollment, demoClass };
    });

    // Notify teacher
    await notifyDemoBooked(
      teacher.user.id,
      session.user.name || "A student",
      subject,
      formatDateTime(scheduledAt)
    );

    return NextResponse.json({
      success: true,
      data: {
        enrollmentId: result.enrollment.id,
        demoClassId: result.demoClass.id,
        scheduledAt: result.demoClass.scheduledAt,
        meetLink: result.demoClass.meetLink,
      },
      message: "Demo class booked successfully!",
    }, { status: 201 });
  } catch (error) {
    console.error("Demo booking error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to book demo class" },
      { status: 500 }
    );
  }
}

// GET /api/demo/book — List student's demo classes
export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }

    const where = session.user.studentProfileId
      ? { studentProfileId: session.user.studentProfileId }
      : session.user.teacherProfileId
      ? { teacherProfileId: session.user.teacherProfileId }
      : {};

    const demoClasses = await prisma.demoClass.findMany({
      where,
      include: {
        studentProfile: {
          include: { user: { select: { name: true, avatarUrl: true, email: true } } },
        },
        teacherProfile: {
          include: { user: { select: { name: true, avatarUrl: true, email: true } } },
        },
        feedbacks: true,
        enrollment: { select: { subject: true, status: true } },
      },
      orderBy: { scheduledAt: "desc" },
    });

    return NextResponse.json({ success: true, data: demoClasses });
  } catch (error) {
    console.error("Demo list error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch demo classes" },
      { status: 500 }
    );
  }
}
