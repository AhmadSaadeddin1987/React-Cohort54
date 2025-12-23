import { useState } from "react";
import productsData from "./fake-data/all-products";
import categoriesData from "./fake-data/all-categories";
import Categories from "./components/Categories";
import Products from "./components/Products";
import "./App.css";

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Filter products based on the selected category
  const filteredProducts = selectedCategory
    ? productsData.filter(
        (product) =>
          product.category === selectedCategory.replace("FAKE: ", "")
      )
    : productsData;

  return (
    <div className="app">
      <h1>Ecommerce</h1>

      {/* Categories Component */}
      <Categories
        categories={categoriesData}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Products Component */}
      <Products products={filteredProducts} />
    </div>
  );
}

export default App;
