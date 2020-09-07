import { Table, TableBody, TableCell, TableRow } from '@material-ui/core'
import React, { FC, ReactNode } from 'react'
import styled from 'styled-components'

const KeyWrapper = styled.span`
  font-size: 18px;
  svg {
    margin-right: 5px;
  }
`

const Infos: FC<Props> = ({ infos }) => {
  return (
    <Table style={{ width: 'initial' }}>
      <TableBody>
        {infos
          .filter(
            (info) =>
              info.value !== '' &&
              info.value !== null &&
              info.value !== undefined
          )
          .map(({ Icon, name, value }) => (
            <TableRow key={name}>
              <TableCell style={{ border: 'none' }}>
                {Icon && <Icon />}
              </TableCell>
              <TableCell
                style={{
                  textAlign: 'left',
                  border: 'none',
                  paddingRight: '10px',
                }}>
                <KeyWrapper>{name}:</KeyWrapper>
              </TableCell>
              <TableCell
                style={{
                  fontSize: 18,
                  textAlign: 'left',
                  border: 'none',
                  fontWeight: 'bold',
                }}>
                {value}
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  )
}

export default Infos

interface Props {
  infos: Info[]
}

export interface Info {
  name: string
  Icon?: any
  value: ReactNode | string
}
