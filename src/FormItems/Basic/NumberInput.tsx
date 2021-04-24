import { BaseTextFieldProps, TextField } from '@material-ui/core'
import { useField } from 'formik'
import { generateSlug } from 'inventhora-utils'
import React, { ChangeEvent, FC } from 'react'

const NumberInput: FC<Props> = ({
  name,
  index,
  subName,
  helperText,
  variant = 'outlined',
  allowDecimals,
  onChange,
  error,
  max,
  ...rest
}) => {
  const formName =
    typeof index === 'number' && subName ? `${name}[${index}].${subName}` : name

  const [, meta, helper] = useField(formName)
  return (
    <TextField
      margin='dense'
      id={generateSlug(formName)}
      {...rest}
      value={meta.value || ''}
      onChange={(e) => {
        onChange && onChange(e as any)
        if (max && Number(e.target.value) > max) {
          return helper.setValue(max)
        }

        helper.setValue(e.target.value)
      }}
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

        if (
          allowDecimals &&
          (e.keyCode === 190 || e.keyCode === 188) &&
          meta?.value?.split &&
          meta?.value?.split('.')?.length < 2 &&
          meta?.value?.split(',')?.length < 2
        ) {
          return
        }
        e.preventDefault()
      }}
      inputMode='numeric'
      type='text'
      style={{ width: '100%' }}
      variant={variant as any}
      helperText={meta.error ?? helperText}
      error={Boolean(meta.error) || error}
    />
  )
}

export default NumberInput

export interface Props extends BaseTextFieldProps {
  name: string
  index?: number
  subName?: string
  InputProps?: any
  allowDecimals?: boolean
  max?: number
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}
