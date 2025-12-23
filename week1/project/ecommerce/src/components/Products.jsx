import React from "react";

function Products({ products }) {
return (
<div className="products">
    {products.map((product) => (
    <div key={product.id} className="product-card">
        <img src={product.image} alt={product.title} />
        <h3>{product.title}</h3>
        <p>€ {product.price}</p>
    </div>
    ))}
</div>
);
}

export default Products;
