import { NodeData } from '@/types/node';
import { mockNodes } from '@/data/nodes.mock';
import { checkNodeHealth } from './nodeHealth';

/**
 * Switch flag
 */
const USE_LIVE_DATA = true;

/**
 * Enrich nodes with live health
 */
async function enrichWithHealth(
  nodes: NodeData[]
): Promise<NodeData[]> {
  const results = await Promise.all(
    nodes.map(async node => {
      if (!node.rpcUrl) return node;

      const status = await checkNodeHealth(node.rpcUrl);
      return { ...node, status };
    })
  );

  return results;
}

/**
 * Main data source
 */
export async function getNodes(): Promise<NodeData[]> {
  try {
    if (!USE_LIVE_DATA) return mockNodes;

    // For now: use known nodes + live health
    const liveNodes = await enrichWithHealth(mockNodes);

    return liveNodes;
  } catch {
    return mockNodes;
  }
}
