import React, { useState, useEffect } from 'react';
import API from '../../utils/api';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'mens-fashion',
    price: '',
    description: '',
    images: [''],
    brand: '',
    team: '',
    season: '',
    isJersey: false,
    sizeStock: { S: 0, M: 0, L: 0, XL: 0, XXL: 0 },
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await API.get('/products');
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingProduct) {
        await API.put(`/products/${editingProduct._id}`, formData);
        alert('Product updated successfully!');
      } else {
        await API.post('/products', formData);
        alert('Product created successfully!');
      }

      setShowModal(false);
      setEditingProduct(null);
      resetForm();
      fetchProducts();
    } catch (error) {
      alert(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      await API.delete(`/products/${id}`);
      alert('Product deleted successfully!');
      fetchProducts();
    } catch (error) {
      alert('Delete failed');
    }
  };

  const openModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        category: product.category,
        price: product.price,
        description: product.description,
        images: product.images,
        brand: product.brand || '',
        team: product.team || '',
        season: product.season || '',
        isJersey: product.isJersey,
        sizeStock: product.sizeStock,
      });
    } else {
      resetForm();
    }
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: 'mens-fashion',
      price: '',
      description: '',
      images: [''],
      brand: '',
      team: '',
      season: '',
      isJersey: false,
      sizeStock: { S: 0, M: 0, L: 0, XL: 0, XXL: 0 },
    });
    setEditingProduct(null);
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Manage Products</h1>
        <button
          onClick={() => openModal()}
          className="bg-greed-green text-white px-6 py-3 rounded-lg font-bold hover:bg-green-900"
        >
          + Add Product
        </button>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left py-4 px-6">Product</th>
              <th className="text-left py-4 px-6">Category</th>
              <th className="text-left py-4 px-6">Price</th>
              <th className="text-left py-4 px-6">Stock</th>
              <th className="text-left py-4 px-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-b hover:bg-gray-50">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <span className="font-medium">{product.name}</span>
                  </div>
                </td>
                <td className="py-4 px-6">{product.category}</td>
                <td className="py-4 px-6 font-bold">₦{product.price.toLocaleString()}</td>
                <td className="py-4 px-6">
                  {Object.values(product.sizeStock).reduce((a, b) => a + b, 0)}
                </td>
                <td className="py-4 px-6">
                  <button
                    onClick={() => openModal(product)}
                    className="text-blue-600 hover:underline mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto p-8">
            <h2 className="text-3xl font-bold mb-6">
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-medium mb-2">Product Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-medium mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="mens-fashion">Men's Fashion</option>
                  <option value="football-jerseys">Football Jerseys</option>
                  <option value="football-boots">Football Boots</option>
                </select>
              </div>

              <div>
                <label className="block font-medium mb-2">Price (₦)</label>
                <input
                  type="number"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-medium mb-2">Description</label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-medium mb-2">Image URL</label>
                <input
                  type="url"
                  required
                  value={formData.images[0]}
                  onChange={(e) => setFormData({ ...formData, images: [e.target.value] })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div>
                <label className="block font-medium mb-2">Brand</label>
                <input
                  type="text"
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              {formData.category === 'football-jerseys' && (
                <>
                  <div>
                    <label className="block font-medium mb-2">Team</label>
                    <input
                      type="text"
                      value={formData.team}
                      onChange={(e) => setFormData({ ...formData, team: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block font-medium mb-2">Season</label>
                    <input
                      type="text"
                      value={formData.season}
                      onChange={(e) => setFormData({ ...formData, season: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      placeholder="e.g., 2023/24"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.isJersey}
                        onChange={(e) => setFormData({ ...formData, isJersey: e.target.checked })}
                      />
                      <span>Enable bulk size ordering</span>
                    </label>
                  </div>
                </>
              )}

              <div>
                <label className="block font-medium mb-2">Size Stock</label>
                <div className="grid grid-cols-5 gap-2">
                  {Object.keys(formData.sizeStock).map((size) => (
                    <div key={size}>
                      <label className="block text-sm mb-1">{size}</label>
                      <input
                        type="number"
                        min="0"
                        value={formData.sizeStock[size]}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            sizeStock: {
                              ...formData.sizeStock,
                              [size]: parseInt(e.target.value) || 0,
                            },
                          })
                        }
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-greed-green text-white py-3 rounded-lg font-bold hover:bg-green-900"
                >
                  {editingProduct ? 'Update Product' : 'Create Product'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;