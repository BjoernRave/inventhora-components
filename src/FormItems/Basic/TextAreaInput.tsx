import { BaseTextFieldProps, TextField } from '@material-ui/core'
import { useField } from 'formik'
import { generateSlug } from 'inventhora-utils'
import React, { FC } from 'react'

const TextAreaInput: FC<Props> = ({
  name,
  subName,
  index,
  helperText,
  error,
  variant = 'outlined',
  rows = 4,
  ...rest
}) => {
  const formName =
    typeof index === 'number' && subName ? `${name}[${index}].${subName}` : name

  const [field, meta] = useField(formName)

  return (
    <TextField
      id={generateSlug(formName)}
      {...rest}
      {...field}
      type='text'
      margin='dense'
      style={{ width: '100%' }}
      multiline
      rows={String(rows)}
      variant={variant as any}
      helperText={meta.error ?? helperText}
      error={Boolean(meta.error) || error}
    />
  )
}

export default TextAreaInput

export interface Props extends BaseTextFieldProps {
  name: string
  subName?: string
  index?: number
  rows?: number
}
