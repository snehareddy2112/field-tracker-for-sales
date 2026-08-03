"use client";

import { useEffect, useState } from "react";
import {
  getAssociateSessions,
  getAssociateTimeline,
  getLeads,
} from "@/client-services/dashboard.service";

type DashboardRecord = object;


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
export function useAssociateDashboard() {
  const [session, setSession] =
    useState<DashboardRecord | null>(null);

  const [timeline, setTimeline] = useState<
    TimelineActivity[]
  >([]);

  const [leads, setLeads] = useState<
    DashboardRecord[]
  >([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
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
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const route: { latitude: number; longitude: number; title: string }[] =
    timeline.map((activity: TimelineActivity) => ({
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