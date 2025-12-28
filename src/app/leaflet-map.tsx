"use client";

import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";

type Node = {
  id: string;
  name: string;
  type: string;
  status: "online" | "offline";
  lat: number;
  lng: number;
};

export default function LeafletMap({
  nodes,
  theme,
}: {
  nodes: Node[];
  theme: "dark" | "light";
}) {
  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url={
          theme === "dark"
            ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        }
      />

      {nodes.map((n) => (
        <CircleMarker
          key={n.id}
          center={[n.lat, n.lng]}
          radius={7}
          pathOptions={{
            color: n.status === "online" ? "#22c55e" : "#ef4444",
            fillOpacity: 0.9,
          }}
        >
          <Tooltip>
            <strong>{n.name}</strong>
            <br />
            {n.type}
            <br />
            Status: {n.status}
          </Tooltip>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
