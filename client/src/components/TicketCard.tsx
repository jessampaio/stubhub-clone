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

const INITIAL_TICKET_STATE = {
  ticketQuantity: 0
}

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

interface TicketQuantity {
  ticketQuantity: number;
}

const TicketCard = ({ eventId }: Props) => {
  const [tickets, setTickets] = useState<any>([])
  const [showModal, setShowModal] = useState<boolean>(false)
  const [ticketQuantity, setTicketQuantity] = useState<TicketQuantity>(INITIAL_TICKET_STATE)
  const { setEventAndTicket } = useContext(UserContext)

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

  function buildTickets () {
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
                onClick={() => setShowModal(true)}
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
    setTicketQuantity((prevTicket: TicketQuantity) => ({
      ...prevTicket,
      [event.target.name]: event.target.value
    }))
  }

  const handleProceedPayment = (event: React.MouseEvent<HTMLButtonElement>) => {
    setEventAndTicket({
      eventId: tickets[0].event_id,
      ticketQuantity: Number(ticketQuantity.ticketQuantity)
    })
    navigate('/purchase')
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
