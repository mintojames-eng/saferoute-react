import { useState } from 'react'
import './SafetyAlerts.css'

function SafetyAlerts({ alerts, onAddAlert, onVerifyAlert, showToast }) {
    const [filterSeverity, setFilterSeverity] = useState('All')
    const [alertSearch, setAlertSearch] = useState('')
    const [showReportModal, setShowReportModal] = useState(false)

    // New report form state
    const [title, setTitle] = useState('')
    const [severity, setSeverity] = useState('Warning')
    const [category, setCategory] = useState('Accident Crash')
    const [location, setLocation] = useState('')
    const [description, setDescription] = useState('')

    // Filter alerts
    const filteredAlerts = alerts.filter(alert => {
        const matchesSeverity = filterSeverity === 'All' || alert.severity.toLowerCase() === filterSeverity.toLowerCase()
        const matchesSearch = alert.title.toLowerCase().includes(alertSearch.toLowerCase()) ||
            alert.location.toLowerCase().includes(alertSearch.toLowerCase()) ||
            alert.category.toLowerCase().includes(alertSearch.toLowerCase())
        return matchesSeverity && matchesSearch
    })

    const handleReportSubmit = (e) => {
        e.preventDefault()
        if (!title || !location || !description) {
            showToast('Form Incomplete', 'Please fill in the title, location, and description.', true)
            return
        }

        const newAlert = {
            id: `alt-${Date.now()}`,
            title,
            severity,
            category,
            location,
            coords: [12.9716, 77.5946],
            timestamp: 'Just now',
            verifiedCount: 1,
            isVerifiedByUser: true,
            status: 'Active',
            description
        }

        onAddAlert(newAlert)
        showToast('Alert Broadcasted', `Your hazard alert for "${location}" is live.`)
        setShowReportModal(false)

        // Reset
        setTitle('')
        setLocation('')
        setDescription('')
        setSeverity('Warning')
    }

    const handleShare = (alert) => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(`⚠️ SafeRoute Alert [${alert.severity.toUpperCase()}]: ${alert.title} at ${alert.location}. Details: ${alert.description}`)
            showToast('Copied to Clipboard', 'Alert summary copied to share with fellow drivers.')
        } else {
            showToast('Alert Shared', 'Alert dispatched to notification channels.')
        }
    }

    return (
        <section id="safety-alerts" className="section safety-alerts-section">
            <div className="container">
                {/* Header */}
                <div className="alerts-hero-header">
                    <div>
                        <div className="alerts-live-pill">
                            <span className="live-radar-dot"></span>
                            <span>LIVE BANGALORE HAZARD BROADCAST</span>
                        </div>
                        <h1 className="section-title">Real-Time Community Safety Alerts</h1>
                        <p className="section-subtitle">
                            Crowdsourced and municipal telemetry alerts covering active collisions, severe waterlogging, oil slicks, and traffic bottlenecks.
                        </p>
                    </div>

                    <button
                        className="btn btn-warning report-hazard-top-btn"
                        onClick={() => setShowReportModal(true)}
                    >
                        📢 Report Live Road Hazard
                    </button>
                </div>

                {/* Filters & Search Toolbar */}
                <div className="alerts-toolbar card">
                    <div className="severity-tabs">
                        {['All', 'Critical', 'Warning', 'Advisory'].map((sev) => {
                            const count = sev === 'All'
                                ? alerts.length
                                : alerts.filter(a => a.severity.toLowerCase() === sev.toLowerCase()).length
                            return (
                                <button
                                    key={sev}
                                    type="button"
                                    className={`severity-tab-btn ${filterSeverity === sev ? 'active ' + sev.toLowerCase() : ''}`}
                                    onClick={() => setFilterSeverity(sev)}
                                >
                                    {sev} ({count})
                                </button>
                            )
                        })}
                    </div>

                    <div className="alerts-search-box">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="search-icon">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Filter alerts by area, flyover or hazard type..."
                            value={alertSearch}
                            onChange={(e) => setAlertSearch(e.target.value)}
                        />
                    </div>
                </div>

                {/* Alerts Feed */}
                {filteredAlerts.length === 0 ? (
                    <div className="card empty-alerts-card">
                        <div className="empty-icon">🛡️</div>
                        <h3>No Hazards Reported</h3>
                        <p>No safety alerts match your current filter parameters.</p>
                    </div>
                ) : (
                    <div className="alerts-list">
                        {filteredAlerts.map((alert) => (
                            <div
                                key={alert.id}
                                className={`card alert-feed-card severity-${alert.severity.toLowerCase()}`}
                            >
                                <div className="alert-card-top">
                                    <div className="alert-badge-group">
                                        <span className={`alert-severity-badge badge-${alert.severity.toLowerCase()}`}>
                                            ● {alert.severity.toUpperCase()}
                                        </span>
                                        <span className="alert-category-tag">
                                            {alert.category}
                                        </span>
                                    </div>
                                    <span className="alert-timestamp">
                                        🕒 {alert.timestamp}
                                    </span>
                                </div>

                                <h3 className="alert-feed-title">{alert.title}</h3>

                                <div className="alert-location-row">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" width="16" height="16">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                    </svg>
                                    <span>{alert.location}</span>
                                </div>

                                <p className="alert-feed-desc">{alert.description}</p>

                                <div className="alert-footer-actions">
                                    <button
                                        type="button"
                                        className={`btn-verify ${alert.isVerifiedByUser ? 'verified-active' : ''}`}
                                        onClick={() => onVerifyAlert(alert.id)}
                                    >
                                        👍 {alert.isVerifiedByUser ? 'Verified by You' : 'Verify Hazard'} ({alert.verifiedCount})
                                    </button>

                                    <button
                                        type="button"
                                        className="btn-share-alert"
                                        onClick={() => handleShare(alert)}
                                    >
                                        🔗 Share Alert
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Report Hazard Modal */}
                {showReportModal && (
                    <div className="modal-backdrop" onClick={() => setShowReportModal(false)}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <button className="modal-close" onClick={() => setShowReportModal(false)}>✕</button>
                            <h3 className="modal-title" style={{ color: '#ca8a04' }}>
                                📢 Broadcast Safety Hazard
                            </h3>
                            <p className="modal-description">
                                Help fellow motorists avoid accidents and gridlocks by logging verified road dangers.
                            </p>

                            <form className="hazard-form" onSubmit={handleReportSubmit}>
                                <div>
                                    <label>Hazard Summary Title</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Fallen Tree Blocking Outer Ring Road"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                    />
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                    <div>
                                        <label>Severity Level</label>
                                        <select value={severity} onChange={(e) => setSeverity(e.target.value)}>
                                            <option value="Critical">🔴 Critical (High Collision Risk)</option>
                                            <option value="Warning">🟡 Warning (Caution Required)</option>
                                            <option value="Advisory">🔵 Advisory (Informational)</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label>Hazard Category</label>
                                        <select value={category} onChange={(e) => setCategory(e.target.value)}>
                                            <option value="Accident Crash">Accident Crash</option>
                                            <option value="Flood & Drainage">Waterlogging / Flood</option>
                                            <option value="Road Work">Road Excavation / Trench</option>
                                            <option value="Slippery Road">Oil Slick / Fuel Spill</option>
                                            <option value="Infrastructure">Traffic Signal Blackout</option>
                                            <option value="Weather Condition">Fog / Low Visibility</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label>Location & Landmark</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Silk Board Flyover Underpass, Northbound"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        required
                                    />
                                </div>

                                <div>
                                    <label>Detailed Description</label>
                                    <textarea
                                        rows="3"
                                        placeholder="Describe road blockage, affected lanes, and recommended detour..."
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        required
                                    ></textarea>
                                </div>

                                <button type="submit" className="btn btn-warning" style={{ width: '100%', padding: '14px' }}>
                                    Publish Alert To Live Radar →
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}

export default SafetyAlerts

