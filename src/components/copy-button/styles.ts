import styled from 'styled-components';

import { themeColors } from 'src/styles/global';

export const ButtonWrapper = styled.button<{ $isVisible: boolean }>`
  display: flex;
  align-items: center;
  color: ${({ $isVisible }) => ($isVisible ? themeColors.white.itself : themeColors.gray['500'])};

  &:focus,
  &:hover {
    color: ${themeColors.white.itself};
  }
`;
