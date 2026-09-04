import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/login.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleAdminLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter admin email and password");
      return;
    }

    // Admin credentials
    if (
      email === "admin@gmail.com" &&
      password === "admin123"
    ) {
      localStorage.setItem("isAdmin", "true");
      localStorage.setItem("isLoggedIn", "true");

      alert("Admin login successful!");

      navigate("/admin");
    } else {
      alert("Invalid admin email or password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">

        <h2>Admin Login 📚</h2>

        <p>Login to your BookVerse Admin Panel</p>

        <form onSubmit={handleAdminLogin}>

          <label>Admin Email</label>

          <input
            type="email"
            placeholder="Enter admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Admin Password</label>

          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">
            Admin Login
          </button>

        </form>

        <p className="signup-text">
          Are you a user?{" "}
          <Link to="/login">User Login</Link>
        </p>

      </div>
    </div>
  );
};

export default AdminLogin;