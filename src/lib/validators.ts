import { z } from "zod";

// ============================================
// AUTH VALIDATORS
// ============================================

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[0-9]/, "Must contain at least one number"),
  phone: z.string().optional(),
  role: z.enum(["STUDENT", "TEACHER"]),
});

// ============================================
// STUDENT VALIDATORS
// ============================================

export const studentProfileSchema = z.object({
  grade: z.string().min(1, "Please select your grade"),
  board: z.string().min(1, "Please select your board"),
  school: z.string().optional(),
  subjects: z.array(z.string()).min(1, "Select at least one subject"),
  currentLevel: z.string().optional(),
  targetGoal: z.string().optional(),
  preferredLanguage: z.string().default("English"),
  preferredDuration: z.number().min(30).max(120).default(60),
  preferredDays: z.array(z.string()).min(1, "Select at least one day"),
  preferredTimeRanges: z
    .array(
      z.object({
        start: z.string(),
        end: z.string(),
      })
    )
    .optional(),
  monthlyBudget: z.number().min(0).optional(),
  learningPreferences: z.string().optional(),
  examDate: z.string().optional(),
});

// ============================================
// TEACHER VALIDATORS
// ============================================

export const teacherProfileSchema = z.object({
  bio: z.string().min(50, "Bio should be at least 50 characters").max(2000),
  education: z.string().min(1, "Education is required"),
  university: z.string().optional(),
  qualifications: z.array(z.string()).default([]),
  experienceYears: z.number().min(0).max(50),
  subjects: z.array(z.string()).min(1, "Select at least one subject"),
  grades: z.array(z.string()).min(1, "Select at least one grade"),
  boards: z.array(z.string()).min(1, "Select at least one board"),
  languages: z.array(z.string()).min(1).default(["English"]),
  teachingStyle: z.string().optional(),
  hourlyRate: z.number().min(100, "Minimum rate is ₹100/hr").optional(),
  monthlyRate: z.number().min(1000, "Minimum rate is ₹1000/month").optional(),
  maxStudents: z.number().min(1).max(100).default(20),
  demoVideoUrl: z.string().url().optional().or(z.literal("")),
});

// ============================================
// AVAILABILITY VALIDATORS
// ============================================

export const availabilitySchema = z.object({
  dayOfWeek: z.enum([
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY",
  ]),
  startTime: z.string().regex(/^\d{2}:\d{2}$/, "Use HH:mm format"),
  endTime: z.string().regex(/^\d{2}:\d{2}$/, "Use HH:mm format"),
  isRecurring: z.boolean().default(true),
  isAvailable: z.boolean().default(true),
});

export const availabilityBatchSchema = z.object({
  slots: z.array(availabilitySchema).min(1),
});

// ============================================
// DEMO BOOKING VALIDATORS
// ============================================

export const demoBookingSchema = z.object({
  teacherProfileId: z.string().uuid(),
  subject: z.string().min(1),
  scheduledAt: z.string().datetime(),
  duration: z.number().min(15).max(60).default(30),
  message: z.string().optional(),
});

// ============================================
// FEEDBACK VALIDATORS
// ============================================

export const teacherFeedbackSchema = z.object({
  demoClassId: z.string().uuid(),
  studentLevel: z.string().min(1),
  strengths: z.string().min(1),
  weaknesses: z.string().min(1),
  recommendedFrequency: z.number().min(1).max(7),
  recommendedCurriculum: z.string().optional(),
  compatibilityScore: z.number().min(0).max(100),
  comments: z.string().optional(),
});

export const studentFeedbackSchema = z.object({
  demoClassId: z.string().uuid(),
  teachingQuality: z.number().min(1).max(5),
  communication: z.number().min(1).max(5),
  explanationQuality: z.number().min(1).max(5),
  comfortLevel: z.number().min(1).max(5),
  overallRating: z.number().min(1).max(5),
  wouldContinue: z.boolean(),
  comments: z.string().optional(),
});

// ============================================
// ASSIGNMENT VALIDATORS
// ============================================

export const assignmentSchema = z.object({
  studentProfileId: z.string().uuid(),
  enrollmentId: z.string().uuid(),
  scheduledClassId: z.string().uuid().optional(),
  title: z.string().min(1, "Title is required").max(200),
  description: z.string().optional(),
  subject: z.string().min(1),
  topic: z.string().optional(),
  questions: z.array(z.object({
    question: z.string(),
    type: z.enum(["SHORT_ANSWER", "LONG_ANSWER", "MCQ", "FILE_UPLOAD"]),
    marks: z.number().min(0),
    options: z.array(z.string()).optional(),
  })).optional(),
  attachmentUrls: z.array(z.string().url()).default([]),
  deadline: z.string().datetime(),
  totalMarks: z.number().min(1).default(100),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]).default("MEDIUM"),
});

export const assignmentSubmissionSchema = z.object({
  assignmentId: z.string().uuid(),
  fileUrls: z.array(z.string().url()).default([]),
  textResponse: z.string().optional(),
});

export const assignmentGradingSchema = z.object({
  submissionId: z.string().uuid(),
  marksObtained: z.number().min(0),
  feedback: z.string().optional(),
  correctedFileUrl: z.string().url().optional(),
});

// ============================================
// PAYMENT VALIDATORS
// ============================================

export const createOrderSchema = z.object({
  enrollmentId: z.string().uuid(),
  amount: z.number().min(100, "Minimum amount is ₹1"),
  type: z.enum(["ONE_TIME", "SUBSCRIPTION"]).default("ONE_TIME"),
});

export const verifyPaymentSchema = z.object({
  razorpayOrderId: z.string(),
  razorpayPaymentId: z.string(),
  razorpaySignature: z.string(),
});

// ============================================
// SCHEDULING VALIDATORS
// ============================================

export const scheduleRequestSchema = z.object({
  enrollmentId: z.string().uuid(),
  startDate: z.string(),
  weeksAhead: z.number().min(1).max(12).default(4),
});

export const rescheduleSchema = z.object({
  classId: z.string().uuid(),
  newScheduledAt: z.string().datetime(),
  reason: z.string().optional(),
});

// ============================================
// ADMIN VALIDATORS
// ============================================

export const platformSettingSchema = z.object({
  key: z.string().min(1),
  value: z.string().min(1),
  description: z.string().optional(),
});

export const teacherApprovalSchema = z.object({
  teacherProfileId: z.string().uuid(),
  approved: z.boolean(),
  reason: z.string().optional(),
});

// Type exports
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type StudentProfileInput = z.infer<typeof studentProfileSchema>;
export type TeacherProfileInput = z.infer<typeof teacherProfileSchema>;
export type DemoBookingInput = z.infer<typeof demoBookingSchema>;
export type AssignmentInput = z.infer<typeof assignmentSchema>;
export type ScheduleRequestInput = z.infer<typeof scheduleRequestSchema>;
