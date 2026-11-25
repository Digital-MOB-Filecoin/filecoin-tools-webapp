import { Fragment, ReactNode, useState } from 'react';

import { Icon } from 'src/components/icon';
import { TABLE_LIMIT } from 'src/constant.ts';

// import { useSkipFirstRun } from 'src/hooks/utils.ts';
import * as SC from './styles';

export interface Column {
  id: string;
  title: ReactNode;
  sorting?: boolean;
}

export interface Row {
  id: string | number;

  [key: string]: ReactNode;
}

interface Props {
  title: ReactNode;
  columns: Column[];
  rows?: { data: Row[]; page: number }[];
  rowsMaxHeight?: string;
  status: 'error' | 'success' | 'pending';
  error: boolean;
  // onSortChange(columnId: string, direction: SC.SortDirection): void;
  onLoadMore?(): void;
  filters?: ReactNode;
  [rest: string]: unknown;
}

const getTableRows = (status: Props['status'], rows: Props['rows'], columns: Props['columns']) => {
  if (status === 'pending') {
    return (
      <SC.Tr>
        <td colSpan={columns?.length || 1} style={{ textAlign: 'center', padding: '16px 8px' }}>
          Loading...
        </td>
      </SC.Tr>
    );
  }

  if (status === 'error') {
    return (
      <SC.Tr>
        <td colSpan={columns?.length || 1} style={{ textAlign: 'center', padding: '16px 8px' }}>
          Failed to load data.
        </td>
      </SC.Tr>
    );
  }

  if (!rows?.[0]?.data?.length) {
    return (
      <SC.Tr>
        <td colSpan={columns?.length || 1} style={{ textAlign: 'center', padding: '16px 8px' }}>
          <div>No data</div>
        </td>
      </SC.Tr>
    );
  }

  return rows.map((data) => (
    <Fragment key={data.page}>
      {data.data.map((row) => (
        <SC.Tr key={row.id}>
          {columns.map((column) => (
            <SC.Td key={`${column.id}/${row.id}`}>{row[column.id]}</SC.Td>
          ))}
        </SC.Tr>
      ))}
    </Fragment>
  ));
};

export function Table({
  title,
  columns,
  rows,
  status,
  error,
  rowsMaxHeight,
  // onSortChange,
  onLoadMore,
  filters,
  ...rest
}: Props) {
  const [sortBy, setSortBy] = useState('');
  const [sortDirection, setSortDirection] = useState<SC.SortDirection>(SC.SortDirection.NONE);

  // useSkipFirstRun(() => {
  //   if (typeof onSortChange === 'function') {
  //     onSortChange(sortBy, sortDirection);
  //   }
  // }, [sortBy, sortDirection]);

  const handlerSort = (column: Column) => {
    if (!column.sorting) {
      return;
    }
    if (sortDirection === SC.SortDirection.NONE || sortBy !== column.id) {
      setSortBy(column.id);
      setSortDirection(SC.SortDirection.ASC);
    } else if (sortDirection === SC.SortDirection.ASC) {
      setSortBy(column.id);
      setSortDirection(SC.SortDirection.DESC);
    } else if (sortDirection === SC.SortDirection.DESC) {
      setSortBy('');
      setSortDirection(SC.SortDirection.NONE);
    }
  };

  return (
    <>
      <SC.StandardCaptionContent>
        <h2>{title}</h2>
        {filters && <SC.FilterButtons>{filters}</SC.FilterButtons>}
      </SC.StandardCaptionContent>
      <SC.TableWrapper>
        <SC.Table {...rest}>
          <SC.Caption className="sr-only">{title}</SC.Caption>
          <SC.Thead>
            <SC.TheadRow>
              {columns.map((column) => (
                <SC.Th key={column.id}>
                  <div>
                    {column.sorting ? (
                      <SC.SortButton
                        type="button"
                        onClick={() => handlerSort(column)}
                        $sorting={{
                          enable: Boolean(column.sorting),
                          isActive: sortBy === column.id,
                          direction: sortDirection,
                        }}>
                        <span>{column.title}</span>
                        <Icon name="dropdown" size={16} />
                      </SC.SortButton>
                    ) : (
                      column.title
                    )}
                  </div>
                </SC.Th>
              ))}
            </SC.TheadRow>
          </SC.Thead>
          <SC.Tbody rowsMaxHeight={rowsMaxHeight}>{getTableRows(status, rows, columns)}</SC.Tbody>
        </SC.Table>
      </SC.TableWrapper>
      {onLoadMore && (
        <SC.LoadMoreButton
          variation="secondary"
          onClick={onLoadMore}
          disabled={
            status === 'pending' ||
            !rows?.[rows?.length - 1]?.data?.length ||
            rows?.[0]?.data?.length < TABLE_LIMIT
          }>
          Load More
        </SC.LoadMoreButton>
      )}
    </>
  );
}
