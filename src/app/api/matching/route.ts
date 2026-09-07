import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getRecommendedTeachers } from "@/engines/matching-engine";

// POST /api/matching/recommend — Get teacher recommendations for a student
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
    const { subject } = body;

    const recommendations = await getRecommendedTeachers(
      session.user.studentProfileId,
      subject
    );

    return NextResponse.json({
      success: true,
      data: recommendations,
    });
  } catch (error) {
    console.error("Matching error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to get recommendations" },
      { status: 500 }
    );
  }
}
