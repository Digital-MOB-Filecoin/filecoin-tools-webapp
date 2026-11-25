import { SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { Layout } from 'src/layouts/common/styles';
import { getProviderSectorsLink, getSectorsByPieceLink } from 'src/routes';

import * as SC from './styles';

export function DashboardPage() {
  const navigate = useNavigate();

  const handleSearch = (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = ((formData.get('search') as string) ?? '').trim();

    if (!query) return;

    const isProviderId = /^(f0)?\d+$/i.test(query);

    if (isProviderId) {
      const numericId = query.toLowerCase().startsWith('f0') ? query.slice(2) : query;
      navigate(getProviderSectorsLink(numericId));
    } else {
      navigate(getSectorsByPieceLink(query));
    }
  };

  return (
    <>
      <SC.TilesBg>
        <SC.TitleContainer>
          <SC.TitleInner>
            <SC.Title>Check the status of CIDs stored on the Filecoin Network.</SC.Title>
            <SC.BelowTitle>Search by Piece CID to see which sectors and providers store it.</SC.BelowTitle>
          </SC.TitleInner>
          <SC.SearchBarContainer onSubmit={handleSearch}>
            <SC.SearchInput
              type="search"
              name="search"
              size="large"
              placeholder="Search by Piece CID or Provider ID"
              endAdornment={
                <SC.SubmitSearchButton
                  type="submit"
                  variation="primary"
                  icon={{ name: 'arrow-right', position: 'only' }}>
                  Search
                </SC.SubmitSearchButton>
              }
            />
          </SC.SearchBarContainer>
        </SC.TitleContainer>
      </SC.TilesBg>
      <Layout as="main" />
    </>
  );
}
