import { useState } from "react";
import products from "./fake-data/all-products";
import categories from "./fake-data/all-categories";
import "./App.css";

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const filteredProducts = selectedCategory
    ? products.filter(
        (product) =>
          product.category ===
          selectedCategory.replace("FAKE: ", "")
      )
    : products;

  return (
    <div className="app">
      <h1>Ecommerce</h1>

      {/* Categories */}
      <div className="categories">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={selectedCategory === category ? "active" : ""}
          >
            {category.replace("FAKE: ", "")}
          </button>
        ))}
      </div>

      {/* Products */}
      <div className="products">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>€ {product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
