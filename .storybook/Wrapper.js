import React from 'react'
import styled from 'styled-components'
import CssBaseline from '@material-ui/core/CssBaseline'
import DateTimeProvider from '../src/FormItems/Basic/DateTimeProvider'

const Wrapper = styled.div`
  margin: 50px 20px;
`

const StorybookWrapper = (storyfn) => {
  return (
    <DateTimeProvider>
      <CssBaseline />
      <Wrapper>{storyfn()}</Wrapper>
    </DateTimeProvider>
  )
}

export default StorybookWrapper