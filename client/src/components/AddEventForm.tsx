import axios, { AxiosError } from 'axios'
import React, { useContext, useState } from 'react'
import { FormControl, FormLabel, Input } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import EventContext from '../contexts/eventContext'
import VenueEntryForm from './VenueEntryForm'
import CategoryEntryForm from './CategoryEntryForm'

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
      description: "Event has been created succesfully",
      status: 'success',
      duration: 9000,
      isClosable: true,
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


  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>, stateKey: string) => {
    setEventInfo((prevEvent: any) => ({
      ...prevEvent,
      [stateKey]: event.target.value
    }))
  }

  return (
      <>
        <CategoryEntryForm value={eventInfo.categoryId} handleSelect={(e: React.ChangeEvent<HTMLSelectElement>) => handleSelect(e, 'categoryId')}/>
        <VenueEntryForm value={eventInfo.venueId} handleSelect={(e: any) => handleSelect(e, 'venueId')} />
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
                <Button type="submit" onClick={handleCreateEvent}>
                  Add new Event
                </Button>
          </FormControl>
      </>
  )
}

export default AddEventForm
