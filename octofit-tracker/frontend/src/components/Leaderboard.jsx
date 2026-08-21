import { useEffect, useState } from 'react'
import { fetchRecords } from '../api.js'
import { ResourceState } from './ResourceState.jsx'

export default function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })
  useEffect(() => { fetchRecords('leaderboard').then((data) => { setEntries(data.sort((a, b) => (a.rank || 999) - (b.rank || 999))); setState({ loading: false, error: '' }) }).catch((error) => setState({ loading: false, error: error.message })) }, [])
  return <section className="page-section"><div className="section-heading"><div><p className="eyebrow">Weekly standings</p><h1>Leaderboard</h1></div></div><ResourceState {...state} empty={!entries.length}><div className="leaderboard-list">{entries.map((entry) => <article className="leader-row" key={entry._id}><span className="rank">{String(entry.rank).padStart(2, '0')}</span><div><h2>{entry.user?.name || `Member ${String(entry.user).slice(-4)}`}</h2><p>{entry.team?.name || 'Team standings'}</p></div><strong>{entry.points} pts</strong></article>)}</div></ResourceState></section>
}