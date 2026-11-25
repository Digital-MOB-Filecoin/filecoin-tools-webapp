import styled, { keyframes } from 'styled-components';

import { themeColors } from 'src/styles/global';

type Props = {
  $width: number;
  $height: number;
};

const moveWave = ($width: Props['$width']) => keyframes`
    0% {
        background-position: ${`-${$width * 2}px 0`};
    }
    100% {
        background-position: ${`${$width * 2}px 0`};
    }
`;

export const Wrapper = styled.div<Props>`
  display: flex;
  border-radius: 2px;
  animation-duration: 2s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: ${({ $width }) => moveWave($width)};
  animation-timing-function: linear;
  background: linear-gradient(
      to right,
      ${themeColors.gray['800']} 8%,
      ${themeColors.gray['700']} 18%,
      ${themeColors.gray['800']} 33%
    )
    ${themeColors.gray['600']};
  background-size: ${({ $width, $height }) => `${$width * 2}px ${$height * 1}px`};
  height: ${({ $height }) => `${$height}px`};
  width: ${({ $width }) => `${$width}px`};
  position: relative;
`;
