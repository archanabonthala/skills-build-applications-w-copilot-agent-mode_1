import { useEffect, useState } from 'react'
import { fetchRecords, formatDate } from '../api.js'
import { ResourceState } from './ResourceState.jsx'

export default function Activities() {
  const endpoint = '/api/activities/'
  const [activities, setActivities] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })
  useEffect(() => { fetchRecords(endpoint).then((data) => { setActivities(data); setState({ loading: false, error: '' }) }).catch((error) => setState({ loading: false, error: error.message })) }, [])
  return <section className="page-section"><div className="section-heading"><div><p className="eyebrow">Movement log</p><h1>Activities</h1></div></div><ResourceState {...state} empty={!activities.length}><div className="table-wrap"><table><thead><tr><th>Activity</th><th>Duration</th><th>Calories</th><th>Completed</th></tr></thead><tbody>{activities.map((activity) => <tr key={activity._id}><td><strong>{activity.type}</strong></td><td>{activity.durationMinutes} min</td><td>{activity.calories} kcal</td><td>{formatDate(activity.completedAt)}</td></tr>)}</tbody></table></div></ResourceState></section>
}