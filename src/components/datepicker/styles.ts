import styled from 'styled-components';

import { mBody, themeColors } from 'src/styles/global';

export const DatePickerWrap = styled.div<{ $active: boolean }>`
  display: ${({ $active }) => ($active ? 'flex' : 'none')};
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  background: ${themeColors.gray['800']};
  border: 1px solid ${themeColors.gray['700']};
  box-shadow: 0 32px 64px -16px rgba(0, 0, 0, 0.16);
  z-index: 2;

  @media screen and (max-width: 480px) {
    flex-direction: column;
  }
`;

export const CalendarWrap = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 354px;
`;

export const Footer = styled.div`
  padding: 16px;
  display: flex;
  gap: 16px;

  & > * {
    flex-basis: 100%;
  }
`;

export const RangeWrapper = styled.div<{ $customActive: boolean }>`
  padding: 4px;
  border-right: ${({ $customActive }) =>
    $customActive ? `1px solid ${themeColors.gray['700']}` : 'none'};
  display: flex;
  flex-direction: column;
  gap: 4px;

  @media screen and (max-width: 480px) {
    gap: 0;
    flex-direction: row;
    flex-wrap: wrap;
    max-width: 354px;
    border-right: none;
  }
`;

export const RangeButton = styled.button<{ $active: boolean }>`
  ${mBody};
  color: ${({ $active }) => ($active ? themeColors.white.itself : themeColors.gray['500'])};
  margin: 0;
  white-space: nowrap;
  background: transparent;
  border: 0;
  text-align: left;
  padding: 8px 12px;
  display: flex;

  &:hover {
    color: ${themeColors.white.itself};
  }
`;
