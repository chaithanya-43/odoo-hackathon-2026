import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Authentication.css";
import { signup } from "../services/api";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [agreeTerms, setAgreeTerms] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (
      !form.name ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      setError(
        "Please fill in all required fields."
      );
      return;
    }

    if (
      form.password !== form.confirmPassword
    ) {
      setError(
        "Passwords do not match."
      );
      return;
    }

    if (!agreeTerms) {
      setError(
        "Please agree to the Terms & Conditions."
      );
      return;
    }

    try {
      setLoading(true);

      await signup({
        name: form.name,
        email: form.email,
        password: form.password,
      });

      navigate("/login");
    } catch (error) {
      setError(
        error.message ||
          "Registration failed."
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
            <i className="bx bx-user-plus"></i>
          </div>

          <h1>Create Account</h1>

          <p>
            Join us and get started today
          </p>

        </div>

        <form onSubmit={handleSubmit}>

          <div className="input-box">

            <i className="bx bx-user"></i>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder=" "
              autoComplete="name"
              required
            />

            <label>Username</label>

          </div>

          <div className="input-box">

            <i className="bx bx-envelope"></i>

            <input
              type="email"
              name="email"
              value={form.email}
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
              value={form.password}
              onChange={handleChange}
              placeholder=" "
              autoComplete="new-password"
              required
            />

            <label>Password</label>

          </div>

          <div className="input-box">

            <i className="bx bx-lock-alt"></i>

            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder=" "
              autoComplete="new-password"
              required
            />

            <label>
              Confirm Password
            </label>

          </div>

          <div className="terms">

            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(event) =>
                setAgreeTerms(
                  event.target.checked
                )
              }
            />

            <label>
              I agree to the{" "}
              <a
                href="#terms"
                onClick={(event) =>
                  event.preventDefault()
                }
              >
                Terms & Conditions
              </a>
            </label>

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
              ? "Creating Account..."
              : "Create Account"}

            {!loading && (
              <i className="bx bx-right-arrow-alt"></i>
            )}
          </button>

        </form>

        <div className="login-link">

          <p>
            Already have an account?
            <Link to="/login">
              Login
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Signup;