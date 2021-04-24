import { FormControl, FormLabel } from '@material-ui/core'
import { useField } from 'formik'
import { generateSlug } from 'inventhora-utils'
import React, { FC } from 'react'
import styled from 'styled-components'
import DocumentViewer from '../DocumentViewer'
import ImageViewer from '../ImageViewer'
import FileUpload from './FileUpload'

const UploadWrapper = styled(FormControl)`
  width: 100%;
  margin: 10px 0 !important;
`

const FileInput: FC<Props> = ({
  name,
  multiple,
  label,
  index,
  subName,
  onDelete,
  isImages,
  required,
  onReOrder,
}) => {
  const formName =
    typeof index === 'number' && subName ? `${name}[${index}].${subName}` : name

  const [, meta, helpers] = useField(formName)

  const handleDelete = async (file: { name?: string; id?: string }) => {
    if (file?.name) {
      if (multiple) {
        const newFiles = Array.from(meta.value)
        helpers.setValue(
          newFiles.filter((innerFile: any) => innerFile.name !== file.name)
        )
      } else {
        helpers.setValue(undefined)
      }
    } else {
      await onDelete(file.id)

      if (multiple) {
        const newFiles = Array.from(meta.value)

        helpers.setValue(
          newFiles.filter((innerFile: any) => innerFile.id !== file?.id)
        )
      } else {
        helpers.setValue(undefined)
      }
    }
  }

  const handleOrderChange = async (files: any) => {
    helpers.setValue(files)

    if (!files.every((file) => file.name)) {
      await onReOrder(files.map(({ order, id }) => ({ order, id })))
    }
  }

  return (
    <UploadWrapper required={required}>
      <FormLabel htmlFor={generateSlug(formName)}>{label}</FormLabel>
      {(multiple || !meta.value) && (
        <FileUpload
          id={generateSlug(formName)}
          multiple={multiple}
          onUpload={(files) => {
            helpers.setValue(
              multiple ? [...Array.from(files), ...meta.value] : files[0]
            )
          }}
        />
      )}
      {((multiple && meta?.value?.length > 0) || meta.value) && (
        <>
          {isImages ? (
            <ImageViewer
              onOrderChange={multiple && handleOrderChange}
              images={multiple ? meta.value : [meta.value]}
              onDelete={handleDelete}
            />
          ) : (
            <DocumentViewer
              canDownload={false}
              onDelete={handleDelete}
              documents={multiple ? meta.value : [meta.value]}
            />
          )}
        </>
      )}
    </UploadWrapper>
  )
}

export default FileInput

interface Props {
  name: string
  index?: number
  subName?: string
  multiple?: boolean
  label: string
  isImages?: boolean
  required?: boolean
  onDelete: (id: string) => any
  onReOrder: (items: { order: number; id: string }[]) => any
}
