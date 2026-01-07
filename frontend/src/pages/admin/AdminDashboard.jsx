import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../utils/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await API.get('/orders/all');
      const orders = response.data.orders;

      const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
      const pendingOrders = orders.filter((order) => order.orderStatus === 'pending').length;

      setStats({
        totalOrders: orders.length,
        totalRevenue,
        pendingOrders,
      });

      setRecentOrders(orders.slice(0, 5));
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-gray-600 mb-2">Total Orders</h3>
          <p className="text-4xl font-bold text-greed-green">{stats.totalOrders}</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-gray-600 mb-2">Total Revenue</h3>
          <p className="text-4xl font-bold text-greed-green">
            ₦{stats.totalRevenue.toLocaleString()}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-gray-600 mb-2">Pending Orders</h3>
          <p className="text-4xl font-bold text-yellow-600">{stats.pendingOrders}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link
          to="/admin/products"
          className="bg-greed-green text-white rounded-lg p-6 text-center hover:bg-green-900 transition-colors"
        >
          <h3 className="text-2xl font-bold mb-2">Manage Products</h3>
          <p>Add, edit, or delete products</p>
        </Link>

        <Link
          to="/admin/orders"
          className="bg-blue-600 text-white rounded-lg p-6 text-center hover:bg-blue-700 transition-colors"
        >
          <h3 className="text-2xl font-bold mb-2">Manage Orders</h3>
          <p>View and update order status</p>
        </Link>

        <Link
          to="/admin/users"
          className="bg-purple-600 text-white rounded-lg p-6 text-center hover:bg-purple-700 transition-colors"
        >
          <h3 className="text-2xl font-bold mb-2">Manage Users</h3>
          <p>View and manage users</p>
        </Link>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>

        {recentOrders.length === 0 ? (
          <p className="text-gray-600">No orders yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Order ID</th>
                  <th className="text-left py-3 px-4">Customer</th>
                  <th className="text-left py-3 px-4">Date</th>
                  <th className="text-left py-3 px-4">Total</th>
                  <th className="text-left py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order._id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm">{order._id.slice(-8)}</td>
                    <td className="py-3 px-4">{order.user?.name}</td>
                    <td className="py-3 px-4">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 font-bold">
                      ₦{order.totalAmount.toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                        {order.orderStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;