import {
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from '@material-ui/core'
import CancelIcon from '@material-ui/icons/Cancel'
import { useField } from 'formik'
import { generateSlug, removeFromObjectArray } from 'inventhora-utils'
import useTranslation from 'next-translate/useTranslation'
import React, { FC } from 'react'
import styled from 'styled-components'
import { Amount } from '../lib/types'
import NumberInput from './Basic/NumberInput'

const AmountWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  > div:first-child {
    width: 100%;
  }

  > div:nth-child(2) {
    width: 20%;
    margin-left: 10px;
  }
`

const ProductAmountInput: FC<Props> = ({
  max,
  product,
  type,
  name,
  required,
  label,
  helperText,
}) => {
  const { t } = useTranslation()

  const [, meta, helpers] = useField<Amount[]>(name)

  const availableUnits = product?.units?.concat({
    id: '1',
    name: t('forms:unit'),
    baseAmount: 1,
  })

  if (!availableUnits || availableUnits?.length === 1) {
    return (
      <NumberInput
        max={max}
        index={0}
        name='amounts'
        subName='amount'
        label={label}
        helperText={helperText}
        required={required}
      />
    )
  }

  const currentAmount = meta.value.reduce(
    (prev, next) => prev + next.baseAmount * Number(next.amount),
    0
  )

  return (
    <>
      {meta.value.map((unit, index) => {
        return (
          <AmountWrapper key={index}>
            <TextField
              id={`${generateSlug(name)}-${index}`}
              label={label}
              error={Boolean(meta.error)}
              helperText={meta.error ?? helperText}
              required={required}
              value={unit.amount}
              onChange={(e) => {
                const newUnits = Array.from(meta.value)

                const currentValue = Number(
                  meta.value.find((am) => am.id === unit.id).amount
                )

                if (
                  type === 'outgoing' &&
                  currentAmount -
                    currentValue +
                    Number(e.target.value) * unit.baseAmount >
                    max
                ) {
                  newUnits[index].amount = String(
                    Math.floor((max - currentAmount) / unit.baseAmount) +
                      currentValue
                  )
                } else {
                  newUnits[index].amount = e.target.value
                }

                helpers.setValue(newUnits)
              }}
              onKeyDown={(e) => {
                //delete, tab, etc
                if ([8, 9, 37, 39].includes(e.keyCode)) {
                  return
                }

                //number keys
                if (e.keyCode >= 48 && e.keyCode <= 57) {
                  return
                }

                //numpad
                if (e.keyCode >= 96 && e.keyCode <= 105) {
                  return
                }

                e.preventDefault()
              }}
              inputMode='numeric'
              type='text'
              style={{ width: '100%' }}
              variant='outlined'
            />
            {availableUnits.length > 1 && (
              <FormControl
                style={
                  unit.id === '1'
                    ? { width: 'calc(30% + 45px' }
                    : { width: '30%' }
                }
                error={Boolean(meta.error)}
                variant='outlined'>
                <InputLabel id={`unit-label`}>{t('forms:unit')}</InputLabel>
                <Select
                  label={t('forms:unit')}
                  labelId={`unit-label`}
                  value={unit.id}
                  onChange={(e) =>
                    helpers.setValue([
                      ...meta.value,
                      {
                        ...availableUnits.find((u) => u.id === e.target.value),
                        amount: '',
                      },
                    ])
                  }
                  variant='outlined'>
                  {availableUnits.map((innerUnit, ind) => (
                    <MenuItem
                      key={ind}
                      disabled={Boolean(
                        meta.value.find((u) => u.id === innerUnit.id)
                      )}
                      value={innerUnit.id}>
                      {`${innerUnit.name} (${innerUnit.baseAmount} ${t(
                        'forms:units'
                      )})`}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText variant='outlined'>
                  {t('forms:unitHelper')}
                </FormHelperText>
              </FormControl>
            )}
            {unit.id !== '1' && (
              <Tooltip title={t('common:remove')}>
                <IconButton
                  style={{ marginBottom: 19 }}
                  onClick={() =>
                    helpers.setValue(
                      removeFromObjectArray(meta.value, 'id', unit.id)
                    )
                  }>
                  <CancelIcon />
                </IconButton>
              </Tooltip>
            )}
          </AmountWrapper>
        )
      })}
    </>
  )
}

export default ProductAmountInput

export interface Props {
  max: number
  type: string
  product: Partial<any>
  name: string
  required?: boolean
  label: string
  helperText?: string
}
