import api from "./api";
import {
  DashboardStats,
  AssociateSession,
} from "@/types/dashboard";

export async function getAssociateSessions(): Promise<AssociateSession> {
  const { data } = await api.get("/associate/session");
  return data.data;
}

export async function getAssociateTimeline() {
  const { data } = await api.get("/associate/timeline");
  return data.data;
}

export async function getBranchDashboard(): Promise<DashboardStats> {
  const { data } = await api.get("/branch-head/dashboard");
  return data.data;
}

export async function getLeads() {
  const { data } = await api.get("/leads");
  return data.data;
}