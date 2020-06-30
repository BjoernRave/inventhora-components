import LinkedInLogo from '@material-ui/icons/LinkedIn'
import TwitterLogo from '@material-ui/icons/Twitter'
import useTranslation from 'next-translate/useTranslation'
import React, { FC } from 'react'
import styled from 'styled-components'
import Wave from './Wave'

const Wrapper = styled.div`
  margin-top: 50px;
`

const Content = styled.footer`
  background-color: #3c9f80;
  display: flex;
  justify-content: space-around;
  padding-bottom: 20px;

  @media (max-width: 767px) {
    flex-direction: column-reverse;
    align-items: center;
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

  :hover {
    text-decoration: underline;
  }
`

const Footer: FC<Props> = (props) => {
  const { t } = useTranslation()

  const items = [
    [
      { label: t('common:whatsNew'), path: '/changelog' },
      { label: t('common:roadmap'), path: '/roadmap' },
      { label: t('common:requestFeature'), path: 'feature-request' },
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
            {item.map(({ label, path }, ind) => (
              <FooterLink key={ind} href={`https://inventhora.com${path}`}>
                {label}
              </FooterLink>
            ))}
          </ItemSection>
        ))}
      </Content>
    </Wrapper>
  )
}

export default Footer

interface Props {}
