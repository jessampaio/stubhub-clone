import { Router } from 'express'
import { getVenues, addVenue, getVenue, updateVenue, deleteVenue } from '../controllers/venues'

const router = Router()

router.get('/venues', getVenues)
router.post('/venues', addVenue)
router.get('/venues/venue/:id', getVenue)
router.put('/venues/venue/:id', updateVenue)
router.delete('/venues/venue/:id', deleteVenue)

export default router
