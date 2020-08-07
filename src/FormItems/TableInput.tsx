import {
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  Paper,
  Tooltip,
} from '@material-ui/core'
import CancelIcon from '@material-ui/icons/Cancel'
import { useField } from 'formik'
import useTranslation from 'next-translate/useTranslation'
import React, { FC, useEffect } from 'react'
import styled from 'styled-components'
import { getErrorMessage, getObjectKeyByString } from '../lib/utils'
import Table from '../Table'

const SelectedWrapper = styled(Paper)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 10px 0;
  padding: 5px;
`

const SelectedText = styled.span`
  margin: 0 10px;
  font-size: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const TableInput: FC<Props> = ({
  name,
  required,
  label,
  helperText,
  options,
  columns,
}) => {
  const { t } = useTranslation()
  const [, meta, helpers] = useField(name)

  useEffect(() => {
    if (options.length === 1) {
      helpers.setValue(options[1])
    }
  }, [])

  return (
    <FormControl
      style={{ width: '100%' }}
      error={Boolean(meta.error)}
      required={required}>
      <FormLabel>{label}</FormLabel>
      {meta.value ? (
        <SelectedWrapper>
          {columns.map((column) => (
            <SelectedText>
              <span style={{ fontWeight: 'bold', marginBottom: 10 }}>
                {column.Header}
              </span>
              {typeof column.accessor === 'string'
                ? getObjectKeyByString(meta.value, column.accessor)
                : column.accessor(meta.value)}
            </SelectedText>
          ))}
          <Tooltip title={t('common:remove')}>
            <IconButton
              style={{ marginLeft: 20 }}
              onClick={() => helpers.setValue(null)}>
              <CancelIcon fontSize='large' />
            </IconButton>
          </Tooltip>
        </SelectedWrapper>
      ) : (
        <Table
          style={{ margin: '10px 0' }}
          maxHeight={400}
          onRowClick={(row: any) => helpers.setValue(row.original)}
          data={options}
          columns={columns}
        />
      )}
      {helperText && (
        <FormHelperText>
          {meta.error ? getErrorMessage(meta.error) : helperText}
        </FormHelperText>
      )}
    </FormControl>
  )
}

export default TableInput

interface Props {
  name: string
  required?: boolean
  label: string
  helperText?: string
  columns: { accessor: any; Header: string }[]
  options: any[]
}
