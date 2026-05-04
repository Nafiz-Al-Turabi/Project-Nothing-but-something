import ClientLayout from "@/Layouts/ClientLayout";
import React from "react";

export default function MainClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClientLayout>{children}</ClientLayout>;
}
