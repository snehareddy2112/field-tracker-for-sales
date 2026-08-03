"use client";

import { useEffect, useState } from "react";
import { getLeads } from "@/client-services/dashboard.service";

interface Lead {
  _id: string;
  name: string;
}

export function useLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeads() {
      try {
        const response = await getLeads();
        setLeads(response);
      } finally {
        setLoading(false);
      }
    }

    fetchLeads();
  }, []);

  return {
    leads,
    loading,
  };
}