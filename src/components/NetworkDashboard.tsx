"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import StatCard from "./StatCard";
import ViewToggle from "./ViewToggle";

const LeafletMap = dynamic(() => import("./LeafletMap"), { ssr: false });
const GlobeView = dynamic(() => import("./GlobeView"), { ssr: false });

export default function NetworkDashboard() {
  const [view, setView] = useState<"map" | "globe">("map");

  // SAFE STATIC DATA (no undefined)
  const tps = 2.5;
  const tx24h = 200000;
  const blockTime = 30;
  const activeNodes = 20;

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">
        Kadena Network Dashboard
      </h1>

      {/* STATS */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard title="Live TPS" value={tps} />
        <StatCard title="24h Transactions" value={tx24h} />
        <StatCard title="Avg Block Time (s)" value={blockTime} />
        <StatCard title="Active Nodes" value={activeNodes} />
      </div>

      {/* CONTROLS */}
      <div className="mb-4">
        <ViewToggle view={view} onChange={setView} />
      </div>

      {/* MAP / GLOBE */}
      <div className="rounded-lg overflow-hidden">
        {view === "map" ? <LeafletMap /> : <GlobeView />}
      </div>
    </div>
  );
}
