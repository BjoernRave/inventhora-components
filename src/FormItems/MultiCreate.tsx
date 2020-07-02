import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  FormControl,
  FormHelperText,
  IconButton,
  Tooltip,
} from '@material-ui/core'
import PlusIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import { useField } from 'formik'
import useTranslation from 'next-translate/useTranslation'
import React, { FC, useState } from 'react'
import styled from 'styled-components'
import { generateSlug, getErrorMessage } from '../lib/utils'
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
  color: rgba(0, 0, 0, 0.54);
`

const MultiCreate: FC<Props> = ({
  children,
  fields,
  name,
  formatFunction,
  title,
  onDelete,
  helperText,
}) => {
  const { t } = useTranslation()
  const [isCreating, setIsCreating] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  const [, meta, helper] = useField(name)
  let tableData

  if (isCreating) {
    const data = Array.from(meta.value)
    data.pop()
    tableData = data
  } else {
    tableData = meta.value
  }
  return (
    <>
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
                          setIsUpdating(true)
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
      <FormControl style={{ alignSelf: 'flex-start', margin: '20px 0' }}>
        <Fab
          variant='extended'
          color='secondary'
          type='button'
          size='medium'
          style={
            meta.error
              ? {
                  backgroundColor: '#f44336',
                }
              : {}
          }
          onClick={() => {
            setIsCreating(true)
            helper.setValue([...meta.value, {}])
          }}>
          <PlusIcon style={{ margin: '0 5px 0 -5px' }} />
          {title}
        </Fab>
        {meta.error && (
          <FormHelperText error={Boolean(meta.error)}>
            {getErrorMessage(meta.error)}
          </FormHelperText>
        )}
      </FormControl>
      <Dialog
        open={isCreating || isUpdating}
        onClose={
          isCreating
            ? () => {
                setIsCreating(false)
                const newArray = Array.from(meta.value)
                newArray.pop()
                helper.setValue(newArray)
              }
            : () => {
                setIsUpdating(false)
              }
        }
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
          <Button
            onClick={
              isCreating
                ? () => {
                    const newArray = Array.from(meta.value)
                    newArray.pop()
                    helper.setValue(newArray)
                    setIsCreating(false)
                  }
                : () => {
                    setIsUpdating(false)
                  }
            }>
            {t('forms:cancel')}
          </Button>
          <SubmitButton
            onClick={
              isCreating
                ? () => setIsCreating(false)
                : () => setIsUpdating(false)
            }>
            {t('forms:submit')}
          </SubmitButton>
        </DialogActions>
      </Dialog>
    </>
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
}
