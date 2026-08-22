import { useState, useEffect } from 'react'
import '../styles/ComponentStyle.css'

const Users = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const codespaceName = import.meta.env.VITE_CODESPACE_NAME
        if (!codespaceName) {
          throw new Error('VITE_CODESPACE_NAME environment variable is not set')
        }
        const url = `https://${codespaceName}-8000.app.github.dev/api/users/`
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setUsers(Array.isArray(data) ? data : data.results || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  if (loading) return <div className="loading">Loading users...</div>
  if (error) return <div className="error">Error: {error}</div>

  return (
    <div className="component-container">
      <h1>Users</h1>
      <div className="data-grid">
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user.id} className="data-card">
              <h3>{user.username}</h3>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Points:</strong> {user.points}</p>
              <p><strong>Team:</strong> {user.team}</p>
              <p><strong>Joined:</strong> {new Date(user.joined_date).toLocaleDateString()}</p>
            </div>
          ))
        ) : (
          <p>No users found</p>
        )}
      </div>
    </div>
  )
}

export default Users
