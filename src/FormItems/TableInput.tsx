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
import {
  getErrorMessage,
  getObjectKeyByString,
  removeFromObjectArray,
} from '../lib/utils'
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

const Selection = ({ columns, onDelete, value }) => {
  const { t } = useTranslation()

  return (
    <SelectedWrapper>
      {columns.map((column) => (
        <SelectedText>
          <span style={{ fontWeight: 'bold', marginBottom: 10 }}>
            {column.Header}
          </span>
          {typeof column.accessor === 'string'
            ? getObjectKeyByString(value, column.accessor)
            : column.accessor(value)}
        </SelectedText>
      ))}
      <Tooltip title={t('common:remove')}>
        <IconButton style={{ marginLeft: 20 }} onClick={() => onDelete(value)}>
          <CancelIcon fontSize='large' />
        </IconButton>
      </Tooltip>
    </SelectedWrapper>
  )
}

const TableInput: FC<Props> = ({
  name,
  required,
  label,
  helperText,
  options,
  columns,
  multiple,
  filterWith,
  withSearch,
}) => {
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
      {!multiple && meta.value && (
        <Selection
          onDelete={() => helpers.setValue(null)}
          value={meta.value}
          columns={columns}
        />
      )}
      {multiple &&
        meta.value?.length > 0 &&
        meta.value.map((value, ind) => (
          <Selection
            value={value}
            onDelete={(v) =>
              helpers.setValue(removeFromObjectArray(meta.value, 'id', v.id))
            }
            key={ind}
            columns={columns}
          />
        ))}
      {(multiple || !meta.value) && (
        <Table
          withSearch={withSearch}
          style={{ margin: '10px 0' }}
          maxHeight={400}
          onRowClick={(row: any) =>
            helpers.setValue(
              multiple ? [...meta.value, row.original] : row.original
            )
          }
          data={
            multiple
              ? options.filter((option) => {
                  if (
                    filterWith &&
                    meta.value.length > 0 &&
                    getObjectKeyByString(option, filterWith) !==
                      getObjectKeyByString(meta.value[0], filterWith)
                  ) {
                    return false
                  }

                  return !Boolean(
                    meta.value.find((val) => val.id === option.id)
                  )
                })
              : options
          }
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
  multiple?: boolean
  filterWith?: string
  withSearch?: boolean
}
