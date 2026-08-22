import { createResourceRouter } from './resourceRouter.js'
import leaderboardModel from '../models/leaderboard.js'

export default createResourceRouter('leaderboard', leaderboardModel)