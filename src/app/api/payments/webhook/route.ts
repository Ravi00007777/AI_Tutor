import { NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/lib/prisma";

// POST /api/payments/webhook — Razorpay webhook handler
export async function POST(request: Request) {
  try {
    const body = await request.text();
    const signature = request.headers.get("x-razorpay-signature");

    if (!signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 400 });
    }

    // Verify webhook signature
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET || "")
      .update(body)
      .digest("hex");

    if (signature !== expectedSignature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const event = JSON.parse(body);
    const { event: eventType, payload } = event;

    switch (eventType) {
      case "payment.captured": {
        const paymentEntity = payload.payment.entity;
        const orderId = paymentEntity.order_id;
        const razorpayPaymentId = paymentEntity.id;

        // Update payment record
        await prisma.payment.updateMany({
          where: { razorpayOrderId: orderId },
          data: {
            razorpayPaymentId,
            status: "CAPTURED",
            paidAt: new Date(),
          },
        });

        // Log the transaction
        console.log(`Payment captured: ${razorpayPaymentId} for order ${orderId}`);
        break;
      }

      case "payment.failed": {
        const failedPayment = payload.payment.entity;
        await prisma.payment.updateMany({
          where: { razorpayOrderId: failedPayment.order_id },
          data: {
            status: "FAILED",
          },
        });
        break;
      }

      case "refund.created": {
        const refund = payload.refund.entity;
        const payment = await prisma.payment.findFirst({
          where: { razorpayPaymentId: refund.payment_id },
        });

        if (payment) {
          await prisma.payment.update({
            where: { id: payment.id },
            data: {
              status: "REFUNDED",
              refundedAt: new Date(),
            },
          });
        }
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
