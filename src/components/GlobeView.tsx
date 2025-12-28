"use client";

import Globe from "react-globe.gl";
import { Node } from "../app/page";

export default function GlobeView({ nodes }: { nodes: Node[] }) {
  return (
    <div style={{ height: "520px" }}>
      <Globe
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
        backgroundColor="black"
        pointsData={nodes}
        pointLat="lat"
        pointLng="lng"
        pointColor={(d: any) => d.status === "online" ? "lime" : "red"}
        pointRadius={0.35}
        pointLabel={(d: any) =>
          `
          <b>${d.name}</b><br/>
          ID: ${d.id}<br/>
          Type: ${d.type}<br/>
          Status: ${d.status}<br/>
          Region: ${d.region}
        `
        }
        onPointClick={(d: any) => alert(`Node: ${d.name}`)}
      />
    </div>
  );
}
