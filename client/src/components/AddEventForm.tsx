import axios, { AxiosError } from 'axios'
import React, { useContext, useState } from 'react'
import { FormControl, FormLabel, Input, Button, useToast, Container } from '@chakra-ui/react'
import EventContext from '../contexts/eventContext'
import VenueEntryForm from './VenueEntryForm'
import CategoryEntryForm from './CategoryEntryForm'
import AddNewParticipantForm from './AddNewParticipantForm'

const AddEventForm = () => {
  const toast = useToast()
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

  const showToast = () => {
    toast({
      title: 'Event created.',
      description: 'Event has been created succesfully',
      status: 'success',
      duration: 9000,
      isClosable: true
    })
  }

  const handleCreateEvent = (event: any) => {
    event.preventDefault()
    axios.post('http://localhost:3345/events', eventInfo)
      .then(data => {
        if (data) {
          showToast()
          resetEventInfo()
        }
      })
      .catch((err: AxiosError) => setErr(err))
  }

  const setStateValue = (key: string, value: string) => {
    setEventInfo((prevEvent: any) => ({
      ...prevEvent,
      [key]: value
    }))
  }

  return (
      <Container maxW="550px">
        <h1>New Event:</h1>
        <CategoryEntryForm
          value={eventInfo.categoryId}
          handleStateChange={setStateValue}
        />
        <VenueEntryForm
        value={eventInfo.venueId}
        handleStateChange={setStateValue}
        />
        <AddNewParticipantForm
        value={eventInfo.participantId}
        handleStateChange={setStateValue}
        />
          <FormControl>
              <FormLabel>Event Name</FormLabel>
                <Input type="text" value={eventInfo.eventName} name="eventName" onChange={handleChange} placeholder="Enter event name" />
                  {err.response && <span>{err.response.data}</span>}
            <FormLabel>Event Date</FormLabel>
                <Input type="text" value={eventInfo.eventDate} name="eventDate" onChange={handleChange} placeholder="Enter event date" />
            <FormLabel>Event Time</FormLabel>
                <Input type="text" value={eventInfo.eventTime} name="eventTime" onChange={handleChange} placeholder="Enter event time" />
            <FormLabel>Ticket Amount</FormLabel>
                <Input type="text" value={eventInfo.ticketAmount} name="ticketAmount" onChange={handleChange} placeholder="Enter ticket amount" />
                <Button type="submit" onClick={handleCreateEvent} mt={'10px'}>
                  Add new Event
                </Button>
          </FormControl>
      </Container>
  )
}

export default AddEventForm
