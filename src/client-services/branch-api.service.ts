import api from "./api";

export async function getAssociates() {
  const { data } = await api.get(
    "/branch-head/associates"
  );

  return data.data;
}

export async function getActivities() {
  const { data } = await api.get(
    "/branch-head/activities"
  );

  return data.data;
}

export async function searchAssociates(query: string) {
  const { data } = await api.get(
    `/branch-head/search?q=${encodeURIComponent(query)}`
  );

  return data.data;
}

export async function exportMonthlyReport(
  month: number,
  year: number
) {
  const response = await api.get(
    `/branch-head/export?month=${month}&year=${year}`,
    {
      responseType: "blob",
    }
  );

  return response.data;
}