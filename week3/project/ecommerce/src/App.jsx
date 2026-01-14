import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FavouritesProvider } from "./context/FavouritesContext";
import Navbar from "./components/Navbar";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import "./App.css";

function App() {
  return (
    <Router>
      <FavouritesProvider>
        <Navbar />

        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </FavouritesProvider>
    </Router>
  );
}

export default App;
