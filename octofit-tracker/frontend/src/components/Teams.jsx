import { useEffect, useState } from 'react'
import { apiBaseUrl, getRecords } from '../api.js'
import { ResourceState } from './ResourceState.jsx'

export default function Teams() {
  const [teams, setTeams] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })
  useEffect(() => { fetch(`${apiBaseUrl}/api/teams/`).then((response) => { if (!response.ok) throw new Error('Unable to load teams'); return response.json() }).then((payload) => { setTeams(getRecords(payload)); setState({ loading: false, error: '' }) }).catch((error) => setState({ loading: false, error: error.message })) }, [])
  return <section className="page-section"><div className="section-heading"><div><p className="eyebrow">Find your people</p><h1>Teams</h1></div></div><ResourceState {...state} empty={!teams.length}><div className="card-grid">{teams.map((team) => <article className="data-card team-card" key={team._id || team.name}><span className="team-swatch" style={{ backgroundColor: team.color || '#176b87' }} /><h2>{team.name}</h2><p>{team.motto}</p><footer>{team.members?.length || 0} members</footer></article>)}</div></ResourceState></section>
}