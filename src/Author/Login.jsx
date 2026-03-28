import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginData } from '../App'

const Login = () => {

  const [details, setDetails] = useState({ email: "", password: "" })
  const [users, setUsers] = useState([]) // optional (for testing)

  const { setLogin } = useContext(loginData)
  const navigate = useNavigate()

  // ✅ OPTIONAL: Fetch users (for testing only)
  useEffect(() => {
    axios.get("https://quillhub-backend-latest-2.onrender.com/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err))
  }, [])

  // ✅ Handle input change (trim to avoid space issues)
  const changeData = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value.trim()
    })
  }

  // ✅ LOGIN
  const submitHandler = (e) => {
    e.preventDefault()

    axios.post("https://quillhub-backend-latest-2.onrender.com/users/login", details)
      .then((res) => {

        const user = res.data

        // ✅ Set global login state
        setLogin({ status: true, user })

        // ✅ SAVE USER (IMPORTANT FIX)
        localStorage.setItem("user", JSON.stringify(user))

        // ✅ Role-based navigation
        if (user.role === "admin") {
          navigate("/admin/dashboard")
        } else if (user.role === "author") {
          navigate("/author/dashboard")
        } else {
          navigate("/all-blogs")
        }

      })
      .catch(() => {
        alert("Invalid Credentials")
      })
  }

  return (
    <section className='container p-5'>
      <div className="col-lg-6 shadow mx-auto p-5">

        <h2 className='text-center text-primary'>Welcome back!</h2>

        <form onSubmit={submitHandler}>

          <input
            type="email"
            name="email"
            placeholder='Email Address'
            className='form-control mb-3'
            onChange={changeData}
            required
          />

          <input
            type="password"
            name="password"
            placeholder='Password'
            className='form-control mb-3'
            onChange={changeData}
            required
          />

          <input
            type="submit"
            value="Login"
            className='form-control text-bg-primary'
          />

        </form>

        <p className="mt-3 text-center">
          Don't have an account?{" "}
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>

        {/* ✅ OPTIONAL: show users (for testing only) */}
        {/* 
        <div>
          <h4>All Users</h4>
          {users.map(u => (
            <p key={u.id}>{u.name} - {u.role}</p>
          ))}
        </div>
        */}

      </div>
    </section>
  )
}

export default Login