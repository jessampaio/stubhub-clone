import { Router } from 'express'
import { initiatePurchase, completePurchase } from '../controllers/purchases'

const router = Router()


router.post('/purchases', initiatePurchase)
router.post('/purchases/complete', completePurchase)



export default router
