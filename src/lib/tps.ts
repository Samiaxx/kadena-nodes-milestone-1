let lastTxCount = 0;
let lastTime = Date.now();

/**
 * Derive TPS from tx delta over time
 */
export function calculateTPS(currentTxCount: number): number {
  const now = Date.now();
  const timeDelta = (now - lastTime) / 1000;

  if (timeDelta <= 0) return 0;

  const tps = (currentTxCount - lastTxCount) / timeDelta;

  lastTxCount = currentTxCount;
  lastTime = now;

  return Math.max(0, Number(tps.toFixed(2)));
}
