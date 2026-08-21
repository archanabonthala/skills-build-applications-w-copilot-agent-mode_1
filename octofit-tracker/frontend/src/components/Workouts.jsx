import { useEffect, useState } from 'react'
import { apiBaseUrl, getRecords } from '../api.js'
import { ResourceState } from './ResourceState.jsx'

export default function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })
  useEffect(() => { fetch(`${apiBaseUrl}/api/workouts/`).then((response) => { if (!response.ok) throw new Error('Unable to load workouts'); return response.json() }).then((payload) => { setWorkouts(getRecords(payload)); setState({ loading: false, error: '' }) }).catch((error) => setState({ loading: false, error: error.message })) }, [])
  return <section className="page-section"><div className="section-heading"><div><p className="eyebrow">Train with intent</p><h1>Workouts</h1></div></div><ResourceState {...state} empty={!workouts.length}><div className="card-grid">{workouts.map((workout) => <article className="data-card workout-card" key={workout._id}><div className="workout-meta"><span>{workout.difficulty}</span><span>{workout.durationMinutes} min</span></div><h2>{workout.title}</h2><p>{workout.focus}</p><ul>{workout.exercises?.map((exercise) => <li key={exercise}>{exercise}</li>)}</ul></article>)}</div></ResourceState></section>
}