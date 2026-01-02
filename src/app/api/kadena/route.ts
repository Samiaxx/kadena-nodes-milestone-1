import { NextResponse } from "next/server";

const SEED_NODES = [
  "https://api.chainweb.com/chainweb/0.0/mainnet01/chain/0/pact",
  "https://api2.chainweb.com/chainweb/0.0/mainnet01/chain/0/pact",
  "https://kadena-api.mainnet.chainweb.com/chainweb/0.0/mainnet01/chain/0/pact"
];

async function checkNode(url: string) {
  try {
    const controller = new AbortController();
    setTimeout(() => controller.abort(), 4000);

    const res = await fetch(
      `${url}/local`,
      {
        method: "POST",
        body: JSON.stringify({
          pactCode: "(+ 1 1)",
          meta: {},
        }),
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
      }
    );

    const ip = new URL(url).hostname;

    const geo = await fetch(`https://ipapi.co/${ip}/json/`).then(r => r.json());

    return {
      id: ip,
      rpc: url,
      status: res.ok ? "online" : "offline",
      lat: geo.latitude ?? 0,
      lng: geo.longitude ?? 0,
      location: `${geo.city || "Unknown"}, ${geo.country_name || "Unknown"}`,
      type: "RPC",
    };
  } catch {
    return null;
  }
}

export async function GET() {
  const checks = await Promise.all(SEED_NODES.map(checkNode));
  const nodes = checks.filter(Boolean);

  return NextResponse.json({
    updated: Date.now(),
    nodes,
    activeNodes: nodes.length,
  });
}
