import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/wishlist.css";

import {
  removeFromWishlist,
} from "../redux/slices/wishlistSlice";

import {
  addToCart,
} from "../redux/slices/cartSlice";

const Wishlist = () => {

  const dispatch = useDispatch();

  // Get wishlist directly from Redux
  const wishlist = useSelector(
    (state) => state.wishlist.items
  );

  return (
    <div className="wishlist">

      <h1>❤️ My Wishlist</h1>

      {wishlist.length === 0 ? (

        <div>
          <h2>
            Your wishlist is empty.
          </h2>

          <p>
            Add some books to your wishlist ❤️
          </p>
        </div>

      ) : (

        <div className="wishlist-container">

          {wishlist.map((book) => (

            <div
              className="wishlist-item"
              key={book.id}
            >

              <img
                src={book.image}
                alt={book.title}
              />

              <h2>
                {book.title}
              </h2>

              <p>
                Author: {book.author}
              </p>

              <p>
                Price: ₹{book.price}
              </p>

              <p>
                ⭐ {book.rating}
              </p>

              <button
                onClick={() =>
                  dispatch(addToCart(book))
                }
              >
                🛒 Add to Cart
              </button>

              <button
                onClick={() =>
                  dispatch(
                    removeFromWishlist(book.id)
                  )
                }
              >
                ❌ Remove
              </button>

            </div>

          ))}

        </div>

      )}

    </div>
  );
};

export default Wishlist;