"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, Badge, Button, Tabs } from "@/components/ui";
import {
  DollarSign,
  TrendingUp,
  CreditCard,
  Clock,
  CheckCircle2,
  Download,
  CalendarDays,
  ArrowUp,
  IndianRupee,
  BarChart3,
  Users,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const monthlyEarnings = [
  { month: "Apr 2026", earned: 38000, classes: 48, students: 20 },
  { month: "May 2026", earned: 40000, classes: 52, students: 21 },
  { month: "Jun 2026", earned: 35000, classes: 42, students: 18 },
  { month: "Jul 2026", earned: 42000, classes: 56, students: 22 },
  { month: "Aug 2026", earned: 44000, classes: 58, students: 23 },
  { month: "Sep 2026", earned: 45600, classes: 28, students: 24 },
];

const recentPayouts = [
  { id: "1", amount: 4400000, status: "COMPLETED", date: "2026-09-01", method: "Bank Transfer" },
  { id: "2", amount: 3800000, status: "COMPLETED", date: "2026-08-01", method: "Bank Transfer" },
  { id: "3", amount: 4200000, status: "COMPLETED", date: "2026-07-01", method: "Bank Transfer" },
];

export default function TeacherEarningsPage() {
  const totalEarnings = monthlyEarnings.reduce((s, m) => s + m.earned, 0);
  const thisMonth = monthlyEarnings[monthlyEarnings.length - 1];
  const lastMonth = monthlyEarnings[monthlyEarnings.length - 2];
  const growth = lastMonth ? Math.round(((thisMonth.earned - lastMonth.earned) / lastMonth.earned) * 100) : 0;

  const maxEarning = Math.max(...monthlyEarnings.map((m) => m.earned));

  return (
    <DashboardLayout role="teacher">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "var(--font-display)" }}>
            Earnings
          </h1>
          <Button variant="outline" size="sm" icon={<Download className="w-4 h-4" />}>
            Export Report
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Earnings</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{formatCurrency(totalEarnings * 100)}</p>
              </div>
              <div className="p-2.5 rounded-xl bg-accent-50">
                <DollarSign className="w-5 h-5 text-accent-600" />
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">This Month</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{formatCurrency(thisMonth.earned * 100)}</p>
                {growth > 0 && (
                  <p className="text-xs text-accent-600 font-semibold mt-1">
                    <ArrowUp className="w-3 h-3 inline" /> {growth}% vs last month
                  </p>
                )}
              </div>
              <div className="p-2.5 rounded-xl bg-primary-50">
                <TrendingUp className="w-5 h-5 text-primary-600" />
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">Classes This Month</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{thisMonth.classes}</p>
              </div>
              <div className="p-2.5 rounded-xl bg-warm-50">
                <CalendarDays className="w-5 h-5 text-warm-600" />
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Students</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{thisMonth.students}</p>
              </div>
              <div className="p-2.5 rounded-xl bg-purple-50">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Earnings Chart */}
        <Card>
          <h2 className="text-lg font-bold text-gray-900 mb-6">Earnings Trend</h2>
          <div className="flex items-end gap-4 h-48">
            {monthlyEarnings.map((m, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-xs font-semibold text-gray-600">
                  ₹{(m.earned / 1000).toFixed(0)}k
                </span>
                <div
                  className="w-full rounded-t-xl bg-gradient-to-t from-accent-500 to-accent-400 transition-all duration-500 hover:from-accent-600 hover:to-accent-500"
                  style={{ height: `${(m.earned / maxEarning) * 150}px` }}
                />
                <span className="text-[10px] text-gray-400">{m.month.split(" ")[0]}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Payouts */}
        <Card padding="none">
          <div className="px-6 py-4 border-b border-gray-50">
            <h2 className="text-lg font-bold text-gray-900">Payout History</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-50">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Amount</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Date</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Method</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentPayouts.map((payout) => (
                  <tr key={payout.id} className="hover:bg-gray-50/50">
                    <td className="px-6 py-3 text-sm font-semibold text-gray-900">
                      {formatCurrency(payout.amount, true)}
                    </td>
                    <td className="px-6 py-3">
                      <Badge variant="success">
                        <CheckCircle2 className="w-3 h-3 mr-1" /> Completed
                      </Badge>
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-500">
                      {new Date(payout.date).toLocaleDateString("en-IN", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-500">{payout.method}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Note */}
        <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100">
          <p className="text-xs text-blue-700">
            <strong>Note:</strong> Earnings are after the 15% platform commission.
            Payouts are processed on the 1st of every month for the previous month&apos;s earnings.
            Bank details can be updated in Settings.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
