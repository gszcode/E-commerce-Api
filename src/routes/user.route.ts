import { Router } from 'express'
import { register } from '../controllers/user.ctrl'
const router = Router()

router.post('/register', register)

export default router
