export async function getRoadDistance(
  coordinates: Array<{
    latitude: number;
    longitude: number;
  }>
): Promise<number> {
  if (coordinates.length < 2) {
    return 0;
  }

  const coordinateString = coordinates
    .map(
      (point) => `${point.longitude},${point.latitude}`
    )
    .join(";");

  const response = await fetch(
    `https://router.project-osrm.org/route/v1/driving/${coordinateString}?overview=false`
  );

  if (!response.ok) {
    throw new Error("Failed to calculate road distance");
  }

  const data = await response.json();

  if (
    !data.routes ||
    data.routes.length === 0
  ) {
    return 0;
  }

  // meters → km
  return Number(
    (data.routes[0].distance / 1000).toFixed(2)
  );
}