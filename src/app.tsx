import { Navigate, useRoutes } from 'react-router-dom';

import { AboutPage } from 'src/layouts/about-page';
import { PiecePage } from 'src/layouts/client-page';
import { DashboardPage } from 'src/layouts/dashboard-page';
import { SectorPage } from 'src/layouts/deal-page';
import { Navbar } from 'src/layouts/navbar';
import { ProviderPage } from 'src/layouts/provider-page';
import { SearchPage } from 'src/layouts/search-page';
import { ROUTES } from 'src/routes';

function Routes() {
  return useRoutes([
    { path: ROUTES.INDEX, element: <DashboardPage />, index: true },
    { path: ROUTES.ABOUT, element: <AboutPage /> },
    { path: ROUTES.SECTORS_BY_PIECE, element: <PiecePage /> },
    { path: ROUTES.PROVIDER_SECTORS, element: <ProviderPage /> },
    { path: ROUTES.SECTOR, element: <SectorPage /> },
    { path: '/search', element: <SearchPage /> },

    { path: '*', element: <Navigate to="/" replace /> },
  ]);
}

export function App() {
  return (
    <>
      <Navbar />
      <Routes />
    </>
  );
}
