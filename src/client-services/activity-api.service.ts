import api from "./api";

export interface LogActivityPayload {
  leadId: string;
  notes: string;
  latitude: number;
  longitude: number;
}

export async function logActivity(
  payload: LogActivityPayload
) {
  const { data } = await api.post(
    "/activities/log",
    payload
  );

  return data.data;
}