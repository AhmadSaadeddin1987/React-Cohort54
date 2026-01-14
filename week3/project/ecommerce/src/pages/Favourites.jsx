import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FavouritesContext } from "../context/FavouritesContext";
import heartSolid from "../assets/heart-solid.svg";

function Favourites() {
  const { favourites, toggleFavourite } = useContext(FavouritesContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (favourites.length === 0) {
      setProducts([]);
      setLoading(false);
      return;
    }

    const fetchFavourites = async () => {
      setLoading(true);
      setError(null);

      try {
        const promises = favourites.map((id) =>
          fetch(`https://fakestoreapi.com/products/${id}`).then((res) => {
            if (!res.ok) throw new Error("Failed to fetch product");
            return res.json();
          })
        );

        const results = await Promise.all(promises);
        setProducts(results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFavourites();
  }, [favourites]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  if (favourites.length === 0) {
    return (
      <div className="favourites">
        <h2>Your Favourites</h2>
        <p>You haven't added any favourites yet.</p>
      </div>
    );
  }

  return (
    <div className="favourites">
      <h2>Your Favourites</h2>
      <div className="products">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image-container">
              <img src={product.image} alt={product.title} />
              <button
                className="heart-button"
                onClick={() => toggleFavourite(product.id)}
              >
                <img
                  src={heartSolid}
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

export default Favourites;