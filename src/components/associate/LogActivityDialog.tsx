"use client";

import { useState } from "react";

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

  if (!open) return null;

  async function handleSave() {
    if (!leadId || !notes.trim()) return;

    try {
      setSaving(true);

      await onSubmit(leadId, notes);

      setLeadId("");
      setNotes("");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-xl">

        <h2 className="text-2xl font-bold">
          Log Activity
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Record today&apos;s customer interaction.
        </p>

        <select
          className="mt-6 h-11 w-full rounded-xl border border-slate-300 px-4"
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
          placeholder="Meeting notes..."
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