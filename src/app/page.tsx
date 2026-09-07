"use client";

import Link from "next/link";
import { useState } from "react";
import {
  BookOpen,
  Calendar,
  CheckCircle2,
  GraduationCap,
  LayoutDashboard,
  Menu,
  Search,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Video,
  X,
  Zap,
  Clock,
  Shield,
  Award,
  ArrowRight,
  Brain,
  Target,
  Play,
  ChevronRight,
  FileText,
} from "lucide-react";

/* ─────────────────────────────────────────────
   NAVBAR
───────────────────────────────────────────── */
function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50" style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div style={{ width: 38, height: 38, borderRadius: 12, background: "linear-gradient(135deg,#4f46e5,#7c3aed)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <GraduationCap style={{ width: 20, height: 20, color: "white" }} />
            </div>
            <span style={{ fontSize: 22, fontWeight: 800, fontFamily: "var(--font-display)" }}>
              <span style={{ background: "linear-gradient(135deg,#4f46e5,#7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Tutor</span>
              <span style={{ color: "#111827" }}>Connect</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { label: "Find Teachers", href: "/teachers" },
              { label: "How It Works", href: "/how-it-works" },
              { label: "Pricing", href: "/pricing" },
              { label: "Become a Teacher", href: "/become-a-teacher" },
            ].map((item) => (
              <Link key={item.label} href={item.href} style={{ fontSize: 14, fontWeight: 500, color: "#6b7280", textDecoration: "none", transition: "color 0.2s" }} className="hover:!text-[#4f46e5]">
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/login" style={{ padding: "8px 18px", fontSize: 14, fontWeight: 600, color: "#4f46e5", borderRadius: 12, textDecoration: "none", transition: "background 0.2s" }} className="hover:bg-[#eef2ff]">
              Log in
            </Link>
            <Link href="/register" style={{ padding: "10px 22px", fontSize: 14, fontWeight: 600, color: "white", background: "linear-gradient(135deg,#4f46e5,#7c3aed)", borderRadius: 12, textDecoration: "none", boxShadow: "0 4px 14px rgba(79,70,229,0.3)" }}>
              Get Started Free
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button className="md:hidden p-2 rounded-lg hover:bg-gray-100" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X style={{ width: 22, height: 22 }} /> : <Menu style={{ width: 22, height: 22 }} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{ background: "white", borderTop: "1px solid #f3f4f6", padding: "16px 24px" }} className="md:hidden animate-fade-in">
          {[
              { label: "Find Teachers", href: "/teachers" },
              { label: "How It Works", href: "/how-it-works" },
              { label: "Pricing", href: "/pricing" },
              { label: "Become a Teacher", href: "/become-a-teacher" },
            ].map((item) => (
            <Link key={item.label} href={item.href} style={{ display: "block", padding: "10px 0", fontSize: 15, fontWeight: 500, color: "#374151", textDecoration: "none" }}>
              {item.label}
            </Link>
          ))}
          <div style={{ borderTop: "1px solid #f3f4f6", marginTop: 12, paddingTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
            <Link href="/login" style={{ textAlign: "center", padding: "10px", fontSize: 14, fontWeight: 600, color: "#4f46e5", textDecoration: "none" }}>Log in</Link>
            <Link href="/register" style={{ textAlign: "center", padding: "12px", fontSize: 14, fontWeight: 600, color: "white", background: "linear-gradient(135deg,#4f46e5,#7c3aed)", borderRadius: 12, textDecoration: "none" }}>Get Started Free</Link>
          </div>
        </div>
      )}
    </nav>
  );
}

/* ─────────────────────────────────────────────
   HERO
───────────────────────────────────────────── */
function Hero() {
  return (
    <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden", paddingTop: 72, background: "linear-gradient(160deg, #0f0d1a 0%, #1a1744 40%, #2d1b69 100%)" }}>
      {/* Ambient glow orbs */}
      <div style={{ position: "absolute", top: 60, left: "5%", width: 400, height: 400, background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)", borderRadius: "50%" }} />
      <div style={{ position: "absolute", bottom: 40, right: "10%", width: 500, height: 500, background: "radial-gradient(circle, rgba(168,85,247,0.1) 0%, transparent 70%)", borderRadius: "50%" }} />
      <div style={{ position: "absolute", top: "50%", left: "50%", width: 300, height: 300, background: "radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)", borderRadius: "50%", transform: "translate(-50%,-50%)" }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full" style={{ position: "relative", zIndex: 2, paddingTop: 60, paddingBottom: 80 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 60, alignItems: "center" }} className="lg:!grid-cols-[1fr_1fr]">
          {/* Left column — text content */}
          <div style={{ maxWidth: 580 }}>
            {/* Badge */}
            <div className="animate-fade-in-up" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 16px", borderRadius: 999, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)", marginBottom: 28 }}>
              <Sparkles style={{ width: 16, height: 16, color: "#a5b4fc" }} />
              <span style={{ fontSize: 13, fontWeight: 500, color: "#c7d2fe" }}>AI-Powered Tutoring Marketplace</span>
            </div>

            {/* Heading */}
            <h1 className="animate-fade-in-up" style={{ fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 800, color: "white", lineHeight: 1.1, fontFamily: "var(--font-display)", marginBottom: 24, animationDelay: "0.1s" }}>
              Find Your{" "}
              <span style={{ background: "linear-gradient(135deg, #a5b4fc, #c084fc, #f0abfc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Perfect Tutor
              </span>
              <br />
              Learn Smarter
            </h1>

            {/* Subtitle */}
            <p className="animate-fade-in-up" style={{ fontSize: 18, color: "#9ca3af", lineHeight: 1.7, marginBottom: 36, maxWidth: 500, animationDelay: "0.2s" }}>
              AI-matched expert tutors, automatic scheduling, personalized study plans, and live online classes — everything you need to excel academically.
            </p>

            {/* CTA Buttons */}
            <div className="animate-fade-in-up" style={{ display: "flex", flexWrap: "wrap", gap: 16, marginBottom: 48, animationDelay: "0.3s" }}>
              <Link href="/register" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "16px 32px", fontSize: 16, fontWeight: 700, color: "white", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", borderRadius: 16, textDecoration: "none", boxShadow: "0 8px 32px rgba(99,102,241,0.35)", transition: "transform 0.2s, box-shadow 0.2s" }} className="hover:scale-[1.03] hover:shadow-[0_12px_40px_rgba(99,102,241,0.4)]">
                Start Learning Free <ArrowRight style={{ width: 18, height: 18 }} />
              </Link>
              <Link href="/teachers" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "16px 32px", fontSize: 16, fontWeight: 600, color: "white", border: "2px solid rgba(255,255,255,0.2)", borderRadius: 16, textDecoration: "none", transition: "background 0.2s" }} className="hover:bg-white/10">
                <Search style={{ width: 18, height: 18 }} /> Browse Teachers
              </Link>
            </div>

            {/* Social proof */}
            <div className="animate-fade-in-up" style={{ display: "flex", alignItems: "center", gap: 20, animationDelay: "0.4s" }}>
              <div style={{ display: "flex" }}>
                {[
                  { bg: "linear-gradient(135deg,#6366f1,#8b5cf6)", initials: "RS" },
                  { bg: "linear-gradient(135deg,#10b981,#059669)", initials: "AK" },
                  { bg: "linear-gradient(135deg,#f59e0b,#d97706)", initials: "PM" },
                  { bg: "linear-gradient(135deg,#ef4444,#dc2626)", initials: "NJ" },
                ].map((avatar, i) => (
                  <div key={i} style={{ width: 40, height: 40, borderRadius: "50%", background: avatar.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "white", border: "2px solid #1a1744", marginLeft: i > 0 ? -8 : 0 }}>
                    {avatar.initials}
                  </div>
                ))}
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} style={{ width: 16, height: 16, fill: "#fbbf24", color: "#fbbf24" }} />
                  ))}
                  <span style={{ fontSize: 14, fontWeight: 700, color: "white", marginLeft: 4 }}>4.9</span>
                </div>
                <p style={{ fontSize: 13, color: "#9ca3af" }}>Trusted by 2,500+ students</p>
              </div>
            </div>
          </div>

          {/* Right column — Dashboard preview */}
          <div className="hidden lg:block" style={{ position: "relative" }}>
            <div className="animate-fade-in-up" style={{ background: "rgba(255,255,255,0.06)", backdropFilter: "blur(16px)", borderRadius: 24, padding: 28, border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 24px 48px rgba(0,0,0,0.3)", animationDelay: "0.3s" }}>
              {/* Header */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                <div style={{ width: 44, height: 44, borderRadius: 14, background: "rgba(99,102,241,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <LayoutDashboard style={{ width: 22, height: 22, color: "#a5b4fc" }} />
                </div>
                <div>
                  <p style={{ fontSize: 15, fontWeight: 700, color: "white" }}>Student Dashboard</p>
                  <p style={{ fontSize: 12, color: "#9ca3af" }}>Your learning at a glance</p>
                </div>
              </div>

              {/* Schedule cards */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
                {[
                  { time: "10:00 AM", subject: "Mathematics", teacher: "Rahul S.", accent: "#818cf8" },
                  { time: "2:00 PM", subject: "Physics", teacher: "Priya M.", accent: "#34d399" },
                  { time: "6:00 PM", subject: "Chemistry", teacher: "Aman K.", accent: "#fbbf24" },
                ].map((cls, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderRadius: 14, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div style={{ width: 4, height: 40, borderRadius: 4, background: cls.accent, flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 14, fontWeight: 600, color: "white" }}>{cls.subject}</p>
                      <p style={{ fontSize: 12, color: "#9ca3af" }}>{cls.teacher}</p>
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 500, color: "#d1d5db" }}>{cls.time}</span>
                  </div>
                ))}
              </div>

              {/* Progress bars */}
              <div>
                <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 12 }}>Subject Progress</p>
                {[
                  { subject: "Mathematics", pct: 82, color: "#818cf8" },
                  { subject: "Physics", pct: 65, color: "#34d399" },
                ].map((p, i) => (
                  <div key={i} style={{ marginBottom: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontSize: 12, color: "#d1d5db" }}>{p.subject}</span>
                      <span style={{ fontSize: 12, fontWeight: 600, color: "white" }}>{p.pct}%</span>
                    </div>
                    <div style={{ height: 6, background: "rgba(255,255,255,0.08)", borderRadius: 999, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${p.pct}%`, borderRadius: 999, background: p.color, transition: "width 1s ease-out" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating: AI Match card */}
            <div className="animate-float" style={{ position: "absolute", left: -32, bottom: 60, background: "rgba(255,255,255,0.08)", backdropFilter: "blur(16px)", borderRadius: 16, padding: "14px 18px", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 8px 24px rgba(0,0,0,0.3)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg,#10b981,#059669)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Target style={{ width: 20, height: 20, color: "white" }} />
                </div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "white" }}>AI Match Found!</p>
                  <p style={{ fontSize: 12, color: "#6ee7b7" }}>94% compatibility</p>
                </div>
              </div>
            </div>

            {/* Floating: Auto-Scheduled card */}
            <div className="animate-float" style={{ position: "absolute", right: -16, top: 20, background: "rgba(255,255,255,0.08)", backdropFilter: "blur(16px)", borderRadius: 16, padding: "14px 18px", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 8px 24px rgba(0,0,0,0.3)", animationDelay: "1.5s" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(251,191,36,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Calendar style={{ width: 20, height: 20, color: "#fbbf24" }} />
                </div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "white" }}>Auto-Scheduled</p>
                  <p style={{ fontSize: 12, color: "#fde68a" }}>12 classes this month</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   FEATURES
───────────────────────────────────────────── */
function Features() {
  const features = [
    { icon: Brain, title: "AI Teacher Matching", desc: "Our algorithm analyzes 15+ factors — subject expertise, teaching style, availability, budget — to find your ideal tutor.", color: "#6366f1", bg: "#eef2ff" },
    { icon: Calendar, title: "Automatic Scheduling", desc: "No more back-and-forth. The system finds optimal time slots and creates recurring schedules with Google Calendar integration.", color: "#059669", bg: "#ecfdf5" },
    { icon: Video, title: "Live Online Classes", desc: "Every class automatically gets a Google Meet link. Join with one click. Attendance tracked automatically.", color: "#2563eb", bg: "#eff6ff" },
    { icon: FileText, title: "Assignment Management", desc: "Teachers create, students submit, grades flow automatically. Track deadlines, review feedback, see improvement over time.", color: "#d97706", bg: "#fffbeb" },
    { icon: TrendingUp, title: "Progress Tracking", desc: "Visual dashboards showing subject progress, attendance, assignment scores, weak areas, and personalized improvement tips.", color: "#dc2626", bg: "#fef2f2" },
    { icon: Sparkles, title: "AI Study Plans", desc: "Upload your syllabus and let AI create a week-by-week study plan optimized for your exam dates and learning pace.", color: "#7c3aed", bg: "#f5f3ff" },
  ];

  return (
    <section style={{ padding: "100px 0", background: "white", position: "relative" }}>
      {/* Top gradient line */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, #6366f1, #10b981, #f59e0b)" }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section heading */}
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 64px" }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: "#6366f1", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Everything You Need</p>
          <h2 style={{ fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 800, color: "#111827", lineHeight: 1.2, fontFamily: "var(--font-display)", marginBottom: 16 }}>
            Smart Features for{" "}
            <span style={{ background: "linear-gradient(135deg,#4f46e5,#7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Smarter Learning</span>
          </h2>
          <p style={{ fontSize: 17, color: "#6b7280", lineHeight: 1.6 }}>
            From finding the right teacher to tracking your progress — we automate the entire learning journey.
          </p>
        </div>

        {/* Feature grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }} className="stagger-children">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} style={{ padding: 32, borderRadius: 20, border: "1px solid #f3f4f6", background: "white", transition: "all 0.3s ease", cursor: "default" }} className="hover:shadow-xl hover:shadow-gray-200/60 hover:border-[#e0e7ff] hover:-translate-y-1">
                {/* Icon */}
                <div style={{ width: 56, height: 56, borderRadius: 16, background: f.bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                  <Icon style={{ width: 26, height: 26, color: f.color }} />
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: "#111827", marginBottom: 8 }}>{f.title}</h3>
                <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   HOW IT WORKS
───────────────────────────────────────────── */
function HowItWorks() {
  const steps = [
    { num: "01", icon: Users, title: "Create Your Profile", desc: "Tell us your grade, subjects, goals, budget, and preferred schedule." },
    { num: "02", icon: Target, title: "Get Matched with Teachers", desc: "Our AI analyzes 15+ factors to recommend the best-fit teachers." },
    { num: "03", icon: Video, title: "Take a Free Demo Class", desc: "Book a demo — the system auto-finds a slot and generates a Meet link." },
    { num: "04", icon: Zap, title: "Start Learning Automatically", desc: "Confirm your teacher and the system creates your recurring schedule." },
  ];

  return (
    <section style={{ padding: "100px 0", background: "linear-gradient(180deg, #f9fafb 0%, white 100%)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Heading */}
        <div style={{ textAlign: "center", maxWidth: 540, margin: "0 auto 64px" }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: "#059669", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Simple Process</p>
          <h2 style={{ fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 800, color: "#111827", fontFamily: "var(--font-display)" }}>
            Get Started in{" "}
            <span style={{ background: "linear-gradient(135deg,#4f46e5,#7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>4 Easy Steps</span>
          </h2>
        </div>

        {/* Steps grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 32 }}>
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={i} style={{ textAlign: "center", position: "relative" }}>
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block" style={{ position: "absolute", top: 44, left: "calc(50% + 44px)", width: "calc(100% - 48px)", height: 2, background: "linear-gradient(90deg, #c7d2fe, transparent)" }} />
                )}
                {/* Icon box */}
                <div style={{ position: "relative", display: "inline-flex", marginBottom: 24 }}>
                  <div style={{ width: 80, height: 80, borderRadius: 20, background: "linear-gradient(135deg,#4f46e5,#7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 24px rgba(99,102,241,0.3)", transition: "transform 0.3s" }} className="hover:scale-110">
                    <Icon style={{ width: 32, height: 32, color: "white" }} />
                  </div>
                  <span style={{ position: "absolute", top: -8, right: -8, width: 28, height: 28, borderRadius: "50%", background: "white", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#4f46e5" }}>
                    {step.num}
                  </span>
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "#111827", marginBottom: 8 }}>{step.title}</h3>
                <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.6, maxWidth: 280, margin: "0 auto" }}>{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   STATS
───────────────────────────────────────────── */
function Stats() {
  const stats = [
    { value: "500+", label: "Expert Teachers", icon: GraduationCap },
    { value: "2,500+", label: "Active Students", icon: Users },
    { value: "50,000+", label: "Classes Conducted", icon: Video },
    { value: "4.9/5", label: "Average Rating", icon: Star },
  ];

  return (
    <section style={{ padding: "64px 0", background: "linear-gradient(160deg, #0f0d1a, #1e1b3a, #2d1b69)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 32 }} className="md:!grid-cols-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(255,255,255,0.08)", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                  <Icon style={{ width: 22, height: 22, color: "#a5b4fc" }} />
                </div>
                <p style={{ fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 800, color: "white", fontFamily: "var(--font-display)", marginBottom: 4 }}>{stat.value}</p>
                <p style={{ fontSize: 14, color: "#9ca3af" }}>{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   TESTIMONIALS
───────────────────────────────────────────── */
function Testimonials() {
  const testimonials = [
    { name: "Priya Sharma", role: "Parent of Class 10 student", quote: "The automatic scheduling is a game-changer. No more WhatsApp messages to coordinate timings. My daughter's math scores went from 65 to 92 in just 3 months!", initials: "PS", bg: "linear-gradient(135deg,#6366f1,#8b5cf6)" },
    { name: "Rahul Verma", role: "Physics Teacher", quote: "As a teacher, I love how the platform handles scheduling and payments. I just focus on teaching. My student count grew from 5 to 25 in 6 months.", initials: "RV", bg: "linear-gradient(135deg,#10b981,#059669)" },
    { name: "Ananya Gupta", role: "Class 12 Student, CBSE", quote: "The AI study plan was incredibly helpful for my board exam preparation. It knew exactly which topics to prioritize. Got 95% in Chemistry!", initials: "AG", bg: "linear-gradient(135deg,#f59e0b,#d97706)" },
  ];

  return (
    <section style={{ padding: "100px 0", background: "white" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div style={{ textAlign: "center", maxWidth: 540, margin: "0 auto 64px" }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: "#d97706", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Success Stories</p>
          <h2 style={{ fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 800, color: "#111827", fontFamily: "var(--font-display)" }}>
            Loved by Students & Teachers
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
          {testimonials.map((t, i) => (
            <div key={i} style={{ padding: 32, borderRadius: 20, background: "linear-gradient(180deg, white, #fafafe)", border: "1px solid #f3f4f6", transition: "box-shadow 0.3s, transform 0.3s" }} className="hover:shadow-xl hover:-translate-y-1">
              {/* Stars */}
              <div style={{ display: "flex", gap: 2, marginBottom: 20 }}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} style={{ width: 18, height: 18, fill: "#fbbf24", color: "#fbbf24" }} />
                ))}
              </div>
              {/* Quote */}
              <p style={{ fontSize: 15, color: "#4b5563", lineHeight: 1.7, marginBottom: 24, fontStyle: "italic" }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              {/* Author */}
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: t.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "white" }}>
                  {t.initials}
                </div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 700, color: "#111827" }}>{t.name}</p>
                  <p style={{ fontSize: 12, color: "#9ca3af" }}>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   CTA
───────────────────────────────────────────── */
function CTA() {
  return (
    <section style={{ padding: "100px 24px", background: "linear-gradient(135deg, #4f46e5, #7c3aed)", position: "relative", overflow: "hidden" }}>
      {/* Background decoration */}
      <div style={{ position: "absolute", top: -60, right: -60, width: 300, height: 300, background: "rgba(255,255,255,0.05)", borderRadius: "50%" }} />
      <div style={{ position: "absolute", bottom: -80, left: -80, width: 400, height: 400, background: "rgba(255,255,255,0.03)", borderRadius: "50%" }} />

      <div style={{ position: "relative", zIndex: 2, maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
        <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, color: "white", fontFamily: "var(--font-display)", marginBottom: 20 }}>
          Ready to Transform Your Learning?
        </h2>
        <p style={{ fontSize: 18, color: "rgba(255,255,255,0.8)", marginBottom: 40, lineHeight: 1.6 }}>
          Join thousands of students who are learning smarter with AI-matched tutors, automatic scheduling, and personalized study plans.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 16 }}>
          <Link href="/register" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "16px 36px", fontSize: 16, fontWeight: 700, color: "#4f46e5", background: "white", borderRadius: 16, textDecoration: "none", boxShadow: "0 8px 24px rgba(0,0,0,0.15)", transition: "transform 0.2s" }} className="hover:scale-[1.03]">
            Get Started — It&apos;s Free <ArrowRight style={{ width: 18, height: 18 }} />
          </Link>
          <Link href="/become-a-teacher" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "16px 36px", fontSize: 16, fontWeight: 600, color: "white", border: "2px solid rgba(255,255,255,0.3)", borderRadius: 16, textDecoration: "none", transition: "background 0.2s" }} className="hover:bg-white/10">
            Join as a Teacher
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────── */
function Footer() {
  const footerSections = [
    { title: "For Students", links: [{ label: "Find Teachers", href: "/teachers" }, { label: "How It Works", href: "/how-it-works" }, { label: "Pricing", href: "/pricing" }, { label: "Sign Up", href: "/register" }] },
    { title: "For Teachers", links: [{ label: "Become a Teacher", href: "/become-a-teacher" }, { label: "Teacher Login", href: "/login" }] },
    { title: "Company", links: [{ label: "About Us", href: "#" }, { label: "Contact", href: "#" }, { label: "Privacy Policy", href: "#" }, { label: "Terms of Service", href: "#" }] },
  ];

  return (
    <footer style={{ background: "#111827", color: "#9ca3af", paddingTop: 64, paddingBottom: 32 }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 48, marginBottom: 48 }}>
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 34, height: 34, borderRadius: 10, background: "linear-gradient(135deg,#4f46e5,#7c3aed)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <GraduationCap style={{ width: 18, height: 18, color: "white" }} />
              </div>
              <span style={{ fontSize: 18, fontWeight: 800, color: "white", fontFamily: "var(--font-display)" }}>TutorConnect</span>
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.7 }}>
              India&apos;s premier AI-powered tutoring marketplace. Find expert tutors, learn at your pace, achieve your goals.
            </p>
          </div>

          {/* Link columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 style={{ fontSize: 14, fontWeight: 600, color: "white", marginBottom: 16 }}>{section.title}</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {section.links.map((link) => (
                  <li key={link.label} style={{ marginBottom: 8 }}>
                    <Link href={link.href} style={{ fontSize: 13, color: "#9ca3af", textDecoration: "none", transition: "color 0.2s" }} className="hover:!text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid #1f2937", paddingTop: 24, display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <p style={{ fontSize: 13 }}>© {new Date().getFullYear()} TutorConnect. All rights reserved.</p>
          <div style={{ display: "flex", gap: 12 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "4px 12px", borderRadius: 999, fontSize: 11, fontWeight: 600, background: "rgba(16,185,129,0.1)", color: "#34d399" }}>
              <Shield style={{ width: 12, height: 12 }} /> Secure Payments
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "4px 12px", borderRadius: 999, fontSize: 11, fontWeight: 600, background: "rgba(99,102,241,0.1)", color: "#818cf8" }}>
              <Award style={{ width: 12, height: 12 }} /> Verified Teachers
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Stats />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}
