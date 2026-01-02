const CHAINWEB_BASE =
  'https://api.chainweb.com/chainweb/0.0/mainnet01';

/**
 * Fetch latest cut (network state)
 */
export async function fetchCut() {
  const res = await fetch(`${CHAINWEB_BASE}/cut`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch cut');
  return res.json();
}

/**
 * Fetch block header for a given chain
 */
export async function fetchBlockHeader(
  chainId: string,
  height: number,
  hash: string
) {
  const url = `${CHAINWEB_BASE}/chain/${chainId}/header/${hash}`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch block');
  return res.json();
}
