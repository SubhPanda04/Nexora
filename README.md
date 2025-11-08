# 🛒 Vibe Commerce - Full-Stack E-Commerce Shopping Cart

A modern, professional full-stack e-commerce shopping cart application built with React, Node.js, Express, and MongoDB. Features a luxury minimalist design with complete cart functionality.

![Vibe Commerce](https://img.shields.io/badge/Vibe-Commerce-000000?style=for-the-badge&logo=react&logoColor=white)
![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=flat-square&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-20.17.0-339933?style=flat-square&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css)

## ✨ Features

- **🛍️ Complete Shopping Cart**: Add, remove, and update item quantities
- **💳 Mock Checkout**: Professional checkout flow with receipt generation
- **📱 Responsive Design**: Mobile-first design that works on all devices
- **🎨 Luxury UI**: Minimalist design with professional aesthetics
- **🔄 Real-time Updates**: Live cart total calculation and item management
- **🛡️ Error Handling**: Comprehensive error handling and loading states
- **📦 API Integration**: Fake Store API with fallback mock data
- **💾 Database Persistence**: MongoDB storage for cart data

## 🚀 Tech Stack

### Frontend
- **React 19** - Modern React with hooks and functional components
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework for Node.js
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

## 📁 Project Structure

```
vibe-commerce/
├── backend/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── models/
│   │   ├── Product.js           # Product schema
│   │   └── Cart.js              # Cart schema
│   ├── server.js                # Express server & API routes
│   ├── package.json
│   └── .env                     # Environment variables
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Products.jsx     # Product grid component
│   │   │   ├── Cart.jsx         # Shopping cart component
│   │   │   └── Checkout.jsx     # Checkout modal component
│   │   ├── App.jsx              # Main app component
│   │   ├── App.css              # Tailwind styles
│   │   └── main.jsx             # App entry point
│   ├── package.json
│   └── postcss.config.mjs       # Tailwind config
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- **Node.js** (v20.17.0 or higher)
- **MongoDB Atlas** account (for cloud database)
- **npm** or **yarn**
- **GitHub** account (for deployment)

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Configuration:**
   Create a `.env` file in the backend directory:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce
   PORT=5000
   NODE_ENV=development
   ```

4. **Start the backend server:**
   ```bash
   npm start
   ```
   Server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Configuration:**
   Create a `.env` file in the frontend directory:
   ```env
   VITE_API_BASE_URL=http://localhost:5000
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

## 🎯 Usage

1. **View Products**: Browse the product grid on the left side
2. **Add to Cart**: Click "Add to Cart" on any product
3. **Manage Cart**: Use quantity controls (+/-) or remove items on the right side
4. **Checkout**: Click "Proceed to Checkout" to complete your order
5. **Receipt**: View your order confirmation and receipt

## 📡 API Endpoints

### Products
- `GET /api/products` - Fetch all products

### Cart Management
- `GET /api/cart` - Get current cart items and total
- `POST /api/cart` - Add item to cart (body: `{ productId, qty }`)
- `DELETE /api/cart/:id` - Remove item from cart

### Checkout
- `POST /api/checkout` - Process checkout (body: `{ cartItems, name, email }`)

## 🎨 Design Philosophy

- **Minimalism**: Clean lines, generous whitespace, no clutter
- **Professional**: Consistent typography, proper color hierarchy
- **Luxury**: Subtle gradients, glass effects, premium spacing
- **Responsive**: Mobile-first approach with perfect breakpoints
- **Accessible**: Clear labels, proper contrast, intuitive interactions

## 🔧 Development

### Available Scripts

**Backend:**
```bash
npm start      # Start production server
npm run dev    # Start development server with nodemon
```

**Frontend:**
```bash
npm run dev    # Start development server
npm run build  # Build for production
npm run preview # Preview production build
```

### Environment Variables

**Backend (.env):**
```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

## 🚀 Deployment

### Database Setup (MongoDB Atlas)

1. **Create MongoDB Atlas Account:**
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create a free cluster
   - Set up database user and whitelist IP (0.0.0.0/0 for cloud deployments)

2. **Get Connection String:**
   - Format: `mongodb+srv://username:password@cluster.mongodb.net/ecommerce`

### Backend Deployment (Render)

1. **Create Render Account:**
   - Go to [render.com](https://render.com)
   - Connect your GitHub repository

2. **Deploy Backend Service:**
   - **Service Type:** Web Service
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Root Directory:** `backend`

3. **Environment Variables:**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce
   NODE_ENV=production
   PORT=10000
   ```

4. **Get Backend URL:**
   - Format: `https://your-app-name.onrender.com`

### Frontend Deployment (Vercel)

1. **Create Vercel Account:**
   - Go to [vercel.com](https://vercel.com)
   - Connect your GitHub repository

2. **Deploy Frontend:**
   - **Framework Preset:** Vite
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

3. **Environment Variables:**
   ```
   VITE_API_BASE_URL=https://your-render-backend-url.onrender.com
   ```

### Final Steps

1. **Update Environment Variables:**
   - Replace `your-render-backend-url.onrender.com` in frontend `.env` with your actual Render URL

2. **Test Deployments:**
   - Test backend API endpoints directly
   - Test frontend with backend integration
   - Verify CORS is working properly

3. **Domain Setup (Optional):**
   - Add custom domains to both Vercel and Render
   - Update CORS origins if using custom domains

