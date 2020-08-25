import {
  FormControl,
  FormHelperText,
  FormLabel,
  InputAdornment,
} from '@material-ui/core'
import { useField } from 'formik'
import useTranslation from 'next-translate/useTranslation'
import React, { FC } from 'react'
import { SameLine } from '../lib/styles'
import { generateSlug } from '../lib/utils'
import NumberInput from './Basic/NumberInput'

const DimensionsInput: FC<Props> = ({
  lengthUnit,
  name,
  subName,
  index,
  required,
  helperText,
}) => {
  const { t } = useTranslation()

  const formName =
    typeof index === 'number' && subName ? `${name}[${index}].${subName}` : name

  const [, meta, helper] = useField(formName)

  return (
    <FormControl
      required={required}
      error={Boolean(meta.error)}
      style={{ width: '100%' }}>
      <FormLabel htmlFor={generateSlug(name)} style={{ marginBottom: 20 }}>
        {t('table:dimensions')}
      </FormLabel>
      <SameLine id={generateSlug(name)}>
        <NumberInput
          allowDecimals
          error={Boolean(meta.error)}
          index={index}
          subName={typeof index === 'number' && `${subName}.height`}
          name={typeof index === 'number' ? name : `${name}.height`}
          onChange={(e) =>
            e.target.value === '' &&
            helper.setValue({ ...meta.value, depth: '', width: '' })
          }
          label={t('table:height')}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>{lengthUnit}.</InputAdornment>
            ),
          }}
        />
        <NumberInput
          index={index}
          error={Boolean(meta.error)}
          disabled={!Boolean(meta?.value?.height)}
          allowDecimals
          onChange={(e) =>
            e.target.value === '' &&
            helper.setValue({ ...meta.value, depth: '' })
          }
          subName={typeof index === 'number' && `${subName}.width`}
          name={typeof index === 'number' ? name : `${name}.width`}
          label={t('table:width')}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>{lengthUnit}.</InputAdornment>
            ),
          }}
        />
        <NumberInput
          index={index}
          error={Boolean(meta.error)}
          disabled={!Boolean(meta?.value?.width)}
          allowDecimals
          subName={typeof index === 'number' && `${subName}.depth`}
          name={typeof index === 'number' ? name : `${name}.depth`}
          label={t('table:depth')}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>{lengthUnit}.</InputAdornment>
            ),
          }}
        />
      </SameLine>
      {(meta.error || helperText) && (
        <FormHelperText>{meta.error ?? helperText}</FormHelperText>
      )}
    </FormControl>
  )
}

export default DimensionsInput

export interface Props {
  lengthUnit: string
  name: string
  subName?: string
  index?: number
  required?: boolean
  helperText?: string
}
