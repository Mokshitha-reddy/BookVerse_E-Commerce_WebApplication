import React from "react";

const Wishlist = ({
  wishlist = [],
  setWishlist,
  addToCart,
}) => {

  // Remove from wishlist
  const removeFromWishlist = (id) => {
    setWishlist(
      wishlist.filter((item) => item.id !== id)
    );
  };

  return (
    <div className="wishlist">

      <h1>❤️ My Wishlist</h1>

      {wishlist.length === 0 ? (

        <h2>
          Your wishlist is empty.
        </h2>

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
                width="150"
              />

              <h2>{book.title}</h2>

              <p>
                Author: {book.author}
              </p>

              <p>
                Price: ₹{book.price}
              </p>

              <p>
                ⭐ {book.rating}
              </p>

              {/* Add to Cart */}
              <button
                onClick={() => addToCart(book)}
              >
                🛒 Add to Cart
              </button>

              {/* Remove */}
              <button
                onClick={() =>
                  removeFromWishlist(book.id)
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