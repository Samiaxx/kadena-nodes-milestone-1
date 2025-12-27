"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import type { NodeItem } from "@/data/nodes";

const LeafletMap = dynamic(() => import("./LeafletMap"), { ssr: false });
const MapboxGlobe = dynamic(() => import("./MapboxGlobe"), { ssr: false });

type Props = {
  nodes: NodeItem[];
};

export default function ClientMapView({ nodes }: Props) {
  const [view, setView] = useState<"map" | "globe">("map");
  const [region, setRegion] = useState("All");
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const filteredNodes =
    region === "All"
      ? nodes
      : nodes.filter((n) => n.region === region);

  return (
    <div
      style={{
        background: theme === "dark" ? "#050b14" : "#f5f7fa",
        color: theme === "dark" ? "#ffffff" : "#000000",
        minHeight: "100vh",
        padding: 16,
      }}
    >
      <h1 style={{ fontSize: 28, fontWeight: "bold" }}>Kadena Nexus</h1>
      <p style={{ opacity: 0.7, marginBottom: 12 }}>
        Global Node Map · MVP
      </p>

      {/* CONTROLS */}
      <div style={{ marginBottom: 12 }}>
        <button onClick={() => setView("map")}>Map</button>
        <button onClick={() => setView("globe")} style={{ marginLeft: 8 }}>
          Globe
        </button>

        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          style={{ marginLeft: 8 }}
        >
          <option value="All">All</option>
          <option value="North America">North America</option>
          <option value="Europe">Europe</option>
          <option value="Asia">Asia</option>
          <option value="Africa">Africa</option>
          <option value="South America">South America</option>
          <option value="Oceania">Oceania</option>
        </select>

        <button
          onClick={() =>
            setTheme(theme === "dark" ? "light" : "dark")
          }
          style={{ marginLeft: 8 }}
        >
          {theme === "dark" ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      {/* MAP AREA */}
      <div style={{ height: "650px", width: "100%" }}>
        {view === "map" && <LeafletMap nodes={filteredNodes} />}
        {view === "globe" && <MapboxGlobe nodes={filteredNodes} />}
      </div>
    </div>
  );
}
