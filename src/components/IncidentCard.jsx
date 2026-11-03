import './IncidentCard.css'

function IncidentCard({ incident, onEdit, onDelete }) {
    const getBadgeClass = (risk) => {
        if (risk === 'High') return 'badge badge-high'
        if (risk === 'Medium') return 'badge badge-medium'
        return 'badge badge-low'
    }

    return (
        <div className="incident-card card">
            <div className="incident-card-header">
                <div>
                    <h3 className="incident-name">{incident.name}</h3>
                    <p className="incident-location">Bengaluru, Karnataka</p>
                </div>
                <span className={getBadgeClass(incident.risk)}>{incident.risk} Risk</span>
            </div>

            <p className="incident-type">{incident.type}</p>

            <div className="incident-stats">
                <div>
                    <p className="stat-mini-label">Accidents</p>
                    <p className="stat-mini-value">{incident.accidents}</p>
                </div>
                <div>
                    <p className="stat-mini-label">Road</p>
                    <p className="stat-mini-value">{incident.road}</p>
                </div>
                <div>
                    <p className="stat-mini-label">Traffic</p>
                    <p className="stat-mini-value">{incident.traffic}</p>
                </div>
            </div>

            <div className="incident-actions">
                <button className="btn btn-sm btn-primary" onClick={() => onEdit(incident)}>
                    ✏️ Edit
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => onDelete(incident.id)}>
                    🗑️ Delete
                </button>
            </div>
        </div>
    )
}

export default IncidentCard
