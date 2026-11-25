import { Navigate, useParams } from 'react-router-dom';

import { CopyButton } from 'src/components/copy-button';
import { SectorsTable } from 'src/components/deals-table';
import { ShareButton } from 'src/components/share-button';
import { Layout } from 'src/layouts/common/styles';
import { useProviderSectors } from 'src/queries/useProviderSectors.ts';
import { ROUTES, providerIdPattern } from 'src/routes';

import * as SC from './styles';

export function ProviderPage() {
  const { providerId } = useParams<{
    providerId: typeof providerIdPattern;
  }>();

  if (!providerId) {
    return <Navigate to={ROUTES.INDEX} />;
  }

  const numericId = providerId.toLowerCase().startsWith('f0') ? providerId.slice(2) : providerId;
  const displayId = `f0${numericId}`;

  const { data, status, isError } = useProviderSectors({ providerId });

  return (
    <Layout as="main">
      <SC.DealInfoContainer>
        <SC.FirstRow>
          <SC.DealIdContainer>
            <SC.H2>Storage Provider</SC.H2>
            <SC.DealId>Provider ID</SC.DealId>
            <SC.DealIdRow>
              <SC.H3>{displayId}</SC.H3>
              <CopyButton copyValue={displayId} />
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
            hideColumns={['actorId']}
          />
        </SC.TableContainer>
      </SC.DealInfoContainer>
    </Layout>
  );
}
