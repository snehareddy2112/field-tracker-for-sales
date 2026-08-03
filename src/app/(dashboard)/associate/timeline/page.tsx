"use client";

import {
  Clock3,
  MapPin,
  PlayCircle,
  CheckCircle2,
  Route,
} from "lucide-react";

import AppShell from "@/components/layout/AppShell";
import { Card } from "@/components/ui/card";
import { useAssociateDashboard } from "@/hooks/useAssociateDashboard";

type TimelineActivity = {
  _id?: string | number;
  lead?: {
    name?: string | null;
  } | null;
  notes?: string | null;
  loggedAt?: string | Date | number | null;
};

type Session = {
  startTime?: string;
  totalDistance?: number;
  status?: string;
};

export default function TimelinePage() {
  const {
    session,
    timeline,
    loading,
  } = useAssociateDashboard();

  const sessionData = session as Session;

  const activities = [...timeline].sort(
    (a: TimelineActivity, b: TimelineActivity) =>
      new Date(a.loggedAt ?? "").getTime() -
      new Date(b.loggedAt ?? "").getTime()
  );

  return (
    <AppShell
      role="sales_associate"
      title="Today's Timeline"
    >
      <div className="space-y-6">

        {/* Summary */}

        <Card className="p-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">

          <h1 className="text-2xl font-bold">
            Today&apos;s Journey
          </h1>

          <div className="mt-6 grid gap-4 md:grid-cols-3">

            <div>
              <p className="text-blue-100 text-sm">
                Status
              </p>

              <p className="text-lg font-semibold">
                {sessionData?.status === "ACTIVE"
                  ? "🟢 Active"
                  : "✅ Completed"}
              </p>
            </div>

            <div>
              <p className="text-blue-100 text-sm">
                Meetings
              </p>

              <p className="text-lg font-semibold">
                {activities.length}
              </p>
            </div>

            <div>
              <p className="text-blue-100 text-sm">
                Distance
              </p>

              <p className="text-lg font-semibold">
                {sessionData?.totalDistance ?? 0} km
              </p>
            </div>

          </div>

        </Card>

        {loading ? (
          <Card className="p-8">
            Loading timeline...
          </Card>
        ) : (

          <div className="space-y-5">

            {/* Day Started */}

            {sessionData?.startTime && (

              <Card className="border-green-200 bg-green-50 p-5">

                <div className="flex items-center gap-4">

                  <PlayCircle
                    className="text-green-600"
                    size={28}
                  />

                  <div>

                    <h2 className="font-semibold">
                      Day Started
                    </h2>

                    <p className="text-sm text-slate-500">
                      {new Date(
                        sessionData.startTime
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>

                  </div>

                </div>

              </Card>

            )}

            {/* Activities */}

            {activities.map((activity, index) => (

              <Card
                key={
                  activity._id ??
                  `activity-${index}`
                }
                className="p-5"
              >

                <div className="flex justify-between">

                  <div>

                    <h2 className="font-semibold text-lg">

                      {activity.lead?.name ??
                        "Customer Visit"}

                    </h2>

                    <p className="mt-1 text-slate-500">
                      {activity.notes}
                    </p>

                    <div className="mt-3 flex items-center gap-2 text-sm text-slate-400">

                      <Clock3 size={16} />

                      {activity.loggedAt
                        ? new Date(
                            activity.loggedAt
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "--"}

                    </div>

                  </div>

                  <div className="rounded-full bg-blue-100 p-3">

                    <MapPin className="text-blue-600" />

                  </div>

                </div>

              </Card>

            ))}

            {/* Completed */}

            {sessionData?.status ===
              "COMPLETED" && (

              <Card className="border-red-200 bg-red-50 p-5">

                <div className="flex items-center gap-4">

                  <CheckCircle2
                    className="text-red-600"
                    size={28}
                  />

                  <div>

                    <h2 className="font-semibold">
                      Day Completed
                    </h2>

                    <p className="text-sm text-slate-500">

                      Distance Travelled

                    </p>

                    <p className="font-semibold">

                      <Route
                        className="mr-1 inline h-4 w-4"
                      />

                      {sessionData.totalDistance ??
                        0}{" "}
                      km

                    </p>

                  </div>

                </div>

              </Card>

            )}

          </div>

        )}

      </div>
    </AppShell>
  );
}