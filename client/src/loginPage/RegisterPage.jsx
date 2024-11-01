import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"

export default function RegisterPage() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      const userData = { username, email, password }
      const response = await axios.post("https://p2.amalananda.online/register", userData)

      if (response.status === 201) {
        // Jika pendaftaran berhasil, redirect ke halaman login
        navigate("/login")
      }
    } catch (err) {
      console.log("Registration failed. Please retry:", err)
      // Optionally, you could show a message to the user here.
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Sign Up</h2>
        <form onSubmit={handleRegister}>
          <div className="form-outline mb-4">
            <input
              type="text"
              id="username"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label className="form-label" htmlFor="username">Username</label>
          </div>

          <div className="form-outline mb-4">
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label className="form-label" htmlFor="email">Email address</label>
          </div>

          <div className="form-outline mb-4">
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label className="form-label" htmlFor="password">Password</label>
          </div>

          <button
            type="submit"
            className="btn btn-primary mb-4"
            style={{
              display: "block",
              margin: "0 auto", // Center the button
              width: "100%", // Optional: make button full width
            }}
          >
            Sign up
          </button>
          <p className="text-center mt-3">
            You have account?{" "} <Link to="/login" className="text-decoration-none">Login</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
