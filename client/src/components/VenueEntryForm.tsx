import axios, { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const VenueEntryForm = () => {
  const [venues, setVenues] = useState([])

  const getVenues = () => {
    axios.get('http://localhost:3345/venues')
      .then(function (response) {
        if (response.data.length) {
          setVenues(response.data)
        }
      })
      .catch(function (err) {
        console.log('There was an error.')
        throw err
      })
  }

  useEffect(() => getVenues(), [])

  const venuesList = venues.map((venue: Record<string, any>) => (
    <option key={venue.venue_id} value={venue.venue_id}>
      {venue.venue_name}
    </option>)
  )

  const [show, setShow] = useState(false)

  const handleShow = () => setShow(true)

  const [venueInfo, setVenueInfo] = useState({
    venueName: '',
    venueCapacity: 0,
    venueCity: '',
    venueState: ''
  })

  const handleChange = (event: any) => {
    setVenueInfo(prevVenueInfo => {
      return {
        ...prevVenueInfo,
        [event.target.name]: event.target.value
      }
    })
  }

  const [err, setErr] = useState<any>({})

  const handleClose = () => {
    setShow(false)
    setErr({})
  }

  const handleClick = (event: any) => {
    event.preventDefault()
    axios.post('http://localhost:3345/venues', { ...venueInfo })
      .then(data => {
        setShow(false)
        getVenues()
      })
      .catch((err: AxiosError) => setErr(err))
  }

  return (
      <>
        <Form.Select aria-label="Default select example">
          <option>Choose a venue</option>
            {venuesList.length ? venuesList : null}
        </Form.Select>

        <Button variant="primary" onClick={handleShow}>
        Add new Venue
        </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton onHide={handleClose}>
          <Modal.Title>Add new Venue</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="venueName">
              <Form.Label>Venue Name</Form.Label>
                <Form.Control type="text" name="venueName" onChange={handleChange} placeholder="Enter venue name" />
                  {err.response && <span>{err.response.data}</span>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="venueCapacity">
            <Form.Label>Venue capacity</Form.Label>
                <Form.Control type="text" name="venueCapacity" onChange={handleChange} placeholder="Enter venue capacity" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="venueCity">
            <Form.Label>Venue city</Form.Label>
                <Form.Control type="text" name="venueCity" onChange={handleChange} placeholder="Enter venue city" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="venueState">
            <Form.Label>Venue state</Form.Label>
                <Form.Control type="text" name="venueState" onChange={handleChange} placeholder="Enter venue state" />
            </Form.Group>
                <Button variant="primary" type="submit" onClick={handleClick}>
                  Add new venue
                </Button>
          </Form>
        </Modal.Body>
      </Modal>

      </>

  )
}

export default VenueEntryForm
