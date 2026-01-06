import React, { useState, useEffect } from 'react';
import API from '../../utils/api';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await API.get('/orders/user');
      setOrders(response.data.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      shipped: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return <div className="text-center py-12">Loading orders...</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">No Orders Yet</h2>
        <p className="text-gray-600 mb-6">You haven't placed any orders yet.</p>
        
        <a  href="/shop"
          className="bg-greed-green text-white px-6 py-3 rounded-lg font-bold hover:bg-green-900 inline-block"
        >
          Start Shopping
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">My Orders</h2>

      {orders.map((order) => (
        <div key={order._id} className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-gray-600">
                Order ID: {order._id}
              </p>
              <p className="text-sm text-gray-600">
                Date: {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="text-right">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.orderStatus)}`}>
                {order.orderStatus.toUpperCase()}
              </span>
              <p className="text-xl font-bold text-greed-green mt-2">
                ₦{order.totalAmount.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-bold mb-3">Items:</h4>
            <div className="space-y-2">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>
                    {item.product?.name || 'Product'} (Size: {item.size}) x {item.quantity}
                  </span>
                  <span>₦{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t mt-4 pt-4">
            <h4 className="font-bold mb-2">Shipping Address:</h4>
            <p className="text-sm text-gray-600">
              {order.shippingAddress.street}, {order.shippingAddress.city},{' '}
              {order.shippingAddress.state}, {order.shippingAddress.country}{' '}
              {order.shippingAddress.zipCode}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;