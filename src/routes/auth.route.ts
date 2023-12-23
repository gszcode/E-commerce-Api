import { Router } from 'express'
import { login, logout, register, verifyToken } from '../controllers/auth.ctrl'
import { registerValidation } from '../middlewares/register.validation'
import { loginValidation } from '../middlewares/login.validation'
const router = Router()

router.post('/register', registerValidation, register)
router.post('/login', loginValidation, login)
router.post('/logout', logout)
router.get('/verify-token', verifyToken)

export default router
