import { useQuery } from '@tanstack/react-query';

import * as assert from 'src/utils/assert';

import { useNetworks } from 'src/contexts/network-provider';

type TApiSector = {
  actor_id: number;
  sector_id: number;
  piece_id: number;
  state: 0 | 1 | 2;
  bytes_power: string;
  afil_pledge: string;
};

function mapSector(item: TApiSector): TSector {
  return {
    actorId: item.actor_id,
    sectorId: item.sector_id,
    pieceId: item.piece_id,
    state: item.state,
    bytesPower: item.bytes_power,
    afilPledge: item.afil_pledge,
  };
}

export function useSectorsByPiece({ pieceCid }: { pieceCid?: string }) {
  const { selectedNetwork } = useNetworks();

  return useQuery<TSector[]>({
    enabled: !!pieceCid,
    queryKey: ['useSectorsByPiece', pieceCid, selectedNetwork.id],
    queryFn: async () => {
      assert.ok(pieceCid, '"pieceCid" is required.');

      const path = `sectors/by-piece/${encodeURIComponent(pieceCid)}`;
      const url = new URL(path, selectedNetwork.apiUrl);

      const response = await fetch(url);
      assert.ok(response.ok, `Failed to fetch '${path}'.`);

      const result = (await response.json()) as TApiSector[];

      return result.map(mapSector);
    },
  });
}
