import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  Tooltip,
} from '@material-ui/core'
import PlusIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import { useField, useFormikContext } from 'formik'
import { generateSlug, getErrorMessage } from 'inventhora-utils'
import useTranslation from 'next-translate/useTranslation'
import React, { FC, useMemo, useState } from 'react'
import styled from 'styled-components'
import Table from '../Table'
import SubmitButton from './Basic/SubmitButton'

const StyledDialogContent = styled(DialogContent)`
  > *:not(label) {
    margin: 8px 0;
  }

  > button {
    margin: 20px 0;
  }
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 767px) {
    min-width: 767px;
  }
`

const HelperText = styled.span`
  align-self: flex-start;
  color: ${({ theme }) => theme.palette.text.secondary};
`

const StyledButton = styled(Button)`
  @media (max-width: 767px) {
    width: 50%;
  }
`

const StyledSubmit = styled(SubmitButton)`
  @media (max-width: 767px) {
    width: 50%;
  }
`

const CreateButton = styled(Button)`
  align-self: flex-start;
  margin: 10px 0 !important;

  @media (max-width: 767px) {
    padding: 20px;
    width: 100% !important;
  }
`

const MultiCreate: FC<Props> = ({
  children,
  fields,
  name,
  formatFunction,
  title,
  onDelete,
  schema,
  helperText,
  onOpen,
  validate,
  label,
  required,
  initialValues,
}) => {
  const { t } = useTranslation()
  const [isCreating, setIsCreating] = useState(false)
  const [isUpdating, setIsUpdating] = useState('')

  const { setFieldError, validateField } = useFormikContext()
  const [, meta, helper] = useField(name)

  const tableData = useMemo(() => {
    if (isCreating) {
      const data = Array.from(meta.value)
      data.pop()
      return data
    } else {
      return meta.value
    }
  }, [isCreating, meta.value])

  const handleClose = () => {
    if (isCreating) {
      const newArray = Array.from(meta.value)
      newArray.pop()
      helper.setValue(newArray, true)
      setIsCreating(false)
    } else {
      const validateRes = validate && validate(meta.value[isUpdating])

      if (validateRes) {
        return setFieldError(`${name}[${isUpdating}]`, validateRes)
      }

      schema
        .validate(meta.value[isUpdating])
        .then(() => {
          setIsUpdating('')
          validateField(name)
        })
        .catch((error) => {
          setFieldError(`${name}[${isUpdating}].${error.path}`, error.message)
        })
    }
  }

  const handleSubmit = () => {
    const index = isCreating ? meta.value.length - 1 : isUpdating

    const validateRes = validate && validate(meta.value[index])

    if (validateRes) {
      return setFieldError(`${name}[${index}]`, validateRes)
    }
    schema
      .validate(meta.value[index])
      .then(() => {
        isCreating ? setIsCreating(false) : setIsUpdating('')
        validateField(name)
      })
      .catch((error) => {
        console.log(error)

        setFieldError(`${name}[${index}].${error.path}`, error.message)
      })
  }

  return (
    <div style={{ width: '100%' }}>
      <FormControl
        required={required}
        style={{ alignSelf: 'flex-start', margin: '20px 0', width: '100%' }}>
        <FormLabel style={{ marginBottom: 10 }}>{label}</FormLabel>
        {tableData.length > 0 && (
          <>
            <Table
              columns={fields.map((field) => ({
                accessor: field.name,
                Header: field.label,
              }))}
              data={formatFunction ? formatFunction(tableData) : tableData}
              actions={[
                {
                  id: 'actions',
                  Header: t('forms:actions'),
                  Cell: ({ row }) => (
                    <>
                      <Tooltip title={t('forms:edit')}>
                        <IconButton
                          onClick={() => {
                            const newArray = Array.from(tableData)

                            const item = newArray.splice(row.index, 1)

                            newArray.push(item[0])

                            helper.setValue(newArray)

                            setIsUpdating(row.index)
                          }}>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={t('forms:delete')}>
                        <IconButton
                          onClick={() => {
                            if (tableData[row.index]?.id) {
                              onDelete(tableData[row.index].id)
                            } else {
                              const updatedData = Array.from(tableData)
                              updatedData.splice(row.index, 1)
                              helper.setValue(updatedData)
                            }
                          }}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </>
                  ),
                },
              ]}
            />
          </>
        )}
        <CreateButton
          variant='contained'
          color='secondary'
          type='button'
          size='large'
          style={
            meta.error
              ? {
                  backgroundColor: '#f44336',
                }
              : {}
          }
          onClick={() => {
            setIsCreating(true)
            if (onOpen) {
              onOpen(meta.value.length)
            } else {
              helper.setValue([
                ...meta.value,
                initialValues ? { ...initialValues } : {},
              ])
            }
          }}>
          <PlusIcon style={{ margin: '0 5px 0 -5px' }} />
          {title}
        </CreateButton>

        {(meta.error || helperText) && (
          <FormHelperText error={Boolean(meta.error)}>
            {meta.error ? getErrorMessage(meta.error) : helperText}
          </FormHelperText>
        )}
      </FormControl>
      <Dialog
        disableEnforceFocus
        open={isCreating || isUpdating !== ''}
        onClose={handleClose}
        id={generateSlug(title)}
        aria-labelledby={`${generateSlug(title)}-label`}
        maxWidth='xl'>
        <DialogTitle
          style={{ paddingBottom: 0 }}
          id={`${generateSlug(title)}-label`}>
          {title}
        </DialogTitle>
        <StyledDialogContent id={`${generateSlug(title)}-content`}>
          {helperText && <HelperText>{helperText}</HelperText>}
          {children}
        </StyledDialogContent>
        <DialogActions>
          <StyledButton type='button' onClick={handleClose}>
            {t('forms:cancel')}
          </StyledButton>
          <StyledSubmit onClick={handleSubmit}>
            {t('forms:submit')}
          </StyledSubmit>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default MultiCreate

export interface Props {
  fields: { name: string; label: string }[]
  title: string
  name: string
  formatFunction?: any
  onDelete?: (id: string) => void
  helperText?: string
  schema: any
  onOpen?: (index: string) => void
  validate?: (values: any) => any
  label: string
  required?: boolean
  initialValues?: any
}
