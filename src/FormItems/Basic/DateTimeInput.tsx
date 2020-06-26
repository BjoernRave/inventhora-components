import { TextField } from '@material-ui/core';
import { DateTimePicker } from '@material-ui/pickers';
import { useField } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import React, { FC } from 'react';
import { Language } from '../../lib/types';
import { dateTimeFormat, generateSlug } from '../../lib/utils';
import DateTimeProvider from './DateTimeProvider';

const DateTimeInput: FC<Props> = ({
  name,
  index,
  subName,
  label,
  helperText,
  required,
  disabled,
}) => {
  const { lang } = useTranslation();

  const formName =
    typeof index === 'number' && subName
      ? `${name}[${index}].${subName}`
      : name;

  const [, meta, helper] = useField(formName);

  return (
    <DateTimeProvider lang={lang as Language}>
      <DateTimePicker
        value={meta.value ?? null}
        onChange={(date) => helper.setValue(date || null)}
        disabled={disabled}
        clearable
        ampm={false}
        inputFormat={dateTimeFormat}
        label={label}
        renderInput={(props) => {
          return (
            <TextField
              margin="none"
              {...props}
              variant="outlined"
              error={Boolean(meta.error)}
              helperText={meta.error ?? helperText}
              required={required}
              style={{ width: '100%' }}
              id={generateSlug(formName)}
            />
          );
        }}
      />
    </DateTimeProvider>
  );
};

export default DateTimeInput;

export interface Props {
  name: string;
  index?: number;
  subName?: string;
  label: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
}
