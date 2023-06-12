import { createBrowserRouter } from 'react-router-dom'
import MyAccount from '../pages/MyAccount'
import { Login } from '../pages/Login'
import { Register } from '../pages/Register'
import CreateEventPage from '../pages/CreateEventPage'
import CreateTicketPage from '../pages/CreateTicketPage'
import ShowEventsForParticipant from '../pages/ShowEventsForParticipant'
import TicketInfoPage from '../pages/TicketInfoPage'
import Purchase from '../pages/Purchase'
import PaymentSuccess from '../pages/PaymentSuccess'
import Layout from '../pages/Layout'
import Home from '../pages/Home'
import ErrorPage from '../pages/ErrorPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        index: true,
        path: '/events/:eventId/',
        element: <TicketInfoPage />
      },
      {
        index: true,
        path: '/register',
        element: <Register />
      },
      {
        index: true,
        path: '/login',
        element: <Login />
      }
    ]
  },
  { path: '/my-account', element: <MyAccount /> },
  { path: '/createEvent', element: <CreateEventPage /> },
  { path: '/createTicket', element: <CreateTicketPage /> },
  { path: '/participant/:id', element: <ShowEventsForParticipant /> },
  { path: '/purchase', element: <Purchase /> },
  { path: '/success', element: <PaymentSuccess /> }
])

export default router
