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
  FormLabel,
  Input,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react';

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

const TicketCard = ({ eventId }: Props) => {
  const [tickets, setTickets] = useState([])
  const [showModal, setShowModal] = useState<boolean>(false)


  const getTicketsList = () => {
    axios.get(`http://localhost:3345/tickets/${eventId}`)
      .then(function (response) {
        if (response) {
          console.log(response.data)
          const ticketsList = response.data.map((ticket: Ticket) => (
            <Box key={ticket.ticket_id} overflowY="auto" maxHeight="600px">
              <Card
                key={ticket.ticket_id}
                overflowY="auto"
                maxHeight="300px"
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
          setTickets(ticketsList)
        }
      })
  }

  useEffect(() => {
    getTicketsList()
  }, [])


  return (
    <>
      {tickets}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select ticket quantity</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <Input
                width={'215px'}
                type="number"
                name="ticketQuantity"
                placeholder="Enter ticket quantity"
                marginBottom={'5px'}
              />
              <Button type="submit">
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
