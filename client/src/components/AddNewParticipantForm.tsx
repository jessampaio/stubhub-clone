import axios, { AxiosError } from 'axios'
import React, { ReactNode, useState } from 'react'
import { MultiSelect } from 'chakra-multiselect'
import {
  Select,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  FormErrorMessage,
  HStack
} from '@chakra-ui/react'


interface Props {
  handleStateChange: (key: string, value: string) => void;
  value: number | string;
}

interface ParticipantData {
  participant_id: number;
  name: string;
}

const AddNewParticipantForm = (props: Props) => {
  const [participantsSelectOptions, setParticipantsSelectOptions] = useState<ReactNode[]>([])
  const [showModal, setShowModal] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [newParticipant, setNewParticipant] = useState({
    name: ''
  })

  const getParticipants = () => {
    axios.get('http://localhost:3345/participants')
      .then(function (response) {
        if (response.data.length) {
          const options = response.data.map((participant: ParticipantData) => (
          <option key={participant.participant_id} value={participant.participant_id}>
            {participant.name}
          </option>)
          )
          setParticipantsSelectOptions(options)
        }
      })
      .catch(function (err) {
        console.log('There was an error getting participants.')
        throw err
      })
  }

  getParticipants()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewParticipant(prevParticipantInfo => {
      return {
        ...prevParticipantInfo,
        [event.target.name]: event.target.value
      }
    })
  }

  const handleAddNewParticipant = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    axios.post('http://localhost:3345/participants', { ...newParticipant })
      .then(response => {
        setShowModal(false)
        props.handleStateChange('participantId', response.data[0].participant_id)
        console.log(response)
        getParticipants()
      })
      .catch((err: AxiosError) => setErrorMessage(err?.response?.data as string || 'Unknown error.'))
  }

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value)
    props.handleStateChange('participantId', event.target.value)
  }

  return (
      <>
        <HStack justifyContent={'space-between'} mb={'10px'}>
        <Select aria-label="Select a participant" value={props.value} onChange={handleSelect}>
          <option>Choose a participant</option>
            {participantsSelectOptions}
        </Select>
        <Button onClick={() => setShowModal(true)}>
        Add new Participant
        </Button>
        </HStack>
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add new participant</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <FormControl isInvalid={Boolean(errorMessage)}>
              <FormLabel>New Participant</FormLabel>
                <Input type="text" name="name" onChange={handleChange} placeholder="Enter participant name" />
                  {
                    errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>
                  }
                <Button type="submit" onClick={handleAddNewParticipant}>
                  Add new participant
                </Button>
          </FormControl>
        </ModalBody>
        </ModalContent>
      </Modal>
      </>
  )
}

export default AddNewParticipantForm
