import { useState } from 'react'
import './Navbar.css'

function Navbar({
    darkMode,
    onToggleDarkMode,
    activeView,
    setActiveView,
    currentUser,
    onOpenAuth,
    onLogout,
    unreadAlertsCount = 0,
    mongoStatus = { connected: true, label: '🍃 MongoDB' }
}) {
    const [mobileOpen, setMobileOpen] = useState(false)

    const handleNavigate = (view, anchor = null) => {
        setActiveView(view)
        setMobileOpen(false)
        if (anchor) {
            setTimeout(() => {
                const el = document.querySelector(anchor)
                if (el) el.scrollIntoView({ behavior: 'smooth' })
            }, 100)
        }
    }

    return (
        <header className="navbar">
            <div className="container">
                <div className="navbar-inner">
                    {/* Logo */}
                    <div className="navbar-logo" onClick={() => handleNavigate('home')}>
                        <div className="logo-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="white" width="24" height="24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="logo-title">SafeRoute AI</h1>
                            <p className="logo-subtitle">Smart AI Traffic Analysis</p>
                        </div>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="desktop-nav">
                        <ul>
                            <li>
                                <button
                                    type="button"
                                    className={`nav-btn-link ${activeView === 'home' ? 'active' : ''}`}
                                    onClick={() => handleNavigate('home')}
                                >
                                    Home
                                </button>
                            </li>
                            <li>
                                <button
                                    type="button"
                                    className={`nav-btn-link ${activeView === 'risk-dashboard' ? 'active' : ''}`}
                                    onClick={() => handleNavigate('risk-dashboard')}
                                >
                                    📊 Risk Dashboard
                                </button>
                            </li>
                            <li>
                                <button
                                    type="button"
                                    className={`nav-btn-link alert-nav-link ${activeView === 'alerts' ? 'active' : ''}`}
                                    onClick={() => handleNavigate('alerts')}
                                >
                                    🔔 Safety Alerts
                                    {unreadAlertsCount > 0 && (
                                        <span className="navbar-alert-badge">{unreadAlertsCount}</span>
                                    )}
                                </button>
                            </li>
                            <li>
                                <button
                                    type="button"
                                    className="nav-btn-link"
                                    onClick={() => handleNavigate('home', '#areas')}
                                >
                                    Accident Hotspots
                                </button>
                            </li>
                            <li>
                                <button
                                    type="button"
                                    className="nav-btn-link"
                                    onClick={() => handleNavigate('home', '#safety')}
                                >
                                    Safety Tips
                                </button>
                            </li>

                            {/* MongoDB Status Indicator */}
                            {mongoStatus && (
                                <li>
                                    <span
                                        className="navbar-mongo-pill"
                                        title={mongoStatus.connected ? "Connected to MongoDB Database: saferoute" : "MongoDB Offline"}
                                    >
                                        <span className={`mongo-dot ${mongoStatus.connected ? 'online' : 'offline'}`}></span>
                                        {mongoStatus.label}
                                    </span>
                                </li>
                            )}

                            {/* Dark Mode Switcher */}
                            <li>
                                <button onClick={onToggleDarkMode} className="dark-toggle" aria-label="Toggle Dark Mode">
                                    {darkMode ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="20" height="20">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-2.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="20" height="20">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                                        </svg>
                                    )}
                                </button>
                            </li>

                            {/* User Authentication Status */}
                            <li>
                                {currentUser ? (
                                    <div className="navbar-user-group">
                                        <button
                                            type="button"
                                            className={`nav-user-pill ${activeView === 'profile' ? 'active' : ''}`}
                                            onClick={() => handleNavigate('profile')}
                                            title="View User Profile"
                                        >
                                            <img
                                                src={currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80'}
                                                alt={currentUser.name}
                                                className="navbar-avatar"
                                            />
                                            <span className="navbar-user-name">
                                                {currentUser.name.split(' ')[0]}
                                            </span>
                                            <span className="navbar-user-score">
                                                {currentUser.safetyScore || 94}
                                            </span>
                                        </button>
                                        <button
                                            type="button"
                                            className="nav-logout-btn"
                                            onClick={onLogout}
                                            title="Sign Out"
                                        >
                                            Sign Out
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-primary nav-signin-btn"
                                        onClick={onOpenAuth}
                                    >
                                        🔐 Sign In / Join
                                    </button>
                                )}
                            </li>
                        </ul>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button className="mobile-menu-btn" onClick={() => setMobileOpen(!mobileOpen)}>
                        ☰
                    </button>
                </div>

                {/* Mobile Nav */}
                {mobileOpen && (
                    <nav className="mobile-nav">
                        <button type="button" onClick={() => handleNavigate('home')}>
                            Home Overview
                        </button>
                        <button type="button" onClick={() => handleNavigate('risk-dashboard')}>
                            📊 Risk Dashboard
                        </button>
                        <button type="button" onClick={() => handleNavigate('alerts')}>
                            🔔 Safety Alerts ({unreadAlertsCount})
                        </button>
                        <button type="button" onClick={() => handleNavigate('home', '#areas')}>
                            Accident Hotspots
                        </button>
                        <button type="button" onClick={() => handleNavigate('home', '#safety')}>
                            Safety Tips
                        </button>

                        {currentUser ? (
                            <div className="mobile-user-section">
                                <button type="button" className="btn btn-outline" onClick={() => handleNavigate('profile')}>
                                    👤 My Profile ({currentUser.name})
                                </button>
                                <button type="button" className="btn btn-danger" onClick={onLogout}>
                                    Sign Out
                                </button>
                            </div>
                        ) : (
                            <button
                                type="button"
                                className="btn btn-primary"
                                style={{ marginTop: '12px' }}
                                onClick={() => {
                                    setMobileOpen(false)
                                    onOpenAuth()
                                }}
                            >
                                🔐 Sign In / Create Account
                            </button>
                        )}
                    </nav>
                )}
            </div>
        </header>
    )
}

export default Navbar
