import styled from 'styled-components';

import { Button } from 'src/components/button';
import { sBody, themeColors } from 'src/styles/global';

export const TableWrapper = styled.div`
  overflow-x: auto;
`;

export const Table = styled.table`
  position: relative;
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  background: ${themeColors.gray['800']};
  border: 1px solid ${themeColors.gray['700']};
  table-layout: auto;
  white-space: nowrap;
`;

export const Caption = styled.caption``;

export const FilterButtons = styled.div`
  display: flex;
  gap: 16px;
`;

export const StandardCaptionContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;

  h2 {
    margin: 0;
  }

  @media screen and (max-width: 1024px) {
    flex-direction: column;
    align-items: flex-start;

    ${FilterButtons} {
      margin-top: 8px;
      flex-wrap: wrap;
    }
  }
`;

export const Thead = styled.thead``;

export const TheadRow = styled.tr`
  border-bottom: 1px solid ${themeColors.gray['700']};
`;

export const Th = styled.th`
  padding: 16px 24px;
  color: ${themeColors.gray['500']};
  text-align: left;
  ${sBody};

  @media screen and (max-width: 768px) {
    padding: 8px 16px;
  }
`;

export const Tbody = styled.tbody<{ rowsMaxHeight?: string }>``;

export const Tr = styled.tr`
  border-bottom: 1px solid ${themeColors.gray['700']};
`;

export const Td = styled.td`
  padding: 24px;

  @media screen and (max-width: 768px) {
    padding: 16px;
  }
`;

export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc',
  NONE = 'none',
}

interface Sorting {
  enable: boolean;
  isActive: boolean;
  direction: SortDirection;
}

interface SortButtonProps {
  justifyRight?: boolean;
  $sorting: Sorting;
}
export const SortButton = styled.button.attrs({
  type: 'button',
})<SortButtonProps>`
  display: flex;
  align-items: center;
  ${sBody};

  svg {
    margin-left: 4px;
    background-color: ${({ $sorting }) =>
      $sorting.isActive ? themeColors.white.itself : 'inherit'};
    border-radius: 3px;
    color: ${({ $sorting }) => ($sorting.isActive ? themeColors.gray['500'] : 'inherit')};
    transform: ${({ $sorting }) =>
      $sorting.direction === SortDirection.ASC ? 'rotate(180deg)' : 'inherit'};
  }
`;

export const LoadMoreButton = styled(Button)`
  margin-top: 16px;
  width: 100%;
`;
