import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/managebooks.css";

const ManageBooks = () => {

  const [books, setBooks] = useState([]);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  const [editId, setEditId] = useState(null);

  // Get books

  const getBooks = () => {

    axios
      .get("http://localhost:3000/books")
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

  };

  useEffect(() => {
    getBooks();
  }, []);

  // Add or Update Book

  const handleSubmit = (e) => {

    e.preventDefault();

    if (!title || !author || !price || !category || !image) {
      alert("Please fill all fields");
      return;
    }

    const bookData = {
      title: title,
      author: author,
      price: Number(price),
      category: category,
      image: image
    };

    // UPDATE

    if (editId !== null) {

      axios
        .put(
          `http://localhost:3000/books/${editId}`,
          bookData
        )
        .then(() => {

          alert("Book updated successfully!");

          clearForm();

          getBooks();

        })
        .catch((error) => {
          console.log(error);
        });

    }

    // ADD

    else {

      const newBook = {
        ...bookData,
        oldPrice: Number(price),
        rating: 0
      };

      axios
        .post(
          "http://localhost:3000/books",
          newBook
        )
        .then(() => {

          alert("Book added successfully!");

          clearForm();

          getBooks();

        })
        .catch((error) => {
          console.log(error);
        });

    }

  };

  // Edit Book

  const handleEdit = (book) => {

    setEditId(book.id);

    setTitle(book.title);
    setAuthor(book.author);
    setPrice(book.price);
    setCategory(book.category);
    setImage(book.image);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  };

  // Delete Book

  const handleDelete = (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );

    if (!confirmDelete) {
      return;
    }

    axios
      .delete(
        `http://localhost:3000/books/${id}`
      )
      .then(() => {

        alert("Book deleted successfully!");

        getBooks();

      })
      .catch((error) => {
        console.log(error);
      });

  };

  // Clear Form

  const clearForm = () => {

    setTitle("");
    setAuthor("");
    setPrice("");
    setCategory("");
    setImage("");
    setEditId(null);

  };

  return (
    <div className="manage-books">

      <h1>📚 Manage Books</h1>

      {/* ADD / EDIT FORM */}

      <div className="add-book">

        <h2>
          {editId !== null
            ? "✏️ Edit Book"
            : "➕ Add New Book"}
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Book Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Author"
            value={author}
            onChange={(e) =>
              setAuthor(e.target.value)
            }
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={(e) =>
              setImage(e.target.value)
            }
          />

          <button type="submit">

            {editId !== null
              ? "Update Book"
              : "Add Book"}

          </button>

          {editId !== null && (

            <button
              type="button"
              className="cancel-button"
              onClick={clearForm}
            >
              Cancel
            </button>

          )}

        </form>

      </div>

      {/* BOOK LIST */}

      <h2 className="book-list-title">
        📖 All Books
      </h2>

      <div className="books-list">

        {books.map((book) => (

          <div
            className="admin-book-card"
            key={book.id}
          >

            <img
              src={book.image}
              alt={book.title}
            />

            <div className="admin-book-info">

              <h3>{book.title}</h3>

              <p>
                Author: {book.author}
              </p>

              <p>
                Category: {book.category}
              </p>

              <p>
                Price: ₹{book.price}
              </p>

              <div className="book-actions">

                <button
                  className="edit-book"
                  onClick={() =>
                    handleEdit(book)
                  }
                >
                  ✏️ Edit
                </button>

                <button
                  className="delete-book"
                  onClick={() =>
                    handleDelete(book.id)
                  }
                >
                  🗑️ Delete
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default ManageBooks;