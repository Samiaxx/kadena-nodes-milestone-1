"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { NodeType } from "./page";

type Props = {
  nodes: NodeType[];
  theme: "light" | "dark";
};

const greenIcon = new L.Icon({
  iconUrl: "/marker-green.png",
  iconSize: [18, 36], // x2 height
  iconAnchor: [9, 36],
});

const redIcon = new L.Icon({
  iconUrl: "/marker-red.png",
  iconSize: [18, 36],
  iconAnchor: [9, 36],
});

export default function LeafletMap({ nodes, theme }: Props) {
  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      className="h-full w-full"
    >
      <TileLayer
        url={
          theme === "light"
            ? "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            : "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        }
      />

      {nodes.map((node) => (
        <Marker
          key={node.id}
          position={[node.lat, node.lng]}
          icon={node.status === "online" ? greenIcon : redIcon}
        >
          <Popup>
            <strong>{node.name}</strong><br />
            ID: {node.id}<br />
            Region: {node.region}<br />
            Status: {node.status}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
