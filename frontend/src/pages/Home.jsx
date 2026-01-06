import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../utils/api';
import ProductCard from '../components/product/ProductCard';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    fetchProducts();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-greed-green to-green-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to GREED</h1>
          <p className="text-xl mb-8">Premium Football Gear & Men's Fashion</p>
          <Link
            to="/shop"
            className="bg-white text-greed-green px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors inline-block"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
        
        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Categories */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Shop by Category</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/shop?category=mens-fashion" className="group">
              <div className="bg-white rounded-lg p-8 text-center hover:shadow-lg transition-shadow">
                <h3 className="text-2xl font-bold mb-2 group-hover:text-greed-green">Men's Fashion</h3>
                <p className="text-gray-600">Stylish clothing for modern men</p>
              </div>
            </Link>
            
            <Link to="/shop?category=football-jerseys" className="group">
              <div className="bg-white rounded-lg p-8 text-center hover:shadow-lg transition-shadow">
                <h3 className="text-2xl font-bold mb-2 group-hover:text-greed-green">Football Jerseys</h3>
                <p className="text-gray-600">Official and retro jerseys</p>
              </div>
            </Link>
            
            <Link to="/shop?category=football-boots" className="group">
              <div className="bg-white rounded-lg p-8 text-center hover:shadow-lg transition-shadow">
                <h3 className="text-2xl font-bold mb-2 group-hover:text-greed-green">Football Boots</h3>
                <p className="text-gray-600">Premium performance boots</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;