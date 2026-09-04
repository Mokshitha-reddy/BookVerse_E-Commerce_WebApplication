import React, { useEffect, useState } from "react";
import "../styles/bookdetails.css";

import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

// Redux
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import { addToWishlist } from "../redux/slices/wishlistSlice";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faBolt,
  faHeart,
  faTrash,
  faStar,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Review states
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);

  // Get book details
  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `https://bookverse-api-xnxe.onrender.com/books/${id}`
        );

        setBook(response.data);
        setError("");
      } catch (err) {
        console.error("Error fetching book:", err);
        setError("Unable to load book details.");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  // Load reviews from localStorage
  useEffect(() => {
    const savedReviews =
      JSON.parse(localStorage.getItem(`reviews-${id}`)) || [];

    setReviews(savedReviews);
  }, [id]);

  // Add to cart
  const handleAddToCart = () => {
    if (!book) return;

    dispatch(
      addToCart({
        ...book,
        quantity: 1,
      })
    );

    alert("Book added to cart!");
  };

  // Buy Now
  const handleBuyNow = () => {
    if (!book) return;

    dispatch(
      addToCart({
        ...book,
        quantity: 1,
      })
    );

    navigate("/Checkout");
  };

  // Add to wishlist
  const handleWishlist = () => {
    if (!book) return;

    dispatch(addToWishlist(book));

    alert("Book added to wishlist!");
  };

  // Add review
  const handleAddReview = () => {
    if (!reviewText.trim()) {
      alert("Please write a review.");
      return;
    }

    const newReview = {
      id: Date.now(),
      text: reviewText,
      rating: Number(reviewRating),
      user: "User",
      date: new Date().toLocaleDateString(),
    };

    const updatedReviews = [...reviews, newReview];

    setReviews(updatedReviews);

    localStorage.setItem(
      `reviews-${id}`,
      JSON.stringify(updatedReviews)
    );

    setReviewText("");
    setReviewRating(5);

    alert("Review added successfully!");
  };

  // Delete review
  const handleDeleteReview = (reviewId) => {
    const updatedReviews = reviews.filter(
      (review) => review.id !== reviewId
    );

    setReviews(updatedReviews);

    localStorage.setItem(
      `reviews-${id}`,
      JSON.stringify(updatedReviews)
    );
  };

  // Loading
  if (loading) {
    return (
      <div className="book-details-loading">
        <h2>Loading book details...</h2>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="book-details-error">
        <h2>{error}</h2>

        <button onClick={() => navigate("/Books")}>
          Back to Books
        </button>
      </div>
    );
  }

  // Book not found
  if (!book) {
    return (
      <div className="book-details-error">
        <h2>Book not found.</h2>

        <button onClick={() => navigate("/Books")}>
          Browse Books
        </button>
      </div>
    );
  }

  return (
    <div className="book-details">

      {/* ================= BOOK DETAILS ================= */}

      <div className="book-details-container">

        {/* Book Image */}
        <div className="book-image-section">
          <img
            src={book.image}
            alt={book.title}
            className="book-details-image"
          />
        </div>

        {/* Book Information */}
        <div className="book-info">

          <h1>{book.title}</h1>

          {book.author && (
            <p className="book-author">
              <FontAwesomeIcon icon={faUser} />
              {" "}By {book.author}
            </p>
          )}

          {/* Rating */}
          <div className="book-rating">
            <span>
              <FontAwesomeIcon
                icon={faStar}
                className="star-icon"
              />
              {" "}
              {book.rating || "N/A"}
            </span>

            {book.reviews && (
              <span>
                {" "}({book.reviews} reviews)
              </span>
            )}
          </div>

          {/* Category */}
          {book.category && (
            <p className="book-category">
              Category: <strong>{book.category}</strong>
            </p>
          )}

          {/* Price */}
          <div className="book-price">
            ₹{Number(book.price || 0).toFixed(2)}
          </div>

          {/* Description */}
          <div className="book-description">
            <h3>About This Book</h3>

            <p>
              {book.description ||
                "No description available for this book."}
            </p>
          </div>

          {/* Buttons */}
          <div className="book-actions">

            <button
              className="add-cart-btn"
              onClick={handleAddToCart}
            >
              <FontAwesomeIcon icon={faCartShopping} />
              {" "}Add to Cart
            </button>

            <button
              className="buy-now-btn"
              onClick={handleBuyNow}
            >
              <FontAwesomeIcon icon={faBolt} />
              {" "}Buy Now
            </button>

            <button
              className="wishlist-btn"
              onClick={handleWishlist}
            >
              <FontAwesomeIcon icon={faHeart} />
              {" "}Add to Wishlist
            </button>

          </div>

        </div>
      </div>

      {/* ================= REVIEWS ================= */}

      <div className="reviews-section">

        <h2>
          <FontAwesomeIcon icon={faStar} />
          {" "}Customer Reviews
        </h2>

        {/* Add Review */}

        <div className="add-review">

          <h3>Write a Review</h3>

          {/* Rating */}

          <div className="rating-input">

            <label>Rating:</label>

            <select
              value={reviewRating}
              onChange={(e) =>
                setReviewRating(Number(e.target.value))
              }
            >
              <option value="5">⭐⭐⭐⭐⭐ 5</option>
              <option value="4">⭐⭐⭐⭐ 4</option>
              <option value="3">⭐⭐⭐ 3</option>
              <option value="2">⭐⭐ 2</option>
              <option value="1">⭐ 1</option>
            </select>

          </div>

          {/* Review Text */}

          <textarea
            placeholder="Write your review here..."
            value={reviewText}
            onChange={(e) =>
              setReviewText(e.target.value)
            }
          />

          <button
            className="submit-review-btn"
            onClick={handleAddReview}
          >
            Submit Review
          </button>

        </div>

        {/* Existing Reviews */}

        <div className="reviews-list">

          {reviews.length === 0 ? (

            <div className="no-reviews">
              <p>
                No reviews yet. Be the first to review this book!
              </p>
            </div>

          ) : (

            reviews.map((review) => (

              <div
                className="review-card"
                key={review.id}
              >

                <div className="review-header">

                  <div className="review-user">

                    <FontAwesomeIcon icon={faUser} />

                    <strong>
                      {" "}{review.user}
                    </strong>

                  </div>

                  <span className="review-date">
                    {review.date}
                  </span>

                </div>

                {/* Review Rating */}

                <div className="review-rating">

                  {[1, 2, 3, 4, 5].map((star) => (

                    <FontAwesomeIcon
                      key={star}
                      icon={faStar}
                      className={
                        star <= review.rating
                          ? "filled-star"
                          : "empty-star"
                      }
                    />

                  ))}

                </div>

                {/* Review Text */}

                <p className="review-text">
                  {review.text}
                </p>

                {/* Delete */}

                <button
                  className="delete-review-btn"
                  onClick={() =>
                    handleDeleteReview(review.id)
                  }
                >
                  <FontAwesomeIcon icon={faTrash} />
                  {" "}Delete
                </button>

              </div>

            ))

          )}

        </div>

      </div>

    </div>
  );
};

export default BookDetails;