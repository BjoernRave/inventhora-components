import { FormGroup, FormLabel, InputAdornment } from '@material-ui/core'
import { useField } from 'formik'
import useTranslation from 'next-translate/useTranslation'
import React, { FC } from 'react'
import { SameLine } from '../lib/styles'
import NumberInput from './Basic/NumberInput'

const DimensionsInput: FC<Props> = ({ lengthUnit, name, subName, index }) => {
  const { t } = useTranslation()

  const [, meta, helper] = useField(name)

  return (
    <FormGroup style={{ width: '100%' }}>
      <FormLabel style={{ marginBottom: 20 }}>
        {t('table:dimensions')}
      </FormLabel>
      <SameLine>
        <NumberInput
          allowDecimals
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
    </FormGroup>
  )
}

export default DimensionsInput

export interface Props {
  lengthUnit: string
  name: string
  subName?: string
  index?: number
}
