import LocalizedLink from 'next-translate/Link'
import React, { FC } from 'react'
import styled from 'styled-components'

const ABlank = styled.a`
  text-decoration: none;
  color: inherit;
`

const Link: FC<Props> = ({ href, as, children }) => {
  return (
    <LocalizedLink href={href} as={as}>
      <ABlank>{children}</ABlank>
    </LocalizedLink>
  )
}

export default Link

interface Props {
  href: string
  as?: string
}
