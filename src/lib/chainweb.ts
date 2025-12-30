// src/lib/chainweb.ts

export type NetworkStats = {
  tps: number;
  tx24h: number;
  blockTime: number;
  activeNodes: number;
};

const BASE_URL = "https://api.chainweb-community.org";

export async function getNetworkStats(): Promise<NetworkStats> {
  try {
    /**
     * These endpoints are lightweight and safe.
     * We can improve accuracy later.
     */

    // 1. Latest block (for block time)
    const blockRes = await fetch(
      `${BASE_URL}/chainweb/0.0/mainnet01/cut`,
      { cache: "no-store" }
    );
    const blockData = await blockRes.json();

    const chains = Object.values(blockData.hashes || {});
    const activeNodes = chains.length;

    // Approx block time (Kadena ~30s target)
    const blockTime = 30;

    // 2. Recent tx count (approximation)
    const txRes = await fetch(
      `${BASE_URL}/chainweb/0.0/mainnet01/transaction/recent`,
      { cache: "no-store" }
    );

    let tx24h = 0;
    let tps = 0;

    if (txRes.ok) {
      const txData = await txRes.json();
      tx24h = Array.isArray(txData) ? txData.length : 0;
      tps = Number((tx24h / 86400).toFixed(2));
    }

    return {
      tps,
      tx24h,
      blockTime,
      activeNodes,
    };
  } catch (error) {
    console.error("Chainweb stats error:", error);

    // ❗ NEVER break the UI
    return {
      tps: 0,
      tx24h: 0,
      blockTime: 0,
      activeNodes: 0,
    };
  }
}
