'use client';

import { useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';

export type NodeType = {
  id: number;
  name: string;
  lat: number;
  lng: number;
  status: 'online' | 'offline';
  region?: string;
};

type Props = {
  nodes: NodeType[];
  theme: 'light' | 'dark';
};

export default function GlobeView({ nodes, theme }: Props) {
  const globeRef = useRef<any>(null);

  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 0.4;
    }
  }, []);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Globe
        ref={globeRef}
        backgroundColor={theme === 'dark' ? '#050505' : '#e5e7eb'}
        globeImageUrl={
          theme === 'dark'
            ? '//unpkg.com/three-globe/example/img/earth-night.jpg'
            : '//unpkg.com/three-globe/example/img/earth-blue-marble.jpg'
        }
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"

        pointsData={nodes}
        pointLat="lat"
        pointLng="lng"
        pointRadius={0.35}
        pointAltitude={0.02}
        pointColor={(node: NodeType) =>
          node.status === 'online' ? '#22c55e' : '#ef4444'
        }

        /* ===============================
           EXTRA-LARGE TOUCH TOOLTIP
           =============================== */
        pointLabel={(node: NodeType) => `
          <div style="
            background: rgba(0,0,0,0.88);
            padding: 28px 30px;
            border-radius: 18px;
            color: #ffffff;
            font-size: 16px;
            line-height: 2.1;
            box-shadow: 0 16px 40px rgba(0,0,0,0.7);
            min-width: 260px;
            min-height: 200px;
            pointer-events: auto;
          ">

            <div style="
              font-size: 18px;
              font-weight: 800;
              margin-bottom: 16px;
            ">
              🖥️ ${node.name} Node
            </div>

            <div>
              🆔 <strong>ID:</strong> #${node.id}
            </div>

            <div>
              ${
                node.status === 'online'
                  ? '🟢 <strong>Status:</strong> <span style="color:#22c55e;font-weight:800;">Online</span>'
                  : '🔴 <strong>Status:</strong> <span style="color:#ef4444;font-weight:800;">Offline</span>'
              }
            </div>

            ${
              node.region
                ? `<div>🌍 <strong>Region:</strong> ${node.region}</div>`
                : ''
            }

            <!-- BIG TOUCH ARROW -->
            <div style="
              margin-top: 22px;
              text-align: center;
              font-size: 26px;
              opacity: 0.9;
            ">
              ▼
            </div>
          </div>
        `}
      />
    </div>
  );
}
