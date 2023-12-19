import { Router } from 'express'
import { account } from '../controllers/user.ctrl'
import { verifyToken } from '../middlewares/verify.token'
const router = Router()

router.get('/account', verifyToken, account)

export default router
