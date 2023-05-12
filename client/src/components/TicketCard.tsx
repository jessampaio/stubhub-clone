import axios from 'axios'
import {
  Card,
  CardBody,
  Heading,
  Stack,
  Text,
  CardFooter,
  Button,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  Input
} from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../contexts/userContext'
import { useNavigate } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'

interface Ticket {
  created_at: string;
  ticket_id: number;
  event_id: number;
  ticket_price: string;
  ticket_quantity: number;
  ticket_section: number;
}

interface Props {
  eventId: number;
}

const stripePromise = loadStripe('pk_test_51N6aFrHsmvWJAjUnFwmbgm5w7rsxIvclvBSO4Brre9wY2qyux9Kjti4vMrYGen2MDePiPiVfEo00mhKr8XXkHEri00aQxgTjup')

const TicketCard = ({ eventId }: Props) => {
  const [tickets, setTickets] = useState<any>([])
  const [showModal, setShowModal] = useState<boolean>(false)
  const [choice, setChoice] = useState<any>()
  const { eventAndTicket, setEventAndTicket } = useContext(UserContext)
  const [clientSecret, setClientSecret] = useState<any>('');


  const navigate = useNavigate()

  const getTicketsList = () => {
    axios.get(`http://localhost:3345/tickets/${eventId}`)
      .then(function (response) {
        if (response) {
          console.log('GETTING TICKETS: ', response.data)
          setTickets(response.data)
        }
      })
  }

  function buildTickets() {
    return tickets.map((ticket: Ticket) => (
      <Box key={ticket.ticket_id} overflowY="auto" maxHeight="600px">
        <Card
          key={ticket.ticket_id}
          overflowY="auto"
          maxHeight="250px"
          direction={{ base: 'column', sm: 'row' }}
          variant="outline"
        >
          <Stack>
            <CardBody paddingBottom={0}>
              <Heading size="md">${ticket.ticket_price}</Heading>
              <Text py="2">{`Section: ${ticket.ticket_section}`}</Text>
              <Text py="2">{`Quantity: ${ticket.ticket_quantity}`}</Text>
            </CardBody>
            <CardFooter>
              <Button
                onClick={() => {
                  setShowModal(true)
                  setChoice({ ...choice, ticket })
                }}
                size='sm'
                variant="solid"
                colorScheme="purple">
                Buy Ticket
              </Button>
            </CardFooter>
          </Stack>
        </Card>
      </Box>
    ))
  }

  const handleTicketQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChoice({ ...choice, ticketQuantity: event.target.value })
    setEventAndTicket({ ...choice, ticketQuantity: event.target.value })
  }

  const handleProceedPayment = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log('choice', choice)
    console.log('eventandticket', eventAndTicket)
    paymentIntent(eventAndTicket)
    navigate('/purchase')
  }

  const paymentIntent = (obj: any) => {
    console.log(eventAndTicket)
    axios
      .post('http://localhost:3345/purchases', eventAndTicket)
      .then(function (response) {
        if (response) {
          console.log('payment intent', response)
          setClientSecret(response.data.clientSecret)
        }
      })
  }

  useEffect(getTicketsList, [eventId])

  return (
    <>
      {tickets.length > 0 && buildTickets()}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select ticket quantity</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <Input
                onChange={handleTicketQuantity}
                width={'215px'}
                type="number"
                name="ticketQuantity"
                placeholder="Enter ticket quantity"
                marginBottom={'5px'}
              />
              <Button
                onClick={handleProceedPayment}
                type="submit"
              >
                Proceed with payment
              </Button>
            </FormControl>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default TicketCard
