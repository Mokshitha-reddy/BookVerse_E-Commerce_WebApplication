import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/admindashboard.css";

const AdminDashboard = () => {
  const [books, setBooks] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://https://bookverse-api-xnxe.onrender.com/books")
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("http://https://bookverse-api-xnxe.onrender.com/orders")
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("http://https://bookverse-api-xnxe.onrender.com/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Calculate total revenue
  const totalRevenue = orders.reduce((total, order) => {
    return total + Number(order.total || 0);
  }, 0);

  return (
    <div className="admin-dashboard">

      <h1>🛠️ Admin Dashboard</h1>

      <p className="admin-welcome">
        Welcome to BookVerse Admin Panel
      </p>

      {/* Statistics */}

      <div className="admin-cards">

        <div className="admin-card">
          <h2>📚</h2>
          <h3>Total Books</h3>
          <p>{books.length}</p>
        </div>

        <div className="admin-card">
          <h2>📦</h2>
          <h3>Total Orders</h3>
          <p>{orders.length}</p>
        </div>

        <div className="admin-card">
          <h2>👥</h2>
          <h3>Total Users</h3>
          <p>{users.length}</p>
        </div>

        <div className="admin-card">
          <h2>💰</h2>
          <h3>Total Revenue</h3>
          <p>₹{totalRevenue}</p>
        </div>

      </div>

      {/* Admin Navigation */}

      <div className="admin-navigation">

        <h2>Admin Management</h2>

        <div className="admin-links">

          <Link to="/admin/books">
            📚 Manage Books
          </Link>

          <Link to="/admin/orders">
            📦 Manage Orders
          </Link>

          <Link to="/admin/users">
            👥 Manage Users
          </Link>

        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;