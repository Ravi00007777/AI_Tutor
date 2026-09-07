"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  GraduationCap,
  Mail,
  Lock,
  User,
  Phone,
  Eye,
  EyeOff,
  ArrowRight,
  BookOpen,
  Users,
} from "lucide-react";
import { Button, Input } from "@/components/ui";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "STUDENT" as "STUDENT" | "TEACHER",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Registration failed. Please try again.");
        return;
      }

      // Auto sign in after registration
      const { signIn } = await import("next-auth/react");
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.ok) {
        router.push("/onboarding");
        router.refresh();
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left — Decorative */}
      <div className="hidden lg:flex flex-1 items-center justify-center gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 bg-accent-500/30 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-primary-500/20 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 text-center px-12 max-w-lg">
          <div className="w-20 h-20 rounded-2xl gradient-accent flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-accent-500/30">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Start your journey today
          </h2>
          <p className="text-gray-300 mb-8">
            Whether you&apos;re a student looking for the perfect tutor or a teacher ready to share your expertise — we&apos;ve got you covered.
          </p>

          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: "🎯", text: "AI-matched teachers" },
              { icon: "📅", text: "Auto-scheduling" },
              { icon: "📊", text: "Progress tracking" },
              { icon: "💰", text: "Transparent pricing" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/10 border border-white/5"
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm text-gray-300">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right — Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-8">
          <Link href="/" className="flex items-center gap-2.5 mb-8">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-extrabold" style={{ fontFamily: "var(--font-display)" }}>
              <span className="text-gradient">Tutor</span>
              <span className="text-gray-900">Connect</span>
            </span>
          </Link>

          <div>
            <h1 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "var(--font-display)" }}>
              Create your account
            </h1>
            <p className="text-gray-500 mt-2">
              Start learning or teaching in minutes
            </p>
          </div>

          {/* Role Selection */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => updateField("role", "STUDENT")}
              className={`flex flex-col items-center gap-2 p-5 rounded-2xl border-2 transition-all duration-200 ${
                formData.role === "STUDENT"
                  ? "border-primary-500 bg-primary-50 shadow-lg shadow-primary-500/10"
                  : "border-gray-200 hover:border-gray-300 bg-white"
              }`}
            >
              <BookOpen
                className={`w-6 h-6 ${
                  formData.role === "STUDENT" ? "text-primary-600" : "text-gray-400"
                }`}
              />
              <div>
                <p
                  className={`text-sm font-bold ${
                    formData.role === "STUDENT" ? "text-primary-700" : "text-gray-700"
                  }`}
                >
                  I&apos;m a Student
                </p>
                <p className="text-xs text-gray-500">or a Parent</p>
              </div>
            </button>
            <button
              type="button"
              onClick={() => updateField("role", "TEACHER")}
              className={`flex flex-col items-center gap-2 p-5 rounded-2xl border-2 transition-all duration-200 ${
                formData.role === "TEACHER"
                  ? "border-accent-500 bg-accent-50 shadow-lg shadow-accent-500/10"
                  : "border-gray-200 hover:border-gray-300 bg-white"
              }`}
            >
              <Users
                className={`w-6 h-6 ${
                  formData.role === "TEACHER" ? "text-accent-600" : "text-gray-400"
                }`}
              />
              <div>
                <p
                  className={`text-sm font-bold ${
                    formData.role === "TEACHER" ? "text-accent-700" : "text-gray-700"
                  }`}
                >
                  I&apos;m a Teacher
                </p>
                <p className="text-xs text-gray-500">Share your expertise</p>
              </div>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 rounded-xl bg-danger-50 border border-danger-200 text-sm text-danger-600">
                {error}
              </div>
            )}

            <Input
              label="Full Name"
              type="text"
              placeholder="Your full name"
              value={formData.name}
              onChange={(e) => updateField("name", e.target.value)}
              required
              icon={<User className="w-4 h-4" />}
            />

            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => updateField("email", e.target.value)}
              required
              icon={<Mail className="w-4 h-4" />}
            />

            <Input
              label="Phone Number"
              type="tel"
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              icon={<Phone className="w-4 h-4" />}
            />

            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Min 8 chars, 1 uppercase, 1 number"
                value={formData.password}
                onChange={(e) => updateField("password", e.target.value)}
                required
                icon={<Lock className="w-4 h-4" />}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[38px] text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full"
              size="lg"
              variant={formData.role === "TEACHER" ? "accent" : "primary"}
            >
              Create {formData.role === "TEACHER" ? "Teacher" : "Student"} Account
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-primary-600 hover:text-primary-700">
              Sign in
            </Link>
          </p>

          <p className="text-center text-xs text-gray-400">
            By creating an account, you agree to our{" "}
            <Link href="#" className="underline">Terms of Service</Link> and{" "}
            <Link href="#" className="underline">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
