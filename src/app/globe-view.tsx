"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

type NodePoint = {
  lat: number;
  lng: number;
  size: number;
  color: string;
  label: string;
};

export default function GlobeView({
  nodes,
  theme,
}: {
  nodes: NodePoint[];
  theme: "light" | "dark";
}) {
  const [globeReady, setGlobeReady] = useState(false);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Globe
        backgroundColor={theme === "dark" ? "#000000" : "#ffffff"}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        pointsData={nodes}
        pointLat="lat"
        pointLng="lng"
        pointColor="color"
        pointRadius="size"
        pointLabel="label"
        onGlobeReady={() => setGlobeReady(true)}
      />
    </div>
  );
}
