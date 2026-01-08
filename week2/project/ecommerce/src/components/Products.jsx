import { Link } from "react-router-dom";

function Products({ products }) {
return (
<div className="products">
    {products.map((product) => (
    <div key={product.id} className="product-card">
        <img src={product.image} alt={product.title} />

        <Link to={`/product/${product.id}`} className="product-link">
        {product.title}
        </Link>
    </div>
    ))}
</div>
);
}

export default Products;

