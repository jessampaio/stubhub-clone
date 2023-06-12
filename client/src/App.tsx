import React, { useState } from 'react'
import { INITIAL_LOGIN_STATE } from './pages/Login';
import EventContext from './contexts/eventContext';
import UserContext from './contexts/userContext';
import AddEventForm from './components/AddEventForm';
import { RouterProvider } from 'react-router-dom';
import router from './routing/router';

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

const App = () => {
  const [eventInfo, setEventInfo] = useState<Record<string, any>>(INITIAL_EVENT_STATE)
  const [currentUser, setCurrentUser] = useState<CurrentUser>(INITIAL_CURRENT_USER_STATE)
  const [eventAndTicket, setEventAndTicket] = useState<Record<string, any>>([])
  const [clientSecret, setClientSecret] = useState<any>('')


  function resetEventInfo() {
    setEventInfo(INITIAL_EVENT_STATE)
  }

  return (
    <EventContext.Provider value={{ eventInfo, setEventInfo, resetEventInfo }}>
      <UserContext.Provider value={{ currentUser, setCurrentUser, eventAndTicket, setEventAndTicket, clientSecret, setClientSecret }}>
        <RouterProvider router={router} />
      </UserContext.Provider>
    </EventContext.Provider >
  )
}

export default App