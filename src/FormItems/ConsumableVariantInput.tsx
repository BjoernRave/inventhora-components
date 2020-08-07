import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControl,
  FormHelperText,
  FormLabel,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { useField } from 'formik'
import React, { FC, useState } from 'react'
import styled from 'styled-components'
import { getObjectKeyByString } from '../lib/utils'
import Table from '../Table'

const AccordionsWrapper = styled.div`
  margin: 10px 0;
`

const SelectedValue = styled.span`
  margin: 0 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const OptionTitle = styled.span<{ error: boolean }>`
  font-size: 18px;
  font-weight: bold;
  color: ${({ error }) => error && '#f44336'};
`

const StyledContent = styled(AccordionSummary)`
  .MuiAccordionSummary-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`

const ConsumableVariantInput: FC<Props> = ({
  options,
  label,
  name,
  helperText,
  required,
  columns,
}) => {
  const [expanded, setExpanded] = useState(options.map((v, ind) => ind === 0))
  const [, meta, helpers] = useField(name)

  return (
    <FormControl
      error={Boolean(meta.error)}
      required={required}
      style={{ width: '100%' }}>
      <FormLabel>{label}</FormLabel>
      <AccordionsWrapper>
        {options.map((option, ind) => {
          const currentValue = meta.value.find((value) =>
            option.options.some((o) => o.id === value.inventoryId)
          )
          return (
            
          )
        })}
      </AccordionsWrapper>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  )
}

export default ConsumableVariantInput

interface Props {
  name: string
  label: string
  helperText?: string
  required?: boolean
  columns: { accessor: any; Header: string }[]
  options: {
    title: string
    amount: number
    options: any[]
  }[]
}
