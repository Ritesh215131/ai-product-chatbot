const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  getCategories,
  getBrands,
  getSavedProducts,
  getRecentlyViewed
} = require('../controllers/productController');
const { protect, optionalAuth } = require('../middleware/authMiddleware');

router.get('/', getProducts);
router.get('/meta/categories', getCategories);
router.get('/meta/brands', getBrands);
router.get('/user/saved', protect, getSavedProducts);
router.get('/user/recently-viewed', protect, getRecentlyViewed);
router.get('/:id', optionalAuth, getProductById);

module.exports = router;
