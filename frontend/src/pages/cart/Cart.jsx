import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice } = useContext(CartContext);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!token) {
      alert('Please login to checkout');
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-8">Add some products to get started!</p>
        <Link
          to="/shop"
          className="bg-greed-green text-white px-8 py-3 rounded-lg font-bold hover:bg-green-900 inline-block"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md">
            {cartItems.map((item, index) => (
              <div
                key={`${item.productId}-${item.size}`}
                className={`p-6 flex gap-4 ${
                  index !== cartItems.length - 1 ? 'border-b' : ''
                }`}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded"
                />

                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2">{item.name}</h3>
                  <p className="text-gray-600 mb-2">Size: {item.size}</p>
                  <p className="text-greed-green font-bold">
                    ₦{item.price.toLocaleString()}
                  </p>
                </div>

                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() => removeFromCart(item.productId, item.size)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        updateQuantity(item.productId, item.size, Math.max(1, item.quantity - 1))
                      }
                      className="w-8 h-8 border border-gray-300 rounded hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="w-12 text-center">{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item.productId, item.size, item.quantity + 1)
                      }
                      className="w-8 h-8 border border-gray-300 rounded hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>

                  <p className="font-bold">
                    ₦{(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>₦{getTotalPrice().toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="border-t pt-3 flex justify-between text-xl font-bold">
                <span>Total:</span>
                <span className="text-greed-green">
                  ₦{getTotalPrice().toLocaleString()}
                </span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-greed-green text-white py-3 rounded-lg font-bold hover:bg-green-900 mb-4"
            >
              Proceed to Checkout
            </button>

            <Link
              to="/shop"
              className="block text-center text-greed-green hover:underline"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;