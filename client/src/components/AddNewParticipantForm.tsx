import axios, { AxiosError } from 'axios'
import React, { useEffect, useState } from 'react'
import Select, { MultiValue } from 'react-select'
import {
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

interface ParticipantData {
  participant_id: number;
  name: string;
}
interface Participant {
  label: string;
  value: number;
}

interface Props {
  handleStateChange: (key: string, value: Participant[]) => void;
  value: any[];
}

const AddNewParticipantForm = (props: Props) => {
  const [participantsSelectOptions, setParticipantsSelectOptions] = useState<ParticipantData[]>([])
  const [showModal, setShowModal] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [newParticipant, setNewParticipant] = useState({
    name: ''
  })

  const getParticipants = () => {
    axios.get('http://localhost:3345/participants')
      .then(function (response) {
        if (response.data.length) {
          const options = response.data.map((participant: ParticipantData) => ({
            label: participant.name,
            value: participant.participant_id
          })
          )
          setParticipantsSelectOptions(options)
        }
      })
      .catch(function (err) {
        console.log('There was an error getting participants.')
        throw err
      })
  }

  useEffect(() => {
    getParticipants()
  }, [])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewParticipant(prevParticipant => {
      return {
        ...prevParticipant,
        [event.target.name]: event.target.value
      }
    })
  }

  const handleAddNewParticipant = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    axios.post('http://localhost:3345/participants', { ...newParticipant })
      .then(response => {
        setShowModal(false)
        console.log('posting the thing COMPONENT', response)
        props.handleStateChange('participantId',
          [...props.value,
            {
              label: response.data.name,
              value: response.data.participant_id
            }])
        getParticipants()
      })
      .catch((err: AxiosError) => setErrorMessage(err?.response?.data as string || 'Unknown error.'))
  }

  const handleSelect = (newValue: MultiValue<Participant>) => {
    console.log(newValue)

    props.handleStateChange('participantId', newValue as Participant[])
    console.log(newValue)
  }

  return (
      <>
        <HStack justifyContent={'space-between'} mb={'10px'}>
          <Select
          placeholder='Choose a participant'
          value={props.value}
          name='participantId'
          isMulti
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={handleSelect}
          options={participantsSelectOptions}
        />

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
