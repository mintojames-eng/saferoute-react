import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import './IncidentMap.css'

function IncidentMap({ incidents }) {
    const getColor = (risk) => {
        if (risk === 'High') return '#ef4444'
        if (risk === 'Medium') return '#f59e0b'
        return '#22c55e'
    }

    return (
        <div className="incident-map-wrapper">
            <MapContainer
                center={[12.9716, 77.5946]}
                zoom={11}
                className="incident-map"
                scrollWheelZoom={true}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                />
                {incidents.map((incident) => (
                    <CircleMarker
                        key={incident.id}
                        center={incident.coords}
                        radius={incident.risk === 'High' ? 12 : incident.risk === 'Medium' ? 9 : 7}
                        fillColor={getColor(incident.risk)}
                        color={getColor(incident.risk)}
                        weight={2}
                        fillOpacity={0.7}
                    >
                        <Popup>
                            <div className="map-popup">
                                <h4>{incident.name}</h4>
                                <p className="popup-type">{incident.type}</p>
                                <div className="popup-stats">
                                    <span>Risk: <strong>{incident.risk}</strong></span>
                                    <span>Accidents: <strong>{incident.accidents}</strong></span>
                                </div>
                            </div>
                        </Popup>
                    </CircleMarker>
                ))}
            </MapContainer>
        </div>
    )
}

export default IncidentMap
