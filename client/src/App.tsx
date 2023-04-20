import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CreateEventPage from './pages/CreateEventPage'
import EventContext from './contexts/eventContext'
import CreateTicketPage from './pages/CreateTicketPage'

const INITIAL_EVENT_STATE = {
  eventName: '',
  eventDate: '',
  eventTime: '',
  ticketAmount: 0,
  categoryId: '',
  venueId: ''
}

export default function App (): any {
  const [eventInfo, setEventInfo] = useState<Record<string, any>>(INITIAL_EVENT_STATE)

  function resetEventInfo () {
    setEventInfo(INITIAL_EVENT_STATE)
  }

  return (
        <EventContext.Provider value={{ eventInfo, setEventInfo, resetEventInfo }}>
    <BrowserRouter>
    <Routes>
          <Route path="/createEvent" element={<CreateEventPage />} />
          <Route path="/createTicket" element={<CreateTicketPage />} />
    </Routes>
    </BrowserRouter>
        </EventContext.Provider>
  )
}
