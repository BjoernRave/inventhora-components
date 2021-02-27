import {
  BaseTextFieldProps,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
} from '@material-ui/core'
import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import { useField } from 'formik'
import { generateSlug } from 'inventhora-utils'
import useTranslation from 'next-translate/useTranslation'
import React, { FC, useState } from 'react'

const PasswordInput: FC<Props> = ({
  name,
  index,
  subName,
  helperText,
  error,
  variant = 'outlined',
  ...rest
}) => {
  const { t } = useTranslation()
  const formName =
    typeof index === 'number' && subName ? `${name}[${index}].${subName}` : name
  const [showPassword, setShowPassword] = useState(false)
  const [field, meta] = useField(formName)

  return (
    <TextField
      margin='dense'
      id={generateSlug(formName)}
      {...rest}
      {...field}
      style={{ width: '100%' }}
      type={showPassword ? 'text' : 'password'}
      variant={variant as any}
      helperText={meta.error ?? helperText}
      error={Boolean(meta.error) || error}
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <Tooltip
              title={
                showPassword
                  ? t('common:hidePassword')
                  : t('common:showPassword')
              }>
              <IconButton
                tabIndex={-1}
                aria-label='toggle password visibility'
                onClick={() => setShowPassword(!showPassword)}
                onMouseDown={(e) => e.preventDefault()}>
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </Tooltip>
          </InputAdornment>
        ),
      }}
    />
  )
}

export default PasswordInput

export interface Props extends BaseTextFieldProps {
  name: string
  index?: number
  subName?: string
}
