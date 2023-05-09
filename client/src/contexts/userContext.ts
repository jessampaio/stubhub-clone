import React from 'react'

interface UserContextType {
  currentUser: any;
  setCurrentUser: any
}

const UserContext = React.createContext<UserContextType>(
  {} as UserContextType
)

export default UserContext
