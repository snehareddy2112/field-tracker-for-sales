"use client";

import { useEffect, useState } from "react";

import {
  getActivities,
  getAssociates,
  searchAssociates,
} from "@/client-services/branch-api.service";

import { getBranchDashboard } from "@/client-services/dashboard.service";

export function useBranchDashboard() {
  const [stats, setStats] =
    useState<Awaited<ReturnType<typeof getBranchDashboard>> | null>(
      null,
    );

  const [activities, setActivities] =
    useState<unknown[]>([]);

  const [associates, setAssociates] =
    useState<unknown[]>([]);

  const [loading, setLoading] =
    useState(true);
  
  const [search, setSearch] = useState("");
  useEffect(() => {
    async function load() {
      try {
        const [
          dashboard,
          associates,
          activities,
        ] = await Promise.all([
          getBranchDashboard(),
          getAssociates(),
          getActivities(),
        ]);

        setStats(dashboard);
        setAssociates(associates);
        setActivities(activities);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  async function handleSearch(value: string) {
  setSearch(value);

  if (!value.trim()) {
    const associates = await getAssociates();
    setAssociates(associates);
    return;
  }

  const results = await searchAssociates(value);
  setAssociates(results);
}

  return {
    stats,
    associates,
    activities,
    loading,
    search, 
    handleSearch,
  };
}