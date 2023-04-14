import { Router } from 'express'
import { getEvents, addEvent, getEvent, updateEvent, deleteEvent } from '../controllers/events'
import isAdmin from '../middlewares/admin'

const router = Router()

// add is admin middleware before routes

router.get('/events', getEvents)
router.post('/events', addEvent)
router.get('/event/:id', getEvent)
router.put('/events/event/:id', updateEvent)
router.delete('/events/event/:id', deleteEvent)

export default router
