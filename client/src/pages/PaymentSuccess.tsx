import axios from "axios"
import { useContext, useEffect } from "react"
import UserContext from "../contexts/userContext"



const PaymentSuccess = () => {
  const { eventAndTicket, currentUser } = useContext(UserContext)

  useEffect(() => {
    if (eventAndTicket.message === undefined || eventAndTicket.message === null) {
      return;
    }

    completePurchase()
  }, [eventAndTicket])

  const completePurchase = () => {
    axios
      .post('http://localhost:3345/purchases/complete', { ...eventAndTicket, ...currentUser })
      .then((response) => {
        console.log(response)
      })
  }

  console.log('are you there', eventAndTicket, currentUser)

  return (
    <>
      {eventAndTicket.message && eventAndTicket.message}
    </>
  )
}

export default PaymentSuccess