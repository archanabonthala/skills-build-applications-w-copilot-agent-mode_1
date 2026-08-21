import { createResourceRouter } from './resourceRouter.js'
import teamModel from '../models/team.js'

export default createResourceRouter('teams', teamModel)