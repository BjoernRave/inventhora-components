import { BaseTextFieldProps, TextField } from '@material-ui/core'
import { useField } from 'formik'
import { generateSlug } from 'inventhora-utils'
import React, { FC } from 'react'

const TextInput: FC<Props> = ({
  name,
  index,
  subName,
  helperText,
  variant = 'outlined',
  style,
  onChange,
  error,
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
      onChange={(e) => {
        field.onChange(e)
        onChange && onChange(e)
      }}
      style={style ?? { width: '100%' }}
      variant={variant as any}
      helperText={meta.error ?? helperText}
      error={Boolean(meta.error) || error}
    />
  )
}

export default TextInput

export interface Props extends BaseTextFieldProps {
  name: string
  index?: number
  subName?: string
  InputProps?: any
  onChange?: any
}
