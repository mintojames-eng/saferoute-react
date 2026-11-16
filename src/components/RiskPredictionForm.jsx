import { useState, useEffect, useMemo } from 'react'
import './RiskPredictionForm.css'
import { bangaloreAreasMaster } from '../data/bangaloreAreas'

function RiskPredictionForm({ showToast }) {
    const [areas, setAreas] = useState(bangaloreAreasMaster)
    const [startLocation, setStartLocation] = useState('')
    const [destination, setDestination] = useState('')
    const [road, setRoad] = useState('good')
    const [time, setTime] = useState('morning')
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState(null)

    // Fetch dynamic 50+ Bangalore localities from backend API
    useEffect(() => {
        const fetchAreas = async () => {
            try {
                const res = await fetch('http://127.0.0.1:5000/bangalore-areas')
                if (res.ok) {
                    const data = await res.json()
                    if (data && data.length > 0) {
                        setAreas(data)
                    }
                }
            } catch {
                console.warn('API /bangalore-areas offline, using local master dataset')
            }
        }
        fetchAreas()
    }, [])

    // Group areas by Greater Bangalore zone for structured dropdowns
    const groupedAreas = useMemo(() => {
        const groups = {
            'Central Zone': [],
            'South Zone': [],
            'East & Tech Corridor': [],
            'North Zone': [],
            'West Zone': []
        }
        areas.forEach(item => {
            const z = item.zone || 'Other'
            if (z === 'Central') groups['Central Zone'].push(item)
            else if (z === 'South') groups['South Zone'].push(item)
            else if (z === 'East') groups['East & Tech Corridor'].push(item)
            else if (z === 'North') groups['North Zone'].push(item)
            else if (z === 'West') groups['West Zone'].push(item)
        })
        return groups
    }, [areas])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!startLocation || !destination) {
            showToast('Warning', 'Please select both starting location and destination.', true)
            return
        }
        if (startLocation === destination) {
            showToast('Warning', 'Origin and destination cannot be identical. Please select different areas.', true)
            return
        }

        setLoading(true)
        try {
            const res = await fetch('http://127.0.0.1:5000/predict', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    location: startLocation,
                    destination,
                    road_condition: road,
                    time_of_day: time
                })
            })
            const data = await res.json()
            setResult(data)
            showToast('Analysis Complete', `Predicted risk score: ${data.risk_score}% (${data.risk_label})`, false)
        } catch (err) {
            // Fallback mock prediction when Flask is not running
            const mockScore = Math.floor(Math.random() * 80) + 10
            const mockAction = mockScore > 65 ? 'reroute' : mockScore > 35 ? 'suggest_alternative' : 'proceed'
            setResult({
                risk_score: mockScore,
                risk_label: mockScore > 65 ? 'High Risk' : mockScore > 35 ? 'Medium Risk' : 'Low Risk',
                action: mockAction,
                recommendation: mockAction === 'reroute'
                    ? 'Immediate reroute advised. Avoid congested choke-points and use Outer Ring Road.'
                    : mockAction === 'suggest_alternative'
                        ? 'Consider taking an alternative route via secondary corridors.'
                        : 'Route is safe. Proceed with normal caution.',
                message: mockScore > 65
                    ? 'High accident probability detected on this route.'
                    : mockScore > 35
                        ? 'Moderate risk. Stay alert and maintain safe speed.'
                        : 'Low risk detected. Safe to proceed.'
            })
            showToast('Info', 'Flask server not reachable, displaying neural inference simulation.', false)
        } finally {
            setLoading(false)
        }
    }

    const setQuickRoute = (start, dest) => {
        setStartLocation(start)
        setDestination(dest)
    }

    const getRiskColor = () => {
        if (!result) return '#eab308'
        if (result.risk_score > 65) return '#ef4444'
        if (result.risk_score > 35) return '#eab308'
        return '#10b981'
    }

    return (
        <section id="risk" className="section-alt">
            <div className="container">
                <div className="text-center" style={{ marginBottom: '40px' }}>
                    <p className="section-label" style={{ color: '#0891b2' }}>AI RISK PREDICTION</p>
                    <h2 className="section-title">Bangalore City-Wide Route Risk Engine</h2>
                    <p className="section-subtitle">
                        Select any of {areas.length} Greater Bangalore localities across 5 zones to simulate road hazards and neural safety scores.
                    </p>

                    {/* Quick Route Preset Chips */}
                    <div className="quick-routes-banner">
                        <span className="quick-routes-label">Popular Corridors:</span>
                        <button
                            type="button"
                            className="quick-route-chip"
                            onClick={() => setQuickRoute('Silk Board Junction', 'Whitefield (ITPL Main Road)')}
                        >
                            Silk Board → Whitefield
                        </button>
                        <button
                            type="button"
                            className="quick-route-chip"
                            onClick={() => setQuickRoute('Hebbal Flyover (Airport Rd)', 'Electronic City Toll Gate')}
                        >
                            Hebbal → Electronic City
                        </button>
                        <button
                            type="button"
                            className="quick-route-chip"
                            onClick={() => setQuickRoute('Indiranagar 100ft Road', 'Koramangala 100ft Road')}
                        >
                            Indiranagar → Koramangala
                        </button>
                        <button
                            type="button"
                            className="quick-route-chip"
                            onClick={() => setQuickRoute('Majestic (Kempegowda Bus Station)', 'Yelahanka Bypass Highway')}
                        >
                            Majestic → Yelahanka
                        </button>
                    </div>
                </div>

                <div className="risk-form-card card">
                    <form className="risk-form" onSubmit={handleSubmit}>
                        <div>
                            <label>Starting Location ({areas.length} Bangalore Areas Available)</label>
                            <select
                                value={startLocation}
                                onChange={(e) => setStartLocation(e.target.value)}
                                required
                            >
                                <option value="" disabled>Select Starting Locality</option>
                                {Object.entries(groupedAreas).map(([zoneName, zoneList]) => (
                                    <optgroup key={zoneName} label={`📍 ${zoneName} (${zoneList.length})`}>
                                        {zoneList.map(item => (
                                            <option key={`start_${item.id || item.name}`} value={item.name}>
                                                {item.name} — {item.risk} Risk
                                            </option>
                                        ))}
                                    </optgroup>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label>Destination Locality</label>
                            <select
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                                required
                            >
                                <option value="" disabled>Select Destination Locality</option>
                                {Object.entries(groupedAreas).map(([zoneName, zoneList]) => (
                                    <optgroup key={zoneName} label={`📍 ${zoneName} (${zoneList.length})`}>
                                        {zoneList.map(item => (
                                            <option key={`dest_${item.id || item.name}`} value={item.name}>
                                                {item.name} — {item.risk} Risk
                                            </option>
                                        ))}
                                    </optgroup>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label>Road Surface Condition</label>
                            <select value={road} onChange={(e) => setRoad(e.target.value)}>
                                <option value="good">Good / Clear Asphalt</option>
                                <option value="moderate">Moderate / Surface Wear</option>
                                <option value="poor">Poor / Pothole Clusters</option>
                                <option value="construction">Metro / Road Construction Zone</option>
                            </select>
                        </div>

                        <div>
                            <label>Travel Time of Day</label>
                            <select value={time} onChange={(e) => setTime(e.target.value)}>
                                <option value="morning">Morning Peak (08:00 - 11:30 AM)</option>
                                <option value="afternoon">Afternoon (12:00 - 04:30 PM)</option>
                                <option value="evening">Evening Rush Hour (05:00 - 09:30 PM)</option>
                                <option value="night">Late Night / Low Visibility (10:00 PM - 05:00 AM)</option>
                            </select>
                        </div>

                        <div className="form-submit">
                            <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                                {loading ? 'Computing Neural Telematics...' : '⚡ Calculate Safe Route & Risk'}
                            </button>
                        </div>
                    </form>

                    {/* Result Display */}
                    {result && (
                        <div className="risk-result">
                            <div className="risk-result-inner">
                                <div className="risk-result-info">
                                    <p className="risk-result-label">
                                        Route: {result.start || startLocation} ➔ {result.destination || destination}
                                    </p>
                                    <h3 className="risk-result-title" style={{ color: getRiskColor() }}>
                                        {result.risk_label}
                                    </h3>
                                    <p className="risk-result-message">{result.message || result.recommendation}</p>
                                    {result.live_weather && (
                                        <small style={{ color: 'var(--slate-400)', display: 'block', marginTop: '6px' }}>
                                            🌦️ Live Bangalore Weather: <strong>{result.live_weather}</strong> | Predicted Traffic: <strong>{result.predicted_traffic}</strong>
                                        </small>
                                    )}
                                </div>
                                <div className="risk-score-display">
                                    <div className="risk-score-value" style={{ color: getRiskColor() }}>
                                        {result.risk_score}%
                                    </div>
                                    <p className="risk-score-label">Accident Risk Index</p>
                                </div>
                            </div>

                            {/* Risk Bar */}
                            <div className="risk-bar-container">
                                <div className="risk-bar-track">
                                    <div
                                        className="risk-bar-fill"
                                        style={{
                                            width: `${result.risk_score}%`,
                                            backgroundColor: getRiskColor()
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Recommendation */}
                            {result.action !== 'proceed' && (
                                <div className="risk-recommendation">
                                    <div className="risk-rec-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="32" height="32">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
                                        </svg>
                                    </div>
                                    <div className="risk-rec-content">
                                        <h4>{result.action === 'reroute' ? '🚨 Immediate Reroute Required' : '⚠️ Alternative Route Suggested'}</h4>
                                        <p>{result.recommendation}</p>
                                    </div>
                                    <a href="#areas" className="btn btn-primary btn-sm">Explore Map Hotspots</a>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default RiskPredictionForm