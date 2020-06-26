import MaUTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React, { FC } from 'react';
import { Column, Row, useTable } from 'react-table';
import styled, { css } from 'styled-components';

const ClickStyles = css`
  :hover {
    background-color: #fafafa;
    cursor: pointer;
  }
`;

const StyledRow = styled(TableRow)<{ hover: number }>`
  ${({ hover }) => hover === 1 && ClickStyles};
`;

const Table: FC<Props> = ({ columns, data, actions, onRowClick }) => {
  const { getTableProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data: data ?? [],
    },
    hooks => {
      hooks.allColumns.push(columns => [
        ...columns,
        ...(actions ? actions : []),
      ]);
    }
  );

  return (
    <MaUTable stickyHeader {...getTableProps()}>
      <TableHead>
        {headerGroups.map((headerGroup, ind) => (
          <TableRow key={ind} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <TableCell
                style={{ backgroundColor: 'white', fontWeight: 'bolder' }}
                key={column.id}
                {...column.getHeaderProps()}
              >
                {column.render('Header')}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody>
        {rows.map(row => {
          prepareRow(row);
          return (
            //@ts-ignore
            <StyledRow
              hover={onRowClick ? 1 : 0}
              onClick={() => onRowClick && onRowClick(row)}
              key={row.id}
              {...row.getRowProps()}
            >
              {row.cells.map((cell, ind) => {
                return (
                  <TableCell key={ind} {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </TableCell>
                );
              })}
            </StyledRow>
          );
        })}
      </TableBody>
    </MaUTable>
  );
};

export default Table;

export interface Props {
  columns: Column[];
  data: {}[];
  actions?: any;
  onRowClick?: (row: Row) => void;
}
