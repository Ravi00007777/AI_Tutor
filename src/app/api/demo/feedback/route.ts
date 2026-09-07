import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { teacherFeedbackSchema, studentFeedbackSchema } from "@/lib/validators";

// POST /api/demo/feedback — Submit demo class feedback
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
    const isTeacher = session.user.role === "TEACHER";

    // Validate based on role
    const schema = isTeacher ? teacherFeedbackSchema : studentFeedbackSchema;
    const validation = schema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: validation.error.errors[0]?.message },
        { status: 400 }
      );
    }

    const data = validation.data;
    const demoClassId = data.demoClassId;

    // Verify demo class exists and is completed
    const demoClass = await prisma.demoClass.findUnique({
      where: { id: demoClassId },
      include: {
        enrollment: true,
        feedbacks: true,
      },
    });

    if (!demoClass) {
      return NextResponse.json(
        { success: false, error: "Demo class not found" },
        { status: 404 }
      );
    }

    // Check user is part of this demo
    const isParticipant = isTeacher
      ? session.user.teacherProfileId === demoClass.teacherProfileId
      : session.user.studentProfileId === demoClass.studentProfileId;

    if (!isParticipant) {
      return NextResponse.json(
        { success: false, error: "You are not a participant of this demo class" },
        { status: 403 }
      );
    }

    // Check for duplicate feedback
    const existingFeedback = demoClass.feedbacks.find(
      (f) => f.givenByUserId === session.user.id
    );
    if (existingFeedback) {
      return NextResponse.json(
        { success: false, error: "You have already submitted feedback for this demo" },
        { status: 409 }
      );
    }

    // Create feedback
    let rating: number;
    let compatibilityScore: number | null = null;
    let wouldContinue = false;

    if (isTeacher) {
      const teacherData = data as { compatibilityScore: number; recommendedFrequency: number; studentLevel: string; strengths: string; weaknesses: string; comments?: string };
      rating = Math.round(teacherData.compatibilityScore / 20); // Convert 0-100 to 1-5
      compatibilityScore = teacherData.compatibilityScore;
      wouldContinue = teacherData.compatibilityScore >= 60;
    } else {
      const studentData = data as { overallRating: number; wouldContinue: boolean; teachingQuality: number; communication: number; explanationQuality: number; comfortLevel: number; comments?: string };
      rating = studentData.overallRating;
      wouldContinue = studentData.wouldContinue;
      // Calculate compatibility from student ratings
      compatibilityScore = Math.round(
        ((studentData.teachingQuality +
          studentData.communication +
          studentData.explanationQuality +
          studentData.comfortLevel +
          studentData.overallRating) /
          25) *
          100
      );
    }

    const feedback = await prisma.demoFeedback.create({
      data: {
        demoClassId,
        givenByUserId: session.user.id,
        feedbackType: isTeacher ? "TEACHER_FEEDBACK" : "STUDENT_FEEDBACK",
        rating,
        responses: data as object,
        comments: (data as { comments?: string }).comments || null,
        compatibilityScore,
        wouldContinue,
      },
    });

    // Update demo class status if completed
    await prisma.demoClass.update({
      where: { id: demoClassId },
      data: { status: "COMPLETED" },
    });

    // Update enrollment status
    await prisma.enrollment.update({
      where: { id: demoClass.enrollmentId },
      data: { status: "DEMO_COMPLETED" },
    });

    return NextResponse.json({
      success: true,
      data: feedback,
      message: "Feedback submitted successfully",
    });
  } catch (error) {
    console.error("Demo feedback error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit feedback" },
      { status: 500 }
    );
  }
}
