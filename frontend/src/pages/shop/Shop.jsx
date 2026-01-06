import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import API from '../../utils/api';
import ProductCard from '../../components/product/ProductCard';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    search: '',
    minPrice: '',
    maxPrice: '',
  });

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.category) params.append('category', filters.category);
      if (filters.search) params.append('search', filters.search);
      if (filters.minPrice) params.append('minPrice', filters.minPrice);
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);

      const response = await API.get(`/products?${params.toString()}`);
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Shop</h1>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Filters</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">All Categories</option>
              <option value="mens-fashion">Men's Fashion</option>
              <option value="football-jerseys">Football Jerseys</option>
              <option value="football-boots">Football Boots</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Search</label>
            <input
              type="text"
              placeholder="Search products..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Min Price</label>
            <input
              type="number"
              placeholder="0"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange('minPrice', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Max Price</label>
            <input
              type="number"
              placeholder="100000"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="text-center py-12">Loading products...</div>
      ) : products.length === 0 ? (
        <div className="text-center py-12 text-gray-600">No products found</div>
      ) : (
        <>
          <p className="text-gray-600 mb-4">{products.length} products found</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Shop;