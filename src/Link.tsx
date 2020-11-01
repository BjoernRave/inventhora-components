import NextLink from 'next/link'
import React, { FC } from 'react'
import styled, { CSSProperties } from 'styled-components'

const ABlank = styled.a`
  text-decoration: none;
  color: inherit;
`

const Link: FC<Props> = ({ href, as, children, ...props }) => {
  return (
    <NextLink passHref href={href} as={as}>
      <ABlank {...(props as any)}>{children}</ABlank>
    </NextLink>
  )
}

export default Link

interface Props {
  href: string
  as?: string
  target?: string
  className?: string
  style?: CSSProperties
}
