"use client";

import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

/* =========================
   MOCK NODE DATA (v1)
   ========================= */
const nodes = [
  {
    id: 1,
    name: "Kadena Node – US East",
    city: "New York",
    country: "USA",
    region: "North America",
    chain: "Chain 1",
    type: "Validator",
    version: "v1.12.3",
    status: "Online",
    latency: 42,
    uptime: "99.98%",
    lastSeen: "3s ago",
    lat: 40.7128,
    lng: -74.006,
  },
  {
    id: 2,
    name: "Kadena Node – Europe",
    city: "Frankfurt",
    country: "Germany",
    region: "Europe",
    chain: "Chain 2",
    type: "Full Node",
    version: "v1.12.3",
    status: "Online",
    latency: 55,
    uptime: "99.91%",
    lastSeen: "6s ago",
    lat: 50.1109,
    lng: 8.6821,
  },
  {
    id: 3,
    name: "Kadena Node – Asia",
    city: "Singapore",
    country: "Singapore",
    region: "Asia",
    chain: "Chain 3",
    type: "RPC Node",
    version: "v1.12.3",
    status: "Online",
    latency: 68,
    uptime: "99.87%",
    lastSeen: "4s ago",
    lat: 1.3521,
    lng: 103.8198,
  },
];

/* =========================
   LEAFLET MAP COMPONENT
   ========================= */
export default function LeafletMap() {
  useEffect(() => {
    const map = L.map("map", {
      center: [20, 0],
      zoom: 2,
      worldCopyJump: true,
    });

    /* Dark map tiles (Web3 style) */
    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      {
        attribution: "© OpenStreetMap, © Carto",
      }
    ).addTo(map);

    /* =========================
       NODE MARKERS + TOOLTIPS
       ========================= */
    nodes.forEach((node) => {
      const marker = L.circleMarker([node.lat, node.lng], {
        radius: 7,
        color: "#4fd1c5",
        weight: 2,
        fillColor: "#4fd1c5",
        fillOpacity: 0.9,
      }).addTo(map);

      marker.bindTooltip(
        `
        <div style="
          font-family: Inter, sans-serif;
          background: linear-gradient(180deg, #0c1220, #070b12);
          color: #e6edf3;
          padding: 10px 12px;
          border-radius: 8px;
          border: 1px solid #1f2937;
          min-width: 220px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.4);
        ">
          <div style="font-weight:600; color:#4fd1c5; margin-bottom:4px;">
            ${node.name}
          </div>

          <div style="font-size:12px; color:#9aa4b2; margin-bottom:6px;">
            ${node.city}, ${node.country} • ${node.region}
          </div>

          <div style="font-size:12px; line-height:1.6;">
            <div>Chain: <b>${node.chain}</b></div>
            <div>Type: <b>${node.type}</b></div>
            <div>Version: <b>${node.version}</b></div>
            <div>Status:
              <b style="color:${node.status === "Online" ? "#22c55e" : "#ef4444"}">
                ${node.status}
              </b>
            </div>
            <div>Latency: <b>${node.latency} ms</b></div>
            <div>Uptime: <b>${node.uptime}</b></div>
            <div>Last seen: <b>${node.lastSeen}</b></div>
          </div>
        </div>
        `,
        {
          direction: "top",
          sticky: true,
          opacity: 1,
        }
      );
    });

    return () => {
      map.remove();
    };
  }, []);

  return <div id="map" style={{ width: "100%", height: "100%" }} />;
}
