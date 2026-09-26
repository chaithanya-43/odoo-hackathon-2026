import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../services/api'

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
       * The backend authentication team has not yet
       * finalized the exact JWT response field.
       *
       * Keep the complete response available for integration.
       */
      sessionStorage.setItem('authResponse', JSON.stringify(result))

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
        <h1>StockSense</h1>
        <h2>Login</h2>

        <p className="auth-subtitle">
          Sign in to manage your inventory
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>

          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />

          <label htmlFor="password">Password</label>

          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />

          {error && <p className="form-error">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account?{' '}
          <Link to="/signup">Create account</Link>
        </p>
      </div>
    </div>
  )
}

export default Login