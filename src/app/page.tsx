"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { nodes } from "@/data/nodes";

const LeafletMap = dynamic(() => import("@/components/LeafletMap"), {
  ssr: false,
});

const MapboxGlobe = dynamic(() => import("@/components/MapboxGlobe"), {
  ssr: false,
});

export default function Home() {
  const [view, setView] = useState<"map" | "globe">("map"); // MAP FIRST
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [region, setRegion] = useState("All");

  const filteredNodes = useMemo(() => {
    if (region === "All") return nodes;
    return nodes.filter((n) => n.region === region);
  }, [region]);

  const regions = useMemo(
    () => ["All", ...Array.from(new Set(nodes.map((n) => n.region)))],
    []
  );

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          theme === "dark"
            ? "linear-gradient(180deg,#050b14,#02040a)"
            : "linear-gradient(180deg,#eef3fb,#dbe6f7)",
        color: theme === "dark" ? "#fff" : "#000",
        padding: "24px",
      }}
    >
      <h1>Kadena Nexus</h1>
      <p>Global Node Map · MVP</p>

      {/* CONTROLS */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button onClick={() => setView("map")}>Map</button>
        <button onClick={() => setView("globe")}>Globe</button>

        <select value={region} onChange={(e) => setRegion(e.target.value)}>
          {regions.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>

        <button
          onClick={() =>
            setTheme((t) => (t === "dark" ? "light" : "dark"))
          }
        >
          {theme === "dark" ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      {/* STATS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 16,
          marginTop: 20,
        }}
      >
        <Stat title="Total Nodes" value={filteredNodes.length} />
        <Stat
          title="Online"
          value={filteredNodes.filter((n) => n.status === "online").length}
        />
        <Stat
          title="Regions"
          value={new Set(filteredNodes.map((n) => n.region)).size}
        />
        <Stat
          title="Avg Latency"
          value={`${Math.round(
            filteredNodes.reduce((a, b) => a + b.latency, 0) /
              filteredNodes.length
          )} ms`}
        />
      </div>

      {/* MAP / GLOBE */}
      <div style={{ height: 650, marginTop: 24 }}>
        {view === "map" && (
          <LeafletMap nodes={filteredNodes} theme={theme} />
        )}
        {view === "globe" && (
          <MapboxGlobe nodes={filteredNodes} theme={theme} />
        )}
      </div>
    </main>
  );
}

function Stat({ title, value }: { title: string; value: any }) {
  return (
    <div
      style={{
        padding: 16,
        borderRadius: 12,
        background: "rgba(255,255,255,0.08)",
      }}
    >
      <div style={{ opacity: 0.7 }}>{title}</div>
      <div style={{ fontSize: 22, fontWeight: 600 }}>{value}</div>
    </div>
  );
}
