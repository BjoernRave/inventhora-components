import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from '@material-ui/core';
import { useField } from 'formik';
import React, { FC } from 'react';
import { Option } from '../../lib/types';
import { generateSlug } from '../../lib/utils';

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
    typeof index === 'number' && subName
      ? `${name}[${index}].${subName}`
      : name;

  const [field, meta] = useField(formName);

  return (
    <FormControl
      variant="outlined"
      id={generateSlug(formName)}
      style={{ width: '100%' }}
    >
      <InputLabel
        error={Boolean(meta.error)}
        required={required}
        id={`${generateSlug(formName)}-label`}
      >
        {label}
      </InputLabel>
      <Select
        margin="none"
        variant="outlined"
        label={label}
        required={required}
        error={Boolean(meta.error)}
        labelId={`${generateSlug(formName)}-label`}
        {...rest}
        {...field}
        onChange={(e) => {
          field.onChange(e);
          onChange && onChange(e.target.value);
        }}
      >
        {options.map(({ value, label }, ind) => (
          <MenuItem
            disabled={Boolean(
              disabledOptions?.find((option) => option === value)
            )}
            key={ind}
            value={value}
          >
            <span dangerouslySetInnerHTML={{ __html: label }} />
          </MenuItem>
        ))}
      </Select>
      <FormHelperText variant="outlined" error={Boolean(meta.error)}>
        {meta.error ?? helperText}
      </FormHelperText>
    </FormControl>
  );
};

export default SelectInput;

export interface Props extends SelectProps {
  options: Option[];
  name: string;
  required?: boolean;
  label: string;
  helperText?: string;
  index?: number;
  subName?: string;
  onChange?: (value: any) => void;
  disabledOptions?: any[];
}
