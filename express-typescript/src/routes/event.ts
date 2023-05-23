import { Router } from 'express'
import { getEvents, addEvent, getEvent, updateEvent, deleteEvent, getEventsAndParticipants } from '../controllers/events'

const router = Router()

router.get('/events', getEvents)
router.post('/events', addEvent)
router.get('/event/:id', getEvent)
router.get('/events/eventsandparticipants', getEventsAndParticipants)
router.put('/events/event/:id', updateEvent)
router.delete('/events/event/:id', deleteEvent)

export default router
