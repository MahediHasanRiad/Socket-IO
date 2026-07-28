import {Router} from 'express'
import { registerController } from '../controllers/register.controller'
import { LoginController } from '../controllers/login.controller'
import { AllUserController } from '../controllers/all-user.controller'

const authRouter = Router()


authRouter.post('/register', registerController)
authRouter.post('/login', LoginController)
authRouter.get('/all-user', AllUserController)



export {authRouter}