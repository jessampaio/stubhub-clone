import axios, { AxiosError } from 'axios'
import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

interface Props {
  handleSelect: (event: any) => void,
  value: number | string;
}

const VenueEntryForm = (props: Props) => {
  const [venuesSelectOptions, setVenuesSelectOptions] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [err, setErr] = useState<any>({})

  const getVenues = () => {
    axios.get('http://localhost:3345/venues')
      .then(function (response) {
        if (response.data.length) {
          const options = response.data.map((venue: Record<string, any>) => (
          <option key={venue.venue_id} value={venue.venue_id}>
            {venue.venue_name}
          </option>)
          )

          setVenuesSelectOptions(options)
        }
      })
      .catch(function (err) {
        console.log('There was an error.')
        throw err
      })
  }

  getVenues()

  const [newVenueInfo, setNewVenueInfo] = useState({
    venueName: '',
    venueCapacity: 0,
    venueCity: '',
    venueState: ''
  })

  const handleChange = (event: any) => {
    setNewVenueInfo(prevNewVenueInfo => {
      return {
        ...prevNewVenueInfo,
        [event.target.name]: event.target.value
      }
    })
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setErr({})
  }

  const handleAddNewVenue = (event: any) => {
    event.preventDefault()
    axios.post('http://localhost:3345/venues', { ...newVenueInfo })
      .then(data => {
        setShowModal(false)
        getVenues()
      })
      .catch((err: AxiosError) => setErr(err))
  }

  return (
      <>
        <Form.Select aria-label="Default select example" value={props.value} onChange={props.handleSelect}>
          <option>Choose a venue</option>
            {venuesSelectOptions}
        </Form.Select>

        <Button variant="primary" onClick={() => setShowModal(true)}>
        Add new Venue
        </Button>

      <Modal
        show={showModal}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton onHide={handleCloseModal}>
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
                <Button variant="primary" type="submit" onClick={handleAddNewVenue}>
                  Add new venue
                </Button>
          </Form>
        </Modal.Body>
      </Modal>
      </>
  )
}

export default VenueEntryForm
