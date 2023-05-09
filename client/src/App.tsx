import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CreateEventPage from './pages/CreateEventPage'
import EventContext from './contexts/eventContext'
import CreateTicketPage from './pages/CreateTicketPage'
import { Grid, GridItem } from '@chakra-ui/react'
import Home from './pages/Home'
import TicketInfoPage from './pages/TicketInfoPage'
import { INITIAL_LOGIN_STATE, Login } from './pages/Login'
import { Register } from './pages/Register'
import UserContext from './contexts/userContext'

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
  token: 'hello'
}

interface CurrentUser {
  email: string;
  password: string;
  token: string;
}

export default function App(): any {
  const [eventInfo, setEventInfo] = useState<Record<string, any>>(INITIAL_EVENT_STATE)
  const [currentUser, setCurrentUser] = useState<CurrentUser>(INITIAL_CURRENT_USER_STATE)


  function resetEventInfo() {
    setEventInfo(INITIAL_EVENT_STATE)
  }

  return (
    <EventContext.Provider value={{ eventInfo, setEventInfo, resetEventInfo }}>
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <BrowserRouter>
          <Grid
            templateAreas={{
              base: `"nav"
        "main"`
            }}
          >
            <GridItem area="nav" style={{ height: '100px' }}></GridItem>
            <GridItem area="main">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/createEvent" element={<CreateEventPage />} />
                <Route path="/createTicket" element={<CreateTicketPage />} />
                <Route path="/events/:eventId/" element={<TicketInfoPage />} />
              </Routes>
            </GridItem>
          </Grid>
        </BrowserRouter>
      </UserContext.Provider>
    </EventContext.Provider>
  )
}
