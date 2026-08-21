import { createResourceRouter } from './resourceRouter.js'
import activityModel from '../models/activity.js'

export default createResourceRouter('activities', activityModel)