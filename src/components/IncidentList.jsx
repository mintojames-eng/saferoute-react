import IncidentCard from './IncidentCard'
import './IncidentList.css'

function IncidentList({ incidents, loading, onEdit, onDelete }) {
    if (loading) {
        return (
            <div className="incident-list">
                <div className="loading-state">
                    <div className="spinner"></div>
                    <p>Loading incidents...</p>
                </div>
            </div>
        )
    }

    if (incidents.length === 0) {
        return (
            <div className="incident-list">
                <div className="empty-state">
                    <p className="empty-icon">🔍</p>
                    <p className="empty-text">No incidents found matching your search.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="incident-list">
            {incidents.map(incident => (
                <IncidentCard
                    key={incident.id}
                    incident={incident}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    )
}

export default IncidentList
