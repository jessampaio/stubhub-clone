import { Router } from 'express'
import { getParticipants, addParticipant, getParticipant, deleteParticipant } from '../controllers/participants'

const router = Router()

router.get('/participants', getParticipants)
router.post('/participants', addParticipant)
router.get('/participant/:id', getParticipant)
router.delete('/participants/participant/:id', deleteParticipant)

export default router
