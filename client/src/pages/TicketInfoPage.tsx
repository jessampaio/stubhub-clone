import { Card, CardBody, Container, Heading, Image, Stack } from '@chakra-ui/react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import TicketCard from '../components/TicketCard'
import { useCookies } from 'react-cookie'

const TicketInfoPage = () => {
  const [eventInformation, setEventInformation] = useState([])
  const [cookies] = useCookies(['user'])

  const { eventId } = useParams()

  function buildEventInfo() {
    return eventInformation.map((event: any) => (
      <Container
        key={event.event_id}
        maxW="750"
        marginTop={'20px'}
        marginBottom={'20px'}>
        <Card
          maxW="750">
          <CardBody>
            <Image
              width={'100%'}
              src={event.event_img}
              alt={event.event_name} borderRadius="lg" />
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
  }

  console.log('user still there?', cookies.user)
  console.log(eventInformation)

  useEffect(() => {
    axios.get(`http://ec2-54-164-122-6.compute-1.amazonaws.com:3001/event/${eventId}`)
      .then(function (response) {
        if (response) {
          console.log('ticketInfoPage.tsx', response.data)
          setEventInformation(response.data)
        }
      })
  }, [eventId])

  return (
    <>
      {eventInformation.length > 0 && buildEventInfo()}
    </>
  )
}

export default TicketInfoPage
