import { Router } from 'express'
import { sendMessage } from '../controllers/contact.ctrl'
import { contactValidation } from '../middlewares/contact.validation'
const router = Router()

router.post('/', contactValidation, sendMessage)

export default router
