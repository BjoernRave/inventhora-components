import { Tab, Tabs } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React, { FC, useState } from 'react'
import styled from 'styled-components'
import { SameLine } from '../lib/styles'
import ComboBox from './Basic/ComboBox'
import TextInput from './Basic/TextInput'

const Wrapper = styled.div`
  margin-bottom: 10px;
  width: 100%;

  > *:not(label) {
    margin: 8px 0;
  }
`

const ZipInput = styled(TextInput)`
  width: 30% !important;

  @media (max-width: 767px) {
    width: 100% !important;
  }
`

const AddressInput: FC<Props> = ({ withBilling = true, countries }) => {
  const { t, lang } = useTranslation()
  const [currentPage, setCurrentPage] = useState(0)

  if (!withBilling) {
    return (
      <Wrapper>
        <TextInput name='address1' label={t('forms:address1')} />
        <TextInput name='address2' label={t('forms:address2')} />
        <SameLine>
          <TextInput name='city' label={t('forms:city')} />
          <ZipInput name='zip' label={t('forms:zip')} />
        </SameLine>
        <SameLine>
          <TextInput name='state' label={t('forms:state')} />
          <ComboBox
            label={t('forms:country')}
            options={countries.map(
              (country) => country.translations[lang] ?? country.translations.en
            )}
            name='country'
          />
        </SameLine>
      </Wrapper>
    )
  }

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
          <TextInput name='address1' label={t('forms:address1')} />
          <TextInput name='address2' label={t('forms:address2')} />
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
          <TextInput name='billingAddressLine1' label={t('forms:address1')} />
          <TextInput name='billingAddressLine2' label={t('forms:address2')} />
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

export interface Props {
  withBilling?: boolean
  countries: any[]
}
