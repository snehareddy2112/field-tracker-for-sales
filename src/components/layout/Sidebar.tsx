"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MapPinned,
  Clock3,
  LogOut,
} from "lucide-react";

const associateLinks = [
  {
    name: "Dashboard",
    href: "/associate/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Leads",
    href: "/associate/leads",
    icon: MapPinned,
  },
  {
    name: "Timeline",
    href: "/associate/timeline",
    icon: Clock3,
  },
];

const branchLinks = [
  {
    name: "Dashboard",
    href: "/branch-head/dashboard",
    icon: LayoutDashboard,
  },
 /* {
    name: "Associates",
    href: "/branch-head/associates",
    icon: Users,
  },
  {
    name: "Reports",
    href: "/branch-head/reports",
    icon: FileSpreadsheet,
  },*/
];

interface SidebarProps {
  role: "sales_associate" | "branch_head";
}

export default function Sidebar({
  role,
}: SidebarProps) {
  const pathname = usePathname();

  const links =
    role === "branch_head"
      ? branchLinks
      : associateLinks;

  return (
    <aside className="hidden h-screen w-72 border-r border-slate-200 bg-white lg:flex lg:flex-col">

      <div className="border-b p-8">

        <h1 className="text-2xl font-bold">
          RAHA
        </h1>

        <p className="text-sm text-slate-500">
          Field Tracker
        </p>

      </div>

      <nav className="flex-1 space-y-2 p-4">

        {links.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                pathname === item.href
                  ? "bg-blue-600 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <Icon size={20} />

              {item.name}
            </Link>
          );
        })}

      </nav>

      <div className="border-t p-4">

        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-600 transition hover:bg-red-50">
          <LogOut size={18} />

          Logout
        </button>

      </div>

    </aside>
  );
}