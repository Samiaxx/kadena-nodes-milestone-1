// src/lib/chainwebPeers.ts

export type ChainwebPeer = {
  host: string;
  port: number;
  id?: string;
};

/**
 * Fetch live Chainweb peers from community API
 */
export async function fetchChainwebPeers(): Promise<ChainwebPeer[]> {
  const res = await fetch(
    "https://api.chainweb-community.org/chainweb/0.0/mainnet01/peer",
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch Chainweb peers");
  }

  const data = await res.json();

  // API returns { items: [...] }
  if (!data?.items || !Array.isArray(data.items)) {
    return [];
  }

  return data.items.map((peer: any) => ({
    host: peer.host,
    port: peer.port,
    id: peer.id,
  }));
}
