import { FormControl, FormLabel, InputAdornment } from '@material-ui/core'
import { useFormikContext } from 'formik'
import { generateSlug } from 'inventhora-utils'
import useTranslation from 'next-translate/useTranslation'
import React, { FC } from 'react'
import { SameLine } from '../lib/styles'
import NumberInput from './Basic/NumberInput'

const DimensionsInput: FC<Props> = ({
  lengthUnit,
  name,
  index,
  required,
  helperText,
}) => {
  const { t } = useTranslation()

  const { values, setFieldValue } = useFormikContext<any>()

  return (
    <FormControl required={required} style={{ width: '100%' }}>
      <FormLabel htmlFor={generateSlug(name)} style={{ marginBottom: 20 }}>
        {t('table:dimensions')}
      </FormLabel>
      <SameLine id={generateSlug(name)}>
        <NumberInput
          allowDecimals
          index={index}
          subName={typeof index === 'number' && 'height'}
          name={typeof index === 'number' ? name : 'height'}
          onChange={(e) => {
            if (e.target.value === '') {
              setFieldValue(
                typeof index === 'number' ? `${name}.${index}.depth` : 'depth',
                ''
              )
              setFieldValue(
                typeof index === 'number' ? `${name}.${index}.width` : 'width',
                ''
              )
            }
          }}
          label={t('table:height')}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>{lengthUnit}.</InputAdornment>
            ),
          }}
        />
        <NumberInput
          index={index}
          disabled={
            !Boolean(
              typeof index === 'number'
                ? values[name][index].height
                : values.height
            )
          }
          allowDecimals
          onChange={(e) => {
            if (e.target.value === '') {
              setFieldValue(
                typeof index === 'number' ? `${name}.${index}.depth` : 'depth',
                ''
              )
            }
          }}
          subName={typeof index === 'number' && 'width'}
          name={typeof index === 'number' ? name : 'width'}
          label={t('table:width')}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>{lengthUnit}.</InputAdornment>
            ),
          }}
        />
        <NumberInput
          index={index}
          disabled={
            !Boolean(
              typeof index === 'number'
                ? values[name][index].width
                : values.width
            )
          }
          allowDecimals
          subName={typeof index === 'number' && 'depth'}
          name={typeof index === 'number' ? name : 'depth'}
          label={t('table:depth')}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>{lengthUnit}.</InputAdornment>
            ),
          }}
        />
      </SameLine>
    </FormControl>
  )
}

export default DimensionsInput

export interface Props {
  lengthUnit: string
  name: string
  index?: number
  required?: boolean
  helperText?: string
}
