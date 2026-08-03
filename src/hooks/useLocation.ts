"use client";

import { useState } from "react";

export function useLocation() {
  const [loading, setLoading] = useState(false);

  async function getLocation() {
    setLoading(true);

    try {
      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) =>
          navigator.geolocation.getCurrentPosition(
            resolve,
            reject,
            {
              enableHighAccuracy: true,
            }
          )
      );

      return {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    getLocation,
  };
}