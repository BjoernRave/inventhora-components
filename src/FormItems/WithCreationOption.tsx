import { Button, Tooltip } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import React, { FC } from 'react'
import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;

  > div:first-child {
    width: 100%;
  }
`

const WithCreationOption: FC<Props> = ({
  children,
  canCreate = true,
  onCreate,
  title,
}) => {
  return (
    <Wrapper>
      {children}
      {canCreate && (
        <Tooltip placement='right' title={title}>
          <Button
            aria-label={title}
            style={{ height: '56px', marginLeft: 10 }}
            variant='contained'
            color='secondary'
            size='large'
            onClick={onCreate}>
            <AddIcon />
          </Button>
        </Tooltip>
      )}
    </Wrapper>
  )
}

export default WithCreationOption

interface Props {
  canCreate?: boolean
  onCreate: () => void
  title: string
}
