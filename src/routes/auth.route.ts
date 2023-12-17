import { Router } from 'express'
import { login, register } from '../controllers/auth.ctrl'
import { registerValidation } from '../middlewares/register.validation'
import { loginValidation } from '../middlewares/login.validation'
const router = Router()

router.post('/register', registerValidation, register)
router.post('/login', loginValidation, login)

export default router
