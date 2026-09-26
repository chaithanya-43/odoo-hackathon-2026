import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Authentication.css";
import { login } from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!formData.email || !formData.password) {
      setError("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await login(formData);

      const data = response?.data || response;

      if (!data?.token) {
        throw new Error(
          "Login succeeded but no token was returned."
        );
      }

      localStorage.setItem("token", data.token);

      if (data.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );
      }

      navigate("/dashboard", {
        replace: true,
      });
    } catch (error) {
      setError(
        error.message ||
          "Authentication failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">

        <div className="signup-header">

          <div className="logo">
            <i className="bx bx-lock-alt"></i>
          </div>

          <h1>Welcome Back</h1>

          <p>
            Login to your StockSense account
          </p>

        </div>

        <form onSubmit={handleSubmit}>

          <div className="input-box">

            <i className="bx bx-envelope"></i>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder=" "
              autoComplete="email"
              required
            />

            <label>Email Address</label>

          </div>

          <div className="input-box">

            <i className="bx bx-lock-alt"></i>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder=" "
              autoComplete="current-password"
              required
            />

            <label>Password</label>

          </div>

          {error && (
            <div className="form-error">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="signup-button"
            disabled={loading}
          >
            {loading
              ? "Logging in..."
              : "Login"}

            {!loading && (
              <i className="bx bx-right-arrow-alt"></i>
            )}
          </button>

        </form>

        <div className="login-link">

          <p>
            Don't have an account?
            <Link to="/signup">
              Create Account
            </Link>
          </p>

        </div>

      </div>
    </div>
  );
}

export default Login;