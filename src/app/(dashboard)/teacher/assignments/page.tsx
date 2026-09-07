"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, Badge, Button, Tabs, Avatar, Input, Modal } from "@/components/ui";
import {
  Plus,
  FileText,
  Clock,
  CheckCircle2,
  Send,
  Search,
  Award,
  BookOpen,
  AlertCircle,
  ArrowRight,
} from "lucide-react";

const myStudents = [
  { id: "sp1", name: "Ananya Gupta", grade: "10th", subject: "Mathematics", enrollmentId: "e1" },
  { id: "sp2", name: "Rohan Patel", grade: "12th", subject: "Physics", enrollmentId: "e2" },
  { id: "sp3", name: "Priya Singh", grade: "11th", subject: "Mathematics", enrollmentId: "e3" },
  { id: "sp4", name: "Vikram Reddy", grade: "9th", subject: "Mathematics", enrollmentId: "e4" },
];

const assignments = [
  {
    id: "1",
    title: "Quadratic Equations Practice Set",
    subject: "Mathematics",
    studentName: "Ananya Gupta",
    createdAt: "2026-09-01",
    deadline: "2026-09-07",
    totalMarks: 50,
    status: "ASSIGNED",
    submissionCount: 0,
  },
  {
    id: "2",
    title: "Newton's Laws Problems",
    subject: "Physics",
    studentName: "Rohan Patel",
    createdAt: "2026-09-02",
    deadline: "2026-09-06",
    totalMarks: 40,
    status: "SUBMITTED",
    submissionCount: 1,
    submission: { marksObtained: null, submittedAt: "2026-09-05" },
  },
  {
    id: "3",
    title: "Probability Basics",
    subject: "Mathematics",
    studentName: "Priya Singh",
    createdAt: "2026-08-28",
    deadline: "2026-09-03",
    totalMarks: 30,
    status: "GRADED",
    submissionCount: 1,
    submission: { marksObtained: 26, submittedAt: "2026-09-02" },
  },
];

export default function TeacherAssignmentsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [showCreate, setShowCreate] = useState(false);
  const [showGrade, setShowGrade] = useState<string | null>(null);
  const [newAssignment, setNewAssignment] = useState({
    title: "",
    description: "",
    subject: "",
    topic: "",
    studentProfileId: "",
    enrollmentId: "",
    deadline: "",
    totalMarks: 50,
    difficulty: "MEDIUM",
  });
  const [gradeData, setGradeData] = useState({
    marksObtained: 0,
    feedback: "",
  });

  const tabs = [
    { id: "all", label: "All", count: assignments.length },
    { id: "pending", label: "Pending", count: assignments.filter((a) => a.status === "ASSIGNED").length },
    { id: "review", label: "To Review", count: assignments.filter((a) => a.status === "SUBMITTED").length },
    { id: "graded", label: "Graded", count: assignments.filter((a) => a.status === "GRADED").length },
  ];

  let filtered = assignments;
  if (activeTab === "pending") filtered = assignments.filter((a) => a.status === "ASSIGNED");
  else if (activeTab === "review") filtered = assignments.filter((a) => a.status === "SUBMITTED");
  else if (activeTab === "graded") filtered = assignments.filter((a) => a.status === "GRADED");

  const statusConfig: Record<string, { label: string; variant: "success" | "primary" | "warning" | "danger" | "neutral" }> = {
    ASSIGNED: { label: "Pending", variant: "warning" },
    SUBMITTED: { label: "Needs Review", variant: "primary" },
    GRADED: { label: "Graded", variant: "success" },
    OVERDUE: { label: "Overdue", variant: "danger" },
  };

  const handleCreateAssignment = async () => {
    // In production, this would POST to /api/assignments
    console.log("Creating assignment:", newAssignment);
    setShowCreate(false);
    setNewAssignment({
      title: "", description: "", subject: "", topic: "",
      studentProfileId: "", enrollmentId: "", deadline: "", totalMarks: 50, difficulty: "MEDIUM",
    });
  };

  const handleGrade = async (assignmentId: string) => {
    // In production, this would PUT to /api/assignments/submit
    console.log("Grading:", assignmentId, gradeData);
    setShowGrade(null);
    setGradeData({ marksObtained: 0, feedback: "" });
  };

  return (
    <DashboardLayout role="teacher">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "var(--font-display)" }}>
              Assignments
            </h1>
            <p className="text-gray-500 mt-1">Create, track, and grade student assignments</p>
          </div>
          <Button
            variant="primary"
            size="sm"
            icon={<Plus className="w-4 h-4" />}
            onClick={() => setShowCreate(true)}
          >
            New Assignment
          </Button>
        </div>

        {/* Quick stat: needs review */}
        {assignments.filter((a) => a.status === "SUBMITTED").length > 0 && (
          <div className="p-4 rounded-2xl bg-primary-50 border border-primary-100 flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary-100">
              <AlertCircle className="w-5 h-5 text-primary-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-primary-800">
                {assignments.filter((a) => a.status === "SUBMITTED").length} submissions awaiting your review
              </p>
              <p className="text-xs text-primary-600">Click on a submitted assignment to grade it</p>
            </div>
            <Button variant="primary" size="sm" onClick={() => setActiveTab("review")}>
              Review Now
            </Button>
          </div>
        )}

        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Assignment List */}
        <div className="space-y-3">
          {filtered.map((assignment) => {
            const config = statusConfig[assignment.status] || statusConfig.ASSIGNED;
            return (
              <Card key={assignment.id} padding="none">
                <div className="px-6 py-4 flex items-center gap-4">
                  <div className="p-2.5 rounded-xl bg-primary-50 flex-shrink-0">
                    <FileText className="w-5 h-5 text-primary-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-gray-900">{assignment.title}</h3>
                      <Badge variant={config.variant}>{config.label}</Badge>
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3 h-3" /> {assignment.subject}
                      </span>
                      <span>•</span>
                      <span>To: {assignment.studentName}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Due: {new Date(assignment.deadline).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}
                      </span>
                      <span>•</span>
                      <span>{assignment.totalMarks} marks</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {assignment.status === "SUBMITTED" && (
                      <Button
                        variant="primary"
                        size="sm"
                        icon={<Award className="w-4 h-4" />}
                        onClick={() => setShowGrade(assignment.id)}
                      >
                        Grade
                      </Button>
                    )}
                    {assignment.status === "GRADED" && assignment.submission && (
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">
                          {assignment.submission.marksObtained}/{assignment.totalMarks}
                        </p>
                        <p className="text-xs text-accent-600 font-semibold">
                          {Math.round((assignment.submission.marksObtained! / assignment.totalMarks) * 100)}%
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Create Assignment Modal */}
        <Modal
          isOpen={showCreate}
          onClose={() => setShowCreate(false)}
          title="Create New Assignment"
          size="lg"
        >
          <div className="space-y-4">
            <Input
              label="Title *"
              placeholder="e.g., Quadratic Equations Practice Set"
              value={newAssignment.title}
              onChange={(e) => setNewAssignment((p) => ({ ...p, title: e.target.value }))}
            />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="input-label">Student *</label>
                <select
                  value={newAssignment.studentProfileId}
                  onChange={(e) => {
                    const student = myStudents.find((s) => s.id === e.target.value);
                    setNewAssignment((p) => ({
                      ...p,
                      studentProfileId: e.target.value,
                      enrollmentId: student?.enrollmentId || "",
                      subject: student?.subject || "",
                    }));
                  }}
                  className="input-field"
                >
                  <option value="">Select student</option>
                  {myStudents.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} — {s.grade} ({s.subject})
                    </option>
                  ))}
                </select>
              </div>
              <Input
                label="Subject"
                value={newAssignment.subject}
                onChange={(e) => setNewAssignment((p) => ({ ...p, subject: e.target.value }))}
                disabled
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Topic"
                placeholder="e.g., Quadratic Equations"
                value={newAssignment.topic}
                onChange={(e) => setNewAssignment((p) => ({ ...p, topic: e.target.value }))}
              />
              <Input
                label="Deadline *"
                type="date"
                value={newAssignment.deadline}
                onChange={(e) => setNewAssignment((p) => ({ ...p, deadline: e.target.value }))}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Total Marks"
                type="number"
                value={newAssignment.totalMarks.toString()}
                onChange={(e) => setNewAssignment((p) => ({ ...p, totalMarks: parseInt(e.target.value) || 0 }))}
              />
              <div>
                <label className="input-label">Difficulty</label>
                <select
                  value={newAssignment.difficulty}
                  onChange={(e) => setNewAssignment((p) => ({ ...p, difficulty: e.target.value }))}
                  className="input-field"
                >
                  <option value="EASY">Easy</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HARD">Hard</option>
                </select>
              </div>
            </div>
            <div>
              <label className="input-label">Description / Instructions</label>
              <textarea
                value={newAssignment.description}
                onChange={(e) => setNewAssignment((p) => ({ ...p, description: e.target.value }))}
                placeholder="Describe the assignment, include instructions and question details..."
                className="input-field min-h-[100px] resize-y"
              />
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="ghost" onClick={() => setShowCreate(false)}>Cancel</Button>
              <Button
                variant="primary"
                icon={<Send className="w-4 h-4" />}
                onClick={handleCreateAssignment}
                disabled={!newAssignment.title || !newAssignment.studentProfileId || !newAssignment.deadline}
              >
                Create & Assign
              </Button>
            </div>
          </div>
        </Modal>

        {/* Grade Modal */}
        <Modal
          isOpen={!!showGrade}
          onClose={() => setShowGrade(null)}
          title="Grade Assignment"
          size="sm"
        >
          <div className="space-y-4">
            <Input
              label="Marks Obtained"
              type="number"
              value={gradeData.marksObtained.toString()}
              onChange={(e) => setGradeData((p) => ({ ...p, marksObtained: parseInt(e.target.value) || 0 }))}
            />
            <div>
              <label className="input-label">Feedback</label>
              <textarea
                value={gradeData.feedback}
                onChange={(e) => setGradeData((p) => ({ ...p, feedback: e.target.value }))}
                placeholder="Provide feedback on the student's work..."
                className="input-field min-h-[80px] resize-y"
              />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="ghost" onClick={() => setShowGrade(null)}>Cancel</Button>
              <Button
                variant="accent"
                icon={<CheckCircle2 className="w-4 h-4" />}
                onClick={() => showGrade && handleGrade(showGrade)}
              >
                Submit Grade
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </DashboardLayout>
  );
}
