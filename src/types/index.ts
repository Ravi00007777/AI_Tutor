import { UserRole } from "@prisma/client";

// ============================================
// AUTH & SESSION TYPES
// ============================================

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatarUrl?: string | null;
  studentProfileId?: string | null;
  teacherProfileId?: string | null;
}

// ============================================
// API RESPONSE TYPES
// ============================================

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ============================================
// TEACHER MARKETPLACE TYPES
// ============================================

export interface TeacherCard {
  id: string;
  userId: string;
  name: string;
  avatarUrl: string | null;
  bio: string | null;
  subjects: string[];
  grades: string[];
  boards: string[];
  languages: string[];
  experienceYears: number;
  hourlyRate: number | null;
  monthlyRate: number | null;
  rating: number;
  totalReviews: number;
  currentStudents: number;
  maxStudents: number;
  isVerified: boolean;
  teachingStyle: string | null;
  matchScore?: number;
  matchReasons?: string[];
}

export interface TeacherSearchFilters {
  subject?: string;
  grade?: string;
  board?: string;
  language?: string;
  minRating?: number;
  maxPrice?: number;
  minExperience?: number;
  availability?: string;
  sortBy?: "rating" | "price_low" | "price_high" | "experience" | "match";
  page?: number;
  pageSize?: number;
}

// ============================================
// MATCHING TYPES
// ============================================

export interface MatchScore {
  teacherId: string;
  overallScore: number;
  breakdown: {
    subjectMatch: number;
    gradeMatch: number;
    boardMatch: number;
    budgetMatch: number;
    availabilityMatch: number;
    languageMatch: number;
    ratingScore: number;
    experienceScore: number;
    workloadScore: number;
  };
  reasons: string[];
}

// ============================================
// SCHEDULING TYPES
// ============================================

export interface TimeSlot {
  dayOfWeek: string;
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  date?: string; // YYYY-MM-DD for specific dates
}

export interface ScheduleCandidate {
  slots: TimeSlot[];
  score: number;
  conflicts: string[];
}

export interface ScheduleRequest {
  enrollmentId: string;
  studentProfileId: string;
  teacherProfileId: string;
  classesPerWeek: number;
  classDuration: number; // minutes
  startDate: string;
  weeksAhead?: number;
}

// ============================================
// DASHBOARD TYPES
// ============================================

export interface StudentDashboardData {
  todayClasses: ClassSummary[];
  upcomingClasses: ClassSummary[];
  pendingAssignments: number;
  totalAssignments: number;
  submittedAssignments: number;
  gradedAssignments: number;
  overdueAssignments: number;
  attendanceRate: number;
  totalClasses: number;
  attendedClasses: number;
  subjectProgress: SubjectProgress[];
  activeEnrollments: EnrollmentSummary[];
  recentNotifications: NotificationSummary[];
}

export interface TeacherDashboardData {
  todayClasses: ClassSummary[];
  upcomingClasses: ClassSummary[];
  totalStudents: number;
  activeStudents: number;
  pendingDemos: number;
  totalEarnings: number;
  pendingEarnings: number;
  thisMonthEarnings: number;
  assignmentsPending: number;
  recentNotifications: NotificationSummary[];
}

export interface AdminDashboardData {
  totalStudents: number;
  activeStudents: number;
  totalTeachers: number;
  activeTeachers: number;
  pendingTeachers: number;
  classesToday: number;
  classesThisMonth: number;
  totalRevenue: number;
  platformCommission: number;
  teacherPayouts: number;
  pendingPayments: number;
  demoConversionRate: number;
  averageTeacherRating: number;
  recentPayments: PaymentSummary[];
  subjectDemand: { subject: string; count: number }[];
}

export interface ClassSummary {
  id: string;
  subject: string;
  topic?: string | null;
  scheduledAt: string;
  duration: number;
  meetLink?: string | null;
  status: string;
  teacherName?: string;
  studentName?: string;
  teacherAvatar?: string | null;
  studentAvatar?: string | null;
}

export interface SubjectProgress {
  subject: string;
  completedTopics: number;
  totalTopics: number;
  percentage: number;
  assignmentAverage: number;
}

export interface EnrollmentSummary {
  id: string;
  subject: string;
  teacherName: string;
  teacherAvatar: string | null;
  status: string;
  classesPerWeek: number;
  monthlyFee: number | null;
}

export interface NotificationSummary {
  id: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
  actionUrl?: string | null;
}

export interface PaymentSummary {
  id: string;
  studentName: string;
  amount: number;
  commission: number;
  status: string;
  paidAt: string | null;
}

// ============================================
// DEMO & FEEDBACK TYPES
// ============================================

export interface TeacherFeedbackForm {
  studentLevel: string;
  strengths: string;
  weaknesses: string;
  recommendedFrequency: number;
  recommendedCurriculum: string;
  compatibilityScore: number;
  comments: string;
}

export interface StudentFeedbackForm {
  teachingQuality: number;
  communication: number;
  explanationQuality: number;
  comfortLevel: number;
  overallRating: number;
  wouldContinue: boolean;
  comments: string;
}
