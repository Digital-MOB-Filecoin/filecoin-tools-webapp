import styled, { css } from 'styled-components';

import { themeColors } from 'src/styles/global';

export const MainContainer = styled.div<{ $type?: 'navbar' | 'content' }>`
  user-select: none;
  cursor: pointer;

  ${({ $type }) =>
    $type === 'content' &&
    css`
      ${TriggerContainer} {
        border: 1px solid ${themeColors.gray['700']};
        height: 40px;
        background: ${themeColors.gray['800']};
      }
      ${DropdownItemsContainer} {
        background: ${themeColors.gray['800']};
        border: 1px solid ${themeColors.gray['700']};
        box-shadow: 0 32px 64px -16px rgba(0, 0, 0, 0.16);
      }
      ${DropdownItem} {
        color: ${themeColors.gray['500']};
        background: ${themeColors.gray['800']};

        &:hover {
          background: ${themeColors.gray['700']};
          color: ${themeColors.white.itself};
        }
      }
    `}
`;

export const TriggerContainer = styled.div<{ $isVisible: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 11px 16px;
  gap: 8px;
  border: 1px solid ${themeColors.gray['700']};
  background: ${({ $isVisible }) =>
    $isVisible ? themeColors.gray['700'] : themeColors.gray['900']};

  &:focus,
  &:hover {
    background: ${themeColors.gray['700']};
  }

  svg {
    transition: all 0.05s ease;
    ${({ $isVisible }) => $isVisible && `transform: rotate(180deg)`};
  }

  @media screen and (max-width: 768px) {
    padding: 7px 16px;
  }

  @media screen and (max-width: 480px) {
    padding: 7px 8px;

    svg {
      display: none;
    }
  }
`;

export const DropdownItemsContainer = styled.div<{ $isVisible: boolean }>`
  display: ${({ $isVisible }) => ($isVisible ? 'flex' : 'none')};
  z-index: 1;

  flex-direction: column;
  padding: 4px;
  gap: 4px;

  background: ${themeColors.gray['800']};
  border: 1px solid ${themeColors.gray['700']};
  box-shadow: 0 32px 64px -16px rgba(0, 0, 0, 0.16);
  max-height: 320px;
  overflow-y: auto;
`;

export const DropdownItem = styled.button.attrs({ type: 'button' })<{
  $isActive: boolean;
}>`
  padding: 8px 12px;
  width: 112px;
  height: 40px;
  text-align: left;

  color: ${themeColors.gray['500']};
  background: ${themeColors.gray['800']};

  &:hover {
    background: ${themeColors.gray['700']};
    color: ${themeColors.white.itself};
  }

  ${({ $isActive }) => $isActive && `color: ${themeColors.white.itself}`};
`;
