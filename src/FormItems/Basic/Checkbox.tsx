import {
  Checkbox as MuiCheckbox,
  CheckboxProps,
  FormControlLabel,
  FormHelperText,
} from '@material-ui/core'
import { useField } from 'formik'
import { generateSlug } from 'inventhora-utils'
import React, { FC, ReactNode } from 'react'

const Checkbox: FC<Props> = ({
  name,
  label,
  helperText,
  required,
  index,
  subName,
  ...rest
}) => {
  const formName =
    typeof index === 'number' && subName ? `${name}[${index}].${subName}` : name
  const [field, meta] = useField(formName)

  return (
    <FormControlLabel
      id={generateSlug(name)}
      style={{ alignSelf: 'start', margin: '10px 0' }}
      control={<MuiCheckbox {...rest} checked={field.value} {...field} />}
      label={
        <>
          {label}
          {required ? ' *' : ''}
          {(helperText || meta.error) && (
            <FormHelperText error={Boolean(meta.error)}>
              {meta.error ?? helperText}
            </FormHelperText>
          )}
        </>
      }
    />
  )
}

export default Checkbox

export interface Props extends CheckboxProps {
  name: string
  index?: number
  subName?: string
  label: ReactNode
  helperText?: string
}
