const jwt = require('jsonwebtoken');
const userStore = require('../services/userStore');

const protect = async (req, res, next) => {
  let token = null;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No authentication token provided.'
    });
  }

  try {
    const secret = process.env.JWT_SECRET || 'productai_super_secret_jwt_key_btech_2026';
    const decoded = jwt.verify(token, secret);

    const user = await userStore.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'The user belonging to this token no longer exists.'
      });
    }

    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      preferences: user.preferences
    };

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired authentication token.'
    });
  }
};

const optionalAuth = async (req, res, next) => {
  let token = null;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (token) {
    try {
      const secret = process.env.JWT_SECRET || 'productai_super_secret_jwt_key_btech_2026';
      const decoded = jwt.verify(token, secret);
      const user = await userStore.findById(decoded.id);
      if (user) {
        req.user = {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          preferences: user.preferences
        };
      }
    } catch (err) {
      // Ignore token failure for optional routes
    }
  }

  next();
};

module.exports = {
  protect,
  optionalAuth
};
