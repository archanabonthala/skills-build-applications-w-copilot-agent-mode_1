import { createResourceRouter } from './resourceRouter.js'
import userModel from '../models/user.js'

export default createResourceRouter('users', userModel)