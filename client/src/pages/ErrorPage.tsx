import { Heading, Text } from '@chakra-ui/react'
import { isRouteErrorResponse, useRouteError } from 'react-router-dom'
import MainSearchBar from '../components/MainSearchBar'
import Footer from '../components/Footer'

const ErrorPage = () => {
  const error = useRouteError()

  return (
    <>
      <MainSearchBar />
      <Heading>Oops</Heading>
      <Text>
        {isRouteErrorResponse(error)
          ? 'This page doesn\'t exist.'
          : 'An unexpected error ocurred.'}
      </Text>
      <Footer />
    </>
  )
}

export default ErrorPage
