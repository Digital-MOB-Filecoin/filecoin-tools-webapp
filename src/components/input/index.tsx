import { InputHTMLAttributes, ReactNode } from 'react';

import * as SC from './styles';

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  className?: string;
  endAdornment?: ReactNode;
  size?: 'medium' | 'large';
};

export function Input({ endAdornment, className, size, ...rest }: Props) {
  return (
    <SC.Wrapper className={className}>
      {rest.type === 'search' && <SC.SearchIcon name="search" $size={size} />}
      <SC.Input {...rest} $hideEndAdornment={!endAdornment} $size={size} />
      {endAdornment && <SC.EndAdornmentContainer>{endAdornment}</SC.EndAdornmentContainer>}
    </SC.Wrapper>
  );
}
