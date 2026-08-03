"use client";

import {
  Users,
  Route,
  Activity,
  FileSpreadsheet,
  Download,
} from "lucide-react";

import AppShell from "@/components/layout/AppShell";
import { StatCard } from "@/components/ui/stat-card";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import OverviewChart from "@/components/branch-head/OverviewChart";
import AssociateTable from "@/components/branch-head/AssociateTable";

import { useBranchDashboard } from "@/hooks/useBranchDashboard";
import { exportMonthlyReport } from "@/client-services/branch-api.service";


export default function BranchDashboard() {
  const {
    stats,
    associates,
    activities,
    loading,
    search,
    handleSearch,
  } = useBranchDashboard();

  if (loading) {
    return (
      <AppShell role="branch_head" title="Branch Dashboard">
        <div className="space-y-6">
          <div className="h-40 animate-pulse rounded-3xl bg-slate-200" />

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-36 animate-pulse rounded-3xl bg-slate-200"
              />
            ))}
          </div>
        </div>
      </AppShell>
    );
  }

  const typedAssociates = (associates ?? []) as Array<{
    _id: string;
    name: string;
    email: string;
    role: string;
  }>;

  const typedActivities = (activities ?? []) as Array<{
    _id: string;
    notes?: string;
    associate?: {
      _id?: string;
      name?: string;
    };
  }>;

  const chartData = typedAssociates.map((associate) => ({
    name: associate.name,
    meetings: typedActivities.filter(
      (activity) => activity.associate?._id === associate._id
    ).length,
  }));

  async function handleExport() {
  try {
    const today = new Date();

    const blob = await exportMonthlyReport(
      today.getMonth() + 1,
      today.getFullYear()
    );

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = `monthly-report-${today.getFullYear()}-${
      today.getMonth() + 1
    }.csv`;

    document.body.appendChild(link);

    link.click();

    link.remove();

    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error(error);
    alert("Failed to export report");
  }
}

  return (
    <AppShell
      role="branch_head"
      title="Branch Dashboard"
    >
      <div className="space-y-8">

        {/* Hero */}

        <Card className="bg-linear-to-r from-slate-900 via-slate-800 to-slate-700 p-8 text-white">
          <div className="flex items-center justify-between">

            <div>
              <h1 className="text-4xl font-bold">
                Branch Overview
              </h1>

              <p className="mt-3 text-slate-300">
                Monitor your team&apos;s field operations.
              </p>
            </div>

            <Button
              onClick={handleExport}
              className="bg-white text-slate-900 hover:bg-slate-200"
            >
              <Download className="mr-2 h-4 w-4" />
              Export Monthly Report
            </Button>

          </div>
        </Card>

        {/* Stats */}

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          <StatCard
            title="Associates"
            value={stats?.associates ?? typedAssociates.length}
            subtitle="Active"
            icon={Users}
          />

          <StatCard
            title="Distance"
            value={`${stats?.totalDistance ?? 0} km`}
            subtitle="Travelled"
            icon={Route}
          />

          <StatCard
            title="Activities"
            value={typedActivities.length}
            subtitle="Completed"
            icon={Activity}
          />

          <StatCard
            title="Reports"
            value={stats?.totalSessions ?? 0}
            subtitle="Sessions"
            icon={FileSpreadsheet}
          />

        </div>

        {/* Charts */}

        <div className="grid gap-6 lg:grid-cols-2">

          <Card className="p-6">

            <h2 className="mb-6 text-xl font-semibold">
              Team Performance
            </h2>

            <OverviewChart
              data={chartData}
            />

          </Card>

          <Card className="p-6">

            <h2 className="mb-6 text-xl font-semibold">
              Recent Activities
            </h2>

            <div className="space-y-4">

              {typedActivities.slice(0, 6).map((activity) => (
                <div
                  key={activity._id}
                  className="rounded-xl border p-4"
                >
                  <p className="font-medium">
                    {activity.associate?.name}
                  </p>

                  <p className="text-sm text-slate-500">
                    {activity.notes}
                  </p>
                </div>
              ))}

            </div>

          </Card>

        </div>

        {/* Search */}

        <Card className="p-6">

          <Input
            placeholder="Search associate by name or email..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />

        </Card>

        {/* Table */}

        <AssociateTable
          associates={typedAssociates}
        />

      </div>
    </AppShell>
  );
}