import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
        <div className="aspect-w-1 aspect-h-1 bg-gray-200">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform"
          />
        </div>
        
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2 truncate">{product.name}</h3>
          
          {product.team && (
            <p className="text-sm text-gray-600 mb-2">{product.team}</p>
          )}
          
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-greed-green">
              ₦{product.price.toLocaleString()}
            </span>
            
            {product.averageRating > 0 && (
              <div className="flex items-center">
                <span className="text-yellow-500">★</span>
                <span className="ml-1 text-sm">{product.averageRating.toFixed(1)}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;