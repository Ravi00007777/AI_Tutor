"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui";
import {
  LayoutDashboard,
  Search,
  Calendar,
  BookOpen,
  ClipboardList,
  TrendingUp,
  CreditCard,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  GraduationCap,
  ChevronDown,
  Sparkles,
} from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: "student" | "teacher" | "admin";
}

const navItems = {
  student: [
    { href: "/student", label: "Dashboard", icon: LayoutDashboard },
    { href: "/student/teachers", label: "Find Teachers", icon: Search },
    { href: "/student/calendar", label: "Calendar", icon: Calendar },
    { href: "/student/classes", label: "My Classes", icon: BookOpen },
    { href: "/student/assignments", label: "Assignments", icon: ClipboardList },
    { href: "/student/study-plan", label: "Study Plan", icon: Sparkles },
    { href: "/student/progress", label: "Progress", icon: TrendingUp },
    { href: "/student/payments", label: "Payments", icon: CreditCard },
    { href: "/student/messages", label: "Messages", icon: MessageSquare },
    { href: "/student/settings", label: "Settings", icon: Settings },
  ],
  teacher: [
    { href: "/teacher", label: "Dashboard", icon: LayoutDashboard },
    { href: "/teacher/students", label: "My Students", icon: GraduationCap },
    { href: "/teacher/calendar", label: "Calendar", icon: Calendar },
    { href: "/teacher/classes", label: "My Classes", icon: BookOpen },
    { href: "/teacher/assignments", label: "Assignments", icon: ClipboardList },
    { href: "/teacher/availability", label: "Availability", icon: Calendar },
    { href: "/teacher/earnings", label: "Earnings", icon: CreditCard },
    { href: "/teacher/messages", label: "Messages", icon: MessageSquare },
    { href: "/teacher/settings", label: "Settings", icon: Settings },
  ],
  admin: [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/teachers", label: "Teachers", icon: GraduationCap },
    { href: "/admin/students", label: "Students", icon: BookOpen },
    { href: "/admin/classes", label: "Classes", icon: Calendar },
    { href: "/admin/payments", label: "Payments", icon: CreditCard },
    { href: "/admin/scheduling", label: "Scheduling", icon: Calendar },
    { href: "/admin/reports", label: "Reports", icon: TrendingUp },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ],
};

export default function DashboardLayout({ children, role }: DashboardLayoutProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);

  const items = navItems[role];

  const roleColors = {
    student: "from-primary-600 to-primary-500",
    teacher: "from-accent-500 to-accent-600",
    admin: "from-purple-600 to-purple-500",
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] flex">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-[260px] bg-white border-r border-gray-100 flex flex-col transition-transform duration-300 lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="px-6 py-5 border-b border-gray-50">
          <Link href="/" className="flex items-center gap-2.5">
            <div className={cn("w-9 h-9 rounded-xl bg-gradient-to-r flex items-center justify-center", roleColors[role])}>
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-extrabold" style={{ fontFamily: "var(--font-display)" }}>
              <span className="text-gradient">Tutor</span>
              <span className="text-gray-900">Connect</span>
            </span>
          </Link>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {items.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== `/${role}` && pathname.startsWith(item.href));
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn("sidebar-link", isActive && "active")}
              >
                <Icon className="w-[18px] h-[18px]" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User card */}
        <div className="px-3 py-4 border-t border-gray-50">
          <div className="relative">
            <button
              onClick={() => setProfileDropdown(!profileDropdown)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <Avatar
                name={session?.user?.name || "User"}
                src={session?.user?.avatarUrl}
                size="sm"
              />
              <div className="flex-1 text-left min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {session?.user?.name || "User"}
                </p>
                <p className="text-xs text-gray-500 capitalize">{role}</p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>

            {profileDropdown && (
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-xl shadow-xl border border-gray-100 p-2 animate-fade-in">
                <Link
                  href={`/${role}/settings`}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-danger-600 hover:bg-danger-50"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="flex-1 lg:ml-[260px]">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-gray-100">
          <div className="flex items-center justify-between px-4 lg:px-8 h-16">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>

            <div className="hidden lg:flex items-center gap-3">
              <h1 className="text-lg font-bold text-gray-900 capitalize">
                {items.find(
                  (item) =>
                    pathname === item.href ||
                    (item.href !== `/${role}` && pathname.startsWith(item.href))
                )?.label || "Dashboard"}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <button className="relative p-2.5 rounded-xl hover:bg-gray-100 transition-colors">
                <Bell className="w-5 h-5 text-gray-500" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-danger-500 rounded-full" />
              </button>
              <div className="lg:hidden">
                <Avatar
                  name={session?.user?.name || "U"}
                  src={session?.user?.avatarUrl}
                  size="sm"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="p-4 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
