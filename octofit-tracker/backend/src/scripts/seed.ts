import { connectDatabase, disconnectDatabase } from '../config/database.js'
import Activity from '../models/activity.js'
import Leaderboard from '../models/leaderboard.js'
import Team from '../models/team.js'
import User from '../models/user.js'
import Workout from '../models/workout.js'

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await connectDatabase()

    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ])

    const users = await User.create([
      { name: 'Maya Chen', email: 'maya.chen@example.com', avatar: 'MC', points: 920 },
      { name: 'Jordan Lee', email: 'jordan.lee@example.com', avatar: 'JL', points: 840 },
      { name: 'Sam Rivera', email: 'sam.rivera@example.com', avatar: 'SR', points: 760 },
      { name: 'Priya Shah', email: 'priya.shah@example.com', avatar: 'PS', points: 680 },
    ])

    const teams = await Team.create([
      {
        name: 'Peak Performers',
        motto: 'Small steps, strong finish.',
        color: '#176b87',
        members: [users[0]._id, users[1]._id],
      },
      {
        name: 'Trail Blazers',
        motto: 'Find your next summit.',
        color: '#d97706',
        members: [users[2]._id, users[3]._id],
      },
    ])

    await Activity.create([
      {
        user: users[0]._id,
        type: 'run',
        durationMinutes: 32,
        calories: 285,
        completedAt: new Date('2026-08-18T07:30:00Z'),
      },
      {
        user: users[1]._id,
        type: 'strength',
        durationMinutes: 45,
        calories: 330,
        completedAt: new Date('2026-08-18T18:00:00Z'),
      },
      {
        user: users[2]._id,
        type: 'cycle',
        durationMinutes: 55,
        calories: 490,
        completedAt: new Date('2026-08-19T06:45:00Z'),
      },
      {
        user: users[3]._id,
        type: 'yoga',
        durationMinutes: 25,
        calories: 110,
        completedAt: new Date('2026-08-19T17:30:00Z'),
      },
    ])

    await Leaderboard.create([
      { user: users[0]._id, team: teams[0]._id, points: 920, rank: 1, period: 'weekly' },
      { user: users[1]._id, team: teams[0]._id, points: 840, rank: 2, period: 'weekly' },
      { user: users[2]._id, team: teams[1]._id, points: 760, rank: 3, period: 'weekly' },
      { user: users[3]._id, team: teams[1]._id, points: 680, rank: 4, period: 'weekly' },
    ])

    await Workout.create([
      {
        title: 'Morning Momentum',
        focus: 'Full body',
        difficulty: 'beginner',
        durationMinutes: 20,
        exercises: ['Bodyweight squats', 'Incline push-ups', 'Plank hold'],
      },
      {
        title: 'Core Builder',
        focus: 'Core strength',
        difficulty: 'intermediate',
        durationMinutes: 30,
        exercises: ['Dead bugs', 'Mountain climbers', 'Side plank reach-through'],
      },
      {
        title: 'Endurance Ladder',
        focus: 'Cardio',
        difficulty: 'advanced',
        durationMinutes: 40,
        exercises: ['High knees', 'Burpees', 'Jumping lunges'],
      },
    ])

    console.log('Seed complete: 4 users, 2 teams, 4 activities, 4 leaderboard entries, 3 workouts')
  } catch (error) {
    console.error('Error seeding database:', error)
    process.exit(1);
  } finally {
    await disconnectDatabase()
  }
}

seedDatabase()
