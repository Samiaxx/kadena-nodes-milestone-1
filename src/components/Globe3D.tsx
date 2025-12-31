"use client";

import { useEffect, useRef } from "react";
import Globe from "globe.gl";

type Node = {
  lat: number;
  lng: number;
};

export default function Globe3D({
  nodes,
  mode,
}: {
  nodes: Node[];
  mode: "2d" | "3d";
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const globe = Globe()(ref.current)
      .globeImageUrl("//unpkg.com/three-globe/example/img/earth-blue-marble.jpg")
      .backgroundColor("#000")
      .pointsData(nodes)
      .pointLat("lat")
      .pointLng("lng")
      .pointColor(() => "#00ff88")
      .pointRadius(0.15)
      .pointAltitude(mode === "3d" ? 0.25 : 0); // 🔑 difference

    if (mode === "3d") {
      globe.controls().autoRotate = true;
      globe.controls().autoRotateSpeed = 0.6;
    } else {
      globe.controls().autoRotate = false;
      globe.pointOfView({ lat: 0, lng: 0, altitude: 2.5 });
    }

    return () => globe._destructor();
  }, [nodes, mode]);

  return <div ref={ref} style={{ height: "75vh", width: "100%" }} />;
}
