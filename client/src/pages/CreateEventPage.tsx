import { Navigate } from 'react-router-dom'
import AddEventForm from '../components/AddEventForm'
import { useCookies } from 'react-cookie'

const CreateEventPage = () => {
  const [cookies] = useCookies(['user'])

  if (!cookies.user.isAdmin) {
    return (
      <Navigate to='/' />
    )
  }

  return (
    <>
      <AddEventForm />
    </>
  )
}

export default CreateEventPage
