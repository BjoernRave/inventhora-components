import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from '@material-ui/core'
import { useField } from 'formik'
import { generateSlug } from 'inventhora-utils'
import React, { FC, ReactNode } from 'react'
import { Option } from '../../lib/types'

const SelectInput: FC<Props> = ({
  options,
  label,
  name,
  helperText,
  required,
  index,
  subName,
  onChange,
  disabledOptions,
  ...rest
}) => {
  const formName =
    typeof index === 'number' && subName ? `${name}[${index}].${subName}` : name

  const [field, meta] = useField(formName)

  return (
    <FormControl
      margin='dense'
      error={Boolean(meta.error)}
      required={required}
      variant='outlined'
      id={generateSlug(formName)}
      style={{ width: '100%' }}>
      <InputLabel margin='dense' id={`${generateSlug(formName)}-label`}>
        {label}
      </InputLabel>
      <Select
        margin='dense'
        variant='outlined'
        label={label}
        labelId={`${generateSlug(formName)}-label`}
        {...rest}
        {...field}
        onChange={(e) => {
          field.onChange(e)
          onChange && onChange(e.target.value)
        }}>
        <MenuItem value=''>
          <em>--</em>
        </MenuItem>
        {options.map(({ value, label }, ind) => (
          <MenuItem
            disabled={Boolean(
              disabledOptions?.find((option) => option === value)
            )}
            key={ind}
            value={value}>
            <span dangerouslySetInnerHTML={{ __html: label }} />
          </MenuItem>
        ))}
      </Select>
      <FormHelperText margin='dense' variant='outlined'>
        {meta.error ?? helperText}
      </FormHelperText>
    </FormControl>
  )
}

export default SelectInput

export interface Props extends SelectProps {
  options: Option[]
  name: string
  required?: boolean
  label: ReactNode
  helperText?: ReactNode
  index?: number
  subName?: string
  onChange?: (value: any) => void
  disabledOptions?: any[]
}
