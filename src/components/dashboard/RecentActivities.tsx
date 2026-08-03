"use client";

import { Clock3 } from "lucide-react";

import { Card } from "@/components/ui/card";

interface ActivityItem {
  _id: string;
  lead?: {
    name?: string | null;
  };
  notes?: string;
  loggedAt: string | Date | number;
}

interface Props {
  timeline: ActivityItem[];
}

export default function RecentActivities({
  timeline,
}: Props) {
  return (
    <Card className="p-6">

      <h2 className="mb-6 text-xl font-semibold">
        Recent Activities
      </h2>

      {!timeline.length && (
        <p className="text-slate-400">
          No activities today.
        </p>
      )}

      <div className="space-y-4">

        {timeline.slice(0, 5).map((activity) => (
          <div
            key={activity._id}
            className="flex items-center justify-between border-b pb-4 last:border-none"
          >
            <div>

              <p className="font-medium">
                {activity.lead?.name}
              </p>

              <p className="text-sm text-slate-500">
                {activity.notes}
              </p>

            </div>

            <div className="flex items-center gap-2 text-sm text-slate-400">

              <Clock3 size={16} />

              {new Date(
                activity.loggedAt
              ).toLocaleTimeString()}

            </div>

          </div>
        ))}

      </div>

    </Card>
  );
}