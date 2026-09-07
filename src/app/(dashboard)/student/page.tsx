"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, Badge, Avatar, ProgressBar, EmptyState, Button } from "@/components/ui";
import {
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  ClipboardList,
  GraduationCap,
  TrendingUp,
  Video,
  ArrowRight,
  Users,
  FileText,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

// Mock data — will be replaced by API calls
const todayClasses = [
  {
    id: "1",
    subject: "Mathematics",
    topic: "Quadratic Equations",
    scheduledAt: "2026-09-05T10:00:00",
    duration: 60,
    status: "COMPLETED",
    teacherName: "Rahul Sharma",
    meetLink: "https://meet.google.com/abc-defg-hij",
  },
  {
    id: "2",
    subject: "Physics",
    topic: "Newton's Laws of Motion",
    scheduledAt: "2026-09-05T14:00:00",
    duration: 60,
    status: "SCHEDULED",
    teacherName: "Priya Mehta",
    meetLink: "https://meet.google.com/xyz-uvwx-yz1",
  },
  {
    id: "3",
    subject: "Chemistry",
    topic: "Chemical Bonding",
    scheduledAt: "2026-09-05T18:00:00",
    duration: 60,
    status: "SCHEDULED",
    teacherName: "Aman Kumar",
    meetLink: "https://meet.google.com/qrs-tuvw-xyz",
  },
];

const subjectProgress = [
  { subject: "Mathematics", percentage: 82, assignmentAvg: 88 },
  { subject: "Physics", percentage: 65, assignmentAvg: 75 },
  { subject: "Chemistry", percentage: 48, assignmentAvg: 70 },
];

const pendingAssignments = [
  { id: "1", title: "Quadratic Equations Practice Set", subject: "Mathematics", deadline: "2026-09-07", status: "ASSIGNED" },
  { id: "2", title: "Newton's Laws Problems", subject: "Physics", deadline: "2026-09-06", status: "ASSIGNED" },
  { id: "3", title: "Organic Chemistry Worksheet", subject: "Chemistry", deadline: "2026-09-08", status: "OVERDUE" },
];

export default function StudentDashboardPage() {
  return (
    <DashboardLayout role="student">
      <div className="space-y-8">
        {/* Welcome header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1
              className="text-2xl font-bold text-gray-900"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Good afternoon! 👋
            </h1>
            <p className="text-gray-500 mt-1">
              You have {todayClasses.filter((c) => c.status === "SCHEDULED").length} classes today.
              Keep up the great work!
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/student/teachers">
              <Button variant="outline" size="sm" icon={<Users className="w-4 h-4" />}>
                Find Teachers
              </Button>
            </Link>
            <Link href="/student/study-plan">
              <Button variant="primary" size="sm" icon={<Sparkles className="w-4 h-4" />}>
                Study Plan
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="relative overflow-hidden">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Attendance</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">92%</p>
                <p className="text-xs text-accent-600 font-semibold mt-1">↑ 3% this month</p>
              </div>
              <div className="p-2.5 rounded-xl bg-primary-50">
                <CheckCircle2 className="w-5 h-5 text-primary-600" />
              </div>
            </div>
          </Card>

          <Card className="relative overflow-hidden">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Classes Done</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">47</p>
                <p className="text-xs text-gray-500 mt-1">out of 52 total</p>
              </div>
              <div className="p-2.5 rounded-xl bg-accent-50">
                <BookOpen className="w-5 h-5 text-accent-600" />
              </div>
            </div>
          </Card>

          <Card className="relative overflow-hidden">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Assignments</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">12/15</p>
                <p className="text-xs text-warm-600 font-semibold mt-1">3 pending</p>
              </div>
              <div className="p-2.5 rounded-xl bg-warm-50">
                <ClipboardList className="w-5 h-5 text-warm-600" />
              </div>
            </div>
          </Card>

          <Card className="relative overflow-hidden">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Avg. Score</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">78%</p>
                <p className="text-xs text-accent-600 font-semibold mt-1">↑ 5% improvement</p>
              </div>
              <div className="p-2.5 rounded-xl bg-pink-50">
                <TrendingUp className="w-5 h-5 text-pink-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Two column layout */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Today's Classes */}
          <div className="lg:col-span-2">
            <Card padding="none">
              <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">Today&apos;s Classes</h2>
                <Link href="/student/classes" className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center gap-1">
                  View all <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="divide-y divide-gray-50">
                {todayClasses.map((cls) => (
                  <div key={cls.id} className="px-6 py-4 flex items-center gap-4 hover:bg-gray-50/50 transition-colors">
                    <div
                      className={`w-1.5 h-12 rounded-full ${
                        cls.status === "COMPLETED"
                          ? "bg-accent-400"
                          : "bg-primary-400"
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-gray-900">{cls.subject}</p>
                        <Badge
                          variant={cls.status === "COMPLETED" ? "success" : "primary"}
                        >
                          {cls.status === "COMPLETED" ? "Done" : "Upcoming"}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500 mt-0.5">{cls.topic}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(cls.scheduledAt).toLocaleTimeString("en-IN", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <GraduationCap className="w-3 h-3" />
                          {cls.teacherName}
                        </span>
                      </div>
                    </div>
                    {cls.status === "SCHEDULED" && cls.meetLink && (
                      <a
                        href={cls.meetLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-xl bg-primary-50 text-primary-600 text-sm font-semibold hover:bg-primary-100 transition-colors flex items-center gap-1.5"
                      >
                        <Video className="w-4 h-4" />
                        Join
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Subject Progress */}
          <div>
            <Card padding="none">
              <div className="px-6 py-4 border-b border-gray-50">
                <h2 className="text-lg font-bold text-gray-900">Subject Progress</h2>
              </div>
              <div className="p-6 space-y-5">
                {subjectProgress.map((sp) => (
                  <div key={sp.subject}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-semibold text-gray-800">
                        {sp.subject}
                      </span>
                      <span className="text-xs text-gray-500">
                        Avg: {sp.assignmentAvg}%
                      </span>
                    </div>
                    <ProgressBar
                      value={sp.percentage}
                      color={
                        sp.percentage >= 80
                          ? "accent"
                          : sp.percentage >= 60
                          ? "primary"
                          : "warm"
                      }
                      showPercentage={false}
                      size="sm"
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      {sp.percentage}% syllabus covered
                    </p>
                  </div>
                ))}
                <Link
                  href="/student/progress"
                  className="block text-center text-sm font-medium text-primary-600 hover:text-primary-700 pt-2"
                >
                  View detailed progress →
                </Link>
              </div>
            </Card>
          </div>
        </div>

        {/* Pending Assignments */}
        <Card padding="none">
          <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Pending Assignments</h2>
            <Link
              href="/student/assignments"
              className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center gap-1"
            >
              All assignments <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {pendingAssignments.map((assignment) => (
              <div
                key={assignment.id}
                className="px-6 py-4 flex items-center gap-4 hover:bg-gray-50/50 transition-colors"
              >
                <div className="p-2.5 rounded-xl bg-primary-50">
                  <FileText className="w-5 h-5 text-primary-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900">{assignment.title}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-gray-500">{assignment.subject}</span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Due: {new Date(assignment.deadline).toLocaleDateString("en-IN", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
                <Badge
                  variant={assignment.status === "OVERDUE" ? "danger" : "warning"}
                >
                  {assignment.status === "OVERDUE" ? (
                    <span className="flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> Overdue
                    </span>
                  ) : (
                    "Pending"
                  )}
                </Badge>
                <Link href={`/student/assignments/${assignment.id}`}>
                  <Button variant="outline" size="sm">
                    Submit
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
