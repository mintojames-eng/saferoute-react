import { useState } from 'react'
import './RiskPredictionForm.css'

const locations = [
    'Airport Road', 'Banashankari', 'Bellandur', 'BTM Layout', 'Electronic City',
    'Hebbal', 'HSR Layout', 'Indiranagar', 'Jayanagar', 'JP Nagar',
    'K R Puram', 'Koramangala', 'Majestic', 'Malleshwaram', 'Marathahalli',
    'MG Road', 'Rajajinagar', 'Silk Board', 'Whitefield', 'Yelahanka', 'Yeshwanthpur'
]

function RiskPredictionForm({ showToast }) {
    const [startLocation, setStartLocation] = useState('')
    const [destination, setDestination] = useState('')
    const [road, setRoad] = useState('good')
    const [time, setTime] = useState('morning')
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!startLocation || !destination) {
            showToast('Warning', 'Please select both starting location and destination.', true)
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
        } catch (err) {
            // Fallback mock prediction when Flask is not running
            const mockScore = Math.floor(Math.random() * 80) + 10
            const mockAction = mockScore > 65 ? 'reroute' : mockScore > 35 ? 'suggest_alternative' : 'proceed'
            setResult({
                risk_score: mockScore,
                risk_label: mockScore > 65 ? 'High Risk' : mockScore > 35 ? 'Medium Risk' : 'Low Risk',
                action: mockAction,
                recommendation: mockAction === 'reroute'
                    ? 'Immediate reroute advised. Take Outer Ring Road.'
                    : mockAction === 'suggest_alternative'
                        ? 'Consider taking an alternative route via smaller roads.'
                        : 'Route is safe. Proceed with normal caution.',
                message: mockScore > 65
                    ? 'High accident probability detected on this route.'
                    : mockScore > 35
                        ? 'Moderate risk. Stay alert and maintain safe speed.'
                        : 'Low risk detected. Safe to proceed.'
            })
            showToast('Info', 'Flask server not running, showing mock prediction.', false)
        } finally {
            setLoading(false)
        }
    }

    const getRiskColor = () => {
        if (!result) return '#eab308'
        if (result.risk_score > 65) return '#ef4444'
        if (result.risk_score > 35) return '#eab308'
        return '#22c55e'
    }

    return (
        <section id="risk" className="section-alt">
            <div className="container">
                <div className="text-center" style={{ marginBottom: '48px' }}>
                    <p className="section-label" style={{ color: '#0891b2' }}>AI RISK PREDICTION</p>
                    <h2 className="section-title">Execute Neural Analysis</h2>
                    <p className="section-subtitle">Enter road and environmental conditions to estimate the accident risk.</p>
                </div>

                <div className="risk-form-card card">
                    <form className="risk-form" onSubmit={handleSubmit}>
                        <div>
                            <label>Starting Location</label>
                            <select value={startLocation} onChange={(e) => setStartLocation(e.target.value)}>
                                <option value="" disabled>Select Starting Location</option>
                                {locations.map(loc => (
                                    <option key={loc} value={loc}>{loc}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label>Destination</label>
                            <select value={destination} onChange={(e) => setDestination(e.target.value)}>
                                <option value="" disabled>Select Destination</option>
                                {locations.map(loc => (
                                    <option key={loc} value={loc}>{loc}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label>Road Condition</label>
                            <select value={road} onChange={(e) => setRoad(e.target.value)}>
                                <option value="good">Good</option>
                                <option value="moderate">Moderate</option>
                                <option value="poor">Poor</option>
                                <option value="construction">Under Construction</option>
                            </select>
                        </div>

                        <div>
                            <label>Travel Time</label>
                            <select value={time} onChange={(e) => setTime(e.target.value)}>
                                <option value="morning">Morning</option>
                                <option value="afternoon">Afternoon</option>
                                <option value="evening">Evening</option>
                                <option value="night">Night</option>
                            </select>
                        </div>

                        <div className="form-submit">
                            <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                                {loading ? 'Analyzing...' : '🔍 Execute Neural Analysis'}
                            </button>
                        </div>
                    </form>

                    {/* Result Display */}
                    {result && (
                        <div className="risk-result">
                            <div className="risk-result-inner">
                                <div className="risk-result-info">
                                    <p className="risk-result-label">AI Prediction</p>
                                    <h3 className="risk-result-title" style={{ color: getRiskColor() }}>
                                        {result.risk_label}
                                    </h3>
                                    <p className="risk-result-message">{result.message}</p>
                                </div>
                                <div className="risk-score-display">
                                    <div className="risk-score-value" style={{ color: getRiskColor() }}>
                                        {result.risk_score}%
                                    </div>
                                    <p className="risk-score-label">Risk Score</p>
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
                                    <a href="#areas" className="btn btn-primary btn-sm">View Hotspots</a>
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
