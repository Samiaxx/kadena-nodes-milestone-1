"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

export default function MapboxGlobe() {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Prevent SSR / hydration issues
    if (typeof window === "undefined") return;

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
      zoom: 1.6,
      center: [0, 20],
    });

    map.on("style.load", () => {
      map.setFog({
        color: "rgb(11, 15, 25)",
        "high-color": "rgb(36, 92, 223)",
        "horizon-blend": 0.15,
        "space-color": "rgb(0, 0, 0)",
        "star-intensity": 0.35,
      });
    });

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div
      ref={mapRef}
      style={{
        width: "100%",
        height: "100%",
        background: "#070b12",
      }}
    />
  );
}
