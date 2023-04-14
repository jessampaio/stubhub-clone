import { Router } from 'express'
import { getUsers, registerUser, deleteUser, updateUser, login, logout } from '../controllers/users'
import auth from '../middlewares/auth'

const router = Router()

router.get('/users', getUsers)
router.post('/users', registerUser)
router.post('/login', login)
router.put('/users/user/:id', auth, updateUser)
router.post('/logout', auth, logout)
router.delete('/users/user/:id', auth, deleteUser)

export default router
