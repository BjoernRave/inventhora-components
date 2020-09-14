import LinkedInLogo from '@material-ui/icons/LinkedIn'
import TwitterLogo from '@material-ui/icons/Twitter'
import useTranslation from 'next-translate/useTranslation'
import React, { FC } from 'react'
import styled from 'styled-components'
import Link from './Link'
import Wave from './Wave'

const Wrapper = styled.div`
  margin-top: 50px;
  position: relative;
`

const Content = styled.footer`
  background-color: ${({ theme }) => theme.palette.primary.main};
  display: flex;
  justify-content: space-around;
  margin-top: -20px;
  padding-bottom: 50px;

  @media (max-width: 767px) {
    flex-direction: column-reverse;
    align-items: center;
    margin-top: 0;
  }
`

const SocialSection = styled.div`
  color: white;
  display: flex;
  align-items: flex-end;
`

const SocialLink = styled.a`
  color: white;
  margin: 0 10px;
`

const ItemSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 767px) {
    align-items: center;
  }
`

const FooterLink = styled.a`
  color: white;
  cursor: pointer;
  margin: 15px 0;
  font-size: 18px;
  text-decoration: none;

  :hover {
    text-decoration: underline;
  }
`

const StyledLink = styled(Link)`
  color: white;
  cursor: pointer;
  margin: 15px 0;
  font-size: 18px;
  text-decoration: none;

  :hover {
    text-decoration: underline;
  }
`

const Copyright = styled.span`
  color: white;
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  width: 500px;
  text-align: center;

  @media (max-width: 840px) {
    width: 300px;
  }
`

const Footer: FC<Props> = (props) => {
  const { t, lang } = useTranslation()

  const items = [
    [
      { label: t('common:whatsNew'), path: '/changelog' },
      { label: t('common:roadmap'), path: '/roadmap' },
      { label: t('common:requestFeature'), path: '/feature-request' },
    ],
    [
      {
        label: t('common:privacyPolicy'),
        path: '/privacy',
      },
      {
        label: t('common:terms'),
        path: '/terms',
      },
      {
        label: t('common:cookiePolicy'),
        path: '/cookies',
      },
    ],
  ]

  return (
    <Wrapper {...props}>
      <Wave />
      <Content>
        <SocialSection>
          <SocialLink
            id='twitter-link'
            rel='noreferrer'
            style={{ color: 'white' }}
            target='_blank'
            href='https://twitter.com/inventhora'>
            <TwitterLogo fontSize='large' />
          </SocialLink>
          <SocialLink
            id='linkedin-link'
            rel='noreferrer'
            style={{ color: 'white' }}
            target='_blank'
            href='https://www.linkedin.com/company/inventhora'>
            <LinkedInLogo fontSize='large' />
          </SocialLink>
        </SocialSection>
        {items.map((item, ind) => (
          <ItemSection key={ind}>
            {item.map(({ label, path }, ind) => {
              if (process.env.BASE_URL === 'https://inventhora.com') {
                return (
                  <StyledLink key={ind} href={path}>
                    {label}
                  </StyledLink>
                )
              }

              return (
                <FooterLink
                  key={ind}
                  href={`https://inventhora.com/${lang}${path}`}>
                  {label}
                </FooterLink>
              )
            })}
          </ItemSection>
        ))}
      </Content>
      <Copyright>{t('common:copyright')}</Copyright>
    </Wrapper>
  )
}

export default Footer

interface Props {}
