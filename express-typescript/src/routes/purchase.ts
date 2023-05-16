import { Router } from 'express'
import { initiatePurchase, completePurchase } from '../controllers/purchases'
import auth from '../middlewares/auth'

const router = Router()


router.post('/', initiatePurchase)
router.post('/complete', completePurchase)



export default router
