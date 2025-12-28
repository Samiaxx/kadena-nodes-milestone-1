"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";

const LeafletMap = dynamic(() => import("./leaflet-map"), {
  ssr: false,
});

/* ---------- TYPES ---------- */

type NodeStatus = "online" | "offline";

type Node = {
  id: string;
  name: string;
  type: string;
  status: NodeStatus;
  lat: number;
  lng: number;
  region: string;
};

/* ---------- DATA ---------- */

const NODES: Node[] = [
  { id: "1", name: "US West", type: "Validator", status: "online", lat: 37.77, lng: -122.41, region: "North America" },
  { id: "2", name: "US East", type: "Validator", status: "online", lat: 40.71, lng: -74.00, region: "North America" },
  { id: "3", name: "London", type: "Full Node", status: "online", lat: 51.50, lng: -0.12, region: "Europe" },
  { id: "4", name: "Paris", type: "Full Node", status: "offline", lat: 48.85, lng: 2.35, region: "Europe" },
  { id: "5", name: "India", type: "Validator", status: "offline", lat: 20.59, lng: 78.96, region: "Asia" },
  { id: "6", name: "Japan", type: "Full Node", status: "online", lat: 35.67, lng: 139.65, region: "Asia" },
  { id: "7", name: "Australia", type: "Validator", status: "online", lat: -33.86, lng: 151.20, region: "Oceania" },
  { id: "8", name: "Brazil", type: "Full Node", status: "offline", lat: -23.55, lng: -46.63, region: "South America" },
  { id: "9", name: "Nigeria", type: "Full Node", status: "online", lat: 9.08, lng: 8.67, region: "Africa" },
  { id: "10", name: "South Africa", type: "Validator", status: "online", lat: -30.55, lng: 22.93, region: "Africa" },
];

export default function Page() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [region, setRegion] = useState("All");

  const filtered = useMemo(() => {
    if (region === "All") return NODES;
    return NODES.filter((n) => n.region === region);
  }, [region]);

  const online = filtered.filter((n) => n.status === "online").length;
  const regions = new Set(filtered.map((n) => n.region)).size;

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-[#0b1020] text-white" : "bg-white text-black"}`}>
      <div className="p-6">
        <h1 className="text-3xl font-bold">Kadena Nexus</h1>
        <p className="opacity-70">Global Node Map · MVP</p>

        <div className="flex gap-3 mt-4">
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="px-3 py-1 text-black rounded"
          >
            <option>All</option>
            <option>North America</option>
            <option>Europe</option>
            <option>Africa</option>
            <option>Asia</option>
            <option>Oceania</option>
            <option>South America</option>
          </select>

          <button
            onClick={() => setTheme(t => t === "dark" ? "light" : "dark")}
            className="px-3 py-1 border rounded"
          >
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <Stat title="Total Nodes" value={filtered.length} />
          <Stat title="Online" value={online} />
          <Stat title="Regions" value={regions} />
          <Stat title="Avg Latency" value="82 ms" />
        </div>
      </div>

      {/* MAP MUST HAVE HEIGHT */}
      <div className="h-[600px]">
        <LeafletMap nodes={filtered} theme={theme} />
      </div>
    </div>
  );
}

function Stat({ title, value }: { title: string; value: number | string }) {
  return (
    <div className="bg-black/20 rounded p-4">
      <div className="text-sm opacity-70">{title}</div>
      <div className="text-2xl font-semibold">{value}</div>
    </div>
  );
}
