import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {
  FormControl,
  Input,
  Button,
  useToast,
  Select,
  Container,
  Stack,
  InputGroup,
  InputLeftAddon,
  Divider
} from '@chakra-ui/react'

export interface Event {
  event_date: string;
  event_id: number;
  event_name: string;
  event_time: string;
  ticket_amount: string;
  venue_id: number;
  event_img: string;
}

interface Ticket {
  ticketPrice: number;
  ticketQuantity: number;
  ticketSection: number;
}

const CreateTicketForm = () => {
  const toast = useToast()
  const [eventSelectOptions, setEventSelectOptions] = useState<any>([])
  const [eventSelected, setEventSelected] = useState('')
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [ticketsRemaining, setTicketsRemaining] = useState('')

  const [sections, setSections] = useState([])

  const getEvents = () => {
    axios
      .get('http://ec2-54-164-122-6.compute-1.amazonaws.com:3001/events')
      .then(function (response) {
        if (response.data.length) {
          const eventOptions = response.data.map((event: Event) => (
            <option key={event.event_id} value={event.event_id}>
              {event.event_name}
            </option>
          ))
          setEventSelectOptions(eventOptions)
        }
      })
      .catch(function (err) {
        console.log('ERROR getting events: ', err)
        throw err
      })
  }

  useEffect(() => {
    getEvents()
  }, [])

  const handleSelectEvent = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setEventSelected(event.target.value)
    getInfoAboutEvent(Number(event.target.value))
  }

  const getInfoAboutEvent = (eventId: number) => {
    axios
      .get(`http://ec2-54-164-122-6.compute-1.amazonaws.com:3001/${eventId}`)
      .then(function (response) {
        console.log(response.data[0])
        if (response.data[0]) {
          const ticketsLeft = response.data[0].tickets_remaining
          setTicketsRemaining(ticketsLeft)
          getInfoAboutSection(response.data[0].venue_id)
        }
      })
      .catch(function (err) {
        if (err) {
          console.log(err)
          throw err
        }
      })
  }

  const showToast = () => {
    toast({
      title: 'Ticket created.',
      description: 'Ticket has been created succesfully',
      status: 'success',
      duration: 9000,
      isClosable: true
    })
  }

  const handleCreateTicket = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log('CREATING TICKET', tickets)
    event.preventDefault()
    axios
      .post('http://ec2-54-164-122-6.compute-1.amazonaws.com:3001/tickets', { eventSelected, tickets })
      .then(function (response) {
        if (response.data) {
          showToast()
          setEventSelected('')
          setTickets([])
          setTicketsRemaining('')
        }
      })
      .catch(function (err) {
        if (err) {
          console.log(err)
          throw err
        }
      })
  }

  const handleTicketChange = (newSection: any, index: number) => {
    console.log('label', tickets)

    setTickets((prevTickets) => {
      prevTickets[index] = newSection
      return [...prevTickets]
    })
  }

  const getInfoAboutSection = async (venueId: any) => {
    const response = await axios.get(`http://ec2-54-164-122-6.compute-1.amazonaws.com:3001/seats/sectionseats/${venueId}`)
    console.log(response.data)
    setSections(response.data)
  }

  const createSections = () => {
    return sections.map((section: any, idx: number) => (
      <Container key={idx} justifyContent={'space-around'}>
        <Stack>
          <InputGroup>
            <InputLeftAddon children={`Section ${section.section}`} />
            <InputLeftAddon children={`Seat Quantity: ${section.seats_per_section}`} />
            <Input
              width="200px"
              name="ticketPrices"
              type="number"
              placeholder="Enter ticket price"
              onChange={(event) => handleTicketChange({ ...section, price: event.target.value }, idx)}
            />
          </InputGroup>
        </Stack>
        <Divider h="5px" width="100px" />
      </Container>
    ))
  }

  return (
    <Container maxW="550px">
      <Select aria-label="Select Event" value={eventSelected} onChange={handleSelectEvent}>
        <option>Choose an event</option>
        {eventSelectOptions}
      </Select>
      {ticketsRemaining && <span>Number of tickets to be priced: {ticketsRemaining}</span>}
      <Divider h="5px" width="100px" />
      <FormControl>
        {createSections()}
        <Button type="submit" onClick={handleCreateTicket}>
          Add tickets
        </Button>
      </FormControl>
    </Container>
  )
}

export default CreateTicketForm
