import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/manageorders.css";

const ManageOrders = () => {

  const [orders, setOrders] = useState([]);

  const getOrders = () => {

    axios
      .get("http://https://bookverse-api-xnxe.onrender.com/orders")
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

  };

  useEffect(() => {
    getOrders();
  }, []);

  // Update order status

  const updateStatus = (id, status) => {

    axios
      .patch(`http://https://bookverse-api-xnxe.onrender.com/orders/${id}`, {
        status: status
      })
      .then(() => {

        alert("Order status updated!");

        getOrders();

      })
      .catch((error) => {
        console.log(error);
      });

  };

  return (
    <div className="manage-orders">

      <h1>📦 Manage Orders</h1>

      {orders.length === 0 ? (

        <p className="no-orders">
          No orders available.
        </p>

      ) : (

        <div className="orders-list">

          {orders.map((order) => (

            <div
              className="admin-order-card"
              key={order.id}
            >

              <h2>
                Order #{order.id}
              </h2>

              <p>
                <strong>Customer:</strong>{" "}
                {order.name || order.customerName || "Customer"}
              </p>

              <p>
                <strong>Total:</strong>{" "}
                ₹{order.total || 0}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {order.status || "Pending"}
              </p>

              <label>
                Change Status
              </label>

              <select
                value={order.status || "Pending"}
                onChange={(e) =>
                  updateStatus(
                    order.id,
                    e.target.value
                  )
                }
              >

                <option value="Pending">
                  Pending
                </option>

                <option value="Shipped">
                  Shipped
                </option>

                <option value="Delivered">
                  Delivered
                </option>

                <option value="Cancelled">
                  Cancelled
                </option>

              </select>

            </div>

          ))}

        </div>

      )}

    </div>
  );
};

export default ManageOrders;