import React from 'react'

interface UserContextType {
  currentUser: any;
  setCurrentUser: any;
  eventAndTicket: any;
  setEventAndTicket: any;
  clientSecret: any;
  setClientSecret: any;
}

const UserContext = React.createContext<UserContextType>(
  {} as UserContextType
)

export default UserContext
