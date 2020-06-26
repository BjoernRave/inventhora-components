import { Tab, Tabs } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React, { FC, useState } from 'react'
import styled from 'styled-components'
import { countries } from '../lib/countries.json'
import { SameLine } from '../lib/styles'
import ComboBox from './Basic/ComboBox'
import TextInput from './Basic/TextInput'
import ZipInput from './ZipInput'

const Wrapper = styled.div`
  margin-bottom: 10px;
  width: 100%;

  > *:not(label) {
    margin: 8px 0;
  }
`

const AddressInput: FC<Props> = () => {
  const { t, lang } = useTranslation()
  const [currentPage, setCurrentPage] = useState(0)

  return (
    <Wrapper>
      <Tabs
        style={{ width: '100%', marginBottom: 10 }}
        variant='fullWidth'
        value={currentPage}
        onChange={(_, value) => setCurrentPage(value)}>
        <Tab label={t('forms:address')} value={0} />
        <Tab label={t('forms:billingAddress')} value={1} />
      </Tabs>
      {currentPage === 0 && (
        <>
          <TextInput name='addressLine1' label={t('forms:addressLine1')} />
          <TextInput name='addressLine2' label={t('forms:addressLine2')} />
          <SameLine>
            <TextInput name='city' label={t('forms:city')} />
            <ZipInput name='zip' label={t('forms:zip')} />
          </SameLine>
          <SameLine>
            <TextInput name='state' label={t('forms:state')} />
            <ComboBox
              label={t('forms:country')}
              options={countries.map(
                (country) =>
                  country.translations[lang] ?? country.translations.en
              )}
              name='country'
            />
          </SameLine>
        </>
      )}
      {currentPage === 1 && (
        <>
          <TextInput
            name='billingAddressLine1'
            label={t('forms:addressLine1')}
          />
          <TextInput
            name='billingAddressLine2'
            label={t('forms:addressLine2')}
          />
          <SameLine>
            <TextInput name='billingCity' label={t('forms:city')} />
            <ZipInput name='billingZip' label={t('forms:zip')} />
          </SameLine>
          <SameLine>
            <TextInput name='billingState' label={t('forms:state')} />
            <ComboBox
              name='billingCountry'
              label={t('forms:country')}
              options={countries.map(
                (country) =>
                  country.translations[lang] ?? country.translations.en
              )}
            />
          </SameLine>
        </>
      )}
    </Wrapper>
  )
}

export default AddressInput

export interface Props {}
