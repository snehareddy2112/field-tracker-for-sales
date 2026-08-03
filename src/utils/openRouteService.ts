const ORS_API_KEY = process.env.OPEN_ROUTE_API_KEY!;

export async function getRoadDistance(
  coordinates: {
    latitude: number;
    longitude: number;
}[]
) {
  if (coordinates.length < 2) return 0;

  const response = await fetch(
    "https://api.openrouteservice.org/v2/directions/driving-car",
    {
      method: "POST",
      headers: {
        Authorization: ORS_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        coordinates: coordinates.map((c) => [
          c.longitude,
          c.latitude,
        ]),
      }),
    }
  );

  if (!response.ok) {
    throw new Error("ORS request failed");
  }

  const data = await response.json();

  return Number(
    (
      data.routes[0].summary.distance / 1000
    ).toFixed(2)
  );
}