"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  GraduationCap,
  BookOpen,
  Calendar,
  Target,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { Button, Input, Card, Badge } from "@/components/ui";
import { SUBJECTS, BOARDS, GRADES, LANGUAGES, DAYS_OF_WEEK, DAY_LABELS } from "@/lib/utils";

const STEPS = [
  { id: "basics", title: "Academic Details", icon: BookOpen },
  { id: "subjects", title: "Subjects & Goals", icon: Target },
  { id: "schedule", title: "Schedule Preferences", icon: Calendar },
  { id: "complete", title: "You're Ready!", icon: Sparkles },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    grade: "",
    board: "",
    school: "",
    subjects: [] as string[],
    currentLevel: "",
    targetGoal: "",
    preferredLanguage: "English",
    preferredDuration: 60,
    preferredDays: [] as string[],
    preferredTimeStart: "16:00",
    preferredTimeEnd: "20:00",
    monthlyBudget: 0,
    learningPreferences: "",
    examDate: "",
  });

  const updateField = (field: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleArrayItem = (field: "subjects" | "preferredDays", value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((v) => v !== value)
        : [...prev[field], value],
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/students/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          preferredTimeRanges: [
            { start: formData.preferredTimeStart, end: formData.preferredTimeEnd },
          ],
        }),
      });

      if (res.ok) {
        setStep(3); // Complete step
      }
    } catch (error) {
      console.error("Profile update failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2.5 mb-6">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-extrabold" style={{ fontFamily: "var(--font-display)" }}>
              <span className="text-gradient">Tutor</span>
              <span className="text-gray-900">Connect</span>
            </span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "var(--font-display)" }}>
            Let&apos;s set up your learning profile
          </h1>
          <p className="text-gray-500 mt-2">This helps us find the perfect teacher for you</p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  i <= step
                    ? "gradient-primary text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {i < step ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
              </div>
              <span className="text-sm font-medium text-gray-600 hidden sm:block">{s.title}</span>
              {i < STEPS.length - 1 && (
                <div className={`w-8 h-0.5 rounded ${i < step ? "bg-primary-500" : "bg-gray-200"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <Card className="animate-fade-in-up">
          {/* Step 1: Basics */}
          {step === 0 && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-gray-900">Tell us about your academic background</h2>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="input-label">Grade/Class *</label>
                  <select
                    value={formData.grade}
                    onChange={(e) => updateField("grade", e.target.value)}
                    className="input-field"
                  >
                    <option value="">Select grade</option>
                    {GRADES.map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="input-label">Board/Curriculum *</label>
                  <select
                    value={formData.board}
                    onChange={(e) => updateField("board", e.target.value)}
                    className="input-field"
                  >
                    <option value="">Select board</option>
                    {BOARDS.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
              </div>

              <Input
                label="School (optional)"
                placeholder="Enter your school name"
                value={formData.school}
                onChange={(e) => updateField("school", e.target.value)}
              />

              <div>
                <label className="input-label">Preferred Language</label>
                <select
                  value={formData.preferredLanguage}
                  onChange={(e) => updateField("preferredLanguage", e.target.value)}
                  className="input-field"
                >
                  {LANGUAGES.map((l) => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Step 2: Subjects & Goals */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-gray-900">What would you like to learn?</h2>

              <div>
                <label className="input-label">Select Subjects * (pick at least one)</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {SUBJECTS.map((subject) => (
                    <button
                      key={subject}
                      type="button"
                      onClick={() => toggleArrayItem("subjects", subject)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                        formData.subjects.includes(subject)
                          ? "bg-primary-500 text-white shadow-lg shadow-primary-500/25"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {subject}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="input-label">Current Academic Level</label>
                  <select
                    value={formData.currentLevel}
                    onChange={(e) => updateField("currentLevel", e.target.value)}
                    className="input-field"
                  >
                    <option value="">Select level</option>
                    <option value="beginner">Beginner — Need basics</option>
                    <option value="intermediate">Intermediate — Need improvement</option>
                    <option value="advanced">Advanced — Need perfection</option>
                  </select>
                </div>
                <div>
                  <label className="input-label">Learning Goal</label>
                  <select
                    value={formData.targetGoal}
                    onChange={(e) => updateField("targetGoal", e.target.value)}
                    className="input-field"
                  >
                    <option value="">Select goal</option>
                    <option value="school_exams">Improve school exam scores</option>
                    <option value="board_exams">Board exam preparation</option>
                    <option value="competitive">Competitive exam (JEE/NEET)</option>
                    <option value="olympiad">Olympiad preparation</option>
                    <option value="conceptual">Conceptual understanding</option>
                    <option value="homework">Homework help</option>
                  </select>
                </div>
              </div>

              <Input
                label="Exam Date (if applicable)"
                type="date"
                value={formData.examDate}
                onChange={(e) => updateField("examDate", e.target.value)}
              />

              <div>
                <label className="input-label">Monthly Budget (₹)</label>
                <input
                  type="range"
                  min="2000"
                  max="30000"
                  step="1000"
                  value={formData.monthlyBudget || 8000}
                  onChange={(e) => updateField("monthlyBudget", parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-primary-600"
                />
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-500">₹2,000</span>
                  <span className="text-sm font-bold text-primary-600">
                    ₹{(formData.monthlyBudget || 8000).toLocaleString()}/month
                  </span>
                  <span className="text-xs text-gray-500">₹30,000</span>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Schedule */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-gray-900">When would you like to study?</h2>

              <div>
                <label className="input-label">Preferred Days *</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {DAYS_OF_WEEK.map((day) => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => toggleArrayItem("preferredDays", day)}
                      className={`w-14 h-14 rounded-xl text-sm font-semibold transition-all ${
                        formData.preferredDays.includes(day)
                          ? "bg-primary-500 text-white shadow-lg shadow-primary-500/25"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {DAY_LABELS[day]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="input-label">Available From</label>
                  <input
                    type="time"
                    value={formData.preferredTimeStart}
                    onChange={(e) => updateField("preferredTimeStart", e.target.value)}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="input-label">Available Until</label>
                  <input
                    type="time"
                    value={formData.preferredTimeEnd}
                    onChange={(e) => updateField("preferredTimeEnd", e.target.value)}
                    className="input-field"
                  />
                </div>
              </div>

              <div>
                <label className="input-label">Preferred Class Duration</label>
                <div className="flex gap-3 mt-2">
                  {[30, 45, 60, 90, 120].map((duration) => (
                    <button
                      key={duration}
                      type="button"
                      onClick={() => updateField("preferredDuration", duration)}
                      className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                        formData.preferredDuration === duration
                          ? "bg-primary-500 text-white shadow-lg shadow-primary-500/25"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {duration} min
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Complete */}
          {step === 3 && (
            <div className="text-center py-8">
              <div className="w-20 h-20 rounded-full gradient-accent flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: "var(--font-display)" }}>
                You&apos;re all set! 🎉
              </h2>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                Your profile is ready. Now let&apos;s find the perfect teacher for you.
                Our AI will match you with the best tutors based on your preferences.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={() => router.push("/student/teachers")}
                  variant="primary"
                  size="lg"
                  icon={<Sparkles className="w-5 h-5" />}
                >
                  Find My Teacher
                </Button>
                <Button
                  onClick={() => router.push("/student")}
                  variant="outline"
                  size="lg"
                >
                  Go to Dashboard
                </Button>
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          {step < 3 && (
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
              {step > 0 ? (
                <Button
                  variant="ghost"
                  onClick={() => setStep(step - 1)}
                  icon={<ChevronLeft className="w-4 h-4" />}
                >
                  Back
                </Button>
              ) : (
                <div />
              )}

              {step < 2 ? (
                <Button
                  variant="primary"
                  onClick={() => setStep(step + 1)}
                  disabled={
                    (step === 0 && (!formData.grade || !formData.board)) ||
                    (step === 1 && formData.subjects.length === 0)
                  }
                >
                  Continue
                  <ChevronRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  variant="primary"
                  onClick={handleSubmit}
                  isLoading={isLoading}
                  disabled={formData.preferredDays.length === 0}
                >
                  Complete Setup
                  <CheckCircle2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
