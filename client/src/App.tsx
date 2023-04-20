import CreateEventPage from './pages/CreateEventPage'
import EventContext from './contexts/eventContext'
import { useState } from 'react'

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
      <CreateEventPage />
    </EventContext.Provider>
  )
}
