"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, Badge, Avatar, ProgressBar, Button } from "@/components/ui";
import {
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  CreditCard,
  GraduationCap,
  TrendingUp,
  Video,
  ArrowRight,
  Users,
  FileText,
  DollarSign,
  Star,
  AlertCircle,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";

const todayClasses = [
  {
    id: "1",
    subject: "Mathematics",
    topic: "Quadratic Equations",
    scheduledAt: "2026-09-05T10:00:00",
    duration: 60,
    status: "COMPLETED",
    studentName: "Ananya Gupta",
    studentAvatar: null,
    meetLink: "https://meet.google.com/abc-defg-hij",
  },
  {
    id: "2",
    subject: "Physics",
    topic: "Projectile Motion",
    scheduledAt: "2026-09-05T14:00:00",
    duration: 60,
    status: "SCHEDULED",
    studentName: "Rohan Patel",
    studentAvatar: null,
    meetLink: "https://meet.google.com/xyz-uvwx-yz1",
  },
  {
    id: "3",
    subject: "Mathematics",
    topic: "Probability",
    scheduledAt: "2026-09-05T18:00:00",
    duration: 60,
    status: "SCHEDULED",
    studentName: "Priya Singh",
    studentAvatar: null,
    meetLink: "https://meet.google.com/qrs-tuvw-xyz",
  },
];

const students = [
  { name: "Ananya Gupta", grade: "10th", subject: "Mathematics", progress: 82, nextClass: "Today, 10 AM" },
  { name: "Rohan Patel", grade: "12th", subject: "Physics", progress: 65, nextClass: "Today, 2 PM" },
  { name: "Priya Singh", grade: "11th", subject: "Mathematics", progress: 48, nextClass: "Today, 6 PM" },
  { name: "Vikram Reddy", grade: "9th", subject: "Mathematics", progress: 90, nextClass: "Tomorrow, 5 PM" },
];

export default function TeacherDashboardPage() {
  return (
    <DashboardLayout role="teacher">
      <div className="space-y-8">
        {/* Welcome */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "var(--font-display)" }}>
              Welcome back, Teacher! 🎓
            </h1>
            <p className="text-gray-500 mt-1">
              You have {todayClasses.filter((c) => c.status === "SCHEDULED").length} classes remaining today.
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/teacher/assignments">
              <Button variant="outline" size="sm" icon={<Plus className="w-4 h-4" />}>
                New Assignment
              </Button>
            </Link>
            <Link href="/teacher/availability">
              <Button variant="accent" size="sm" icon={<Calendar className="w-4 h-4" />}>
                Manage Availability
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Active Students</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">24</p>
                <p className="text-xs text-accent-600 font-semibold mt-1">↑ 3 new this month</p>
              </div>
              <div className="p-2.5 rounded-xl bg-accent-50">
                <Users className="w-5 h-5 text-accent-600" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">This Month</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{formatCurrency(45600)}</p>
                <p className="text-xs text-accent-600 font-semibold mt-1">↑ 12% vs last month</p>
              </div>
              <div className="p-2.5 rounded-xl bg-primary-50">
                <DollarSign className="w-5 h-5 text-primary-600" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Classes Done</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">156</p>
                <p className="text-xs text-gray-500 mt-1">this month</p>
              </div>
              <div className="p-2.5 rounded-xl bg-warm-50">
                <BookOpen className="w-5 h-5 text-warm-600" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Rating</p>
                <p className="text-2xl font-bold text-gray-900 mt-1 flex items-center gap-1">
                  4.8 <Star className="w-5 h-5 fill-warm-400 text-warm-400" />
                </p>
                <p className="text-xs text-gray-500 mt-1">from 43 reviews</p>
              </div>
              <div className="p-2.5 rounded-xl bg-pink-50">
                <Star className="w-5 h-5 text-pink-600" />
              </div>
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Today's Classes */}
          <div className="lg:col-span-2">
            <Card padding="none">
              <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">Today&apos;s Schedule</h2>
                <Link href="/teacher/calendar" className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center gap-1">
                  Full calendar <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="divide-y divide-gray-50">
                {todayClasses.map((cls) => (
                  <div key={cls.id} className="px-6 py-4 flex items-center gap-4 hover:bg-gray-50/50 transition-colors">
                    <div
                      className={`w-1.5 h-12 rounded-full ${
                        cls.status === "COMPLETED" ? "bg-accent-400" : "bg-primary-400"
                      }`}
                    />
                    <Avatar name={cls.studentName} size="md" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-gray-900">{cls.studentName}</p>
                        <Badge variant={cls.status === "COMPLETED" ? "success" : "primary"}>
                          {cls.status === "COMPLETED" ? "Done" : "Upcoming"}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500 mt-0.5">
                        {cls.subject} — {cls.topic}
                      </p>
                      <span className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3" />
                        {new Date(cls.scheduledAt).toLocaleTimeString("en-IN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}{" "}
                        • {cls.duration} min
                      </span>
                    </div>
                    {cls.status === "SCHEDULED" && (
                      <div className="flex gap-2">
                        <a
                          href={cls.meetLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 rounded-xl bg-primary-50 text-primary-600 text-sm font-semibold hover:bg-primary-100 transition-colors flex items-center gap-1.5"
                        >
                          <Video className="w-4 h-4" />
                          Start
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* My Students */}
          <div>
            <Card padding="none">
              <div className="px-6 py-4 border-b border-gray-50">
                <h2 className="text-lg font-bold text-gray-900">My Students</h2>
              </div>
              <div className="divide-y divide-gray-50">
                {students.map((student, i) => (
                  <div key={i} className="px-6 py-3 flex items-center gap-3 hover:bg-gray-50/50 transition-colors">
                    <Avatar name={student.name} size="sm" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {student.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {student.grade} • {student.subject}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="w-16">
                        <ProgressBar
                          value={student.progress}
                          showPercentage={false}
                          size="sm"
                          color={student.progress >= 80 ? "accent" : student.progress >= 60 ? "primary" : "warm"}
                        />
                      </div>
                      <p className="text-[10px] text-gray-400 mt-0.5">{student.progress}%</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-6 py-3 border-t border-gray-50">
                <Link
                  href="/teacher/students"
                  className="text-sm font-medium text-primary-600 hover:text-primary-700"
                >
                  View all students →
                </Link>
              </div>
            </Card>
          </div>
        </div>

        {/* Earnings Summary */}
        <Card>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Earnings Overview</h2>
              <p className="text-sm text-gray-500 mt-1">Your earnings this month after platform commission</p>
            </div>
            <Link href="/teacher/earnings">
              <Button variant="outline" size="sm">
                View Details <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-6 mt-6">
            <div className="p-4 rounded-xl bg-accent-50 border border-accent-100">
              <p className="text-sm text-accent-600 font-medium">Total Earned</p>
              <p className="text-xl font-bold text-accent-700 mt-1">{formatCurrency(285400)}</p>
            </div>
            <div className="p-4 rounded-xl bg-primary-50 border border-primary-100">
              <p className="text-sm text-primary-600 font-medium">This Month</p>
              <p className="text-xl font-bold text-primary-700 mt-1">{formatCurrency(45600)}</p>
            </div>
            <div className="p-4 rounded-xl bg-warm-50 border border-warm-100">
              <p className="text-sm text-warm-600 font-medium">Pending</p>
              <p className="text-xl font-bold text-warm-700 mt-1">{formatCurrency(12800)}</p>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
