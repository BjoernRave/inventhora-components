import { InputAdornment, TableSortLabel, TextField } from '@material-ui/core'
import MaUTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import SearchIcon from '@material-ui/icons/Search'
import useTranslation from 'next-translate/useTranslation'
import React, { CSSProperties, FC } from 'react'
import { Column, Row, useGlobalFilter, useSortBy, useTable } from 'react-table'
import styled from 'styled-components'

const StyledRow = styled(TableRow)<{ hover: boolean }>`
  cursor: ${({ hover }) => hover && 'pointer'};
`

const Table: FC<Props> = ({
  columns,
  data,
  actions,
  onRowClick,
  withSearch,
  selected,
  maxHeight,
  style,
}) => {
  const { t } = useTranslation()
  const {
    getTableProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data: data ?? [],
    },
    useGlobalFilter,
    useSortBy,
    (hooks) => {
      hooks.allColumns.push((columns) => [
        ...columns,
        ...(actions ? actions : []),
      ])
    }
  )

  return (
    <>
      {withSearch && (
        <TextField
          style={{ width: '100%' }}
          variant='outlined'
          label={t('common:search')}
          onChange={(e) => setGlobalFilter(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      )}
      <div style={{ overflow: 'auto', maxHeight, width: '100%', ...style }}>
        <MaUTable stickyHeader {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup, ind) => (
              <TableRow key={ind} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <TableCell
                    style={{ backgroundColor: 'white', fontWeight: 'bolder' }}
                    key={column.id}
                    {...column.getHeaderProps()}>
                    <TableSortLabel
                      hideSortIcon
                      active={column.isSorted}
                      direction={column.isSortedDesc ? 'desc' : 'asc'}
                      {...column.getSortByToggleProps()}>
                      {column.render('Header')}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              prepareRow(row)

              return (
                <StyledRow
                  selected={selected === row.id}
                  hover={Boolean(onRowClick)}
                  onClick={() => onRowClick && onRowClick(row)}
                  key={row.id}
                  {...row.getRowProps()}>
                  {row.cells.map((cell, ind) => {
                    return (
                      <TableCell key={ind} {...cell.getCellProps()}>
                        {cell.render('Cell')}
                      </TableCell>
                    )
                  })}
                </StyledRow>
              )
            })}
          </TableBody>
        </MaUTable>
      </div>
    </>
  )
}

export default Table

export interface Props {
  columns: Column[]
  data: {}[]
  actions?: any
  onRowClick?: (row: Row) => void
  selected?: string
  withSearch?: boolean
  maxHeight?: number
  style?: CSSProperties
}
