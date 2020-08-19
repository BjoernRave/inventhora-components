import { BaseTextFieldProps, TextField } from '@material-ui/core'
import { useField } from 'formik'
import React, { FC } from 'react'
import { generateSlug } from '../../lib/utils'

const TextInput: FC<Props> = ({
  name,
  index,
  subName,
  helperText,
  variant = 'outlined',
  style,
  onChange,
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
      margin='none'
      onChange={(e) => {
        field.onChange(e)
        onChange && onChange(e)
      }}
      style={style ?? { width: '100%' }}
      variant={variant as any}
      helperText={meta.error ?? helperText}
      error={Boolean(meta.error)}
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
