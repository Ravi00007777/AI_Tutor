import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { assignmentSubmissionSchema, assignmentGradingSchema } from "@/lib/validators";
import { notifyAssignmentGraded } from "@/engines/notification-engine";

// POST /api/assignments/submit — Submit assignment (student)
export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user || !session.user.studentProfileId) {
      return NextResponse.json({ success: false, error: "Student auth required" }, { status: 403 });
    }

    const body = await request.json();
    const validation = assignmentSubmissionSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: validation.error.errors[0]?.message },
        { status: 400 }
      );
    }

    const { assignmentId, fileUrls, textResponse } = validation.data;

    // Verify assignment belongs to student
    const assignment = await prisma.assignment.findFirst({
      where: {
        id: assignmentId,
        studentProfileId: session.user.studentProfileId,
      },
    });

    if (!assignment) {
      return NextResponse.json({ success: false, error: "Assignment not found" }, { status: 404 });
    }

    // Check for existing submission
    const existing = await prisma.assignmentSubmission.findUnique({
      where: { assignmentId },
    });

    if (existing) {
      // Update existing submission
      const updated = await prisma.assignmentSubmission.update({
        where: { assignmentId },
        data: {
          fileUrls,
          textResponse: textResponse || null,
          submittedAt: new Date(),
        },
      });

      await prisma.assignment.update({
        where: { id: assignmentId },
        data: { status: "SUBMITTED" },
      });

      return NextResponse.json({ success: true, data: updated, message: "Submission updated" });
    }

    // Create new submission
    const submission = await prisma.assignmentSubmission.create({
      data: {
        assignmentId,
        studentProfileId: session.user.studentProfileId,
        fileUrls,
        textResponse: textResponse || null,
      },
    });

    // Update assignment status
    await prisma.assignment.update({
      where: { id: assignmentId },
      data: { status: "SUBMITTED" },
    });

    return NextResponse.json({
      success: true,
      data: submission,
      message: "Assignment submitted successfully",
    }, { status: 201 });
  } catch (error) {
    console.error("Submit assignment error:", error);
    return NextResponse.json({ success: false, error: "Submission failed" }, { status: 500 });
  }
}

// PUT /api/assignments/submit — Grade assignment (teacher)
export async function PUT(request: Request) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "TEACHER") {
      return NextResponse.json({ success: false, error: "Teacher auth required" }, { status: 403 });
    }

    const body = await request.json();
    const validation = assignmentGradingSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: validation.error.errors[0]?.message },
        { status: 400 }
      );
    }

    const { submissionId, marksObtained, feedback, correctedFileUrl } = validation.data;

    const submission = await prisma.assignmentSubmission.findUnique({
      where: { id: submissionId },
      include: {
        assignment: {
          include: {
            studentProfile: {
              include: { user: { select: { id: true } } },
            },
          },
        },
      },
    });

    if (!submission) {
      return NextResponse.json({ success: false, error: "Submission not found" }, { status: 404 });
    }

    // Verify teacher owns the assignment
    if (submission.assignment.teacherProfileId !== session.user.teacherProfileId) {
      return NextResponse.json({ success: false, error: "Not authorized" }, { status: 403 });
    }

    // Grade the submission
    const graded = await prisma.assignmentSubmission.update({
      where: { id: submissionId },
      data: {
        marksObtained,
        feedback: feedback || null,
        correctedFileUrl: correctedFileUrl || null,
        gradedAt: new Date(),
      },
    });

    // Update assignment status
    await prisma.assignment.update({
      where: { id: submission.assignmentId },
      data: { status: "GRADED" },
    });

    // Notify student
    await notifyAssignmentGraded(
      submission.assignment.studentProfile.user.id,
      submission.assignment.title,
      marksObtained,
      submission.assignment.totalMarks
    );

    return NextResponse.json({
      success: true,
      data: graded,
      message: "Assignment graded successfully",
    });
  } catch (error) {
    console.error("Grade assignment error:", error);
    return NextResponse.json({ success: false, error: "Grading failed" }, { status: 500 });
  }
}
