import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useField } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { countries } from '../lib/countries.json';
import { generateSlug } from '../lib/utils';

const PhoneWrapper = styled.div`
  display: inline-flex !important;
  width: 100% !important;
  flex-direction: row !important;
`;

const PhoneInput: FC<Props> = ({
  name,
  helperText,
  label,
  required,
  index,
  subName,
}) => {
  const { t } = useTranslation();
  const formName =
    typeof index === 'number' && subName
      ? `${name}[${index}].${subName}`
      : name;

  const { lang } = useTranslation();
  const [prefix, setPrefix] = useState<Prefix>(null);
  const [text, setText] = useState('');

  const [, meta, helper] = useField(formName);

  return (
    <PhoneWrapper id={`${generateSlug(formName)}-group`}>
      <Autocomplete
        style={{ width: '170px', alignSelf: 'flex-end', marginRight: '20px' }}
        value={prefix}
        onChange={(e, value: Prefix) => {
          setPrefix(value || null);
          helper.setValue(value ? `+${value?.phonePrefix}${text}` : text);
        }}
        getOptionLabel={(option) => (option ? `+${option.phonePrefix}` : '')}
        renderOption={(option) =>
          option
            ? `+${option.phonePrefix} (${
                option.translations[lang] ?? option.translations.en
              })`
            : ''
        }
        options={countries}
        renderInput={(params) => (
          <TextField
            required={required}
            {...params}
            fullWidth
            label={t('forms:prefix')}
            placeholder="+"
            error={Boolean(meta.error)}
            variant="outlined"
          />
        )}
      />
      <TextField
        id={formName}
        variant="outlined"
        label={label}
        value={
          prefix ? meta.value.replace(`+${prefix.phonePrefix}`, '') : meta.value
        }
        onChange={(e) => {
          setText(e.target.value);
          helper.setValue(
            prefix ? `+${prefix.phonePrefix}${e.target.value}` : e.target.value
          );
        }}
        helperText={meta.error ?? helperText}
        error={Boolean(meta.error)}
        style={{ width: '100%' }}
        required={required}
      />
    </PhoneWrapper>
  );
};

export default PhoneInput;

export interface Props {
  name: string;
  subName?: string;
  helperText?: string;
  label: string;
  required?: boolean;
  index?: number;
}

interface Prefix {
  translations: { [name: string]: string };
  phonePrefix: string;
}
