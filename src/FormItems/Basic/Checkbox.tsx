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
  ...rest
}) => {
  const [field, meta] = useField(name)

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
  label: ReactNode
  helperText?: string
}
