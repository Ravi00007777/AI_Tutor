import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/teachers — Public teacher marketplace listing
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const subject = searchParams.get("subject");
    const grade = searchParams.get("grade");
    const board = searchParams.get("board");
    const language = searchParams.get("language");
    const minRating = searchParams.get("minRating");
    const maxPrice = searchParams.get("maxPrice");
    const sortBy = searchParams.get("sortBy") || "rating";
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "20");

    // Build filter
    const where: Record<string, unknown> = {
      status: "APPROVED",
      isApproved: true,
      user: { isActive: true },
    };

    if (subject) where.subjects = { has: subject };
    if (grade) where.grades = { has: grade };
    if (board) where.boards = { has: board };
    if (language) where.languages = { has: language };
    if (minRating) where.rating = { gte: parseFloat(minRating) };
    if (maxPrice) where.monthlyRate = { lte: parseInt(maxPrice) };

    // Build sort
    const orderBy: Record<string, string> = {};
    switch (sortBy) {
      case "price_low":
        orderBy.monthlyRate = "asc";
        break;
      case "price_high":
        orderBy.monthlyRate = "desc";
        break;
      case "experience":
        orderBy.experienceYears = "desc";
        break;
      default:
        orderBy.rating = "desc";
    }

    const [teachers, total] = await Promise.all([
      prisma.teacherProfile.findMany({
        where: where as Parameters<typeof prisma.teacherProfile.findMany>[0] extends { where?: infer W } ? W : never,
        include: {
          user: {
            select: { name: true, avatarUrl: true },
          },
          _count: {
            select: { enrollments: true, reviews: true },
          },
        },
        orderBy,
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.teacherProfile.count({
        where: where as Parameters<typeof prisma.teacherProfile.count>[0] extends { where?: infer W } ? W : never,
      }),
    ]);

    const data = teachers.map((t) => ({
      id: t.id,
      userId: t.userId,
      name: t.user.name,
      avatarUrl: t.user.avatarUrl,
      bio: t.bio,
      subjects: t.subjects,
      grades: t.grades,
      boards: t.boards,
      languages: t.languages,
      experienceYears: t.experienceYears,
      hourlyRate: t.hourlyRate,
      monthlyRate: t.monthlyRate,
      rating: t.rating,
      totalReviews: t.totalReviews,
      currentStudents: t.currentStudents,
      maxStudents: t.maxStudents,
      isVerified: t.isVerified,
      teachingStyle: t.teachingStyle,
    }));

    return NextResponse.json({
      success: true,
      data,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    });
  } catch (error) {
    console.error("Teachers list error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch teachers" },
      { status: 500 }
    );
  }
}
