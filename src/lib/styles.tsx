import {
  Button,
  CircularProgress,
  Container,
  createMuiTheme,
  Paper,
} from '@material-ui/core'
import React, { FC, ReactNode } from 'react'
import styled from 'styled-components'

export const Loader = styled(CircularProgress)`
  position: fixed;
  bottom: 10px;
  left: 10px;
  z-index: 9999;

  @media (max-width: 767px) {
    bottom: initial;
    top: 5px;
    left: 80px;
  }
`

export const Title = styled.h1`
  margin: 0;
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`

export const SameLine = styled.div`
  display: inline-flex;
  width: 100%;
  align-items: center;
  .MuiTextField-root {
    :not(:last-child) {
      margin-right: 20px;
    }
    width: 100%;
  }

  @media (max-width: 767px) {
    flex-direction: column;

    .MuiTextField-root {
      :not(:last-child) {
        margin-right: initial;
        margin-bottom: 20px;
      }
    }
  }
`

export const BoldText = styled.span`
  font-weight: bold;
  margin-right: 5px;
`

const InfoWrapper = styled.li`
  list-style: none;
  font-size: 16px;
  line-height: 2;
  display: flex;
  align-items: center;

  svg {
    margin-right: 5px;
  }
`

export const Info: FC<{
  name: string
  value: string | ReactNode
  Icon?: any
}> = ({ name, value, Icon }) => {
  if (!value) return null

  return (
    <InfoWrapper>
      {Icon && <Icon />}
      {name}: <BoldText>{' ' + value}</BoldText>
    </InfoWrapper>
  )
}

export const StyledPaper = styled(Paper)`
  padding: 20px;
`

export const PageWrapper: FC<{
  title: string
  maxWidth?: string
  actionLabel?: ReactNode
  onClick?: () => void
}> = ({ children, title, maxWidth = 'md', actionLabel, onClick }) => {
  return (
    <Container maxWidth={maxWidth as any}>
      <StyledPaper>
        {actionLabel && onClick ? (
          <Header>
            <Title>{title}</Title>
            <Button variant='contained' color='secondary' onClick={onClick}>
              {actionLabel}
            </Button>
          </Header>
        ) : (
          <Title>{title}</Title>
        )}
        {children}
      </StyledPaper>
    </Container>
  )
}

export const ABlank = styled.a`
  text-decoration: none;
  color: inherit;
`

export const getTheme = (darkMode: boolean) =>
  createMuiTheme({
    palette: {
      type: darkMode ? 'dark' : 'light',
      primary: {
        main: '#3c9f80',
      },
      secondary: {
        main: '#3f51b5',
      },
    },
    overrides: {
      MuiContainer: {
        root: {
          paddingBottom: '10px',
        },
      },
      MuiTableRow: {
        root: {
          height: '45px',
        },
      },
      MuiTableFooter: {
        root: {
          position: 'absolute',
          bottom: 0,
          right: 0,
        },
      },
      MuiToolbar: {
        root: {
          minHeight: '45px',
        },
      },
      MuiTableCell: {
        head: {
          whiteSpace: 'nowrap',
        },
        root: {
          padding: '5px',
          textAlign: 'center',
        },
      },
      MuiIconButton: {
        root: {
          padding: '5px',
          '&:hover': {
            color: '#3c9f80',
          },
        },
      },
      MuiDialogActions: {
        root: {
          alignSelf: 'flex-end',
        },
      },
    },
  })
