import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"
import { addUserName } from '../authSlice'
import { useDispatch } from "react-redux"
import Swal from "sweetalert2"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post("https://p2.amalananda.online/login", {
        email,
        password,
      })
      localStorage.setItem("access_token", response.data.access_token)
      localStorage.setItem("user.id", response.data.user.id)
      dispatch(addUserName(response.data.username))
      navigate("/")
    } catch (err) {
      console.log("Please retry", err)

      Swal.fire({
        icon: "error",
        title: "Login Failed Buddy",
        text: err?.response?.data?.message || " Please try again buddy.",
      })
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Sign In</h2>
        <form onSubmit={handleLogin}>
          {/* Email input */}
          <div className="form-outline mb-4">
            <input
              type="email"
              id="form1Example1"
              className="form-control"
              autoComplete="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label className="form-label" htmlFor="form1Example1">
              Email address
            </label>
          </div>
          {/* Password input */}
          <div className="form-outline mb-4">
            <input
              type="password"
              id="form1Example2"
              className="form-control"
              autoComplete="current-password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label className="form-label" htmlFor="form1Example2">
              Password
            </label>
          </div>
          {/* Remember me and Forgot password */}
          <div className="row mb-4">
            <div className="col d-flex justify-content-center">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="form1Example3"
                />
                <label className="form-check-label" htmlFor="form1Example3">
                  Remember me
                </label>
              </div>
            </div>
            <div className="col text-end">
              <a href="#!">Forgot password?</a>
            </div>
          </div>
          {/* Submit button */}
          <button
            type="submit"
            className="btn btn-primary btn-block w-100"
          >
            Sign in
          </button>
          {/* Register link */}
          <p className="text-center mt-3">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-decoration-none">Register</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
