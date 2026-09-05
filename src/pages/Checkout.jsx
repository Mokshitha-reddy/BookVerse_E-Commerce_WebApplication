import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "../styles/checkout.css";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCreditCard,
  faLocationDot,
  faPhone,
  faPlus,
  faCheck,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";

// Redux
import { clearCart } from "../redux/slices/cartSlice";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get cart directly from Redux
  const cart = useSelector((state) => state.cart.items);

  const [addresses] = useState(
    JSON.parse(localStorage.getItem("addresses")) || []
  );

  const [selectedAddress, setSelectedAddress] = useState(null);

  // =========================
  // CALCULATE TOTAL
  // =========================

  const totalPrice = cart.reduce((total, item) => {
    const price = Number(item.price) || 0;
    const quantity = Number(item.quantity) || 1;

    return total + price * quantity;
  }, 0);

  // =========================
  // PLACE ORDER
  // =========================

  const handleOrder = (e) => {
    e.preventDefault();

    // Check cart
    if (!cart || cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    // Check address
    if (!selectedAddress) {
      alert("Please select a delivery address!");
      return;
    }

    // Get existing orders
    const existingOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    // Copy cart items before clearing
    const orderItems = cart.map((item) => ({
      id: item.id,
      title: item.title,
      author: item.author,
      price: Number(item.price) || 0,
      image: item.image,
      quantity: Number(item.quantity) || 1,
    }));

    // Create order
    const newOrder = {
      id: Date.now(),
      items: orderItems,
      total: totalPrice,
      date: new Date().toISOString(),
      status: "Order Placed",
      address: selectedAddress,
    };

    // Save order
    const updatedOrders = [
      ...existingOrders,
      newOrder,
    ];

    localStorage.setItem(
      "orders",
      JSON.stringify(updatedOrders)
    );

    // Clear Redux cart
    dispatch(clearCart());

    // Also remove old localStorage cart
    localStorage.removeItem("cart");

    // Go to Order Success
    navigate("/OrderSuccess");
  };

  // =========================
  // EMPTY CART
  // =========================

  if (cart.length === 0) {
    return (
      <div className="checkout-page">

        <h1>
          <FontAwesomeIcon icon={faCreditCard} /> Checkout
        </h1>

        <div className="checkout-container">

          <div className="customer-details">

            <h2>
              Your cart is empty.
            </h2>

            <button
              type="button"
              onClick={() => navigate("/Books")}
            >
              <FontAwesomeIcon icon={faBookOpen} />{" "}
              Continue Shopping
            </button>

          </div>

        </div>

      </div>
    );
  }

  return (
    <div className="checkout-page">

      <h1>
        <FontAwesomeIcon icon={faCreditCard} /> Checkout
      </h1>

      <div className="checkout-container">

        {/* ========================= */}
        {/* DELIVERY ADDRESS */}
        {/* ========================= */}

        <div className="customer-details">

          <h2>
            <FontAwesomeIcon icon={faLocationDot} />{" "}
            Delivery Address
          </h2>

          {addresses.length === 0 ? (

            <div>

              <p>
                You don't have any saved addresses.
              </p>

              <button
                type="button"
                onClick={() => navigate("/address")}
              >
                <FontAwesomeIcon icon={faPlus} />{" "}
                Add Address
              </button>

            </div>

          ) : (

            <form onSubmit={handleOrder}>

              {addresses.map((item) => (

                <div
                  className="address-option"
                  key={item.id}
                >

                  <label>

                    <input
                      type="radio"
                      name="address"
                      value={item.id}
                      checked={
                        selectedAddress?.id === item.id
                      }
                      onChange={() =>
                        setSelectedAddress(item)
                      }
                    />

                    <div className="checkout-address">

                      <h3>
                        {item.name}
                      </h3>

                      <p>
                        <FontAwesomeIcon icon={faPhone} />{" "}
                        {item.phone}
                      </p>

                      <p>
                        {item.address}
                      </p>

                      <p>
                        {item.city}, {item.state} -{" "}
                        {item.pincode}
                      </p>

                    </div>

                  </label>

                </div>

              ))}

              {/* Add Address */}

              <button
                type="button"
                onClick={() => navigate("/address")}
              >
                <FontAwesomeIcon icon={faPlus} />{" "}
                Add New Address
              </button>

              {/* Place Order */}

              <button
                type="submit"
                className="place-order-btn"
              >
                <FontAwesomeIcon icon={faCheck} />{" "}
                Place Order
              </button>

            </form>

          )}

        </div>

        {/* ========================= */}
        {/* ORDER SUMMARY */}
        {/* ========================= */}

        <div className="order-summary">

          <h2>
            <FontAwesomeIcon icon={faCartShopping} />{" "}
            Order Summary
          </h2>

          {cart.map((item) => (

            <div
              className="checkout-item"
              key={item.id}
            >

              <img
                src={item.image}
                alt={item.title}
              />

              <div>

                <h3>
                  {item.title}
                </h3>

                <p>
                  ₹{Number(item.price || 0).toFixed(2)}
                  {" × "}
                  {Number(item.quantity || 1)}
                </p>

                <p>
                  Subtotal: ₹
                  {(
                    Number(item.price || 0) *
                    Number(item.quantity || 1)
                  ).toFixed(2)}
                </p>

              </div>

            </div>

          ))}

          <hr />

          <h2>
            Total: ₹{totalPrice.toFixed(2)}
          </h2>

        </div>

      </div>

    </div>
  );
};

export default Checkout;