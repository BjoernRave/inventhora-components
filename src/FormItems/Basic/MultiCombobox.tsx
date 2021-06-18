import { CircularProgress, IconButton, Tooltip } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import PlusIcon from '@material-ui/icons/AddCircle'
import { Autocomplete } from '@material-ui/lab'
import { useField } from 'formik'
import { generateSlug, getErrorMessage } from 'inventhora-utils'
import useTranslation from 'next-translate/useTranslation'
import React, { FC, ReactNode, useState } from 'react'
import styled from 'styled-components'

const StyledButton = styled(IconButton)<{ hasInput: number }>`
  ${({ hasInput }) =>
    hasInput === 1 ? 'color: #3c9f80 !important' : undefined};
`

const MultiCombobox: FC<Props> = ({
  options,
  label,
  helperText,
  required,
  name,
  getOptionLabel = (option) => option,
  index,
  subName,
  disabled,
  autoFocus,
  loading,
  canCreate = true,
  ...rest
}) => {
  const { t } = useTranslation()

  const formName =
    typeof index === 'number' && subName ? `${name}[${index}].${subName}` : name
  const [, meta, helper] = useField(formName)
  const [input, setInput] = useState('')
  const isLoading = !disabled && (loading || !Array.isArray(options))

  const value = meta.value ?? []

  return (
    <Autocomplete
      multiple
      id={generateSlug(formName)}
      style={{ width: '100%' }}
      {...rest}
      value={meta.value || []}
      selectOnFocus
      disabled={disabled}
      freeSolo={canCreate}
      onChange={(_, value) => helper.setValue(value || [])}
      options={
        isLoading || !options
          ? []
          : options.filter(
              (val) =>
                !Boolean(
                  meta?.value?.find(
                    (metaVal) => getOptionLabel(val) === getOptionLabel(metaVal)
                  )
                )
            )
      }
      loading={isLoading}
      getOptionLabel={(option) => option?.inputTitle ?? getOptionLabel(option)}
      renderInput={(params) => (
        <TextField
          margin='dense'
          variant='outlined'
          {...params}
          autoFocus={autoFocus}
          label={label}
          disabled={disabled}
          helperText={meta.error ? getErrorMessage(meta.error) : helperText}
          fullWidth
          onChange={(e) => {
            setInput(e.target.value)
          }}
          required={required}
          error={Boolean(meta.error)}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {params.InputProps.endAdornment}
                {isLoading ? (
                  <CircularProgress color='inherit' size={20} />
                ) : canCreate ? (
                  <Tooltip open={Boolean(input)} arrow title={t('forms:add')}>
                    <StyledButton
                      hasInput={Boolean(input) ? 1 : 0}
                      onClick={() => {
                        if (input) {
                          helper.setValue([...value, input])
                          setInput('')
                        }
                      }}>
                      <PlusIcon />
                    </StyledButton>
                  </Tooltip>
                ) : null}
              </>
            ),
          }}
        />
      )}
    />
  )
}

export default MultiCombobox

export interface Props {
  getOptionLabel?: (option: any) => string
  options: any[]
  name: string
  label: ReactNode
  helperText?: ReactNode
  required?: boolean
  index?: number
  subName?: string
  disabled?: boolean
  autoFocus?: boolean
  loading?: boolean
  canCreate?: boolean
}
