import './HeroSection.css'

function HeroSection({ stats }) {
    return (
        <section id="home" className="hero animate-gradient">
            {/* Glow Orbs */}
            <div className="glow-orb glow-cyan"></div>
            <div className="glow-orb glow-purple"></div>

            <div className="container hero-content">
                <div className="hero-grid">
                    {/* Left Content */}
                    <article className="hero-text">
                        <span className="hero-badge">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" width="18" height="18" style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            AI-POWERED ROAD SAFETY
                        </span>

                        <h2 className="hero-heading">
                            Process Telemetry.<br />
                            <span className="text-cyan">Predict Anomalies.</span>
                        </h2>

                        <p className="hero-description">
                            SafeRoute AI helps drivers, travelers, traffic authorities, and communities
                            identify accident-prone roads and understand the factors that increase accident risk.
                        </p>

                        <div className="hero-buttons">
                            <a href="#risk" className="btn btn-primary btn-lg">
                                Run Route Telemetry →
                            </a>
                            <a href="#areas" className="btn btn-outline btn-lg">
                                Inspect CV Blackspots
                            </a>
                        </div>
                    </article>

                    {/* Right Dashboard Panel */}
                    <div className="hero-dashboard glass">
                        <div className="dashboard-header">
                            <div>
                                <p className="dashboard-label">Live Safety Overview</p>
                                <h3 className="dashboard-city">Bengaluru</h3>
                            </div>
                            <span className="status-badge">● Monitoring</span>
                        </div>

                        <div className="mini-stats-grid">
                            <div className="mini-stat-card">
                                <p className="mini-stat-label">Risk Level</p>
                                <p className="mini-stat-value" style={{ color: '#facc15' }}>Medium</p>
                            </div>
                            <div className="mini-stat-card">
                                <p className="mini-stat-label">High Risk Zones</p>
                                <p className="mini-stat-value">{stats.highRiskAreas}</p>
                            </div>
                            <div className="mini-stat-card">
                                <p className="mini-stat-label">Accidents This Month</p>
                                <p className="mini-stat-value">{Math.round(stats.totalAccidents / 13)}</p>
                            </div>
                            <div className="mini-stat-card">
                                <p className="mini-stat-label">Safety Score</p>
                                <p className="mini-stat-value" style={{ color: '#4ade80' }}>{stats.confidenceScore}/100</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection
