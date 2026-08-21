import { useEffect, useState } from 'react'
import { fetchRecords } from '../api.js'
import { ResourceState } from './ResourceState.jsx'

export default function Users() {
  const endpoint = '/api/users/'
  const [users, setUsers] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })

  useEffect(() => {
    fetchRecords(endpoint).then((data) => {
      setUsers(data)
      setState({ loading: false, error: '' })
    }).catch((error) => setState({ loading: false, error: error.message }))
  }, [])

  return <section className="page-section">
    <div className="section-heading"><div><p className="eyebrow">Community</p><h1>Members</h1></div><span className="count-badge">{users.length} active</span></div>
    <ResourceState {...state} empty={!users.length}>
      <div className="profile-grid">{users.map((user) => <article className="profile-card" key={user._id || user.email}><div className="avatar">{user.avatar || user.name?.slice(0, 2).toUpperCase()}</div><div><h2>{user.name}</h2><p>{user.email}</p><strong>{user.points || 0} pts</strong></div></article>)}</div>
    </ResourceState>
  </section>
}