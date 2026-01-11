import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductDetail() {
const { id } = useParams();

const [product, setProduct] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
fetch(`https://fakestoreapi.com/products/${id}`)
    .then((res) => res.json())
    .then((data) => {
    setProduct(data);
    setLoading(false);
    })
    .catch(() => {
    setError("Failed to load product details");
    setLoading(false);
    });
}, [id]);

if (loading) return <p>Loading...</p>;
if (error) return <p>{error}</p>;

return (
<div className="product-detail">
    <img src={product.image} alt={product.title} />
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
