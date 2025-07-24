import './Login.css'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Login() {
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [step, setStep] = useState(1)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleSendCode = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    try {
      const res = await axios.post('/api/auth/request-code/', { email })
      setMessage('A login code has been sent to your email.')
      setStep(2)
    } catch (err) {
      setMessage(err.response?.data?.detail || 'Failed to send code.')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyCode = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    try {
      const res = await axios.post('/api/auth/verify-code/', { email, code })
      setMessage('Login successful!')
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('isLoggedIn', 'true')
      navigate('/dashboard/home')
    } catch (err) {
      setMessage(err.response?.data?.detail || 'Invalid code.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-form-section">
          <h2 className="login-title">Login</h2>
          {step === 1 && (
            <form onSubmit={handleSendCode} className="login-form">
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="Enter your registered email"
                />
              </div>
              <button type="submit" className="login-btn" disabled={loading}>
                {loading ? 'Sending...' : 'Send Code'}
              </button>
            </form>
          )}
          {step === 2 && (
            <form onSubmit={handleVerifyCode} className="login-form">
              <div className="form-group">
                <label>Enter 8-digit Code</label>
                <input
                  type="text"
                  value={code}
                  onChange={e => setCode(e.target.value)}
                  required
                  placeholder="Enter the code sent to your email"
                  pattern="^[0-9]{8}$"
                  maxLength={8}
                />
              </div>
              <button type="submit" className="login-btn" disabled={loading}>
                {loading ? 'Verifying...' : 'Verify Code'}
              </button>
              <button type="button" className="login-btn secondary" onClick={() => setStep(1)} disabled={loading}>
                Back
              </button>
            </form>
          )}
          {message && <p className="login-message">{message}</p>}
        </div>
        <div className="instruction-section">
          <h2>Welcome</h2>
          <h3>To</h3>
          <h3>Majeed Agricultural Robotics Lab</h3>
          <ul>
            <li>Use any email address registered by the admin.</li>
            <li>No password required—just a one-time code sent to your email.</li>
            <li>If you have trouble logging in, contact the admin.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Login
