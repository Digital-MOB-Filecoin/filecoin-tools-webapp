import styled from 'styled-components';

import { sBody, themeColors, xlBody } from 'src/styles/global';

export const DealInfoContainer = styled.div`
  margin: 64px 0 64px 0;
`;

export const FirstRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 64px;

  @media screen and (max-width: 768px) {
    align-items: center;
    margin-bottom: 48px;
  }
`;

export const SecondRow = styled.dl`
  display: grid;
  grid-gap: 16px;
  grid-template-columns: repeat(6, 1fr);
  margin-bottom: 48px;

  > div {
    grid-column: span 2 / span 1;

    &:nth-child(n + 7) {
      grid-column: span 3 / span 1;
    }
  }

  @media screen and (max-width: 768px) {
    > div {
      grid-column: span 3 / span 1;
      &:nth-child(n + 7) {
        grid-column: span 3 / span 1;
      }
    }
  }
  @media screen and (max-width: 480px) {
    > div {
      grid-column: span 6 / span 1;
      &:nth-child(n + 7) {
        grid-column: span 6 / span 1;
      }
    }
  }
`;

export const DealIdContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const H2 = styled.h2`
  margin-bottom: 4px;
`;

export const DealId = styled.div`
  ${sBody};
  color: ${themeColors.gray['500']};
`;

export const DealIdRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const H3 = styled.h3`
  ${xlBody};
  margin: 0;
`;

export const TableContainer = styled.div`
  margin: 64px 0;
`;
