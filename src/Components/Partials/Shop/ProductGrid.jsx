import React from 'react';
import ProductCard from "./ProductCard";

const ProductGrid = ({ products, isWishlist }) => {
  return (
    <div className="products-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <ProductCard key={index} product={product} isWishlist={isWishlist} />
      ))}
    </div>
  )
};

export default React.memo(ProductGrid);