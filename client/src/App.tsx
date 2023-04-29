import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CreateEventPage from './pages/CreateEventPage'
import EventContext from './contexts/eventContext'
import CreateTicketPage from './pages/CreateTicketPage'
import { Grid, GridItem } from '@chakra-ui/react'
import NavBar from './components/NavBar'
import Home from './pages/Home'

const INITIAL_EVENT_STATE = {
  eventName: '',
  eventDate: '',
  eventTime: '',
  ticketAmount: 0,
  categoryId: '',
  venueId: '',
  participants: []
}

export default function App (): any {
  const [eventInfo, setEventInfo] = useState<Record<string, any>>(INITIAL_EVENT_STATE)

  function resetEventInfo () {
    setEventInfo(INITIAL_EVENT_STATE)
  }

  return (
        <EventContext.Provider value={{ eventInfo, setEventInfo, resetEventInfo }}>
    <BrowserRouter>
      <Grid templateAreas={{
        base: `"nav"
              "main"`
      }}>
        <GridItem area="nav" style={{ height: '100px' }}>
          <NavBar />
        </GridItem>
        <GridItem area="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/createEvent" element={<CreateEventPage />} />
            <Route path="/createTicket" element={<CreateTicketPage />} />
          </Routes>
        </GridItem>
      </Grid>
    </BrowserRouter>
        </EventContext.Provider>
  )
}
