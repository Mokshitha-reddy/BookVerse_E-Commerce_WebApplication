import React from "react";

import Login from "./pages/Login";
import Home from "./pages/Home";
// import NewArrivals from "./pages/NewArrivals";
import Offers from "./pages/Offers";
import BestSellers from "./pages/BestSellers";
import BookDetails from "./pages/BookDetails";
import Books from "./pages/Books";
import Cart from "./pages/Cart";
import Categories from "./pages/Categories";
// import Trending from "./pages/Trending";
import Wishlist from "./pages/Wishlist";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import { Route, Routes } from "react-router-dom";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import Address from "./pages/Address";
import ProtectedRoute from "./pages/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import ManageBooks from "./pages/ManageBooks";
import ManageOrders from "./pages/ManageOrders";
import ManageUsers from "./pages/ManageUsers";
import BookFinder from "./pages/BookFinder";
import AdminLogin from "./pages/AdminLogin";
import AdminProtectedRoute from "./pages/AdminProtectedRoute";


const Allroutes = ({
  cart,
  setCart,
  addToCart,
  wishlist,
  setWishlist,
  addToWishlist,
}) => {

  return (

    <div>

      <Routes>

        {/* ================= HOME ================= */}
         <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />}/>
        <Route path="/Book-finder" element={<BookFinder />}/>


        {/* ================= AUTH ================= */}

        <Route
          path="/Login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        {/* ================= BOOKS ================= */}

        <Route
          path="/Books"
          element={<Books />}
        />

        <Route
          path="/Categories"
          element={<Categories />}
        />

        {/* <Route
          path="/NewArrivals"
          element={<NewArrivals />}
        /> */}

        <Route
          path="/Offers"
          element={<Offers />}
        />

        <Route
          path="/BestSellers"
          element={<BestSellers />}
        />

        <Route
          path="/book/:id"
          element={
            <BookDetails
              addToCart={addToCart}
              addToWishlist={addToWishlist}
            />
          }
        />


        {/* ================= CART ================= */}

        <Route
          path="/Cart"
          element={
            <Cart
              cart={cart}
              setCart={setCart}
            />
          }
        />


        {/* ================= WISHLIST ================= */}

        <Route
          path="/Wishlist"
          element={
            <Wishlist
              wishlist={wishlist}
              setWishlist={setWishlist}
              addToCart={addToCart}
            />
          }
        />


        {/* ================= CHECKOUT ================= */}

        <Route
          path="/Checkout"
          element={
            <ProtectedRoute>
              <Checkout
                cart={cart}
                setCart={setCart}
              />
            </ProtectedRoute>
          }
        />


        {/* ================= ORDER SUCCESS ================= */}

        <Route
  path="/OrderSuccess"
  element={
    <OrderSuccess
      cart={cart}
      setCart={setCart}
    />
  }
/>


        {/* ================= PROFILE ================= */}

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />


        {/* ================= ORDERS ================= */}

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />


        {/* ================= ADDRESS ================= */}

        <Route
          path="/address"
          element={
            <ProtectedRoute>
              <Address />
            </ProtectedRoute>
          }
        />


        {/* ================= ADMIN ================= */}

        <Route
  path="/admin"
  element={
    <AdminProtectedRoute>
      <AdminDashboard />
    </AdminProtectedRoute>
  }
/>

        <Route
          path="/admin/books"
          element={<ManageBooks />}
        />

        <Route
          path="/admin/orders"
          element={<ManageOrders />}
        />

        <Route
          path="/admin/users"
          element={<ManageUsers />}
        />
<Route path="/admin-login" element={<AdminLogin />} />
      </Routes>
      

    </div>

  );
};

export default Allroutes;