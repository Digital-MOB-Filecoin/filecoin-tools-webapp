import { Navigate } from 'react-router-dom';

import { ROUTES } from 'src/routes';

export function SearchPage() {
  return <Navigate to={ROUTES.INDEX} replace />;
}
