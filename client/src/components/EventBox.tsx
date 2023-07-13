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

  useEffect(() => {
    const getEvents = () => {
      axios.get(`http://ec2-54-164-122-6.compute-1.amazonaws.com:3001/events?category=${props.category}`)
        .then(function (response) {
          if (response) {
            console.log(response)
            const events = response.data.map((event: Event) => (
              <Link key={event.event_id} to={`/events/${event.event_id}`}>
                <Box
                  _hover={{
                    transform: 'scale(1.03)',
                    transition: 'transform .15s ease-in'
                  }}
                  cursor={'pointer'}
                  height="170px"
                  mb={'20px'}>
                  <Image
                    width={'100%'}
                    height={'170px'}
                    objectFit={'cover'}
                    mb={'10px'}
                    borderRadius={'10px'}
                    src={event.event_img}
                    alt={event.event_name} />
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
    getEvents()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <>{event}</>
}

export default EventBox
