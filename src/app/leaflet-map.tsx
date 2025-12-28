"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet marker icons (VERY IMPORTANT for Next.js)
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// ---------------- TYPES ----------------
export type NodeData = {
  id: string;
  name: string;
  type: string;
  status: "online" | "offline";
  region: string;
  latency: number;
  lat: number;
  lng: number;
};

// ---------------- COMPONENT ----------------
export default function LeafletMap({ nodes }: { nodes: NodeData[] }) {
  return (
    <div style={{ width: "100%", height: "520px", borderRadius: "12px" }}>
      <MapContainer
        center={[20, 0]}
        zoom={2}
        scrollWheelZoom
        style={{ width: "100%", height: "100%" }}
      >
        {/* DARK / BLACK MAP TILE */}
        <TileLayer
          attribution="&copy; OpenStreetMap & Carto"
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {/* NODE MARKERS */}
        {nodes.map((node) => (
          <Marker key={node.id} position={[node.lat, node.lng]}>
            <Popup>
              <div style={{ fontSize: "13px", lineHeight: "1.6" }}>
                <strong>{node.name}</strong>
                <br />
                <span>ID:</span> {node.id}
                <br />
                <span>Type:</span> {node.type}
                <br />
                <span>Status:</span>{" "}
                <span
                  style={{
                    color:
                      node.status === "online" ? "#22c55e" : "#ef4444",
                    fontWeight: 600,
                  }}
                >
                  {node.status}
                </span>
                <br />
                <span>Region:</span> {node.region}
                <br />
                <span>Latency:</span> {node.latency} ms
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
