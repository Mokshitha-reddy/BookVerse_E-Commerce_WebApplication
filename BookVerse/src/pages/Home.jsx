import React from "react";
import "../styles/home.css";
import logobooks from "../assets/images/logobooks.png"
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">

      {/* ================= HERO SECTION ================= */}

      <section className="hero">

        <div className="hero-content">

          <span className="hero-small-text">
            📚 Welcome to BookVerse
          </span>

          <h1>
            Find Your Next
            <br />
            <span>Favorite Book</span>
          </h1>

          <p>
            Discover amazing books from different genres
            and find your perfect read.
          </p>

          <div className="hero-buttons">

            <Link to="/Books">
              <button className="shop-btn">
                Shop Now →
              </button>
            </Link>

            <Link to="/Categories">
              <button className="explore-btn">
                Explore Categories
              </button>
            </Link>

          </div>

        </div>

        {/* <div className="hero-image"> */}
          <div className="hero-book">
            <img src={logobooks} alt="" height={300} width={300} />
          </div>
        {/* </div> */}

      </section>


      {/* ================= POPULAR CATEGORIES ================= */}

      <section className="home-section">

        <div className="section-heading">

          <div>
            <h2>📚 Popular Categories</h2>

            <p className="section-text">
              Explore books from your favorite categories
            </p>
          </div>

          <Link to="/Categories">
            View All →
          </Link>

        </div>


        <div className="category-container">

          <Link
            to="/Books?category=Fiction"
            className="category-card"
          >
            <div className="category-icon">
              📖
            </div>

            <h3>Fiction</h3>

            <p>
              Amazing stories and novels
            </p>
          </Link>


          <Link
            to="/Books?category=Romance"
            className="category-card"
          >
            <div className="category-icon">
              ❤️
            </div>

            <h3>Romance</h3>

            <p>
              Stories of love and relationships
            </p>
          </Link>


          <Link
            to="/Books?category=Mystery"
            className="category-card"
          >
            <div className="category-icon">
              🔍
            </div>

            <h3>Mystery</h3>

            <p>
              Thrilling and mysterious stories
            </p>
          </Link>


          <Link
            to="/Books?category=Science Fiction"
            className="category-card"
          >
            <div className="category-icon">
              🚀
            </div>

            <h3>Science Fiction</h3>

            <p>
              Explore futuristic worlds
            </p>
          </Link>


          <Link
            to="/Books?category=Self Help"
            className="category-card"
          >
            <div className="category-icon">
              🧠
            </div>

            <h3>Self Help</h3>

            <p>
              Improve your life and habits
            </p>
          </Link>


          <Link
            to="/Books?category=Business"
            className="category-card"
          >
            <div className="category-icon">
              💼
            </div>

            <h3>Business</h3>

            <p>
              Business and entrepreneurship
            </p>
          </Link>

        </div>

      </section>


      {/* ================= BESTSELLERS ================= */}

      <section className="home-section">

        <div className="section-heading">

          <div>

            <h2>🏆 Bestsellers</h2>

            <p className="section-text">
              Books loved by thousands of readers
            </p>

          </div>

          <Link to="/BestSellers">
            View All →
          </Link>

        </div>


        <div className="book-placeholder">


          <Link
            to="/book/1"
            className="book-item"
          >

            <div className="book-icon">
              📕
            </div>

            <h3>
              Atomic Habits
            </h3>

            <p>
              James Clear
            </p>

            <p>
              ⭐ 4.7
            </p>

            <strong>
              ₹399
            </strong>

          </Link>


          <Link
            to="/book/2"
            className="book-item"
          >

            <div className="book-icon">
              📗
            </div>

            <h3>
              The Alchemist
            </h3>

            <p>
              Paulo Coelho
            </p>

            <p>
              ⭐ 4.6
            </p>

            <strong>
              ₹299
            </strong>

          </Link>


          <Link
            to="/book/3"
            className="book-item"
          >

            <div className="book-icon">
              📘
            </div>

            <h3>
              Rich Dad Poor Dad
            </h3>

            <p>
              Robert Kiyosaki
            </p>

            <p>
              ⭐ 4.5
            </p>

            <strong>
              ₹350
            </strong>

          </Link>


          <Link
            to="/book/4"
            className="book-item"
          >

            <div className="book-icon">
              📙
            </div>

            <h3>
              The Psychology of Money
            </h3>

            <p>
              Morgan Housel
            </p>

            <p>
              ⭐ 4.7
            </p>

            <strong>
              ₹450
            </strong>

          </Link>

        </div>

      </section>


      {/* ================= OFFERS ================= */}

      <section className="offer-section">

        <div className="offer-content">

          <span>
            🔥 Limited Time Offer
          </span>

          <h2>
            Special Offers
          </h2>

          <p>
            Get up to <strong>50% OFF</strong> on selected books.
          </p>

          <Link to="/Offers">
            <button>
              View Offers →
            </button>
          </Link>

        </div>


        <div className="offer-icon">
          🏷️
        </div>

      </section>

    </div>
  );
};

export default Home;