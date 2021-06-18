import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core'
import { Formik, FormikProps } from 'formik'
import { generateSlug } from 'inventhora-utils'
import useTranslation from 'next-translate/useTranslation'
import React, { FC, ReactNode } from 'react'
import styled from 'styled-components'
import Form from './FormItems/Basic/Form'
import SubmitButton from './FormItems/Basic/SubmitButton'

const StyledDialogContent = styled(DialogContent)`
  @media (min-width: 767px) {
    min-width: 767px;
  }
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

const FormModal: FC<Props> = ({
  isOpen = true,
  onClose,
  title,
  description,
  initialValues,
  validationSchema,
  onSubmit,
  disabled,
  children,
  enableReinitialize,
  validate,
  edit,
  submitText,
}) => {
  const { t } = useTranslation()
  return (
    <Dialog
      disableEnforceFocus
      maxWidth='xl'
      open={isOpen}
      onClose={() => onClose()}
      aria-labelledby={generateSlug(title)}>
      <DialogTitle id={generateSlug(title)}>{title}</DialogTitle>
      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        validate={validate}
        enableReinitialize={enableReinitialize}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}>
        {({ isSubmitting, errors }) => {
          if (
            process.env.NODE_ENV === 'development' &&
            Object.keys(errors).length > 0
          ) {
            console.log('FormModalErrors: ', errors)
          }
          return (
            <StyledDialogContent id={`${generateSlug(title)}-content`}>
              <Form>
                {description && (
                  <DialogContentText>{description}</DialogContentText>
                )}
                {children}
                <DialogActions>
                  <StyledButton
                    size='large'
                    type='button'
                    onClick={() => onClose()}
                    color='primary'>
                    {t('common:cancel')}
                  </StyledButton>
                  <StyledSubmit
                    size='large'
                    loading={isSubmitting}
                    disabled={disabled}>
                    {submitText
                      ? submitText
                      : edit
                      ? t('common:update')
                      : t('common:create')}
                  </StyledSubmit>
                </DialogActions>
              </Form>
            </StyledDialogContent>
          )
        }}
      </Formik>
    </Dialog>
  )
}

export default FormModal

interface Props {
  isOpen?: boolean
  onClose: () => void
  title: string
  description?: string
  initialValues: object
  validationSchema: any
  onSubmit: (values: any, FormikProps: FormikProps<any>) => void
  disabled?: boolean
  enableReinitialize?: boolean
  validate?: (values: any) => void
  edit?: boolean
  submitText?: ReactNode
}
