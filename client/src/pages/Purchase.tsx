import { useContext } from "react"
import UserContext from "../contexts/userContext"
import { Container, HStack } from "@chakra-ui/react"

// import React, { useState, useEffect } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";

// import CheckoutForm from "../components/CheckoutForm";
// import "./App.css";

// // Make sure to call loadStripe outside of a component’s render to avoid
// // recreating the Stripe object on every render.
// // This is a public sample test API key.
// // Don’t submit any personally identifiable information in requests made with this key.
// // Sign in to see your own test API key embedded in code samples.
// const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

const Purchase = () => {
  const { eventAndTicket } = useContext(UserContext)
  const { currentUser } = useContext(UserContext)

  console.log(eventAndTicket)
  console.log(currentUser)

  // const [clientSecret, setClientSecret] = useState("");

  // useEffect(() => {
  //   // Create PaymentIntent as soon as the page loads
  //   fetch("/create-payment-intent", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => setClientSecret(data.clientSecret));
  // }, []);

  // const appearance = {
  //   theme: 'stripe',
  // };
  // const options = {
  //   clientSecret,
  //   appearance,
  // };

  return (
    <>
      <HStack>
        <Container>
          {/* <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements> */}
        </Container>
      </HStack>
    </>
  )
}

export default Purchase