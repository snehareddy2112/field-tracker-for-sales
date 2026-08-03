"use client";

import {
  Bell,
  Sun,
} from "lucide-react";

//import { Input } from "@/components/ui/input";

interface HeaderProps {
  title: string;
}

export default function Header({
  title,
}: HeaderProps) {
  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8">

      <div>

        <h1 className="text-3xl font-bold text-slate-900">
          {title}
        </h1>

        <p className="text-sm text-slate-500">
          Welcome back 👋
        </p>

      </div>

      <div className="flex items-center gap-4">

      

        <button className="rounded-xl border p-3 hover:bg-slate-100">
          <Bell size={18} />
        </button>

        <button className="rounded-xl border p-3 hover:bg-slate-100">
          <Sun size={18} />
        </button>

      </div>

    </header>
  );
}

/*
 <div className="relative hidden md:block">

          <Search
            size={18}
            className="absolute left-3 top-3.5 text-slate-400"
          />

          <Input
            placeholder="Search..."
            className="w-72 pl-10"
          />

        </div>
*/