import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { getTotalItems } = useContext(CartContext);

  return (
    <nav className="bg-greed-green text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold">
            GREED
          </Link>

          <div className="flex gap-6 items-center">
            <Link to="/shop" className="hover:text-gray-300">Shop</Link>
            <Link to="/cart" className="hover:text-gray-300">
              Cart ({getTotalItems()})
            </Link>
            
            {user ? (
              <>
                {user.role === 'admin' && (
                  <Link to="/admin" className="hover:text-gray-300">Admin</Link>
                )}
                <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>
                <button onClick={logout} className="hover:text-gray-300">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-gray-300">Login</Link>
                <Link to="/register" className="hover:text-gray-300">Register</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;