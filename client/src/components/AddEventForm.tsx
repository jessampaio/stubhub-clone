import axios, { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import CategoryEntryForm from './CategoryEntryForm'
import VenueEntryForm from './VenueEntryForm'

const AddEventForm = () => {
  const [, setEvents] = useState([])

  const getEvents = () => {
    axios.get('http://localhost:3345/events')
      .then(function (response) {
        if (response.data.length) {
          setEvents(response.data)
        }
      })
      .catch(function (err) {
        console.log(err)
        throw err
      })
  }

  useEffect(() => getEvents(), [])

  // const eventsList = events.map((event: Record<string, any>) => (
  //   <option key={event.event_id} value={event.event_id}>
  //     {event.event_name}
  //   </option>)
  // )

  const [eventInfo, setEventInfo] = useState({
    eventName: '',
    eventDate: 0,
    eventTime: '',
    ticketAmount: 0
  })

  const handleChange = (event: any) => {
    setEventInfo(prevEventInfo => {
      return {
        ...prevEventInfo,
        [event.target.name]: event.target.value
      }
    })
  }

  const [err, setErr] = useState<any>({})

  const handleCreateEvent = (event: any) => {
    event.preventDefault()
    axios.post('http://localhost:3345/events', { ...eventInfo })
      .then(data => {
        console.log('The data', data)
      })
      .catch((err: AxiosError) => setErr(err))
  }

  console.log(eventInfo)

  const [selectedCategory, setSelectedCategory] = useState('')

  const handleSelect = (event: any) => {
    setSelectedCategory(event.target.value)
  }

  console.log(selectedCategory)

  return (
      <>
        <CategoryEntryForm handleSelect={handleSelect}/>
        <VenueEntryForm />
          <Form>
            <Form.Group className="mb-3" controlId="eventName">
              <Form.Label>Event Name</Form.Label>
                <Form.Control type="text" name="eventName" onChange={handleChange} placeholder="Enter event name" />
                  {err.response && <span>{err.response.data}</span>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="eventDate">
            <Form.Label>Event Date</Form.Label>
                <Form.Control type="text" name="eventDate" onChange={handleChange} placeholder="Enter event date" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="eventTime">
            <Form.Label>Event Time</Form.Label>
                <Form.Control type="text" name="eventTime" onChange={handleChange} placeholder="Enter event time" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="ticketAmount">
            <Form.Label>Ticket Amount</Form.Label>
                <Form.Control type="text" name="ticketAmount" onChange={handleChange} placeholder="Enter ticket amount" />
            </Form.Group>
                <Button variant="primary" type="submit" onClick={handleCreateEvent}>
                  Add new Event
                </Button>
          </Form>
      </>
  )
}

export default AddEventForm
