const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UserStore {
  constructor() {
    this.users = [];
    this.initDefaultUsers();
  }

  async initDefaultUsers() {
    const salt = await bcrypt.genSalt(10);
    const demoPassword = await bcrypt.hash('demo123', salt);

    this.users = [
      {
        id: 'user-demo-1',
        name: 'Aarav Sharma',
        email: 'demo@productai.com',
        password: demoPassword,
        role: 'user',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
        savedProducts: ['laptop-1', 'phone-1', 'audio-1'],
        recentlyViewed: ['laptop-1', 'phone-2'],
        preferences: {
          priority: 'performance', // 'performance', 'price', 'battery', 'balanced'
          preferredCategories: ['Laptops', 'Smartphones'],
          gamingInterest: true,
          budgetFocus: 'mid-range'
        },
        createdAt: new Date().toISOString()
      }
    ];
  }

  generateToken(user) {
    const secret = process.env.JWT_SECRET || 'productai_super_secret_jwt_key_btech_2026';
    return jwt.sign(
      { id: user.id, email: user.email, role: user.role, name: user.name },
      secret,
      { expiresIn: '7d' }
    );
  }

  async findByEmail(email) {
    if (!email) return null;
    const clean = email.toLowerCase().trim();
    return this.users.find(u => u.email.toLowerCase() === clean) || null;
  }

  async findById(id) {
    const user = this.users.find(u => u.id === id);
    return user || null;
  }

  async register({ name, email, password, role = 'user' }) {
    const existing = await this.findByEmail(email);
    if (existing) {
      throw new Error('An account with this email address already exists.');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      id: `user-${Date.now()}`,
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
      savedProducts: [],
      recentlyViewed: [],
      preferences: {
        priority: 'balanced',
        preferredCategories: [],
        gamingInterest: false,
        budgetFocus: 'mid-range'
      },
      createdAt: new Date().toISOString()
    };

    this.users.push(newUser);
    return newUser;
  }

  async login(email, password) {
    const user = await this.findByEmail(email);
    if (!user) {
      throw new Error('Invalid email or password.');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid email or password.');
    }

    return user;
  }

  async updateProfile(id, updateData) {
    const user = await this.findById(id);
    if (!user) throw new Error('User not found.');

    if (updateData.name) user.name = updateData.name;
    if (updateData.avatar) user.avatar = updateData.avatar;
    if (updateData.preferences) {
      user.preferences = {
        ...user.preferences,
        ...updateData.preferences
      };
    }

    return user;
  }

  async toggleSaveProduct(userId, productId) {
    const user = await this.findById(userId);
    if (!user) throw new Error('User not found.');

    user.savedProducts = user.savedProducts || [];
    const index = user.savedProducts.indexOf(productId);
    let isSaved = false;

    if (index > -1) {
      user.savedProducts.splice(index, 1);
      isSaved = false;
    } else {
      user.savedProducts.push(productId);
      isSaved = true;
    }

    return { savedProducts: user.savedProducts, isSaved };
  }

  async addRecentlyViewed(userId, productId) {
    const user = await this.findById(userId);
    if (!user) return [];

    user.recentlyViewed = user.recentlyViewed || [];
    user.recentlyViewed = user.recentlyViewed.filter(id => id !== productId);
    user.recentlyViewed.unshift(productId);

    // Keep top 10
    if (user.recentlyViewed.length > 10) {
      user.recentlyViewed = user.recentlyViewed.slice(0, 10);
    }

    return user.recentlyViewed;
  }

  async getAllUsers() {
    return this.users.map(u => ({
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role,
      savedCount: (u.savedProducts || []).length,
      createdAt: u.createdAt
    }));
  }
}

const userStore = new UserStore();
module.exports = userStore;
