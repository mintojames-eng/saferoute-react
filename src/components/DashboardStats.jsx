import './DashboardStats.css'

function DashboardStats({ stats }) {
    const cards = [
        {
            label: 'Total Accidents',
            value: stats.totalAccidents.toLocaleString(),
            change: '+8.2%',
            changeColor: '#16a34a',
            hoverColor: 'rgba(6, 182, 212, 0.2)',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="28" height="28">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                </svg>
            ),
            iconBg: '#cffafe',
            iconColor: '#0891b2'
        },
        {
            label: 'High-Risk Areas',
            value: stats.highRiskAreas,
            change: 'High',
            changeColor: '#dc2626',
            hoverColor: 'rgba(239, 68, 68, 0.2)',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="28" height="28">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            ),
            iconBg: '#fee2e2',
            iconColor: '#dc2626'
        },
        {
            label: 'Poor Road Conditions',
            value: stats.poorRoadConditions,
            change: stats.poorRoadConditions.toString(),
            changeColor: '#ca8a04',
            hoverColor: 'rgba(234, 179, 8, 0.2)',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="28" height="28">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
                </svg>
            ),
            iconBg: '#fef3c7',
            iconColor: '#ca8a04'
        },
        {
            label: 'Algorithmic Confidence',
            value: `${stats.confidenceScore}%`,
            change: 'Good',
            changeColor: '#16a34a',
            hoverColor: 'rgba(34, 197, 94, 0.2)',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="28" height="28">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
            ),
            iconBg: '#dcfce7',
            iconColor: '#16a34a'
        }
    ]

    return (
        <section id="dashboard" className="section">
            <div className="container">
                <div style={{ marginBottom: '40px' }}>
                    <p className="section-label" style={{ color: '#0891b2' }}>LIVE AI TELEMETRY</p>
                    <h2 className="section-title">Real-Time Predictive Analytics</h2>
                    <p className="section-subtitle">Overview of accident patterns and road safety conditions.</p>
                </div>

                <div className="stats-grid">
                    {cards.map((card, i) => (
                        <div key={i} className="stat-card card reveal">
                            <div className="stat-card-header">
                                <div className="stat-icon" style={{ background: card.iconBg, color: card.iconColor }}>
                                    {card.icon}
                                </div>
                                <span className="stat-change" style={{ color: card.changeColor }}>{card.change}</span>
                            </div>
                            <p className="stat-label">{card.label}</p>
                            <h3 className="stat-value">{card.value}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default DashboardStats
