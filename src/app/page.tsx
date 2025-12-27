"use client";

import { useMemo, useState } from "react";
import LeafletMap from "@/components/LeafletMap";
import MapboxGlobe from "@/components/MapboxGlobe";
import { nodes } from "@/data/nodes";

/**
 * MAIN PAGE
 * Controls:
 * - Map / Globe toggle
 * - Region filter
 * - Stats
 * - Shared node data
 */
export default function HomePage() {
  /* ---------------- STATE ---------------- */
  const [view, setView] = useState<"map" | "globe">("map");
  const [regionFilter, setRegionFilter] = useState("All");

  /* ---------------- FILTERED NODES ---------------- */
  const filteredNodes = useMemo(() => {
    if (regionFilter === "All") return nodes;
    return nodes.filter((n) => n.region === regionFilter);
  }, [regionFilter]);

  /* ---------------- STATS ---------------- */
  const totalNodes = filteredNodes.length;
  const onlineNodes = filteredNodes.filter((n) => n.status === "Online").length;

  const regionsCount = new Set(filteredNodes.map((n) => n.region)).size;

  const avgLatency =
    filteredNodes.reduce((sum, n) => sum + n.latency, 0) /
    (filteredNodes.length || 1);

  /* ---------------- UI ---------------- */
  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-gray-950 text-white">
      {/* ================= HEADER ================= */}
      <header className="px-8 py-5 border-b border-gray-800 flex items-center justify-between">
        {/* LEFT: TITLE */}
        <div>
          <h1 className="text-2xl font-bold text-teal-400">
            Kadena Nexus
          </h1>
          <p className="text-sm text-gray-400">
            Global Node Map · v1
          </p>
        </div>

        {/* RIGHT: VIEW TOGGLE */}
        <div className="flex gap-2">
          <button
            onClick={() => setView("map")}
            className={`px-4 py-1 rounded text-sm ${
              view === "map"
                ? "bg-teal-400 text-black"
                : "bg-gray-800 text-white"
            }`}
          >
            Map
          </button>

          <button
            onClick={() => setView("globe")}
            className={`px-4 py-1 rounded text-sm ${
              view === "globe"
                ? "bg-teal-400 text-black"
                : "bg-gray-800 text-white"
            }`}
          >
            Globe
          </button>
        </div>
      </header>

      {/* ================= STATS ================= */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 px-8 py-6">
        <StatCard label="Total Nodes" value={totalNodes} />
        <StatCard label="Online" value={onlineNodes} />
        <StatCard label="Regions" value={regionsCount} />
        <StatCard
          label="Avg Latency"
          value={`${Math.round(avgLatency)} ms`}
        />
      </section>

      {/* ================= FILTER ================= */}
      <section className="px-8 pb-4 flex items-center gap-4">
        <label className="text-sm text-gray-400">Region:</label>

        <select
          value={regionFilter}
          onChange={(e) => setRegionFilter(e.target.value)}
          className="bg-black text-white border border-gray-700 rounded px-3 py-2"
        >
          <option value="All">All Regions</option>
          <option value="North America">North America</option>
          <option value="Europe">Europe</option>
          <option value="Asia">Asia</option>
          <option value="Africa">Africa</option>
          <option value="South America">South America</option>
          <option value="Oceania">Oceania</option>
        </select>
      </section>

      {/* ================= MAP / GLOBE ================= */}
      <section className="px-8 pb-8">
        <div className="h-[70vh] rounded-lg overflow-hidden border border-gray-800">
          {view === "map" ? (
            <LeafletMap nodes={filteredNodes} />
          ) : (
            <MapboxGlobe nodes={filteredNodes} />
          )}
        </div>
      </section>
    </main>
  );
}

/* ================= STAT CARD COMPONENT ================= */
function StatCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-lg p-4">
      <p className="text-sm text-gray-400">{label}</p>
      <p className="text-xl font-semibold text-teal-400 mt-1">
        {value}
      </p>
    </div>
  );
}
