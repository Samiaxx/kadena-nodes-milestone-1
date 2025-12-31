export type NodeStatus = "online" | "offline";
export type NodeType = "Validator" | "Mining" | "RPC";

export type Node = {
  id: string;
  lat: number;
  lng: number;
  region: string;
  country: string;
  type: NodeType;
  status: NodeStatus;
};

export const nodes: Node[] = [
  {
    id: "node-01",
    lat: 37.7749,
    lng: -122.4194,
    region: "North America",
    country: "USA",
    type: "Validator",
    status: "online",
  },
  {
    id: "node-02",
    lat: 40.7128,
    lng: -74.006,
    region: "North America",
    country: "USA",
    type: "RPC",
    status: "online",
  },
  {
    id: "node-03",
    lat: 51.5074,
    lng: -0.1278,
    region: "Europe",
    country: "UK",
    type: "Mining",
    status: "offline",
  },
  {
    id: "node-04",
    lat: 48.8566,
    lng: 2.3522,
    region: "Europe",
    country: "France",
    type: "Validator",
    status: "online",
  },
  {
    id: "node-05",
    lat: 35.6895,
    lng: 139.6917,
    region: "Asia",
    country: "Japan",
    type: "RPC",
    status: "online",
  },
  {
    id: "node-06",
    lat: 1.3521,
    lng: 103.8198,
    region: "Asia",
    country: "Singapore",
    type: "Validator",
    status: "offline",
  },
  {
    id: "node-07",
    lat: -33.8688,
    lng: 151.2093,
    region: "Oceania",
    country: "Australia",
    type: "Mining",
    status: "online",
  },
  {
    id: "node-08",
    lat: -26.2041,
    lng: 28.0473,
    region: "Africa",
    country: "South Africa",
    type: "RPC",
    status: "offline",
  },
  {
    id: "node-09",
    lat: -23.5505,
    lng: -46.6333,
    region: "South America",
    country: "Brazil",
    type: "Validator",
    status: "online",
  },
  {
    id: "node-10",
    lat: 52.52,
    lng: 13.405,
    region: "Europe",
    country: "Germany",
    type: "RPC",
    status: "online",
  },
];
