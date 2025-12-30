"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icons (Leaflet bug)
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function LeafletMap({
  theme,
}: {
  theme: "light" | "dark";
}) {
  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      scrollWheelZoom
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        attribution="© OpenStreetMap"
        url={
          theme === "dark"
            ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        }
      />

      {/* SAMPLE NODES (STATIC FOR NOW) */}
      <Marker position={[37.77, -122.41]}>
        <Popup>USA Node</Popup>
      </Marker>

      <Marker position={[51.5, -0.09]}>
        <Popup>UK Node</Popup>
      </Marker>

      <Marker position={[52.52, 13.4]}>
        <Popup>Germany Node</Popup>
      </Marker>

      <Marker position={[-33.86, 151.2]}>
        <Popup>Australia Node</Popup>
      </Marker>
    </MapContainer>
  );
}
