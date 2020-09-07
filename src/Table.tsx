import {
  InputAdornment,
  TableBody,
  TableContainer,
  TableSortLabel,
  TextField,
} from '@material-ui/core'
import MaUTable from '@material-ui/core/Table'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import SearchIcon from '@material-ui/icons/Search'
import { Skeleton } from '@material-ui/lab'
import useTranslation from 'next-translate/useTranslation'
import React, { CSSProperties, FC } from 'react'
import { Column, Row, useGlobalFilter, useSortBy, useTable } from 'react-table'
import styled from 'styled-components'

const StyledRow = styled(TableRow)<{ hover: boolean }>`
  cursor: ${({ hover }) => hover && 'pointer'};
`

const NoRecords = styled.tbody`
  font-size: 18px;
  display: table;
  position: absolute;
  margin: 20px auto;
  left: 46px;
  right: 0;
`

const StyledTableBody = styled(TableBody)`
  @media (max-width: 1023px) {
    tr {
      :nth-child(even) {
        background-color: ${({ theme }) => theme.palette.background.default};
      }
    }
  }
`

const StyledCell = styled(TableCell)`
  font-weight: bold !important;
  background-color: ${({ theme }) => theme.palette.background.paper} !important;
`

const StyledContainer = styled(TableContainer)`
  overflow: auto;
  width: 100%;
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
  labelledBy,
}) => {
  const { t } = useTranslation()
  const {
    getTableProps,
    getTableBodyProps,
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

  const array = new Array(10).fill('blah')

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
      <StyledContainer style={{ maxHeight, ...style }}>
        <MaUTable
          aria-labelledby={labelledBy}
          stickyHeader
          {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup, ind) => (
              <TableRow key={ind} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <StyledCell key={column.id} {...column.getHeaderProps()}>
                    <TableSortLabel
                      hideSortIcon
                      active={column.isSorted}
                      direction={column.isSortedDesc ? 'desc' : 'asc'}
                      {...column.getSortByToggleProps()}>
                      {column.render('Header')}
                    </TableSortLabel>
                  </StyledCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          {!Boolean(data) ? (
            <StyledTableBody {...getTableBodyProps()}>
              {array.map((row) => (
                <TableRow key={row.id}>
                  {columns.map((col, ind) => (
                    <TableCell key={ind}>
                      <Skeleton variant='text' />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </StyledTableBody>
          ) : rows.length > 0 ? (
            <StyledTableBody {...getTableBodyProps()}>
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
            </StyledTableBody>
          ) : (
            <NoRecords>{t('table:noRecords')}</NoRecords>
          )}
        </MaUTable>
      </StyledContainer>
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
  labelledBy?: string
}
