export type KadenaNode = {
  id: string;
  lat: number;
  lng: number;
  type: "VALIDATOR" | "FULL";
  status: "ONLINE" | "OFFLINE";
};

const KADENA_RPC = "https://api.chainweb.com/chainweb/0.0/mainnet01/cut";

export async function fetchKadenaNodes(): Promise<KadenaNode[]> {
  try {
    const res = await fetch(KADENA_RPC);
    const data = await res.json();

    // Demo-safe geo mapping (replace later with real geo IP)
    const sampleCoords = [
      { lat: 37.77, lng: -122.41 }, // USA
      { lat: 51.50, lng: -0.12 },   // UK
      { lat: 48.85, lng: 2.35 },    // France
      { lat: 52.52, lng: 13.40 },   // Germany
      { lat: 35.68, lng: 139.69 },  // Japan
      { lat: -33.86, lng: 151.20 }, // Australia
      { lat: 1.35, lng: 103.81 },   // Singapore
      { lat: 40.71, lng: -74.00 },  // NYC
      { lat: 55.75, lng: 37.61 },   // Moscow
      { lat: 28.61, lng: 77.20 },   // India
    ];

    return sampleCoords.map((c, i) => ({
      id: `node-${i}`,
      lat: c.lat,
      lng: c.lng,
      type: i % 2 === 0 ? "VALIDATOR" : "FULL",
      status: "ONLINE",
    }));
  } catch {
    return [];
  }
}
