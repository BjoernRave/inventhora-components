import LocalizedLink from 'next-translate/Link'
import React, { FC } from 'react'
import styled, { CSSProperties } from 'styled-components'

const ABlank = styled.a`
  text-decoration: none;
  color: inherit;
`

const Link: FC<Props> = ({ href, as, children, noLang, ...props }) => {
  return (
    <LocalizedLink noLang={noLang} passHref href={href} as={as}>
      <ABlank {...(props as any)}>{children}</ABlank>
    </LocalizedLink>
  )
}

export default Link

interface Props {
  href: string
  as?: string
  target?: string
  className?: string
  style?: CSSProperties
  noLang?: boolean
}
