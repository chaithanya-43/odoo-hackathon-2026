import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signup } from '../services/api'
import '../Authentication.css'

function Signup() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [agreeTerms, setAgreeTerms] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function handleChange(event) {
    const { name, value } = event.target

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')

    if (!form.name || !form.email || !form.password) {
      setError('Please fill in all required fields.')
      return
    }

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    if (!agreeTerms) {
      setError('Please agree to the Terms & Conditions.')
      return
    }

    try {
      setLoading(true)

      await signup({
        name: form.name,
        email: form.email,
        password: form.password,
      })

      navigate('/login')
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">

        <div className="auth-icon">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M15 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="8.5" cy="7" r="4" />
            <line x1="19" y1="8" x2="19" y2="14" />
            <line x1="22" y1="11" x2="16" y2="11" />
          </svg>
        </div>

        <h1>Create Account</h1>

        <p className="auth-subtitle">
          Join us and get started today
        </p>

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <span className="input-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </span>

            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Username"
              autoComplete="name"
            />
          </div>

          <div className="input-group">
            <span className="input-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <polyline points="3,7 12,13 21,7" />
              </svg>
            </span>

            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email Address"
              autoComplete="email"
            />
          </div>

          <div className="input-group">
            <span className="input-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="5" y="11" width="14" height="10" rx="2" />
                <path d="M8 11V7a4 4 0 0 1 8 0v4" />
              </svg>
            </span>

            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              autoComplete="new-password"
            />
          </div>

          <div className="input-group">
            <span className="input-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="5" y="11" width="14" height="10" rx="2" />
                <path d="M8 11V7a4 4 0 0 1 8 0v4" />
              </svg>
            </span>

            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              autoComplete="new-password"
            />
          </div>

          <label className="terms-row">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(event) => setAgreeTerms(event.target.checked)}
            />

            <span>
              I agree to the{' '}
              <a href="#terms" onClick={(event) => event.preventDefault()}>
                Terms & Conditions
              </a>
            </span>
          </label>

          {error && (
            <p className="form-error">
              {error}
            </p>
          )}

          <button
            className="auth-button"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create Account'}

            {!loading && (
              <span className="button-arrow">→</span>
            )}
          </button>

        </form>

        <p className="auth-footer">
          Already have an account?{' '}
          <Link to="/login">Login</Link>
        </p>

      </div>
    </div>
  )
}

export default Signup