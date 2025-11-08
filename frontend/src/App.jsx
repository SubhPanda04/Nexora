import { useState } from 'react';
import Products from './components/Products';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import axios from 'axios';
import './App.css';

axios.defaults.baseURL = 'http://localhost:5000';

function App() {
  const [showCheckout, setShowCheckout] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [receipt, setReceipt] = useState(null);
  const [cartRefresh, setCartRefresh] = useState(0);

  const handleAddToCart = async (productId) => {
    try {
      console.log('App: Adding product to cart:', productId);
      const response = await axios.post('http://localhost:5000/api/cart', { productId });
      console.log('App: Cart response:', response.data);
      setCartRefresh(prev => prev + 1);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add item to cart. Please try again.');
    }
  };

  const handleCheckout = (items) => {
    setCartItems(items);
    setShowCheckout(true);
  };

  const handleReceipt = (receiptData) => {
    setReceipt(receiptData);
  };

  const closeCheckout = () => {
    setShowCheckout(false);
    setReceipt(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white w-full">
      <header className="border-b border-slate-200/60 backdrop-blur-sm bg-white/80 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-8">
            <div>
              <h1 className="text-3xl font-thin text-slate-900 tracking-tight">Nexora</h1>
              <p className="text-xs text-slate-500 mt-1 tracking-widest uppercase">Curated Collection</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-slate-600 font-light">Premium Experience</div>
            </div>
          </div>
        </div>
      </header>
      <main className="w-full px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 w-full min-h-[600px]">
          <div className="flex flex-col">
            <Products onAddToCart={handleAddToCart} />
          </div>
          <div className="flex flex-col">
            <Cart onCheckout={handleCheckout} refreshTrigger={cartRefresh} />
          </div>
        </div>
        {showCheckout && (
          <Checkout
            cartItems={cartItems}
            onClose={closeCheckout}
            onReceipt={handleReceipt}
          />
        )}
      </main>
    </div>
  );
}

export default App;
