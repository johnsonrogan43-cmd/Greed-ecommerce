import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../../utils/api';
import { AuthContext } from '../../context/AuthContext';

const Orders = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return navigate('/login');
    fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    try {
      const { data } = await API.get('/orders/user');
      setOrders(data.orders || []);
    } catch (err) {
      console.error('Error fetching orders', err);
    } finally {
      setLoading(false);
    }
  };

  const statusColor = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    shipped: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  if (loading) return <div className="text-center py-12">Loading orders...</div>;

  if (!orders.length) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold mb-3">No Orders Yet</h2>
        <p className="text-gray-600 mb-6">
          You haven’t placed any orders yet.
        </p>
        <Link
          to="/shop"
          className="bg-greed-green text-white px-6 py-3 rounded-lg font-bold hover:bg-green-900"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">My Orders</h2>

      {orders.map((order) => (
        <div key={order._id} className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between mb-4">
            <div>
              <p className="text-sm text-gray-600">Order ID: {order._id}</p>
              <p className="text-sm text-gray-600">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="text-right">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor[order.orderStatus]}`}
              >
                {order.orderStatus.toUpperCase()}
              </span>
              <p className="text-xl font-bold text-greed-green mt-2">
                ₦{order.totalAmount.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
