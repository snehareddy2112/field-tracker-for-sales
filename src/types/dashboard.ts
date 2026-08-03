export interface DashboardStats {
  associates?: number;
  leads?: number;
  totalActivities?: number;
  totalSessions?: number;
  todayActivities?: number;
  todaySessions?: number;
  totalDistance?: number;
}

export interface AssociateSession {
  startTime?: string;
  totalDistance?: number;
  status?: "ACTIVE" | "COMPLETED";
}