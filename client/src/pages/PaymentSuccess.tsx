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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventAndTicket])

  const completePurchase = () => {
    axios
      .post('http://ec2-54-164-122-6.compute-1.amazonaws.com:3001/purchases/complete', { ...eventAndTicket, ...cookies.user })
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
