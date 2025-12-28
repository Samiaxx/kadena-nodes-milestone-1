'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { NodeType } from '../app/page';

const icon = (color: string) =>
  new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
    shadowUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [35, 55],
    iconAnchor: [17, 55],
  });

export default function LeafletMap({
  nodes,
  theme,
}: {
  nodes: NodeType[];
  theme: string;
}) {
  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        url={
          theme === 'dark'
            ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
            : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        }
      />

      {nodes.map((node) => (
        <Marker
          key={node.id}
          position={[node.lat, node.lng]}
          icon={icon(node.status === 'online' ? 'green' : 'red')}
        >
          <Popup>
            <strong>Node ID:</strong> {node.id}
            <br />
            <strong>Name:</strong> {node.name}
            <br />
            <strong>Status:</strong> {node.status}
            <br />
            <strong>Region:</strong> {node.region}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
