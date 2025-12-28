"use client";

type NodeStatus = "online" | "offline";

export interface NodeData {
  id: number;
  region: string;
  status: NodeStatus;
}

interface StatsCardsProps {
  nodes: NodeData[];
}

export default function StatsCards({ nodes }: StatsCardsProps) {
  const total = nodes.length;
  const online = nodes.filter(n => n.status === "online").length;
  const offline = nodes.filter(n => n.status === "offline").length;
  const regions = new Set(nodes.map(n => n.region)).size;

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <span className="stat-label">Total Nodes</span>
        <span className="stat-value">{total}</span>
      </div>

      <div className="stat-card green">
        <span className="stat-label">Online</span>
        <span className="stat-value">{online}</span>
      </div>

      <div className="stat-card red">
        <span className="stat-label">Offline</span>
        <span className="stat-value">{offline}</span>
      </div>

      <div className="stat-card blue">
        <span className="stat-label">Regions</span>
        <span className="stat-value">{regions}</span>
      </div>
    </div>
  );
}
