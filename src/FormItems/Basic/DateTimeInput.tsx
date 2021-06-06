import { TextField } from '@material-ui/core'
import { DateTimePicker } from '@material-ui/pickers'
import { useField } from 'formik'
import { dateTimeFormat, generateSlug } from 'inventhora-utils'
import useTranslation from 'next-translate/useTranslation'
import React, { FC, ReactNode } from 'react'
import { Language } from '../../lib/types'
import DateTimeProvider from './DateTimeProvider'

const DateTimeInput: FC<Props> = ({
  name,
  index,
  subName,
  label,
  helperText,
  required,
  disabled,
  inputFormat,
}) => {
  const { lang } = useTranslation()

  const formName =
    typeof index === 'number' && subName ? `${name}[${index}].${subName}` : name

  const [, meta, helper] = useField(formName)

  return (
    <DateTimeProvider lang={lang as Language}>
      <DateTimePicker
        value={meta.value ?? null}
        onChange={(date) => helper.setValue(date || null)}
        disabled={disabled}
        clearable
        ampm={false}
        inputFormat={inputFormat ?? dateTimeFormat}
        label={label}
        renderInput={(props) => {
          return (
            <TextField
              margin='dense'
              {...props}
              variant='outlined'
              error={Boolean(meta.error)}
              helperText={meta.error ?? helperText}
              required={required}
              style={{ width: '100%' }}
              id={generateSlug(formName)}
            />
          )
        }}
      />
    </DateTimeProvider>
  )
}

export default DateTimeInput

export interface Props {
  name: string
  index?: number
  subName?: string
  label: ReactNode
  helperText?: ReactNode
  required?: boolean
  disabled?: boolean
  inputFormat?: string
}
