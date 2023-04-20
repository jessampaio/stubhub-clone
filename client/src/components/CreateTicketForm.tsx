import axios from 'axios'
import { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

interface Event {
  event_date: string;
  event_id: number;
  event_name: string;
  event_time: string;
  ticket_amount: string;
  venue_id: number;
}

const CreateTicketForm = () => {
  const [eventSelectOptions, setEventSelectOptions] = useState<any>([])
  const [eventSelected, setSelect] = useState('')
  const [ticket, setTicket] = useState({})

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
    console.log(event)
    setSelect(event.target.value)
  }

  const handleTicketChange = (event: any, stateKey: string) => {
    setTicket((prevTicket: any) => ({
      ...prevTicket,
      [stateKey]: event.target.value
    }))
  }

  const handleCreateTicket = (event: any) => {
    axios.post('http://localhost:3345/events')
      .then(function (response) {
        if (response.data) {
          console.log(response.data)
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
          <Form.Select aria-label="Select Event" onChange={handleSelectEvent}>
            <option>Choose an event</option>
                  {eventSelectOptions}
          </Form.Select>
          <Form>
            <Form.Group className="mb-3" controlId="ticketTier">
              <Form.Label>Ticket Tier</Form.Label>
                <Form.Control type="text" name="ticketTier" onChange={handleTicketChange} placeholder="Enter ticket tier" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="ticketPrice">
            <Form.Label>Ticket Price</Form.Label>
                <Form.Control type="text" name="ticketPrice" onChange={handleTicketChange} placeholder="Enter ticket price" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="ticketQuantity">
            <Form.Label>Ticket Quantity</Form.Label>
                <Form.Control type="text" name="ticketQuantity" onChange={handleTicketChange} placeholder="Enter ticket quantity" />
            </Form.Group>
                <Button variant="primary" type="submit" onClick={handleCreateTicket}>
                  Add tickets
                </Button>
          </Form>
        </>
  )
}

export default CreateTicketForm
