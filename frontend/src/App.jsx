import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Shop from './pages/shop/Shop';
import ProductDetails from './pages/shop/ProductDetails';
import Cart from './pages/cart/Cart';
import Checkout from './pages/cart/Checkout';
import Dashboard from './pages/dashboard/Dashboard';
import Orders from './pages/dashboard/Orders';

// Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 container mx-auto px-4 py-6">
              <Routes>
                {/* Auth */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Shop */}
                <Route path="/" element={<Shop />} />
                <Route path="/product/:id" element={<ProductDetails />} />

                {/* Cart */}
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />

                {/* Dashboard */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboard/orders" element={<Orders />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
