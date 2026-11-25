import { NavLink } from 'react-router-dom';

import styled from 'styled-components';

import { sBody, themeColors, xlBody } from 'src/styles/global';

export const DealInfoContainer = styled.div`
  margin: 64px 0;
`;

export const CardsRow = styled.div<{ $childrenHideBottomBorder?: boolean }>`
  display: flex;
  gap: 16px;
`;

export const Link = styled(NavLink)`
  color: ${themeColors.white.itself};

  &:focus,
  &:hover {
    color: ${themeColors.gray['500']};
  }

  &:active {
    color: ${themeColors.gray['600']};
  }
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
  grid-template-columns: repeat(12, 1fr);
  margin-bottom: 48px;

  > div {
    grid-column: span 4 / span 1;

    &:nth-child(n + 7) {
      grid-column: span 3 / span 1;
    }
  }

  @media screen and (max-width: 1024px) {
    > div {
      &:nth-child(n + 7) {
        grid-column: span 4 / span 1;
      }
    }
  }
  @media screen and (max-width: 768px) {
    > div {
      grid-column: span 6 / span 1;
      &:nth-child(n + 7) {
        grid-column: span 6 / span 1;
      }
    }
  }
  @media screen and (max-width: 480px) {
    > div {
      grid-column: span 12 / span 1;
      &:nth-child(n + 7) {
        grid-column: span 12 / span 1;
      }
    }
  }
`;

export const ThirdRow = styled.dl`
  display: flex;
  flex-direction: row;
  position: relative;
  gap: 16px;
  margin-bottom: 48px;

  > ${CardsRow} {
    flex-direction: column;
    gap: 0;
    flex-basis: 100%;

    & div:first-child {
      border-bottom: 0;
    }
  }

  @media screen and (max-width: 480px) {
    flex-direction: column;

    > svg {
      transform: translate(-50%, -50%) rotate(90deg);
    }
  }
`;

export const FourthRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 16px;

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 480px) {
    grid-template-columns: 1fr;
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
  display: flex;
  align-items: center;
  gap: 4px;
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

export const ArrowWrapper = styled.div`
  transform-origin: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: ${themeColors.gray['900']};
  border: 1px solid ${themeColors.gray['700']};

  &::after {
    content: '';
    width: 32px;
    height: 32px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: ${themeColors.gray['800']};
    border: 1px solid ${themeColors.gray['700']};
    z-index: -1;
  }

  &::before {
    content: '';
    width: 16px;
    height: 42px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: ${themeColors.gray['900']};
    z-index: -1;
  }

  @media screen and (max-width: 480px) {
    transform: translate(-50%, -50%) rotate(90deg);
  }
`;
