import { useState } from 'react';

import { Icon } from 'src/components/icon';
import { Tooltip } from 'src/components/tooltip';

import * as SC from './styles';

export function CopyButton({ copyValue }: { copyValue: string | number }) {
  const copyValueToClipboard = (value: string) => navigator.clipboard.writeText(value);
  const [copyIsVisible, setCopyIsVisible] = useState(false);

  return (
    <Tooltip
      isVisible={copyIsVisible}
      target={
        <SC.ButtonWrapper
          $isVisible={copyIsVisible}
          onClick={() => {
            setCopyIsVisible(true);
            copyValueToClipboard(String(copyValue));
            setTimeout(() => {
              setCopyIsVisible(false);
            }, 1000);
          }}>
          <Icon name="copy" />
          <span className="sr-only">Copy to clipboard</span>
        </SC.ButtonWrapper>
      }
      content="Copied to clipboard"
    />
  );
}
