export type NodeType = "RPC" | "FULL" | "MINER";
export type NodeStatus = "ONLINE" | "OFFLINE";

export interface KadenaNode {
  id: string;
  lat: number;
  lng: number;
  type: NodeType;
  status: NodeStatus;
  country: string;
}

export const mockNodes: KadenaNode[] = [
  {
    id: "node-1",
    lat: 37.7749,
    lng: -122.4194,
    type: "RPC",
    status: "ONLINE",
    country: "USA",
  },
  {
    id: "node-2",
    lat: 51.5074,
    lng: -0.1278,
    type: "FULL",
    status: "ONLINE",
    country: "UK",
  },
  {
    id: "node-3",
    lat: 48.8566,
    lng: 2.3522,
    type: "MINER",
    status: "OFFLINE",
    country: "France",
  },
];
