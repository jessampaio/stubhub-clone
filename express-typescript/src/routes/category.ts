import { Router } from 'express'
import { getCategories, getCategory, addCategory, updateCategory, deleteCategory } from '../controllers/categories'

const router = Router()

router.get('/categories', getCategories)
router.post('/categories', addCategory)
router.get('/category/:id', getCategory)
router.put('/categories/category/:id', updateCategory)
router.delete('/categories/category/:id', deleteCategory)

export default router
