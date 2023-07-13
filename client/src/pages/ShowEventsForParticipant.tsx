import { Button, Card, CardBody, Center, Container, Heading, Image, Stack, Text } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const ShowEventsForParticipant = () => {
  const [eventsInfo, setEventsInfo] = useState<any>([])

  const { id } = useParams()
  const navigate = useNavigate()

  function buildParticipantInfo() {
    return eventsInfo.map((event: any) => (
      <Container key={event.event_id} maxW="550" marginTop={'20px'} marginBottom={'20px'}>
        <Card maxW="900">
          <CardBody>
            <Image src={event.event_img} alt={event.event_name} borderRadius="lg" />

            <Card>
              <Stack mt="6" spacing="3" />
              <Heading size="md">{event.event_name}</Heading>

              <Text>{event.venue_name}</Text>
              <Text>
                {event.venue_city} <span>{event.venue_state}</span>
              </Text>
              <Text>
                {event.event_time} <span>{event.event_date}</span>
              </Text>
              <Button
                onClick={() => {
                  handleSeeEvent(event, event.event_id)
                }}>
                See Event
              </Button>

            </Card>
          </CardBody>
        </Card >
      </Container >
    ))
  }

  const handleSeeEvent = (event: React.MouseEvent<HTMLButtonElement>, id: number) => {
    navigate(`/events/${id}`)
  }

  useEffect(() => {
    axios
      .get(`http://ec2-54-164-122-6.compute-1.amazonaws.com:3001/participant/${id}`)
      .then(function (response) {
        if (response) {
          console.log('the response', response.data)
          setEventsInfo(response.data)
        }
      })
  }, [id])

  console.log(eventsInfo)

  const noEvents = () => {
    return (
      <>
        <Center>
          <Text padding={'30px'} fontWeight={'bold'}>There is no events for this perfomer yet.</Text>
        </Center>
      </>
    )
  }

  return (
    <>
      {eventsInfo.length > 0 ? buildParticipantInfo() : noEvents()}
    </>
  )
}

export default ShowEventsForParticipant
