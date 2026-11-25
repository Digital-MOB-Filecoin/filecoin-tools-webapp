import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, StrictMode, useLayoutEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, useLocation } from 'react-router-dom';

import { App } from 'src/app';
import NetworkProvider from 'src/contexts/network-provider';
import GlobalStyle from 'src/styles/global';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const Wrapper = ({ children }: { children: ReactNode }) => {
  const location = useLocation();

  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
};

const container = document.getElementById('app');
if (!container) throw new Error('No container found');
const root = createRoot(container);

root.render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <NetworkProvider>
          <Wrapper>
            <GlobalStyle />
            <App />
          </Wrapper>
        </NetworkProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
