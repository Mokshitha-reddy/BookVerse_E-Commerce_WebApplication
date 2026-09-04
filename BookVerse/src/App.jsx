import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import Allroutes from "./Allroutes";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {

  // Get current location
  const location = useLocation();

  // Cart
  const [cart, setCart] = useState([]);

  // Wishlist
  const [wishlist, setWishlist] = useState([]);


  // Add book to Cart
  const addToCart = (book) => {

    setCart((previousCart) => {

      const existingBook = previousCart.find(
        (item) => item.id === book.id
      );

      if (existingBook) {

        return previousCart.map((item) =>
          item.id === book.id
            ? {
                ...item,
                quantity: item.quantity + 1
              }
            : item
        );

      }

      return [
        ...previousCart,
        {
          ...book,
          quantity: 1
        }
      ];

    });

  };


  // Add book to Wishlist
  const addToWishlist = (book) => {

    setWishlist((previousWishlist) => {

      const alreadyExists = previousWishlist.some(
        (item) => item.id === book.id
      );

      if (alreadyExists) {
        return previousWishlist;
      }

      return [
        ...previousWishlist,
        book
      ];

    });

  };


  // Check Login and Register pages
  const isAuthPage =
    location.pathname === "/Login" ||
    location.pathname === "/register";


  return (
    <div>

      {/* Navbar */}
      {!isAuthPage && (
        <Navbar
          cart={cart}
          wishlist={wishlist}
        />
      )}


      {/* All Routes */}
      <Allroutes
        cart={cart}
        setCart={setCart}
        addToCart={addToCart}
        wishlist={wishlist}
        setWishlist={setWishlist}
        addToWishlist={addToWishlist}
      />


      {/* Footer */}
      {!isAuthPage && <Footer />}

    </div>
  );
};

export default App;