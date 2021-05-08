import { InputAdornment } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import { useField } from 'formik'
import { generateSlug } from 'inventhora-utils'
import useTranslation from 'next-translate/useTranslation'
import React, { FC } from 'react'
import styled from 'styled-components'

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

  const [, meta, helper] = useField(formName)

  const [, prefixMeta, prefixHelper] = useField(prefixFormName)

  return (
    <PhoneWrapper id={`${generateSlug(formName)}-group`}>
      <TextField
        style={{ width: '170px', alignSelf: 'flex-end', marginRight: '20px' }}
        required={required}
        value={prefixMeta.value}
        onChange={(e) => prefixHelper.setValue(e.target.value)}
        fullWidth
        id={generateSlug(prefixFormName)}
        label={t('forms:prefix')}
        InputProps={{
          startAdornment: <InputAdornment position='start'>+</InputAdornment>,
        }}
        error={Boolean(meta.error)}
        inputMode='numeric'
        type='text'
        variant='outlined'
        margin='dense'
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
      />
      <TextField
        id={generateSlug(formName)}
        inputMode='numeric'
        type='text'
        variant='outlined'
        margin='dense'
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
