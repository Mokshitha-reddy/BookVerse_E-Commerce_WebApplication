import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";

const Login = () => {
  const [showUserLogin, setShowUserLogin] = useState(false);

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
      localStorage.setItem("isAdmin", "false");

      alert("Login successful!");
      navigate("/");
    } else {
      alert("Invalid email or password");
    }
  };

  // Show User Login Form
  if (showUserLogin) {
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
              User Login
            </button>

          </form>

          <p className="signup-text">
            Don't have an account?{" "}
            <Link to="/register">Create Account</Link>
          </p>

          <button
            className="back-login-btn"
            onClick={() => setShowUserLogin(false)}
          >
            ← Back
          </button>

        </div>
      </div>
    );
  }

  // Initial screen - User/Admin side by side
  return (
    <div className="login-container">
      <div className="login-box">

        <h2>Welcome to BookVerse 📚</h2>

        <p>Choose your login type</p>

        <div className="login-choice">

          <div className="choice-card">
            <div className="choice-icon">👤</div>

            <h3>User Login</h3>

            <p>
              Login to browse books, manage your
              cart, wishlist and orders.
            </p>

            <button onClick={() => setShowUserLogin(true)}>
              User Login
            </button>
          </div>

          <div className="choice-card">
            <div className="choice-icon">👑</div>

            <h3>Admin Login</h3>

            <p>
              Login to manage books, orders and
              users.
            </p>

            <button onClick={() => navigate("/admin-login")}>
              Admin Login
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Login;