"use client";

import { useState } from "react";
import { Play, Square, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Props {
  loading: boolean;
  onStart: () => Promise<void>;
  onEnd: () => Promise<void>;
  onActivity: () => void;
}

export default function QuickActions({
  loading,
  onStart,
  onEnd,
  onActivity,
}: Props) {
  const [starting, setStarting] = useState(false);
  const [ending, setEnding] = useState(false);

  async function handleStart() {
    try {
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

  return (
    <Card className="p-6">
      <h2 className="mb-6 text-xl font-semibold">
        Quick Actions
      </h2>

      <div className="flex flex-wrap gap-4">

        <Button
          disabled={loading || starting || ending}
          onClick={handleStart}
        >
          <Play className="mr-2 h-4 w-4" />
          {starting ? "Starting..." : "Start Day"}
        </Button>

        <Button
          variant="outline"
          disabled={starting || ending}
          onClick={onActivity}
        >
          <Plus className="mr-2 h-4 w-4" />
          Log Activity
        </Button>

        <Button
          variant="destructive"
          disabled={loading || starting || ending}
          onClick={handleEnd}
        >
          <Square className="mr-2 h-4 w-4" />
          {ending ? "Ending..." : "End Day"}
        </Button>

      </div>
    </Card>
  );
}