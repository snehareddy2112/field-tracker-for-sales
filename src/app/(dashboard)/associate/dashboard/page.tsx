"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import {
  Clock3,
  MapPinned,
  Route,
  CheckCircle2,
} from "lucide-react";

import AppShell from "@/components/layout/AppShell";
import { Card } from "@/components/ui/card";
import { StatCard } from "@/components/ui/stat-card";

import { useAssociateDashboard } from "@/hooks/useAssociateDashboard";
import { useLeads } from "@/hooks/useLeads";
import { useLocation } from "@/hooks/useLocation";

import GreetingCard from "@/components/dashboard/GreetingCard";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentActivities from "@/components/dashboard/RecentActivities";

import {
  startDay,
  endDay,
} from "@/client-services/session-api.service";

import { logActivity } from "@/client-services/activity-api.service";

import LogActivityDialog from "@/components/associate/LogActivityDialog";

import { toast } from "sonner";

const RouteMap = dynamic(
  () =>
    import(
      "@/components/associate/RouteMap"
    ),
  {
    ssr: false,
  }
);

type TimelineItem = {
  _id?: string;
  id?: string;
  loggedAt?: string;
  createdAt?: string;
  timestamp?: string;
  [key: string]: unknown;
};

type ActivityItem = {
  _id: string;
  id?: string;
  loggedAt: string;
  createdAt?: string;
  timestamp?: string;
  [key: string]: unknown;
};

export default function AssociateDashboard() {
  const {
    session,
    timeline = [],
    route,
  } = useAssociateDashboard();

  const recentActivities: ActivityItem[] =
    timeline.map(
      (item: TimelineItem, index: number): ActivityItem => ({
        ...item,
        _id:
          item._id ?? item.id ?? `activity-${index}`,
        loggedAt:
          item.loggedAt ??
          item.createdAt ??
          item.timestamp ??
          new Date().toISOString(),
      })
    );

  const { leads } = useLeads();

  const { loading, getLocation } =
    useLocation();

  const [openDialog, setOpenDialog] =
    useState(false);

  const sessionData = session as
    | {
        startTime?: string;
        totalDistance?: number;
      }
    | undefined;
  async function handleStartDay() {
    try {
      const location = await getLocation();

      if (!location) return;

      await startDay(
        location.latitude,
        location.longitude
      );

      toast.success(
  "🌞 Day started successfully! Have a productive day."
);

window.location.reload();
    } catch (err: unknown) {
      const error = err as {
        response?: {
          data?: { message?: string };
        };
      };

      toast.error(
        error?.response?.data?.message ??
          "Unable to start day"
      );
    }
  }

  async function handleEndDay() {
    try {
      const location = await getLocation();

      if (!location) return;

      await endDay(
        location.latitude,
        location.longitude
      );

      toast.success(
  "🎉 Day ended successfully! Great work today."
);

window.location.reload();
    } catch (err: unknown) {
      const error = err as {
        response?: {
          data?: { message?: string };
        };
      };

      toast.error(
        error?.response?.data?.message ??
          "Unable to end day"
      );
    }
  }

  async function handleLogActivity(
    leadId: string,
    notes: string
  ) {
    try {
      const location = await getLocation();

      if (!location) return;

      await logActivity({
        leadId,
        notes,
        latitude: location.latitude,
        longitude: location.longitude,
      });

     toast.success(
  "✅ Activity logged successfully."
);

setOpenDialog(false);

window.location.reload();
    } catch (err: unknown) {
      const error = err as {
        response?: {
          data?: { message?: string };
        };
      };

      toast.error(
        error?.response?.data?.message ??
          "Unable to log activity"
      );
    }
  }

  return (
    <AppShell
      role="sales_associate"
      title="Associate Dashboard"
    >
      <div className="space-y-8">
        <GreetingCard 
        status={
          (session as {status?: string} | null)
          ?.status
        }
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Started"
            value={
              sessionData?.startTime
                ? new Date(
                    sessionData.startTime
                  ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "--"
            }
            subtitle="Today's start"
            icon={Clock3}
          />

          <StatCard
            title="Distance"
            value={`${
              sessionData?.totalDistance ?? 0
            } km`}
            subtitle="Travelled"
            icon={Route}
          />

          <StatCard
            title="Meetings"
            value={timeline.length}
            subtitle="Today's Activities"
            icon={CheckCircle2}
          />

          <StatCard
            title="Leads"
            value={leads.length}
            subtitle="Assigned"
            icon={MapPinned}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <QuickActions
  loading={loading}
  status={
    (session as { status?: string } | null)?.status
  }
  onStart={handleStartDay}
  onEnd={handleEndDay}
  onActivity={() => setOpenDialog(true)}
/>

          <div className="space-y-6">
            <Card className="h-105 overflow-hidden p-0">
              <RouteMap points={route} />
            </Card>

            <RecentActivities
              timeline={recentActivities}
            />
          </div>
        </div>
      </div>

      <LogActivityDialog
        open={openDialog}
        leads={leads}
        onClose={() =>
          setOpenDialog(false)
        }
        onSubmit={handleLogActivity}
      />
    </AppShell>
  );
}