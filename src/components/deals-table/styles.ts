import { NavLink } from 'react-router-dom';

import styled from 'styled-components';

import { themeColors } from 'src/styles/global';

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
