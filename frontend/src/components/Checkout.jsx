import { useState } from 'react';
import axios from 'axios';

const Checkout = ({ cartItems, onClose, onReceipt }) => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [receipt, setReceipt] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/checkout', {
        cartItems,
        ...formData,
      });
      setReceipt(response.data);
      onReceipt(response.data);
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('Checkout failed. Please try again.');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (receipt) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white w-full max-w-lg shadow-2xl shadow-slate-900/10 rounded-2xl max-h-[90vh] overflow-y-auto">
          <div className="p-10">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-thin text-slate-900 mb-2">Order Confirmed</h2>
              <p className="text-sm text-slate-500 tracking-wide uppercase">Thank you for your purchase</p>
            </div>

            <div className="space-y-6 mb-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-slate-400 tracking-widest uppercase">Order ID</p>
                  <p className="font-mono text-slate-900 text-sm">{receipt.orderId}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-slate-400 tracking-widest uppercase">Customer</p>
                  <p className="text-slate-900 text-sm">{receipt.customer.name}</p>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-6 mb-8">
              <h3 className="text-sm font-medium text-slate-900 mb-4 tracking-wide uppercase">Order Summary</h3>
              <div className="space-y-3">
                {receipt.items.map(item => (
                  <div key={item.productId} className="flex justify-between items-center">
                    <div className="flex-1">
                      <p className="text-slate-900 font-light">{item.name}</p>
                      <p className="text-xs text-slate-500">Quantity: {item.quantity}</p>
                    </div>
                    <p className="text-slate-900 font-light">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-slate-200 mt-6 pt-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-lg font-thin text-slate-900">Total</span>
                  <div className="text-right">
                    <span className="text-2xl font-thin text-slate-900">${receipt.total.toFixed(2)}</span>
                    <p className="text-xs text-slate-500 tracking-widest uppercase">USD</p>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full bg-slate-900 text-white py-4 px-8 rounded-xl hover:bg-slate-800 transition-all duration-300 text-sm font-medium tracking-wide hover:shadow-xl hover:shadow-slate-900/25"
            >
              Continue Shopping →
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-lg shadow-2xl shadow-slate-900/10 rounded-2xl">
        <div className="p-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-thin text-slate-900 mb-2">Checkout</h2>
            <p className="text-sm text-slate-500 tracking-widest uppercase">Complete your purchase</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-3 tracking-wide uppercase">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-0 py-3 border-0 border-b border-slate-200 focus:outline-none focus:ring-0 focus:border-slate-900 transition-all duration-300 text-black placeholder:text-slate-300"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-3 tracking-wide uppercase">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-0 py-3 border-0 border-b border-slate-200 focus:outline-none focus:ring-0 focus:border-slate-900 transition-all duration-300 text-black placeholder:text-slate-300"
                  placeholder="Enter your email address"
                />
              </div>
            </div>
            <div className="pt-6 space-y-4">
              <button
                type="submit"
                className="w-full bg-slate-900 text-white py-4 px-8 rounded-xl hover:bg-slate-800 transition-all duration-300 text-sm font-medium tracking-wide hover:shadow-xl hover:shadow-slate-900/25"
              >
                Complete Order →
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-full bg-slate-900 text-white py-4 px-8 rounded-xl hover:bg-slate-800 transition-all duration-300 text-sm font-medium tracking-wide hover:shadow-xl hover:shadow-slate-900/25"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;