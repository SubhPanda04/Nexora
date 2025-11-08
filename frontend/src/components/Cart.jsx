import { useState, useEffect } from 'react';
import axios from 'axios';

const Cart = ({ onCheckout, refreshTrigger }) => {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCart();
  }, [refreshTrigger]);

  const fetchCart = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Cart: Fetching cart data...');
      const baseURL = process.env.NODE_ENV === 'production'
        ? '' 
        : 'http://localhost:5000';
      const response = await axios.get(`${baseURL}/api/cart`);
      console.log('Cart: Received cart data:', response.data);
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
      setError('Failed to load cart. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (productId) => {
    try {
      const baseURL = process.env.NODE_ENV === 'production'
        ? '' // Use relative URLs in production (same domain)
        : 'http://localhost:5000';
      await axios.delete(`${baseURL}/api/cart/${productId}`);
      fetchCart();
    } catch (error) {
      console.error('Error removing item:', error);
      alert('Failed to remove item from cart. Please try again.');
    }
  };

  const updateQuantity = async (productId, newQty) => {
    if (newQty <= 0) {
      removeItem(productId);
      return;
    }
    try {
      const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
      await axios.delete(`${baseURL}/api/cart/${productId}`);
      await new Promise(resolve => setTimeout(resolve, 100));
      await axios.post(`${baseURL}/api/cart`, { productId, qty: newQty });
      fetchCart();
    } catch (error) {
      console.error('Error updating quantity:', error);
      alert('Failed to update quantity. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Shopping Cart</h2>
        <p className="text-gray-500">Loading cart...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Shopping Cart</h2>
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={fetchCart}
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-thin text-slate-900 tracking-tight">Shopping Cart</h2>
        <p className="text-sm text-slate-500 tracking-wide uppercase">
          {cart.items.length} {cart.items.length === 1 ? 'item' : 'items'} selected
        </p>
      </div>
      {cart.items.length === 0 ? (
        <div className="text-center py-16 space-y-3">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <p className="text-slate-400 text-lg font-light">Your cart awaits discovery</p>
          <p className="text-xs text-slate-500 tracking-widest uppercase">Explore our collection</p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {cart.items.map(item => (
              <div key={item.productId} className="group relative bg-white border border-slate-200 rounded-xl p-6 hover:border-slate-300 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="text-xl font-light text-slate-900 mb-2">{item.name}</h4>
                    <div className="flex items-center space-x-4">
                      <span className="text-lg font-thin text-slate-900">${item.price.toFixed(2)}</span>
                      <span className="text-sm text-slate-500">×</span>
                      <span className="text-lg font-thin text-slate-900">{item.quantity}</span>
                      <span className="text-sm text-slate-500">=</span>
                      <span className="text-lg font-medium text-slate-900">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center text-slate-400 hover:bg-slate-50 transition-colors duration-200 text-xl font-normal rounded"
                    >
                      −
                    </button>
                    <span className="px-3 py-1 text-sm font-medium text-slate-900 bg-slate-100 rounded min-w-[2rem] text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center text-white hover:bg-slate-50 transition-colors duration-200 text-xl font-normal rounded"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="text-white hover:text-slate-600 transition-colors duration-200 p-2 hover:bg-slate-50 rounded-lg"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-slate-200 pt-8 space-y-6">
            <div className="flex justify-between items-baseline">
              <span className="text-3xl font-thin text-slate-900">Total</span>
              <div className="text-right">
                <span className="text-3xl font-thin text-slate-900">${cart.total.toFixed(2)}</span>
                <p className="text-xs text-slate-500 tracking-widest uppercase mt-1">USD</p>
              </div>
            </div>
            <button
              onClick={() => onCheckout(cart.items)}
              className="w-full bg-slate-900 text-white py-4 px-8 rounded-lg hover:bg-slate-800 transition-all duration-300 text-sm font-medium tracking-wide hover:shadow-xl hover:shadow-slate-900/25"
            >
              Proceed to Checkout →
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;