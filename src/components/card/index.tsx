import { ReactNode } from 'react';

import { CopyButton } from 'src/components/copy-button';
import { Icon } from 'src/components/icon';
import { LoadingPlaceholder } from 'src/components/loading-placeholder';
import { Tooltip } from 'src/components/tooltip';

import * as SC from './styles';

interface Props {
  title: string;
  infoTooltip?: ReactNode;
  value?: string | number;
  valueAsNode?: ReactNode;
  loading?: boolean;
  copyButton?: boolean;
}

export function Card({
  title,
  infoTooltip,
  value,
  loading = false,
  copyButton = false,
  valueAsNode,
}: Props) {
  return (
    <SC.Container>
      {infoTooltip ? (
        <SC.TitleWrapper>
          <SC.Title>{title}</SC.Title>
          <Tooltip target={<Icon size={16} name="info" tabIndex={0} />} content={infoTooltip} />
        </SC.TitleWrapper>
      ) : (
        <SC.Title>{title}</SC.Title>
      )}
      <SC.Value>
        {loading ? (
          <LoadingPlaceholder height={24} width={100} />
        ) : (
          <>
            <div className="text-overflow" title={String(value)}>
              {valueAsNode || value}
            </div>
            {copyButton && <CopyButton copyValue={String(value)} />}
          </>
        )}
      </SC.Value>
    </SC.Container>
  );
}
