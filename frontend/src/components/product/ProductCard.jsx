import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link
      to={`/product/${product._id}`}
      className="group block"
    >
      <div
        className="bg-slate-900/50 border border-amber-900/20 rounded-2xl overflow-hidden
                   hover:border-amber-700/40 hover:shadow-2xl hover:shadow-amber-500/10
                   transition-all duration-300"
      >
        {/* Image */}
        <div className="relative overflow-hidden h-64 bg-gray-800">
          <img
            src={product.images?.[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-amber-400 mb-1 truncate group-hover:text-amber-300 transition-colors">
            {product.name}
          </h3>

          {product.team && (
            <p className="text-sm text-gray-400 mb-2">{product.team}</p>
          )}

          <div className="flex items-center justify-between mt-4">
            <span className="text-2xl font-bold text-amber-500">
              ₦{product.price?.toLocaleString()}
            </span>

            {product.averageRating > 0 && (
              <div className="flex items-center text-sm">
                <span className="text-yellow-500">★</span>
                <span className="ml-1 text-gray-300">
                  {product.averageRating.toFixed(1)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
