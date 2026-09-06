const mongoose = require('mongoose');
const productStore = require('../services/productStore');

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/productai';

  try {
    // Attempt Mongoose connection with a quick 2-second timeout
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2000,
      connectTimeoutMS: 2000
    });

    console.log(`[Database] MongoDB connected successfully to ${uri}`);
    productStore.setMongooseConnected(true);
  } catch (err) {
    console.warn(`[Database] MongoDB connection not available: ${err.message}`);
    console.log(`[Database] Running in Zero-Config Dual Mode: Using resilient in-memory ProductAI repository.`);
    console.log(`[Database] All product queries, AI searches, comparisons, and demo auth will work 100% out of the box!`);
    productStore.setMongooseConnected(false);
  }
};

module.exports = connectDB;
