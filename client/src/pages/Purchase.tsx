import { useContext } from 'react'
import UserContext from '../contexts/userContext'
import { Container, HStack } from '@chakra-ui/react'
import CheckoutForm from '../components/CheckoutForm'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

const stripePromise = loadStripe('pk_test_51N6aFrHsmvWJAjUn4oOoWoaCsqnFjWG8F5R6h8VdCFMAfYHL9NvpFzbkRbOxbpU91x4gg5qWF257Z2sIGOwS0II300vROSlDtQ')

const Purchase = () => {
  const { clientSecret } = useContext(UserContext)

  const appearance = {
    theme: 'stripe'
  }

  const options: any = {
    clientSecret,
    appearance
  }

  console.log('the secret', clientSecret)

  return (
    <>
      <HStack>
        <Container>
          {clientSecret &&
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          }
        </Container>
      </HStack>
    </>
  )
}

export default Purchase
