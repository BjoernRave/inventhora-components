import { withA11y } from '@storybook/addon-a11y'
import { withKnobs } from '@storybook/addon-knobs'
import { useStripe } from '@stripe/react-stripe-js'
import '@toast-ui/editor/dist/toastui-editor.css'
import { Form, Formik } from 'formik'
import React from 'react'
import { muiTheme } from 'storybook-addon-material-ui'
import { getTheme, StripeWrapper, SubmitButton } from '../src'
import PaymentInput from '../src/FormItems/PaymentInput'

export default {
  title: 'Inputs',
  decorators: [withKnobs, withA11y, muiTheme([getTheme])],
}

const PaymentForm = () => {
  const stripe = useStripe()

  return (
    <Formik
      initialValues={{ PaymentInputStory: null }}
      onSubmit={async (v) => {
        const paymentMethod = await stripe.createPaymentMethod({
          type: 'card',
          card: v.PaymentInputStory,
        })

        console.log(paymentMethod)
      }}>
      <Form>
        <PaymentInput name='PaymentInputStory' />
        <SubmitButton>Submit</SubmitButton>
      </Form>
    </Formik>
  )
}

export const PaymentInputStory = (props) => {
  return (
    <StripeWrapper apiKey={process.env.STORYBOOK_STRIPE_PUBLIC_KEY}>
      <PaymentForm />
    </StripeWrapper>
  )
}
