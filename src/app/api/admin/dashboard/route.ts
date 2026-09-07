import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

// GET /api/admin/dashboard — Get platform overview stats
export async function GET() {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { success: false, error: "Admin access required" },
        { status: 403 }
      );
    }

    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const todayEnd = new Date(todayStart.getTime() + 24 * 60 * 60 * 1000);

    const [
      totalStudents,
      activeStudents,
      totalTeachers,
      activeTeachers,
      pendingTeachers,
      classesToday,
      classesThisMonth,
      payments,
      demoClasses,
      confirmedEnrollments,
      avgRating,
    ] = await Promise.all([
      prisma.studentProfile.count(),
      prisma.enrollment.groupBy({
        by: ["studentProfileId"],
        where: { status: "ACTIVE" },
      }),
      prisma.teacherProfile.count(),
      prisma.teacherProfile.count({ where: { status: "APPROVED" } }),
      prisma.teacherProfile.count({ where: { status: "PENDING" } }),
      prisma.scheduledClass.count({
        where: {
          scheduledAt: { gte: todayStart, lt: todayEnd },
          status: { in: ["SCHEDULED", "IN_PROGRESS", "COMPLETED"] },
        },
      }),
      prisma.scheduledClass.count({
        where: {
          scheduledAt: { gte: monthStart },
          status: { in: ["SCHEDULED", "IN_PROGRESS", "COMPLETED"] },
        },
      }),
      prisma.payment.findMany({
        where: { status: "CAPTURED" },
      }),
      prisma.demoClass.count({ where: { status: "COMPLETED" } }),
      prisma.enrollment.count({ where: { status: "ACTIVE" } }),
      prisma.teacherProfile.aggregate({
        where: { status: "APPROVED", totalReviews: { gt: 0 } },
        _avg: { rating: true },
      }),
    ]);

    const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);
    const totalCommission = payments.reduce((sum, p) => sum + p.platformCommission, 0);
    const totalPayouts = payments.reduce((sum, p) => sum + p.teacherEarnings, 0);

    const demoConversionRate = demoClasses > 0
      ? Math.round((confirmedEnrollments / demoClasses) * 100)
      : 0;

    // Subject demand
    const studentProfiles = await prisma.studentProfile.findMany({
      select: { subjects: true },
    });
    const subjectCounts: Record<string, number> = {};
    studentProfiles.forEach((p) => {
      p.subjects.forEach((s) => {
        subjectCounts[s] = (subjectCounts[s] || 0) + 1;
      });
    });
    const subjectDemand = Object.entries(subjectCounts)
      .map(([subject, count]) => ({ subject, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    return NextResponse.json({
      success: true,
      data: {
        totalStudents,
        activeStudents: activeStudents.length,
        totalTeachers,
        activeTeachers,
        pendingTeachers,
        classesToday,
        classesThisMonth,
        totalRevenue,
        platformCommission: totalCommission,
        teacherPayouts: totalPayouts,
        pendingPayments: payments.filter((p) => p.status === "PENDING").length,
        demoConversionRate,
        averageTeacherRating: avgRating._avg.rating || 0,
        subjectDemand,
      },
    });
  } catch (error) {
    console.error("Admin dashboard error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}
