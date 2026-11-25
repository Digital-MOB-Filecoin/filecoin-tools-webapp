import { useState } from 'react';

import { Tooltip } from 'src/components/tooltip';

import * as SC from './style.ts';

interface Props {
  link: string;
}

export function ShareButton({ link }: Props) {
  const copyValueToClipboard = (value: string) => navigator.clipboard.writeText(value);
  const [copyIsVisible, setCopyIsVisible] = useState(false);

  return (
    <Tooltip
      isVisible={copyIsVisible}
      target={
        <SC.Button
          variation="primary"
          onClick={() => {
            setCopyIsVisible(true);
            copyValueToClipboard(String(link));
            setTimeout(() => {
              setCopyIsVisible(false);
            }, 1000);
          }}>
          Share
          <span className="sr-only">Copy link to clipboard</span>
        </SC.Button>
      }
      content="Copied to clipboard"
    />
  );
}
