import prisma from "@/lib/prisma";

/**
 * Payment Engine
 *
 * Handles commission calculation, payment tracking,
 * and teacher earnings management.
 */

/**
 * Get the current platform commission percentage from settings
 */
export async function getCommissionRate(): Promise<number> {
  const setting = await prisma.platformSetting.findUnique({
    where: { key: "commission_percentage" },
  });
  return setting ? parseFloat(setting.value) : 15; // Default 15%
}

/**
 * Calculate commission split for a payment
 */
export async function calculateCommission(totalAmountPaise: number) {
  const rate = await getCommissionRate();
  const commission = Math.round(totalAmountPaise * (rate / 100));
  const teacherEarnings = totalAmountPaise - commission;

  return {
    totalAmount: totalAmountPaise,
    platformCommission: commission,
    teacherEarnings,
    commissionRate: rate,
  };
}

/**
 * Record a successful payment with commission split
 */
export async function recordPayment(params: {
  studentProfileId: string;
  enrollmentId: string;
  amount: number; // in paise
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
  type: "ONE_TIME" | "SUBSCRIPTION";
}) {
  const { platformCommission, teacherEarnings } = await calculateCommission(params.amount);

  const payment = await prisma.payment.update({
    where: { razorpayOrderId: params.razorpayOrderId },
    data: {
      razorpayPaymentId: params.razorpayPaymentId,
      razorpaySignature: params.razorpaySignature,
      platformCommission,
      teacherEarnings,
      status: "CAPTURED",
      paidAt: new Date(),
    },
  });

  return payment;
}

/**
 * Get teacher earnings summary
 */
export async function getTeacherEarnings(teacherProfileId: string) {
  const enrollments = await prisma.enrollment.findMany({
    where: { teacherProfileId, status: "ACTIVE" },
    select: { id: true },
  });

  const enrollmentIds = enrollments.map((e) => e.id);

  const payments = await prisma.payment.findMany({
    where: {
      enrollmentId: { in: enrollmentIds },
      status: "CAPTURED",
    },
  });

  const totalEarnings = payments.reduce((sum, p) => sum + p.teacherEarnings, 0);
  const totalCommission = payments.reduce((sum, p) => sum + p.platformCommission, 0);

  // Get pending payouts
  const pendingPayouts = await prisma.teacherPayout.findMany({
    where: { teacherProfileId, status: "PENDING" },
  });
  const pendingAmount = pendingPayouts.reduce((sum, p) => sum + p.amount, 0);

  // Get completed payouts
  const completedPayouts = await prisma.teacherPayout.findMany({
    where: { teacherProfileId, status: "COMPLETED" },
  });
  const paidAmount = completedPayouts.reduce((sum, p) => sum + p.amount, 0);

  // Current month earnings
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const thisMonthPayments = payments.filter(
    (p) => p.paidAt && p.paidAt >= monthStart
  );
  const thisMonthEarnings = thisMonthPayments.reduce(
    (sum, p) => sum + p.teacherEarnings,
    0
  );

  return {
    totalEarnings,
    totalCommission,
    pendingEarnings: totalEarnings - paidAmount,
    paidEarnings: paidAmount,
    thisMonthEarnings,
    pendingPayouts: pendingAmount,
    recentPayments: payments.slice(-10).reverse(),
  };
}

/**
 * Get admin revenue dashboard
 */
export async function getRevenueDashboard() {
  const payments = await prisma.payment.findMany({
    where: { status: "CAPTURED" },
    orderBy: { paidAt: "desc" },
  });

  const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);
  const totalCommission = payments.reduce((sum, p) => sum + p.platformCommission, 0);
  const totalTeacherPayments = payments.reduce((sum, p) => sum + p.teacherEarnings, 0);

  // Monthly breakdown
  const monthlyBreakdown: Record<string, { revenue: number; commission: number }> = {};
  for (const payment of payments) {
    if (!payment.paidAt) continue;
    const month = `${payment.paidAt.getFullYear()}-${String(
      payment.paidAt.getMonth() + 1
    ).padStart(2, "0")}`;
    if (!monthlyBreakdown[month]) {
      monthlyBreakdown[month] = { revenue: 0, commission: 0 };
    }
    monthlyBreakdown[month].revenue += payment.amount;
    monthlyBreakdown[month].commission += payment.platformCommission;
  }

  // Pending payouts
  const pendingPayouts = await prisma.teacherPayout.aggregate({
    where: { status: "PENDING" },
    _sum: { amount: true },
    _count: true,
  });

  return {
    totalRevenue,
    totalCommission,
    totalTeacherPayments,
    pendingPayoutAmount: pendingPayouts._sum.amount || 0,
    pendingPayoutCount: pendingPayouts._count,
    monthlyBreakdown,
    recentPayments: payments.slice(0, 20),
  };
}
