import {
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from '@material-ui/core'
import CancelIcon from '@material-ui/icons/Cancel'
import { useField } from 'formik'
import { Amount } from 'lib/types'
import useTranslation from 'next-translate/useTranslation'
import React, { FC } from 'react'
import { AmountWrapper } from '../lib/styles'
import { removeFromObjectArray } from '../lib/utils'
import NumberInput from './Basic/NumberInput'

const ProductAmountInput: FC<Props> = ({
  max,
  product,
  type,
  name,
  required,
}) => {
  const { t } = useTranslation()

  const [, meta, helpers] = useField<Amount[]>(name)

  const availableUnits = product?.units?.concat({
    id: '1',
    name: t('forms:unit'),
    baseAmount: 1,
  })

  if (!availableUnits || availableUnits?.length === 0) {
    return (
      <NumberInput
        max={max}
        index={0}
        name='amounts'
        subName='amount'
        label={t('forms:amount')}
        helperText={t('forms:amountHelper')}
        required={required}
        InputProps={
          type && type !== 'incoming'
            ? {
                startAdornment: (
                  <InputAdornment position='start'>-</InputAdornment>
                ),
              }
            : {}
        }
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
              required={required}
              label={t('forms:amount')}
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
              InputProps={
                type && type !== 'incoming'
                  ? {
                      startAdornment: (
                        <InputAdornment position='start'>-</InputAdornment>
                      ),
                    }
                  : {}
              }
            />
            <Select
              style={
                unit.id === '1'
                  ? { width: 'calc(30% + 45px' }
                  : { width: '30%' }
              }
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
              {availableUnits.map((innerUnit) => (
                <MenuItem
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
            {unit.id !== '1' && (
              <Tooltip title={t('common:remove')}>
                <IconButton
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
}
