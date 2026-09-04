import React, { useEffect, useState } from "react";
import "../styles/books.css";
import axios from "axios";
import BookCard from "../components/BookCard";
// import SearchBar from "../components/SearchBar";

const Books = () => {
  const [Books, setBooks] = useState([]);
  const [Search, setSearch] = useState("");
  const [Category, setCategory] = useState("All");

  useEffect(() => {
    axios
      .get("http://https://bookverse-api-xnxe.onrender.com/books")
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const filteredBooks = Books.filter((book) => {
    const matchesSearch = (book.title || "")
      .toLowerCase()
      .includes(Search.toLowerCase());

    const matchesCategory =
      Category === "All" || book.category === Category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="books-page">

      <div className="books-heading">
        <h1>Explore Our Books</h1>

        <p>
          Discover your next favorite book from our collection.
        </p>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search books..."
          value={Search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button onClick={() => setSearch(Search)}>
          Search
        </button>
      </div>

      <div className="category-filter">

        <button onClick={() => setCategory("All")}>
          All
        </button>

        <button onClick={() => setCategory("Fiction")}>
          Fiction
        </button>

        <button onClick={() => setCategory("Self Help")}>
          Self Help
        </button>

        <button onClick={() => setCategory("Business")}>
          Business
        </button>

        <button onClick={() => setCategory("Finance")}>
          Finance
        </button>

        <button onClick={() => setCategory("Fantasy")}>
          Fantasy
        </button>

      </div>

      <div className="books-container">

        {filteredBooks.map((book) => (
          <BookCard
            key={book.id}
            book={book}
          />
        ))}

      </div>

      {filteredBooks.length === 0 && (
        <p className="no-books">
          No books found.
        </p>
      )}

    </div>
  );
};

export default Books;