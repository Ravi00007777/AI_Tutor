"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, Badge, Button, Tabs } from "@/components/ui";
import {
  CreditCard,
  Clock,
  CheckCircle2,
  Download,
  IndianRupee,
  CalendarDays,
  ArrowRight,
  AlertCircle,
  Receipt,
  RefreshCw,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const payments = [
  {
    id: "p1",
    subject: "Mathematics",
    teacherName: "Rahul Sharma",
    amount: 800000,
    commission: 120000,
    status: "CAPTURED",
    paymentMonth: "2026-09-01",
    paidAt: "2026-09-02T10:30:00",
    razorpayPaymentId: "pay_abc123",
  },
  {
    id: "p2",
    subject: "Physics",
    teacherName: "Priya Mehta",
    amount: 1200000,
    commission: 180000,
    status: "CAPTURED",
    paymentMonth: "2026-09-01",
    paidAt: "2026-09-01T14:15:00",
    razorpayPaymentId: "pay_def456",
  },
  {
    id: "p3",
    subject: "Chemistry",
    teacherName: "Aman Kumar",
    amount: 1000000,
    commission: 150000,
    status: "PENDING",
    paymentMonth: "2026-10-01",
    paidAt: null,
    razorpayPaymentId: null,
  },
  {
    id: "p4",
    subject: "Mathematics",
    teacherName: "Rahul Sharma",
    amount: 800000,
    commission: 120000,
    status: "CAPTURED",
    paymentMonth: "2026-08-01",
    paidAt: "2026-08-03T09:00:00",
    razorpayPaymentId: "pay_ghi789",
  },
];

export default function StudentPaymentsPage() {
  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { id: "all", label: "All", count: payments.length },
    { id: "paid", label: "Paid", count: payments.filter((p) => p.status === "CAPTURED").length },
    { id: "pending", label: "Pending", count: payments.filter((p) => p.status === "PENDING").length },
  ];

  let filtered = payments;
  if (activeTab === "paid") filtered = payments.filter((p) => p.status === "CAPTURED");
  else if (activeTab === "pending") filtered = payments.filter((p) => p.status === "PENDING");

  const totalPaid = payments.filter((p) => p.status === "CAPTURED").reduce((s, p) => s + p.amount, 0);
  const totalPending = payments.filter((p) => p.status === "PENDING").reduce((s, p) => s + p.amount, 0);

  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "var(--font-display)" }}>
          Payments
        </h1>

        {/* Summary */}
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Paid</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{formatCurrency(totalPaid, true)}</p>
              </div>
              <div className="p-2.5 rounded-xl bg-accent-50">
                <CheckCircle2 className="w-5 h-5 text-accent-600" />
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Pending</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{formatCurrency(totalPending, true)}</p>
              </div>
              <div className="p-2.5 rounded-xl bg-warm-50">
                <Clock className="w-5 h-5 text-warm-600" />
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Active Subscriptions</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">3</p>
                <p className="text-xs text-gray-500 mt-1">subjects</p>
              </div>
              <div className="p-2.5 rounded-xl bg-primary-50">
                <CreditCard className="w-5 h-5 text-primary-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Pending payment alert */}
        {totalPending > 0 && (
          <div className="p-4 rounded-2xl bg-warm-50 border border-warm-100 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-warm-600 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-warm-800">
                You have {formatCurrency(totalPending, true)} in pending payments
              </p>
              <p className="text-xs text-warm-600">
                Pay now to ensure uninterrupted classes
              </p>
            </div>
            <Button variant="primary" size="sm" icon={<CreditCard className="w-4 h-4" />}>
              Pay Now
            </Button>
          </div>
        )}

        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Payment List */}
        <Card padding="none">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-50">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Subject / Teacher</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Period</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Amount</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Date</th>
                  <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-gray-900">{payment.subject}</p>
                      <p className="text-xs text-gray-500">{payment.teacherName}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(payment.paymentMonth).toLocaleDateString("en-IN", {
                        month: "long",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      {formatCurrency(payment.amount, true)}
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        variant={
                          payment.status === "CAPTURED"
                            ? "success"
                            : payment.status === "PENDING"
                            ? "warning"
                            : "danger"
                        }
                      >
                        {payment.status === "CAPTURED" ? "Paid" : payment.status === "PENDING" ? "Due" : payment.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {payment.paidAt
                        ? new Date(payment.paidAt).toLocaleDateString("en-IN", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "—"}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {payment.status === "PENDING" ? (
                        <Button variant="primary" size="sm">Pay</Button>
                      ) : (
                        <Button variant="ghost" size="sm" icon={<Receipt className="w-3.5 h-3.5" />}>
                          Receipt
                        </Button>
                      )}
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
