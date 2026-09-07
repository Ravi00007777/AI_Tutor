import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import crypto from "crypto";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { calculatePlatformCommission, calculateTeacherEarnings } from "@/engines/payment-engine";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "",
});

// POST /api/payments/create-order — Create Razorpay order for enrollment
export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user || !session.user.studentProfileId) {
      return NextResponse.json(
        { success: false, error: "Student auth required" },
        { status: 401 }
      );
    }

    const { enrollmentId } = await request.json();

    const enrollment = await prisma.enrollment.findUnique({
      where: { id: enrollmentId },
      include: {
        teacherProfile: {
          include: { user: { select: { name: true } } },
        },
        studentProfile: {
          include: { user: { select: { email: true, name: true, phone: true } } },
        },
      },
    });

    if (!enrollment) {
      return NextResponse.json(
        { success: false, error: "Enrollment not found" },
        { status: 404 }
      );
    }

    if (enrollment.studentProfileId !== session.user.studentProfileId) {
      return NextResponse.json(
        { success: false, error: "Not authorized" },
        { status: 403 }
      );
    }

    const amount = enrollment.monthlyFee;
    if (!amount || amount <= 0) {
      return NextResponse.json(
        { success: false, error: "Invalid fee amount" },
        { status: 400 }
      );
    }

    // Amount in paise (Razorpay uses smallest currency unit)
    const amountInPaise = amount;

    const commission = calculatePlatformCommission(amountInPaise);
    const teacherEarnings = calculateTeacherEarnings(amountInPaise);

    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: `tc_${enrollmentId.slice(0, 8)}_${Date.now()}`,
      notes: {
        enrollmentId,
        studentProfileId: enrollment.studentProfileId,
        teacherProfileId: enrollment.teacherProfileId,
        subject: enrollment.subject,
      },
    });

    // Create payment record in database
    const payment = await prisma.payment.create({
      data: {
        enrollmentId,
        studentProfileId: enrollment.studentProfileId,
        teacherProfileId: enrollment.teacherProfileId,
        amount: amountInPaise,
        platformCommission: commission,
        teacherEarnings,
        razorpayOrderId: order.id,
        status: "PENDING",
        paymentMonth: new Date(),
        currency: "INR",
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        orderId: order.id,
        paymentId: payment.id,
        amount: amountInPaise,
        currency: "INR",
        keyId: process.env.RAZORPAY_KEY_ID,
        prefill: {
          name: enrollment.studentProfile.user.name,
          email: enrollment.studentProfile.user.email,
          contact: enrollment.studentProfile.user.phone,
        },
        notes: {
          teacherName: enrollment.teacherProfile.user.name,
          subject: enrollment.subject,
        },
      },
    });
  } catch (error) {
    console.error("Payment order creation error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create payment order" },
      { status: 500 }
    );
  }
}
