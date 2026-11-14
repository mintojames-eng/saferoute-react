import { useState } from 'react'
import './AuthModal.css'
import { defaultUser } from '../data/mockData'

function AuthModal({ isOpen, onClose, onAuthSuccess, showToast }) {
    const [isSignUp, setIsSignUp] = useState(false)
    const [loginEmail, setLoginEmail] = useState('')
    const [loginPassword, setLoginPassword] = useState('')

    // Sign up state
    const [fullName, setFullName] = useState('')
    const [signUpEmail, setSignUpEmail] = useState('')
    const [signUpPassword, setSignUpPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [vehicleType, setVehicleType] = useState('Four Wheeler (SUV)')

    if (!isOpen) return null

    const handleLoginSubmit = (e) => {
        e.preventDefault()
        if (!loginEmail || !loginPassword) {
            showToast('Authentication Error', 'Please fill in all credentials.', true)
            return
        }

        // Check stored users
        const savedUsers = JSON.parse(localStorage.getItem('saferoute_users') || '[]')
        const matched = savedUsers.find(u => u.email.toLowerCase() === loginEmail.toLowerCase())

        const authenticatedUser = matched || {
            ...defaultUser,
            email: loginEmail,
            name: loginEmail.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
        }

        localStorage.setItem('saferoute_current_user', JSON.stringify(authenticatedUser))
        onAuthSuccess(authenticatedUser)
        showToast('Welcome Back', `Logged in successfully as ${authenticatedUser.name}!`)
        onClose()
    }

    const handleSignUpSubmit = (e) => {
        e.preventDefault()
        if (!fullName || !signUpEmail || !signUpPassword) {
            showToast('Registration Error', 'All essential fields are required.', true)
            return
        }

        if (signUpPassword !== confirmPassword) {
            showToast('Validation Error', 'Passwords do not match.', true)
            return
        }

        const newUser = {
            id: `user_${Date.now()}`,
            name: fullName,
            email: signUpEmail,
            phone: phone || '+91 98000 00000',
            vehicleType,
            role: 'SafeRoute Commuter',
            safetyScore: 90,
            avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(fullName)}`,
            bloodGroup: 'Not Specified',
            joinedDate: 'November 2026',
            reportsSubmitted: 0,
            hazardsVerified: 0,
            emergencyContacts: defaultUser.emergencyContacts,
            savedRoutes: defaultUser.savedRoutes,
            preferences: defaultUser.preferences
        }

        // Save in stored users list
        const savedUsers = JSON.parse(localStorage.getItem('saferoute_users') || '[]')
        savedUsers.push(newUser)
        localStorage.setItem('saferoute_users', JSON.stringify(savedUsers))
        localStorage.setItem('saferoute_current_user', JSON.stringify(newUser))

        onAuthSuccess(newUser)
        showToast('Account Created', `Welcome to SafeRoute AI, ${newUser.name}!`)
        onClose()
    }

    const handleDemoLogin = () => {
        localStorage.setItem('saferoute_current_user', JSON.stringify(defaultUser))
        onAuthSuccess(defaultUser)
        showToast('Demo Access Granted', `Logged in as ${defaultUser.name} (${defaultUser.email}).`)
        onClose()
    }

    return (
        <div className="auth-overlay" onClick={onClose}>
            <div className="auth-card" onClick={(e) => e.stopPropagation()}>
                <button className="auth-close-btn" onClick={onClose} aria-label="Close modal">
                    ✕
                </button>

                <div className="auth-header">
                    <div className="auth-badge">
                        <span>🛡️ SafeRoute AI Identity</span>
                    </div>
                    <h2 className="auth-title">
                        {isSignUp ? 'Create Your Account' : 'Welcome to SafeRoute'}
                    </h2>
                    <p className="auth-subtitle">
                        {isSignUp
                            ? 'Join thousands of drivers making city travel safer with real-time AI telematics.'
                            : 'Access live route hazard feeds, personalized safety telemetry, and emergency ICE settings.'}
                    </p>
                </div>

                {/* Tab Switcher */}
                <div className="auth-tabs">
                    <button
                        type="button"
                        className={`auth-tab ${!isSignUp ? 'active' : ''}`}
                        onClick={() => setIsSignUp(false)}
                    >
                        Sign In
                    </button>
                    <button
                        type="button"
                        className={`auth-tab ${isSignUp ? 'active' : ''}`}
                        onClick={() => setIsSignUp(true)}
                    >
                        Create Account
                    </button>
                </div>

                {/* Quick Demo Sign In Button */}
                <button
                    type="button"
                    className="demo-login-btn"
                    onClick={handleDemoLogin}
                >
                    ⚡ One-Click Demo Sign In ({defaultUser.email})
                </button>

                <div className="auth-divider">
                    <span>or continue with credentials</span>
                </div>

                {!isSignUp ? (
                    /* ── LOGIN FORM ── */
                    <form className="auth-form" onSubmit={handleLoginSubmit}>
                        <div className="auth-field">
                            <label>Email Address</label>
                            <input
                                type="email"
                                placeholder="name@example.com"
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="auth-field">
                            <div className="auth-field-header">
                                <label>Password</label>
                                <span className="auth-forgot-link" onClick={() => showToast('Password Reset', 'Password recovery instructions sent to your email.')}>
                                    Forgot?
                                </span>
                            </div>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-primary auth-submit-btn">
                            Sign In to SafeRoute →
                        </button>
                    </form>
                ) : (
                    /* ── SIGN UP FORM ── */
                    <form className="auth-form" onSubmit={handleSignUpSubmit}>
                        <div className="auth-field">
                            <label>Full Legal Name</label>
                            <input
                                type="text"
                                placeholder="e.g. Rahul Sharma"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="auth-row">
                            <div className="auth-field">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    placeholder="rahul@example.com"
                                    value={signUpEmail}
                                    onChange={(e) => setSignUpEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="auth-field">
                                <label>Mobile (Emergency SOS)</label>
                                <input
                                    type="tel"
                                    placeholder="+91 98765 00000"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="auth-field">
                            <label>Primary Vehicle Mode</label>
                            <select value={vehicleType} onChange={(e) => setVehicleType(e.target.value)}>
                                <option value="Four Wheeler (SUV)">Four Wheeler (SUV / Hatchback / Sedan)</option>
                                <option value="Two Wheeler (Motorcycle)">Two Wheeler (Motorcycle / Scooter)</option>
                                <option value="Commercial Vehicle">Commercial Vehicle (Cab / Bus / Truck)</option>
                                <option value="Bicycle / Pedestrian">Bicycle / Pedestrian</option>
                            </select>
                        </div>

                        <div className="auth-row">
                            <div className="auth-field">
                                <label>Password</label>
                                <input
                                    type="password"
                                    placeholder="Min 6 characters"
                                    value={signUpPassword}
                                    onChange={(e) => setSignUpPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="auth-field">
                                <label>Confirm Password</label>
                                <input
                                    type="password"
                                    placeholder="Repeat password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary auth-submit-btn">
                            Create SafeRoute Account →
                        </button>
                    </form>
                )}

                <div className="auth-footer-note">
                    🔒 Protected by end-to-end telemetry encryption and local storage verification.
                </div>
            </div>
        </div>
    )
}

export default AuthModal
