import { useState, useEffect } from 'react'
import '../styles/ComponentStyle.css'

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const codespaceName = import.meta.env.VITE_CODESPACE_NAME
        if (!codespaceName) {
          throw new Error('VITE_CODESPACE_NAME environment variable is not set')
        }
        const url = `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setLeaderboard(Array.isArray(data) ? data : data.results || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchLeaderboard()
  }, [])

  if (loading) return <div className="loading">Loading leaderboard...</div>
  if (error) return <div className="error">Error: {error}</div>

  return (
    <div className="component-container">
      <h1>Leaderboard</h1>
      <div className="leaderboard-table">
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Points</th>
              <th>Activities</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.length > 0 ? (
              leaderboard.map((entry, index) => (
                <tr key={entry.id}>
                  <td>{index + 1}</td>
                  <td>{entry.username}</td>
                  <td>{entry.points}</td>
                  <td>{entry.activity_count}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No leaderboard data found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Leaderboard
