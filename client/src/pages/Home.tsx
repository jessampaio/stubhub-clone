import { Fragment, useState } from 'react'
import EventContext from '../contexts/eventContext'
import { Container, Grid, GridItem, Heading, SimpleGrid } from '@chakra-ui/react'
import { INITIAL_LOGIN_STATE } from './Login'
import UserContext from '../contexts/userContext'
import EventBox from '../components/EventBox'
import { Outlet } from 'react-router-dom'

const INITIAL_EVENT_STATE = {
  eventName: '',
  eventDate: '',
  eventTime: '',
  ticketAmount: 0,
  categoryId: '',
  venueId: '',
  participants: [],
  eventImg: ''
}

const INITIAL_CURRENT_USER_STATE = {
  ...INITIAL_LOGIN_STATE,
  token: ''
}

interface CurrentUser {
  email: string;
  password: string;
  token: string;
}

export default function Home(): any {
  const [eventInfo, setEventInfo] = useState<Record<string, any>>(INITIAL_EVENT_STATE)
  const [currentUser, setCurrentUser] = useState<CurrentUser>(INITIAL_CURRENT_USER_STATE)
  const [eventAndTicket, setEventAndTicket] = useState<Record<string, any>>([])
  const [clientSecret, setClientSecret] = useState<any>('')

  function resetEventInfo() {
    setEventInfo(INITIAL_EVENT_STATE)
  }

  const events = [
    {
      category: 'sports',
      heading: 'Top Sports'
    },
    {
      category: 'concerts',
      heading: 'Top Concerts'
    },
    {
      category: 'testing1',
      heading: 'Theater & Comedy'
    }
  ]

  return (
    <EventContext.Provider value={{ eventInfo, setEventInfo, resetEventInfo }}>
      <UserContext.Provider value={{ currentUser, setCurrentUser, eventAndTicket, setEventAndTicket, clientSecret, setClientSecret }}>
        <Grid
          templateAreas={{
            base: `
              "main"`
          }}
        >
          <GridItem area="main">
            <Container maxW="1300px">
              {events.map((event, idx) => (
                <Fragment key={idx}>
                  <Heading size="md" mb="10px">
                    {event.heading}
                  </Heading>
                  <SimpleGrid minChildWidth="150px" spacing="30px" mb={'50px'}>
                    <EventBox category={event.category} />
                  </SimpleGrid>
                </Fragment>
              ))}
            </Container>
          </GridItem>
        </Grid>
      </UserContext.Provider>
    </EventContext.Provider >
  )
}
