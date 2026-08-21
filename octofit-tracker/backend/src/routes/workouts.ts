import { createResourceRouter } from './resourceRouter.js'
import workoutModel from '../models/workout.js'

export default createResourceRouter('workouts', workoutModel)