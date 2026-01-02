export type NodeStatus = 'online' | 'offline';

export type NodeType = 'RPC' | 'FULL' | 'MINER';

export interface NodeData {
  id: string;
  type: NodeType;
  status: NodeStatus;
  city: string;
  country: string;
  continent: string;
  lat: number;
  lng: number;

  /**
   * Optional RPC endpoint
   * Used for live health checks
   */
  rpcUrl?: string;
}
