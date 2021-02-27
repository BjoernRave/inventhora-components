import { CircularProgress } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import { Autocomplete, createFilterOptions } from '@material-ui/lab'
import { useField } from 'formik'
import { generateSlug, getErrorMessage } from 'inventhora-utils'
import React, { FC, ReactNode } from 'react'

const filter = createFilterOptions()

const ComboBox: FC<Props> = ({
  options,
  label,
  helperText,
  required,
  freeSolo,
  name,
  getOptionLabel = (option) => option,
  index,
  subName,
  disabled,
  onCreate,
  autoFocus,
  onChange,
  loading,
  ...rest
}) => {
  const formName =
    typeof index === 'number' && subName ? `${name}[${index}].${subName}` : name
  const [, meta, helper] = useField(formName)
  const isLoading = !disabled && (loading || !Array.isArray(options))
  return (
    <Autocomplete
      id={generateSlug(formName)}
      style={{ width: '100%' }}
      {...rest}
      value={meta.value || null}
      onChange={(_, value) => {
        onChange && onChange(value)
        if (onCreate && value && value.inputValue) {
          onCreate(value.inputValue)
        } else {
          helper.setValue(value || '')
        }
      }}
      onInputChange={(_e, value) => {
        if (freeSolo) {
          helper.setValue(value || '')
        }
      }}
      selectOnFocus
      disabled={disabled}
      freeSolo={freeSolo}
      options={isLoading || !options ? [] : options}
      loading={isLoading}
      filterOptions={(options, params) => {
        if (freeSolo) {
          params.inputValue = meta.value
        }

        const filtered = filter(options, params)

        if (onCreate && filtered.length === 0 && params.inputValue !== '') {
          filtered.push({
            inputValue: params.inputValue,
            inputTitle: `Add "${params.inputValue}"`,
          })
        }

        return filtered
      }}
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
          required={required}
          error={Boolean(meta.error)}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isLoading ? (
                  <CircularProgress color='inherit' size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  )
}

export default ComboBox

export interface Props {
  freeSolo?: boolean
  getOptionLabel?: (option: any) => string
  options: any[]
  name: string
  label: ReactNode
  helperText?: ReactNode
  required?: boolean
  index?: number
  subName?: string
  disabled?: boolean
  onCreate?: (input: string) => void
  autoFocus?: boolean
  onChange?: (value?: any) => void
  loading?: boolean
}
