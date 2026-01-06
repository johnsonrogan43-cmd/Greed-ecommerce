import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import API from '../../utils/api';
import { CartContext } from '../../context/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [bulkOrder, setBulkOrder] = useState({
    S: 0,
    M: 0,
    L: 0,
    XL: 0,
    XXL: 0,
  });
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await API.get(`/products/${id}`);
      setProduct(response.data.product);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    addToCart(product, selectedSize, quantity);
    alert('Added to cart!');
  };

  const handleBulkOrderChange = (size, value) => {
    const numValue = parseInt(value) || 0;
    if (numValue <= product.sizeStock[size]) {
      setBulkOrder({ ...bulkOrder, [size]: numValue });
    }
  };

  const handleAddBulkToCart = () => {
    let added = false;
    Object.entries(bulkOrder).forEach(([size, qty]) => {
      if (qty > 0) {
        addToCart(product, size, qty);
        added = true;
      }
    });
    if (added) {
      alert('Bulk order added to cart!');
      setBulkOrder({ S: 0, M: 0, L: 0, XL: 0, XXL: 0 });
    } else {
      alert('Please select quantities');
    }
  };

  const getBulkTotal = () => {
    return Object.values(bulkOrder).reduce((sum, qty) => sum + qty * product.price, 0);
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (!product) {
    return <div className="text-center py-12">Product not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div>
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          
          {product.team && (
            <p className="text-xl text-gray-600 mb-4">{product.team}</p>
          )}

          <p className="text-3xl font-bold text-greed-green mb-6">
            ₦{product.price.toLocaleString()}
          </p>

          <div className="mb-6">
            <h3 className="font-bold mb-2">Description</h3>
            <p className="text-gray-700">{product.description}</p>
          </div>

          {/* Regular Order */}
          {!product.isJersey && (
            <div className="mb-8">
              <div className="mb-4">
                <label className="block font-medium mb-2">Select Size</label>
                <div className="flex gap-2">
                  {Object.entries(product.sizeStock).map(([size, stock]) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      disabled={stock === 0}
                      className={`px-4 py-2 border rounded ${
                        selectedSize === size
                          ? 'bg-greed-green text-white'
                          : stock === 0
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      {size} {stock === 0 && '(Out)'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="block font-medium mb-2">Quantity</label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="w-20 px-4 py-2 border border-gray-300 rounded"
                />
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full bg-greed-green text-white py-3 rounded-lg font-bold hover:bg-green-900"
              >
                Add to Cart
              </button>
            </div>
          )}

          {/* Bulk Order for Jerseys */}
          {product.isJersey && (
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Bulk Order - Multiple Sizes</h3>
              
              <div className="space-y-3 mb-4">
                {Object.entries(product.sizeStock).map(([size, stock]) => (
                  <div key={size} className="flex items-center justify-between">
                    <span className="font-medium w-16">{size}</span>
                    <span className="text-sm text-gray-600 w-24">Stock: {stock}</span>
                    <input
                      type="number"
                      min="0"
                      max={stock}
                      value={bulkOrder[size]}
                      onChange={(e) => handleBulkOrderChange(size, e.target.value)}
                      disabled={stock === 0}
                      className="w-20 px-3 py-2 border border-gray-300 rounded disabled:bg-gray-200"
                    />
                    <span className="w-32 text-right font-bold">
                      ₦{(bulkOrder[size] * product.price).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 mb-4">
                <div className="flex justify-between text-xl font-bold">
                  <span>Total:</span>
                  <span className="text-greed-green">₦{getBulkTotal().toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={handleAddBulkToCart}
                className="w-full bg-greed-green text-white py-3 rounded-lg font-bold hover:bg-green-900"
              >
                Add All to Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;