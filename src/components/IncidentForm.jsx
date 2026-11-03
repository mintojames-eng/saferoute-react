import { useState, useEffect } from 'react'
import './IncidentForm.css'

function IncidentForm({ incident, onSubmit, onCancel }) {
    // ── useState for all form fields ──
    const [name, setName] = useState('')
    const [lat, setLat] = useState('')
    const [lng, setLng] = useState('')
    const [risk, setRisk] = useState('Medium')
    const [type, setType] = useState('')
    const [accidents, setAccidents] = useState('')
    const [road, setRoad] = useState('Good')
    const [traffic, setTraffic] = useState('Moderate')

    // ── useEffect to populate form when editing ──
    useEffect(() => {
        if (incident) {
            setName(incident.name || '')
            setLat(incident.coords?.[0]?.toString() || '')
            setLng(incident.coords?.[1]?.toString() || '')
            setRisk(incident.risk || 'Medium')
            setType(incident.type || '')
            setAccidents(incident.accidents?.toString() || '')
            setRoad(incident.road || 'Good')
            setTraffic(incident.traffic || 'Moderate')
        } else {
            // Reset form for new entry
            setName('')
            setLat('')
            setLng('')
            setRisk('Medium')
            setType('')
            setAccidents('')
            setRoad('Good')
            setTraffic('Moderate')
        }
    }, [incident])

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit({
            name,
            coords: [parseFloat(lat), parseFloat(lng)],
            risk,
            type,
            accidents: parseInt(accidents) || 0,
            road,
            traffic
        })
    }

    return (
        <form className="incident-form" onSubmit={handleSubmit}>
            {/* Text Input */}
            <div className="form-group">
                <label htmlFor="inc-name">Location Name</label>
                <input
                    id="inc-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Silk Board Junction"
                    required
                />
            </div>

            {/* Number Inputs */}
            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="inc-lat">Latitude</label>
                    <input
                        id="inc-lat"
                        type="number"
                        step="any"
                        value={lat}
                        onChange={(e) => setLat(e.target.value)}
                        placeholder="12.9172"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="inc-lng">Longitude</label>
                    <input
                        id="inc-lng"
                        type="number"
                        step="any"
                        value={lng}
                        onChange={(e) => setLng(e.target.value)}
                        placeholder="77.6227"
                        required
                    />
                </div>
            </div>

            {/* Radio Buttons for Risk Level */}
            <div className="form-group">
                <label>Risk Level</label>
                <div className="radio-group">
                    {['High', 'Medium', 'Low'].map(level => (
                        <label key={level} className={`radio-label ${risk === level ? 'radio-active' : ''}`}>
                            <input
                                type="radio"
                                name="risk"
                                value={level}
                                checked={risk === level}
                                onChange={(e) => setRisk(e.target.value)}
                            />
                            <span className={`radio-dot ${level.toLowerCase()}`}></span>
                            {level}
                        </label>
                    ))}
                </div>
            </div>

            {/* Text Input */}
            <div className="form-group">
                <label htmlFor="inc-type">Incident Type</label>
                <input
                    id="inc-type"
                    type="text"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    placeholder="e.g. Multi-vehicle collision zone"
                    required
                />
            </div>

            {/* Number Input */}
            <div className="form-group">
                <label htmlFor="inc-accidents">Number of Accidents</label>
                <input
                    id="inc-accidents"
                    type="number"
                    value={accidents}
                    onChange={(e) => setAccidents(e.target.value)}
                    placeholder="e.g. 182"
                    required
                />
            </div>

            {/* Select Dropdowns */}
            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="inc-road">Road Condition</label>
                    <select id="inc-road" value={road} onChange={(e) => setRoad(e.target.value)}>
                        <option value="Good">Good</option>
                        <option value="Moderate">Moderate</option>
                        <option value="Poor">Poor</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="inc-traffic">Traffic Level</label>
                    <select id="inc-traffic" value={traffic} onChange={(e) => setTraffic(e.target.value)}>
                        <option value="Low">Low</option>
                        <option value="Moderate">Moderate</option>
                        <option value="High">High</option>
                        <option value="Very High">Very High</option>
                    </select>
                </div>
            </div>

            {/* Buttons */}
            <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                    {incident ? '💾 Update Incident' : '➕ Add Incident'}
                </button>
                <button type="button" className="btn btn-outline" onClick={onCancel}>
                    Cancel
                </button>
            </div>
        </form>
    )
}

export default IncidentForm
