"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

export default function MapboxGlobe({
  nodes,
  theme,
}: {
  nodes: any[];
  theme: "dark" | "light";
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const map = new mapboxgl.Map({
      container: ref.current,
      style:
        theme === "dark"
          ? "mapbox://styles/mapbox/dark-v11"
          : "mapbox://styles/mapbox/light-v11",
      projection: "globe",
      zoom: 1.4,
    });

    map.on("load", () => {
      map.addSource("nodes", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: nodes.map((n) => ({
            type: "Feature",
            properties: n,
            geometry: {
              type: "Point",
              coordinates: [n.lng, n.lat],
            },
          })),
        },
      });

      map.addLayer({
        id: "node-dots",
        type: "circle",
        source: "nodes",
        paint: {
          "circle-radius": 6,
          "circle-color": [
            "case",
            ["==", ["get", "status"], "online"],
            "#00ff88",
            "#ff4444",
          ],
        },
      });

      map.on("click", "node-dots", (e) => {
        const p = e.features?.[0].properties;
        if (!p) return;

        new mapboxgl.Popup()
          .setLngLat(e.lngLat)
          .setHTML(`
            <strong>${p.name}</strong><br/>
            ID: ${p.id}<br/>
            Type: ${p.type}<br/>
            Status: ${p.status}<br/>
            Latency: ${p.latency} ms
          `)
          .addTo(map);
      });
    });

    return () => map.remove();
  }, [nodes, theme]);

  return <div ref={ref} style={{ height: "100%" }} />;
}
