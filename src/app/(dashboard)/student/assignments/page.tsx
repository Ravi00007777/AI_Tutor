"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, Badge, Button, Tabs, Avatar, EmptyState, ProgressBar } from "@/components/ui";
import {
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  Upload,
  ArrowRight,
  CalendarDays,
  BookOpen,
  Award,
  Download,
} from "lucide-react";

const assignments = [
  {
    id: "1",
    title: "Quadratic Equations Practice Set",
    subject: "Mathematics",
    topic: "Quadratic Equations",
    teacherName: "Rahul Sharma",
    createdAt: "2026-09-01",
    deadline: "2026-09-07",
    totalMarks: 50,
    difficulty: "MEDIUM",
    status: "ASSIGNED",
    description: "Complete questions 1-20 from the practice sheet. Show all working steps.",
    submission: null,
  },
  {
    id: "2",
    title: "Newton's Laws Problems",
    subject: "Physics",
    topic: "Laws of Motion",
    teacherName: "Priya Mehta",
    createdAt: "2026-09-02",
    deadline: "2026-09-06",
    totalMarks: 40,
    difficulty: "HARD",
    status: "OVERDUE",
    description: "Solve numerical problems from the attached PDF. Use proper free body diagrams.",
    submission: null,
  },
  {
    id: "3",
    title: "Chemical Bonding Worksheet",
    subject: "Chemistry",
    topic: "Chemical Bonding",
    teacherName: "Aman Kumar",
    createdAt: "2026-08-28",
    deadline: "2026-09-03",
    totalMarks: 30,
    difficulty: "EASY",
    status: "GRADED",
    description: "Complete the worksheet on ionic and covalent bonding.",
    submission: {
      submittedAt: "2026-09-02",
      marksObtained: 26,
      feedback: "Excellent work! Minor error in Q7 on hybridization. Keep it up!",
      grade: "A",
    },
  },
  {
    id: "4",
    title: "Trigonometry Identity Proofs",
    subject: "Mathematics",
    topic: "Trigonometry",
    teacherName: "Rahul Sharma",
    createdAt: "2026-08-25",
    deadline: "2026-08-30",
    totalMarks: 40,
    difficulty: "HARD",
    status: "GRADED",
    description: "Prove the 10 trigonometric identities listed in the assignment.",
    submission: {
      submittedAt: "2026-08-29",
      marksObtained: 35,
      feedback: "Good proofs overall. Q6 needs a cleaner approach.",
      grade: "A",
    },
  },
  {
    id: "5",
    title: "Kinematics Graph Analysis",
    subject: "Physics",
    topic: "Kinematics",
    teacherName: "Priya Mehta",
    createdAt: "2026-08-20",
    deadline: "2026-08-26",
    totalMarks: 25,
    difficulty: "MEDIUM",
    status: "SUBMITTED",
    description: "Analyze the given v-t and s-t graphs and answer the questions.",
    submission: {
      submittedAt: "2026-08-25",
      marksObtained: null,
      feedback: null,
      grade: null,
    },
  },
];

const statusConfig: Record<string, { label: string; variant: "success" | "primary" | "warning" | "danger" | "neutral"; icon: React.ReactNode }> = {
  ASSIGNED: { label: "Pending", variant: "warning", icon: <Clock className="w-3.5 h-3.5" /> },
  OVERDUE: { label: "Overdue", variant: "danger", icon: <AlertCircle className="w-3.5 h-3.5" /> },
  SUBMITTED: { label: "Submitted", variant: "primary", icon: <Upload className="w-3.5 h-3.5" /> },
  GRADED: { label: "Graded", variant: "success", icon: <Award className="w-3.5 h-3.5" /> },
};

const difficultyColors: Record<string, string> = {
  EASY: "text-accent-600 bg-accent-50",
  MEDIUM: "text-warm-600 bg-warm-50",
  HARD: "text-danger-500 bg-danger-50",
};

export default function StudentAssignmentsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const tabs = [
    { id: "all", label: "All", count: assignments.length },
    { id: "pending", label: "Pending", count: assignments.filter((a) => a.status === "ASSIGNED" || a.status === "OVERDUE").length },
    { id: "submitted", label: "Submitted", count: assignments.filter((a) => a.status === "SUBMITTED").length },
    { id: "graded", label: "Graded", count: assignments.filter((a) => a.status === "GRADED").length },
  ];

  let filtered = assignments;
  if (activeTab === "pending") filtered = assignments.filter((a) => a.status === "ASSIGNED" || a.status === "OVERDUE");
  else if (activeTab === "submitted") filtered = assignments.filter((a) => a.status === "SUBMITTED");
  else if (activeTab === "graded") filtered = assignments.filter((a) => a.status === "GRADED");

  // Stats
  const totalAssignments = assignments.length;
  const completed = assignments.filter((a) => a.status === "GRADED" || a.status === "SUBMITTED").length;
  const avgScore = assignments
    .filter((a) => a.submission?.marksObtained != null)
    .reduce((sum, a) => sum + ((a.submission!.marksObtained! / a.totalMarks) * 100), 0) /
    (assignments.filter((a) => a.submission?.marksObtained != null).length || 1);

  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "var(--font-display)" }}>
          Assignments
        </h1>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="!p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary-50">
                <FileText className="w-4 h-4 text-primary-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Completion</p>
                <p className="text-lg font-bold text-gray-900">{completed}/{totalAssignments}</p>
              </div>
            </div>
          </Card>
          <Card className="!p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent-50">
                <Award className="w-4 h-4 text-accent-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Average Score</p>
                <p className="text-lg font-bold text-gray-900">{avgScore.toFixed(0)}%</p>
              </div>
            </div>
          </Card>
          <Card className="!p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-danger-50">
                <AlertCircle className="w-4 h-4 text-danger-500" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Overdue</p>
                <p className="text-lg font-bold text-gray-900">
                  {assignments.filter((a) => a.status === "OVERDUE").length}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Assignment List */}
        {filtered.length === 0 ? (
          <EmptyState
            icon={<FileText className="w-8 h-8" />}
            title="No assignments"
            description="You're all caught up! No assignments in this category."
          />
        ) : (
          <div className="space-y-3">
            {filtered.map((assignment) => {
              const config = statusConfig[assignment.status] || statusConfig.ASSIGNED;
              const isExpanded = expandedId === assignment.id;
              const deadline = new Date(assignment.deadline);
              const isOverdue = assignment.status === "OVERDUE" || (assignment.status === "ASSIGNED" && deadline < new Date());
              const scorePercentage = assignment.submission?.marksObtained != null
                ? Math.round((assignment.submission.marksObtained / assignment.totalMarks) * 100)
                : null;

              return (
                <Card key={assignment.id} padding="none" className="overflow-hidden">
                  {/* Main row */}
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : assignment.id)}
                    className="w-full text-left px-6 py-4 flex items-center gap-4 hover:bg-gray-50/50 transition-colors"
                  >
                    <div className="p-2.5 rounded-xl bg-primary-50 flex-shrink-0">
                      <FileText className="w-5 h-5 text-primary-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-gray-900">{assignment.title}</h3>
                        <Badge variant={config.variant}>
                          <span className="flex items-center gap-1">{config.icon} {config.label}</span>
                        </Badge>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${difficultyColors[assignment.difficulty] || ""}`}>
                          {assignment.difficulty}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                        <span>{assignment.subject}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <CalendarDays className="w-3 h-3" />
                          Due: {deadline.toLocaleDateString("en-IN", { month: "short", day: "numeric" })}
                          {isOverdue && assignment.status === "ASSIGNED" && (
                            <span className="text-danger-500 font-semibold ml-1">OVERDUE</span>
                          )}
                        </span>
                        <span>•</span>
                        <span>{assignment.totalMarks} marks</span>
                        <span>•</span>
                        <span>{assignment.teacherName}</span>
                      </div>
                    </div>

                    {/* Score badge for graded */}
                    {scorePercentage !== null && (
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900">
                            {assignment.submission!.marksObtained}/{assignment.totalMarks}
                          </p>
                          <p className={`text-xs font-semibold ${
                            scorePercentage >= 80 ? "text-accent-600" : scorePercentage >= 60 ? "text-primary-600" : "text-warm-600"
                          }`}>
                            {scorePercentage}%
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Submit button for pending */}
                    {(assignment.status === "ASSIGNED" || assignment.status === "OVERDUE") && (
                      <Button
                        variant={isOverdue ? "danger" : "primary"}
                        size="sm"
                        icon={<Upload className="w-4 h-4" />}
                        onClick={(e) => { e.stopPropagation(); }}
                      >
                        Submit
                      </Button>
                    )}
                  </button>

                  {/* Expanded details */}
                  {isExpanded && (
                    <div className="px-6 pb-5 border-t border-gray-50 pt-4 animate-fade-in">
                      <p className="text-sm text-gray-600 mb-4">{assignment.description}</p>

                      {assignment.submission?.feedback && (
                        <div className="p-4 rounded-xl bg-accent-50 border border-accent-100 mb-4">
                          <p className="text-xs font-bold text-accent-700 mb-1">Teacher Feedback</p>
                          <p className="text-sm text-accent-800">{assignment.submission.feedback}</p>
                        </div>
                      )}

                      {scorePercentage !== null && (
                        <div className="mt-3">
                          <ProgressBar
                            value={scorePercentage}
                            color={scorePercentage >= 80 ? "accent" : scorePercentage >= 60 ? "primary" : "warm"}
                            label="Score"
                            size="md"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
