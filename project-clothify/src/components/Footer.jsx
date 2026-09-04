import React from "react";
import { Link } from "react-router-dom";
import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* BOOKVERSE */}
        <div className="footer-section brand-section">

          <h2>📖 BOOKVERSE</h2>

          <p>
            Your favorite destination for discovering
            amazing books at great prices.
          </p>

          <p>
            Discover. Read. Enjoy. 📚
          </p>

        </div>


        {/* BOOKS */}
        <div className="footer-section">

          <h3>BOOKS</h3>

          <Link to="/Books">All Books</Link>
          <Link to="/NewArrivals">New Arrivals</Link>
          <Link to="/BestSellers">Best Sellers</Link>
          <Link to="/Offers">Offers</Link>
          <Link to="/categories">Categories</Link>

        </div>


        {/* USEFUL LINKS */}
        <div className="footer-section">

          <h3>USEFUL LINKS</h3>

          <Link to="/Home">Home</Link>
          <Link to="/Trending">Trending</Link>
          <Link to="/Wishlist">Wishlist</Link>
          <Link to="/Cart">Cart</Link>
          <Link to="/orders">My Orders</Link>

        </div>


        {/* CUSTOMER POLICIES */}
        <div className="footer-section">

          <h3>CUSTOMER POLICIES</h3>

          <Link to="/profile">My Profile</Link>
          <Link to="/orders">Track Orders</Link>
          <Link to="/address">My Address</Link>

          <a href="#">Contact Us</a>
          <a href="#">FAQ</a>

        </div>


        {/* CONTACT */}
        <div className="footer-section">

          <h3>CONTACT US</h3>

          <p>📧 bookverse@gmail.com</p>

          <p>📞 +91 98765 43210</p>

          <p>📍 Hyderabad, India</p>

        </div>

      </div>


      {/* App Section */}

      <div className="footer-app">

        <h3>EXPERIENCE BOOKVERSE APP</h3>

        <p>
          Shop your favorite books anytime, anywhere.
        </p>

        <div className="app-buttons">

          <button>
            ▶ Google Play
          </button>

          <button>
             App Store
          </button>

        </div>

      </div>


      {/* Social Media */}

      <div className="footer-social">

        <h3>KEEP IN TOUCH</h3>

        <div className="social-icons">

          <a href="#" target="_blank">
            Facebook
          </a>

          <a href="#" target="_blank">
            Twitter
          </a>

          <a href="#" target="_blank">
            YouTube
          </a>

          <a href="#" target="_blank">
            Instagram
          </a>

        </div>

      </div>


      

      

    </footer>
  );
};

export default Footer;