'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

const LeafletMap = dynamic(() => import('../components/LeafletMap'), {
  ssr: false,
});
const GlobeView = dynamic(() => import('../components/GlobeView'), {
  ssr: false,
});

export type NodeType = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  status: 'online' | 'offline';
};

const ALL_NODES: NodeType[] = [
  { id: '1', name: 'London', lat: 51.5, lng: -0.09, status: 'online' },
  { id: '2', name: 'New York', lat: 40.7, lng: -74, status: 'online' },
  { id: '3', name: 'Tokyo', lat: 35.6, lng: 139.6, status: 'offline' },
  { id: '4', name: 'Berlin', lat: 52.5, lng: 13.4, status: 'online' },
  { id: '5', name: 'Paris', lat: 48.8, lng: 2.3, status: 'offline' },
  { id: '6', name: 'Lagos', lat: 6.5, lng: 3.3, status: 'online' },
  { id: '7', name: 'Cape Town', lat: -33.9, lng: 18.4, status: 'offline' },
  { id: '8', name: 'Sydney', lat: -33.8, lng: 151.2, status: 'online' },
  { id: '9', name: 'São Paulo', lat: -23.5, lng: -46.6, status: 'online' },
  { id: '10', name: 'Toronto', lat: 43.7, lng: -79.4, status: 'offline' },
];

export default function Page() {
  const [view, setView] = useState<'map' | 'globe'>('map');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [statusFilter, setStatusFilter] =
    useState<'all' | 'online' | 'offline'>('all');

  const filteredNodes =
    statusFilter === 'all'
      ? ALL_NODES
      : ALL_NODES.filter((n) => n.status === statusFilter);

  return (
    <div data-theme={theme} style={{ display: 'flex' }}>
      <div className="sidebar">
        <h2>Kadena Nexus</h2>

        <div
          className="button"
          onClick={() =>
            setTheme(theme === 'dark' ? 'light' : 'dark')
          }
        >
          {theme === 'dark' ? '🌞 Light Mode' : '🌙 Dark Mode'}
        </div>

        <div className="button" onClick={() => setView('map')}>
          Map
        </div>
        <div className="button" onClick={() => setView('globe')}>
          Globe
        </div>

        <select
          className="select"
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value as any)
          }
        >
          <option value="all">All Status</option>
          <option value="online">Online</option>
          <option value="offline">Offline</option>
        </select>

        <div className="stat">Total Nodes: {filteredNodes.length}</div>
      </div>

      <div style={{ flex: 1 }}>
        {view === 'map' ? (
          <LeafletMap nodes={filteredNodes} theme={theme} />
        ) : (
          <GlobeView nodes={filteredNodes} theme={theme} />
        )}
      </div>
    </div>
  );
}
