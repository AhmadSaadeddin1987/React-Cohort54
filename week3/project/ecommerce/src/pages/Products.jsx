import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Categories from "../components/Categories";
import { FavouritesContext } from "../context/FavouritesContext";
import heartRegular from "../assets/heart-regular.svg?url";
import heartSolid from "../assets/heart-solid.svg?url";

function Products() {
  const [selectedCategory, setSelectedCategory] = useState("electronics");
  const { favourites, toggleFavourite } = useContext(FavouritesContext);

  const categoriesUrl = "https://fakestoreapi.com/products/categories";
  const productsUrl = `https://fakestoreapi.com/products/category/${selectedCategory}`;

  const { data: categories, loading: categoriesLoading } = useFetch(categoriesUrl);
  const { data: products, loading: productsLoading, error } = useFetch(productsUrl);

  if (categoriesLoading || productsLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <Categories
        categories={categories || []}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <div className="products">
        {products?.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image-container">
              <img src={product.image} alt={product.title} />
              <button
                className="heart-button"
                onClick={() => toggleFavourite(product.id)}
              >
                <img
                  src={favourites.includes(product.id) ? heartSolid : heartRegular}
                  alt="favourite"
                  className="heart-icon"
                />
              </button>
            </div>
            <Link to={`/product/${product.id}`} className="product-link">
              {product.title}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;

