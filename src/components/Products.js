import React, { useState } from "react";
import "./Products.css";

const products = [
  { id: 1, name: "Nitrogen Fertilizer", category: "Fertilizer", price: "₹500" },
  { id: 2, name: "Phosphate Fertilizer", category: "Fertilizer", price: "₹600" },
  { id: 3, name: "Potash Fertilizer", category: "Fertilizer", price: "₹550" },
  { id: 4, name: "Pesticide A", category: "Pesticide", price: "₹400" },
  { id: 5, name: "Organic Compost", category: "Organic", price: "₹300" },
];

const categories = ["All", "Fertilizer", "Pesticide", "Organic"];

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <div className="products-container">
      <h2>Our Products</h2>

      {/* Category Tabs */}
      <div className="tabs">
        {categories.map((cat) => (
          <button
            key={cat}
            className={selectedCategory === cat ? "active" : ""}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Cards */}
      <div className="product-list">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p>Category: {product.category}</p>
            <p>Price: {product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
