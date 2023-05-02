import { Box, Heading, Image } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Event } from './CreateTicketForm'
import axios from 'axios'

interface EventState {
    events: Event[];
}

interface EventBoxProps {
    category: string;
}

const EventBox = (props: EventBoxProps) => {

    const [event, setEvent] = useState<EventState>()


    const getEvents = () => {
        axios.get(`http://localhost:3345/events?category=${props.category}`)
        .then(function (response) {
            if (response) {
                const events = response.data.map((event: Event) => (
                    <Box key={event.event_id} height='170px' mb={'30px'}>
                    <Image boxSize='200px' 
                            mb={'10px'} 
                            borderRadius={'10px'} 
                            src='https://loremflickr.com/640/480/concerts' 
                            alt='Concert Image' />
                    <Heading as='h5' size='sm'>
                        {event.event_name}
                    </Heading>
                  </Box>
                ))
                setEvent(events)
            }
        })
    }

    useEffect(() => {
        getEvents()
    }, [])

  return (
    <>
        {event}
    </>
  )
}

export default EventBox