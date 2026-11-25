import { InputHTMLAttributes, ReactElement, useId } from 'react';

import { Icon } from 'src/components/icon';

import * as SC from './styles';

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  children?: string | ReactElement;
  className?: string;
  onChange?: (checked: boolean) => void;
};

export function Checkbox({ className, children, checked, id, onChange, disabled, ...rest }: Props) {
  const initialId = useId();
  const inputId = id || initialId;

  return (
    <SC.Label
      className={className}
      htmlFor={inputId}
      tabIndex={disabled ? -1 : 0}
      $disabled={disabled}
      $checked={checked}
      onKeyDown={(e) => (onChange && e.key === 'Enter' ? onChange(!checked) : undefined)}>
      <SC.Input
        id={inputId}
        type="checkbox"
        disabled={disabled}
        tabIndex={-1}
        {...rest}
        onChange={(e) => onChange && onChange(e.target.checked)}
      />
      <SC.CheckboxPlaceholder $checked={checked}>
        <Icon name="check" size={16} />
      </SC.CheckboxPlaceholder>
      {children && <SC.Children>{children}</SC.Children>}
    </SC.Label>
  );
}
