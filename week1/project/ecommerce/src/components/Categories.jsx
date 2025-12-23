import React from "react";

function Categories({ categories, selectedCategory, setSelectedCategory }) {
return (
<div className="categories">
    {categories.map((category) => (
    <button
        key={category}
        onClick={() => setSelectedCategory(category)}
        className={selectedCategory === category ? "active" : ""}
    >
        {category.replace("FAKE: ", "")}
    </button>
    ))}
</div>
);
}

export default Categories;
