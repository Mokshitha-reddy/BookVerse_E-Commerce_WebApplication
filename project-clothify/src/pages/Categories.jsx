import React from "react";
import { Link } from "react-router-dom";
import "../styles/categories.css";

const Categories = () => {

  const categories = [
    {
      name: "Fiction",
      icon: "📖",
      description: "Explore exciting stories and novels"
    },
    {
      name: "Self Help",
      icon: "🌱",
      description: "Books to improve yourself and your habits"
    },
    {
      name: "Business",
      icon: "💼",
      description: "Learn business, leadership and entrepreneurship"
    },
    {
      name: "Finance",
      icon: "💰",
      description: "Improve your financial knowledge"
    },
    {
      name: "Science",
      icon: "🔬",
      description: "Discover science and technology"
    },
    {
      name: "Biography",
      icon: "👤",
      description: "Read inspiring life stories"
    }
  ];

  return (
    <div className="categories-page">

      <div className="categories-header">

        <h1>📚 Explore Categories</h1>

        <p>
          Find your next favorite book by category
        </p>

      </div>

      <div className="categories-grid">

        {categories.map((category) => (

          <Link
            to={`/Books?category=${category.name}`}
            className="category-card"
            key={category.name}
          >

            <div className="category-icon">
              {category.icon}
            </div>

            <h2>{category.name}</h2>

            <p>{category.description}</p>

            <span>
              Explore Books →
            </span>

          </Link>

        ))}

      </div>

    </div>
  );
};

export default Categories;