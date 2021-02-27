import { TextField } from '@material-ui/core'
import { DatePicker } from '@material-ui/pickers'
import { useField } from 'formik'
import { dateFormat, generateSlug } from 'inventhora-utils'
import useTranslation from 'next-translate/useTranslation'
import React, { FC, ReactNode } from 'react'
import { Language } from '../../lib/types'
import DateTimeProvider from './DateTimeProvider'

const DateInput: FC<Props> = ({
  name,
  index,
  subName,
  label,
  helperText,
  required,
  disabled,
}) => {
  const { lang } = useTranslation()

  const formName =
    typeof index === 'number' && subName ? `${name}[${index}].${subName}` : name

  const [, meta, helper] = useField(formName)

  return (
    <DateTimeProvider lang={lang as Language}>
      <DatePicker
        disabled={disabled}
        value={meta.value ?? null}
        onChange={(date: any) => {
          if (!date) {
            return helper.setValue(null)
          }

          date.setHours(0)
          date.setMinutes(0)
          date.setSeconds(0)
          date.setMilliseconds(0)

          helper.setValue(date)
        }}
        clearable
        inputFormat={dateFormat}
        label={label}
        renderInput={(props) => (
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
        )}
      />
    </DateTimeProvider>
  )
}

export default DateInput

export interface Props {
  name?: string
  index?: number
  subName?: string
  label: ReactNode
  helperText?: ReactNode
  required?: boolean
  disabled?: boolean
}
