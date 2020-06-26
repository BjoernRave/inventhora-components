import {
  Checkbox as MuiCheckbox,
  CheckboxProps,
  FormControlLabel,
  FormHelperText,
} from '@material-ui/core';
import { useField } from 'formik';
import React, { FC } from 'react';
import { generateSlug } from '../../lib/utils';

const Checkbox: FC<Props> = ({ name, label, helperText, ...rest }) => {
  const [field] = useField(name);

  return (
    <FormControlLabel
      id={generateSlug(name)}
      style={{ alignSelf: 'start', margin: '10px 0' }}
      control={<MuiCheckbox {...rest} checked={field.value} {...field} />}
      label={
        <>
          {label}
          {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </>
      }
    />
  );
};

export default Checkbox;

export interface Props extends CheckboxProps {
  name: string;
  label: string;
  helperText?: string;
}
