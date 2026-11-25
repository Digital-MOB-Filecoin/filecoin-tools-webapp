import { useEffect, useRef, useState } from 'react';

import { autoUpdate, offset, useFloating } from '@floating-ui/react';

import { Icon } from 'src/components/icon';

import * as SC from './styles';

export interface Option {
  label: string;
  key: string;
}

interface Props {
  options: Option[];
  selectedOptionKey: string;
  onSelected: CallbackFunction;
  type?: 'navbar' | 'content';
  className?: string;
}

export function Dropdown({
  options,
  selectedOptionKey,
  onSelected,
  type = 'navbar',
  className,
}: Props) {
  const [isVisible, setIsVisible] = useState(false);

  const mainContainerRef = useRef<HTMLDivElement | null>(null);

  const { refs, floatingStyles } = useFloating({
    placement: 'bottom-end',
    whileElementsMounted: autoUpdate,
    middleware: [offset(12)],
  });

  function toggleOpen() {
    setIsVisible((_) => !_);
  }

  function handleItemClick(option: Option) {
    setIsVisible(false);
    onSelected(option);
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (mainContainerRef.current && !mainContainerRef.current.contains(e.target as Node)) {
        setIsVisible(false);
      }
    };

    const keyboardHandler = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        setIsVisible(false);
      }
    };

    if (isVisible) {
      document.body.addEventListener('click', handleClickOutside, { capture: true });
      document.body.addEventListener('keyup', keyboardHandler, { capture: true });
    }

    return () => {
      if (!isVisible) {
        document.body.removeEventListener('click', handleClickOutside);
        document.body.removeEventListener('keyup', keyboardHandler);
      }
    };
  }, [isVisible]);

  const selectedOption = options.find((item) => item.key === selectedOptionKey);

  return (
    <SC.MainContainer ref={mainContainerRef} $type={type} className={className}>
      <SC.TriggerContainer
        ref={refs.setReference}
        $isVisible={isVisible}
        onClick={toggleOpen}
        onKeyUp={(e) => {
          if (e.code === 'Enter') {
            toggleOpen();
          }
        }}
        tabIndex={0}>
        {selectedOption?.label ?? 'Select option'}
        <Icon name="dropdown" />
      </SC.TriggerContainer>
      <SC.DropdownItemsContainer
        ref={refs.setFloating}
        style={floatingStyles}
        $isVisible={isVisible}>
        {options.map((option) => (
          <SC.DropdownItem
            key={option.key}
            onClick={() => handleItemClick(option)}
            $isActive={selectedOption?.key === option.key}>
            {option.label}
          </SC.DropdownItem>
        ))}
      </SC.DropdownItemsContainer>
    </SC.MainContainer>
  );
}
