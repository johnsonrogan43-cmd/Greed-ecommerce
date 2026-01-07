import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, TrendingUp, Shield, Truck, CreditCard, Award } from 'lucide-react';
import API from '../utils/api';
import ProductCard from '../components/product/ProductCard';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await API.get('/products?limit=8');
      setFeaturedProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-950 pt-20">
      {/* Hero Section with Luxury Overlay */}
      <section 
        className="relative h-screen bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1556906781-9a412961c28c?w=1920')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/70 to-slate-950"></div>
        <div className="relative z-10 h-full flex items-center justify-center text-white">
          <div className="text-center px-4 space-y-8 animate-fade-in">
            <div className="inline-block mb-4">
              <Sparkles className="w-16 h-16 text-amber-500 mx-auto animate-pulse" />
            </div>
            <h1 className="text-7xl md:text-8xl font-bold mb-6">
              <span className="bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500 bg-clip-text text-transparent">
                GREED
              </span>
            </h1>
            <p className="text-2xl md:text-4xl mb-8 text-gray-300 font-light tracking-wide">
              Premium Football Gear & Luxury Men's Fashion
            </p>
            <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
              Where Excellence Meets Style. Discover Our Curated Collection of Elite Sportswear.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-600 to-amber-500 text-white px-12 py-5 rounded-xl text-xl font-bold hover:from-amber-500 hover:to-amber-400 transition-all transform hover:scale-105 shadow-2xl shadow-amber-500/40 hover:shadow-amber-500/60"
            >
              <span>Explore Collection</span>
              <TrendingUp className="w-6 h-6" />
            </Link>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-amber-500 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-amber-500 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Category Banners with Luxury Styling */}
      <section className="py-24 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500 bg-clip-text text-transparent">
                Shop by Category
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-amber-300 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Men's Fashion */}
            <Link to="/shop?category=mens-fashion" className="group relative overflow-hidden rounded-2xl shadow-2xl h-96">
              <img
                src="https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=800"
                alt="Men's Fashion"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/70 to-transparent"></div>
              <div className="absolute inset-0 bg-amber-500/0 group-hover:bg-amber-500/10 transition-colors duration-500"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white transform group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-4xl font-bold mb-3 group-hover:text-amber-400 transition-colors duration-300">Men's Fashion</h3>
                <p className="text-lg text-gray-300 mb-4">Stylish clothing for modern gentlemen</p>
                <div className="w-0 h-0.5 bg-gradient-to-r from-amber-500 to-transparent group-hover:w-full transition-all duration-500"></div>
              </div>
            </Link>

            {/* Football Jerseys */}
            <Link to="/shop?category=football-jerseys" className="group relative overflow-hidden rounded-2xl shadow-2xl h-96">
              <img
                src="https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800"
                alt="Football Jerseys"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/70 to-transparent"></div>
              <div className="absolute inset-0 bg-amber-500/0 group-hover:bg-amber-500/10 transition-colors duration-500"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white transform group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-4xl font-bold mb-3 group-hover:text-amber-400 transition-colors duration-300">Football Jerseys</h3>
                <p className="text-lg text-gray-300 mb-4">Official and retro jerseys</p>
                <div className="w-0 h-0.5 bg-gradient-to-r from-amber-500 to-transparent group-hover:w-full transition-all duration-500"></div>
              </div>
            </Link>

            {/* Football Boots */}
            <Link to="/shop?category=football-boots" className="group relative overflow-hidden rounded-2xl shadow-2xl h-96">
              <img
                src="https://images.unsplash.com/photo-1511886929837-354d827aae26?w=800"
                alt="Football Boots"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/70 to-transparent"></div>
              <div className="absolute inset-0 bg-amber-500/0 group-hover:bg-amber-500/10 transition-colors duration-500"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white transform group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-4xl font-bold mb-3 group-hover:text-amber-400 transition-colors duration-300">Football Boots</h3>
                <p className="text-lg text-gray-300 mb-4">Premium performance boots</p>
                <div className="w-0 h-0.5 bg-gradient-to-r from-amber-500 to-transparent group-hover:w-full transition-all duration-500"></div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 py-24 bg-slate-950">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500 bg-clip-text text-transparent">
              Featured Products
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-amber-300 mx-auto mb-4"></div>
          <p className="text-gray-400 text-lg">Handpicked excellence from our collection</p>
        </div>
        
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-amber-500 border-t-transparent"></div>
            <p className="mt-6 text-gray-400 text-lg">Loading premium products...</p>
          </div>
        ) : featuredProducts.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/50 rounded-2xl border border-amber-900/20">
            <Award className="w-16 h-16 text-amber-500 mx-auto mb-4" />
            <p className="text-gray-400 text-xl mb-6">No products yet. Add some from admin panel!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Promo Banner with Luxury Treatment */}
      <section 
        className="relative h-[500px] bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1461467819036-85ef30433e84?w=1920')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-amber-900/80 to-slate-950/95"></div>
        <div className="relative z-10 h-full flex items-center justify-center text-white text-center px-4">
          <div className="max-w-4xl space-y-8 animate-slide-up">
            <Sparkles className="w-12 h-12 text-amber-500 mx-auto mb-4" />
            <h2 className="text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-amber-300 via-amber-500 to-amber-300 bg-clip-text text-transparent">
                New Season, New Excellence
              </span>
            </h2>
            <p className="text-2xl mb-10 text-gray-300">Get 20% off on all jerseys this month</p>
            <Link
              to="/shop?category=football-jerseys"
              className="inline-flex items-center gap-3 bg-white text-slate-950 px-12 py-5 rounded-xl text-xl font-bold hover:bg-amber-50 transition-all shadow-2xl hover:scale-105"
            >
              <span>Shop Jerseys Now</span>
              <TrendingUp className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section with Premium Icons */}
      <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center p-8 rounded-2xl bg-slate-900/50 border border-amber-900/20 hover:border-amber-700/40 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10">
              <div className="w-24 h-24 bg-gradient-to-br from-amber-600 to-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-amber-500/40 group-hover:scale-110 transition-transform">
                <Shield className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-amber-400">Quality Guaranteed</h3>
              <p className="text-gray-400 leading-relaxed">100% authentic products from trusted brands. Excellence in every piece.</p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-slate-900/50 border border-amber-900/20 hover:border-amber-700/40 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10">
              <div className="w-24 h-24 bg-gradient-to-br from-amber-600 to-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-amber-500/40 group-hover:scale-110 transition-transform">
                <Truck className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-amber-400">Fast Delivery</h3>
              <p className="text-gray-400 leading-relaxed">Quick and reliable shipping across Nigeria. Your order, our priority.</p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-slate-900/50 border border-amber-900/20 hover:border-amber-700/40 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10">
              <div className="w-24 h-24 bg-gradient-to-br from-amber-600 to-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-amber-500/40 group-hover:scale-110 transition-transform">
                <CreditCard className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-amber-400">Secure Payment</h3>
              <p className="text-gray-400 leading-relaxed">Safe and secure payment options. Shop with complete confidence.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section with Luxury Feel */}
      <section className="bg-gradient-to-b from-slate-950 to-black text-white py-24 border-t border-amber-900/20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Sparkles className="w-12 h-12 text-amber-500 mx-auto mb-6" />
          <h2 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500 bg-clip-text text-transparent">
              Join Our Exclusive Circle
            </span>
          </h2>
          <p className="text-xl mb-10 text-gray-400">Subscribe to get special offers, new arrivals, and VIP access</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-8 py-5 rounded-xl bg-slate-900/50 border border-amber-900/30 text-gray-300 text-lg placeholder-gray-500 focus:outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/50 transition-all"
            />
            <button className="px-10 py-5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 font-bold text-lg hover:from-amber-500 hover:to-amber-400 transition-all shadow-lg shadow-amber-500/40 hover:shadow-amber-500/60 hover:scale-105">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;