"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, Badge, ProgressBar, Avatar, StarRating } from "@/components/ui";
import {
  TrendingUp,
  CheckCircle2,
  BookOpen,
  Award,
  Target,
  Calendar,
  BarChart3,
  AlertCircle,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

const subjectProgress = [
  {
    subject: "Mathematics",
    teacherName: "Rahul Sharma",
    totalClasses: 24,
    attendedClasses: 22,
    attendanceRate: 92,
    syllabusProgress: 82,
    assignments: { total: 8, completed: 7, avgScore: 88 },
    strongTopics: ["Quadratic Equations", "Arithmetic Progressions", "Probability"],
    weakTopics: ["Trigonometry", "Mensuration"],
    monthlyScores: [72, 75, 80, 85, 88],
    trend: "up",
  },
  {
    subject: "Physics",
    teacherName: "Priya Mehta",
    totalClasses: 18,
    attendedClasses: 16,
    attendanceRate: 89,
    syllabusProgress: 65,
    assignments: { total: 6, completed: 5, avgScore: 75 },
    strongTopics: ["Kinematics", "Laws of Motion"],
    weakTopics: ["Thermodynamics", "Electrostatics"],
    monthlyScores: [60, 65, 70, 72, 75],
    trend: "up",
  },
  {
    subject: "Chemistry",
    teacherName: "Aman Kumar",
    totalClasses: 12,
    attendedClasses: 10,
    attendanceRate: 83,
    syllabusProgress: 48,
    assignments: { total: 4, completed: 3, avgScore: 70 },
    strongTopics: ["Chemical Bonding"],
    weakTopics: ["Organic Chemistry", "Redox Reactions"],
    monthlyScores: [55, 60, 65, 68, 70],
    trend: "up",
  },
];

export default function StudentProgressPage() {
  const overallAttendance = Math.round(
    subjectProgress.reduce((s, sp) => s + sp.attendanceRate, 0) / subjectProgress.length
  );
  const overallAvgScore = Math.round(
    subjectProgress.reduce((s, sp) => s + sp.assignments.avgScore, 0) / subjectProgress.length
  );
  const totalCompleted = subjectProgress.reduce((s, sp) => s + sp.assignments.completed, 0);
  const totalAssignments = subjectProgress.reduce((s, sp) => s + sp.assignments.total, 0);

  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "var(--font-display)" }}>
          Progress & Analytics
        </h1>

        {/* Overall Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">Overall Attendance</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{overallAttendance}%</p>
                <p className="text-xs text-accent-600 font-semibold mt-1">
                  <ArrowUp className="w-3 h-3 inline" /> 3% this month
                </p>
              </div>
              <div className="p-2.5 rounded-xl bg-accent-50">
                <CheckCircle2 className="w-5 h-5 text-accent-600" />
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">Average Score</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{overallAvgScore}%</p>
                <p className="text-xs text-accent-600 font-semibold mt-1">
                  <ArrowUp className="w-3 h-3 inline" /> 5% improvement
                </p>
              </div>
              <div className="p-2.5 rounded-xl bg-primary-50">
                <Award className="w-5 h-5 text-primary-600" />
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">Assignments Done</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {totalCompleted}/{totalAssignments}
                </p>
              </div>
              <div className="p-2.5 rounded-xl bg-warm-50">
                <BookOpen className="w-5 h-5 text-warm-600" />
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Subjects</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{subjectProgress.length}</p>
              </div>
              <div className="p-2.5 rounded-xl bg-purple-50">
                <Target className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Subject-wise Breakdown */}
        <div className="space-y-6">
          {subjectProgress.map((sp) => (
            <Card key={sp.subject} padding="none">
              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar name={sp.teacherName} size="sm" />
                  <div>
                    <h3 className="font-bold text-gray-900">{sp.subject}</h3>
                    <p className="text-xs text-gray-500">with {sp.teacherName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      sp.assignments.avgScore >= 80
                        ? "success"
                        : sp.assignments.avgScore >= 60
                        ? "primary"
                        : "warning"
                    }
                  >
                    Avg: {sp.assignments.avgScore}%
                  </Badge>
                  <div className="flex items-center gap-1 text-sm">
                    {sp.trend === "up" ? (
                      <ArrowUp className="w-4 h-4 text-accent-500" />
                    ) : (
                      <ArrowDown className="w-4 h-4 text-danger-500" />
                    )}
                    <span className={sp.trend === "up" ? "text-accent-600 font-semibold" : "text-danger-500 font-semibold"}>
                      Trending {sp.trend}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Progress bars */}
                  <div className="space-y-4">
                    <ProgressBar
                      value={sp.syllabusProgress}
                      label="Syllabus Progress"
                      color={sp.syllabusProgress >= 80 ? "accent" : sp.syllabusProgress >= 50 ? "primary" : "warm"}
                    />
                    <ProgressBar
                      value={sp.attendanceRate}
                      label="Attendance"
                      color={sp.attendanceRate >= 90 ? "accent" : sp.attendanceRate >= 75 ? "primary" : "danger"}
                    />
                    <div className="text-xs text-gray-500 mt-2">
                      {sp.attendedClasses}/{sp.totalClasses} classes attended
                    </div>
                  </div>

                  {/* Score trend (mini bar chart) */}
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-3">Monthly Score Trend</p>
                    <div className="flex items-end gap-2 h-24">
                      {sp.monthlyScores.map((score, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1">
                          <span className="text-[10px] font-semibold text-gray-500">{score}%</span>
                          <div
                            className="w-full rounded-t-lg bg-gradient-to-t from-primary-500 to-primary-400 transition-all"
                            style={{ height: `${(score / 100) * 80}px` }}
                          />
                          <span className="text-[10px] text-gray-400">M{i + 1}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Strong / Weak topics */}
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-semibold text-accent-600 mb-1.5 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Strong Topics
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {sp.strongTopics.map((t) => (
                          <span
                            key={t}
                            className="text-xs px-2 py-0.5 rounded-full bg-accent-50 text-accent-700 border border-accent-100"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-warm-600 mb-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> Needs Work
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {sp.weakTopics.map((t) => (
                          <span
                            key={t}
                            className="text-xs px-2 py-0.5 rounded-full bg-warm-50 text-warm-700 border border-warm-100"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
