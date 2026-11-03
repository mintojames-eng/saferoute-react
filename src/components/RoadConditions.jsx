import './RoadConditions.css'

function RoadConditions() {
    const conditions = [
        {
            icon: '🛣️',
            title: 'Road Quality',
            value: '78%',
            subtitle: '78% roads rated good',
            barColor: '#22c55e',
            progress: 78
        },
        {
            icon: '🌧️',
            title: 'Weather',
            value: '24°C',
            subtitle: 'Moderate visibility',
            isText: true
        },
        {
            icon: '🚦',
            title: 'Traffic',
            value: '68%',
            subtitle: 'Moderate to high',
            barColor: '#f97316',
            progress: 68
        },
        {
            icon: '💡',
            title: 'Street Lighting',
            value: '63%',
            subtitle: 'Improvement recommended',
            barColor: '#eab308',
            progress: 63
        }
    ]

    return (
        <section className="section-alt road-conditions-section">
            <div className="container">
                <div className="text-center" style={{ marginBottom: '48px', textAlign: 'center' }}>
                    <p className="section-label" style={{ color: '#0891b2' }}>ROAD CONDITION MONITOR</p>
                    <h2 className="section-title">Current Road Conditions</h2>
                </div>

                <div className="grid-4">
                    {conditions.map((item, idx) => (
                        <div key={idx} className="card road-card">
                            <div className="road-icon">{item.icon}</div>
                            <h3 className="road-card-title">{item.title}</h3>

                            {item.isText ? (
                                <p className="road-temp">{item.value}</p>
                            ) : (
                                <div className="progress-bar-bg">
                                    <div
                                        className="progress-bar-fill"
                                        style={{ width: `${item.progress}%`, backgroundColor: item.barColor }}
                                    ></div>
                                </div>
                            )}

                            <p className="road-subtitle">{item.subtitle}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default RoadConditions

