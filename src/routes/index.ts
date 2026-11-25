export const pieceCidPattern = ':pieceCid';
export const providerIdPattern = ':providerId';
export const sectorIdPattern = ':sectorId';

export const ROUTES = {
  INDEX: '/',
  ABOUT: '/about',
  SECTORS_BY_PIECE: `/sectors/by-piece/${pieceCidPattern}`,
  PROVIDER_SECTORS: `/providers/${providerIdPattern}/sectors`,
  SECTOR: `/providers/${providerIdPattern}/sectors/${sectorIdPattern}`,
};

export const getSectorsByPieceLink = (pieceCid: string) =>
  ROUTES.SECTORS_BY_PIECE.replace(pieceCidPattern, encodeURIComponent(pieceCid));

export const getProviderSectorsLink = (providerId: string | number) =>
  ROUTES.PROVIDER_SECTORS.replace(providerIdPattern, String(providerId));

export const getSectorLink = (providerId: string | number, sectorId: string | number) =>
  ROUTES.SECTOR.replace(providerIdPattern, String(providerId)).replace(
    sectorIdPattern,
    String(sectorId)
  );
