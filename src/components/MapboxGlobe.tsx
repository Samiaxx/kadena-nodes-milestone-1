"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { NodeItem } from "@/data/nodes";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

export default function MapboxGlobe({ nodes }: { nodes: NodeItem[] }) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = new mapboxgl.Map({
      container: mapRef.current,
      style: "mapbox://styles/mapbox/dark-v11",
      projection: "globe",
      zoom: 1.4,
      center: [0, 20],
    });

    map.on("load", () => {
      nodes.forEach((node) => {
        const el = document.createElement("div");
        el.className = `globe-dot ${node.status === "Online" ? "pulse" : ""}`;

        new mapboxgl.Marker(el)
          .setLngLat([node.lng, node.lat])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }).setHTML(`
              <strong>${node.name}</strong><br/>
              ${node.city}, ${node.country}<br/>
              ${node.status} • ${node.latency} ms
            `)
          )
          .addTo(map);
      });
    });

    return () => map.remove();
  }, [nodes]);

  return <div ref={mapRef} style={{ height: "520px", width: "100%" }} />;
}
