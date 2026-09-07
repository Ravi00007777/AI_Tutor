"use client";

import Link from "next/link";
import { useState } from "react";
import {
  CheckCircle2,
  ArrowRight,
  GraduationCap,
  Shield,
  Zap,
  Star,
  Users,
  Video,
  Calendar,
  Brain,
  BookOpen,
  Award,
  Sparkles,
  HelpCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "5,000",
    period: "/month per subject",
    desc: "Perfect for students needing help in one subject.",
    popular: false,
    features: [
      "2 classes per week",
      "45-minute sessions",
      "AI teacher matching",
      "Free demo class",
      "Assignment tracking",
      "Progress dashboard",
      "Email support",
    ],
    cta: "Start with Starter",
    ctaLink: "/register",
  },
  {
    name: "Standard",
    price: "8,000",
    period: "/month per subject",
    desc: "Most popular — great for consistent academic improvement.",
    popular: true,
    features: [
      "3 classes per week",
      "60-minute sessions",
      "AI teacher matching",
      "Free demo class",
      "Assignment tracking",
      "Progress dashboard",
      "AI study plans",
      "Google Calendar sync",
      "Parent progress reports",
      "Priority support",
    ],
    cta: "Start with Standard",
    ctaLink: "/register",
  },
  {
    name: "Premium",
    price: "12,000",
    period: "/month per subject",
    desc: "Intensive preparation for board exams and competitive tests.",
    popular: false,
    features: [
      "5 classes per week",
      "60–90 minute sessions",
      "Top-rated teacher matching",
      "Unlimited demo classes",
      "Personalized assignments",
      "Advanced progress analytics",
      "AI study plans + revision schedule",
      "Google Calendar sync",
      "Recorded class notes",
      "Dedicated academic coordinator",
      "24/7 doubt clearing",
    ],
    cta: "Start with Premium",
    ctaLink: "/register",
  },
];

const faqs = [
  { q: "Is the demo class really free?", a: "Yes! You can book a free 30-minute demo with any teacher before committing. No credit card required." },
  { q: "Can I change my teacher?", a: "Absolutely. If you're not satisfied after regular classes, you can request a new teacher and take another free demo — no extra charge." },
  { q: "How are teachers vetted?", a: "Every teacher goes through a 4-step verification: identity check, qualification verification, demo teaching evaluation, and background check. Only ~30% of applicants are approved." },
  { q: "What if I miss a class?", a: "Classes can be rescheduled up to 4 hours in advance. Missed classes without prior notice count towards your weekly quota but don't incur extra charges." },
  { q: "How does payment work?", a: "Monthly payments processed securely via Razorpay (UPI, cards, net banking). Invoices are generated automatically. The platform charges a 15% service fee included in the listed price." },
  { q: "Can parents track progress?", a: "Yes! Parents get their own dashboard with attendance records, assignment scores, teacher feedback, and progress reports. They also receive email summaries." },
];

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
          <p style={{ fontSize: 13, fontWeight: 700, color: "#6366f1", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>Simple Pricing</p>
          <h1 style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 800, color: "#111827", fontFamily: "var(--font-display)", lineHeight: 1.15, marginBottom: 20 }}>
            Transparent Pricing,{" "}
            <span style={{ background: "linear-gradient(135deg,#4f46e5,#7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>No Hidden Fees</span>
          </h1>
          <p style={{ fontSize: 18, color: "#6b7280", lineHeight: 1.7 }}>
            Pick a plan that works for your goals. All plans include free demo classes, AI matching, and progress tracking.
          </p>
        </div>
      </section>

      {/* Plans Grid */}
      <section style={{ padding: "0 0 100px" }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, alignItems: "stretch" }}>
            {plans.map((plan, i) => (
              <div key={i} style={{
                padding: 32,
                borderRadius: 24,
                border: plan.popular ? "2px solid #6366f1" : "1px solid #e5e7eb",
                background: plan.popular ? "linear-gradient(180deg, #faf5ff, white)" : "white",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                boxShadow: plan.popular ? "0 8px 32px rgba(99,102,241,0.12)" : "none",
                transition: "transform 0.3s, box-shadow 0.3s",
              }} className="hover:-translate-y-1 hover:shadow-xl">
                {plan.popular && (
                  <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", padding: "6px 20px", borderRadius: 999, background: "linear-gradient(135deg,#4f46e5,#7c3aed)", color: "white", fontSize: 12, fontWeight: 700 }}>
                    ⭐ Most Popular
                  </div>
                )}
                <h3 style={{ fontSize: 22, fontWeight: 800, color: "#111827", fontFamily: "var(--font-display)", marginBottom: 4 }}>{plan.name}</h3>
                <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 20 }}>{plan.desc}</p>
                <div style={{ marginBottom: 24 }}>
                  <span style={{ fontSize: 40, fontWeight: 800, color: "#111827" }}>₹{plan.price}</span>
                  <span style={{ fontSize: 14, color: "#9ca3af" }}>{plan.period}</span>
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10, flex: 1, marginBottom: 24 }}>
                  {plan.features.map((f, j) => (
                    <li key={j} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "#4b5563" }}>
                      <CheckCircle2 style={{ width: 16, height: 16, color: plan.popular ? "#6366f1" : "#10b981", flexShrink: 0 }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href={plan.ctaLink} style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  padding: "14px 24px",
                  borderRadius: 14,
                  fontSize: 15,
                  fontWeight: 700,
                  textDecoration: "none",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  ...(plan.popular
                    ? { color: "white", background: "linear-gradient(135deg,#4f46e5,#7c3aed)", boxShadow: "0 4px 14px rgba(99,102,241,0.3)" }
                    : { color: "#4f46e5", background: "white", border: "2px solid #e0e7ff" }),
                }}>
                  {plan.cta} <ArrowRight style={{ width: 16, height: 16 }} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section style={{ padding: "80px 0", background: "#f9fafb" }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <h2 style={{ fontSize: 28, fontWeight: 800, color: "#111827", fontFamily: "var(--font-display)", textAlign: "center", marginBottom: 48 }}>Everything included in all plans</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24 }}>
            {[
              { icon: Brain, label: "AI Teacher Matching" },
              { icon: Video, label: "Free Demo Classes" },
              { icon: Calendar, label: "Auto-Scheduling" },
              { icon: BookOpen, label: "Assignment Tracking" },
              { icon: TrendingUp, label: "Progress Dashboard" },
              { icon: Shield, label: "Secure Payments" },
            ].map(({ icon: Icon, label }, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 20px", borderRadius: 16, background: "white", border: "1px solid #f3f4f6" }}>
                <Icon style={{ width: 20, height: 20, color: "#6366f1" }} />
                <span style={{ fontSize: 14, fontWeight: 600, color: "#374151" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section style={{ padding: "80px 0" }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <h2 style={{ fontSize: 28, fontWeight: 800, color: "#111827", fontFamily: "var(--font-display)", textAlign: "center", marginBottom: 48 }}>Frequently Asked Questions</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{ borderRadius: 16, border: "1px solid #f3f4f6", overflow: "hidden", background: openFaq === i ? "#faf5ff" : "white" }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 24px", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
                  <span style={{ fontSize: 15, fontWeight: 600, color: "#111827" }}>{faq.q}</span>
                  {openFaq === i ? <ChevronUp style={{ width: 18, height: 18, color: "#6b7280" }} /> : <ChevronDown style={{ width: 18, height: 18, color: "#6b7280" }} />}
                </button>
                {openFaq === i && (
                  <div style={{ padding: "0 24px 18px", fontSize: 14, color: "#6b7280", lineHeight: 1.7 }}>{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 24px", background: "linear-gradient(135deg, #4f46e5, #7c3aed)", textAlign: "center" }}>
        <h2 style={{ fontSize: "clamp(24px, 3vw, 40px)", fontWeight: 800, color: "white", fontFamily: "var(--font-display)", marginBottom: 16 }}>Start Your Free Demo Today</h2>
        <p style={{ fontSize: 17, color: "rgba(255,255,255,0.8)", marginBottom: 32 }}>No commitment required. Try a free class with any teacher.</p>
        <Link href="/register" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "16px 36px", fontSize: 16, fontWeight: 700, color: "#4f46e5", background: "white", borderRadius: 16, textDecoration: "none" }}>
          Get Started Free <ArrowRight style={{ width: 18, height: 18 }} />
        </Link>
      </section>
    </main>
  );
}
