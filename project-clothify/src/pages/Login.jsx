import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css"


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

 const handleLogin = (e) => {
  e.preventDefault();

  if (!email || !password) {
    alert("Please enter email and password");
    return;
  }

  const savedUser = JSON.parse(localStorage.getItem("user"));

  if (!savedUser) {
    alert("No account found. Please register first.");
    return;
  }

  if (
    email === savedUser.email &&
    password === savedUser.password
  ) {
    localStorage.setItem("isLoggedIn", "true");

    alert("Login successful!");

    navigate("/");
  } else {
    alert("Invalid email or password");
  }
};
  return (
    <div className="login-container">
      <div className="login-box">

        <h2>Welcome Back 📚</h2>
        <p>Login to your BookVerse account</p>

        <form onSubmit={handleLogin}>

          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">
            Login
          </button>

        </form>

        <p className="signup-text">
  Don't have an account?{" "}
  <Link to="/register">Create Account</Link>
</p>

      </div>
    </div>
  );
};

export default Login;
