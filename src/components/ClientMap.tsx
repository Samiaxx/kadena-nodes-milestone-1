'use client';

import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { NodeType } from '@/data/nodes';

export default function ClientMap({
  nodes,
  theme,
}: {
  nodes: NodeType[];
  theme: 'light' | 'dark';
}) {
  const dark = theme === 'dark';

  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      style={{ height: '100%', width: '100%' }}
      preferCanvas
    >
      <TileLayer
        url={
          dark
            ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
            : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        }
      />

      {nodes.map((node) => (
        <CircleMarker
          key={node.id}
          center={[node.lat, node.lng]}
          radius={8}
          pathOptions={{
            color: node.status === 'online' ? '#34f5a2' : '#ff4d4d',
            fillColor: node.status === 'online' ? '#34f5a2' : '#ff4d4d',
            fillOpacity: 0.9,
            weight: 2,
          }}
          className={node.status === 'online' ? 'pulse-node' : ''}
        >
          <Tooltip direction="top" offset={[0, -6]} opacity={1}>
            <div>
              <strong>{node.name}</strong>
              <br />
              Status: {node.status}
            </div>
          </Tooltip>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
