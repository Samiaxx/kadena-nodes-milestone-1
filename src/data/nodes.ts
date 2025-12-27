export type Node = {
  id: number;
  name: string;
  lat: number;
  lng: number;
  region: string;
  status: "online" | "offline";
  latency: number;
};

export const nodes: Node[] = [
  { id: 1, name: "US-East", lat: 37.77, lng: -122.41, region: "North America", status: "online", latency: 45 },
  { id: 2, name: "US-West", lat: 34.05, lng: -118.24, region: "North America", status: "online", latency: 50 },
  { id: 3, name: "Europe-1", lat: 50.11, lng: 8.68, region: "Europe", status: "online", latency: 40 },
  { id: 4, name: "Europe-2", lat: 48.85, lng: 2.35, region: "Europe", status: "offline", latency: 0 },
  { id: 5, name: "Asia-1", lat: 1.35, lng: 103.82, region: "Asia", status: "online", latency: 70 },
  { id: 6, name: "Asia-2", lat: 35.68, lng: 139.69, region: "Asia", status: "online", latency: 65 },
  { id: 7, name: "Africa-1", lat: -1.29, lng: 36.82, region: "Africa", status: "online", latency: 90 },
  { id: 8, name: "SA-1", lat: -23.55, lng: -46.63, region: "South America", status: "offline", latency: 0 },
  { id: 9, name: "Oceania-1", lat: -33.86, lng: 151.21, region: "Oceania", status: "online", latency: 80 },
  { id: 10, name: "Canada-1", lat: 43.65, lng: -79.38, region: "North America", status: "online", latency: 55 },
];
