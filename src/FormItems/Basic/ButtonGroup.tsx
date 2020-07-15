import {
  Button,
  ButtonGroup as MuiButtonGroup,
  FormControl,
  FormHelperText,
  FormLabel,
} from '@material-ui/core'
import { useField } from 'formik'
import React, { FC } from 'react'
import styled from 'styled-components'
import { Option } from '../../lib/types'
import { generateSlug } from '../../lib/utils'

const ButtonWrapper = styled(MuiButtonGroup)`
  margin: 10px;

  button {
    flex: 1;
  }
`

const ButtonGroup: FC<Props> = ({
  options,
  value,
  name,
  onClick,
  label,
  helperText,
  required,
  size = 'large',
}) => {
  const [, meta, helper] = useField(name)

  const id = name ? generateSlug(name) : generateSlug(label)

  return (
    <FormControl required={required} fullWidth component='fieldset'>
      <FormLabel component='legend' htmlFor={id}>
        {label}
      </FormLabel>
      <ButtonWrapper
        aria-label={label}
        variant='contained'
        size={size}
        color='primary'
        id={id}>
        {options.map((option, ind) => {
          return (
            <Button
              disabled={
                (value && value === option.value) ||
                (name && option.value === meta.value)
              }
              key={ind}
              onClick={() => {
                onClick && onClick(option.value)
                name && helper.setValue(option.value)
              }}>
              {option.label}
            </Button>
          )
        })}
      </ButtonWrapper>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  )
}

export default ButtonGroup

interface Props {
  options: Option[]
  name?: string
  onClick?: (value: string) => void
  value?: string
  label: string
  helperText?: string
  required?: boolean
  size?: 'small' | 'medium' | 'large'
}