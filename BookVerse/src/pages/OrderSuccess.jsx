import React from "react";
import { Link } from "react-router-dom";
import "../styles/ordersuccess.css";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faBoxOpen,
  faBox,
  faBookOpen,
} from "@fortawesome/free-solid-svg-icons";

const OrderSuccess = () => {

  return (
    <div className="order-success-page">

      <div className="success-card">

        {/* Success Icon */}
        <div className="success-icon">
          <FontAwesomeIcon icon={faCircleCheck} />
        </div>

        <h1>
          Order Placed Successfully!
        </h1>

        <p className="success-message">
          Thank you for shopping with BookVerse.
        </p>

        <p className="delivery-message">
          <FontAwesomeIcon icon={faBoxOpen} />{" "}
          Your books will be delivered soon.
        </p>

        <div className="success-buttons">

          {/* View Orders */}
          <Link
            to="/orders"
            className="view-orders-btn"
          >
            <FontAwesomeIcon icon={faBox} />{" "}
            View My Orders
          </Link>

          {/* Continue Shopping */}
          <Link
            to="/books"
            className="continue-btn"
          >
            <FontAwesomeIcon icon={faBookOpen} />{" "}
            Continue Shopping
          </Link>

        </div>

      </div>

    </div>
  );
};

export default OrderSuccess;