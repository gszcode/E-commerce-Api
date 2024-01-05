import { Router } from 'express'
import { sendMessage } from '../controllers/contact.ctrl'
const router = Router()

router.post('/', sendMessage)

export default router
