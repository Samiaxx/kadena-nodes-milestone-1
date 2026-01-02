'use client';

import dynamic from 'next/dynamic';
import { NodeData } from '@/types/node';

const Map = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(m => m.TileLayer), { ssr: false });
const CircleMarker = dynamic(() => import('react-leaflet').then(m => m.CircleMarker), { ssr: false });
const Tooltip = dynamic(() => import('react-leaflet').then(m => m.Tooltip), { ssr: false });

export default function LeafletMap({ nodes }: { nodes: NodeData[] }) {
  return (
    <Map center={[20, 0]} zoom={2} style={{ height: '70vh' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {nodes.map(n => (
        <CircleMarker
          key={n.id}
          center={[n.lat, n.lng]}
          radius={6}
          pathOptions={{ color: n.status === 'online' ? '#6cf2c2' : '#ff6b6b' }}
        >
          <Tooltip>
            <strong>{n.type}</strong><br />
            {n.city}, {n.country}<br />
            Status: {n.status}<br />
            ID: {n.id}
          </Tooltip>
        </CircleMarker>
      ))}
    </Map>
  );
}
