import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import useTranslation from 'next-translate/useTranslation'
import React, { FC, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import styled from 'styled-components'

const Dropzone = styled.div`
  border: 2px dashed;
  background-color: ${({ theme }) => theme.palette.background.paper};
  padding: 80px;
  margin: 20px;
  cursor: pointer;

  svg {
    margin-right: 10px;
  }

  @media (max-width: 767px) {
    padding: 20px;
  }
`

const UploadDescription = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  flex-direction: column;
`

const SupportedFormats = styled.span`
  color: gray;
  font-size: 14px;
  width: 50%;
`

const StyledIcon = styled(CloudUploadIcon)`
  font-size: 80px !important;
  margin-top: 20px;
`

const UploadText = styled.span`
  font-size: 20px;
`

const FileUpload: FC<Props> = ({
  onUpload,
  supportedFormats,
  multiple = false,
  id,
}) => {
  const { t } = useTranslation()

  const onDrop = useCallback((acceptedFiles) => {
    onUpload(acceptedFiles)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple,
  })

  return (
    <>
      <Dropzone id={id} {...getRootProps()}>
        <input {...getInputProps()} />
        <UploadDescription>
          <UploadText>
            {isDragActive
              ? t('forms:importUploadDrop')
              : t('forms:importUploadInfo')}
          </UploadText>
          <StyledIcon />
        </UploadDescription>
      </Dropzone>
      {supportedFormats && (
        <SupportedFormats>
          {t('forms:supportedFormats') + supportedFormats}
        </SupportedFormats>
      )}
    </>
  )
}

export default FileUpload

export interface Props {
  supportedFormats?: string
  onUpload: (files: File[]) => void
  multiple?: boolean
  id?: string
}
