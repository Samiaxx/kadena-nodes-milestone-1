'use client';

import { NodeData } from '@/types/node';

export default function Filters({
  nodes,
  onFilter,
}: {
  nodes: NodeData[];
  onFilter: (n: NodeData[]) => void;
}) {
  function apply(type: string, region: string) {
    let filtered = nodes;

    if (type) {
      filtered = filtered.filter(n => n.type === type);
    }

    if (region) {
      filtered = filtered.filter(n => n.continent === region);
    }

    onFilter(filtered);
  }

  return (
    <>
      <select onChange={e => apply(e.target.value, '')}>
        <option value="">All Types</option>
        <option value="RPC">RPC</option>
        <option value="FULL">Full</option>
        <option value="MINER">Miner</option>
      </select>

      <select onChange={e => apply('', e.target.value)}>
        <option value="">All Regions</option>
        <option value="Europe">Europe</option>
        <option value="North America">North America</option>
        <option value="Asia">Asia</option>
      </select>
    </>
  );
}
