import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../services/api'
import '../Authentication.css'

function Login() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    email: '',
    password: '',
  })

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

    if (!form.email || !form.password) {
      setError('Email and password are required.')
      return
    }

    try {
      setLoading(true)

      const result = await login(form)

      /*
       * Keep the complete backend response temporarily.
       * The exact JWT field will be integrated according
       * to the authentication team's backend contract.
       */
      sessionStorage.setItem(
        'authResponse',
        JSON.stringify(result)
      )

      navigate('/dashboard')
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
            <path d="M19 8v6" />
            <path d="M22 11h-6" />
          </svg>
        </div>

        <h1>Welcome Back</h1>

        <p className="auth-subtitle">
          Sign in to continue to StockSense
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
              autoComplete="current-password"
            />
          </div>

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
            {loading ? 'Signing In...' : 'Login'}

            {!loading && (
              <span className="button-arrow">→</span>
            )}
          </button>

        </form>

        <p className="auth-footer">
          Don't have an account?{' '}
          <Link to="/signup">Create Account</Link>
        </p>

      </div>
    </div>
  )
}

export default Login