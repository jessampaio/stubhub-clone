import React, { useContext, useState } from 'react'
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js'
import UserContext from '../contexts/userContext'
import { useNavigate } from 'react-router-dom'

export default function CheckoutForm () {
  const stripe: any = useStripe()
  const elements = useElements()

  const [, setEmail] = useState<any>('')
  const [stateMessage, setStateMessage] = useState<any>('')
  const [isLoading, setIsLoading] = useState<any>(false)
  const { setEventAndTicket, eventAndTicket, clientSecret } = useContext(UserContext)

  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsLoading(true)

    const { error } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required'
    })

    if (error?.type === 'card_error' || error?.type === 'validation_error') {
      setStateMessage(error.message)
    } else {
      setStateMessage('An unexpected error occurred.')
    }

    callStripe()

    setIsLoading(false)
  }

  const paymentElementOptions: any = {
    layout: 'tabs'
  }

  const callStripe = () => {
    let message = ''

    stripe
      .retrievePaymentIntent(clientSecret)
      .then(({ paymentIntent }: any) => {
        switch (paymentIntent?.status) {
          case 'succeeded':
            console.log('SUCCEDED', eventAndTicket, message)
            message = 'Payment succeeded!'
            setStateMessage(message)
            setEventAndTicket({ ...eventAndTicket, message })
            break
          case 'processing':
            message = 'Your payment is processing.'
            setStateMessage(message)
            setEventAndTicket({ ...eventAndTicket, message })
            break
          case 'requires_payment_method':
            message = 'Your payment was not successful, please try again.'
            setStateMessage(message)
            setEventAndTicket({ ...eventAndTicket, message })
            break
          default:
            message = 'Something went wrong.'
            setStateMessage(message)
            setEventAndTicket({ ...eventAndTicket, message })
            break
        }
      })
    navigate('/success')
  }

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <LinkAuthenticationElement
        id="link-authentication-element"
        onChange={(e: any) => setEmail(e.target?.value)}
      />
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : 'Pay now'}
        </span>
      </button>
      {/* Show any error or success messages */}
      {stateMessage && <div id="payment-message">{stateMessage}</div>}
    </form>
  )
}
