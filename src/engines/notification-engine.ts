import prisma from "@/lib/prisma";
import type { NotificationType, NotificationChannel } from "@prisma/client";

/**
 * Notification Engine
 *
 * Handles in-app notifications and email sending.
 * Designed to be extended with SMS/WhatsApp in Phase 2.
 */

interface NotificationInput {
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  channel?: NotificationChannel;
  actionUrl?: string;
}

/**
 * Create an in-app notification
 */
export async function createNotification(input: NotificationInput) {
  const notification = await prisma.notification.create({
    data: {
      userId: input.userId,
      title: input.title,
      message: input.message,
      type: input.type,
      channel: input.channel || "IN_APP",
      actionUrl: input.actionUrl,
    },
  });

  // TODO: If channel includes EMAIL, send via Resend
  // TODO: If channel includes SMS, send via Twilio/MSG91

  return notification;
}

/**
 * Send notification to multiple users
 */
export async function createBulkNotifications(
  userIds: string[],
  title: string,
  message: string,
  type: NotificationType,
  actionUrl?: string
) {
  const notifications = await prisma.notification.createMany({
    data: userIds.map((userId) => ({
      userId,
      title,
      message,
      type,
      channel: "IN_APP" as NotificationChannel,
      actionUrl,
    })),
  });

  return notifications;
}

/**
 * Get unread notification count for a user
 */
export async function getUnreadCount(userId: string): Promise<number> {
  return prisma.notification.count({
    where: { userId, isRead: false },
  });
}

/**
 * Get user's notifications with pagination
 */
export async function getUserNotifications(
  userId: string,
  page = 1,
  pageSize = 20
) {
  const [notifications, total] = await Promise.all([
    prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.notification.count({ where: { userId } }),
  ]);

  return {
    notifications,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
}

/**
 * Mark notification as read
 */
export async function markAsRead(notificationId: string, userId: string) {
  return prisma.notification.updateMany({
    where: { id: notificationId, userId },
    data: { isRead: true },
  });
}

/**
 * Mark all notifications as read for a user
 */
export async function markAllAsRead(userId: string) {
  return prisma.notification.updateMany({
    where: { userId, isRead: false },
    data: { isRead: true },
  });
}

// ============================================
// PRE-BUILT NOTIFICATION TEMPLATES
// ============================================

export async function notifyDemoBooked(
  teacherUserId: string,
  studentName: string,
  subject: string,
  dateTime: string
) {
  return createNotification({
    userId: teacherUserId,
    title: "New Demo Class Request",
    message: `${studentName} has booked a demo class for ${subject} on ${dateTime}`,
    type: "DEMO",
    actionUrl: "/teacher/classes",
  });
}

export async function notifyDemoConfirmed(
  studentUserId: string,
  teacherName: string,
  dateTime: string,
  meetLink?: string
) {
  return createNotification({
    userId: studentUserId,
    title: "Demo Class Confirmed",
    message: `Your demo class with ${teacherName} is confirmed for ${dateTime}`,
    type: "DEMO",
    actionUrl: meetLink || "/student/classes",
  });
}

export async function notifyClassReminder(
  userId: string,
  subject: string,
  startTime: string,
  meetLink?: string
) {
  return createNotification({
    userId,
    title: "Class Starting Soon",
    message: `Your ${subject} class starts in 30 minutes at ${startTime}`,
    type: "CLASS_REMINDER",
    actionUrl: meetLink || "/student/classes",
  });
}

export async function notifyAssignmentCreated(
  studentUserId: string,
  assignmentTitle: string,
  subject: string,
  deadline: string
) {
  return createNotification({
    userId: studentUserId,
    title: "New Assignment",
    message: `New ${subject} assignment: "${assignmentTitle}" — Due: ${deadline}`,
    type: "ASSIGNMENT",
    actionUrl: "/student/assignments",
  });
}

export async function notifyAssignmentGraded(
  studentUserId: string,
  assignmentTitle: string,
  marks: number,
  totalMarks: number
) {
  return createNotification({
    userId: studentUserId,
    title: "Assignment Graded",
    message: `Your assignment "${assignmentTitle}" has been graded: ${marks}/${totalMarks}`,
    type: "ASSIGNMENT",
    actionUrl: "/student/assignments",
  });
}

export async function notifyPaymentSuccess(
  studentUserId: string,
  amount: string,
  subject: string
) {
  return createNotification({
    userId: studentUserId,
    title: "Payment Successful",
    message: `Payment of ${amount} for ${subject} tutoring has been received`,
    type: "PAYMENT",
    actionUrl: "/student/payments",
  });
}

export async function notifyTeacherApproved(teacherUserId: string) {
  return createNotification({
    userId: teacherUserId,
    title: "Profile Approved! 🎉",
    message:
      "Your teacher profile has been approved. You are now visible to students on the marketplace.",
    type: "SYSTEM",
    actionUrl: "/teacher",
  });
}
