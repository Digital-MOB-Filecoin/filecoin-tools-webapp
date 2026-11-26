import { SyntheticEvent, useCallback, useMemo } from 'react';
import { useMatch, useNavigate } from 'react-router-dom';

import { Option } from 'src/components/dropdown';
import { Input } from 'src/components/input';
import { useNetworks } from 'src/contexts/network-provider';
import { ROUTES, getProviderSectorsLink, getSectorsByPieceLink } from 'src/routes';

import * as SC from './styles';

export function Navbar() {
  const { networks, selectedNetwork, setNetwork } = useNetworks();
  const isDashboardPage = useMatch(ROUTES.INDEX);
  const isPiecePage = useMatch(ROUTES.SECTORS_BY_PIECE);
  const isProviderPage = useMatch(ROUTES.PROVIDER_SECTORS);
  const isSectorPage = useMatch(ROUTES.SECTOR);

  const navigate = useNavigate();

  const networksOptions = useMemo(() => {
    return networks.map((item) => ({
      label: item.name,
      key: item.id,
    }));
  }, [networks]);

  const handleChangeNetwork = useCallback(
    (option: Option) => {
      setNetwork(option.key);

      if (isPiecePage || isProviderPage || isSectorPage) {
        navigate(ROUTES.INDEX);
      }
    },
    [networks, isPiecePage, isProviderPage, isSectorPage]
  );

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
      <SC.Wrapper as="header">
        <SC.Container className="container">
          <SC.LogoLink to={ROUTES.INDEX}>
            <SC.FilecoinLogo />
            <SC.FilecoinLogoFull />
            <span className="sr-only">Filecoin CID Checker</span>
          </SC.LogoLink>
          <SC.Nav>
            <SC.NavItem to={ROUTES.INDEX} end>
              Home
            </SC.NavItem>
            <SC.NavItem to={ROUTES.ABOUT}>About</SC.NavItem>
          </SC.Nav>
          {!isDashboardPage && (
            <SC.LeftContainer $isDashboard={Boolean(isDashboardPage)}>
              <SC.SearchForm onSubmit={handleSearch}>
                <Input
                  name="search"
                  type="search"
                  placeholder="Search by Piece CID or Provider ID"
                />
              </SC.SearchForm>
            </SC.LeftContainer>
          )}
          <SC.Dropdown
            selectedOptionKey={selectedNetwork.id}
            options={networksOptions}
            onSelected={handleChangeNetwork}
            $isDashboard={Boolean(isDashboardPage)}
          />
        </SC.Container>
      </SC.Wrapper>
    </>
  );
}
