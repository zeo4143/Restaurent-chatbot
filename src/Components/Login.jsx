import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { AiFillApple } from "react-icons/ai";
import { useUserAuth } from "../Context/UserAuthCOntextProvider";
import welcomeGif from "../assets/HomePage.gif";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { Login, GsignIn, user } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await Login(email, password);
      localStorage.setItem("user", user);
      navigate("/");
    } catch (err) {
      setError(err);
      console.log(error);
      alert("Something Went Wrong Make Sure your credentials are correct");
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await GsignIn();
      navigate("/");
    } catch (err) {
      alert("Something Went Wrong");
    }
  };

  return (
    <div className="container">
      <div className="logoContainer">
        <center>
          <h1>Tony</h1>
          <p>
            <small>The Virtual Assistant</small>
          </p>
        </center>
        <img src={welcomeGif} style={{ width: "200px" }} />
      </div>

      <div className="authContainer">
        <section className="auth">
          <div>
            <h1>Sign In</h1>
            <p>Sign in to your account</p>
          </div>

          <div className="authLogos">
            <button className="authBtn" onClick={handleClick}>
              <FcGoogle />
              Sign In with Google
            </button>
            <button className="authBtn">
              <AiFillApple />
              Sign In with Apple
            </button>
          </div>

          <form className="form" onSubmit={handleSubmit}>
            <div className="input-field">
              <input
                required
                className="input"
                type="email"
                name="email"
                autoComplete="off"
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="password" className="input-label">
                Password
              </label>
              <small style={{ marginLeft: "0.5rem" }}>
                <Link>Forgot Password</Link>
              </small>
            </div>

            <center className="submit">
              <input type="submit" value="Log In" className="submitButton" />
              <br />
              <small>
                Don't have an account?{" "}
                <Link to="/SignUp" style={{ fontWeight: "bold" }}>
                  Register here
                </Link>
              </small>
            </center>
          </form>
        </section>
      </div>
    </div>
  );
}
