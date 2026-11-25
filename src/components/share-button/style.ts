import styled from 'styled-components';

import { Button as NativeButton } from 'src/components/button';

export const Button = styled(NativeButton)`
  @media screen and (max-width: 768px) {
    padding: 4px 8px;
  }
`;
