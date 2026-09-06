const productStore = require('../services/productStore');
const userStore = require('../services/userStore');

// @desc    Get all products with filtering & sorting
// @route   GET /api/products
const getProducts = async (req, res) => {
  try {
    let products = await productStore.getAll(req.query);

    // If a search query is provided and 0 local catalog products match, search live via Gemini!
    if (products.length === 0 && req.query.search && req.query.search.trim().length > 1) {
      try {
        const llmService = require('../services/llmService');
        const discovered = await llmService.searchProductsWithGemini(req.query.search.trim());
        if (discovered && discovered.length > 0) {
          products = discovered;
        }
      } catch (geminiErr) {
        console.warn('[ProductController] Gemini search fallback notice:', geminiErr.message);
      }
    }

    res.status(200).json({
      success: true,
      count: products.length,
      products
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productStore.getById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found.'
      });
    }

    // If authenticated, record to recently viewed
    if (req.user && req.user.id) {
      await userStore.addRecentlyViewed(req.user.id, product.id);
    }

    res.status(200).json({
      success: true,
      product
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Get all product categories
// @route   GET /api/products/meta/categories
const getCategories = async (req, res) => {
  try {
    const categories = await productStore.getCategories();
    res.status(200).json({ success: true, categories });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Get brands (optionally filtered by category)
// @route   GET /api/products/meta/brands
const getBrands = async (req, res) => {
  try {
    const { category } = req.query;
    const brands = await productStore.getBrands(category);
    res.status(200).json({ success: true, brands });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Get user's saved wishlist products
// @route   GET /api/products/user/saved
const getSavedProducts = async (req, res) => {
  try {
    const user = await userStore.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found.' });

    const products = await productStore.getByIds(user.savedProducts || []);
    res.status(200).json({ success: true, count: products.length, products });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Get user's recently viewed products
// @route   GET /api/products/user/recently-viewed
const getRecentlyViewed = async (req, res) => {
  try {
    const user = await userStore.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found.' });

    const products = await productStore.getByIds(user.recentlyViewed || []);
    res.status(200).json({ success: true, count: products.length, products });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  getCategories,
  getBrands,
  getSavedProducts,
  getRecentlyViewed
};
