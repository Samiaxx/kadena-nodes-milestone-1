export type NodeItem = {
  id: number;
  name: string;
  city: string;
  country: string;
  region: string;
  lat: number;
  lng: number;
  status: "Online" | "Offline";
  latency: number;
};

export const nodes: NodeItem[] = [
  { id: 1, name: "US East", city: "New York", country: "USA", region: "North America", lat: 40.7128, lng: -74.006, status: "Online", latency: 42 },
  { id: 2, name: "US West", city: "San Francisco", country: "USA", region: "North America", lat: 37.7749, lng: -122.4194, status: "Online", latency: 48 },
  { id: 3, name: "Europe Central", city: "Frankfurt", country: "Germany", region: "Europe", lat: 50.1109, lng: 8.6821, status: "Online", latency: 55 },
  { id: 4, name: "Europe West", city: "Paris", country: "France", region: "Europe", lat: 48.8566, lng: 2.3522, status: "Offline", latency: 0 },
  { id: 5, name: "Asia East", city: "Tokyo", country: "Japan", region: "Asia", lat: 35.6762, lng: 139.6503, status: "Online", latency: 70 },
  { id: 6, name: "Asia South", city: "Singapore", country: "Singapore", region: "Asia", lat: 1.3521, lng: 103.8198, status: "Online", latency: 65 },
  { id: 7, name: "Africa", city: "Lagos", country: "Nigeria", region: "Africa", lat: 6.5244, lng: 3.3792, status: "Offline", latency: 0 },
  { id: 8, name: "South America", city: "São Paulo", country: "Brazil", region: "South America", lat: -23.5505, lng: -46.6333, status: "Online", latency: 82 },
  { id: 9, name: "Oceania", city: "Sydney", country: "Australia", region: "Oceania", lat: -33.8688, lng: 151.2093, status: "Online", latency: 90 },
  { id: 10, name: "Canada", city: "Toronto", country: "Canada", region: "North America", lat: 43.6532, lng: -79.3832, status: "Online", latency: 50 },
];
