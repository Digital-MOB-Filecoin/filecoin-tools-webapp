import styled, { CSSProp, css } from 'styled-components';

import { Icon, IconName } from 'src/components/icon';
import { mBody, themeColors } from 'src/styles/global';

type TVariation = 'primary' | 'secondary';
type TIcon = {
  name: IconName;
  size?: number;
  position?: 'left' | 'right' | 'only';
};

const VARIATION_STYLES: Record<TVariation, CSSProp> = {
  primary: css`
    background: ${themeColors.blue['500']};
    color: ${themeColors.white.itself};
    border: none;

    &:hover {
      background: ${themeColors.blue['400']};
    }
    &:active {
      background: ${themeColors.blue['600']};
    }
    &[disabled] {
      color: ${themeColors.white.itself};
      background: ${themeColors.blue['600']};
    }
  `,
  secondary: css`
    border: 1px solid ${themeColors.gray['700']};
    background: ${themeColors.gray['800']};
    color: ${themeColors.white.itself};

    &:hover {
      background: ${themeColors.gray['700']};
      border-color: transparent;
    }
    &:active {
      background: ${themeColors.gray['600']};
      border-color: transparent;
    }
    &[disabled] {
      color: ${themeColors.gray['600']};
      background: ${themeColors.gray['800']};
      border: 1px solid ${themeColors.gray['700']};
    }
  `,
};

const getPadding = (variation: TVariation, icon?: TIcon) => {
  if (icon) {
    switch (icon.position) {
      case 'left':
        return css`
          padding: 8px 12px 8px 8px;
        `;
      case 'right':
        return css`
          padding: 8px 8px 8px 12px;
        `;
      case 'only':
        return css`
          padding: 8px;
        `;
    }
  }

  switch (variation) {
    case 'secondary':
      return css`
        padding: 7px 23px;
      `;
    case 'primary':
    default:
      return css`
        padding: 8px 24px;
      `;
  }
};

export const Container = styled.button<{
  $variation: TVariation;
  $icon?: TIcon;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  box-sizing: border-box;
  ${mBody};
  ${({ $variation }) => VARIATION_STYLES[$variation]};
  ${({ $icon, $variation }) => getPadding($variation, $icon)};

  &[disabled] {
    cursor: not-allowed;
  }
`;

export const SIcon = styled(Icon)<{ $position: TIcon['position'] }>`
  margin-right: ${({ $position }) => ($position === 'left' ? '8px' : '0')};
  margin-left: ${({ $position }) => ($position === 'right' ? '8px' : '0')};
`;
