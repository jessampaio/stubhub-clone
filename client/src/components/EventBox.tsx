import { Box, Heading, Image } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Event } from './CreateTicketForm'
import { Link } from 'react-router-dom'
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
    axios.get(`http://localhost:3345/events?category=${props.category}`).then(function (response) {
      if (response) {
        const events = response.data.map((event: Event) => (
          <Link key={event.event_id} to={`/events/${event.event_id}`}>
            <Box cursor={'pointer'} height="170px" mb={'20px'}>
              <Image height={'170px'} objectFit={'cover'} mb={'10px'} borderRadius={'10px'} src={event.event_img} alt={event.event_name} />
              <Heading as="h5" size="sm">
                {event.event_name}
              </Heading>
            </Box>
          </Link>
        ))
        setEvent(events)
      }
    })
  }

  useEffect(() => {
    getEvents()
  })

  return <>{event}</>
}

export default EventBox
