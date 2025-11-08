import { useState, useEffect } from 'react';
import axios from 'axios';

const Products = ({ onAddToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      console.log('Adding product to cart:', productId);
      await onAddToCart(productId);
      console.log('Product added successfully');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add item to cart. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="products">
        <h2>Products</h2>
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="products">
        <h2>Products</h2>
        <p className="error">{error}</p>
        <button onClick={fetchProducts}>Retry</button>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-thin text-slate-900 tracking-tight">Products</h2>
        <p className="text-sm text-slate-500 tracking-wide uppercase">Handpicked Selection</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 flex-1">
        {products.map(product => (
          <div key={product.id} className="group relative flex-1">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-100 to-slate-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative bg-white border border-slate-200/60 rounded-xl p-8 hover:border-slate-300/80 transition-all duration-300 hover:shadow-lg hover:shadow-slate-200/50 h-full flex flex-col">
              <div className="space-y-4 flex-1">
                <div className="space-y-1">
                  <h3 className="text-xl font-light text-slate-900 group-hover:text-slate-700 transition-colors duration-300">{product.name}</h3>
                  <div className="w-8 h-0.5 bg-slate-300 group-hover:bg-slate-400 transition-colors duration-300"></div>
                </div>
                <div className="flex items-baseline space-x-1">
                  <span className="text-2xl font-thin text-slate-900">${product.price.toFixed(2)}</span>
                  <span className="text-xs text-slate-400 tracking-widest uppercase">USD</span>
                </div>
              </div>
              <button
                onClick={() => handleAddToCart(product.id)}
                className="w-full bg-slate-900 text-white py-3.5 px-6 rounded-lg hover:bg-slate-800 transition-all duration-300 text-sm font-medium tracking-wide hover:shadow-lg hover:shadow-slate-900/25 mt-4"
              >
                Add to Cart →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;