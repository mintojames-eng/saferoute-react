import './Footer.css'

function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <div className="footer-logo">
                            <span className="logo-badge">SR</span>
                            <h2>SafeRoute AI</h2>
                        </div>
                        <p className="footer-desc">
                            AI-powered road accident risk prediction and safety platform for smarter transportation and safer journeys.
                        </p>
                    </div>

                    <div className="footer-links">
                        <h4>Platform</h4>
                        <ul>
                            <li><a href="#home">Home</a></li>
                            <li><a href="#dashboard">Dashboard</a></li>
                            <li><a href="#risk">ML Risk Model</a></li>
                            <li><a href="#areas">Accident Areas</a></li>
                            <li><a href="#safety">Safety Tips</a></li>
                        </ul>
                    </div>

                    <div className="footer-links">
                        <h4>Target Users</h4>
                        <ul>
                            <li>🚗 Drivers</li>
                            <li>🧳 Travelers</li>
                            <li>🚦 Traffic Authorities</li>
                            <li>👥 General Public</li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>© 2026 SafeRoute AI. Transportation & Mobility / AI Traffic Analysis.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer

