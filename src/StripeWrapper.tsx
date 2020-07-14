import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import React, { FC, useEffect, useState } from 'react'

const StripeWrapper: FC<Props> = ({ children, apiKey }) => {
  const [stripePromise, setStripePromise] = useState(null)

  useEffect(() => {
    if (!stripePromise) {
      setStripePromise(loadStripe(apiKey))
    }
  }, [])

  return <Elements stripe={stripePromise}>{children}</Elements>
}

export default StripeWrapper

interface Props {
  apiKey: string
}
