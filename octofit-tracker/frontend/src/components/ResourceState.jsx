export function ResourceState({ loading, error, empty, children }) {
  if (loading) return <div className="state-panel">Loading your OctoFit data...</div>
  if (error) return <div className="state-panel state-panel-error">{error}</div>
  if (empty) return <div className="state-panel">No records yet.</div>
  return children
}