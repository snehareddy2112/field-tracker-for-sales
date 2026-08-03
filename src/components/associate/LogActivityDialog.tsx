"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Lead {
  _id: string;
  name: string;
}

interface Props {
  open: boolean;
  leads: Lead[];
  onClose: () => void;
  onSubmit: (
    leadId: string,
    notes: string
  ) => Promise<void>;
}

export default function LogActivityDialog({
  open,
  leads,
  onClose,
  onSubmit,
}: Props) {
  const [leadId, setLeadId] = useState("");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape" && !saving) {
        onClose();
      }
    }

    if (open) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [open, saving, onClose]);

  if (!open) return null;

  async function handleSave() {
    if (!leadId || !notes.trim()) return;

    try {
      setSaving(true);

      await onSubmit(leadId, notes.trim());

      setLeadId("");
      setNotes("");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={() => {
        if (!saving) onClose();
      }}
    >
      <div
        className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold">
          Log Customer Interaction
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Record today&apos;s customer meeting or visit.
        </p>

        <select
          className="mt-6 h-11 w-full rounded-xl border border-slate-300 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={leadId}
          disabled={saving}
          onChange={(e) => setLeadId(e.target.value)}
        >
          <option value="">Select Lead</option>

          {leads.map((lead) => (
            <option
              key={lead._id}
              value={lead._id}
            >
              {lead.name}
            </option>
          ))}
        </select>

        <Input
          className="mt-4"
          placeholder="Enter meeting summary, discussion points, follow-up..."
          value={notes}
          disabled={saving}
          onChange={(e) => setNotes(e.target.value)}
        />

        <div className="mt-6 flex justify-end gap-3">
          <Button
            variant="outline"
            disabled={saving}
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            disabled={
              saving ||
              !leadId ||
              !notes.trim()
            }
            onClick={handleSave}
          >
            {saving
              ? "Saving..."
              : "Save Activity"}
          </Button>
        </div>
      </div>
    </div>
  );
}