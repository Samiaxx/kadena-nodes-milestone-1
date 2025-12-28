"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const LeafletMap = dynamic(() => import("../components/LeafletMap"), {
  ssr: false,
});
const GlobeView = dynamic(() => import("../components/GlobeView"), {
  ssr: false,
});

export type NodeStatus = "online" | "offline";

export type Node = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  region: string;
  status: NodeStatus;
  type: string;
};

// ---------------- DATA ----------------
const nodes: Node[] = [
  { id: "1", name: "US West", lat: 37.77, lng: -122.41, region: "NA", status: "online", type: "Validator" },
  { id: "2", name: "US East", lat: 40.71, lng: -74.0, region: "NA", status: "online", type: "Validator" },
  { id: "3", name: "UK", lat: 51.5, lng: -0.12, region: "EU", status: "online", type: "Full Node" },
  { id: "4", name: "Germany", lat: 52.52, lng: 13.4, region: "EU", status: "online", type: "Full Node" },
  { id: "5", name: "India", lat: 28.61, lng: 77.2, region: "AS", status: "offline", type: "Archive" },
  { id: "6", name: "Japan", lat: 35.68, lng: 139.69, region: "AS", status: "online", type: "Validator" },
  { id: "7", name: "Brazil", lat: -23.55, lng: -46.63, region: "SA", status: "offline", type: "Archive" },
  { id: "8", name: "South Africa", lat: -26.2, lng: 28.04, region: "AF", status: "online", type: "Full Node" },
  { id: "9", name: "Australia", lat: -33.86, lng: 151.2, region: "OC", status: "online", type: "Validator" },
  { id: "10", name: "Spain", lat: 40.41, lng: -3.7, region: "EU", status: "online", type: "Full Node" },
];

export default function Page() {
  const [view, setView] = useState<"map" | "globe">("map");
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const onlineCount = nodes.filter(n => n.status === "online").length;
  const regions = new Set(nodes.map(n => n.region)).size;

  return (
    <main className={`${theme === "dark" ? "bg-black text-white" : "bg-white text-black"} min-h-screen px-6 py-8`}>
      <h1 className="text-4xl font-bold mb-1">Kadena Nexus</h1>
      <p className="opacity-70 mb-4">Global Node Map · MVP</p>

      {/* Controls */}
      <div className="flex gap-3 mb-6">
        <button onClick={() => setView("map")} className="px-3 py-1 rounded bg-gray-200 text-black">Map</button>
        <button onClick={() => setView("globe")} className="px-3 py-1 rounded bg-gray-200 text-black">Globe</button>
        <button onClick={() => setTheme(t => t === "dark" ? "light" : "dark")} className="px-3 py-1 rounded bg-gray-200 text-black">
          {theme === "dark" ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Stat title="Total Nodes" value={nodes.length} />
        <Stat title="Online" value={onlineCount} />
        <Stat title="Regions" value={regions} />
        <Stat title="Avg Latency" value="82 ms" />
      </div>

      {/* View */}
      <div className="rounded-xl overflow-hidden border">
        {view === "map" ? (
          <LeafletMap nodes={nodes} theme={theme} />
        ) : (
          <GlobeView nodes={nodes} />
        )}
      </div>
    </main>
  );
}

function Stat({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="p-4 rounded bg-gray-800 text-white">
      <p className="text-sm opacity-70">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
