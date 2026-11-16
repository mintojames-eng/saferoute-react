import { useState, useEffect, useMemo } from 'react'
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import './IncidentMap.css'
import { bangaloreAreasMaster } from '../data/bangaloreAreas'

// Leaflet helper component to smoothly pan & zoom to a selected location
function MapFlyController({ targetCoords, zoom = 13 }) {
    const map = useMap()
    useEffect(() => {
        if (targetCoords && targetCoords.length === 2 && targetCoords[0] && targetCoords[1]) {
            map.flyTo(targetCoords, zoom, {
                animate: true,
                duration: 1.2
            })
        }
    }, [targetCoords, zoom, map])
    return null
}

const ZONES = ['All', 'Central', 'South', 'East', 'North', 'West']

function IncidentMap({ incidents = [] }) {
    const [viewMode, setViewMode] = useState('all-blr') // 'all-blr' | 'blackspots'
    const [bangaloreAreas, setBangaloreAreas] = useState(bangaloreAreasMaster)
    const [selectedZone, setSelectedZone] = useState('All')
    const [searchQuery, setSearchQuery] = useState('')
    const [activeTarget, setActiveTarget] = useState(null)
    const [loadingAreas, setLoadingAreas] = useState(false)

    // Fetch dynamic master Bangalore areas from Flask API (MongoDB backed)
    useEffect(() => {
        const fetchAreas = async () => {
            setLoadingAreas(true)
            try {
                const res = await fetch('http://127.0.0.1:5000/bangalore-areas')
                if (res.ok) {
                    const data = await res.json()
                    if (data && data.length > 0) {
                        setBangaloreAreas(data)
                    }
                }
            } catch (err) {
                console.warn('API /bangalore-areas offline, using local master dataset', err)
            } finally {
                setLoadingAreas(false)
            }
        }
        fetchAreas()
    }, [])

    const getColor = (risk) => {
        if (risk === 'High') return '#ef4444'
        if (risk === 'Medium') return '#f59e0b'
        return '#10b981'
    }

    // Determine current displayed items based on viewMode & zone & search
    const displayedItems = useMemo(() => {
        const sourceList = viewMode === 'blackspots' ? incidents : bangaloreAreas
        return sourceList.filter(item => {
            // Zone filtering (for all-blr dataset, or if blackspot has zone)
            const matchesZone = selectedZone === 'All' || !item.zone || item.zone.toLowerCase() === selectedZone.toLowerCase()
            // Search filtering
            const q = searchQuery.toLowerCase().trim()
            const matchesSearch = !q ||
                item.name.toLowerCase().includes(q) ||
                (item.type && item.type.toLowerCase().includes(q)) ||
                (item.zone && item.zone.toLowerCase().includes(q))
            return matchesZone && matchesSearch
        })
    }, [viewMode, incidents, bangaloreAreas, selectedZone, searchQuery])

    // Quick stats for current view
    const stats = useMemo(() => {
        const high = displayedItems.filter(i => i.risk === 'High').length
        const medium = displayedItems.filter(i => i.risk === 'Medium').length
        const low = displayedItems.filter(i => i.risk === 'Low').length
        return { total: displayedItems.length, high, medium, low }
    }, [displayedItems])

    // Handle selecting an area to fly to
    const handleSelectArea = (item) => {
        if (item && item.coords) {
            setActiveTarget({
                coords: item.coords,
                name: item.name,
                timestamp: Date.now()
            })
        }
    }

    return (
        <div className="incident-map-container card">
            {/* Map Controls Header */}
            <div className="map-controls-header">
                <div className="map-view-tabs">
                    <button
                        className={`map-tab-btn ${viewMode === 'all-blr' ? 'active' : ''}`}
                        onClick={() => { setViewMode('all-blr'); setActiveTarget(null); }}
                    >
                        🗺️ All Bangalore Areas ({bangaloreAreas.length})
                    </button>
                    <button
                        className={`map-tab-btn ${viewMode === 'blackspots' ? 'active' : ''}`}
                        onClick={() => { setViewMode('blackspots'); setActiveTarget(null); }}
                    >
                        🚨 Critical Blackspots ({incidents.length})
                    </button>
                </div>

                {/* Search Bar with live autocomplete match indicator */}
                <div className="map-search-wrapper">
                    <span className="search-icon">🔍</span>
                    <input
                        type="text"
                        className="map-search-input"
                        placeholder="Search any Bangalore area (e.g. Whitefield, Silk Board, Hebbal)..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                        <button className="clear-search-btn" onClick={() => setSearchQuery('')}>×</button>
                    )}
                </div>
            </div>

            {/* Zone Filter Chips */}
            <div className="map-zone-filters">
                <span className="zone-label">Zone:</span>
                {ZONES.map(z => (
                    <button
                        key={z}
                        className={`zone-chip ${selectedZone === z ? 'active' : ''}`}
                        onClick={() => setSelectedZone(z)}
                    >
                        {z} {z === 'All' ? `(${viewMode === 'all-blr' ? bangaloreAreas.length : incidents.length})` : ''}
                    </button>
                ))}
            </div>

            {/* Map Canvas */}
            <div className="incident-map-wrapper">
                <MapContainer
                    center={[12.9716, 77.5946]}
                    zoom={11}
                    className="incident-map"
                    scrollWheelZoom={true}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />

                    {/* Dynamic Panning / Zooming Controller */}
                    {activeTarget && (
                        <MapFlyController targetCoords={activeTarget.coords} zoom={14} />
                    )}

                    {/* Area & Incident Markers */}
                    {displayedItems.map((item) => {
                        const isHigh = item.risk === 'High'
                        const isMedium = item.risk === 'Medium'
                        const radius = isHigh ? 11 : isMedium ? 8 : 7
                        const color = getColor(item.risk)

                        return (
                            <CircleMarker
                                key={item.id || item.name}
                                center={item.coords}
                                radius={radius}
                                fillColor={color}
                                color="#ffffff"
                                weight={1.8}
                                fillOpacity={0.82}
                                eventHandlers={{
                                    click: () => handleSelectArea(item)
                                }}
                            >
                                <Popup>
                                    <div className="map-popup">
                                        <div className="popup-header">
                                            <h4>{item.name}</h4>
                                            {item.zone && (
                                                <span className="popup-zone-badge">{item.zone} Zone</span>
                                            )}
                                        </div>
                                        <p className="popup-type">{item.type || 'Urban Transit Corridor'}</p>
                                        <div className="popup-stats-grid">
                                            <div className="stat-pill">
                                                <span>Risk Rating</span>
                                                <strong style={{ color }}>{item.risk} Risk</strong>
                                            </div>
                                            <div className="stat-pill">
                                                <span>Annual Accidents</span>
                                                <strong>{item.accidents || 'N/A'}</strong>
                                            </div>
                                            <div className="stat-pill">
                                                <span>Road Surface</span>
                                                <strong>{item.road || 'Good'}</strong>
                                            </div>
                                            <div className="stat-pill">
                                                <span>Avg Traffic</span>
                                                <strong>{item.traffic || 'Moderate'}</strong>
                                            </div>
                                        </div>
                                        <div className="popup-footer">
                                            <small>📍 {item.coords[0].toFixed(4)}, {item.coords[1].toFixed(4)}</small>
                                        </div>
                                    </div>
                                </Popup>
                            </CircleMarker>
                        )
                    })}
                </MapContainer>
            </div>

            {/* Map Footer Bar with Summary & Quick Area Shortcuts */}
            <div className="map-footer-bar">
                <div className="map-risk-legend">
                    <span className="legend-item"><span className="legend-dot red"></span> High Risk ({stats.high})</span>
                    <span className="legend-item"><span className="legend-dot amber"></span> Medium ({stats.medium})</span>
                    <span className="legend-item"><span className="legend-dot green"></span> Low Risk ({stats.low})</span>
                    <span className="legend-total">Total Showing: <strong>{stats.total} areas</strong></span>
                </div>

                {/* Quick Area Jump Chips (Top Hubs) */}
                <div className="quick-jump-chips">
                    <span className="jump-title">Quick Pan:</span>
                    {[
                        { name: 'Majestic', coords: [12.9768, 77.5714] },
                        { name: 'Silk Board', coords: [12.9172, 77.6227] },
                        { name: 'Whitefield', coords: [12.9698, 77.7499] },
                        { name: 'Hebbal', coords: [13.0358, 77.5970] },
                        { name: 'Indiranagar', coords: [12.9784, 77.6408] },
                        { name: 'Peenya', coords: [13.0285, 77.5196] }
                    ].map(hub => (
                        <button
                            key={hub.name}
                            type="button"
                            className="jump-chip"
                            onClick={() => handleSelectArea(hub)}
                        >
                            📍 {hub.name}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default IncidentMap