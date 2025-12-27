"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export default function MapboxGlobe() {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

    if (!token) {
      console.error("❌ Mapbox token missing");
      return;
    }

    mapboxgl.accessToken = token;

    if (!mapRef.current) return;

    const map = new mapboxgl.Map({
      container: mapRef.current,
      style: "mapbox://styles/mapbox/dark-v11",
      projection: "globe",
      zoom: 1.5,
      center: [0, 20],
    });

    map.on("style.load", () => {
      map.setFog({
        range: [0.8, 8],
        color: "#0b1020",
        "high-color": "#000000",
        "space-color": "#000000",
        "horizon-blend": 0.2,
      });
    });

    return () => map.remove();
  }, []);

  return (
    <div
      ref={mapRef}
      style={{
        width: "100%",
        height: "600px",
        background: "#070b12",
      }}
    />
  );
}
