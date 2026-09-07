"use client";

import Link from "next/link";
import {
  Users,
  Target,
  Video,
  Zap,
  Calendar,
  Brain,
  FileText,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  GraduationCap,
  Shield,
  Award,
  Star,
  Clock,
  CreditCard,
} from "lucide-react";

export default function HowItWorksPage() {
  const steps = [
    {
      num: 1,
      icon: Users,
      title: "Create Your Profile",
      desc: "Sign up in under 2 minutes. Tell us your grade, board, subjects, goals, preferred schedule, and monthly budget. Upload your syllabus for AI-powered analysis.",
      details: [
        "Choose your grade (6th–12th) and board (CBSE, ICSE, IB, etc.)",
        "Select subjects you want tutoring in",
        "Set your weekly availability and preferred class duration",
        "Set your monthly budget so we match within range",
      ],
      color: "#6366f1",
      bg: "#eef2ff",
    },
    {
      num: 2,
      icon: Target,
      title: "Get AI-Matched with Teachers",
      desc: "Our matching algorithm analyzes 15+ factors to recommend the best-fit teachers for you — not just subject, but teaching style, availability overlap, price match, and student reviews.",
      details: [
        "See compatibility scores (e.g. \"94% match\")",
        "View detailed teacher profiles with video introductions",
        "Read verified student reviews",
        "Compare multiple teachers side-by-side",
      ],
      color: "#059669",
      bg: "#ecfdf5",
    },
    {
      num: 3,
      icon: Video,
      title: "Take a Free Demo Class",
      desc: "Book a free 30-minute demo with any teacher. The system automatically finds a slot that works for both of you and generates a Google Meet link.",
      details: [
        "Auto-scheduled — no back-and-forth coordination",
        "Google Meet link created automatically",
        "Both student and teacher submit feedback after",
        "No obligation — try multiple teachers",
      ],
      color: "#2563eb",
      bg: "#eff6ff",
    },
    {
      num: 4,
      icon: Zap,
      title: "Confirm & Start Learning",
      desc: "Loved the demo? Confirm the teacher and the platform takes over — it auto-generates your recurring class schedule, syncs with Google Calendar, and starts tracking progress.",
      details: [
        "Recurring schedule created automatically",
        "Classes synced to Google Calendar with Meet links",
        "Assignments, attendance, and progress tracked",
        "Monthly payments handled via Razorpay",
      ],
      color: "#d97706",
      bg: "#fffbeb",
    },
  ];

  return (
    <main style={{ background: "white" }}>
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

      {/* Hero */}
      <section style={{ padding: "80px 0 60px", textAlign: "center", background: "linear-gradient(180deg, #f5f3ff, white)" }}>
        <div className="max-w-3xl mx-auto px-6">
          <p style={{ fontSize: 13, fontWeight: 700, color: "#6366f1", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>How TutorConnect Works</p>
          <h1 style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 800, color: "#111827", fontFamily: "var(--font-display)", lineHeight: 1.15, marginBottom: 20 }}>
            From Signup to{" "}
            <span style={{ background: "linear-gradient(135deg,#4f46e5,#7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Smart Learning</span>
            {" "}in 4 Steps
          </h1>
          <p style={{ fontSize: 18, color: "#6b7280", lineHeight: 1.7 }}>
            No manual coordination, no WhatsApp groups, no spreadsheets. Our platform automates everything from teacher matching to class scheduling.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section style={{ padding: "40px 0 100px" }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
            {steps.map((step) => {
              const Icon = step.icon;
              const isEven = step.num % 2 === 0;
              return (
                <div key={step.num} style={{ display: "grid", gridTemplateColumns: "1fr", gap: 40, alignItems: "center" }} className={`lg:!grid-cols-2 ${isEven ? "lg:direction-rtl" : ""}`}>
                  {/* Content */}
                  <div style={{ direction: "ltr" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
                      <div style={{ width: 64, height: 64, borderRadius: 18, background: step.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Icon style={{ width: 28, height: 28, color: step.color }} />
                      </div>
                      <div>
                        <p style={{ fontSize: 12, fontWeight: 700, color: step.color, textTransform: "uppercase", letterSpacing: "0.05em" }}>Step {step.num}</p>
                        <h3 style={{ fontSize: 24, fontWeight: 800, color: "#111827", fontFamily: "var(--font-display)" }}>{step.title}</h3>
                      </div>
                    </div>
                    <p style={{ fontSize: 16, color: "#4b5563", lineHeight: 1.7, marginBottom: 20 }}>{step.desc}</p>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                      {step.details.map((d, j) => (
                        <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                          <CheckCircle2 style={{ width: 18, height: 18, color: step.color, flexShrink: 0, marginTop: 2 }} />
                          <span style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.5 }}>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Visual card */}
                  <div style={{ direction: "ltr", padding: 32, borderRadius: 24, background: step.bg, border: `1px solid ${step.color}15` }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                      {step.num === 1 && (
                        <>
                          <div style={{ padding: "12px 16px", borderRadius: 12, background: "white", fontSize: 14, color: "#374151", display: "flex", alignItems: "center", gap: 8 }}><BookIcon /> Grade: <b>10th (CBSE)</b></div>
                          <div style={{ padding: "12px 16px", borderRadius: 12, background: "white", fontSize: 14, color: "#374151", display: "flex", alignItems: "center", gap: 8 }}><BookIcon /> Subjects: <span style={{ display: "flex", gap: 6, marginLeft: 4 }}><Tag>Math</Tag><Tag>Physics</Tag></span></div>
                          <div style={{ padding: "12px 16px", borderRadius: 12, background: "white", fontSize: 14, color: "#374151", display: "flex", alignItems: "center", gap: 8 }}><Clock style={{ width: 16, height: 16, color: "#6b7280" }} /> Schedule: Mon, Wed, Fri (4-6 PM)</div>
                          <div style={{ padding: "12px 16px", borderRadius: 12, background: "white", fontSize: 14, color: "#374151", display: "flex", alignItems: "center", gap: 8 }}><CreditCard style={{ width: 16, height: 16, color: "#6b7280" }} /> Budget: ₹8,000/month</div>
                        </>
                      )}
                      {step.num === 2 && (
                        <>
                          {[{ name: "Rahul S.", match: 94, subject: "Mathematics" }, { name: "Priya M.", match: 89, subject: "Physics" }].map((t, i) => (
                            <div key={i} style={{ padding: 16, borderRadius: 12, background: "white", display: "flex", alignItems: "center", gap: 12 }}>
                              <div style={{ width: 44, height: 44, borderRadius: "50%", background: `linear-gradient(135deg,${i === 0 ? "#6366f1,#8b5cf6" : "#10b981,#059669"})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "white" }}>{t.name[0]}{t.name.split(" ")[1]?.[0]}</div>
                              <div style={{ flex: 1 }}><p style={{ fontSize: 14, fontWeight: 700, color: "#111827" }}>{t.name}</p><p style={{ fontSize: 12, color: "#6b7280" }}>{t.subject}</p></div>
                              <span style={{ padding: "4px 12px", borderRadius: 999, fontSize: 13, fontWeight: 700, color: "#059669", background: "#ecfdf5" }}>{t.match}%</span>
                            </div>
                          ))}
                        </>
                      )}
                      {step.num === 3 && (
                        <>
                          <div style={{ padding: 16, borderRadius: 12, background: "white", textAlign: "center" }}>
                            <Calendar style={{ width: 32, height: 32, color: "#2563eb", margin: "0 auto 8px" }} />
                            <p style={{ fontSize: 15, fontWeight: 700, color: "#111827" }}>Demo Scheduled!</p>
                            <p style={{ fontSize: 13, color: "#6b7280" }}>Thu, Sep 7 • 4:00 PM</p>
                            <div style={{ marginTop: 12, padding: "8px 16px", borderRadius: 8, background: "#eff6ff", fontSize: 13, color: "#2563eb", fontWeight: 600 }}>📹 Google Meet Link Generated</div>
                          </div>
                        </>
                      )}
                      {step.num === 4 && (
                        <>
                          <div style={{ padding: 16, borderRadius: 12, background: "white" }}>
                            <p style={{ fontSize: 13, fontWeight: 700, color: "#111827", marginBottom: 8 }}>Auto-Generated Schedule</p>
                            {["Mon 4:00 PM — Math", "Wed 4:00 PM — Math", "Fri 5:00 PM — Physics"].map((s, i) => (
                              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", borderBottom: i < 2 ? "1px solid #f3f4f6" : "none" }}>
                                <CheckCircle2 style={{ width: 14, height: 14, color: "#10b981" }} />
                                <span style={{ fontSize: 13, color: "#4b5563" }}>{s}</span>
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 24px", background: "linear-gradient(135deg, #4f46e5, #7c3aed)", textAlign: "center" }}>
        <h2 style={{ fontSize: "clamp(24px, 3vw, 40px)", fontWeight: 800, color: "white", fontFamily: "var(--font-display)", marginBottom: 16 }}>Ready to Get Started?</h2>
        <p style={{ fontSize: 17, color: "rgba(255,255,255,0.8)", marginBottom: 32 }}>It&apos;s free to create an account and book your first demo class.</p>
        <Link href="/register" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "16px 36px", fontSize: 16, fontWeight: 700, color: "#4f46e5", background: "white", borderRadius: 16, textDecoration: "none", boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}>
          Create Free Account <ArrowRight style={{ width: 18, height: 18 }} />
        </Link>
      </section>
    </main>
  );
}

function BookIcon() {
  return <FileText style={{ width: 16, height: 16, color: "#6b7280" }} />;
}

function Tag({ children }: { children: React.ReactNode }) {
  return <span style={{ padding: "2px 10px", borderRadius: 999, fontSize: 12, fontWeight: 600, color: "#4f46e5", background: "#eef2ff" }}>{children}</span>;
}
