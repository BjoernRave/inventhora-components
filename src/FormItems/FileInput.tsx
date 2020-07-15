import { FormLabel } from '@material-ui/core'
import { useField } from 'formik'
import React, { FC } from 'react'
import styled from 'styled-components'
import { useMutation } from 'urql'
import DocumentViewer from '../DocumentViewer'
import ImageViewer from '../ImageViewer'
import { generateSlug } from '../lib/utils'
import FileUpload from './FileUpload'

const UploadWrapper = styled.div`
  width: 100%;
  margin: 10px 0 !important;
`

const FileInput: FC<Props> = ({
  name,
  multiple,
  label,
  index,
  subName,
  deleteMutation,
  isImages,
}) => {
  const formName =
    typeof index === 'number' && subName ? `${name}[${index}].${subName}` : name

  const [, meta, helpers] = useField(formName)

  const [, deleteImage] = useMutation(deleteMutation)

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
      await deleteImage({ id: file.id })

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

  return (
    <UploadWrapper id={generateSlug(formName)}>
      <FormLabel>{label}</FormLabel>
      {(multiple || !meta.value) && (
        <FileUpload
          multiple={multiple}
          onUpload={(files) => {
            console.log(files)

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
  deleteMutation: any
  isImages?: boolean
}
