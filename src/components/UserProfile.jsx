import { useState } from 'react'
import './UserProfile.css'

function UserProfile({ user, onUpdateUser, onLogout, showToast }) {
    const [activeTab, setActiveTab] = useState('routes') // 'routes' | 'info' | 'ice' | 'settings'

    // Profile form state
    const [name, setName] = useState(user.name || '')
    const [phone, setPhone] = useState(user.phone || '')
    const [vehicleType, setVehicleType] = useState(user.vehicleType || 'Four Wheeler (SUV)')
    const [bloodGroup, setBloodGroup] = useState(user.bloodGroup || 'O+ Positive')

    // Emergency contact form
    const [iceName, setIceName] = useState('')
    const [iceRelation, setIceRelation] = useState('Family')
    const [icePhone, setIcePhone] = useState('')
    const [showIceModal, setShowIceModal] = useState(false)

    // Saved route form
    const [showRouteModal, setShowRouteModal] = useState(false)
    const [routeTitle, setRouteTitle] = useState('')
    const [routeStart, setRouteStart] = useState('')
    const [routeDest, setRouteDest] = useState('')
    const [routeDist, setRouteDist] = useState('')
    const [routeDuration, setRouteDuration] = useState('')

    // Profile Save
    const handleProfileSave = (e) => {
        e.preventDefault()
        const updated = {
            ...user,
            name,
            phone,
            vehicleType,
            bloodGroup
        }
        onUpdateUser(updated)
        showToast('Profile Saved', 'Your personal telematics profile has been updated.')
    }

    // Add Emergency Contact
    const handleAddIce = (e) => {
        e.preventDefault()
        if (!iceName || !icePhone) {
            showToast('Missing Details', 'Name and telephone number are required.', true)
            return
        }
        const newContact = {
            id: Date.now(),
            name: iceName,
            relation: iceRelation,
            phone: icePhone
        }
        const updatedContacts = [...(user.emergencyContacts || []), newContact]
        const updatedUser = { ...user, emergencyContacts: updatedContacts }
        onUpdateUser(updatedUser)
        showToast('Contact Added', `${iceName} added as an Emergency ICE Contact.`)
        setShowIceModal(false)
        setIceName('')
        setIcePhone('')
    }

    // Remove ICE Contact
    const handleRemoveIce = (contactId) => {
        const updatedContacts = (user.emergencyContacts || []).filter(c => c.id !== contactId)
        onUpdateUser({ ...user, emergencyContacts: updatedContacts })
        showToast('Contact Removed', 'Emergency contact removed.')
    }

    // Add Saved Route
    const handleAddSavedRoute = (e) => {
        e.preventDefault()
        if (!routeTitle || !routeStart || !routeDest) {
            showToast('Form Incomplete', 'Title, origin, and destination are required.', true)
            return
        }
        const newRoute = {
            id: Date.now(),
            title: routeTitle,
            start: routeStart,
            destination: routeDest,
            distance: routeDist || '14.2 km',
            duration: routeDuration || '35 mins',
            safetyRating: 'A-',
            safetyScore: 86,
            currentRisk: 'Moderate'
        }
        const updatedRoutes = [...(user.savedRoutes || []), newRoute]
        onUpdateUser({ ...user, savedRoutes: updatedRoutes })
        showToast('Route Saved', `"${routeTitle}" added to your daily commute list.`)
        setShowRouteModal(false)
        setRouteTitle('')
        setRouteStart('')
        setRouteDest('')
        setRouteDist('')
        setRouteDuration('')
    }

    // Remove Saved Route
    const handleRemoveRoute = (routeId) => {
        const updatedRoutes = (user.savedRoutes || []).filter(r => r.id !== routeId)
        onUpdateUser({ ...user, savedRoutes: updatedRoutes })
        showToast('Route Deleted', 'Route removed from saved favorites.')
    }

    // Toggle Preference
    const handleTogglePreference = (key) => {
        const currentPrefs = user.preferences || {}
        const updatedPrefs = {
            ...currentPrefs,
            [key]: !currentPrefs[key]
        }
        onUpdateUser({ ...user, preferences: updatedPrefs })
        showToast('Preference Updated', 'Safety notification settings synchronized.')
    }

    return (
        <section id="user-profile" className="section user-profile-section">
            <div className="container">
                {/* Profile Banner Card */}
                <div className="profile-banner-card card">
                    <div className="profile-main-meta">
                        <div className="avatar-wrapper">
                            <img
                                src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                                alt={user.name}
                                className="profile-avatar-img"
                            />
                            <span className="avatar-verified-badge" title="Verified Road Safety Contributor">✓</span>
                        </div>

                        <div className="profile-text-meta">
                            <div className="profile-role-pill">
                                <span>🛡️ {user.role || 'SafeRoute Commuter'}</span>
                                <span className="member-since">Joined {user.joinedDate || '2026'}</span>
                            </div>
                            <h1 className="profile-user-name">{user.name}</h1>
                            <p className="profile-user-email">✉️ {user.email} &bull; 📞 {user.phone}</p>
                            <p className="profile-user-vehicle">🚗 Primary Mode: <strong>{user.vehicleType}</strong></p>
                        </div>
                    </div>

                    {/* Driver Safety Score Widget */}
                    <div className="safety-score-widget">
                        <div className="safety-score-circle">
                            <span className="score-number">{user.safetyScore || 94}</span>
                            <span className="score-max">/100</span>
                        </div>
                        <div className="safety-score-text">
                            <h4>Driver Safety Score</h4>
                            <p>Grade A+ Defensive Driver</p>
                            <span className="contributions-count">
                                📢 {user.reportsSubmitted || 8} Hazards Logged &bull; 👍 {user.hazardsVerified || 24} Verified
                            </span>
                        </div>
                    </div>
                </div>

                {/* Profile Tabs Navigation */}
                <div className="profile-tab-bar">
                    <button
                        className={`tab-btn ${activeTab === 'routes' ? 'active' : ''}`}
                        onClick={() => setActiveTab('routes')}
                    >
                        🗺️ Saved Routes ({user.savedRoutes?.length || 0})
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'ice' ? 'active' : ''}`}
                        onClick={() => setActiveTab('ice')}
                    >
                        🚨 Emergency Contacts ({user.emergencyContacts?.length || 0})
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'info' ? 'active' : ''}`}
                        onClick={() => setActiveTab('info')}
                    >
                        👤 Personal Details
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
                        onClick={() => setActiveTab('settings')}
                    >
                        ⚙️ Safety Preferences
                    </button>
                </div>

                {/* Tab 1: Saved Commute Routes */}
                {activeTab === 'routes' && (
                    <div className="profile-tab-content">
                        <div className="tab-section-header">
                            <div>
                                <h3>Frequently Traveled Routes</h3>
                                <p>Monitor live risk telemetry along your daily commute blackspots.</p>
                            </div>
                            <button className="btn btn-primary btn-sm" onClick={() => setShowRouteModal(true)}>
                                + Add Saved Route
                            </button>
                        </div>

                        <div className="saved-routes-grid">
                            {(user.savedRoutes || []).map((route) => (
                                <div key={route.id} className="card saved-route-card">
                                    <div className="saved-route-header">
                                        <h4 className="saved-route-title">{route.title}</h4>
                                        <span className={`risk-pill ${route.currentRisk.toLowerCase()}`}>
                                            ● {route.currentRisk} Risk
                                        </span>
                                    </div>

                                    <div className="saved-route-endpoints">
                                        <div className="endpoint-row">
                                            <span className="dot dot-green"></span>
                                            <span>Origin: <strong>{route.start}</strong></span>
                                        </div>
                                        <div className="endpoint-row">
                                            <span className="dot dot-red"></span>
                                            <span>Dest: <strong>{route.destination}</strong></span>
                                        </div>
                                    </div>

                                    <div className="saved-route-stats">
                                        <div>
                                            <span className="label">Distance</span>
                                            <span className="val">{route.distance}</span>
                                        </div>
                                        <div>
                                            <span className="label">Typical Time</span>
                                            <span className="val">{route.duration}</span>
                                        </div>
                                        <div>
                                            <span className="label">Safety Score</span>
                                            <span className="val" style={{ color: '#0891b2' }}>{route.safetyScore}/100</span>
                                        </div>
                                    </div>

                                    <div className="saved-route-actions">
                                        <button
                                            className="btn btn-sm btn-outline"
                                            onClick={() => showToast('Navigation Started', `Tracking safety telemetry on ${route.title}.`)}
                                        >
                                            Navigate Now →
                                        </button>
                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() => handleRemoveRoute(route.id)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Tab 2: Emergency ICE Contacts */}
                {activeTab === 'ice' && (
                    <div className="profile-tab-content">
                        <div className="tab-section-header">
                            <div>
                                <h3>In Case of Emergency (ICE) Contacts</h3>
                                <p>Authorized contacts notified automatically during collision or SOS trigger.</p>
                            </div>
                            <button className="btn btn-danger btn-sm" onClick={() => setShowIceModal(true)}>
                                + Add Emergency Contact
                            </button>
                        </div>

                        <div className="ice-contacts-grid">
                            {(user.emergencyContacts || []).map((contact) => (
                                <div key={contact.id} className="card ice-contact-card">
                                    <div className="ice-avatar">🚨</div>
                                    <div className="ice-info">
                                        <h4 className="ice-name">{contact.name}</h4>
                                        <span className="ice-relation">{contact.relation}</span>
                                        <p className="ice-phone">{contact.phone}</p>
                                    </div>
                                    <div className="ice-actions">
                                        <a href={`tel:${contact.phone}`} className="btn btn-sm btn-success">
                                            📞 Call Now
                                        </a>
                                        <button
                                            className="btn btn-sm btn-outline"
                                            onClick={() => handleRemoveIce(contact.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Tab 3: Personal Information Editor */}
                {activeTab === 'info' && (
                    <div className="profile-tab-content">
                        <div className="tab-section-header">
                            <div>
                                <h3>Personal Details & Driver Telematics</h3>
                                <p>Manage your account credentials, primary vehicle, and emergency medical notes.</p>
                            </div>
                        </div>

                        <form className="card profile-edit-form" onSubmit={handleProfileSave}>
                            <div className="form-grid-2">
                                <div className="form-field">
                                    <label>Full Legal Name</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-field">
                                    <label>Phone Number (Emergency Sync)</label>
                                    <input
                                        type="text"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-field">
                                    <label>Primary Vehicle Type</label>
                                    <select value={vehicleType} onChange={(e) => setVehicleType(e.target.value)}>
                                        <option value="Four Wheeler (SUV)">Four Wheeler (SUV / Crossover)</option>
                                        <option value="Four Wheeler (Sedan)">Four Wheeler (Sedan / Hatchback)</option>
                                        <option value="Two Wheeler (Motorcycle)">Two Wheeler (Motorcycle / Scooter)</option>
                                        <option value="Commercial Vehicle">Commercial Vehicle (Cab / Truck)</option>
                                        <option value="Bicycle / Pedestrian">Bicycle / Pedestrian</option>
                                    </select>
                                </div>

                                <div className="form-field">
                                    <label>Blood Group (For Emergency Responders)</label>
                                    <select value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)}>
                                        <option value="O+ Positive">O+ Positive</option>
                                        <option value="O- Negative">O- Negative</option>
                                        <option value="A+ Positive">A+ Positive</option>
                                        <option value="A- Negative">A- Negative</option>
                                        <option value="B+ Positive">B+ Positive</option>
                                        <option value="B- Negative">B- Negative</option>
                                        <option value="AB+ Positive">AB+ Positive</option>
                                        <option value="AB- Negative">AB- Negative</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-actions-row">
                                <button type="submit" className="btn btn-primary">
                                    Save Profile Updates
                                </button>
                                <button type="button" className="btn btn-outline" onClick={onLogout}>
                                    Sign Out of Account
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Tab 4: Safety Preferences */}
                {activeTab === 'settings' && (
                    <div className="profile-tab-content">
                        <div className="tab-section-header">
                            <div>
                                <h3>Telemetry & Notification Preferences</h3>
                                <p>Control how and when SafeRoute alerts you during journeys.</p>
                            </div>
                        </div>

                        <div className="card preferences-list">
                            <div className="pref-item">
                                <div>
                                    <h4>High-Risk Blackspot Geofence Warning</h4>
                                    <p>Audible chime when entering recognized multi-vehicle collision corridors.</p>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={user.preferences?.highRiskGeofenceWarnings ?? true}
                                    onChange={() => handleTogglePreference('highRiskGeofenceWarnings')}
                                    className="pref-toggle"
                                />
                            </div>

                            <div className="pref-item">
                                <div>
                                    <h4>SMS Automated Dispatch to ICE Contacts</h4>
                                    <p>Immediately transmits GPS coordinates to contacts if emergency SOS is pressed.</p>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={user.preferences?.smsEmergencyAlerts ?? true}
                                    onChange={() => handleTogglePreference('smsEmergencyAlerts')}
                                    className="pref-toggle"
                                />
                            </div>

                            <div className="pref-item">
                                <div>
                                    <h4>Severe Weather Hazard Audio Prompts</h4>
                                    <p>Live audio alerts for flash flooding, waterlogging, or severe storm fog.</p>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={user.preferences?.weatherHazardAudioVoice ?? true}
                                    onChange={() => handleTogglePreference('weatherHazardAudioVoice')}
                                    className="pref-toggle"
                                />
                            </div>

                            <div className="pref-item">
                                <div>
                                    <h4>Night Vision High-Contrast Mode</h4>
                                    <p>Automatically engages high-visibility dark UI between 7:00 PM and 6:00 AM.</p>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={user.preferences?.nightModeAutoPrompt ?? true}
                                    onChange={() => handleTogglePreference('nightModeAutoPrompt')}
                                    className="pref-toggle"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Modal: Add ICE Contact */}
                {showIceModal && (
                    <div className="modal-backdrop" onClick={() => setShowIceModal(false)}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <button className="modal-close" onClick={() => setShowIceModal(false)}>✕</button>
                            <h3 className="modal-title" style={{ color: '#dc2626' }}>Add Emergency Contact</h3>
                            <form className="hazard-form" onSubmit={handleAddIce}>
                                <div>
                                    <label>Contact Name</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Sarah James"
                                        value={iceName}
                                        onChange={(e) => setIceName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label>Relationship</label>
                                    <select value={iceRelation} onChange={(e) => setIceRelation(e.target.value)}>
                                        <option value="Spouse">Spouse / Partner</option>
                                        <option value="Parent">Parent</option>
                                        <option value="Sibling">Sibling</option>
                                        <option value="Close Friend">Close Friend</option>
                                        <option value="Physician">Doctor / Physician</option>
                                    </select>
                                </div>
                                <div>
                                    <label>Phone Number</label>
                                    <input
                                        type="tel"
                                        placeholder="+91 98450 00000"
                                        value={icePhone}
                                        onChange={(e) => setIcePhone(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-danger" style={{ width: '100%', marginTop: '12px' }}>
                                    Save ICE Contact
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {/* Modal: Add Saved Route */}
                {showRouteModal && (
                    <div className="modal-backdrop" onClick={() => setShowRouteModal(false)}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <button className="modal-close" onClick={() => setShowRouteModal(false)}>✕</button>
                            <h3 className="modal-title" style={{ color: '#0891b2' }}>Save Commute Route</h3>
                            <form className="hazard-form" onSubmit={handleAddSavedRoute}>
                                <div>
                                    <label>Route Label / Nickname</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Morning Office Transit"
                                        value={routeTitle}
                                        onChange={(e) => setRouteTitle(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label>Starting Point</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Indiranagar Metro Station"
                                        value={routeStart}
                                        onChange={(e) => setRouteStart(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label>Destination</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. ITPL Main Gate, Whitefield"
                                        value={routeDest}
                                        onChange={(e) => setRouteDest(e.target.value)}
                                        required
                                    />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                    <div>
                                        <label>Est. Distance</label>
                                        <input
                                            type="text"
                                            placeholder="18 km"
                                            value={routeDist}
                                            onChange={(e) => setRouteDist(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label>Est. Duration</label>
                                        <input
                                            type="text"
                                            placeholder="45 mins"
                                            value={routeDuration}
                                            onChange={(e) => setRouteDuration(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '12px' }}>
                                    Save Route to Profile
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}

export default UserProfile

