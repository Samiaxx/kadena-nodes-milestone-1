'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { NodeData } from '@/types/node';

/* SSR-safe dynamic imports */
const MapContainer = dynamic(
  () => import('react-leaflet').then(m => m.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then(m => m.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then(m => m.Marker),
  { ssr: false }
);
const Tooltip = dynamic(
  () => import('react-leaflet').then(m => m.Tooltip),
  { ssr: false }
);

export default function ClientMap({ nodes }: { nodes: NodeData[] }) {
  const [icons, setIcons] = useState<{
    online?: any;
    offline?: any;
  }>({});

  /* Load Leaflet ONLY in the browser */
  useEffect(() => {
    let isMounted = true;

    import('leaflet').then(L => {
      if (!isMounted) return;

      setIcons({
        online: L.divIcon({
          className: '',
          html: `<div class="node-dot"></div>`,
          iconSize: [10, 10],
          iconAnchor: [5, 5],
        }),
        offline: L.divIcon({
          className: '',
          html: `<div class="node-dot offline"></div>`,
          iconSize: [10, 10],
          iconAnchor: [5, 5],
        }),
      });
    });

    return () => {
      isMounted = false;
    };
  }, []);

  /* Avoid rendering markers until icons exist */
  if (!icons.online || !icons.offline) {
    return (
      <div
        style={{
          height: '70vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#9aa4bf',
        }}
      >
        Loading map…
      </div>
    );
  }

  return (
    <div style={{ height: '70vh', width: '100%' }}>
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />

        {nodes.map(node => (
          <Marker
            key={node.id}
            position={[node.lat, node.lng]}
            icon={node.status === 'online' ? icons.online : icons.offline}
            eventHandlers={{
              click: () => {
                alert(
                  `Node Details

ID: ${node.id}
Type: ${node.type}
Location: ${node.city}, ${node.country}
Status: ${node.status}`
                );
              },
            }}
          >
            <Tooltip>
              <strong>{node.type}</strong><br />
              {node.city}, {node.country}<br />
              Status: {node.status}<br />
              ID: {node.id}
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
