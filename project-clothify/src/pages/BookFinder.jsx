import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/bookfinder.css";

const BookFinder = () => {
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [step, setStep] = useState(1);

  const [answers, setAnswers] = useState({
    mood: "",
    length: "",
    level: "",
  });

  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch books from JSON Server
  useEffect(() => {
    axios
      .get("http://localhost:3000/books")
      .then((response) => {
        setBooks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching books:", error);
        setError(
          "Unable to load books. Please make sure JSON Server is running."
        );
        setLoading(false);
      });
  }, []);

  // Save answers
  const handleAnswer = (question, answer) => {
    setAnswers((previous) => ({
      ...previous,
      [question]: answer,
    }));
  };

  // Next step
  const nextStep = () => {
    setStep((previous) => previous + 1);
  };

  // Previous step
  const previousStep = () => {
    setStep((previous) => previous - 1);
  };

  // Find recommendations
  const findBooks = () => {
    if (!books.length) {
      return;
    }

    const scoredBooks = books.map((book) => {
      let score = 0;

      const title = String(book.title || "").toLowerCase();
      const author = String(book.author || "").toLowerCase();
      const category = String(
        book.category || book.genre || ""
      ).toLowerCase();

      const description = String(
        book.description || ""
      ).toLowerCase();

      const bookText =
        `${title} ${author} ${category} ${description}`;

      // --------------------------------
      // MOOD MATCHING
      // --------------------------------

      if (answers.mood === "romance") {
        if (
          bookText.includes("romance") ||
          bookText.includes("love") ||
          bookText.includes("romantic")
        ) {
          score += 5;
        }
      }

      if (answers.mood === "mystery") {
        if (
          bookText.includes("mystery") ||
          bookText.includes("thriller") ||
          bookText.includes("crime") ||
          bookText.includes("detective")
        ) {
          score += 5;
        }
      }

      if (answers.mood === "adventure") {
        if (
          bookText.includes("adventure") ||
          bookText.includes("fantasy") ||
          bookText.includes("action")
        ) {
          score += 5;
        }
      }

      if (answers.mood === "self-help") {
        if (
          bookText.includes("self") ||
          bookText.includes("self-help") ||
          bookText.includes("motivation") ||
          bookText.includes("psychology") ||
          bookText.includes("personal") ||
          bookText.includes("success")
        ) {
          score += 5;
        }
      }

      if (answers.mood === "comedy") {
        if (
          bookText.includes("comedy") ||
          bookText.includes("humor") ||
          bookText.includes("funny")
        ) {
          score += 5;
        }
      }

      // --------------------------------
      // PAGE LENGTH MATCHING
      // --------------------------------

      const pages = Number(book.pages || book.pageCount || 0);

      if (pages > 0) {
        if (answers.length === "short" && pages <= 250) {
          score += 3;
        }

        if (
          answers.length === "medium" &&
          pages > 250 &&
          pages <= 400
        ) {
          score += 3;
        }

        if (answers.length === "long" && pages > 400) {
          score += 3;
        }
      }

      // --------------------------------
      // READER LEVEL MATCHING
      // --------------------------------

      if (answers.level === "beginner") {
        if (pages > 0 && pages <= 300) {
          score += 2;
        }
      }

      if (answers.level === "regular") {
        score += 1;
      }

      if (answers.level === "book-lover") {
        if (pages >= 300) {
          score += 2;
        }
      }

      return {
        ...book,
        recommendationScore: score,
      };
    });

    // Sort by highest score
    scoredBooks.sort(
      (a, b) =>
        b.recommendationScore - a.recommendationScore
    );

    // Always show books
    const result = scoredBooks.slice(0, 6);

    setRecommendations(result);
    setStep(4);
  };

  // Restart quiz
  const restartFinder = () => {
    setStep(1);

    setAnswers({
      mood: "",
      length: "",
      level: "",
    });

    setRecommendations([]);
  };

  // Loading
  if (loading) {
    return (
      <div className="finder-loading">
        <h2>📚 Finding your books...</h2>
        <p>Please wait...</p>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="finder-error">
        <h2>⚠️ Something went wrong</h2>
        <p>{error}</p>

        <p>
          Run this command in your project terminal:
        </p>

        <code>
          json-server --watch db.json --port 3000
        </code>
      </div>
    );
  }

  return (
    <div className="book-finder">

      <div className="finder-container">

        {/* =========================
            STEP 1
        ========================= */}

        {step === 1 && (
          <div className="finder-step">

            <div className="finder-icon">
              ✨
            </div>

            <h1>Find My Next Book</h1>

            <p className="finder-description">
              Answer a few simple questions and
              BookVerse will find books you may love.
            </p>

            <div className="progress">
              <span className="active"></span>
              <span></span>
              <span></span>
            </div>

            <h2>
              What are you in the mood for?
            </h2>

            <div className="finder-options">

              <button
                className={
                  answers.mood === "romance"
                    ? "option selected"
                    : "option"
                }
                onClick={() =>
                  handleAnswer("mood", "romance")
                }
              >
                <span className="option-icon">
                  ❤️
                </span>

                <span>
                  <strong>Romance</strong>
                  <small>Love & relationships</small>
                </span>
              </button>

              <button
                className={
                  answers.mood === "mystery"
                    ? "option selected"
                    : "option"
                }
                onClick={() =>
                  handleAnswer("mood", "mystery")
                }
              >
                <span className="option-icon">
                  🕵️
                </span>

                <span>
                  <strong>Mystery</strong>
                  <small>Secrets & suspense</small>
                </span>
              </button>

              <button
                className={
                  answers.mood === "adventure"
                    ? "option selected"
                    : "option"
                }
                onClick={() =>
                  handleAnswer("mood", "adventure")
                }
              >
                <span className="option-icon">
                  🚀
                </span>

                <span>
                  <strong>Adventure</strong>
                  <small>Action & exploration</small>
                </span>
              </button>

              <button
                className={
                  answers.mood === "self-help"
                    ? "option selected"
                    : "option"
                }
                onClick={() =>
                  handleAnswer("mood", "self-help")
                }
              >
                <span className="option-icon">
                  🧠
                </span>

                <span>
                  <strong>Self Improvement</strong>
                  <small>Growth & motivation</small>
                </span>
              </button>

              <button
                className={
                  answers.mood === "comedy"
                    ? "option selected"
                    : "option"
                }
                onClick={() =>
                  handleAnswer("mood", "comedy")
                }
              >
                <span className="option-icon">
                  😂
                </span>

                <span>
                  <strong>Comedy</strong>
                  <small>Fun & laughter</small>
                </span>
              </button>

            </div>

            <button
              className="next-btn"
              disabled={!answers.mood}
              onClick={nextStep}
            >
              Next →
            </button>

          </div>
        )}

        {/* =========================
            STEP 2
        ========================= */}

        {step === 2 && (
          <div className="finder-step">

            <div className="finder-icon">
              📚
            </div>

            <h1>How long do you want to read?</h1>

            <p className="finder-description">
              Choose the reading length you prefer.
            </p>

            <div className="progress">
              <span className="active"></span>
              <span className="active"></span>
              <span></span>
            </div>

            <div className="finder-options">

              <button
                className={
                  answers.length === "short"
                    ? "option selected"
                    : "option"
                }
                onClick={() =>
                  handleAnswer("length", "short")
                }
              >
                <span className="option-icon">
                  📖
                </span>

                <span>
                  <strong>Short Read</strong>
                  <small>Less than 250 pages</small>
                </span>
              </button>

              <button
                className={
                  answers.length === "medium"
                    ? "option selected"
                    : "option"
                }
                onClick={() =>
                  handleAnswer("length", "medium")
                }
              >
                <span className="option-icon">
                  📚
                </span>

                <span>
                  <strong>Medium Read</strong>
                  <small>250 – 400 pages</small>
                </span>
              </button>

              <button
                className={
                  answers.length === "long"
                    ? "option selected"
                    : "option"
                }
                onClick={() =>
                  handleAnswer("length", "long")
                }
              >
                <span className="option-icon">
                  📕
                </span>

                <span>
                  <strong>Long Read</strong>
                  <small>More than 400 pages</small>
                </span>
              </button>

            </div>

            <div className="navigation-buttons">

              <button
                className="back-btn"
                onClick={previousStep}
              >
                ← Back
              </button>

              <button
                className="next-btn"
                disabled={!answers.length}
                onClick={nextStep}
              >
                Next →
              </button>

            </div>

          </div>
        )}

        {/* =========================
            STEP 3
        ========================= */}

        {step === 3 && (
          <div className="finder-step">

            <div className="finder-icon">
              🌟
            </div>

            <h1>What kind of reader are you?</h1>

            <p className="finder-description">
              This helps us find books that suit you.
            </p>

            <div className="progress">
              <span className="active"></span>
              <span className="active"></span>
              <span className="active"></span>
            </div>

            <div className="finder-options">

              <button
                className={
                  answers.level === "beginner"
                    ? "option selected"
                    : "option"
                }
                onClick={() =>
                  handleAnswer("level", "beginner")
                }
              >
                <span className="option-icon">
                  🌱
                </span>

                <span>
                  <strong>Beginner Reader</strong>
                  <small>I'm starting my reading journey</small>
                </span>
              </button>

              <button
                className={
                  answers.level === "regular"
                    ? "option selected"
                    : "option"
                }
                onClick={() =>
                  handleAnswer("level", "regular")
                }
              >
                <span className="option-icon">
                  📖
                </span>

                <span>
                  <strong>Regular Reader</strong>
                  <small>I read books regularly</small>
                </span>
              </button>

              <button
                className={
                  answers.level === "book-lover"
                    ? "option selected"
                    : "option"
                }
                onClick={() =>
                  handleAnswer("level", "book-lover")
                }
              >
                <span className="option-icon">
                  ❤️
                </span>

                <span>
                  <strong>Book Lover</strong>
                  <small>I can never have enough books</small>
                </span>
              </button>

            </div>

            <div className="navigation-buttons">

              <button
                className="back-btn"
                onClick={previousStep}
              >
                ← Back
              </button>

              <button
                className="next-btn"
                disabled={!answers.level}
                onClick={findBooks}
              >
                ✨ Find My Books
              </button>

            </div>

          </div>
        )}

        {/* =========================
            STEP 4
        ========================= */}

        {step === 4 && (
          <div className="recommendation-section">

            <div className="finder-icon">
              ✨
            </div>

            <h1>Books Picked For You</h1>

            <p className="finder-description">
              Based on your preferences, we think
              you might enjoy these books.
            </p>

            <div className="recommendation-grid">

              {recommendations.map((book) => (

                <div
                  className="recommendation-card"
                  key={book.id}
                >

                  <div className="book-image-container">

                    <img
                      src={
                        book.image ||
                        book.imageUrl ||
                        book.cover ||
                        "https://via.placeholder.com/250x350?text=Book"
                      }
                      alt={book.title}
                    />

                  </div>

                  <div className="book-info">

                    <h3>{book.title}</h3>

                    <p className="author">
                      by {book.author || "Unknown Author"}
                    </p>

                    <div className="book-bottom">

                      <span className="price">
                        ₹{book.price || "0"}
                      </span>

                      {book.rating && (
                        <span className="rating">
                          ⭐ {book.rating}
                        </span>
                      )}

                    </div>

                    <button
                      className="view-book-btn"
                      onClick={() =>
                        navigate(`/book/${book.id}`)
                      }
                    >
                      View Book
                    </button>

                  </div>

                </div>

              ))}

            </div>

            {recommendations.length === 0 && (
              <div className="no-books">
                <h3>📚 No books found</h3>
                <p>
                  Try finding books again with
                  different preferences.
                </p>
              </div>
            )}

            <button
              className="restart-btn"
              onClick={restartFinder}
            >
              🔄 Find Again
            </button>

          </div>
        )}

      </div>

    </div>
  );
};

export default BookFinder;