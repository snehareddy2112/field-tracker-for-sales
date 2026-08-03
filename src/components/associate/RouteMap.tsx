"use client";

import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

type LeafletIconDefaultPrototype = L.Icon.Default & {
  _getIconUrl?: string;
};

delete (L.Icon.Default.prototype as LeafletIconDefaultPrototype)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface Point {
  latitude: number;
  longitude: number;
  title: string;
}

interface Props {
  points: Point[];
}

export default function RouteMap({
  points,
}: Props) {
  if (!points.length) {
    return (
      <div className="flex h-full items-center justify-center">
        No Route Available
      </div>
    );
  }

  return (
    <MapContainer
      center={[
        points[0].latitude,
        points[0].longitude,
      ]}
      zoom={13}
      className="h-full w-full rounded-2xl"
    >
      <TileLayer
        attribution="OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {points.map((point, index) => (
        <Marker
          key={index}
          position={[
            point.latitude,
            point.longitude,
          ]}
        >
          <Popup>{point.title}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}