import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, User, LogOut, Shield, Menu, X, Store, Crown } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { getTotalItems } = useContext(CartContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // derive display name and role check
  const displayName = user ? (user.firstName ? `${user.firstName} ${user.lastName || ''}` : user.email || 'User') : '';
  const isAdmin = user ? ['admin', 'superadmin'].includes(user.role) : false;

  return (
    <nav className="fixed w-full top-0 z-50 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-amber-900/20 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <Crown className="w-8 h-8 text-amber-500 group-hover:text-amber-400 transition-all duration-300 group-hover:rotate-12" />
              <div className="absolute inset-0 blur-xl bg-amber-500 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500 bg-clip-text text-transparent tracking-wider">
              GREED
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              to="/shop" 
              className="flex items-center gap-2 text-gray-300 hover:text-amber-400 transition-all duration-300 group relative py-2"
            >
              <Store className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-medium">Shop</span>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-500 to-amber-300 group-hover:w-full transition-all duration-300"></div>
            </Link>
            
            <Link 
              to="/cart" 
              className="flex items-center gap-2 text-gray-300 hover:text-amber-400 transition-all duration-300 group relative py-2"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    {getTotalItems()}
                  </span>
                )}
              </div>
              <span className="font-medium">Cart</span>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-500 to-amber-300 group-hover:w-full transition-all duration-300"></div>
            </Link>
            
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-amber-900/30 to-amber-800/30 border border-amber-700/30 text-amber-300 hover:border-amber-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/20"
                >
                  <User className="w-4 h-4" />
                  <span className="font-medium">{displayName}</span>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-amber-700/30 rounded-lg shadow-2xl shadow-amber-500/10 overflow-hidden">
                    {isAdmin && (
                      <Link
                        to="/admin"
                        className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-amber-900/20 hover:text-amber-400 transition-all duration-200"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <Shield className="w-4 h-4" />
                        <span>Admin Panel</span>
                      </Link>
                    )}
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-amber-900/20 hover:text-amber-400 transition-all duration-200"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <User className="w-4 h-4" />
                      <span>Dashboard</span>
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setUserMenuOpen(false);
                      }}
                      className="flex items-center gap-3 w-full px-4 py-3 text-gray-300 hover:bg-red-900/20 hover:text-red-400 transition-all duration-200 border-t border-amber-900/20"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-5 py-2 text-amber-300 hover:text-amber-400 font-medium transition-colors duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-2 rounded-lg bg-gradient-to-r from-amber-600 to-amber-500 text-white font-medium hover:from-amber-500 hover:to-amber-400 transition-all duration-300 shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-105"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-amber-300 hover:text-amber-400 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900/95 backdrop-blur-xl border-t border-amber-900/20">
          <div className="px-4 py-6 space-y-4">
            <Link
              to="/shop"
              className="flex items-center gap-3 text-gray-300 hover:text-amber-400 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Store className="w-5 h-5" />
              <span className="font-medium">Shop</span>
            </Link>
            
            <Link
              to="/cart"
              className="flex items-center gap-3 text-gray-300 hover:text-amber-400 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="font-medium">Cart ({getTotalItems()})</span>
            </Link>

            {user ? (
              <>
                {user.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="flex items-center gap-3 text-gray-300 hover:text-amber-400 transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Shield className="w-5 h-5" />
                    <span className="font-medium">Admin Panel</span>
                  </Link>
                )}
                <Link
                  to="/dashboard"
                  className="flex items-center gap-3 text-gray-300 hover:text-amber-400 transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="w-5 h-5" />
                  <span className="font-medium">Dashboard</span>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 text-gray-300 hover:text-red-400 transition-colors py-2 w-full"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block py-2 text-amber-300 hover:text-amber-400 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-6 py-2 rounded-lg bg-gradient-to-r from-amber-600 to-amber-500 text-white font-medium text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;