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
import { defaultIncidents, defaultStats } from './data/defaultIncidents'

const API_URL = 'http://localhost:3001'

function App() {
  // ── State Management with useState ──
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

  // ── Data Fetching with useEffect ──
  useEffect(() => {
    fetchIncidents()
    fetchDashboardStats()
  }, [])

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

      {/* Header */}
      <Navbar
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />

      <main>
        {/* Hero Section */}
        <HeroSection stats={computedStats} />

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
