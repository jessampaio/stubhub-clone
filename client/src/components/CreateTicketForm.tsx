import axios from 'axios'
import { useEffect, useState } from 'react'
import { FormControl, FormLabel, Input, Button, useToast, Select } from '@chakra-ui/react'

interface Event {
  event_date: string;
  event_id: number;
  event_name: string;
  event_time: string;
  ticket_amount: string;
  venue_id: number;
}

interface Ticket {
  ticketTier: string;
  ticketPrice: number;
  ticketQuantity: number;
}

const INITIAL_TICKET_STATE = {
  ticketTier: '',
  ticketPrice: 0,
  ticketQuantity: 0
}

const CreateTicketForm = () => {
  const toast = useToast()
  const [eventSelectOptions, setEventSelectOptions] = useState<any>([])
  const [eventSelected, setEventSelected] = useState('')
  const [ticket, setTicket] = useState<Ticket>(INITIAL_TICKET_STATE)
  const [ticketsRemaining, setTicketsRemaining] = useState('')

  const getEvents = () => {
    axios.get('http://localhost:3345/events')
      .then(function (response) {
        if (response.data.length) {
          const eventOptions = response.data.map((event: Event) => (
            <option key={event.event_id} value={event.event_id}>
              {event.event_name}
            </option>
          )
          )
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

  const handleSelectEvent = (event: any) => {
    setEventSelected(event.target.value)
    getInfoAboutEvent(event.target.value)
  }

  const getInfoAboutEvent = (eventId: number) => {
    axios.get(`http://localhost:3345/event/${eventId}`)
      .then(function (response) {
        if (response.data[0].tickets_remaining) {
          const ticketsLeft = response.data[0].tickets_remaining
          setTicketsRemaining(ticketsLeft)
        }
      })
      .catch(function (err) {
        if (err) {
          console.log(err)
          throw err
        }
      })
  }

  const handleTicketChange = (event: any) => {
    setTicket((prevTicket: Ticket) => ({
      ...prevTicket,
      [event.target.name]: event.target.value
    }))
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

  const handleCreateTicket = (event: any) => {
    event.preventDefault()
    axios.post('http://localhost:3345/tickets', { eventSelected, ...ticket })
      .then(function (response) {
        if (response.data) {
          showToast()
          setEventSelected('')
          setTicket(INITIAL_TICKET_STATE)
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

  return (
        <>
          <Select aria-label="Select Event" value={eventSelected} onChange={handleSelectEvent}>
            <option>Choose an event</option>
                  {eventSelectOptions}
          </Select>
          {ticketsRemaining && <span>Number of tickets to be priced: {ticketsRemaining}</span>}
          <FormControl>
              <FormLabel>Ticket Tier</FormLabel>
                <Input type="text" name="ticketTier" value={ticket.ticketTier} onChange={handleTicketChange} placeholder="Enter ticket tier" />
            <FormLabel>Ticket Price</FormLabel>
                <Input type="text" name="ticketPrice" value={ticket.ticketPrice} onChange={handleTicketChange} placeholder="Enter ticket price" />
            <FormLabel>Ticket Quantity</FormLabel>
                <Input type="text" name="ticketQuantity" value={ticket.ticketQuantity} onChange={handleTicketChange} placeholder="Enter ticket quantity" />
                <Button type="submit" onClick={handleCreateTicket}>
                  Add tickets
                </Button>
          </FormControl>
        </>
  )
}

export default CreateTicketForm
