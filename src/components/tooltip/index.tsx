import { ReactNode, useRef, useState } from 'react';

import { arrow, autoUpdate, offset, shift, useFloating } from '@floating-ui/react';

import * as SC from './styles';

interface Props {
  target: ReactNode;
  content: ReactNode;
  isVisible?: boolean;
}

export function Tooltip({ target, content, isVisible }: Props) {
  const [internalIsVisible, setInternalIsVisible] = useState(false);
  const actualIsVisible = typeof isVisible === 'boolean' ? isVisible : internalIsVisible;

  const arrowRef = useRef<HTMLDivElement>(null);

  const { refs, floatingStyles, middlewareData } = useFloating({
    placement: 'top',
    strategy: 'absolute',
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(8),
      shift({ padding: 4 }),
      arrow({ element: arrowRef }),
    ],
  });

  const arrowX = middlewareData.arrow?.x;

  return (
    <>
      <SC.TargetWrapper
        ref={refs.setReference}
        onFocus={() => setInternalIsVisible(true)}
        onBlur={() => setInternalIsVisible(false)}
        onMouseEnter={() => setInternalIsVisible(true)}
        onMouseLeave={() => setInternalIsVisible(false)}>
        {target}
      </SC.TargetWrapper>

      {actualIsVisible && (
        <SC.Popper ref={refs.setFloating} style={floatingStyles}>
          <div>{content}</div>
          <SC.Arrow
            ref={arrowRef}
            style={{
              left: arrowX != null ? `${arrowX}px` : '50%',
              transform: arrowX == null ? 'translateX(-50%)' : undefined,
            }}
          />
        </SC.Popper>
      )}
    </>
  );
}
