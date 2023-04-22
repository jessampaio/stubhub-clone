import axios, { AxiosError } from 'axios'
import { useContext, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import CategoryEntryForm from './CategoryEntryForm'
import VenueEntryForm from './VenueEntryForm'
import Col from 'react-bootstrap/Col'
import Toast from 'react-bootstrap/Toast'
import EventContext from '../contexts/eventContext'

const AddEventForm = () => {
  const [showA, setShowA] = useState<boolean>(false)
  const [err, setErr] = useState<any>({})
  const { eventInfo, setEventInfo, resetEventInfo } = useContext(EventContext)

  const handleChange = (event: any) => {
    setEventInfo((prevEventInfo: any) => {
      return {
        ...prevEventInfo,
        [event.target.name]: event.target.value
      }
    })
  }

  const handleCreateEvent = (event: any) => {
    event.preventDefault()
    axios.post('http://localhost:3345/events', eventInfo)
      .then(data => {
        if (data) {
          setShowA(true)
          resetEventInfo()
        }
      })
      .catch((err: AxiosError) => setErr(err))
  }

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>, stateKey: string) => {
    setEventInfo((prevEvent: any) => ({
      ...prevEvent,
      [stateKey]: event.target.value
    }))
  }

  return (
      <>
        <Col md={6} className="mb-2">
          <Toast show={showA} onClose={() => setShowA(false)}>
            <Toast.Header>
            <img
            src="holder.js/20x20?text=%20"
            className="rounded me-2"
            alt=""
            />
            <strong className="me-auto">Success!</strong>
            </Toast.Header>
            <Toast.Body>Event has been added succesfully.</Toast.Body>
          </Toast>
        </Col>
        <CategoryEntryForm value={eventInfo.categoryId} handleSelect={(e: React.ChangeEvent<HTMLSelectElement>) => handleSelect(e, 'categoryId')}/>
        <VenueEntryForm value={eventInfo.venueId} handleSelect={(e: any) => handleSelect(e, 'venueId')} />
          <Form>
            <Form.Group className="mb-3" controlId="eventName">
              <Form.Label>Event Name</Form.Label>
                <Form.Control type="text" value={eventInfo.eventName} name="eventName" onChange={handleChange} placeholder="Enter event name" />
                  {err.response && <span>{err.response.data}</span>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="eventDate">
            <Form.Label>Event Date</Form.Label>
                <Form.Control type="text" value={eventInfo.eventDate} name="eventDate" onChange={handleChange} placeholder="Enter event date" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="eventTime">
            <Form.Label>Event Time</Form.Label>
                <Form.Control type="text" value={eventInfo.eventTime} name="eventTime" onChange={handleChange} placeholder="Enter event time" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="ticketAmount">
            <Form.Label>Ticket Amount</Form.Label>
                <Form.Control type="text" value={eventInfo.ticketAmount} name="ticketAmount" onChange={handleChange} placeholder="Enter ticket amount" />
            </Form.Group>
                <Button variant="primary" type="submit" onClick={handleCreateEvent}>
                  Add new Event
                </Button>
          </Form>
      </>
  )
}

export default AddEventForm
