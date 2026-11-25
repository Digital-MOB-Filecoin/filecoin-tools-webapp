import styled from 'styled-components';

import { lBody, mBody, themeColors } from 'src/styles/global';

export const Container = styled.div`
  padding: 24px;
  border: 1px solid ${themeColors.gray['700']};
  background: ${themeColors.gray['800']};
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media screen and (max-width: 768px) {
    padding: 16px;
  }
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const Title = styled.dt`
  ${mBody};
  color: ${themeColors.gray['500']};
`;

export const Value = styled.dd`
  display: flex;
  gap: 8px;
  white-space: none;
  text-overflow: ellipsis;
  overflow: hidden;
  ${lBody};
`;
