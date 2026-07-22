import {Router} from 'express'
import { registerController } from '../controllers/register.controller'
import { LoginController } from '../controllers/login.controller'

const authRouter = Router()


authRouter.post('/register', registerController)
authRouter.post('/login', LoginController)


export {authRouter}