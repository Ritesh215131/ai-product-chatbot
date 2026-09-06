const dotenv = require('dotenv');
dotenv.config();

const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const productStore = require('./services/productStore');
const llmService = require('./services/llmService');

// Initialize express
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database (Dual-mode: MongoDB or Resilient In-Memory Repository)
connectDB();

// Middleware
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logger for development
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log(`[API] ${req.method} ${req.originalUrl}`);
    next();
  });
}

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/chat', require('./routes/chatRoutes'));
app.use('/api/compare', require('./routes/compareRoutes'));

// Health check endpoint
app.get('/api/health', async (req, res) => {
  const stats = await productStore.getStats();
  const aiStatus = (llmService && typeof llmService.getStatus === 'function') 
    ? llmService.getStatus() 
    : { isRealLLM: false, name: 'Local Explainable AI' };
  res.status(200).json({
    status: 'online',
    service: 'ProductAI — Intelligent AI Product Recommendation & Shopping Assistant',
    version: '1.0.0',
    mode: 'Dual-Mode Production Ready',
    aiEngine: {
      status: 'active',
      hasExternalLLM: Boolean(aiStatus.isRealLLM),
      provider: aiStatus.name || 'Local Explainable Multi-Attribute AI Engine',
      model: aiStatus.model || null
    },
    database: {
      isMongooseConnected: productStore.isMongooseConnected,
      totalLoadedProducts: stats.totalProducts,
      categories: stats.categories
    },
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Serve static frontend in production (Single Unified Service for Render / Production)
const frontendDistPath = path.join(__dirname, '../../frontend/dist');

if (fs.existsSync(frontendDistPath)) {
  app.use(express.static(frontendDistPath));

  // Catch-all route for Single Page Application routing (excluding API routes)
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.join(frontendDistPath, 'index.html'));
  });
} else {
  // Root welcome if running API standalone
  app.get('/', (req, res) => {
    res.send('ProductAI API Server is running. Access /api/health for system status.');
  });
}

// Global 404 Handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `API endpoint not found: ${req.method} ${req.originalUrl}`
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Server Error]', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// Start listening
app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(` ProductAI Backend Server Running on Port ${PORT}`);
  console.log(` Health check: http://localhost:${PORT}/api/health`);
  console.log(` Mode: ${process.env.NODE_ENV || 'development'}`);
  console.log(`=======================================================`);
});
