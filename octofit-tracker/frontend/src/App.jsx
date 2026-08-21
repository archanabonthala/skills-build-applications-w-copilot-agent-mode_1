import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import { apiBaseUrl } from './api.js'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const navigation = [
  { to: '/activities', label: 'Activities', detail: 'Your movement' },
  { to: '/leaderboard', label: 'Leaderboard', detail: 'Weekly standings' },
  { to: '/teams', label: 'Teams', detail: 'Train together' },
  { to: '/users', label: 'Members', detail: 'Your community' },
  { to: '/workouts', label: 'Workouts', detail: 'Suggested sessions' },
]

function App() {
  return <div className="app-shell">
    <aside className="sidebar">
      <NavLink className="brand" to="/activities"><img src="/octofitapp-small.png" alt="" /><span>OctoFit<small>TRACKER</small></span></NavLink>
      <div className="sidebar-intro"><span className="live-dot" /> Live workspace</div>
      <nav aria-label="Primary navigation">{navigation.map((item) => <NavLink className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'} to={item.to} key={item.to}><span>{item.label}</span><small>{item.detail}</small></NavLink>)}</nav>
      <div className="sidebar-footer"><span>API connected</span><code>{apiBaseUrl.replace(/^https?:\/\//, '')}</code></div>
    </aside>
    <main className="main-content">
      <header className="topbar"><span className="topbar-kicker">A better week starts here</span><span className="date-stamp">OCTOFIT / 2026</span></header>
      <Routes><Route path="/" element={<Navigate to="/activities" replace />} /><Route path="/activities" element={<Activities />} /><Route path="/leaderboard" element={<Leaderboard />} /><Route path="/teams" element={<Teams />} /><Route path="/users" element={<Users />} /><Route path="/workouts" element={<Workouts />} /></Routes>
    </main>
  </div>
}

export default App
