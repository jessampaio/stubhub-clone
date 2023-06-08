import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CreateEventPage from './pages/CreateEventPage'
import EventContext from './contexts/eventContext'
import CreateTicketPage from './pages/CreateTicketPage'
import { Grid, GridItem, Hide, Show } from '@chakra-ui/react'
import Home from './pages/Home'
import TicketInfoPage from './pages/TicketInfoPage'
import { INITIAL_LOGIN_STATE, Login } from './pages/Login'
import { Register } from './pages/Register'
import UserContext from './contexts/userContext'
import Purchase from './pages/Purchase'
import Footer from './components/Footer'
import PaymentSuccess from './pages/PaymentSuccess'
import MyAccount from './pages/MyAccount'
import ShowEventsForParticipant from './pages/ShowEventsForParticipant'
import MainSearchBar from './components/MainSearchBar'

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

export default function App(): any {
  const [eventInfo, setEventInfo] = useState<Record<string, any>>(INITIAL_EVENT_STATE)
  const [currentUser, setCurrentUser] = useState<CurrentUser>(INITIAL_CURRENT_USER_STATE)
  const [eventAndTicket, setEventAndTicket] = useState<Record<string, any>>([])
  const [clientSecret, setClientSecret] = useState<any>('')

  function resetEventInfo() {
    setEventInfo(INITIAL_EVENT_STATE)
  }

  const showNavBar = () => {
    const login = window.location.href

    if (login.includes('login') === true) {
      return (
        <Hide>
          <GridItem area="nav">
            <MainSearchBar />
          </GridItem>
        </Hide>
      )
    }
    else {
      return (
        <GridItem area="nav">
          <MainSearchBar />
        </GridItem>
      )
    }
  }

  return (
    <EventContext.Provider value={{ eventInfo, setEventInfo, resetEventInfo }}>
      <UserContext.Provider value={{ currentUser, setCurrentUser, eventAndTicket, setEventAndTicket, clientSecret, setClientSecret }}>
        <Grid
          templateAreas={{
            base: `
              "nav"
              "main" 
              "footer"`
          }}
        >
          <>
            {showNavBar()}
          </>
          <GridItem area="main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/my-account" element={<MyAccount />} />
              <Route path="/createEvent" element={<CreateEventPage />} />
              <Route path="/createTicket" element={<CreateTicketPage />} />
              <Route path="/participant/:id" element={<ShowEventsForParticipant />} />
              <Route path="/events/:eventId/" element={<TicketInfoPage />} />
              <Route path="/purchase" element={<Purchase />} />
              <Route path="/success" element={<PaymentSuccess />} />
            </Routes>
          </GridItem>
          <GridItem area='footer'>
            <Footer />
          </GridItem>
        </Grid>
      </UserContext.Provider>
    </EventContext.Provider >
  )
}
