"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, Badge, Avatar, ProgressBar, Button, Input } from "@/components/ui";
import {
  Users,
  Search,
  BookOpen,
  Calendar,
  TrendingUp,
  MessageSquare,
  Star,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { useState } from "react";

const students = [
  {
    name: "Ananya Gupta",
    grade: "10th",
    board: "CBSE",
    subject: "Mathematics",
    enrollmentStatus: "ACTIVE",
    joinedDate: "2026-06-15",
    classesAttended: 22,
    totalClasses: 24,
    assignmentsCompleted: 7,
    totalAssignments: 8,
    avgScore: 88,
    progress: 82,
    nextClass: "Today, 10:00 AM",
    lastActive: "2 hours ago",
  },
  {
    name: "Rohan Patel",
    grade: "12th",
    board: "CBSE",
    subject: "Physics",
    enrollmentStatus: "ACTIVE",
    joinedDate: "2026-07-01",
    classesAttended: 16,
    totalClasses: 18,
    assignmentsCompleted: 5,
    totalAssignments: 6,
    avgScore: 75,
    progress: 65,
    nextClass: "Today, 2:00 PM",
    lastActive: "1 day ago",
  },
  {
    name: "Priya Singh",
    grade: "11th",
    board: "ICSE",
    subject: "Mathematics",
    enrollmentStatus: "ACTIVE",
    joinedDate: "2026-08-10",
    classesAttended: 10,
    totalClasses: 12,
    assignmentsCompleted: 3,
    totalAssignments: 4,
    avgScore: 70,
    progress: 48,
    nextClass: "Today, 6:00 PM",
    lastActive: "3 hours ago",
  },
  {
    name: "Vikram Reddy",
    grade: "9th",
    board: "State Board",
    subject: "Mathematics",
    enrollmentStatus: "ACTIVE",
    joinedDate: "2026-05-20",
    classesAttended: 28,
    totalClasses: 30,
    assignmentsCompleted: 10,
    totalAssignments: 10,
    avgScore: 92,
    progress: 90,
    nextClass: "Tomorrow, 5:00 PM",
    lastActive: "5 hours ago",
  },
  {
    name: "Meera Iyer",
    grade: "10th",
    board: "CBSE",
    subject: "Mathematics",
    enrollmentStatus: "DEMO_COMPLETED",
    joinedDate: "2026-09-01",
    classesAttended: 1,
    totalClasses: 1,
    assignmentsCompleted: 0,
    totalAssignments: 0,
    avgScore: 0,
    progress: 0,
    nextClass: "Awaiting confirmation",
    lastActive: "2 days ago",
  },
];

export default function TeacherStudentsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.grade.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout role="teacher">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "var(--font-display)" }}>
              My Students
            </h1>
            <p className="text-gray-500 mt-1">
              {students.filter((s) => s.enrollmentStatus === "ACTIVE").length} active students
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, subject, or grade..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pl-10"
          />
        </div>

        {/* Students Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {filtered.map((student, i) => {
            const attendanceRate = Math.round(
              (student.classesAttended / student.totalClasses) * 100
            );

            return (
              <Card key={i} hover>
                <div className="flex items-start gap-4 mb-4">
                  <Avatar name={student.name} size="lg" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-gray-900">{student.name}</h3>
                      <Badge
                        variant={
                          student.enrollmentStatus === "ACTIVE"
                            ? "success"
                            : "warning"
                        }
                      >
                        {student.enrollmentStatus === "ACTIVE" ? "Active" : "Demo Done"}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500">
                      {student.grade} • {student.board} • {student.subject}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Joined {new Date(student.joinedDate).toLocaleDateString("en-IN", {
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                {student.enrollmentStatus === "ACTIVE" && (
                  <>
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <div className="text-center p-2.5 rounded-xl bg-gray-50">
                        <p className="text-lg font-bold text-gray-900">{attendanceRate}%</p>
                        <p className="text-[10px] text-gray-500">Attendance</p>
                      </div>
                      <div className="text-center p-2.5 rounded-xl bg-gray-50">
                        <p className="text-lg font-bold text-gray-900">{student.avgScore}%</p>
                        <p className="text-[10px] text-gray-500">Avg Score</p>
                      </div>
                      <div className="text-center p-2.5 rounded-xl bg-gray-50">
                        <p className="text-lg font-bold text-gray-900">
                          {student.assignmentsCompleted}/{student.totalAssignments}
                        </p>
                        <p className="text-[10px] text-gray-500">Assignments</p>
                      </div>
                    </div>

                    <ProgressBar
                      value={student.progress}
                      label="Syllabus Progress"
                      color={
                        student.progress >= 80
                          ? "accent"
                          : student.progress >= 50
                          ? "primary"
                          : "warm"
                      }
                      size="sm"
                    />

                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                      <div className="text-xs text-gray-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Next: {student.nextClass}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" icon={<MessageSquare className="w-3.5 h-3.5" />}>
                          Message
                        </Button>
                        <Button variant="outline" size="sm" icon={<BookOpen className="w-3.5 h-3.5" />}>
                          Assign
                        </Button>
                      </div>
                    </div>
                  </>
                )}

                {student.enrollmentStatus === "DEMO_COMPLETED" && (
                  <div className="mt-4 p-3 rounded-xl bg-warm-50 border border-warm-100 text-sm text-warm-700">
                    Demo completed. Awaiting student confirmation to begin regular classes.
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
