"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

// Client-side only maps
const LeafletMap = dynamic(() => import("../components/LeafletMap"), {
  ssr: false,
});

const MapboxGlobe = dynamic(() => import("../components/MapboxGlobe"), {
  ssr: false,
});

export default function Home() {
  const [view, setView] = useState<"map" | "globe">("map");

  return (
    <main
      style={{
        height: "100vh",
        background: "#070b12",
        color: "#e6edf3",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <header
        style={{
          padding: "1rem",
          borderBottom: "1px solid #0e1629",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h1 style={{ margin: 0, color: "#4fd1c5" }}>Kadena Nexus</h1>
          <p style={{ margin: 0, fontSize: "0.75rem", color: "#9aa4b2" }}>
            Global Node Map · v1
          </p>
        </div>

        <div>
          <button
            onClick={() => setView("map")}
            style={{
              marginRight: "0.5rem",
              padding: "0.4rem 0.8rem",
              background: view === "map" ? "#4fd1c5" : "#0c1220",
              color: view === "map" ? "#000" : "#e6edf3",
              border: "1px solid #1f2937",
              cursor: "pointer",
            }}
          >
            Map
          </button>

          <button
            onClick={() => setView("globe")}
            style={{
              padding: "0.4rem 0.8rem",
              background: view === "globe" ? "#4fd1c5" : "#0c1220",
              color: view === "globe" ? "#000" : "#e6edf3",
              border: "1px solid #1f2937",
              cursor: "pointer",
            }}
          >
            Globe
          </button>
        </div>
      </header>

      {/* Map Area */}
      <section style={{ flex: 1 }}>
        {view === "map" ? <LeafletMap /> : <MapboxGlobe />}
      </section>
    </main>
  );
}
