import React from "react";
import "../styles/nav.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faCartShopping,
  faUser,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { logout } from "../redux/slices/authSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get data directly from Redux
  const cart = useSelector((state) => state.cart.items);
  const wishlist = useSelector((state) => state.wishlist.items);
  const isLoggedIn = useSelector(
    (state) => state.auth.isLoggedIn
  );

  // Cart quantity
  const cartCount = cart.reduce(
    (total, item) => total + Number(item.quantity || 1),
    0
  );

  // Wishlist count
  const wishlistCount = wishlist.length;

  const handleLogout = () => {
    dispatch(logout());

    alert("Logged out successfully!");

    navigate("/Login");
  };

  return (
    <nav>

      {/* Logo */}
      <div className="nav-logo">
        📖 BookVerse
      </div>

      {/* Navigation Links */}
      <div className="nav-link">

        <Link to="/Home">
          Home
        </Link>

        <Link to="/Categories">
          Categories
        </Link>

        <Link to="/Books">
          Books
        </Link>

        <Link to="/BestSellers">
          Best Sellers
        </Link>

        <Link to="/Offers">
          Offers
        </Link>

        <Link to="/book-finder">
          ✨ Find My Next Book
        </Link>

      </div>

      {/* Login / Register / Profile */}
      <div className="nav-btn">

        {!isLoggedIn ? (
          <>
            <Link to="/Login">
              <button>
                Login
              </button>
            </Link>

            <Link to="/register">
              <button>
                Register
              </button>
            </Link>
          </>
        ) : (
          <>

            {/* Profile */}
            <Link to="/profile">
              <FontAwesomeIcon icon={faUser} />
            </Link>

            {/* Cart */}
            <Link to="/Cart">
              <FontAwesomeIcon icon={faCartShopping} />
              {" "}({cartCount})
            </Link>

            {/* Wishlist */}
            <Link to="/Wishlist">
              <FontAwesomeIcon icon={faHeart} />
              {" "}({wishlistCount})
            </Link>

            {/* Logout */}
            <button onClick={handleLogout}>
              <FontAwesomeIcon icon={faRightFromBracket} />
              {" "}Logout
            </button>

          </>
        )}

      </div>

    </nav>
  );
};

export default Navbar;