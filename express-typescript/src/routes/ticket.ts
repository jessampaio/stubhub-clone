import { Router } from 'express'
import { createTicket, getTieredTickets, updateTicket, deleteTicket, getTicketsRemaining } from '../controllers/tickets'

const router = Router()

router.get('/tickets', getTicketsRemaining)
router.post('/tickets', createTicket)
router.get('/ticket/getTicket', getTieredTickets)
router.put('/tickets/ticket/update', updateTicket)
router.delete('/tickets/ticket/:id', deleteTicket)

export default router
