import {
  Chip,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  InputProps,
  OutlinedInput,
  Tooltip,
} from '@material-ui/core'
import PlusIcon from '@material-ui/icons/AddCircle'
import { useField } from 'formik'
import useTranslation from 'next-translate/useTranslation'
import React, { FC, ReactNode, useState } from 'react'
import styled from 'styled-components'
import { generateSlug } from '../../lib/utils'

const StyledButton = styled(IconButton)<{ hasinput: boolean }>`
  ${({ hasinput }) => hasinput && 'color: #3c9f80 !important'};
  padding: 0;
`

const TextListInput: FC<Props> = ({
  name,
  index,
  label,
  subName,
  helperText,
  style,
  required,
  error,
  ...rest
}) => {
  const { t } = useTranslation()
  const [input, setInput] = useState('')

  const formName =
    typeof index === 'number' && subName ? `${name}[${index}].${subName}` : name

  const [, meta, helper] = useField(formName)

  const value = meta.value ?? []

  return (
    <>
      <FormControl
        error={Boolean(meta.error) || error}
        required={required}
        variant='outlined'
        style={style ?? { width: '100%' }}>
        <InputLabel variant='outlined' htmlFor={generateSlug(formName)}>
          {label}
        </InputLabel>
        <OutlinedInput
          margin='none'
          label={label}
          {...rest}
          endAdornment={
            <InputAdornment position='end'>
              <Tooltip
                open={Boolean(input)}
                placement='right'
                arrow
                title={t('forms:add')}>
                <StyledButton
                  hasinput={Boolean(input)}
                  onClick={() => {
                    if (input) {
                      helper.setValue([...value, input])
                      setInput('')
                    }
                  }}>
                  <PlusIcon />
                </StyledButton>
              </Tooltip>
            </InputAdornment>
          }
          type='text'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          id={generateSlug(formName)}
          onKeyDown={(e) => {
            if (e.keyCode === 13 && Boolean(input)) {
              e.stopPropagation()
              helper.setValue([...value, input])
              setInput('')
            }
          }}
        />
        <div>
          {value.map((val, ind) => (
            <Chip
              color='primary'
              style={{ margin: '5px' }}
              onDelete={() => {
                const newArray = Array.from(value)
                newArray.splice(value.indexOf(val), 1)
                helper.setValue(newArray)
              }}
              key={ind}
              label={val}
            />
          ))}
        </div>
        <FormHelperText variant='outlined'>
          {meta.error ?? helperText}
        </FormHelperText>
      </FormControl>
    </>
  )
}

export default TextListInput

export interface Props extends InputProps {
  name: string
  index?: number
  subName?: string
  label: ReactNode
  helperText?: ReactNode
  required?: boolean
}
