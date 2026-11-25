import styled from 'styled-components';

import { ExternalLink } from 'src/components/external-link';
import { lBody, xlBody } from 'src/styles/global';

export const Container = styled.div`
  margin: 64px 0;
`;

export const Title = styled.h2``;

export const Section = styled.section`
  margin: 0 0 36px;
`;

export const H3 = styled.h3`
  ${xlBody};
  font-weight: 500;
  margin: 0 0 4px;
`;

export const P = styled.p`
  ${lBody};
  font-weight: 400;
  margin: 0 0 0 8px;
  opacity: 0.7;
`;

export const Link = styled(ExternalLink)`
  font: inherit;
`;

export const FAQ = styled.details`
  margin: 0 0 24px 8px;

  &:last-of-type {
    margin: 0 0 0 8px;
  }
`;

export const FAQQuestion = styled.summary`
  cursor: pointer;
  ${lBody};
  font-weight: 500;
  margin: 0 0 4px;

  &::marker {
    color: rgba(255, 255, 255, 0.7);
  }
`;

export const FAQAnswer = styled.p`
  ${lBody};
  font-weight: 400;
  margin: 0 0 0 24px;
  opacity: 0.7;
`;
