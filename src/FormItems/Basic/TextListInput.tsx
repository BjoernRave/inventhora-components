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
} from '@material-ui/core';
import PlusIcon from '@material-ui/icons/AddCircle';
import { useField } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { generateSlug } from '../../lib/utils';

const StyledButton = styled(IconButton)<{ hasInput: boolean }>`
  ${({ hasInput }) => hasInput && 'color: #3c9f80 !important'};
`;

const TextListInput: FC<Props> = ({
  name,
  index,
  label,
  subName,
  helperText,
  style,
  ...rest
}) => {
  const { t } = useTranslation();
  const [input, setInput] = useState('');

  const formName =
    typeof index === 'number' && subName
      ? `${name}[${index}].${subName}`
      : name;

  const [, meta, helper] = useField(formName);

  const value = meta.value ?? [];

  return (
    <>
      <FormControl
        variant="outlined"
        id={generateSlug(formName)}
        style={style ?? { width: '100%' }}
      >
        <InputLabel
          variant="outlined"
          error={Boolean(meta.error)}
          htmlFor={`${subName ?? name}-input`}
        >
          {label}
        </InputLabel>
        <OutlinedInput
          margin="none"
          label={label}
          {...rest}
          endAdornment={
            <InputAdornment position="end">
              <Tooltip
                open={Boolean(input)}
                placement="right"
                arrow
                title={t('forms:add')}
              >
                <StyledButton
                  hasInput={Boolean(input)}
                  onClick={() => {
                    if (input) {
                      helper.setValue([...value, input]);
                      setInput('');
                    }
                  }}
                >
                  <PlusIcon />
                </StyledButton>
              </Tooltip>
            </InputAdornment>
          }
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          error={Boolean(meta.error)}
          id={`${subName ?? name}-input`}
          onKeyDown={(e) => {
            if (e.keyCode === 13 && Boolean(input)) {
              e.stopPropagation();
              helper.setValue([...value, input]);
              setInput('');
            }
          }}
        />
        <div>
          {value.map((val, ind) => (
            <Chip
              color="primary"
              style={{ margin: '5px' }}
              onDelete={() => {
                const newArray = Array.from(value);
                newArray.splice(value.indexOf(val), 1);
                helper.setValue(newArray);
              }}
              key={ind}
              label={val}
            />
          ))}
        </div>
        <FormHelperText variant="outlined" error={Boolean(meta.error)}>
          {meta.error ?? helperText}
        </FormHelperText>
      </FormControl>
    </>
  );
};

export default TextListInput;

export interface Props extends InputProps {
  name: string;
  index?: number;
  subName?: string;
  label: string;
  helperText?: string;
}