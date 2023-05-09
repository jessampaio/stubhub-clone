import { Card, CardBody, Container, Heading, Image, Stack } from '@chakra-ui/react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import TicketCard from '../components/TicketCard'

const TicketInfoPage = () => {
  const [eventInformation, setEventInformation] = useState([])

  const { eventId } = useParams()

  const getEventInfo = () => {
    axios.get(`http://localhost:3345/event/${eventId}`)
      .then(function (response) {
        if (response) {
          console.log(response.data)
          const eventDetails = response.data.map((event: any) => (
            <Container key={event.event_id} maxW="900">
              <Card maxW="900">
                <CardBody>
                  <Image src={event.event_img} alt={event.event_name} borderRadius="lg" />
                  <Stack mt="6" spacing="3" />
                  <Heading size="md">{event.event_name}</Heading>
                  <p>{event.venue_name}</p>
                  <p>
                    {event.venue_city} <span>{event.venue_state}</span>
                  </p>
                  <p>
                    {event.event_time} <span>{event.event_date}</span>
                  </p>
                </CardBody>
              </Card>
              <Stack>
                <TicketCard eventId={event.event_id} />
              </Stack>
            </Container>
          ))
          setEventInformation(eventDetails)
        }
      })
  }

  useEffect(() => {
    getEventInfo()
  })

  return (
    <>
      {eventInformation}
    </>
  )
}

export default TicketInfoPage
