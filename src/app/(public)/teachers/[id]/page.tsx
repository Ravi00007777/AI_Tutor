"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Star,
  Clock,
  Users,
  CheckCircle2,
  Video,
  Calendar,
  BookOpen,
  GraduationCap,
  ArrowLeft,
  ArrowRight,
  MapPin,
  MessageSquare,
  Shield,
  Award,
  Sparkles,
  TrendingUp,
  Globe,
} from "lucide-react";

// Mock data — in production this comes from the API
const teachersMap: Record<string, {
  id: string; name: string; bio: string; subjects: string[]; grades: string[]; boards: string[];
  languages: string[]; experienceYears: number; hourlyRate: number; monthlyRate: number;
  rating: number; totalReviews: number; currentStudents: number; maxStudents: number;
  isVerified: boolean; teachingStyle: string; education: string; university: string;
  qualifications: string[]; matchScore: number;
}> = {
  "1": {
    id: "1", name: "Rahul Sharma", bio: "Passionate mathematics educator with 5+ years of experience teaching CBSE and ICSE students. I specialize in making complex concepts simple through visual explanations and real-world examples. My students consistently score 90+ in board exams.\n\nMy teaching philosophy: Every student can excel in math with the right approach. I focus on building strong fundamentals before moving to advanced problems.",
    subjects: ["Mathematics", "Physics"], grades: ["8th", "9th", "10th", "11th", "12th"], boards: ["CBSE", "ICSE"],
    languages: ["English", "Hindi"], experienceYears: 5, hourlyRate: 500, monthlyRate: 8000,
    rating: 4.8, totalReviews: 43, currentStudents: 24, maxStudents: 30, isVerified: true,
    teachingStyle: "Interactive & Visual", education: "M.Sc Mathematics", university: "Delhi University",
    qualifications: ["M.Sc Mathematics", "B.Ed", "CTET Qualified"], matchScore: 94,
  },
  "2": {
    id: "2", name: "Priya Mehta", bio: "IIT Bombay graduate with a passion for teaching physics. I use real-world examples and experiments to make physics intuitive and fun.\n\nI believe in building intuition first — if you can visualize it, you can solve any problem.",
    subjects: ["Physics"], grades: ["11th", "12th", "JEE/NEET"], boards: ["CBSE", "State Board"],
    languages: ["English", "Hindi", "Gujarati"], experienceYears: 7, hourlyRate: 700, monthlyRate: 12000,
    rating: 4.9, totalReviews: 67, currentStudents: 18, maxStudents: 20, isVerified: true,
    teachingStyle: "Concept-First", education: "B.Tech IIT Bombay", university: "IIT Bombay",
    qualifications: ["B.Tech IIT Bombay", "Physics Olympiad Gold"], matchScore: 89,
  },
  "3": {
    id: "3", name: "Aman Kumar", bio: "Chemistry teacher specializing in organic and inorganic chemistry for JEE and NEET preparation.\n\n95% of my students improve their scores significantly within the first 3 months.",
    subjects: ["Chemistry"], grades: ["11th", "12th"], boards: ["CBSE"],
    languages: ["English", "Hindi"], experienceYears: 4, hourlyRate: 600, monthlyRate: 10000,
    rating: 4.6, totalReviews: 28, currentStudents: 15, maxStudents: 25, isVerified: true,
    teachingStyle: "Problem-Solving", education: "M.Sc Chemistry", university: "BHU",
    qualifications: ["M.Sc Chemistry", "NET Qualified"], matchScore: 84,
  },
};

// Generic fallback
const defaultTeacher = teachersMap["1"];

const reviews = [
  { name: "Ananya G.", rating: 5, date: "Aug 2026", text: "Best math teacher! My score went from 65 to 92. His visual explanations are amazing." },
  { name: "Rohan P.", rating: 5, date: "Jul 2026", text: "Very patient and explains concepts clearly. Always available for doubt clearing." },
  { name: "Priya S.", rating: 4, date: "Jun 2026", text: "Good teacher. Assignments are very helpful for practice." },
  { name: "Vikram R.", rating: 5, date: "May 2026", text: "Excellent at building fundamentals. My daughter now loves math!" },
];

export default function TeacherProfilePage() {
  const params = useParams();
  const teacherId = params.id as string;
  const teacher = teachersMap[teacherId] || defaultTeacher;

  return (
    <main style={{ background: "#f9fafb", minHeight: "100vh" }}>
      {/* Navbar */}
      <nav style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(255,255,255,0.9)", backdropFilter: "blur(12px)", borderBottom: "1px solid #f3f4f6" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <div style={{ width: 38, height: 38, borderRadius: 12, background: "linear-gradient(135deg,#4f46e5,#7c3aed)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <GraduationCap style={{ width: 20, height: 20, color: "white" }} />
            </div>
            <span style={{ fontSize: 22, fontWeight: 800, fontFamily: "var(--font-display)" }}>
              <span style={{ background: "linear-gradient(135deg,#4f46e5,#7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Tutor</span>
              <span style={{ color: "#111827" }}>Connect</span>
            </span>
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Link href="/login" style={{ padding: "8px 18px", fontSize: 14, fontWeight: 600, color: "#4f46e5", borderRadius: 12, textDecoration: "none" }}>Log in</Link>
            <Link href="/register" style={{ padding: "10px 22px", fontSize: 14, fontWeight: 600, color: "white", background: "linear-gradient(135deg,#4f46e5,#7c3aed)", borderRadius: 12, textDecoration: "none" }}>Get Started</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 lg:px-8" style={{ paddingTop: 32, paddingBottom: 80 }}>
        {/* Back link */}
        <Link href="/teachers" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, fontWeight: 500, color: "#6b7280", textDecoration: "none", marginBottom: 24 }} className="hover:!text-[#4f46e5]">
          <ArrowLeft style={{ width: 16, height: 16 }} /> Back to Teachers
        </Link>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 24 }} className="lg:!grid-cols-[1fr_360px]">
          {/* Main content */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {/* Profile header */}
            <div style={{ padding: 32, borderRadius: 24, background: "white", border: "1px solid #f3f4f6" }}>
              <div style={{ display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>
                <div style={{ width: 100, height: 100, borderRadius: 24, background: `linear-gradient(135deg, ${teacher.id === "1" ? "#6366f1,#8b5cf6" : teacher.id === "2" ? "#10b981,#059669" : "#f59e0b,#d97706"})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, fontWeight: 800, color: "white", flexShrink: 0 }}>
                  {teacher.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                    <h1 style={{ fontSize: 28, fontWeight: 800, color: "#111827", fontFamily: "var(--font-display)" }}>{teacher.name}</h1>
                    {teacher.isVerified && <CheckCircle2 style={{ width: 22, height: 22, color: "#6366f1" }} />}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap", marginBottom: 16 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      {[1, 2, 3, 4, 5].map((s) => <Star key={s} style={{ width: 16, height: 16, fill: s <= Math.round(teacher.rating) ? "#fbbf24" : "#e5e7eb", color: s <= Math.round(teacher.rating) ? "#fbbf24" : "#e5e7eb" }} />)}
                      <span style={{ fontSize: 14, fontWeight: 700, color: "#111827", marginLeft: 4 }}>{teacher.rating}</span>
                      <span style={{ fontSize: 13, color: "#6b7280" }}>({teacher.totalReviews} reviews)</span>
                    </div>
                    <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13, color: "#6b7280" }}><Clock style={{ width: 14, height: 14 }} /> {teacher.experienceYears} yrs experience</span>
                    <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13, color: "#6b7280" }}><Users style={{ width: 14, height: 14 }} /> {teacher.currentStudents} students</span>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {teacher.subjects.map((s) => (
                      <span key={s} style={{ padding: "4px 14px", borderRadius: 999, fontSize: 13, fontWeight: 600, color: "#4f46e5", background: "#eef2ff" }}>{s}</span>
                    ))}
                    {teacher.boards.map((b) => (
                      <span key={b} style={{ padding: "4px 14px", borderRadius: 999, fontSize: 13, fontWeight: 500, color: "#6b7280", background: "#f3f4f6" }}>{b}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* About */}
            <div style={{ padding: 28, borderRadius: 20, background: "white", border: "1px solid #f3f4f6" }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111827", marginBottom: 12 }}>About</h2>
              <p style={{ fontSize: 15, color: "#4b5563", lineHeight: 1.8, whiteSpace: "pre-line" }}>{teacher.bio}</p>
            </div>

            {/* Details */}
            <div style={{ padding: 28, borderRadius: 20, background: "white", border: "1px solid #f3f4f6" }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111827", marginBottom: 16 }}>Teaching Details</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <InfoRow icon={BookOpen} label="Teaching Style" value={teacher.teachingStyle} />
                <InfoRow icon={GraduationCap} label="Education" value={teacher.education} />
                <InfoRow icon={Award} label="University" value={teacher.university} />
                <InfoRow icon={Globe} label="Languages" value={teacher.languages.join(", ")} />
                <InfoRow icon={Users} label="Grades" value={teacher.grades.join(", ")} />
                <InfoRow icon={Shield} label="Qualifications" value={teacher.qualifications.join(", ")} />
              </div>
            </div>

            {/* Reviews */}
            <div style={{ padding: 28, borderRadius: 20, background: "white", border: "1px solid #f3f4f6" }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111827", marginBottom: 16 }}>Student Reviews</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {reviews.map((r, i) => (
                  <div key={i} style={{ padding: 16, borderRadius: 14, background: "#f9fafb", border: "1px solid #f3f4f6" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "white" }}>{r.name[0]}</div>
                        <span style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>{r.name}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        {[1, 2, 3, 4, 5].map((s) => <Star key={s} style={{ width: 12, height: 12, fill: s <= r.rating ? "#fbbf24" : "#e5e7eb", color: s <= r.rating ? "#fbbf24" : "#e5e7eb" }} />)}
                        <span style={{ fontSize: 11, color: "#9ca3af", marginLeft: 4 }}>{r.date}</span>
                      </div>
                    </div>
                    <p style={{ fontSize: 14, color: "#4b5563", lineHeight: 1.6 }}>{r.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div style={{ position: "sticky", top: 96, alignSelf: "start", display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Match score */}
            <div style={{ padding: 24, borderRadius: 20, background: "linear-gradient(135deg,#4f46e5,#7c3aed)", color: "white", textAlign: "center" }}>
              <Sparkles style={{ width: 24, height: 24, margin: "0 auto 8px", opacity: 0.8 }} />
              <p style={{ fontSize: 14, opacity: 0.8 }}>AI Compatibility</p>
              <p style={{ fontSize: 44, fontWeight: 800, fontFamily: "var(--font-display)" }}>{teacher.matchScore}%</p>
              <p style={{ fontSize: 13, opacity: 0.7 }}>Based on your preferences</p>
            </div>

            {/* Pricing + Book */}
            <div style={{ padding: 24, borderRadius: 20, background: "white", border: "1px solid #f3f4f6" }}>
              <div style={{ marginBottom: 20 }}>
                <p style={{ fontSize: 32, fontWeight: 800, color: "#111827" }}>₹{teacher.monthlyRate.toLocaleString()}<span style={{ fontSize: 15, fontWeight: 400, color: "#9ca3af" }}>/month</span></p>
                <p style={{ fontSize: 13, color: "#6b7280" }}>₹{teacher.hourlyRate}/hour • 3 classes/week</p>
              </div>
              <Link href={`/register`} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, width: "100%", padding: "14px", borderRadius: 14, fontSize: 15, fontWeight: 700, color: "white", background: "linear-gradient(135deg,#4f46e5,#7c3aed)", textDecoration: "none", boxShadow: "0 4px 14px rgba(99,102,241,0.3)", marginBottom: 10 }}>
                <Video style={{ width: 18, height: 18 }} /> Book Free Demo
              </Link>
              <Link href={`/register`} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, width: "100%", padding: "14px", borderRadius: 14, fontSize: 14, fontWeight: 600, color: "#4f46e5", border: "2px solid #e0e7ff", textDecoration: "none" }}>
                <MessageSquare style={{ width: 16, height: 16 }} /> Send Message
              </Link>
            </div>

            {/* Availability hint */}
            <div style={{ padding: 16, borderRadius: 14, background: "#ecfdf5", border: "1px solid #d1fae5" }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: "#059669", display: "flex", alignItems: "center", gap: 6 }}>
                <CheckCircle2 style={{ width: 14, height: 14 }} /> Available for new students
              </p>
              <p style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>{teacher.maxStudents - teacher.currentStudents} spots remaining</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function InfoRow({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
      <Icon style={{ width: 16, height: 16, color: "#6b7280", marginTop: 2, flexShrink: 0 }} />
      <div>
        <p style={{ fontSize: 12, color: "#9ca3af", fontWeight: 500 }}>{label}</p>
        <p style={{ fontSize: 14, color: "#374151", fontWeight: 500 }}>{value}</p>
      </div>
    </div>
  );
}
