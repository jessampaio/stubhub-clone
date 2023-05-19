import axios from 'axios'
import { useContext, useEffect } from 'react'
import UserContext from '../contexts/userContext'
import { useCookies } from 'react-cookie'

const PaymentSuccess = () => {
  const { eventAndTicket } = useContext(UserContext)
  const [cookies] = useCookies(['user'])

  useEffect(() => {
    if (eventAndTicket.message === undefined || eventAndTicket.message === null) {
      return
    }

    completePurchase()
  }, [eventAndTicket])

  const completePurchase = () => {
    axios
      .post('http://localhost:3345/purchases/complete', { ...eventAndTicket, ...cookies.user })
      .then((response) => {
        console.log(response)
      })
  }

  console.log('are you there', eventAndTicket, cookies.user)

  return (
    <>
      {eventAndTicket.message && eventAndTicket.message}
    </>
  )
}

export default PaymentSuccess
