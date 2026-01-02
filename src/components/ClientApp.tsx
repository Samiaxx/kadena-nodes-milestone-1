'use client';

import { useEffect, useState } from 'react';
import NetworkDashboard from './NetworkDashboard';
import ClientMap from './ClientMap';
import GlobeView from './GlobeView';
import ViewToggle from './ViewToggle';
import Filters from './Filters';
import ThemeToggle from './ThemeToggle';
import { getNodes } from '@/lib/nodesSource';
import { NodeData } from '@/types/node';

export default function ClientApp() {
  const [nodes, setNodes] = useState<NodeData[]>([]);
  const [filtered, setFiltered] = useState<NodeData[]>([]);
  const [view, setView] = useState<'map' | 'globe'>('map');

  async function refresh() {
    const data = await getNodes();
    setNodes(data);
    setFiltered(data);
  }

  useEffect(() => {
    refresh();
    const i = setInterval(refresh, 15000);
    return () => clearInterval(i);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <ThemeToggle />
      <NetworkDashboard />

      <div style={{ margin: '16px 0', display: 'flex', gap: 12 }}>
        <ViewToggle view={view} setView={setView} />
        <Filters nodes={nodes} onFilter={setFiltered} />
      </div>

      {view === 'map'
        ? <ClientMap nodes={filtered} />
        : <GlobeView nodes={filtered} />}
    </div>
  );
}
