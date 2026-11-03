import './SafetyTips.css'

function SafetyTips() {
    const tips = [
        {
            icon: '🐢',
            title: 'Reduce Speed',
            description: 'Reduce your speed when entering accident-prone areas or poor road conditions.'
        },
        {
            icon: '📱',
            title: 'Avoid Distractions',
            description: 'Do not use your phone while driving and maintain full attention on the road.'
        },
        {
            icon: '🌧️',
            title: 'Drive Carefully in Bad Weather',
            description: 'Rain and fog can reduce visibility and increase stopping distance.'
        },
        {
            icon: '🛣️',
            title: 'Consider Safer Routes',
            description: 'When possible, choose routes with lower predicted accident risk.'
        }
    ]

    return (
        <section id="safety" className="section">
            <div className="container">
                <div className="text-center" style={{ marginBottom: '48px', textAlign: 'center' }}>
                    <p className="section-label" style={{ color: '#16a34a' }}>SAFETY FIRST</p>
                    <h2 className="section-title">Smart Safety Recommendations</h2>
                    <p className="section-subtitle">
                        Follow these recommendations when traveling through high-risk areas.
                    </p>
                </div>

                <div className="grid-2">
                    {tips.map((tip, idx) => (
                        <div key={idx} className="card safety-tip-card">
                            <span className="tip-icon">{tip.icon}</span>
                            <div>
                                <h3 className="tip-title">{tip.title}</h3>
                                <p className="tip-description">{tip.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default SafetyTips

