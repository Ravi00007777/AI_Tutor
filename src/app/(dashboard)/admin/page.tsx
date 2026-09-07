"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, Badge, Button } from "@/components/ui";
import {
  Users,
  GraduationCap,
  CreditCard,
  TrendingUp,
  BookOpen,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Clock,
  DollarSign,
  ArrowRight,
  BarChart3,
  UserCheck,
  UserX,
  Video,
  Star,
  Percent,
} from "lucide-react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";

const recentTeachers = [
  { name: "Rahul Sharma", subject: "Mathematics", status: "APPROVED", students: 24, rating: 4.8 },
  { name: "Priya Mehta", subject: "Physics", status: "APPROVED", students: 18, rating: 4.6 },
  { name: "Aman Kumar", subject: "Chemistry", status: "PENDING", students: 0, rating: 0 },
  { name: "Sneha Iyer", subject: "English", status: "PENDING", students: 0, rating: 0 },
];

const recentPayments = [
  { student: "Ananya Gupta", amount: 800000, commission: 120000, status: "CAPTURED", date: "2026-09-04" },
  { student: "Rohan Patel", amount: 1000000, commission: 150000, status: "CAPTURED", date: "2026-09-03" },
  { student: "Priya Singh", amount: 600000, commission: 90000, status: "PENDING", date: "2026-09-05" },
];

const subjectDemand = [
  { subject: "Mathematics", count: 145, pct: 32 },
  { subject: "Physics", count: 98, pct: 22 },
  { subject: "Chemistry", count: 78, pct: 17 },
  { subject: "Biology", count: 56, pct: 12 },
  { subject: "English", count: 45, pct: 10 },
  { subject: "Computer Science", count: 30, pct: 7 },
];

export default function AdminDashboardPage() {
  return (
    <DashboardLayout role="admin">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "var(--font-display)" }}>
            Platform Overview 📊
          </h1>
          <p className="text-gray-500 mt-1">
            Real-time metrics for your tutoring marketplace
          </p>
        </div>

        {/* Top stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Students</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">2,547</p>
                <p className="text-xs text-accent-600 font-semibold mt-1">↑ 127 this month</p>
              </div>
              <div className="p-2.5 rounded-xl bg-primary-50">
                <Users className="w-5 h-5 text-primary-600" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Active Teachers</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">186</p>
                <p className="text-xs text-warm-600 font-semibold mt-1">12 pending approval</p>
              </div>
              <div className="p-2.5 rounded-xl bg-accent-50">
                <GraduationCap className="w-5 h-5 text-accent-600" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Revenue</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{formatCurrency(1245000)}</p>
                <p className="text-xs text-accent-600 font-semibold mt-1">↑ 18% vs last month</p>
              </div>
              <div className="p-2.5 rounded-xl bg-warm-50">
                <DollarSign className="w-5 h-5 text-warm-600" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Commission</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{formatCurrency(186750)}</p>
                <p className="text-xs text-gray-500 mt-1">15% average rate</p>
              </div>
              <div className="p-2.5 rounded-xl bg-purple-50">
                <Percent className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Secondary stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="!p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-50">
                <Video className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Classes Today</p>
                <p className="text-lg font-bold text-gray-900">342</p>
              </div>
            </div>
          </Card>
          <Card className="!p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent-50">
                <UserCheck className="w-4 h-4 text-accent-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Demo Conversion</p>
                <p className="text-lg font-bold text-gray-900">72%</p>
              </div>
            </div>
          </Card>
          <Card className="!p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-warm-50">
                <Star className="w-4 h-4 text-warm-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Avg. Rating</p>
                <p className="text-lg font-bold text-gray-900">4.7</p>
              </div>
            </div>
          </Card>
          <Card className="!p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-danger-50">
                <AlertCircle className="w-4 h-4 text-danger-500" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Pending Issues</p>
                <p className="text-lg font-bold text-gray-900">5</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Teachers Pending Approval */}
          <div className="lg:col-span-2">
            <Card padding="none">
              <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">Teachers</h2>
                <Link href="/admin/teachers" className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center gap-1">
                  Manage all <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-50">
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Teacher</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Subject</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Students</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Rating</th>
                      <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {recentTeachers.map((teacher, i) => (
                      <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-3">
                          <p className="text-sm font-semibold text-gray-900">{teacher.name}</p>
                        </td>
                        <td className="px-6 py-3 text-sm text-gray-600">{teacher.subject}</td>
                        <td className="px-6 py-3">
                          <Badge variant={teacher.status === "APPROVED" ? "success" : "warning"}>
                            {teacher.status === "APPROVED" ? "Active" : "Pending"}
                          </Badge>
                        </td>
                        <td className="px-6 py-3 text-sm text-gray-600">{teacher.students}</td>
                        <td className="px-6 py-3">
                          {teacher.rating > 0 ? (
                            <span className="text-sm font-semibold flex items-center gap-1">
                              <Star className="w-3.5 h-3.5 fill-warm-400 text-warm-400" />
                              {teacher.rating}
                            </span>
                          ) : (
                            <span className="text-xs text-gray-400">No reviews</span>
                          )}
                        </td>
                        <td className="px-6 py-3 text-right">
                          {teacher.status === "PENDING" ? (
                            <div className="flex gap-2 justify-end">
                              <Button variant="accent" size="sm">Approve</Button>
                              <Button variant="ghost" size="sm">Reject</Button>
                            </div>
                          ) : (
                            <Button variant="ghost" size="sm">View</Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* Subject Demand */}
          <div>
            <Card padding="none">
              <div className="px-6 py-4 border-b border-gray-50">
                <h2 className="text-lg font-bold text-gray-900">Subject Demand</h2>
              </div>
              <div className="p-6 space-y-4">
                {subjectDemand.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">{item.subject}</span>
                        <span className="text-xs text-gray-500">{item.count} students</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-primary-400 to-primary-600 transition-all duration-700"
                          style={{ width: `${item.pct}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Recent Payments */}
        <Card padding="none">
          <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Recent Payments</h2>
            <Link href="/admin/payments" className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center gap-1">
              All payments <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-50">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Student</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Amount</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Commission</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentPayments.map((payment, i) => (
                  <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-3 text-sm font-semibold text-gray-900">{payment.student}</td>
                    <td className="px-6 py-3 text-sm text-gray-700">{formatCurrency(payment.amount, true)}</td>
                    <td className="px-6 py-3 text-sm text-accent-600 font-semibold">{formatCurrency(payment.commission, true)}</td>
                    <td className="px-6 py-3">
                      <Badge variant={payment.status === "CAPTURED" ? "success" : "warning"}>
                        {payment.status === "CAPTURED" ? "Paid" : "Pending"}
                      </Badge>
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-500">
                      {new Date(payment.date).toLocaleDateString("en-IN", {
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
