import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/offers.css";

const Offers = () => {

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    axios
      .get("http://localhost:3000/books")
      .then((response) => {

        console.log("BOOK DATA:", response.data);

        setBooks(response.data);
        setLoading(false);

      })
      .catch((error) => {

        console.log("ERROR:", error);
        setLoading(false);

      });

  }, []);


  if (loading) {
    return <h2>Loading offers...</h2>;
  }


  return (
    <div className="offers-page">

      {/* Header */}

      <div className="offers-header">

        <h1>🔥 Special Offers</h1>

        <p>
          Great books at amazing prices
        </p>

      </div>


      {/* Books */}

      <div className="offers-grid">

        {books.length === 0 ? (

          <h2>No books found</h2>

        ) : (

          books.map((book) => {

            const discount = Math.round(
              ((Number(book.oldPrice) - Number(book.price)) /
                Number(book.oldPrice)) * 100
            );

            return (

              <div
                className="offer-card"
                key={book.id}
              >

                {/* Discount */}

                <div className="discount-badge">
                  {discount}% OFF
                </div>


                {/* Image */}

                <Link to={`/book/${book.id}`}>

                  <img
                    src={book.image}
                    alt={book.title}
                  />

                </Link>


                {/* Book Information */}

                <div className="offer-info">

                  <h2>
                    {book.title}
                  </h2>

                  <p>
                    By {book.author}
                  </p>

                  <p>
                    ⭐ {book.rating}
                  </p>


                  <div className="offer-price">

                    <span className="new-price">
                      ₹{book.price}
                    </span>

                    <span className="old-price">
                      ₹{book.oldPrice}
                    </span>

                  </div>


                  <Link
                    to={`/book/${book.id}`}
                    className="offer-button"
                  >
                    View Offer
                  </Link>

                </div>

              </div>

            );

          })

        )}

      </div>

    </div>
  );
};

export default Offers;