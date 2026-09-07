"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, Badge, Button, Tabs, Avatar, EmptyState } from "@/components/ui";
import {
  Video,
  Clock,
  GraduationCap,
  CalendarDays,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowRight,
  Filter,
  RefreshCw,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

// Mock data — will be replaced by API calls
const classes = [
  {
    id: "1",
    subject: "Mathematics",
    topic: "Quadratic Equations – Practice Problems",
    scheduledAt: "2026-09-05T10:00:00",
    duration: 60,
    status: "COMPLETED",
    teacherName: "Rahul Sharma",
    meetLink: "https://meet.google.com/abc-defg-hij",
    attendanceMarked: true,
    notes: "Covered all practice problems. Homework: pg 45-48",
  },
  {
    id: "2",
    subject: "Physics",
    topic: "Newton's Laws of Motion – Numericals",
    scheduledAt: "2026-09-05T14:00:00",
    duration: 60,
    status: "SCHEDULED",
    teacherName: "Priya Mehta",
    meetLink: "https://meet.google.com/xyz-uvwx-yz1",
    attendanceMarked: false,
    notes: "",
  },
  {
    id: "3",
    subject: "Chemistry",
    topic: "Chemical Bonding – Ionic vs Covalent",
    scheduledAt: "2026-09-05T18:00:00",
    duration: 60,
    status: "SCHEDULED",
    teacherName: "Aman Kumar",
    meetLink: "https://meet.google.com/qrs-tuvw-xyz",
    attendanceMarked: false,
    notes: "",
  },
  {
    id: "4",
    subject: "Mathematics",
    topic: "Arithmetic Progressions – Introduction",
    scheduledAt: "2026-09-06T10:00:00",
    duration: 60,
    status: "SCHEDULED",
    teacherName: "Rahul Sharma",
    meetLink: "https://meet.google.com/new-link-001",
    attendanceMarked: false,
    notes: "",
  },
  {
    id: "5",
    subject: "Physics",
    topic: "Work, Energy, and Power",
    scheduledAt: "2026-09-04T14:00:00",
    duration: 60,
    status: "COMPLETED",
    teacherName: "Priya Mehta",
    meetLink: "",
    attendanceMarked: true,
    notes: "Great progress on energy conservation problems",
  },
  {
    id: "6",
    subject: "Mathematics",
    topic: "Trigonometry Basics",
    scheduledAt: "2026-09-03T10:00:00",
    duration: 60,
    status: "CANCELLED",
    teacherName: "Rahul Sharma",
    meetLink: "",
    attendanceMarked: false,
    notes: "Cancelled due to teacher unavailability, rescheduled to Sep 8",
  },
];

const statusConfig: Record<string, { label: string; variant: "success" | "primary" | "warning" | "danger" | "neutral"; icon: React.ReactNode }> = {
  COMPLETED: { label: "Completed", variant: "success", icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
  SCHEDULED: { label: "Upcoming", variant: "primary", icon: <Clock className="w-3.5 h-3.5" /> },
  IN_PROGRESS: { label: "In Progress", variant: "warning", icon: <Video className="w-3.5 h-3.5" /> },
  CANCELLED: { label: "Cancelled", variant: "danger", icon: <XCircle className="w-3.5 h-3.5" /> },
  RESCHEDULED: { label: "Rescheduled", variant: "neutral", icon: <RefreshCw className="w-3.5 h-3.5" /> },
};

export default function StudentClassesPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState("");

  const tabs = [
    { id: "all", label: "All Classes", count: classes.length },
    { id: "upcoming", label: "Upcoming", count: classes.filter((c) => c.status === "SCHEDULED").length },
    { id: "completed", label: "Completed", count: classes.filter((c) => c.status === "COMPLETED").length },
    { id: "cancelled", label: "Cancelled", count: classes.filter((c) => c.status === "CANCELLED").length },
  ];

  const subjects = [...new Set(classes.map((c) => c.subject))];

  let filtered = classes;
  if (activeTab === "upcoming") filtered = classes.filter((c) => c.status === "SCHEDULED");
  else if (activeTab === "completed") filtered = classes.filter((c) => c.status === "COMPLETED");
  else if (activeTab === "cancelled") filtered = classes.filter((c) => c.status === "CANCELLED");
  if (selectedSubject) filtered = filtered.filter((c) => c.subject === selectedSubject);

  // Sort by date, upcoming first
  filtered.sort((a, b) => {
    if (a.status === "SCHEDULED" && b.status !== "SCHEDULED") return -1;
    if (b.status === "SCHEDULED" && a.status !== "SCHEDULED") return 1;
    return new Date(b.scheduledAt).getTime() - new Date(a.scheduledAt).getTime();
  });

  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "var(--font-display)" }}>
              My Classes
            </h1>
            <p className="text-gray-500 mt-1">
              View your scheduled, completed, and past classes
            </p>
          </div>
          <Link href="/student/calendar">
            <Button variant="outline" size="sm" icon={<CalendarDays className="w-4 h-4" />}>
              Calendar View
            </Button>
          </Link>
        </div>

        {/* Tabs + Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
          <div className="flex gap-2 ml-auto">
            {subjects.map((subject) => (
              <button
                key={subject}
                onClick={() => setSelectedSubject(selectedSubject === subject ? "" : subject)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedSubject === subject
                    ? "bg-primary-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {subject}
              </button>
            ))}
          </div>
        </div>

        {/* Classes List */}
        {filtered.length === 0 ? (
          <EmptyState
            icon={<CalendarDays className="w-8 h-8" />}
            title="No classes found"
            description="No classes match your current filters. Try adjusting them."
          />
        ) : (
          <div className="space-y-3">
            {filtered.map((cls) => {
              const config = statusConfig[cls.status] || statusConfig.SCHEDULED;
              const isToday = new Date(cls.scheduledAt).toDateString() === new Date().toDateString();
              const scheduledTime = new Date(cls.scheduledAt);

              return (
                <Card key={cls.id} padding="none" className="overflow-hidden">
                  <div className="flex items-stretch">
                    {/* Color sidebar */}
                    <div
                      className={`w-1.5 flex-shrink-0 ${
                        cls.status === "COMPLETED"
                          ? "bg-accent-400"
                          : cls.status === "CANCELLED"
                          ? "bg-gray-300"
                          : "bg-primary-400"
                      }`}
                    />

                    <div className="flex-1 p-5">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <Avatar name={cls.teacherName} size="md" />
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="font-semibold text-gray-900">{cls.subject}</h3>
                              <Badge variant={config.variant}>
                                <span className="flex items-center gap-1">
                                  {config.icon} {config.label}
                                </span>
                              </Badge>
                              {isToday && cls.status === "SCHEDULED" && (
                                <Badge variant="warning">Today</Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mt-0.5">{cls.topic}</p>
                            <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                              <span className="flex items-center gap-1">
                                <CalendarDays className="w-3.5 h-3.5" />
                                {scheduledTime.toLocaleDateString("en-IN", {
                                  weekday: "short",
                                  month: "short",
                                  day: "numeric",
                                })}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5" />
                                {scheduledTime.toLocaleTimeString("en-IN", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}{" "}
                                • {cls.duration} min
                              </span>
                              <span className="flex items-center gap-1">
                                <GraduationCap className="w-3.5 h-3.5" />
                                {cls.teacherName}
                              </span>
                            </div>
                            {cls.notes && (
                              <p className="text-xs text-gray-400 mt-2 italic">
                                📝 {cls.notes}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 md:flex-shrink-0">
                          {cls.status === "SCHEDULED" && cls.meetLink && (
                            <a
                              href={cls.meetLink}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Button variant="primary" size="sm" icon={<Video className="w-4 h-4" />}>
                                Join Class
                              </Button>
                            </a>
                          )}
                          {cls.status === "COMPLETED" && cls.attendanceMarked && (
                            <span className="text-xs text-accent-600 font-medium flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Attended
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
