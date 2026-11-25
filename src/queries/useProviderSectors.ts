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

export function useProviderSectors({ providerId }: { providerId?: string }) {
  const { selectedNetwork } = useNetworks();

  return useQuery<TSector[]>({
    enabled: !!providerId,
    queryKey: ['useProviderSectors', providerId, selectedNetwork.id],
    queryFn: async () => {
      assert.ok(providerId, '"providerId" is required.');

      const numericId = providerId.toLowerCase().startsWith('f0')
        ? providerId.slice(2)
        : providerId;

      const path = `providers/${numericId}/sectors`;
      const url = new URL(path, selectedNetwork.apiUrl);

      const response = await fetch(url);
      assert.ok(response.ok, `Failed to fetch '${path}'.`);

      const result = (await response.json()) as TApiSector[];

      return result.map(mapSector);
    },
  });
}
