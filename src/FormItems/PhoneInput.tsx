import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { useField } from 'formik'
import useTranslation from 'next-translate/useTranslation'
import React, { FC } from 'react'
import styled from 'styled-components'
import { countries } from '../lib/countries.json'
import { generateSlug } from '../lib/utils'

const PhoneWrapper = styled.div`
  display: inline-flex !important;
  width: 100% !important;
  flex-direction: row !important;
`

const PhoneInput: FC<Props> = ({
  name,
  helperText,
  label,
  required,
  index,
  subName,
  prefixName,
  prefixSubName,
}) => {
  const { t } = useTranslation()
  const formName =
    typeof index === 'number' && subName ? `${name}[${index}].${subName}` : name

  const prefixFormName =
    typeof index === 'number' && prefixSubName
      ? `${prefixName}[${index}].${prefixSubName}`
      : prefixName

  const { lang } = useTranslation()

  const [, meta, helper] = useField(formName)

  const [, prefixMeta, prefixHelper] = useField(prefixFormName)

  return (
    <PhoneWrapper id={`${generateSlug(formName)}-group`}>
      <Autocomplete
        style={{ width: '170px', alignSelf: 'flex-end', marginRight: '20px' }}
        value={prefixMeta.value ?? null}
        onChange={(e, value: Prefix) => {
          prefixHelper.setValue(value)
        }}
        getOptionLabel={(option) => (option ? `+${option.phonePrefix}` : '')}
        renderOption={(option) =>
          option
            ? `+${option.phonePrefix} (${
                option.translations[lang] ?? option.translations.en
              })`
            : ''
        }
        options={countries}
        renderInput={(params) => (
          <TextField
            required={required}
            {...params}
            fullWidth
            label={t('forms:prefix')}
            placeholder='+'
            error={Boolean(meta.error)}
            variant='outlined'
          />
        )}
      />
      <TextField
        id={formName}
        inputMode='numeric'
        type='text'
        variant='outlined'
        onKeyDown={(e) => {
          //delete, tab, etc
          if ([8, 9, 37, 39].includes(e.keyCode)) {
            return
          }

          //number keys
          if (e.keyCode >= 48 && e.keyCode <= 57) {
            return
          }

          //numpad
          if (e.keyCode >= 96 && e.keyCode <= 105) {
            return
          }

          e.preventDefault()
        }}
        label={label}
        value={meta.value}
        onChange={(e) => {
          helper.setValue(e.target.value)
        }}
        helperText={meta.error ?? helperText}
        error={Boolean(meta.error)}
        style={{ width: '100%' }}
        required={required}
      />
    </PhoneWrapper>
  )
}

export default PhoneInput

export interface Props {
  name: string
  subName?: string
  helperText?: string
  label: string
  required?: boolean
  index?: number
  prefixName: string
  prefixSubName?: string
}

interface Prefix {
  translations: { [name: string]: string }
  phonePrefix: string
}
