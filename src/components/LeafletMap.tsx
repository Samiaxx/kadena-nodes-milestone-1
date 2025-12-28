"use client";

import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

type NodeType = {
  id: string;
  name: string;
  type: string;
  status: "online" | "offline";
  lat: number;
  lng: number;
};

const greenIcon = new L.Icon({
  iconUrl: "https://maps.gstatic.com/mapfiles/ms2/micons/green-dot.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const redIcon = new L.Icon({
  iconUrl: "https://maps.gstatic.com/mapfiles/ms2/micons/red-dot.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const nodes: NodeType[] = [
  { id: "node-001", name: "US West", type: "Validator", status: "online", lat: 37.7749, lng: -122.4194 },
  { id: "node-002", name: "US East", type: "Validator", status: "online", lat: 40.7128, lng: -74.006 },
  { id: "node-003", name: "Europe", type: "Full Node", status: "offline", lat: 50.1109, lng: 8.6821 },
  { id: "node-004", name: "Asia", type: "Validator", status: "online", lat: 1.3521, lng: 103.8198 },
  { id: "node-005", name: "South America", type: "Full Node", status: "online", lat: -23.5505, lng: -46.6333 },
  { id: "node-006", name: "Africa", type: "Validator", status: "offline", lat: -26.2041, lng: 28.0473 },
  { id: "node-007", name: "UK", type: "Validator", status: "online", lat: 51.5074, lng: -0.1278 },
  { id: "node-008", name: "Germany", type: "Full Node", status: "online", lat: 52.52, lng: 13.405 },
  { id: "node-009", name: "Canada", type: "Validator", status: "online", lat: 43.6532, lng: -79.3832 },
  { id: "node-010", name: "Australia", type: "Full Node", status: "offline", lat: -33.8688, lng: 151.2093 },
];

export default function LeafletMap({ theme }: { theme: "light" | "dark" }) {
  return (
    <MapContainer center={[20, 0]} zoom={2} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        attribution="© OpenStreetMap • Carto"
        url={
          theme === "dark"
            ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        }
      />

      {nodes.map((node) => (
        <Marker
          key={node.id}
          position={[node.lat, node.lng]}
          icon={node.status === "online" ? greenIcon : redIcon}
        >
          <Tooltip direction="top" offset={[0, -10]} opacity={1}>
            <div style={{ minWidth: 160 }}>
              <strong>{node.name}</strong>
              <div>ID: {node.id}</div>
              <div>Type: {node.type}</div>
              <div>
                Status:{" "}
                <span style={{ color: node.status === "online" ? "limegreen" : "red" }}>
                  {node.status.toUpperCase()}
                </span>
              </div>
            </div>
          </Tooltip>
        </Marker>
      ))}
    </MapContainer>
  );
}
