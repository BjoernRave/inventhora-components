import { MenuItem, Select } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import styled from 'styled-components'

const StyledSelect = styled(Select)`
  font-size: 24px !important;
  height: 30px !important;
  margin-left: 5px;

  ::before {
    border-bottom: none !important;
  }

  .MuiSelect-select {
    display: flex;
  }
`

const Flag = styled.img`
  height: 25px;
  width: auto;
`

const LanguageSelect: FC<Props> = ({ allLanguages }) => {
  const router = useRouter()
  const { t, lang } = useTranslation()

  const changeLanguage = (lng: string) => {
    router.push(router.pathname, router.asPath, { locale: lng })
  }

  return (
    <StyledSelect
      value={lang}
      onChange={(e) => changeLanguage(e.target.value as string)}>
      {allLanguages.includes('es') && (
        <MenuItem value='es'>
          <Flag alt={t('common:spanish')} src='/flag_es.png' />
        </MenuItem>
      )}
      {allLanguages.includes('en') && (
        <MenuItem value='en'>
          <Flag alt={t('common:english')} src='/flag_en.png' />
        </MenuItem>
      )}
      {allLanguages.includes('pt') && (
        <MenuItem value='pt'>
          <Flag alt={t('common:portuguese')} src='/flag_pt.png' />
        </MenuItem>
      )}
      {allLanguages.includes('de') && (
        <MenuItem value='de'>
          <Flag alt={t('common:german')} src='/flag_de.png' />
        </MenuItem>
      )}
    </StyledSelect>
  )
}

export default LanguageSelect

export interface Props {
  allLanguages: string[]
}
