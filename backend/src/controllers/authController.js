const userStore = require('../services/userStore');

// @desc    Register a new user
// @route   POST /api/auth/register
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and password.'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long.'
      });
    }

    const user = await userStore.register({ name, email, password });
    const token = userStore.generateToken(user);

    res.status(201).json({
      success: true,
      message: 'User registered successfully.',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        savedProducts: user.savedProducts,
        preferences: user.preferences
      }
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// @desc    User Login
// @route   POST /api/auth/login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password.'
      });
    }

    const user = await userStore.login(email, password);
    const token = userStore.generateToken(user);

    res.status(200).json({
      success: true,
      message: 'Login successful.',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        savedProducts: user.savedProducts,
        preferences: user.preferences
      }
    });
  } catch (err) {
    res.status(401).json({
      success: false,
      message: err.message
    });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/profile
const getProfile = async (req, res) => {
  try {
    const user = await userStore.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        savedProducts: user.savedProducts,
        recentlyViewed: user.recentlyViewed,
        preferences: user.preferences,
        createdAt: user.createdAt
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Update user preferences & profile
// @route   PUT /api/auth/profile
const updateProfile = async (req, res) => {
  try {
    const { name, avatar, preferences } = req.body;
    const user = await userStore.updateProfile(req.user.id, { name, avatar, preferences });

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully.',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        savedProducts: user.savedProducts,
        preferences: user.preferences
      }
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Toggle Save/Wishlist product
// @route   POST /api/auth/save-product/:id
const toggleSaveProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await userStore.toggleSaveProduct(req.user.id, id);

    res.status(200).json({
      success: true,
      isSaved: result.isSaved,
      savedProducts: result.savedProducts,
      message: result.isSaved ? 'Product saved to wishlist.' : 'Product removed from wishlist.'
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

module.exports = {
  register,
  login,
  getProfile,
  updateProfile,
  toggleSaveProduct
};
