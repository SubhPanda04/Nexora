const express = require('express');
const cors = require('cors');
const axios = require('axios');
const connectDB = require('./config/database');
const Product = require('./models/Product');
const Cart = require('./models/Cart');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


connectDB();

const seedProductsFromAPI = async () => {
  try {
    const count = await Product.countDocuments();
    if (count === 0) {
      console.log('Fetching products from Fake Store API...');
      const response = await axios.get('https://fakestoreapi.com/products?limit=8');
      const apiProducts = response.data.map(product => ({
        id: product.id,
        name: product.title,
        price: product.price,
      }));

      await Product.insertMany(apiProducts);
      console.log('Products seeded from Fake Store API');
    }
  } catch (error) {
    console.error('Error seeding products from API:', error);
    const mockProducts = [
      { id: 1, name: 'Laptop', price: 999.99 },
      { id: 2, name: 'Smartphone', price: 699.99 },
      { id: 3, name: 'Headphones', price: 199.99 },
      { id: 4, name: 'Tablet', price: 499.99 },
      { id: 5, name: 'Smartwatch', price: 299.99 },
      { id: 6, name: 'Keyboard', price: 89.99 },
      { id: 7, name: 'Mouse', price: 49.99 },
      { id: 8, name: 'Monitor', price: 299.99 },
    ];
    await Product.insertMany(mockProducts);
    console.log('Products seeded with fallback mock data');
  }
};

seedProductsFromAPI();

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    if (!products || products.length === 0) {
      return res.status(404).json({ error: 'No products found' });
    }
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.post('/api/cart', async (req, res) => {
  try {
    const { productId, qty = 1 } = req.body;

    if (!productId || typeof productId !== 'number' || qty < 1) {
      return res.status(400).json({ error: 'Invalid product ID or quantity' });
    }

    const product = await Product.findOne({ id: productId });
    if (!product) return res.status(404).json({ error: 'Product not found' });

    let cart = await Cart.findOne({ userId: 'demo' });
    if (!cart) {
      cart = new Cart({ userId: 'demo', items: [], total: 0 });
    }

    const existingItemIndex = cart.items.findIndex(item => item.productId === productId);
    if (existingItemIndex !== -1) {
      cart.items[existingItemIndex].quantity += qty;
    } else {
      cart.items.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: qty,
      });
    }

    cart.total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    await cart.save();
    res.json({ items: cart.items, total: cart.total });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
});

app.delete('/api/cart/:id', async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    if (isNaN(productId)) {
      return res.status(400).json({ error: 'Invalid product ID' });
    }

    let cart = await Cart.findOne({ userId: 'demo' });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    const itemExists = cart.items.some(item => item.productId === productId);
    if (!itemExists) {
      return res.status(404).json({ error: 'Item not found in cart' });
    }

    cart.items = cart.items.filter(item => item.productId !== productId);
    cart.total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    await cart.save();
    res.json({ items: cart.items, total: cart.total });
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({ error: 'Failed to remove item from cart' });
  }
});

app.get('/api/cart', async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: 'demo' });
    if (!cart) {
      cart = new Cart({ userId: 'demo', items: [], total: 0 });
      await cart.save();
    }
    res.json({ items: cart.items, total: cart.total });
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
});

app.post('/api/checkout', async (req, res) => {
  try {
    const { cartItems, name, email } = req.body;

    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ error: 'Cart items are required' });
    }

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const receipt = {
      orderId: Math.random().toString(36).substr(2, 9).toUpperCase(),
      customer: { name, email },
      items: cartItems,
      total,
      timestamp: new Date().toISOString(),
    };

    await Cart.findOneAndUpdate({ userId: 'demo' }, { items: [], total: 0 });

    res.json(receipt);
  } catch (error) {
    console.error('Error during checkout:', error);
    res.status(500).json({ error: 'Checkout failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});