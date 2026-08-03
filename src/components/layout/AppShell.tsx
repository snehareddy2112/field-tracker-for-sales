"use client";

import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface AppShellProps {
  children: ReactNode;
  role: "sales_associate" | "branch_head";
  title: string;
}

export default function AppShell({
  children,
  role,
  title,
}: AppShellProps) {
  return (
    <div className="flex min-h-screen bg-slate-50">

      <Sidebar role={role} />

      <main className="flex-1">

        <Header title={title} />

        <div className="p-8">
          {children}
        </div>

      </main>

    </div>
  );
}