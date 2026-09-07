import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { assignmentSchema } from "@/lib/validators";
import { notifyAssignmentCreated } from "@/engines/notification-engine";
import { formatDate } from "@/lib/utils";

// GET /api/assignments — List assignments (role-aware)
export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ success: false, error: "Auth required" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const subject = searchParams.get("subject");
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "20");

    const where: Record<string, unknown> = {};

    if (session.user.role === "STUDENT" && session.user.studentProfileId) {
      where.studentProfileId = session.user.studentProfileId;
    } else if (session.user.role === "TEACHER" && session.user.teacherProfileId) {
      where.teacherProfileId = session.user.teacherProfileId;
    }

    if (status) where.status = status;
    if (subject) where.subject = subject;

    const [assignments, total] = await Promise.all([
      prisma.assignment.findMany({
        where: where as Parameters<typeof prisma.assignment.findMany>[0] extends { where?: infer W } ? W : never,
        include: {
          teacherProfile: {
            include: { user: { select: { name: true, avatarUrl: true } } },
          },
          studentProfile: {
            include: { user: { select: { name: true, avatarUrl: true } } },
          },
          submission: true,
          enrollment: { select: { subject: true } },
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.assignment.count({
        where: where as Parameters<typeof prisma.assignment.count>[0] extends { where?: infer W } ? W : never,
      }),
    ]);

    return NextResponse.json({
      success: true,
      data: assignments,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    });
  } catch (error) {
    console.error("List assignments error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch assignments" }, { status: 500 });
  }
}

// POST /api/assignments — Create assignment (teacher only)
export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "TEACHER" || !session.user.teacherProfileId) {
      return NextResponse.json({ success: false, error: "Teacher auth required" }, { status: 403 });
    }

    const body = await request.json();
    const validation = assignmentSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: validation.error.errors[0]?.message },
        { status: 400 }
      );
    }

    const data = validation.data;

    // Verify enrollment exists and teacher owns it
    const enrollment = await prisma.enrollment.findFirst({
      where: {
        id: data.enrollmentId,
        teacherProfileId: session.user.teacherProfileId,
        status: "ACTIVE",
      },
      include: {
        studentProfile: {
          include: { user: { select: { id: true, name: true } } },
        },
      },
    });

    if (!enrollment) {
      return NextResponse.json(
        { success: false, error: "Active enrollment not found" },
        { status: 404 }
      );
    }

    const assignment = await prisma.assignment.create({
      data: {
        teacherProfileId: session.user.teacherProfileId,
        studentProfileId: data.studentProfileId,
        enrollmentId: data.enrollmentId,
        scheduledClassId: data.scheduledClassId || null,
        title: data.title,
        description: data.description || null,
        subject: data.subject,
        topic: data.topic || null,
        questions: data.questions || null,
        attachmentUrls: data.attachmentUrls,
        deadline: new Date(data.deadline),
        totalMarks: data.totalMarks,
        difficulty: data.difficulty,
        status: "ASSIGNED",
      },
    });

    // Notify student
    await notifyAssignmentCreated(
      enrollment.studentProfile.user.id,
      assignment.title,
      assignment.subject,
      formatDate(assignment.deadline)
    );

    return NextResponse.json({
      success: true,
      data: assignment,
      message: "Assignment created and student notified",
    }, { status: 201 });
  } catch (error) {
    console.error("Create assignment error:", error);
    return NextResponse.json({ success: false, error: "Failed to create assignment" }, { status: 500 });
  }
}
