import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    console.log("Saved Orders:", savedOrders);

    setOrders(savedOrders);
  }, []);

  return (
    <div className="orders-page">

      {/* HEADER */}
      <div className="orders-header">
        <h1>📦 My Orders</h1>

        <p>
          Track and manage all your BookVerse orders
        </p>
      </div>

      {/* NO ORDERS */}
      {orders.length === 0 ? (

        <div className="empty-orders">

          <div className="empty-icon">
            📚
          </div>

          <h2>No Orders Yet</h2>

          <p>
            You haven't placed any orders yet.
            Start exploring our books and find your
            next favorite book!
          </p>

          <Link
            to="/books"
            className="shop-books-btn"
          >
            🛍️ Shop Books
          </Link>

        </div>

      ) : (

        <div className="orders-container">

          {orders.map((order, index) => {

            // Calculate total again from books
            const calculatedTotal =
              order.items?.reduce(
                (sum, item) =>
                  sum +
                  Number(item.price || 0) *
                  Number(item.quantity || 1),
                0
              ) || 0;

            return (

              <div
                className="order-card"
                key={order.id || index}
              >

                {/* ORDER HEADER */}
                <div className="order-top">

                  <div>

                    <h2>
                      📦 Order #{order.id}
                    </h2>

                    <p className="order-date">
                      📅{" "}
                      {order.date
                        ? new Date(
                            order.date
                          ).toLocaleDateString()
                        : "Date unavailable"}
                    </p>

                  </div>

                  <span className="order-status">
                    ✓ {order.status || "Order Placed"}
                  </span>

                </div>

                <div className="order-divider"></div>

                {/* BOOKS */}
                <div className="ordered-books">

                  {order.items &&
                  order.items.length > 0 ? (

                    order.items.map(
                      (book, bookIndex) => (

                        <div
                          className="ordered-book"
                          key={
                            book.id ||
                            bookIndex
                          }
                        >

                          {/* IMAGE */}
                          <img
                            src={book.image}
                            alt={book.title}
                            className="ordered-book-image"
                          />

                          {/* DETAILS */}
                          <div className="ordered-book-info">

                            <h3>
                              {book.title}
                            </h3>

                            <p>
                              <strong>
                                Author:
                              </strong>{" "}
                              {book.author ||
                                "Unknown"}
                            </p>

                            <p>
                              <strong>
                                Price:
                              </strong>{" "}
                              ₹
                              {Number(
                                book.price || 0
                              ).toFixed(2)}
                            </p>

                            <p>
                              <strong>
                                Quantity:
                              </strong>{" "}
                              {book.quantity || 1}
                            </p>

                          </div>

                          {/* ITEM TOTAL */}
                          <div className="book-total">

                            ₹
                            {(
                              Number(
                                book.price || 0
                              ) *
                              Number(
                                book.quantity || 1
                              )
                            ).toFixed(2)}

                          </div>

                        </div>

                      )
                    )

                  ) : (

                    <div className="no-books">

                      <p>
                        📚 No book details
                        available.
                      </p>

                    </div>

                  )}

                </div>

                {/* ORDER FOOTER */}
                <div className="order-bottom">

                  <div className="order-total">

                    <span>
                      Order Total
                    </span>

                    <strong>
                      ₹
                      {Number(
                        order.total ||
                        calculatedTotal
                      ).toFixed(2)}
                    </strong>

                  </div>

                  <Link
                    to="/books"
                    className="continue-shopping"
                  >
                    🛍️ Continue Shopping
                  </Link>

                </div>

              </div>

            );
          })}

        </div>

      )}

    </div>
  );
};

export default Orders;