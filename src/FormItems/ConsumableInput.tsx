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
import { generateSlug, getObjectKeyByString } from 'inventhora-utils'
import React, { FC, useState } from 'react'
import styled from 'styled-components'
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

const ConsumableInput: FC<Props> = ({
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
      <FormLabel htmlFor={generateSlug(name)}>{label}</FormLabel>
      <AccordionsWrapper id={generateSlug(name)}>
        {options.map((option, ind) => {
          const currentValue = meta.value.find((value) =>
            option.options.some((o) => o.id === value.inventoryId)
          )
          return (
            <Accordion
              key={ind}
              expanded={expanded[ind]}
              onChange={() => {
                const newArray = Array.from(expanded)

                newArray[ind] = !newArray[ind]

                setExpanded(newArray)
              }}>
              <StyledContent expandIcon={<ExpandMoreIcon />}>
                <OptionTitle
                  error={Boolean(meta.error) && Boolean(meta.error[ind])}>
                  {option.title}
                </OptionTitle>
                <div style={{ display: 'flex' }}>
                  {Boolean(currentValue) &&
                    columns.map((column) => (
                      <SelectedValue>
                        <span style={{ fontWeight: 'bold', marginBottom: 10 }}>
                          {column.Header}
                        </span>
                        {typeof column.accessor === 'string'
                          ? getObjectKeyByString(currentValue, column.accessor)
                          : column.accessor(currentValue)}
                      </SelectedValue>
                    ))}
                </div>
                {Boolean(meta.error) && Boolean(meta.error[ind]) && (
                  <span style={{ color: '#f44336' }}>{meta.error[ind]}</span>
                )}
                <div />
              </StyledContent>
              <AccordionDetails>
                <Table
                  style={{ margin: '10px 0' }}
                  maxHeight={400}
                  onRowClick={(row: any) => {
                    if (Boolean(currentValue)) {
                      const newValueArray = Array.from(meta.value)

                      newValueArray.splice(
                        newValueArray.findIndex((val) =>
                          Boolean(
                            option.options.find(
                              (o) => o.id === (val as any).inventoryId
                            )
                          )
                        ),
                        1
                      )

                      helpers.setValue([
                        ...newValueArray,
                        {
                          inventoryId: row.original.id,
                          amount: option.amount,
                          product: row.original.product,
                        },
                      ])
                    } else {
                      helpers.setValue([
                        ...meta.value,
                        {
                          inventoryId: row.original.id,
                          amount: option.amount,
                          product: row.original.product,
                        },
                      ])
                    }

                    const newArray = Array.from(expanded)

                    newArray[ind] = false

                    if (newArray.length > ind + 1) {
                      newArray[ind + 1] = true
                    }
                    setExpanded(newArray)
                  }}
                  data={option.options}
                  columns={columns}
                />
              </AccordionDetails>
            </Accordion>
          )
        })}
      </AccordionsWrapper>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  )
}

export default ConsumableInput

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
