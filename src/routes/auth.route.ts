import { Router } from 'express'
import {
  registerValidation,
  loginValidation,
  forgotEmailValidation,
  newPasswordValidation
} from '../middlewares/auth.validation'
import {
  forgotPassword,
  login,
  logout,
  recoveryPassword,
  register,
  verifyToken
} from '../controllers/auth.ctrl'

const router = Router()

router.post('/register', registerValidation, register)
router.post('/login', loginValidation, login)
router.post('/logout', logout)
router.get('/verify-token', verifyToken)
router.post('/forgot-password', forgotEmailValidation, forgotPassword)
router.put('/recovery-password/:token', newPasswordValidation, recoveryPassword)

export default router
