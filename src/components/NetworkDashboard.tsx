"use client";

type DashboardProps = {
  tps: number;
  tx24h: number;
  blockTime: number;
  activeNodes: number;
};

export default function NetworkDashboard({
  tps,
  tx24h,
  blockTime,
  activeNodes,
}: DashboardProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "16px",
        padding: "20px",
      }}
    >
      <StatCard label="Live TPS" value={tps} highlight />
      <StatCard label="24h Transactions" value={tx24h.toLocaleString()} />
      <StatCard label="Avg Block Time (s)" value={blockTime} />
      <StatCard label="Active Nodes" value={activeNodes} />
    </div>
  );
}

function StatCard({
  label,
  value,
  highlight,
}: {
  label: string;
  value: number | string;
  highlight?: boolean;
}) {
  return (
    <div
      style={{
        background: "rgba(0,0,0,0.6)",
        borderRadius: "12px",
        padding: "20px",
        color: "#fff",
        border: highlight ? "1px solid #ff2d8b" : "1px solid #222",
      }}
    >
      <div style={{ fontSize: "12px", opacity: 0.7 }}>{label}</div>
      <div
        style={{
          fontSize: highlight ? "36px" : "24px",
          fontWeight: 700,
          marginTop: "6px",
        }}
      >
        {value}
      </div>
    </div>
  );
}
