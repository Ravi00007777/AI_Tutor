import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { studentProfileSchema } from "@/lib/validators";

// GET /api/students/profile — Get current student's profile
export async function GET() {
  try {
    const session = await auth();
    if (!session?.user || !session.user.studentProfileId) {
      return NextResponse.json(
        { success: false, error: "Student authentication required" },
        { status: 401 }
      );
    }

    const profile = await prisma.studentProfile.findUnique({
      where: { id: session.user.studentProfileId },
      include: {
        user: {
          select: { name: true, email: true, phone: true, avatarUrl: true, timezone: true },
        },
        availability: true,
        syllabi: { orderBy: { createdAt: "desc" }, take: 5 },
        enrollments: {
          where: { status: { in: ["ACTIVE", "DEMO_PENDING", "DEMO_COMPLETED"] } },
          include: {
            teacherProfile: {
              include: { user: { select: { name: true, avatarUrl: true } } },
            },
          },
        },
      },
    });

    if (!profile) {
      return NextResponse.json(
        { success: false, error: "Profile not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: profile });
  } catch (error) {
    console.error("Get student profile error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}

// PUT /api/students/profile — Update student profile (onboarding + settings)
export async function PUT(request: Request) {
  try {
    const session = await auth();
    if (!session?.user || !session.user.studentProfileId) {
      return NextResponse.json(
        { success: false, error: "Student authentication required" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validation = studentProfileSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: validation.error.errors[0]?.message },
        { status: 400 }
      );
    }

    const data = validation.data;

    // Update profile
    const profile = await prisma.studentProfile.update({
      where: { id: session.user.studentProfileId },
      data: {
        grade: data.grade,
        board: data.board,
        school: data.school || null,
        subjects: data.subjects,
        currentLevel: data.currentLevel || null,
        targetGoal: data.targetGoal || null,
        preferredLanguage: data.preferredLanguage,
        preferredDuration: data.preferredDuration,
        preferredDays: data.preferredDays as unknown as string[],
        preferredTimeRanges: data.preferredTimeRanges || null,
        monthlyBudget: data.monthlyBudget || null,
        learningPreferences: data.learningPreferences || null,
        examDate: data.examDate ? new Date(data.examDate) : null,
      },
    });

    // Create/update availability records from preferred days + time ranges
    if (data.preferredDays && data.preferredTimeRanges) {
      // Delete existing availability
      await prisma.studentAvailability.deleteMany({
        where: { studentProfileId: session.user.studentProfileId },
      });

      // Create new availability records
      const availabilityData = data.preferredDays.flatMap((day) =>
        (data.preferredTimeRanges || []).map((range) => ({
          studentProfileId: session.user.studentProfileId!,
          dayOfWeek: day as "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY",
          startTime: range.start,
          endTime: range.end,
        }))
      );

      if (availabilityData.length > 0) {
        await prisma.studentAvailability.createMany({
          data: availabilityData,
        });
      }
    }

    return NextResponse.json({
      success: true,
      data: profile,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.error("Update student profile error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
