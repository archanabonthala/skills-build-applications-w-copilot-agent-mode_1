import { useState, useEffect } from 'react'
import '../styles/ComponentStyle.css'

const Activities = () => {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const codespaceName = import.meta.env.VITE_CODESPACE_NAME
        if (!codespaceName) {
          throw new Error('VITE_CODESPACE_NAME environment variable is not set')
        }
        const url = `https://${codespaceName}-8000.app.github.dev/api/activities/`
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setActivities(Array.isArray(data) ? data : data.results || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchActivities()
  }, [])

  if (loading) return <div className="loading">Loading activities...</div>
  if (error) return <div className="error">Error: {error}</div>

  return (
    <div className="component-container">
      <h1>Activities</h1>
      <div className="data-grid">
        {activities.length > 0 ? (
          activities.map((activity) => (
            <div key={activity.id} className="data-card">
              <h3>{activity.name}</h3>
              <p><strong>Type:</strong> {activity.type}</p>
              <p><strong>Duration:</strong> {activity.duration} minutes</p>
              <p><strong>Calories:</strong> {activity.calories}</p>
              <p><strong>Date:</strong> {new Date(activity.date).toLocaleDateString()}</p>
            </div>
          ))
        ) : (
          <p>No activities found</p>
        )}
      </div>
    </div>
  )
}

export default Activities
