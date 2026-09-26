import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signup } from '../services/api'

function Signup() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
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

    if (!form.name || !form.email || !form.password) {
      setError('Name, email and password are required.')
      return
    }

    try {
      setLoading(true)

      await signup(form)

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
        <h1>StockSense</h1>
        <h2>Create Account</h2>

        <p className="auth-subtitle">
          Create your inventory management account
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>

          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />

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
            placeholder="Create a password"
          />

          {error && <p className="form-error">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? 'Creating account...' : 'Sign Up'}
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