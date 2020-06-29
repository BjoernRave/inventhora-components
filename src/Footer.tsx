import LinkedInLogo from '@material-ui/icons/LinkedIn'
import TwitterLogo from '@material-ui/icons/Twitter'
import Link from 'next-translate/Link'
import useTranslation from 'next-translate/useTranslation'
import React, { FC } from 'react'
import styled from 'styled-components'

const FooterWrapper = styled.footer`
  position: relative;
  margin-top: 150px;
`

const FooterWave = styled.img`
  width: 100%;

  @media (max-width: 767px) {
  }
`

const TopSection = styled.div`
  display: flex;
  width: 100%;
  height: 360px;
`

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: absolute;
  right: 20%;
  bottom: 20%;

  @media (max-width: 840px) {
    right: 5%;
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

const FooterLink = styled.a`
  color: white;
  cursor: pointer;
  margin: 15px 0;
  font-size: 18px;

  :hover {
    text-decoration: underline;
  }
`

const LeftSection = styled.div`
  position: absolute;
  color: white;
  bottom: 20%;
  left: 10%;
`

const SocialLink = styled.a`
  color: white;
  margin: 0 10px;
`

const MiddleSection = styled.div`
  position: absolute;
  bottom: 20%;
  left: 40%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const Footer: FC<Props> = () => {
  const { t } = useTranslation()

  return (
    <FooterWrapper>
      <TopSection>
        <FooterWave alt='' src='/FooterWave.png' />
        <LeftSection>
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
        </LeftSection>
        <MiddleSection>
          <Link href='/changelog'>
            <FooterLink>{t('common:whatsNew')}</FooterLink>
          </Link>
          <Link href='/roadmap'>
            <FooterLink>{t('common:roadmap')}</FooterLink>
          </Link>
          <Link href='/feature-request'>
            <FooterLink>{t('common:requestFeature')}</FooterLink>
          </Link>
        </MiddleSection>
        <RightSection>
          <Link href='/privacy'>
            <FooterLink>{t('common:privacyPolicy')}</FooterLink>
          </Link>
          <Link href='/terms'>
            <FooterLink>{t('common:terms')}</FooterLink>
          </Link>
          <Link href='/cookies'>
            <FooterLink>{t('common:cookiePolicy')}</FooterLink>
          </Link>
        </RightSection>
      </TopSection>
      <Copyright>{t('common:copyright')}</Copyright>
    </FooterWrapper>
  )
}

export default Footer

interface Props {}
