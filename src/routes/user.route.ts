import { Router } from 'express'
import { myAccount } from '../controllers/user.ctrl'
const router = Router()

router.get('/my-account', myAccount)

export default router
