import axios, { AxiosError } from 'axios'
import { useState } from 'react'
import { Select } from '@chakra-ui/react'
import { FormControl, FormLabel, Input } from '@chakra-ui/react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'

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
        <Select aria-label="Default select example" value={props.value} onChange={props.handleSelect}>
          <option>Choose a venue</option>
            {venuesSelectOptions}
        </Select>

        <Button onClick={() => setShowModal(true)}>
        Add new Venue
        </Button>

        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add new venue</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <FormControl>
              <FormLabel>Venue Name</FormLabel>
                <Input type="text" name="venueName" onChange={handleChange} placeholder="Enter venue name" />
                  {err.response && <span>{err.response.data}</span>}
            <FormLabel>Venue capacity</FormLabel>
                <Input type="text" name="venueCapacity" onChange={handleChange} placeholder="Enter venue capacity" />
            <FormLabel>Venue city</FormLabel>
                <Input type="text" name="venueCity" onChange={handleChange} placeholder="Enter venue city" />
            <FormLabel>Venue state</FormLabel>
                <Input type="text" name="venueState" onChange={handleChange} placeholder="Enter venue state" />
                <Button type="submit" onClick={handleAddNewVenue}>
                  Add new venue
                </Button>
          </FormControl>
        </ModalBody>
        </ModalContent>
      </Modal>
      </>
  )
}

export default VenueEntryForm
