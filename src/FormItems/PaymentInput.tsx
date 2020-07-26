import { TextField } from '@material-ui/core'
import { CardElement, useElements } from '@stripe/react-stripe-js'
import { useField } from 'formik'
import React, {
  FC,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import styled from 'styled-components'
import AmericanExpress from '../lib/svgs/americanExpress'
import Cirrus from '../lib/svgs/cirrus'
import DinersClub from '../lib/svgs/dinersClub'
import Discover from '../lib/svgs/discover'
import JCB from '../lib/svgs/jcb'
import Maestro from '../lib/svgs/maestro'
import MasterCard from '../lib/svgs/mastercard'
import Visa from '../lib/svgs/visa'

const StripeInput = ({
  component: Component,
  inputRef,
  setIsReady,
  setError,
  ...props
}) => {
  const elementRef = useRef()
  useImperativeHandle(inputRef, () => ({
    focus: () => (elementRef as any)?.current?.focus,
  }))
  return (
    <Component
      options={{ hidePostalCode: true }}
      onChange={(val) => console.log(val)}
      onReady={(element) => {
        elementRef.current = element
        setIsReady(true)
      }}
      {...props}
    />
  )
}

const Wrapper = styled.div`
  width: 100%;
`

const MethodsWrapper = styled.div`
  display: flex;
  margin-bottom: 20px;
  justify-content: flex-end;
  flex-wrap: wrap;

  svg {
    margin: -20px -35px;
    transform: scale(0.5);
  }
`

const PaymentInput: FC<Props> = ({ name, required, label }) => {
  const elements = useElements()
  const [error, setError] = useState('')
  const [isReady, setIsReady] = useState(false)

  const [, , helper] = useField(name)

  useEffect(() => {
    if (isReady) {
      helper.setValue({
        type: 'card',
        element: elements.getElement(CardElement),
      })
    }
  }, [isReady])

  return (
    <Wrapper>
      <MethodsWrapper>
        <Maestro />
        <Visa />
        <MasterCard />
        <Cirrus />
        <JCB />
        <Discover />
        <AmericanExpress />
        <DinersClub />
      </MethodsWrapper>
      <TextField
        error={Boolean(error)}
        helperText={Boolean(error) && error}
        label={label}
        variant='outlined'
        required={required}
        fullWidth
        InputLabelProps={{ shrink: true }}
        InputProps={{
          inputComponent: StripeInput,
          inputProps: {
            setIsReady,
            component: CardElement,
          },
        }}
      />
    </Wrapper>
  )
}

export default PaymentInput

interface Props {
  name: string
  required?: boolean
  label: string
}
