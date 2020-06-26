import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core'
import { Formik, FormikProps } from 'formik'
import useTranslation from 'next-translate/useTranslation'
import React, { FC } from 'react'
import styled from 'styled-components'
import Form from './FormItems/Basic/Form'
import SubmitButton from './FormItems/Basic/SubmitButton'
import { generateSlug } from './lib/utils'

const StyledDialogContent = styled(DialogContent)`
  @media (min-width: 767px) {
    min-width: 767px;
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
}) => {
  const { t } = useTranslation()
  return (
    <Dialog
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
        {({ isSubmitting }) => {
          return (
            <StyledDialogContent id={`${generateSlug(title)}-content`}>
              <Form>
                {description && (
                  <DialogContentText>{description}</DialogContentText>
                )}
                {children}
                <DialogActions>
                  <Button
                    size='large'
                    onClick={() => onClose()}
                    color='primary'>
                    {t('common:cancel')}
                  </Button>
                  <SubmitButton
                    size='large'
                    loading={isSubmitting}
                    disabled={disabled}>
                    {edit ? t('common:update') : t('common:create')}
                  </SubmitButton>
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
}