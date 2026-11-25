import styled from 'styled-components';

import bg from 'src/assets/bg-min.png';
import { Button } from 'src/components/button';
import { Input } from 'src/components/input';
import { sBody, themeColors, xlBody } from 'src/styles/global';

export const TilesBg = styled.div`
  background: linear-gradient(${themeColors.gray['900']}, ${themeColors.gray['900']}), url(${bg});
  background-repeat: no-repeat;
  background-size:
    100% 52px,
    1440px 768px;
  background-position:
    center bottom,
    center top;
  min-height: 508px;
  display: flex;
  flex-direction: column;
  position: relative;

  @media screen and (max-width: 768px) {
    min-height: 450px;
  }
`;

export const TitleContainer = styled.div.attrs({ className: 'container' })`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const TitleInner = styled.div`
  margin: auto 0;
`;

export const Title = styled.h1`
  padding: 0 16px;
  margin-bottom: 24px;

  @media screen and (max-width: 768px) {
    font-size: 36px;
    line-height: 48px;
  }
`;

export const BelowTitle = styled.div`
  ${xlBody};
  color: rgba(255, 255, 255, 0.48);
  padding: 0 16px;
`;

export const SearchBarContainer = styled.form`
  position: relative;
  background: ${themeColors.gray['800']};
  padding: 16px;
  border: 1px solid ${themeColors.gray['700']};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      ${themeColors.gray['700']},
      ${themeColors.blue['500']},
      ${themeColors.gray['700']}
    );
  }

  @media screen and (max-width: 768px) {
    padding: 8px;
  }
`;

export const SearchInput = styled(Input)`
  width: 100%;
`;

export const SubmitSearchButton = styled(Button)`
  &:hover {
    svg > rect {
      fill: ${themeColors.blue['400']};
    }
  }

  &:active {
    svg > rect {
      fill: ${themeColors.blue['600']};
    }
  }
`;

export const CardsContainer = styled.div`
  margin-top: 80px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 16px;
  margin-bottom: 16px;

  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const CardValue = styled.div`
  ${xlBody};
  line-height: 24px;
`;

export const CardsHint = styled.div`
  color: ${themeColors.gray['500']};
  ${sBody};
`;

export const TableContainer = styled.div`
  margin: 64px 0;
`;
