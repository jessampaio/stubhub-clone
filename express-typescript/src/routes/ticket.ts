import { Router } from 'express'
import { getPricedTickets, createTicket, getTicket, updateTicket, deleteTicket } from '../controllers/tickets'

const router = Router()

router.get('/tickets', getPricedTickets)
router.post('/tickets', createTicket)
router.get('/ticket/:id', getTicket)
router.put('/tickets/ticket/:id', updateTicket)
router.delete('/tickets/ticket/:id', deleteTicket)

export default router
