import {
  Button,
  ButtonGroup as MuiButtonGroup,
  FormControl,
  FormHelperText,
  FormLabel,
} from '@material-ui/core'
import { useField } from 'formik'
import { generateSlug } from 'inventhora-utils'
import React, { FC } from 'react'
import styled from 'styled-components'
import { Option } from '../../lib/types'

const ButtonWrapper = styled(MuiButtonGroup)`
  margin: 10px 0;

  button {
    flex: 1;
    padding: 20px 0;
  }
`

const ButtonGroup: FC<Props> = ({
  options,
  value,
  name,
  subName,
  index,
  onClick,
  label,
  helperText,
  required,
  size = 'large',
}) => {
  const formName =
    typeof index === 'number' && subName ? `${name}[${index}].${subName}` : name

  const [, meta, helper] = useField(formName)

  const id = name ? generateSlug(name) : generateSlug(label)

  return (
    <FormControl required={required} fullWidth>
      <FormLabel htmlFor={id}>{label}</FormLabel>
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
                (formName && option.value === meta.value)
              }
              key={ind}
              onClick={() => {
                onClick && onClick(option.value)
                formName && helper.setValue(option.value)
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
  index?: number
  subName?: string
}
