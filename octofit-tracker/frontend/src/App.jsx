import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="nav-container">
            <Link to="/" className="nav-logo">OctoFit Tracker</Link>
            <ul className="nav-menu">
              <li className="nav-item">
                <Link to="/activities" className="nav-link">Activities</Link>
              </li>
              <li className="nav-item">
                <Link to="/leaderboard" className="nav-link">Leaderboard</Link>
              </li>
              <li className="nav-item">
                <Link to="/teams" className="nav-link">Teams</Link>
              </li>
              <li className="nav-item">
                <Link to="/users" className="nav-link">Users</Link>
              </li>
              <li className="nav-item">
                <Link to="/workouts" className="nav-link">Workouts</Link>
              </li>
            </ul>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/" element={
              <div className="home">
                <h1>Welcome to OctoFit Tracker</h1>
                <p>Track your fitness activities and compete with your team!</p>
              </div>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
