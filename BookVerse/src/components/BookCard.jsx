import React from 'react'
import { Link } from "react-router-dom";
import "../styles/bookcard.css"

const BookCard = ({ book }) => {
  return (
    <div className="book-card">

      <img
        src={book.image}
        alt={book.title}
      />

      <h3>{book.title}</h3>

      <p className="author">
        By {book.author}
      </p>

      <p className="rating">
        ⭐ {book.rating}
      </p>

      <div className="price">
        <span>₹{book.price}</span>
        <del>₹{book.oldPrice}</del>
      </div>

      <Link to={`/book/${book.id}`}>
        <button>View Details</button>
      </Link>

    </div>
  );
};

export default BookCard;