import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "../styles/cart.css";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faMinus,
  faPlus,
  faTrash,
  faCreditCard,
  faBookOpen,
} from "@fortawesome/free-solid-svg-icons";

import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../redux/slices/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get cart directly from Redux
  const cart = useSelector((state) => state.cart.items);

  // =========================
  // TOTAL PRICE
  // =========================

  const totalPrice = cart.reduce(
    (total, item) => {
      const price = Number(item.price) || 0;
      const quantity = Number(item.quantity) || 1;

      return total + price * quantity;
    },
    0
  );

  // =========================
  // TOTAL ITEMS
  // =========================

  const totalItems = cart.reduce(
    (total, item) =>
      total + Number(item.quantity || 1),
    0
  );

  return (
    <div className="cart">

      {/* CART HEADING */}

      <h1>
        <FontAwesomeIcon icon={faCartShopping} />{" "}
        My Cart
      </h1>

      {/* EMPTY CART */}

      {cart.length === 0 ? (

        <div className="empty-cart">

          <div className="empty-cart-icon">
            <FontAwesomeIcon icon={faCartShopping} />
          </div>

          <h2>
            Your cart is empty.
          </h2>

          <p>
            Add some books to your cart.
          </p>

          <button
            onClick={() => navigate("/Books")}
          >
            <FontAwesomeIcon icon={faBookOpen} />{" "}
            Browse Books
          </button>

        </div>

      ) : (

        <div className="cart-container">

          {/* CART ITEMS */}

          <div className="cart-items">

            {cart.map((item) => (

              <div
                className="cart-item"
                key={item.id}
              >

                {/* Book Image */}

                <img
                  src={item.image}
                  alt={item.title}
                />

                {/* Book Information */}

                <div className="cart-item-details">

                  <h2>
                    {item.title}
                  </h2>

                  {item.author && (
                    <p className="cart-author">
                      By {item.author}
                    </p>
                  )}

                  {/* Price */}

                  <p className="cart-price">
                    Price: ₹
                    {Number(item.price || 0).toFixed(2)}
                  </p>

                  {/* Quantity */}

                  <div className="quantity">

                    <button
                      onClick={() =>
                        dispatch(
                          decreaseQuantity(item.id)
                        )
                      }
                      aria-label="Decrease quantity"
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </button>

                    <span>
                      {item.quantity || 1}
                    </span>

                    <button
                      onClick={() =>
                        dispatch(
                          increaseQuantity(item.id)
                        )
                      }
                      aria-label="Increase quantity"
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>

                  </div>

                  {/* Subtotal */}

                  <p className="cart-subtotal">
                    Subtotal: ₹
                    {(
                      Number(item.price || 0) *
                      Number(item.quantity || 1)
                    ).toFixed(2)}
                  </p>

                  {/* Remove */}

                  <button
                    className="remove-btn"
                    onClick={() =>
                      dispatch(
                        removeFromCart(item.id)
                      )
                    }
                  >
                    <FontAwesomeIcon icon={faTrash} />{" "}
                    Remove
                  </button>

                </div>

              </div>

            ))}

          </div>

          {/* CART SUMMARY */}

          <div className="cart-summary">

            <h2>
              Order Summary
            </h2>

            <div className="summary-line">

              <span>
                Items
              </span>

              <span>
                {totalItems}
              </span>

            </div>

            <div className="summary-line total-line">

              <span>
                Total
              </span>

              <strong>
                ₹{totalPrice.toFixed(2)}
              </strong>

            </div>

            <button
              className="checkout-btn"
              onClick={() => navigate("/Checkout")}
            >
              <FontAwesomeIcon icon={faCreditCard} />{" "}
              Proceed to Checkout
            </button>

          </div>

        </div>

      )}

    </div>
  );
};

export default Cart;