import api from "./api";

interface SessionPayload {
  latitude: number;
  longitude: number;
  accuracy?: number;
}

export async function startDay(
  latitude: number,
  longitude: number
) {
  const payload: SessionPayload = {
    latitude,
    longitude,
    accuracy: 10,
  };

  const { data } = await api.post(
    "/sessions/start",
    payload
  );

  return data.data;
}

export async function endDay(
  latitude: number,
  longitude: number
) {
  const payload: SessionPayload = {
    latitude,
    longitude,
    accuracy: 10,
  };

  const { data } = await api.post(
    "/sessions/end",
    payload
  );

  return data.data;
}

export async function getActiveSession() {
  const { data } = await api.get(
    "/associate/session"
  );

  return data.data;
}