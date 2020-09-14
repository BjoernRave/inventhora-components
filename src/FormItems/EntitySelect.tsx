import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
} from '@material-ui/core'
import { useField } from 'formik'
import { removeFromArray } from 'inventhora-utils'
import useTranslation from 'next-translate/useTranslation'
import React, { FC } from 'react'
import styled from 'styled-components'
import { Option } from '../lib/types'

const EntityField = styled.div`
  display: flex;
  flex-direction: column;
`

const Wrapper = styled(FormControl)`
  margin: 20px !important;

  @media (max-width: 767px) {
    width: 100% !important;
  }
`

const LabelWrapper = styled.div`
  display: flex;
  align-items: center;
`

const StyledLabel = styled(FormLabel)`
  && {
    color: ${({ theme }) => theme.palette.text.primary};
    font-size: 24px;
    font-weight: bolder;
  }

  .Mui-disabled {
    color: ${({ theme }) => theme.palette.text.disabled};
  }

  .Mui-focused {
    color: ${({ theme }) => theme.palette.primary.main};
  }
`

const EntitySelect: FC<Props> = ({
  label,
  helperText,
  values,
  name,
  disabled,
}) => {
  const { t } = useTranslation()
  const [field, meta, helper] = useField(name)

  const handleSelect = (value: string) => {
    if (meta.value.includes(value)) {
      helper.setValue(removeFromArray([value], meta.value))
    } else {
      helper.setValue([...meta.value, value])
    }
  }

  const handleSelectAll = () => {
    if (values.every((val) => meta.value.includes(val.value))) {
      helper.setValue(
        removeFromArray(
          values.map((val) => val.value),
          meta.value
        )
      )
    } else {
      const missingValues = values
        .filter((val) => !meta.value.includes(val.value))
        .map((val) => val.value)
      helper.setValue([...meta.value, ...missingValues])
    }
  }

  return (
    <Wrapper disabled={disabled}>
      <LabelWrapper>
        <StyledLabel>{label}</StyledLabel>
        <FormControlLabel
          style={{ marginLeft: '10px' }}
          label={
            values.every((val) => meta.value.includes(val.value))
              ? t('forms:unselectAll')
              : t('forms:selectAll')
          }
          control={
            <Checkbox
              onChange={handleSelectAll}
              checked={values.every((val) => meta.value.includes(val.value))}
            />
          }
        />
      </LabelWrapper>
      <FormGroup>
        {values.map((innerValue) => (
          <EntityField
            style={innerValue.helperText ? { margin: '10px 0' } : {}}
            key={innerValue.label}>
            <FormControlLabel
              label={
                <>
                  {innerValue.label}
                  {innerValue.helperText && (
                    <FormHelperText>{innerValue.helperText}</FormHelperText>
                  )}
                </>
              }
              control={
                <Checkbox
                  onChange={() => handleSelect(innerValue.value)}
                  checked={meta.value.includes(innerValue.value)}
                />
              }
            />
          </EntityField>
        ))}
      </FormGroup>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </Wrapper>
  )
}

export default EntitySelect

export interface Props {
  name: string
  label: string
  helperText?: string
  values: Option[]
  disabled?: boolean
}
