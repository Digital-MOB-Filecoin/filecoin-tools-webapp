import { Navigate, useParams } from 'react-router-dom';

import { CopyButton } from 'src/components/copy-button';
import { SectorsTable } from 'src/components/deals-table';
import { ShareButton } from 'src/components/share-button';
import { Layout } from 'src/layouts/common/styles';
import { useSectorsByPiece } from 'src/queries/useSectorsByPiece.ts';
import { ROUTES, pieceCidPattern } from 'src/routes';

import * as SC from './styles';

export function PiecePage() {
  const { pieceCid } = useParams<{
    pieceCid: typeof pieceCidPattern;
  }>();

  if (!pieceCid) {
    return <Navigate to={ROUTES.INDEX} />;
  }

  const decodedCid = decodeURIComponent(pieceCid);
  const { data, status, isError } = useSectorsByPiece({ pieceCid: decodedCid });

  return (
    <Layout as="main">
      <SC.DealInfoContainer>
        <SC.FirstRow>
          <SC.DealIdContainer>
            <SC.H2>Piece CID</SC.H2>
            <SC.DealId>Sectors storing this piece</SC.DealId>
            <SC.DealIdRow>
              <SC.H3 style={{ wordBreak: 'break-all' }}>{decodedCid}</SC.H3>
              <CopyButton copyValue={decodedCid} />
            </SC.DealIdRow>
          </SC.DealIdContainer>
          <ShareButton link={window.location.href} />
        </SC.FirstRow>

        <SC.TableContainer>
          <SectorsTable
            title="Sectors"
            data={data}
            status={status}
            error={isError}
          />
        </SC.TableContainer>
      </SC.DealInfoContainer>
    </Layout>
  );
}
