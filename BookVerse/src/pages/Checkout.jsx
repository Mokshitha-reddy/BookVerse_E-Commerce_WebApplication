import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

const Checkout = ({ cart = [], setCart }) => {
  const navigate = useNavigate();

  const [addresses] = useState(
    JSON.parse(localStorage.getItem("addresses")) || []
  );

  const [selectedAddress, setSelectedAddress] = useState(null);

  // =========================
  // CALCULATE TOTAL
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

    // Create COPY of cart items
    // before clearing the cart
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

    // Add new order
    const updatedOrders = [
      ...existingOrders,
      newOrder,
    ];

    // Save orders
    localStorage.setItem(
      "orders",
      JSON.stringify(updatedOrders)
    );

    // Clear cart AFTER saving order
    setCart([]);

    localStorage.removeItem("cart");

    // Go to success page
    navigate("/OrderSuccess");
  };

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

          {cart.length === 0 ? (

            <p>
              Your cart is empty.
            </p>

          ) : (

            cart.map((item) => (

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
                    ₹{Number(item.price).toFixed(2)}
                    {" × "}
                    {item.quantity || 1}
                  </p>

                  <p>
                    Subtotal: ₹
                    {(
                      Number(item.price) *
                      Number(item.quantity || 1)
                    ).toFixed(2)}
                  </p>

                </div>

              </div>

            ))

          )}

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