import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">My Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-6">
              <h3 className="font-bold text-lg mb-2">{user?.name}</h3>
              <p className="text-sm text-gray-600">{user?.email}</p>
            </div>

            <nav className="space-y-2">
              <Link
                to="/dashboard"
                className="block px-4 py-2 rounded hover:bg-greed-green hover:text-white transition-colors"
              >
                My Account
              </Link>
              <Link
                to="/dashboard/orders"
                className="block px-4 py-2 rounded hover:bg-greed-green hover:text-white transition-colors"
              >
                My Orders
              </Link>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;