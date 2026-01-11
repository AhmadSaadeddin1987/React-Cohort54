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

  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [categoriesError, setCategoriesError] = useState(null);

  const [productsLoading, setProductsLoading] = useState(false);
  const [productsError, setProductsError] = useState(null);

  // Fetch categories from API

  useEffect(() => {
    const fetchCategories = async () => {
      setCategoriesLoading(true);
      setCategoriesError(null);

      try {
        const res = await fetch("https://fakestoreapi.com/products/categories");
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error(err);
        setCategoriesError("Failed to load categories");
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);


  // Fetch products from API

  useEffect(() => {
    const fetchProducts = async () => {
      setProductsLoading(true);
      setProductsError(null);

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
        setProductsError("Failed to load products");
      } finally {
        setProductsLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  return (
    <Router>
      <div className="app">
        <h1>Ecommerce</h1>

        <Routes>
          <Route
            path="/"
            element={
              <>
                {/* Categories Section */}
                {categoriesLoading && <p>Loading categories...</p>}
                {categoriesError && (
                  <p style={{ color: "red" }}>{categoriesError}</p>
                )}
                <Categories
                  categories={categories}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                />

                {/* Products Section */}
                {productsLoading && <p>Loading products...</p>}
                {productsError && (
                  <p style={{ color: "red" }}>{productsError}</p>
                )}
                <Products products={products} />
              </>
            }
          />


          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
