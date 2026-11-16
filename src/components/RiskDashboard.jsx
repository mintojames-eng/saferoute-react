import { useState } from 'react'
import './RiskDashboard.css'
import { routeComparisonData } from '../data/mockData'

function RiskDashboard({ showToast, onSaveRoute }) {
    // Dynamic Simulation Controls
    const [weather, setWeather] = useState('Rain')
    const [traffic, setTraffic] = useState('Peak Snarl')
    const [timeOfDay, setTimeOfDay] = useState('Evening Rush (6 PM - 9 PM)')
    const [roadCondition, setRoadCondition] = useState('Pothole Cluster')
    const [selectedRouteId, setSelectedRouteId] = useState('route_opt_1')

    // Mathematical Risk Index Calculation
    const calculateRisk = () => {
        let base = 20
        if (weather === 'Rain') base += 22
        if (weather === 'Torrential Storm') base += 35
        if (weather === 'Heavy Fog') base += 28

        if (traffic === 'Peak Snarl') base += 25
        if (traffic === 'Gridlock') base += 30
        if (traffic === 'Moderate') base += 12

        if (timeOfDay.includes('Evening') || timeOfDay.includes('Midnight')) base += 15
        if (timeOfDay.includes('Morning Rush')) base += 12

        if (roadCondition === 'Pothole Cluster') base += 20
        if (roadCondition === 'Waterlogged Surface') base += 28
        if (roadCondition === 'Uneven Asphalt') base += 10

        return Math.min(Math.max(base, 10), 98)
    }

    const calculatedRisk = calculateRisk()

    const getRiskCategory = (score) => {
        if (score >= 70) return { label: 'CRITICAL HAZARD ZONE', color: '#ef4444', action: 'Reroute Recommended Immediately' }
        if (score >= 45) return { label: 'MODERATE RISK DETECTED', color: '#f59e0b', action: 'Exercise Defensive Driving & Safe Spacing' }
        return { label: 'LOW RISK - OPTIMAL CONDITIONS', color: '#22c55e', action: 'Route is Clear, Proceed with Normal Caution' }
    }

    const category = getRiskCategory(calculatedRisk)

    const handleSaveCurrentRoute = (route) => {
        if (onSaveRoute) {
            onSaveRoute({
                id: Date.now(),
                title: route.name,
                start: 'Selected Origin',
                destination: 'Designated Endpoint',
                distance: route.distance,
                duration: route.estimatedTime,
                safetyRating: route.grade,
                safetyScore: route.safetyScore,
                currentRisk: route.riskLevel
            })
            showToast('Route Saved', `"${route.name}" added to your User Profile saved routes.`)
        } else {
            showToast('Route Bookmarked', 'Route telemetry saved to your local profile cache.')
        }
    }

    // 24-hour peak windows
    const timePeaks = [
        { hour: '06:00', risk: 18, label: 'Early Dawn' },
        { hour: '08:30', risk: 78, label: 'Morning Peak' },
        { hour: '12:00', risk: 35, label: 'Midday' },
        { hour: '15:30', risk: 42, label: 'School Rush' },
        { hour: '18:45', risk: 89, label: 'Evening Gridlock' },
        { hour: '22:00', risk: 54, label: 'Late Night' },
        { hour: '01:30', risk: 62, label: 'High Speed Zone' }
    ]

    return (
        <section id="risk-dashboard" className="section risk-dashboard-section">
            <div className="container">
                {/* Header Banner */}
                <div className="dashboard-hero-card card">
                    <div className="dashboard-hero-info">
                        <div className="neural-status-pill">
                            <span className="live-pulse-dot"></span>
                            <span>NEURAL TELEMETRY ENGINE v2.4 ACTIVE</span>
                        </div>
                        <h1 className="dashboard-heading">
                            AI Risk Prediction & Route Analytics Dashboard
                        </h1>
                        <p className="dashboard-subtext">
                            Dynamic multivariate risk scoring combining geospatial collision history, atmospheric moisture sensors, and live camera feed snarls.
                        </p>
                    </div>

                    <div className="dashboard-quick-stats">
                        <div className="quick-stat-box">
                            <span className="quick-stat-number">99.4%</span>
                            <span className="quick-stat-label">Model Accuracy</span>
                        </div>
                        <div className="quick-stat-box">
                            <span className="quick-stat-number">38ms</span>
                            <span className="quick-stat-label">Inference Latency</span>
                        </div>
                        <div className="quick-stat-box">
                            <span className="quick-stat-number">4,200+</span>
                            <span className="quick-stat-label">Points Monitored</span>
                        </div>
                    </div>
                </div>

                {/* Main Interactive Matrix */}
                <div className="risk-matrix-grid">
                    {/* Left: Interactive Multi-Factor Simulator */}
                    <div className="card simulator-card">
                        <div className="simulator-header">
                            <h3>🎛️ Multi-Factor Sensitivity Simulator</h3>
                            <p>Adjust variables to recalculate accident probability in real-time:</p>
                        </div>

                        <div className="simulator-controls">
                            <div className="sim-group">
                                <label>Weather Condition</label>
                                <select value={weather} onChange={(e) => setWeather(e.target.value)}>
                                    <option value="Clear">☀️ Clear / Dry Skies</option>
                                    <option value="Rain">🌧️ Moderate Rain</option>
                                    <option value="Torrential Storm">⛈️ Torrential Monsoon Storm</option>
                                    <option value="Heavy Fog">🌫️ Heavy Morning Fog</option>
                                </select>
                            </div>

                            <div className="sim-group">
                                <label>Traffic Congestion Density</label>
                                <select value={traffic} onChange={(e) => setTraffic(e.target.value)}>
                                    <option value="Free Flow">🟢 Free Flow Traffic</option>
                                    <option value="Moderate">🟡 Moderate Movement</option>
                                    <option value="Peak Snarl">🟠 Peak Hour Snarl</option>
                                    <option value="Gridlock">🔴 Severe Gridlock Bottleneck</option>
                                </select>
                            </div>

                            <div className="sim-group">
                                <label>Time Period of Travel</label>
                                <select value={timeOfDay} onChange={(e) => setTimeOfDay(e.target.value)}>
                                    <option value="Midday">☀️ Midday (11 AM - 3 PM)</option>
                                    <option value="Morning Rush">🌅 Morning Peak (8 AM - 10 AM)</option>
                                    <option value="Evening Rush (6 PM - 9 PM)">🌇 Evening Rush (6 PM - 9 PM)</option>
                                    <option value="Midnight">🌙 Late Night / Reduced Lighting</option>
                                </select>
                            </div>

                            <div className="sim-group">
                                <label>Pavement & Road Condition</label>
                                <select value={roadCondition} onChange={(e) => setRoadCondition(e.target.value)}>
                                    <option value="Grade-A Highway">🛣️ Smooth Grade-A Asphalt</option>
                                    <option value="Uneven Asphalt">🚗 Uneven Surface / Slight Wear</option>
                                    <option value="Pothole Cluster">⚠️ Frequent Pothole Blackspots</option>
                                    <option value="Waterlogged Surface">🌊 Flooded / Waterlogged Surface</option>
                                </select>
                            </div>
                        </div>

                        {/* Factor Impact Diagnostics */}
                        <div className="impact-breakdown">
                            <h4>Simulated Factor Multipliers:</h4>
                            <div className="impact-bars">
                                <div className="impact-item">
                                    <div className="impact-label">
                                        <span>Stopping Distance Penalty</span>
                                        <strong>{weather === 'Torrential Storm' ? '2.4x' : weather === 'Rain' ? '1.8x' : '1.0x'}</strong>
                                    </div>
                                    <div className="impact-bar-bg">
                                        <div
                                            className="impact-bar-fill"
                                            style={{
                                                width: weather === 'Torrential Storm' ? '90%' : weather === 'Rain' ? '65%' : '20%',
                                                backgroundColor: weather.includes('Storm') ? '#ef4444' : '#06b6d4'
                                            }}
                                        ></div>
                                    </div>
                                </div>

                                <div className="impact-item">
                                    <div className="impact-label">
                                        <span>Collision Exposure Index</span>
                                        <strong>{calculatedRisk}%</strong>
                                    </div>
                                    <div className="impact-bar-bg">
                                        <div
                                            className="impact-bar-fill"
                                            style={{ width: `${calculatedRisk}%`, backgroundColor: category.color }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Real-Time Risk Score Gauge & Recommendation */}
                    <div className="card gauge-card">
                        <span className="gauge-badge">AI REAL-TIME INFERENCE</span>

                        <div className="gauge-visual">
                            <div className="gauge-circle" style={{ borderColor: category.color }}>
                                <div className="gauge-number" style={{ color: category.color }}>
                                    {calculatedRisk}%
                                </div>
                                <div className="gauge-score-label">PREDICTED RISK</div>
                            </div>
                        </div>

                        <div className="gauge-assessment">
                            <div className="category-title" style={{ color: category.color }}>
                                {category.label}
                            </div>
                            <p className="category-action">
                                {category.action}
                            </p>
                        </div>

                        <div className="telemetry-checklist">
                            <div className="check-item">
                                <span>🛡️ Safe Speed Limit:</span>
                                <strong>{calculatedRisk > 65 ? '35 km/h' : calculatedRisk > 40 ? '50 km/h' : '65 km/h'}</strong>
                            </div>
                            <div className="check-item">
                                <span>🚨 Blackspot Alert:</span>
                                <strong>{calculatedRisk > 60 ? 'Active Geofence Warning' : 'Normal Vigilance'}</strong>
                            </div>
                            <div className="check-item">
                                <span>📡 Alternative Route:</span>
                                <strong>{calculatedRisk > 55 ? 'Outer Ring Road Bypass' : 'Current Primary Direct'}</strong>
                            </div>
                        </div>

                        <button
                            className="btn btn-primary"
                            style={{ width: '100%', marginTop: '16px' }}
                            onClick={() => showToast('AI Advisory Dispatched', 'Real-time telemetry advisory sent to mobile notification center.')}
                        >
                            Broadcast Advisory To GPS Unit →
                        </button>
                    </div>
                </div>

                {/* Multi-Route Safety Comparison */}
                <div className="route-comparison-section">
                    <div className="section-title-wrap">
                        <p className="section-label" style={{ color: '#0891b2' }}>INTELLIGENT REROUTING MATRIX</p>
                        <h2 className="section-title">Comparative Route Safety Ratings</h2>
                        <p className="section-subtitle">
                            Automated algorithmic assessment of parallel paths between starting point and destination.
                        </p>
                    </div>

                    <div className="routes-grid">
                        {routeComparisonData.map((route) => {
                            const isSelected = selectedRouteId === route.id
                            return (
                                <div
                                    key={route.id}
                                    className={`card route-option-card ${isSelected ? 'selected-route' : ''}`}
                                    onClick={() => setSelectedRouteId(route.id)}
                                >
                                    <div className="route-header">
                                        <span className={`route-tag ${route.riskLevel.toLowerCase()}`}>
                                            {route.tag}
                                        </span>
                                        <div className="grade-badge" style={{
                                            backgroundColor: route.riskLevel === 'Low' ? '#dcfce7' : route.riskLevel === 'Medium' ? '#fef3c7' : '#fee2e2',
                                            color: route.riskLevel === 'Low' ? '#15803d' : route.riskLevel === 'Medium' ? '#a16207' : '#b91c1c'
                                        }}>
                                            Grade {route.grade}
                                        </div>
                                    </div>

                                    <h3 className="route-name">{route.name}</h3>

                                    <div className="route-metrics-bar">
                                        <div>
                                            <span className="metric-title">Distance</span>
                                            <span className="metric-val">{route.distance}</span>
                                        </div>
                                        <div>
                                            <span className="metric-title">Duration</span>
                                            <span className="metric-val">{route.estimatedTime}</span>
                                        </div>
                                        <div>
                                            <span className="metric-title">Safety Score</span>
                                            <span className="metric-val" style={{ color: '#0891b2' }}>{route.safetyScore}/100</span>
                                        </div>
                                    </div>

                                    <div className="route-details-list">
                                        <div className="detail-row">
                                            <span>Accident Risk Prob:</span>
                                            <strong>{route.accidentProbability}</strong>
                                        </div>
                                        <div className="detail-row">
                                            <span>Blackspot Clusters:</span>
                                            <strong>{route.blackspotsCount} zones</strong>
                                        </div>
                                        <div className="detail-row">
                                            <span>Pavement Quality:</span>
                                            <strong>{route.roadQuality}</strong>
                                        </div>
                                    </div>

                                    <div className="route-actions">
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-primary"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handleSaveCurrentRoute(route)
                                            }}
                                        >
                                            ⭐ Save to Profile
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-outline"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                showToast('Route Navigation', `Simulating turn-by-turn guidance for ${route.name}.`)
                                            }}
                                        >
                                            Navigate Now
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* 24-Hour Predictive Blackspot Forecast Curve */}
                <div className="card forecast-card">
                    <div className="forecast-header">
                        <div>
                            <p className="section-label" style={{ color: '#dc2626' }}>24-HOUR FORECAST</p>
                            <h3 className="forecast-title">Predicted Bangalore Accident Risk Peaks</h3>
                        </div>
                        <span className="forecast-legend">
                            🔴 &gt;70% Critical | 🟠 40-70% Moderate | 🟢 &lt;40% Safe Window
                        </span>
                    </div>

                    <div className="forecast-timeline">
                        {timePeaks.map((tp, idx) => (
                            <div key={idx} className="timeline-node">
                                <div className="timeline-bar-wrapper">
                                    <div
                                        className="timeline-bar"
                                        style={{
                                            height: `${tp.risk}%`,
                                            backgroundColor: tp.risk > 70 ? '#ef4444' : tp.risk > 40 ? '#f59e0b' : '#22c55e'
                                        }}
                                    ></div>
                                </div>
                                <span className="timeline-hour">{tp.hour}</span>
                                <span className="timeline-risk">{tp.risk}%</span>
                                <span className="timeline-label">{tp.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default RiskDashboard

