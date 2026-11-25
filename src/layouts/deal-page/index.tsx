import { Navigate, useParams } from 'react-router-dom';

import { Card } from 'src/components/card';
import { CopyButton } from 'src/components/copy-button';
import { Label } from 'src/components/label';
import { ShareButton } from 'src/components/share-button';
import { Layout } from 'src/layouts/common/styles';
import { useSector } from 'src/queries/useSector.ts';
import { ROUTES, getProviderSectorsLink, providerIdPattern, sectorIdPattern } from 'src/routes';
import { formatFileSize } from 'src/utils/functions/format-filesize.ts';

import * as SC from './styles';

const STATE_LABELS: Record<0 | 1 | 2, string> = {
  0: 'Precommit',
  1: 'Active',
  2: 'Faulty',
};

export function SectorPage() {
  const { providerId, sectorId } = useParams<{
    providerId: typeof providerIdPattern;
    sectorId: typeof sectorIdPattern;
  }>();

  if (!providerId || !sectorId) {
    return <Navigate to={ROUTES.INDEX} />;
  }

  const numericId = providerId.toLowerCase().startsWith('f0') ? providerId.slice(2) : providerId;
  const displayId = `f0${numericId}`;

  const { data, error, isLoading, isError, isSuccess } = useSector({ providerId, sectorId });

  return (
    <Layout as="main">
      <SC.DealInfoContainer>
        <SC.FirstRow>
          <SC.DealIdContainer>
            <SC.H2>Sector</SC.H2>
            <SC.DealId>Sector ID</SC.DealId>
            <SC.DealIdRow>
              <SC.H3>{sectorId}</SC.H3>
              <CopyButton copyValue={sectorId} />
              {isSuccess && (
                <Label status={data.state === 1 ? 'active' : 'inactive'} />
              )}
            </SC.DealIdRow>
          </SC.DealIdContainer>
          <ShareButton link={window.location.href} />
        </SC.FirstRow>

        {isError ? (
          <>{error.message}</>
        ) : (
          <SC.SecondRow>
            <Card
              title="Provider ID"
              value={displayId}
              valueAsNode={
                <SC.Link to={getProviderSectorsLink(numericId)}>{displayId}</SC.Link>
              }
              copyButton
              loading={isLoading}
            />
            <Card
              title="Sector ID"
              value={sectorId}
              copyButton
              loading={isLoading}
            />
            <Card
              title="Piece ID"
              value={data?.pieceId ?? '--'}
              copyButton={data?.pieceId != null}
              loading={isLoading}
            />
            <Card
              title="State"
              value={data != null ? STATE_LABELS[data.state] : '--'}
              loading={isLoading}
            />
            <Card
              title="Bytes Power"
              value={formatFileSize(data?.bytesPower)}
              loading={isLoading}
            />
            <Card
              title="Pledge"
              value={data?.afilPledge ? `${data.afilPledge} aFIL` : '--'}
              loading={isLoading}
            />
          </SC.SecondRow>
        )}
      </SC.DealInfoContainer>
    </Layout>
  );
}
