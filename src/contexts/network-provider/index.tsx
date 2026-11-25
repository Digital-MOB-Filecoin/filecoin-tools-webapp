import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { addSeconds, fromUnixTime, getUnixTime } from 'date-fns';

export type TNetworkId = 'mainnet' | 'calibration';

export type TNetwork = {
  id: TNetworkId;
  name: string;
  apiUrl: string;
  epochStartDate: Date;
};

interface TContext {
  selectedNetwork: TNetwork;
  networks: TNetwork[];
  setNetwork: (networkId: TNetworkId | string) => void;
  heightToDate: (height: string | number) => Date | '--';
  dateToHeight: (date: Date | string | number) => number | null;
}

const networks: TContext['networks'] = [
  {
    id: 'mainnet',
    name: 'Mainnet',
    apiUrl: 'http://localhost:8080/',
    epochStartDate: fromUnixTime(1598306400),
  },
  {
    id: 'calibration',
    name: 'Calibration',
    apiUrl: 'http://localhost:8080/',
    epochStartDate: fromUnixTime(1667326380),
  },
];

export const Context = createContext<TContext | undefined>(undefined);

export function useNetworks() {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error('useNetworks must be within NetworksProvider');
  }

  return context;
}

export default function NetworkProvider({ children }: { children: ReactNode }) {
  const storedNetworkId = useMemo(
    () => localStorage.getItem('network'),
    [localStorage.getItem('network')]
  );

  const [selectedNetwork, setSelectedNetwork] = useState<TNetwork>(
    networks.find((item) => item.id === storedNetworkId) || networks[0]
  );

  useEffect(() => {
    if (!storedNetworkId) {
      localStorage.setItem('network', 'mainnet');
    }
  }, []);

  const setNetwork = useCallback((networkId: TNetworkId | string) => {
    const newNetwork = networks.find((item) => item.id === networkId);

    if (newNetwork) {
      localStorage.setItem('network', newNetwork.id);
      setSelectedNetwork(newNetwork);
    } else {
      localStorage.setItem('network', 'mainnet');
      setSelectedNetwork(networks[0]);
    }
  }, []);

  const heightToDate = useCallback(
    (height: string | number): Date | '--' => {
      if (!height) {
        return '--';
      }

      const seconds = Number(height) * 30;

      return addSeconds(selectedNetwork.epochStartDate, seconds);
    },
    [selectedNetwork.id]
  );

  const dateToHeight = useCallback(
    (date: Date | string | number): number | null => {
      const unixTimestamp = getUnixTime(new Date(date));
      const unixEpochTimestamp = getUnixTime(selectedNetwork.epochStartDate);

      return unixTimestamp > unixEpochTimestamp
        ? Math.floor((unixTimestamp - unixEpochTimestamp) / 30)
        : null;
    },
    [selectedNetwork.id]
  );

  const contextValue = useMemo(
    () => ({
      selectedNetwork,
      networks,
      setNetwork,
      heightToDate,
      dateToHeight,
    }),
    [selectedNetwork]
  );

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
}
