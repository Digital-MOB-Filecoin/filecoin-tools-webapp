import styled from 'styled-components';

import { mBody, themeColors } from 'src/styles/global';

export const Wrapper = styled.div`
  background: ${themeColors.gray['900']};
  border-bottom: 1px solid ${themeColors.gray['700']};
`;

export const Container = styled.div.attrs({ className: 'container' })`
  padding-top: 8px;
  padding-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mBody};
  font-weight: 500;
  color: ${themeColors.gray['500']};
`;

export const Content = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  gap: 8px;

  @media (max-width: 480px) {
    gap: 4px;
  }
`;

export const Link = styled.a`
  display: inline-flex;
  align-items: flex-start;
  color: ${themeColors.white.itself};
  text-decoration: none;

  &:hover,
  &:focus {
    opacity: 0.7;
  }

  &:active {
    opacity: 0.5;
  }

  svg {
    margin-left: 4px;
  }
`;

export const CloseButton = styled.button`
  position: relative;
  display: inline-flex;
  width: 24px;
  height: 24px;
  padding: 0;
  background: transparent;
  color: ${themeColors.gray['500']};
  cursor: pointer;

  &:hover,
  &:focus {
    color: ${themeColors.white.itself};
  }

  &:active {
    color: ${themeColors.white.itself};
    opacity: 0.8;
  }
`;
