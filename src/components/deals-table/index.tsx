import { ReactNode } from 'react';

import { CopyButton } from 'src/components/copy-button';
import { Label } from 'src/components/label';
import { Table } from 'src/components/table';
import { getProviderSectorsLink, getSectorLink } from 'src/routes';
import { formatFileSize } from 'src/utils/functions/format-filesize.ts';

import * as SC from './styles.ts';

type ColumnKey = 'actorId' | 'sectorId' | 'pieceId' | 'state' | 'bytesPower' | 'afilPledge';


interface Props {
  data?: TSector[];
  status: 'error' | 'success' | 'pending';
  error: boolean;
  title: string;
  filters?: ReactNode;
  hideColumns?: ColumnKey[];
}

export function SectorsTable({
  data,
  status,
  error,
  title,
  filters,
  hideColumns = [],
}: Props) {
  const rows = data
    ? [
        {
          page: 1,
          data: data.map((item) => ({
            id: `${item.actorId}-${item.sectorId}`,
            actorId: (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <SC.Link
                  to={getProviderSectorsLink(item.actorId)}
                  className="text-overflow">
                  f0{item.actorId}
                </SC.Link>
                <CopyButton copyValue={`f0${item.actorId}`} />
              </div>
            ),
            sectorId: (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <SC.Link
                  to={getSectorLink(item.actorId, item.sectorId)}
                  className="text-overflow">
                  {item.sectorId}
                </SC.Link>
                <CopyButton copyValue={item.sectorId} />
              </div>
            ),
            pieceId: item.pieceId,
            state: <Label status={item.state === 1 ? 'active' : 'inactive'} />,
            bytesPower: formatFileSize(item.bytesPower),
            afilPledge: item.afilPledge ? `${item.afilPledge} aFIL` : '--',
          })),
        },
      ]
    : undefined;

  return (
    <Table
      status={status}
      error={error}
      title={title}
      columns={[
        { id: 'actorId', title: 'Provider ID' },
        { id: 'sectorId', title: 'Sector ID' },
        { id: 'pieceId', title: 'Piece ID' },
        { id: 'state', title: 'State' },
        { id: 'bytesPower', title: 'Bytes Power' },
        { id: 'afilPledge', title: 'Pledge (aFIL)' },
      ].filter((col) => !hideColumns.includes(col.id as ColumnKey))}
      rows={rows}
      filters={filters}
    />
  );
}
