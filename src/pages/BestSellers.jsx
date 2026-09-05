import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/bestsellers.css";

const BestSellers = () => {

  const [books, setBooks] = useState([]);

  useEffect(() => {

    axios
      .get("http://localhost:3001/books")
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

  }, []);

  // Sort books by rating
  const bestBooks = [...books]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  return (
    <div className="bestsellers-page">

      <div className="bestsellers-header">

        <h1>🏆 Best Sellers</h1>

        <p>
          Discover the books loved by our readers
        </p>

      </div>

      <div className="bestsellers-grid">

        {bestBooks.map((book) => (

          <div
            className="bestseller-card"
            key={book.id}
          >

            <Link to={`/book/${book.id}`}>

              <img
                src={book.image}
                alt={book.title}
              />

            </Link>

            <div className="bestseller-info">

              <h2>{book.title}</h2>

              <p className="author">
                by {book.author}
              </p>

              <p className="rating">
                ⭐ {book.rating}
              </p>

              <p className="price">
                ₹{book.price}
              </p>

              <Link
                to={`/book/${book.id}`}
                className="view-book"
              >
                View Book
              </Link>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default BestSellers;