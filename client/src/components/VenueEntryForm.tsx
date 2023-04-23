import axios, { AxiosError } from 'axios'
import { ReactNode, useState } from 'react'
import { Select, FormControl, FormLabel, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Button, FormErrorMessage, HStack } from '@chakra-ui/react'

interface Props {
  handleStateChange: (key: string, value: string) => void;
  value: number | string;
}

interface VenueData {
  venue_id: number;
  venue_name: string;
  venue_capacity: number;
  venue_city: string;
  venue_state: string;
}

const VenueEntryForm = (props: Props) => {
  const [venuesSelectOptions, setVenuesSelectOptions] = useState<ReactNode[]>([])
  const [showModal, setShowModal] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [newVenueInfo, setNewVenueInfo] = useState({
    venueName: '',
    venueCapacity: 0,
    venueCity: '',
    venueState: '',
    sections: 0,
    seats: 0
  })

  const getVenues = () => {
    axios.get('http://localhost:3345/venues')
      .then(function (response) {
        if (response.data.length) {
          const options = response.data.map((venue: VenueData) => (
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


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewVenueInfo(prevNewVenueInfo => {
      return {
        ...prevNewVenueInfo,
        [event.target.name]: event.target.value
      }
    })
  }

  const handleAddNewVenue = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    axios.post('http://localhost:3345/venues', { ...newVenueInfo })
      .then(response => {
        setShowModal(false)
        props.handleStateChange('venueId', response.data.venue_id)
        getVenues()
      })
      .catch((err: AxiosError) => setErrorMessage(err?.response?.data as string || 'Unknown error.'))
  }

  console.log(newVenueInfo)

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    props.handleStateChange('venueId', event.target.value)
  }

  return (
      <>
        <HStack spacing={'20px'} mb={'10px'}>
        <Select aria-label="Select a venue" value={props.value} onChange={handleSelect}>
          <option>Choose a venue</option>
            {venuesSelectOptions}
        </Select>
        <Button onClick={() => setShowModal(true)}>
        Add new Venue
        </Button>
        </HStack>
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add new venue</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <FormControl isInvalid={Boolean(errorMessage)}>
              <FormLabel>Venue Name</FormLabel>
                <Input type="text" name="venueName" onChange={handleChange} placeholder="Enter venue name" />
                  {
                    errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>
                  }
            <FormLabel>Venue capacity</FormLabel>
                <Input type="number" name="venueCapacity" onChange={handleChange} placeholder="Enter venue capacity" />
            <FormLabel>Venue city</FormLabel>
                <Input type="text" name="venueCity" onChange={handleChange} placeholder="Enter venue city" />
            <FormLabel>Venue state</FormLabel>
                <Input type="text" name="venueState" onChange={handleChange} placeholder="Enter venue state" />
                <FormLabel>Number of sections</FormLabel>
                <Input type="number" name="sections" onChange={handleChange} placeholder="Enter number of sections" />
            <FormLabel>Number of seats per section</FormLabel>
                <Input type="number" name="seats" onChange={handleChange} placeholder="Enter number of seats per section" />
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
