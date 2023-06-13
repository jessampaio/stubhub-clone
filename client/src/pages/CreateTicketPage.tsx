import { useCookies } from 'react-cookie'
import CreateTicketForm from '../components/CreateTicketForm'
import { Navigate } from 'react-router-dom'

const CreateTicketPage = () => {
  const [cookies] = useCookies(['user'])

  if (!cookies.user?.isAdmin) {
    return (
      <Navigate to='/' />
    )
  }

  return (
    <>
      <CreateTicketForm />
    </>
  )
}

export default CreateTicketPage
