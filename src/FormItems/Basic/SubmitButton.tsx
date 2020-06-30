import { Button, CircularProgress } from '@material-ui/core'
import React, { FC } from 'react'

const SubmitButton: FC<Props> = ({
  loading,
  children,
  disabled,
  onClick,
  size,
  style,
  startIcon,
  type = 'submit',
  variant = 'contained',
  color = 'primary',
  ...rest
}) => {
  return (
    <Button
      {...rest}
      disabled={disabled || loading}
      variant={variant}
      size={size || 'medium'}
      color={color as any}
      style={style}
      onClick={onClick}
      startIcon={startIcon}
      type={type}>
      {loading ? <CircularProgress size={24} /> : children}
    </Button>
  )
}

export default SubmitButton

type ButtonSize = 'small' | 'medium' | 'large'

export interface Props {
  loading?: boolean
  disabled?: boolean
  onClick?: () => void
  size?: ButtonSize
  style?: any
  startIcon?: any
  variant?: 'text' | 'outlined' | 'contained'
  type?: 'submit' | 'button' | 'reset'
  color?: string
}
