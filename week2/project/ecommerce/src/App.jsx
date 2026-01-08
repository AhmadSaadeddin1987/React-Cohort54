import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Categories from "./components/Categories";
import Products from "./components/Products";
import ProductDetail from "./components/ProductDetail";
import "./App.css";

function App() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ---------------------------
  // Fetch categories from API
  // ---------------------------
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch("https://fakestoreapi.com/products/categories");
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // ---------------------------
  // Fetch products from API
  // ---------------------------
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      const url = selectedCategory
        ? `https://fakestoreapi.com/products/category/${encodeURIComponent(
            selectedCategory
          )}`
        : "https://fakestoreapi.com/products";

      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  return (
    <Router>
      <div className="app">
        <h1>Ecommerce</h1>

        <Routes>
          {/* Home page */}
          <Route
            path="/"
            element={
              <>
                {error && <p style={{ color: "red" }}>{error}</p>}
                {loading && <p>Loading...</p>}

                {!loading && !error && (
                  <>
                    <Categories
                      categories={categories}
                      selectedCategory={selectedCategory}
                      setSelectedCategory={setSelectedCategory}
                    />
                    <Products products={products} />
                  </>
                )}
              </>
            }
          />

          {/* Product detail page */}
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
