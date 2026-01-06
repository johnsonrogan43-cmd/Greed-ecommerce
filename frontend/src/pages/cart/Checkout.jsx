import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import API from '../../utils/api';

const Checkout = () => {
  const { cartItems, getTotalPrice, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    street: '',
    city: '',
    state: '',
    country: 'Nigeria',
    zipCode: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('stripe');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderData = {
        items: cartItems.map(item => ({
          productId: item.productId,
          size: item.size,
          quantity: item.quantity,
        })),
        shippingAddress,
        paymentMethod,
      };

      const response = await API.post('/orders', orderData);
      
      alert('Order placed successfully!');
      clearCart();
      navigate('/dashboard/orders');
    } catch (error) {
      alert(error.response?.data?.message || 'Order failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Checkout</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Shipping Address */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Shipping Address</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Street Address</label>
                <input
                  type="text"
                  required
                  value={shippingAddress.street}
                  onChange={(e) =>
                    setShippingAddress({ ...shippingAddress, street: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">City</label>
                <input
                  type="text"
                  required
                  value={shippingAddress.city}
                  onChange={(e) =>
                    setShippingAddress({ ...shippingAddress, city: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">State</label>
                <input
                  type="text"
                  required
                  value={shippingAddress.state}
                  onChange={(e) =>
                    setShippingAddress({ ...shippingAddress, state: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Country</label>
                <input
                  type="text"
                  required
                  value={shippingAddress.country}
                  onChange={(e) =>
                    setShippingAddress({ ...shippingAddress, country: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Zip Code</label>
                <input
                  type="text"
                  required
                  value={shippingAddress.zipCode}
                  onChange={(e) =>
                    setShippingAddress({ ...shippingAddress, zipCode: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

              <div className="space-y-3 mb-4">
                {cartItems.map((item) => (
                  <div key={`${item.productId}-${item.size}`} className="flex justify-between text-sm">
                    <span>
                      {item.name} (Size: {item.size}) x {item.quantity}
                    </span>
                    <span>₦{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-3 flex justify-between text-xl font-bold">
                <span>Total:</span>
                <span className="text-greed-green">
                  ₦{getTotalPrice().toLocaleString()}
                </span>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-2xl font-bold mb-4">Payment Method</h2>

              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="stripe"
                    checked={paymentMethod === 'stripe'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4"
                  />
                  <span>Stripe (Card Payment)</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="paystack"
                    checked={paymentMethod === 'paystack'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4"
                  />
                  <span>Paystack</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-greed-green text-white py-3 rounded-lg font-bold hover:bg-green-900 disabled:bg-gray-400"
            >
              {loading ? 'Processing...' : 'Place Order'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;