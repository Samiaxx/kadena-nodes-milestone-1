'use client';

import { useEffect, useState } from 'react';
import { fetchCut } from '@/lib/kadena';
import { calculateTPS } from '@/lib/tps';

export default function NetworkDashboard() {
  const [stats, setStats] = useState({
    tps: 0,
    tx24h: 0,
    blockTime: 1.5,
    activeNodes: 0,
  });

  async function refresh() {
    try {
      const cut = await fetchCut();
      const hashes = cut.hashes || {};
      const txCount = Object.keys(hashes).length;

      setStats({
        tps: calculateTPS(txCount),
        tx24h: txCount * 1440, // extrapolated
        blockTime: 1.5,
        activeNodes: txCount,
      });
    } catch {
      // keep last known values
    }
  }

  useEffect(() => {
    refresh();
    const id = setInterval(refresh, 15000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="panel" style={{ display: 'flex', gap: 32 }}>
      <div>
        <div className="stat">{stats.tps}</div>
        <div className="label">Current TPS</div>
      </div>
      <div>
        <div className="stat">
          {stats.tx24h.toLocaleString()}
        </div>
        <div className="label">24h Transactions</div>
      </div>
      <div>
        <div className="stat">{stats.blockTime}s</div>
        <div className="label">Avg Block Time</div>
      </div>
      <div>
        <div className="stat">{stats.activeNodes}</div>
        <div className="label">Active Nodes</div>
      </div>
    </div>
  );
}
