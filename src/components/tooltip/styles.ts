import styled from 'styled-components';

import { sBody, themeColors } from 'src/styles/global';

export const TargetWrapper = styled.div`
  display: inline-flex;
`;

export const Popper = styled.div`
  padding: 8px 12px;
  height: 32px;
  background: ${themeColors.white.itself};
  color: ${themeColors.gray['900']};
  ${sBody};
`;

export const Arrow = styled.div`
  top: 100%;
  border-top: 5px solid ${themeColors.white.itself};
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  width: 0;
  height: 0;
`;
