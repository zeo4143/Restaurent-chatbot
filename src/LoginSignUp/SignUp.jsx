import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { AiFillApple } from "react-icons/ai";
import { useUserAuth } from "../Context/UserAuthCOntextProvider";
import welcomeGif from "../../src/assets/HomePage.gif";




export default function SignUp() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const {SignUp} = useUserAuth()
  const navigate = useNavigate()

  const handleSubmit =  (e) => {
    e.preventDefault()
    setError("")

    try {
      SignUp(email, password)
      alert("Successfully Registed")
      navigate("/login")
    } catch(err) {
      setError(err)
      alert("Something Went Wrong")
    }
}
  return (
    <div className="container">
      <section className="logoContainer">
        <center>
          <h1>Tony</h1>
          <p>
            <small>The Virtual Assistant</small>
          </p>
        </center>
        <img src={welcomeGif} style={{ width: "200px" }} />
      </section>

      <section className="authContainer">
        <div className="auth">
          <div>
            <h1>Sign Up</h1>
            <span>create an account</span>
          </div>

          <div className="authLogos">
            <button className="authBtn">
              <FcGoogle />
              SignUp with Google
            </button>
            <button className="authBtn">
              <AiFillApple />
              SignUp with Apple
            </button>
          </div>

          <form className="form" onSubmit={handleSubmit}>
            <div className="input-field">
              <input
                required
                className="input"
                type="text"
                name="Username"
                autoComplete="off"
                placeholder="Username"
              />
              <label htmlFor="Username" className="input-label">
                Username
              </label>
            </div>
            <div className="input-field">
              <input
                required
                className="input"
                type="email"
                name="email"
                autoComplete="off"
                placeholder="Email address"
                onChange={(e) => (setEmail(e.target.value))}
              />
              <label htmlFor="email" className="input-label">
                Email address
              </label>
            </div>
            <div className="input-field">
              <input
                required
                className="input"
                type="password"
                name="password"
                autoComplete="off"
                placeholder="Password"
                onChange={(e) => (setPassword(e.target.value))}

              />
              <label htmlFor="password" className="input-label">
                Password
              </label>
              <small style={{ marginLeft: "0.5rem" }}>
                Password should be atleast 8 Characters
              </small>
            </div>

            <center className="submit">
              <input
                className="submitButton"
                type="submit"
                value="Create Account"
              />
              <small>
                Already have an account?{" "}
                <Link to="/" style={{ fontWeight: "bold" }}>
                  Sign In
                </Link>
              </small>
            </center>
          </form>
        </div>
      </section>
    </div>
  );
}
