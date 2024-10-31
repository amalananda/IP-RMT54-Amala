import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export default function RegisterPage() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()

    try {
      const userData = {
        username,
        email,
        password,
      }
      await axios.post("https://p2.amalananda.online/register", userData)
      navigate("/login") // Redirect ke halaman login setelah registrasi berhasil
    } catch (err) {
      console.log("Please retry", err)
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Sign Up</h2>
        <form onSubmit={handleRegister}>
          {/* Username input */}
          <div className="form-outline mb-4">
            <input
              type="text"
              id="username"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label className="form-label" htmlFor="username">
              Username
            </label>
          </div>
          {/* Email input */}
          <div className="form-outline mb-4">
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label className="form-label" htmlFor="email">
              Email address
            </label>
          </div>
          {/* Password input */}
          <div className="form-outline mb-4">
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label className="form-label" htmlFor="password">
              Password
            </label>
          </div>
          {/* Checkbox */}
          <div className="form-check d-flex justify-content-center mb-4">
            <input
              className="form-check-input me-2"
              type="checkbox"
              id="newsletter"
            />
            {/* <label className="form-check-label" htmlFor="newsletter">
              Subscribe to our newsletter
            </label> */}
          </div>
          {/* Submit button */}
          <button
            type="submit"
            className="btn btn-primary btn-block mb-4"
          >
            Sign up
          </button>
          {/* Register buttons */}
          <div className="text-center">
            <p>or sign up with:</p>
            {/* <button
              type="button"
              className="btn btn-secondary btn-floating mx-1"
            >
              <i className="fab fa-facebook-f" />
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-floating mx-1"
            >
              <i className="fab fa-google" />
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-floating mx-1"
            >
              <i className="fab fa-twitter" />
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-floating mx-1"
            >
              <i className="fab fa-github" />
            </button> */}
          </div>
        </form>
      </div>
    </div>
  )
}
