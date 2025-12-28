"use client";

import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Node } from "../app/page";

export default function LeafletMap({
  nodes,
  theme,
}: {
  nodes: Node[];
  theme: "dark" | "light";
}) {
  return (
    <MapContainer center={[20, 0]} zoom={2} style={{ height: "520px", width: "100%" }}>
      <TileLayer
        url={
          theme === "dark"
            ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        }
      />

      {nodes.map((n) => (
        <CircleMarker
          key={n.id}
          center={[n.lat, n.lng]}
          radius={8}
          pathOptions={{ color: n.status === "online" ? "lime" : "red" }}
        >
          <Popup>
            <strong>{n.name}</strong><br />
            ID: {n.id}<br />
            Type: {n.type}<br />
            Status: {n.status}<br />
            Region: {n.region}
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
