import { useContext } from 'react'
import UserContext from '../contexts/userContext'
import { Container, HStack } from '@chakra-ui/react'
// import { loadStripe } from '@stripe/stripe-js'
// import { Elements } from '@stripe/react-stripe-js'
// import axios from 'axios'
// import CheckoutForm from "../components/CheckoutForm";

// const stripePromise = loadStripe(`
// pk_test_51N6aFrHsmvWJAjUnFwmbgm5w7rsx
// IvcvBSO4Brre9wY2qyux9Kjti4vMrYGen2
// MDePiPiVfEo00mhKr8XXkHEri00aQxgTjup
// `)

const Purchase = () => {
  const { eventAndTicket, currentUser } = useContext(UserContext)

  console.log(eventAndTicket)
  console.log(currentUser)

  //   const paymentIntent = () => {
  //     axios
  //       .post('/create-payment-intent')
  //       .then(function (response) {
  //         if (response) {
  //           console.log(response)
  //         }
  //       })
  //   }

  //   useEffect(() => {
  //     paymentIntent()
  //   }, [])

  //   // useEffect(() => {
  //   //   fetch("/create-payment-intent", {
  //   //     method: "POST",
  //   //     headers: { "Content-Type": "application/json" },
  //   //     body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
  //   //   })
  //   //     .then((res) => res.json())
  //   //     .then((data) => setClientSecret(data.clientSecret));
  //   // }, []);

  //   const appearance = {
  //     theme: 'stripe'
  //   }

  //   const options = {
  //     clientSecret,
  //     appearance
  //   }

  return (
    <>
      <HStack>
        <Container>
          hello
        </Container>
      </HStack>
    </>
  )
}

export default Purchase
