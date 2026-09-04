import React from "react";
import "../styles/profile.css"
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    alert("Logged out successfully");
    navigate("/login");
  };

  return (
    <div className="profile-container">

      <h2>My Profile 👤</h2>

      {user ? (
        <div className="profile-card">

          <h3>Welcome, {user.name}!</h3>

          <p>
            <strong>Name:</strong> {user.name}
          </p>

          <p>
            <strong>Email:</strong> {user.email}
          </p>

          <button onClick={() => navigate("/orders")}>
            My Orders
          </button>

          <button onClick={() => navigate("/wishlist")}>
            My Wishlist
          </button>

          <button onClick={() => navigate("/cart")}>
            My Cart
          </button>

          <button onClick={() => navigate("/address")}>
          📍 My Addresses
          </button>

          <button onClick={handleLogout}>
            Logout
          </button>



        </div>
      ) : (
        <div>
          <p>Please login to view your profile.</p>

          <button onClick={() => navigate("/login")}>
            Login
          </button>

          <button onClick={() => navigate("/orders")}>
  My Orders
</button>
        </div>
      )}

    </div>
  );
};

export default Profile;