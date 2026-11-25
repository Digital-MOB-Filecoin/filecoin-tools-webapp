import styled, { css } from 'styled-components';

import { lBody, mBody, themeColors } from 'src/styles/global';

export const Wrapper = styled.div`
  padding: 16px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  text-align: center;
`;

export const Title = styled.div`
  ${lBody};
  color: ${themeColors.white.itself};
  margin: 0 auto;
`;

export const Calendar = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 16px 0;
`;

export const Weekday = styled.span`
  height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  ${mBody};
  color: ${themeColors.gray['500']};
`;

export const DayNumber = styled.span`
  width: 32px;
  height: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export const Day = styled.button<{
  $isInRange: boolean;
  $isStartOfRange: boolean;
  $isEndOfRange: boolean;
  $isPrevMonth: boolean;
  $isNextMonth: boolean;
  $isToday: boolean;
  $isDisabled: boolean;
}>`
  ${mBody};
  height: 32px;
  border: 0;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  background: ${({ $isInRange, $isStartOfRange, $isEndOfRange }) => {
    if ($isInRange && !$isStartOfRange && !$isEndOfRange) {
      return themeColors.hex2Rgba(themeColors.blue['500'], 0.08);
    }
    return 'transparent';
  }};

  ${DayNumber} {
    border: 1px solid
      ${({ $isToday }) =>
        $isToday ? themeColors.hex2Rgba(themeColors.blue['600'], 0.16) : 'transparent'};
    color: ${({ $isPrevMonth, $isNextMonth, $isInRange, $isStartOfRange, $isEndOfRange }) => {
      if ($isStartOfRange || $isEndOfRange) {
        return themeColors.white.itself;
      }
      if ($isPrevMonth || $isNextMonth) {
        return themeColors.gray['500'];
      }
      if ($isInRange) {
        return themeColors.blue['500'];
      }

      return themeColors.white.itself;
    }};
    background: ${({ $isStartOfRange, $isEndOfRange }) => {
      if ($isStartOfRange || $isEndOfRange) {
        return themeColors.blue['500'];
      }
      return 'transparent';
    }};
  }

  ${({ $isDisabled }) =>
    $isDisabled
      ? css`
          opacity: 0.1;
          cursor: not-allowed;
        `
      : css`
          &:hover ${DayNumber} {
            background: ${themeColors.hex2Rgba(themeColors.blue['500'], 0.08)};
          }
        `}
`;
