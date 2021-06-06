import { Button, Paper } from '@material-ui/core'
import { Formik, FormikHelpers } from 'formik'
import { isDev } from 'inventhora-utils'
import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import React, { FC, ReactNode } from 'react'
import styled, { css } from 'styled-components'
import Form from './FormItems/Basic/Form'
import SubmitButton from './FormItems/Basic/SubmitButton'
import { Title } from './lib/styles'

const leftAlignedStyles = css`
  width: calc(100% / 3 * 2);
  margin-right: calc(100% / 3 * 1 + 40px);
`

const CenterStyles = css`
  width: 100%;
  display: block;
  box-sizing: border-box;
  margin-left: auto;
  margin-right: auto;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 10px;
`

const StyledPaper = styled(Paper)<{ isleftaligned: number }>`
  padding: 10px 20px;
  margin: 10px;
  max-width: 960px;

  @media (min-width: 767px) {
    ${({ isleftaligned }) =>
      isleftaligned === 1 ? leftAlignedStyles : CenterStyles};
  }
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const StyledSubmit = styled(SubmitButton)`
  @media (max-width: 767px) {
    padding: 20px 0;
    width: 100%;
  }
`

const FormPage: FC<Props> = ({
  title,
  initialValues,
  validationSchema,
  validate,
  children,
  onSubmit,
  edit,
  multiCreationLink,
  singleCreationLink,
  isLeftAligned,
  style,
  enableReinitialize,
  hideSubmit,
  submitText,
  withRequiredNotice = true,
}) => {
  const { t } = useTranslation()

  return (
    <PageWrapper style={style}>
      <StyledPaper isleftaligned={isLeftAligned ? 1 : 0} elevation={2}>
        <Header>
          <Title>{title}</Title>
          {multiCreationLink && (
            <Link passHref href={multiCreationLink}>
              <Button color='primary'>{t('common:multiCreation')}</Button>
            </Link>
          )}
          {singleCreationLink && (
            <Link passHref href={singleCreationLink}>
              <Button color='primary'>{t('common:singleCreation')}</Button>
            </Link>
          )}
        </Header>
        {withRequiredNotice && (
          <span style={{ display: 'block', padding: '10px 0' }}>
            {t('forms:requiredNotice')}
          </span>
        )}
        <Formik
          enableReinitialize={enableReinitialize}
          validateOnChange={false}
          validateOnBlur={false}
          initialValues={initialValues}
          validationSchema={validationSchema}
          validate={validate}
          onSubmit={onSubmit}>
          {({ isSubmitting, errors, values }) => {
            if (Object.keys(errors).length > 0) {
              console.log(errors)
            }
            isDev && console.log(values)
            return (
              <Form>
                {children}
                {!hideSubmit && (
                  <StyledSubmit
                    type='submit'
                    loading={isSubmitting}
                    size='large'>
                    {Boolean(submitText)
                      ? submitText
                      : edit
                      ? t('common:update')
                      : t('common:create')}
                  </StyledSubmit>
                )}
              </Form>
            )
          }}
        </Formik>
      </StyledPaper>
    </PageWrapper>
  )
}

export default FormPage

interface Props {
  title: string
  description?: string
  initialValues: object
  validationSchema: any
  onSubmit: (values: any, helpers: FormikHelpers<any>) => void
  validate?: (values: any) => void
  edit?: boolean
  children: any
  multiCreationLink?: string
  singleCreationLink?: string
  isLeftAligned?: boolean
  style?: any
  enableReinitialize?: boolean
  hideSubmit?: boolean
  submitText?: ReactNode
  withRequiredNotice?: boolean
}
