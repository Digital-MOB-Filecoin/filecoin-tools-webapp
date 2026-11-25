import styled from 'styled-components';

import { sBody, themeColors } from 'src/styles/global';

export const ExternalLink = styled.a`
  color: ${themeColors.blue['500']};
  ${sBody};

  &:hover,
  &:focus {
    color: ${themeColors.blue['400']};
  }

  &:active {
    color: ${themeColors.blue['600']};
  }
`;
