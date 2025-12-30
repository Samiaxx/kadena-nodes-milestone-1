"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { getNetworkStats } from "@/lib/chainweb";

// Disable SSR for Leaflet (VERY IMPORTANT)
const LeafletMap = dynamic(() => import("./leaflet-map"), {
  ssr: false,
});

type NetworkStats = {
  tps: number;
  tx24h: number;
  blockTime: number;
  activeNodes: number;
};

export default function Page() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [stats, setStats] = useState<NetworkStats | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch live dashboard stats
  useEffect(() => {
    async function loadStats() {
      try {
        const data = await getNetworkStats();
        setStats(data);
      } catch (err) {
        console.error("Failed to load network stats", err);
      } finally {
        setLoading(false);
      }
    }

    loadStats();

    // Auto refresh every 30s (can change to 15s later)
    const interval = setInterval(loadStats, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: theme === "dark" ? "#0b0b0b" : "#f5f7fa",
        color: theme === "dark" ? "#ffffff" : "#000000",
        transition: "all 0.2s ease",
      }}
    >
      {/* Header */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 24px",
          borderBottom:
            theme === "dark" ? "1px solid #222" : "1px solid #ddd",
        }}
      >
        <h2>Kadena Nodes</h2>

        <button
          onClick={() =>
            setTheme((prev) => (prev === "light" ? "dark" : "light"))
          }
          style={{
            padding: "6px 12px",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
            background: theme === "dark" ? "#fff" : "#111",
            color: theme === "dark" ? "#000" : "#fff",
          }}
        >
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
      </header>

      {/* Mini Dashboard */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px",
          padding: "20px",
        }}
      >
        {loading ? (
          <div>Loading network stats…</div>
        ) : (
          <>
            <StatCard title="Live TPS" value={stats?.tps} />
            <StatCard title="24h Transactions" value={stats?.tx24h} />
            <StatCard title="Avg Block Time (s)" value={stats?.blockTime} />
            <StatCard title="Active Nodes" value={stats?.activeNodes} />
          </>
        )}
      </section>

      {/* Map */}
      <section style={{ height: "70vh", width: "100%" }}>
        <LeafletMap theme={theme} />
      </section>
    </main>
  );
}

/* ---------------- Components ---------------- */

function StatCard({
  title,
  value,
}: {
  title: string;
  value: number | undefined;
}) {
  return (
    <div
      style={{
        padding: "16px",
        borderRadius: "10px",
        background: "rgba(0,0,0,0.05)",
        backdropFilter: "blur(6px)",
      }}
    >
      <div style={{ fontSize: "13px", opacity: 0.7 }}>{title}</div>
      <div style={{ fontSize: "28px", fontWeight: 700 }}>
        {value ?? "--"}
      </div>
    </div>
  );
}
