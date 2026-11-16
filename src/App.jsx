import { useState, useEffect, useCallback } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import DashboardStats from './components/DashboardStats'
import Charts from './components/Charts'
import RiskPredictionForm from './components/RiskPredictionForm'
import IncidentMap from './components/IncidentMap'
import IncidentList from './components/IncidentList'
import IncidentForm from './components/IncidentForm'
import SearchBar from './components/SearchBar'
import Modal from './components/Modal'
import RoadConditions from './components/RoadConditions'
import SafetyTips from './components/SafetyTips'
import Footer from './components/Footer'
import Toast from './components/Toast'
import AuthModal from './components/AuthModal'
import RiskDashboard from './components/RiskDashboard'
import SafetyAlerts from './components/SafetyAlerts'
import UserProfile from './components/UserProfile'
import { defaultIncidents, defaultStats } from './data/defaultIncidents'
import { defaultUser, initialSafetyAlerts } from './data/mockData'

const API_URL = 'http://127.0.0.1:5000'

function App() {
  // ── Navigation & Views State ──
  const [activeView, setActiveView] = useState('home') // 'home' | 'risk-dashboard' | 'alerts' | 'profile'
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [mongoStatus, setMongoStatus] = useState({ connected: true, label: '🍃 MongoDB' })

  // ── User Authentication State ──
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('saferoute_current_user')
    return saved ? JSON.parse(saved) : defaultUser
  })

  // ── Safety Alerts State ──
  const [safetyAlerts, setSafetyAlerts] = useState(() => {
    const saved = localStorage.getItem('saferoute_alerts')
    return saved ? JSON.parse(saved) : initialSafetyAlerts
  })

  // ── Incident CRUD & Core State ──
  const [incidents, setIncidents] = useState([])
  const [dashboardStats, setDashboardStats] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [darkMode, setDarkMode] = useState(true)
  const [editingIncident, setEditingIncident] = useState(null)
  const [showFormModal, setShowFormModal] = useState(false)
  const [showSosModal, setShowSosModal] = useState(false)
  const [showHazardModal, setShowHazardModal] = useState(false)
  const [toasts, setToasts] = useState([])
  const [loading, setLoading] = useState(true)

  // ── Toast Helper ──
  const showToast = useCallback((title, message, isError = false) => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, title, message, isError }])
  }, [])

  const dismissToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  // ── Data Fetching with useEffect (MongoDB Backend) ──
  useEffect(() => {
    fetchIncidents()
    fetchDashboardStats()
    fetchAlerts()
    checkMongoStatus()
  }, [])

  const checkMongoStatus = async () => {
    try {
      const res = await fetch(`${API_URL}/status`)
      if (res.ok) {
        const data = await res.json()
        setMongoStatus({ connected: data.connected, label: data.connected ? '🍃 MongoDB Active' : 'Offline' })
      }
    } catch {
      setMongoStatus({ connected: false, label: 'Local Cache' })
    }
  }

  const fetchAlerts = async () => {
    try {
      const res = await fetch(`${API_URL}/alerts`)
      if (res.ok) {
        const data = await res.json()
        if (data && data.length > 0) {
          setSafetyAlerts(data)
          localStorage.setItem('saferoute_alerts', JSON.stringify(data))
        }
      }
    } catch {
      console.warn('Backend alerts offline, using local cache')
    }
  }

  // ── Dark Mode Toggle with useEffect ──
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }, [darkMode])

  // ── Scroll Reveal with useEffect ──
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active')
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    )

    const revealElements = document.querySelectorAll('.reveal')
    revealElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  })

  // ── CRUD: Read (JSON Server with LocalStorage Fallback) ──
  const fetchIncidents = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${API_URL}/incidents`)
      if (!res.ok) throw new Error('Network response not ok')
      const data = await res.json()
      setIncidents(data)
      localStorage.setItem('saferoute_incidents', JSON.stringify(data))
    } catch (err) {
      console.warn('JSON Server offline, using LocalStorage fallback:', err)
      const localData = localStorage.getItem('saferoute_incidents')
      if (localData) {
        setIncidents(JSON.parse(localData))
      } else {
        setIncidents(defaultIncidents)
        localStorage.setItem('saferoute_incidents', JSON.stringify(defaultIncidents))
      }
    } finally {
      setLoading(false)
    }
  }

  const fetchDashboardStats = async () => {
    try {
      const res = await fetch(`${API_URL}/dashboardStats`)
      if (!res.ok) throw new Error('Network response not ok')
      const data = await res.json()
      if (data.length > 0) {
        setDashboardStats(data[0])
        localStorage.setItem('saferoute_stats', JSON.stringify(data[0]))
      }
    } catch (err) {
      const localStats = localStorage.getItem('saferoute_stats')
      if (localStats) {
        setDashboardStats(JSON.parse(localStats))
      } else {
        setDashboardStats(defaultStats)
        localStorage.setItem('saferoute_stats', JSON.stringify(defaultStats))
      }
    }
  }

  // ── CRUD: Create (JSON Server + LocalStorage) ──
  const addIncident = async (incident) => {
    let newIncident = { ...incident, id: Date.now() }
    try {
      const res = await fetch(`${API_URL}/incidents`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(incident)
      })
      if (res.ok) {
        newIncident = await res.json()
      }
    } catch (err) {
      console.warn('Saved to LocalStorage fallback')
    }

    setIncidents(prev => {
      const updated = [...prev, newIncident]
      localStorage.setItem('saferoute_incidents', JSON.stringify(updated))
      return updated
    })
    setShowFormModal(false)
    showToast('Success', `"${newIncident.name}" has been added successfully.`)
  }

  // ── CRUD: Update (JSON Server + LocalStorage) ──
  const updateIncident = async (id, updatedData) => {
    let updated = { ...updatedData, id }
    try {
      const res = await fetch(`${API_URL}/incidents/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      })
      if (res.ok) {
        updated = await res.json()
      }
    } catch (err) {
      console.warn('Updated in LocalStorage fallback')
    }

    setIncidents(prev => {
      const updatedList = prev.map(inc => inc.id === id ? updated : inc)
      localStorage.setItem('saferoute_incidents', JSON.stringify(updatedList))
      return updatedList
    })
    setEditingIncident(null)
    setShowFormModal(false)
    showToast('Updated', `"${updated.name}" has been updated successfully.`)
  }

  // ── CRUD: Delete (JSON Server + LocalStorage) ──
  const deleteIncident = async (id) => {
    const incident = incidents.find(i => i.id === id)
    try {
      await fetch(`${API_URL}/incidents/${id}`, { method: 'DELETE' })
    } catch (err) {
      console.warn('Deleted from LocalStorage fallback')
    }

    setIncidents(prev => {
      const updatedList = prev.filter(inc => inc.id !== id)
      localStorage.setItem('saferoute_incidents', JSON.stringify(updatedList))
      return updatedList
    })
    showToast('Deleted', `"${incident?.name}" has been removed.`)
  }

  // ── Auth Handlers ──
  const handleAuthSuccess = (user) => {
    setCurrentUser(user)
    localStorage.setItem('saferoute_current_user', JSON.stringify(user))
  }

  const handleLogout = () => {
    localStorage.removeItem('saferoute_current_user')
    setCurrentUser(null)
    setActiveView('home')
    showToast('Signed Out', 'You have been signed out of your account.')
  }

  const handleUpdateUser = async (updatedUser) => {
    setCurrentUser(updatedUser)
    localStorage.setItem('saferoute_current_user', JSON.stringify(updatedUser))

    // Sync to MongoDB
    try {
      await fetch(`${API_URL}/users/${updatedUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser)
      })
    } catch {
      console.warn('MongoDB user update offline, saved to local cache')
    }

    // Also update in users list if present
    const users = JSON.parse(localStorage.getItem('saferoute_users') || '[]')
    const updatedUsers = users.map(u => u.id === updatedUser.id ? updatedUser : u)
    localStorage.setItem('saferoute_users', JSON.stringify(updatedUsers))
  }

  // ── Safety Alerts Handlers (MongoDB Synchronized) ──
  const handleAddAlert = async (newAlert) => {
    try {
      await fetch(`${API_URL}/alerts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAlert)
      })
    } catch {
      console.warn('MongoDB alert insert offline, saved to local cache')
    }

    setSafetyAlerts(prev => {
      const updated = [newAlert, ...prev]
      localStorage.setItem('saferoute_alerts', JSON.stringify(updated))
      return updated
    })
  }

  const handleVerifyAlert = async (alertId) => {
    const alert = safetyAlerts.find(a => a.id === alertId)
    const isVerified = !alert?.isVerifiedByUser

    try {
      await fetch(`${API_URL}/alerts/${alertId}/verify`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isVerifiedByUser: isVerified })
      })
    } catch {
      console.warn('MongoDB alert verify offline')
    }

    setSafetyAlerts(prev => {
      const updated = prev.map(a => {
        if (a.id === alertId) {
          return {
            ...a,
            isVerifiedByUser: isVerified,
            verifiedCount: isVerified ? a.verifiedCount + 1 : Math.max(a.verifiedCount - 1, 0)
          }
        }
        return a
      })
      localStorage.setItem('saferoute_alerts', JSON.stringify(updated))
      return updated
    })
    showToast('Hazard Verification', 'Thank you for verifying this road hazard condition (Saved to MongoDB).')
  }

  // ── Save Route from Risk Dashboard to User Profile ──
  const handleSaveRouteToProfile = (newRoute) => {
    if (!currentUser) {
      setShowAuthModal(true)
      showToast('Authentication Needed', 'Please sign in to save routes to your profile.', true)
      return
    }
    const currentRoutes = currentUser.savedRoutes || []
    const updatedUser = {
      ...currentUser,
      savedRoutes: [newRoute, ...currentRoutes]
    }
    handleUpdateUser(updatedUser)
  }

  // ── Event Handlers ──
  const handleEdit = (incident) => {
    setEditingIncident(incident)
    setShowFormModal(true)
  }

  const handleAddNew = () => {
    setEditingIncident(null)
    setShowFormModal(true)
  }

  const handleFormSubmit = (data) => {
    if (editingIncident) {
      updateIncident(editingIncident.id, data)
    } else {
      addIncident(data)
    }
  }

  // ── Filtered Incidents (Search) ──
  const filteredIncidents = incidents.filter(inc =>
    inc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inc.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inc.risk.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // ── Computed Stats ──
  const computedStats = {
    totalAccidents: incidents.reduce((sum, inc) => sum + inc.accidents, 0),
    highRiskAreas: incidents.filter(inc => inc.risk === 'High').length,
    poorRoadConditions: incidents.filter(inc => inc.road === 'Poor').length,
    confidenceScore: dashboardStats?.confidenceScore || 78,
    monthlyTrend: dashboardStats?.monthlyTrend || [120, 190, 150, 210, 180, 240],
    riskSegments: dashboardStats?.riskSegments || [25, 45, 30]
  }

  return (
    <div className="app">
      {/* Toast Notifications */}
      <Toast toasts={toasts} onDismiss={dismissToast} />

      {/* Navigation Bar */}
      <Navbar
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        activeView={activeView}
        setActiveView={setActiveView}
        currentUser={currentUser}
        onOpenAuth={() => setShowAuthModal(true)}
        onLogout={handleLogout}
        unreadAlertsCount={safetyAlerts.length}
        mongoStatus={mongoStatus}
      />

      <main>
        {/* VIEW 1: DEDICATED RISK PREDICTION DASHBOARD */}
        {activeView === 'risk-dashboard' && (
          <RiskDashboard
            showToast={showToast}
            onSaveRoute={handleSaveRouteToProfile}
          />
        )}

        {/* VIEW 2: DEDICATED REAL-TIME SAFETY ALERTS */}
        {activeView === 'alerts' && (
          <SafetyAlerts
            alerts={safetyAlerts}
            onAddAlert={handleAddAlert}
            onVerifyAlert={handleVerifyAlert}
            showToast={showToast}
          />
        )}

        {/* VIEW 3: DEDICATED USER PROFILE */}
        {activeView === 'profile' && (
          currentUser ? (
            <UserProfile
              user={currentUser}
              onUpdateUser={handleUpdateUser}
              onLogout={handleLogout}
              showToast={showToast}
            />
          ) : (
            <div className="container" style={{ padding: '80px 24px', textAlign: 'center' }}>
              <h2>Please Sign In</h2>
              <p style={{ margin: '16px 0 24px', color: 'var(--slate-500)' }}>
                You must be logged in to view and manage your SafeRoute commuter profile.
              </p>
              <button className="btn btn-primary" onClick={() => setShowAuthModal(true)}>
                Sign In or Register Now →
              </button>
            </div>
          )
        )}

        {/* VIEW 4: HOME / OVERVIEW & HOTSPOTS EXPLORER */}
        {activeView === 'home' && (
          <>
            {/* Hero Section */}
            <HeroSection stats={computedStats} />

            {/* View Shortcuts Banner */}
            <div className="container" style={{ marginBottom: '32px' }}>
              <div className="view-shortcuts-grid">
                <div className="shortcut-card card" onClick={() => setActiveView('risk-dashboard')}>
                  <div className="shortcut-icon">📊</div>
                  <div>
                    <h4>Neural Risk Dashboard</h4>
                    <p>Adjust weather and traffic density simulators</p>
                  </div>
                  <span className="shortcut-arrow">→</span>
                </div>

                <div className="shortcut-card card" onClick={() => setActiveView('alerts')}>
                  <div className="shortcut-icon">🔔</div>
                  <div>
                    <h4>Live Safety Alerts ({safetyAlerts.length})</h4>
                    <p>Real-time community flood & collision radar</p>
                  </div>
                  <span className="shortcut-arrow">→</span>
                </div>

                <div className="shortcut-card card" onClick={() => currentUser ? setActiveView('profile') : setShowAuthModal(true)}>
                  <div className="shortcut-icon">👤</div>
                  <div>
                    <h4>{currentUser ? 'My Profile & Commutes' : 'Commuter Identity'}</h4>
                    <p>{currentUser ? `${currentUser.savedRoutes?.length || 0} saved routes & ICE settings` : 'Sign in to access driver profile'}</p>
                  </div>
                  <span className="shortcut-arrow">→</span>
                </div>
              </div>
            </div>

            {/* Dashboard Statistics */}
            <DashboardStats stats={computedStats} />

            {/* Charts */}
            <Charts stats={computedStats} />

            {/* Risk Prediction Form */}
            <RiskPredictionForm showToast={showToast} />

            {/* Accident Prone Areas */}
            <section id="areas" className="section">
              <div className="container">
                <div className="areas-header">
                  <div>
                    <p className="section-label" style={{ color: '#dc2626' }}>ACCIDENT HOTSPOTS</p>
                    <h2 className="section-title">Historical Blackspot Clusters</h2>
                    <p className="section-subtitle">
                      Areas with higher historical accident activity and road safety concerns.
                    </p>
                  </div>
                  <div className="areas-actions">
                    <SearchBar
                      searchTerm={searchTerm}
                      onSearchChange={setSearchTerm}
                    />
                    <button className="btn btn-primary" onClick={handleAddNew}>
                      + Add Incident
                    </button>
                  </div>
                </div>

                <div className="areas-grid">
                  {/* Interactive Map */}
                  <IncidentMap incidents={filteredIncidents} />

                  {/* Incident Cards List */}
                  <IncidentList
                    incidents={filteredIncidents}
                    loading={loading}
                    onEdit={handleEdit}
                    onDelete={deleteIncident}
                  />
                </div>
              </div>
            </section>

            {/* Road Conditions */}
            <RoadConditions />

            {/* Safety Recommendations */}
            <SafetyTips />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Action Buttons */}
      <div className="fab-container">
        <button className="fab fab-hazard" onClick={() => setShowHazardModal(true)}>
          ⚠️ Report Hazard
        </button>
        <button className="fab fab-sos" onClick={() => setShowSosModal(true)}>
          🚨 SOS
        </button>
      </div>

      {/* Auth Modal (Login & Signup) */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={handleAuthSuccess}
        showToast={showToast}
        apiUrl={API_URL}
      />

      {/* CRUD Form Modal */}
      <Modal
        isOpen={showFormModal}
        onClose={() => { setShowFormModal(false); setEditingIncident(null) }}
        title={editingIncident ? 'Edit Incident' : 'Add New Incident'}
      >
        <IncidentForm
          incident={editingIncident}
          onSubmit={handleFormSubmit}
          onCancel={() => { setShowFormModal(false); setEditingIncident(null) }}
        />
      </Modal>

      {/* SOS Modal */}
      <Modal
        isOpen={showSosModal}
        onClose={() => setShowSosModal(false)}
        title="EMERGENCY SOS"
        titleColor="#dc2626"
      >
        <p className="modal-description">Tap a service to call immediately.</p>
        <div className="sos-links">
          <a href="tel:100" className="sos-link">
            <span className="sos-icon">🚓</span>
            <span className="sos-text">Police (100)</span>
          </a>
          <a href="tel:108" className="sos-link">
            <span className="sos-icon">🚑</span>
            <span className="sos-text">Ambulance (108)</span>
          </a>
          <a href="tel:103" className="sos-link">
            <span className="sos-icon">🚦</span>
            <span className="sos-text">Traffic Police (103)</span>
          </a>
        </div>
      </Modal>

      {/* Hazard Report Modal */}
      <Modal
        isOpen={showHazardModal}
        onClose={() => setShowHazardModal(false)}
        title="REPORT HAZARD"
        titleColor="#ca8a04"
      >
        <p className="modal-description">Submit a real-time hazard report.</p>
        <form className="hazard-form" onSubmit={(e) => {
          e.preventDefault()
          setShowHazardModal(false)
          showToast('Report Submitted', 'Your hazard report has been uploaded successfully.')
        }}>
          <div>
            <label>Hazard Type</label>
            <select defaultValue="Pothole">
              <option>Pothole</option>
              <option>Waterlogging / Flooding</option>
              <option>Traffic Accident</option>
              <option>Construction</option>
            </select>
          </div>
          <div>
            <label>Upload Photo (Proof)</label>
            <input type="file" accept="image/*" className="file-input" />
          </div>
          <button type="submit" className="btn btn-warning" style={{ width: '100%' }}>
            Submit Report
          </button>
        </form>
      </Modal>
    </div>
  )
}

export default App
