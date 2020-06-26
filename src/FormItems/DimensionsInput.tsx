import { FormGroup, FormLabel, InputAdornment } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React, { FC } from 'react'
import { SameLine } from '../lib/styles'
import NumberInput from './Basic/NumberInput'

const DimensionsInput: FC<Props> = ({ lengthUnit, name, subName, index }) => {
  const { t } = useTranslation()

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
          name={name}
          label={t('table:height')}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>{lengthUnit}.</InputAdornment>
            ),
          }}
        />
        <NumberInput
          index={index}
          allowDecimals
          subName={typeof index === 'number' && `${subName}.width`}
          name={name}
          label={t('table:width')}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>{lengthUnit}.</InputAdornment>
            ),
          }}
        />
        <NumberInput
          index={index}
          allowDecimals
          subName={typeof index === 'number' && `${subName}.depth`}
          name={name}
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
