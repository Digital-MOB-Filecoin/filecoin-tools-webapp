import styled, { css } from 'styled-components';

import { mBody, themeColors } from 'src/styles/global';

export const CheckboxPlaceholder = styled.div<{ $checked?: boolean }>`
  height: 24px;
  width: 24px;
  position: relative;
  flex-shrink: 0;
  display: inline-flex;
  justify-content: center;
  align-items: center;

  &::before {
    content: '';
    position: absolute;
    inset: 2px;
    background: ${themeColors.gray['900']};
    border: 1px solid ${themeColors.gray['700']};
  }

  svg {
    z-index: 1;
    color: ${({ $checked }) => ($checked ? themeColors.blue['500'] : 'transparent')};
  }
`;

export const Label = styled.label<{ $disabled?: boolean; $checked?: boolean }>`
  position: relative;
  padding: 7px 15px 7px 7px;
  border: 1px solid ${themeColors.gray['700']};
  background: ${themeColors.gray['800']};
  display: inline-flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};

  &:focus,
  &:hover {
    ${({ $disabled }) =>
      $disabled
        ? css`
            cursor: not-allowed;
          `
        : css`
            background: ${themeColors.gray['700']};
            ${CheckboxPlaceholder}::before {
              border: 1px solid ${themeColors.blue['500']};
            }
          `}
  }
`;

export const Input = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 1px;
  height: 1px;
  visibility: hidden;
  opacity: 0;
  overflow: hidden;
  appearance: none;
`;

export const Children = styled.div`
  ${mBody};
`;
