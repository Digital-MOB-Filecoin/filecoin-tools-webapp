import { useCallback, useState } from 'react';

import { Icon } from 'src/components/icon';

import * as SC from './styles.ts';

const STORAGE_KEY = 'show-banner';

export function OldWebsiteBanner() {
  const [showBanner, setShowBanner] = useState(() => {
    const item = localStorage.getItem(STORAGE_KEY);

    if (!item) localStorage.setItem(STORAGE_KEY, 'true');

    return JSON.parse(item || 'true');
  });

  const handleHideBanner = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, 'false');
    setShowBanner(false);
  }, []);

  if (!showBanner) {
    return null;
  }

  return (
    <SC.Wrapper>
      <SC.Container>
        <SC.Content>
          Looking for the old website?
          <SC.Link href="https://old.filecoin.tools/">
            Access it here <Icon name="arrow-right" />
          </SC.Link>
        </SC.Content>
        <SC.CloseButton onClick={handleHideBanner}>
          <span className="sr-only">Close popup</span>
          <Icon name="close" />
        </SC.CloseButton>
      </SC.Container>
    </SC.Wrapper>
  );
}
