"use client";

import { useState } from "react";
import { Play, Square, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Props {
  loading: boolean;
  status?: string;
  onStart: () => Promise<void>;
  onEnd: () => Promise<void>;
  onActivity: () => void;
}

export default function QuickActions({
  loading,
  status,
  onStart,
  onEnd,
  onActivity,
}: Props) {
  const [starting, setStarting] = useState(false);
  const [ending, setEnding] = useState(false);

  async function handleStart() {
    try {
      if (status === "ACTIVE") return;

      setStarting(true);
      await onStart();
    } finally {
      setStarting(false);
    }
  }

  async function handleEnd() {
    try {
      setEnding(true);
      await onEnd();
    } finally {
      setEnding(false);
    }
  }

  const isDayStarted = status === "ACTIVE";
  const isDayCompleted = status === "COMPLETED";

  return (
    <Card className="p-6">
      <h2 className="mb-6 text-xl font-semibold">
        Quick Actions
      </h2>

      <div className="flex flex-wrap gap-4">

        {/* Start Day */}

        <Button
          onClick={handleStart}
          disabled={
            loading ||
            starting ||
            ending ||
            isDayStarted ||
            isDayCompleted
          }
        >
          <Play className="mr-2 h-4 w-4" />

          {starting
            ? "Starting..."
            : isDayStarted
            ? "✓ Day Started"
            : isDayCompleted
            ? "✓ Day Completed"
            : "Start Day"}
        </Button>

        {/* Log Activity */}

        <Button
          variant="outline"
          onClick={onActivity}
          disabled={
            starting ||
            ending ||
            !isDayStarted
          }
        >
          <Plus className="mr-2 h-4 w-4" />
          Log Activity
        </Button>

        {/* End Day */}

        <Button
          variant="destructive"
          onClick={handleEnd}
          disabled={
            loading ||
            starting ||
            ending ||
            !isDayStarted
          }
        >
          <Square className="mr-2 h-4 w-4" />

          {ending ? "Ending..." : "End Day"}
        </Button>

      </div>
    </Card>
  );
}