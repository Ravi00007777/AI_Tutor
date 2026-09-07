"use client";

import Link from "next/link";
import {
  ArrowRight,
  GraduationCap,
  CheckCircle2,
  Calendar,
  DollarSign,
  Users,
  Clock,
  TrendingUp,
  Shield,
  Star,
  Sparkles,
  BarChart3,
  Zap,
} from "lucide-react";

const benefits = [
  { icon: Users, title: "Grow Your Student Base", desc: "Access thousands of students actively looking for tutors. Our AI matching sends you the best-fit students." },
  { icon: Calendar, title: "Zero Scheduling Hassle", desc: "Set your availability once. The platform auto-generates class schedules, sends calendar invites, and creates Meet links." },
  { icon: DollarSign, title: "Guaranteed Payments", desc: "Get paid monthly via secure bank transfer. No chasing parents for fees — the platform handles collections." },
  { icon: BarChart3, title: "Track Everything", desc: "Dashboard showing your earnings, student progress, class attendance, assignment completion rates, and reviews." },
  { icon: Shield, title: "Professional Growth", desc: "Build your verified profile with ratings, reviews, and a track record. Stand out as a trusted professional tutor." },
  { icon: Sparkles, title: "AI Tools for Teaching", desc: "AI-generated study plans, assignment templates, and progress analytics to make your teaching more effective." },
];

const steps = [
  { num: "1", title: "Apply Online", desc: "Fill out a quick application with your qualifications, subjects, and experience." },
  { num: "2", title: "Verification", desc: "We verify your identity, qualifications, and conduct a brief teaching evaluation." },
  { num: "3", title: "Set Your Profile", desc: "Create your public profile with bio, rates, availability, and a demo video." },
  { num: "4", title: "Start Teaching", desc: "Get matched with students, give demos, and grow your tutoring business." },
];

const testimonials = [
  { name: "Rahul Verma", subject: "Physics", students: 25, earning: "₹44,000/mo", quote: "I went from 5 students I found myself to 25 through the platform. The scheduling automation alone saves me 2 hours daily." },
  { name: "Sneha Iyer", subject: "English", students: 20, earning: "₹35,000/mo", quote: "As a part-time teacher, the flexibility is amazing. I set my hours, and the platform handles everything else." },
];

export default function BecomeATeacherPage() {
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
            <Link href="/login" style={{ padding: "8px 18px", fontSize: 14, fontWeight: 600, color: "#4f46e5", borderRadius: 12, textDecoration: "none" }}>Teacher Login</Link>
            <Link href="/register" style={{ padding: "10px 22px", fontSize: 14, fontWeight: 600, color: "white", background: "linear-gradient(135deg,#4f46e5,#7c3aed)", borderRadius: 12, textDecoration: "none" }}>Apply Now</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ padding: "100px 0 80px", background: "linear-gradient(160deg, #0f0d1a, #1e1b3a, #2d1b69)", textAlign: "center" }}>
        <div className="max-w-3xl mx-auto px-6">
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 16px", borderRadius: 999, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)", marginBottom: 28 }}>
            <Sparkles style={{ width: 16, height: 16, color: "#a5b4fc" }} />
            <span style={{ fontSize: 13, fontWeight: 500, color: "#c7d2fe" }}>Join 500+ Expert Teachers</span>
          </div>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 800, color: "white", fontFamily: "var(--font-display)", lineHeight: 1.1, marginBottom: 24 }}>
            Teach What You Love,{" "}
            <span style={{ background: "linear-gradient(135deg, #a5b4fc, #c084fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Earn What You Deserve</span>
          </h1>
          <p style={{ fontSize: 18, color: "#9ca3af", lineHeight: 1.7, marginBottom: 40 }}>
            Focus on teaching — we handle scheduling, payments, communication, and student management. Grow your tutoring business with AI-powered tools.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
            <Link href="/register" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "16px 36px", fontSize: 16, fontWeight: 700, color: "white", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", borderRadius: 16, textDecoration: "none", boxShadow: "0 8px 32px rgba(99,102,241,0.35)" }}>
              Apply to Teach <ArrowRight style={{ width: 18, height: 18 }} />
            </Link>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", justifyContent: "center", gap: 48, marginTop: 56 }}>
            {[{ val: "₹40K+", label: "Avg Monthly Earning" }, { val: "500+", label: "Active Teachers" }, { val: "85%", label: "Teacher Satisfaction" }].map((s, i) => (
              <div key={i}>
                <p style={{ fontSize: 32, fontWeight: 800, color: "white", fontFamily: "var(--font-display)" }}>{s.val}</p>
                <p style={{ fontSize: 13, color: "#9ca3af" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section style={{ padding: "100px 0" }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <h2 style={{ fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 800, color: "#111827", fontFamily: "var(--font-display)" }}>Why Teachers Love TutorConnect</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <div key={i} style={{ padding: 28, borderRadius: 20, border: "1px solid #f3f4f6", transition: "box-shadow 0.3s, transform 0.3s" }} className="hover:shadow-lg hover:-translate-y-1">
                  <div style={{ width: 52, height: 52, borderRadius: 16, background: "#eef2ff", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                    <Icon style={{ width: 24, height: 24, color: "#6366f1" }} />
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: "#111827", marginBottom: 8 }}>{b.title}</h3>
                  <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.7 }}>{b.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How to Apply */}
      <section style={{ padding: "80px 0", background: "#f9fafb" }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 style={{ fontSize: 28, fontWeight: 800, color: "#111827", fontFamily: "var(--font-display)", textAlign: "center", marginBottom: 48 }}>How to Get Started</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 32 }}>
            {steps.map((step, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: "linear-gradient(135deg,#4f46e5,#7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: 20, fontWeight: 800, color: "white" }}>{step.num}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "#111827", marginBottom: 8 }}>{step.title}</h3>
                <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.6 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: "80px 0" }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <h2 style={{ fontSize: 28, fontWeight: 800, color: "#111827", fontFamily: "var(--font-display)", textAlign: "center", marginBottom: 48 }}>Hear From Our Teachers</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {testimonials.map((t, i) => (
              <div key={i} style={{ padding: 32, borderRadius: 20, background: "#f9fafb", border: "1px solid #f3f4f6" }}>
                <p style={{ fontSize: 15, color: "#4b5563", lineHeight: 1.7, fontStyle: "italic", marginBottom: 24 }}>&ldquo;{t.quote}&rdquo;</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <p style={{ fontSize: 15, fontWeight: 700, color: "#111827" }}>{t.name}</p>
                    <p style={{ fontSize: 12, color: "#6b7280" }}>{t.subject} • {t.students} students</p>
                  </div>
                  <span style={{ fontSize: 15, fontWeight: 800, color: "#059669" }}>{t.earning}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 24px", background: "linear-gradient(135deg, #4f46e5, #7c3aed)", textAlign: "center" }}>
        <h2 style={{ fontSize: "clamp(24px, 3vw, 40px)", fontWeight: 800, color: "white", fontFamily: "var(--font-display)", marginBottom: 16 }}>Ready to Start Teaching?</h2>
        <p style={{ fontSize: 17, color: "rgba(255,255,255,0.8)", marginBottom: 32 }}>Applications take under 5 minutes. Start earning within a week.</p>
        <Link href="/register" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "16px 36px", fontSize: 16, fontWeight: 700, color: "#4f46e5", background: "white", borderRadius: 16, textDecoration: "none" }}>
          Apply Now <ArrowRight style={{ width: 18, height: 18 }} />
        </Link>
      </section>
    </main>
  );
}
