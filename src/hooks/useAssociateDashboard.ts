"use client";

import { useEffect, useState } from "react";
import {
  getAssociateSessions,
  getAssociateTimeline,
  getLeads,
} from "@/client-services/dashboard.service";

import type { AssociateSession } from "@/types/dashboard";

type TimelineActivity = {
  _id: string;
  latitude: number;
  longitude: number;
  notes: string;
  loggedAt: string;
  lead?: {
    _id?: string;
    name?: string | null;
  } | null;
};

type Lead = {
  _id: string;
  name: string;
};

export function useAssociateDashboard() {
  const [session, setSession] =
    useState<AssociateSession | null>(null);

  const [timeline, setTimeline] = useState<
    TimelineActivity[]
  >([]);

  const [leads, setLeads] = useState<Lead[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        setLoading(true);

        const [
          sessionData,
          timelineData,
          leadsData,
        ] = await Promise.all([
          getAssociateSessions(),
          getAssociateTimeline(),
          getLeads(),
        ]);

        setSession(sessionData);
        setTimeline(timelineData);
        setLeads(leadsData);
      } catch (error) {
        console.error(
          "Failed to load associate dashboard:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  const route = timeline.map((activity) => ({
    latitude: activity.latitude,
    longitude: activity.longitude,
    title: activity.lead?.name ?? "Meeting",
  }));

  return {
    loading,
    session,
    timeline,
    leads,
    route,
  };
}