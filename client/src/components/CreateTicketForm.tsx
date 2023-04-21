import axios from 'axios'
import { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Toast from 'react-bootstrap/Toast'

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
  const [showToast, setShowToast] = useState<boolean>(false)
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
        console.log('ERROR: ', err)
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
    setTicket((prevTicket: any) => ({
      ...prevTicket,
      [event.target.name]: event.target.value
    }))
  }

  const handleCreateTicket = (event: any) => {
    event.preventDefault()
    axios.post('http://localhost:3345/tickets', { eventSelected, ...ticket })
      .then(function (response) {
        if (response.data) {
          setShowToast(true)
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
          <Col md={6} className="mb-2">
            <Toast show={showToast} onClose={() => setShowToast(false)}>
              <Toast.Header>
              <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
              />
              <strong className="me-auto">Success!</strong>
              </Toast.Header>
                  <Toast.Body>Ticket has been priced succesfully.</Toast.Body>
            </Toast>
          </Col>
          <Form.Select aria-label="Select Event" value={eventSelected} onChange={handleSelectEvent}>
            <option>Choose an event</option>
                  {eventSelectOptions}
          </Form.Select>
          {ticketsRemaining && <span>Number of tickets to be priced: {ticketsRemaining}</span>}
          <Form>
            <Form.Group className="mb-3" controlId="ticketTier">
              <Form.Label>Ticket Tier</Form.Label>
                <Form.Control type="text" name="ticketTier" value={ticket.ticketTier} onChange={handleTicketChange} placeholder="Enter ticket tier" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="ticketPrice">
            <Form.Label>Ticket Price</Form.Label>
                <Form.Control type="text" name="ticketPrice" value={ticket.ticketPrice} onChange={handleTicketChange} placeholder="Enter ticket price" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="ticketQuantity">
            <Form.Label>Ticket Quantity</Form.Label>
                <Form.Control type="text" name="ticketQuantity" value={ticket.ticketQuantity} onChange={handleTicketChange} placeholder="Enter ticket quantity" />
            </Form.Group>
                <Button variant="primary" type="submit" onClick={handleCreateTicket}>
                  Add tickets
                </Button>
          </Form>
        </>
  )
}

export default CreateTicketForm
