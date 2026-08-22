import { useState, useEffect } from 'react'
import '../styles/ComponentStyle.css'

const Teams = () => {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const codespaceName = import.meta.env.VITE_CODESPACE_NAME
        if (!codespaceName) {
          throw new Error('VITE_CODESPACE_NAME environment variable is not set')
        }
        const url = `https://${codespaceName}-8000.app.github.dev/api/teams/`
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setTeams(Array.isArray(data) ? data : data.results || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchTeams()
  }, [])

  if (loading) return <div className="loading">Loading teams...</div>
  if (error) return <div className="error">Error: {error}</div>

  return (
    <div className="component-container">
      <h1>Teams</h1>
      <div className="data-grid">
        {teams.length > 0 ? (
          teams.map((team) => (
            <div key={team.id} className="data-card">
              <h3>{team.name}</h3>
              <p><strong>Members:</strong> {team.member_count}</p>
              <p><strong>Points:</strong> {team.points}</p>
              <p><strong>Description:</strong> {team.description}</p>
            </div>
          ))
        ) : (
          <p>No teams found</p>
        )}
      </div>
    </div>
  )
}

export default Teams
