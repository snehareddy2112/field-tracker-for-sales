"use client";

import { MapPinned } from "lucide-react";

import AppShell from "@/components/layout/AppShell";
import { Card } from "@/components/ui/card";
import { useLeads } from "@/hooks/useLeads";

type Lead = {
  _id: string;
  name: string;
  address?: string | null;
};

export default function LeadsPage() {
  const { leads, loading } = useLeads();
  const safeLeads: Lead[] = (leads ?? []) as Lead[];

  return (
    <AppShell
      role="sales_associate"
      title="Assigned Leads"
    >
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {loading &&
          [...Array(6)].map((_, index) => (
            <Card
              key={index}
              className="h-44 animate-pulse"
            />
          ))}

        {!loading &&
          safeLeads.map((lead) => (
            <Card
              key={lead._id}
              className="p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">
                    {lead.name}
                  </h2>

                  <p className="mt-2 text-slate-500">
                    {lead.address}
                  </p>
                </div>

                <MapPinned className="text-blue-600" />
              </div>
            </Card>
          ))}
      </div>
    </AppShell>
  );
}