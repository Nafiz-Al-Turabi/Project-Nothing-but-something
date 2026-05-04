import DashboardLayout from "@/Layouts/DashboardLayout";
import React from "react";

export default function MainDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <DashboardLayout>{children}</DashboardLayout>
    </div>
  );
}
