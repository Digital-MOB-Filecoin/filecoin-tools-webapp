import styled, { css } from 'styled-components';

import { Icon } from 'src/components/icon';
import { lBody, mBody, themeColors } from 'src/styles/global';

export const Wrapper = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
`;

export const Input = styled.input<{ $hideEndAdornment?: boolean; $size?: 'medium' | 'large' }>`
  width: 100%;
  border: 1px solid ${themeColors.gray['700']};
  background-color: ${themeColors.gray['900']};
  color: ${themeColors.white.itself};
  outline: none;
  font-family: inherit;

  ${({ $hideEndAdornment, $size, type }) => {
    if ($size === 'large') {
      return css`
        ${lBody};
        padding: 23px ${$hideEndAdornment ? '24px' : '72px'} 23px
          ${type === 'search' ? '56px' : '24px'};
      `;
    }

    return css`
      ${mBody};
      padding: 16px ${$hideEndAdornment ? '16px' : '72px'} 16px
        ${type === 'search' ? '48px' : '16px'};
    `;
  }}

  &:hover,
  &:focus {
    outline: 1px solid ${themeColors.blue['500']};
  }

  &:focus {
    box-shadow: 0 8px 32px -8px ${themeColors.hex2Rgba(themeColors.blue[500], 0.16)};
  }
`;

export const SearchIcon = styled(Icon)<{ $size?: 'medium' | 'large' }>`
  left: ${({ $size }) => {
    if ($size === 'large') {
      return '24px';
    }
    return '16px';
  }};
  position: absolute;
  color: ${themeColors.gray['500']};
  pointer-events: none;

  ${Wrapper}:focus-within & {
    color: ${themeColors.white.itself};
  }
`;

export const EndAdornmentContainer = styled.div`
  position: absolute;
  right: 16px;
  height: 40px;
`;
