'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';
import { NodeData } from '@/types/node';

const Globe = dynamic(() => import('react-globe.gl'), { ssr: false });

export default function GlobeView({ nodes }: { nodes: NodeData[] }) {
  const globeRef = useRef<any>(null);

  useEffect(() => {
    if (!globeRef.current) return;

    // Enable auto-rotation
    globeRef.current.controls().autoRotate = true;
    globeRef.current.controls().autoRotateSpeed = 0.35; // subtle, professional speed

    // Optional: limit zoom distance for nicer UX
    globeRef.current.controls().minDistance = 180;
    globeRef.current.controls().maxDistance = 400;
  }, []);

  return (
    <div style={{ height: '70vh', width: '100%' }}>
      <Globe
        ref={globeRef}

        /* VISUAL */
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
        backgroundColor="rgba(0,0,0,0)"

        /* DATA */
        pointsData={nodes}
        pointLat="lat"
        pointLng="lng"

        /* DOT STYLE */
        pointRadius={0.35}
        pointColor={(d: object) => {
          const n = d as NodeData;
          return n.status === 'online' ? '#6cf2c2' : '#ff6b6b';
        }}

        /* TOOLTIP */
        pointLabel={(d: object) => {
          const n = d as NodeData;
          return `
Type: ${n.type}
Location: ${n.city}, ${n.country}
Status: ${n.status}
ID: ${n.id}
`;
        }}

        /* CLICK */
        onPointClick={(d: object) => {
          const n = d as NodeData;
          alert(
            `Node Details

ID: ${n.id}
Type: ${n.type}
Location: ${n.city}, ${n.country}
Status: ${n.status}`
          );
        }}
      />
    </div>
  );
}
