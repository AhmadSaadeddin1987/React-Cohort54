import { useContext } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { FavouritesContext } from "../context/FavouritesContext";
import heartRegular from "../assets/heart-regular.svg?url";
import heartSolid from "../assets/heart-solid.svg?url";

function ProductDetail() {
  const { id } = useParams();
  const { favourites, toggleFavourite } = useContext(FavouritesContext);
  const { data: product, loading, error } = useFetch(
    `https://fakestoreapi.com/products/${id}`
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="product-detail">
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
      <h2>{product.title}</h2>
      <p>€ {product.price}</p>
      <p>{product.description}</p>
      <p>Category: {product.category}</p>
      <p>
        Rating: {product.rating.rate} ({product.rating.count} reviews)
      </p>
    </div>
  );
}

export default ProductDetail;
