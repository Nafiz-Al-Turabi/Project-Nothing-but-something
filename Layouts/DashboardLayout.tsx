"use client";

import ThemeToggle from "@/components/Theme/Toggle";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import {
  FiBarChart2,
  FiCalendar,
  FiFolder,
  FiGrid,
  FiHelpCircle,
  FiMenu,
  FiMessageSquare,
  FiSettings,
  FiUsers,
  FiX,
} from "react-icons/fi";

const navItems = [
  { name: "Overview", href: "/dashboard", icon: FiGrid },
  { name: "Analytics", href: "/dashboard/analytics", icon: FiBarChart2 },
  { name: "Projects", href: "/dashboard/projects", icon: FiFolder },
  { name: "Team", href: "/dashboard/team", icon: FiUsers },
  { name: "Messages", href: "/dashboard/messages", icon: FiMessageSquare },
  { name: "Calendar", href: "/dashboard/calendar", icon: FiCalendar },
];

const bottomItems = [
  { name: "Settings", href: "/dashboard/settings", icon: FiSettings },
  { name: "Help", href: "/dashboard/help", icon: FiHelpCircle },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar overlay"
          className="fixed inset-0 z-30 bg-slate-900/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 border-r border-slate-200 bg-white p-5 transition-transform duration-300 dark:border-slate-800 dark:bg-slate-900 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
              Workspace
            </p>
            <h2 className="text-xl font-bold">Nafiz Dashboard</h2>
          </div>
          <button
            type="button"
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <FiX size={18} />
          </button>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  active
                    ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                    : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                }`}
              >
                <Icon size={17} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="mt-6 border-t border-slate-200 pt-6 dark:border-slate-800">
          {bottomItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className="mb-2 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <Icon size={17} />
                {item.name}
              </Link>
            );
          })}
        </div>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80 sm:px-6">
          <div className="mx-auto flex  items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="rounded-lg border border-slate-200 p-2 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 lg:hidden"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open sidebar"
              >
                <FiMenu size={18} />
              </button>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Welcome back</p>
                <h1 className="text-base font-semibold sm:text-lg">Dashboard Overview</h1>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <ThemeToggle />
            </div>
          </div>
        </header>
        <main className="mx-auto w-full  p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
