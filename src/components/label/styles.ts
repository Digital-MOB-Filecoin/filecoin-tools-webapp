import styled from 'styled-components';

import { sBody, themeColors } from 'src/styles/global';

export const Container = styled.div<{ $status?: 'active' | 'inactive' }>`
  height: 24px;
  width: 66px;
  padding: 4px 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $status }) =>
    $status === 'active' ? themeColors.green['500'] : themeColors.gray['500']};
  background: ${({ $status }) =>
    $status === 'active'
      ? themeColors.hex2Rgba(themeColors.green['500'], 0.06)
      : themeColors.hex2Rgba(themeColors.gray['500'], 0.06)};
  ${sBody};
`;
