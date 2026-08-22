import { useState, useEffect } from 'react'
import '../styles/ComponentStyle.css'

const Workouts = () => {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const codespaceName = import.meta.env.VITE_CODESPACE_NAME
        if (!codespaceName) {
          throw new Error('VITE_CODESPACE_NAME environment variable is not set')
        }
        const url = `https://${codespaceName}-8000.app.github.dev/api/workouts/`
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setWorkouts(Array.isArray(data) ? data : data.results || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchWorkouts()
  }, [])

  if (loading) return <div className="loading">Loading workouts...</div>
  if (error) return <div className="error">Error: {error}</div>

  return (
    <div className="component-container">
      <h1>Workouts</h1>
      <div className="data-grid">
        {workouts.length > 0 ? (
          workouts.map((workout) => (
            <div key={workout.id} className="data-card">
              <h3>{workout.name}</h3>
              <p><strong>Type:</strong> {workout.type}</p>
              <p><strong>Duration:</strong> {workout.duration} minutes</p>
              <p><strong>Intensity:</strong> {workout.intensity}</p>
              <p><strong>Date:</strong> {new Date(workout.date).toLocaleDateString()}</p>
            </div>
          ))
        ) : (
          <p>No workouts found</p>
        )}
      </div>
    </div>
  )
}

export default Workouts
