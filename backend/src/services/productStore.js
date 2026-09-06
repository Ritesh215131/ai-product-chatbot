const productsSeed = require('../data/productsSeed');

class ProductStore {
  constructor() {
    // In-memory clone of seed data for resilient instant execution
    this.products = JSON.parse(JSON.stringify(productsSeed));
    this.isMongooseConnected = false;
  }

  setMongooseConnected(status) {
    this.isMongooseConnected = status;
  }

  // Get all products with multi-faceted filtering and sorting
  async getAll(filters = {}) {
    let result = [...this.products];

    const {
      category,
      brand,
      minPrice,
      maxPrice,
      minRating,
      search,
      sortBy = 'recommended',
      ram,
      storage
    } = filters;

    // Filter by Category
    if (category && category !== 'All') {
      result = result.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    // Filter by Brand
    if (brand && brand !== 'All') {
      result = result.filter(p => p.brand.toLowerCase() === brand.toLowerCase());
    }

    // Filter by Price range
    if (minPrice !== undefined && minPrice !== '') {
      const min = Number(minPrice);
      if (!isNaN(min)) result = result.filter(p => p.price >= min);
    }
    if (maxPrice !== undefined && maxPrice !== '') {
      const max = Number(maxPrice);
      if (!isNaN(max)) result = result.filter(p => p.price <= max);
    }

    // Filter by Rating
    if (minRating !== undefined && minRating !== '') {
      const rating = Number(minRating);
      if (!isNaN(rating)) result = result.filter(p => p.rating >= rating);
    }

    // Filter by RAM specification (e.g. 16GB)
    if (ram) {
      const ramPattern = new RegExp(ram, 'i');
      result = result.filter(p => {
        const specRam = p.specifications?.ram || '';
        return ramPattern.test(specRam);
      });
    }

    // Filter by Storage specification (e.g. 512GB)
    if (storage) {
      const storagePattern = new RegExp(storage, 'i');
      result = result.filter(p => {
        const specStorage = p.specifications?.storage || '';
        return storagePattern.test(specStorage);
      });
    }

    // Text search filter
    if (search && search.trim()) {
      const terms = search.toLowerCase().trim().split(/\s+/);
      result = result.filter(p => {
        const textToSearch = [
          p.name,
          p.brand,
          p.category,
          p.description,
          ...(p.targetPersonas || []),
          ...(p.features || []),
          JSON.stringify(p.specifications || {})
        ].join(' ').toLowerCase();

        return terms.every(term => textToSearch.includes(term));
      });
    }

    // Sorting
    if (sortBy === 'price_asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price_desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'popular') {
      result.sort((a, b) => b.reviews - a.reviews);
    } else {
      // Default: Value score + rating composite
      result.sort((a, b) => (b.valueScore * 0.6 + b.rating * 0.4) - (a.valueScore * 0.6 + a.rating * 0.4));
    }

    return result;
  }

  async getById(id) {
    return this.products.find(p => p.id === id || p._id === id) || null;
  }

  async getByIds(ids = []) {
    if (!Array.isArray(ids)) return [];
    return this.products.filter(p => ids.includes(p.id) || ids.includes(p._id));
  }

  async cacheDiscoveredProduct(product) {
    if (!product || !product.id) return null;
    const existing = this.products.find(p => p.id === product.id || p.name.toLowerCase() === product.name.toLowerCase());
    if (!existing) {
      this.products.unshift(product);
      return product;
    }
    return existing;
  }

  async cacheDiscoveredProducts(products = []) {
    if (!Array.isArray(products)) return [];
    const cached = [];
    for (const p of products) {
      const item = await this.cacheDiscoveredProduct(p);
      if (item) cached.push(item);
    }
    return cached;
  }

  async create(productData) {
    const newProduct = {
      ...productData,
      id: productData.id || `prod-${Date.now()}`,
      rating: productData.rating || 4.5,
      reviews: productData.reviews || 1,
      valueScore: productData.valueScore || 9.0,
      createdAt: new Date().toISOString()
    };
    this.products.unshift(newProduct);
    return newProduct;
  }

  async update(id, updateData) {
    const index = this.products.findIndex(p => p.id === id || p._id === id);
    if (index === -1) return null;

    this.products[index] = {
      ...this.products[index],
      ...updateData,
      updatedAt: new Date().toISOString()
    };
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex(p => p.id === id || p._id === id);
    if (index === -1) return false;
    this.products.splice(index, 1);
    return true;
  }

  async getCategories() {
    const categories = Array.from(new Set(this.products.map(p => p.category)));
    return categories;
  }

  async getBrands(category = null) {
    let prods = this.products;
    if (category && category !== 'All') {
      prods = prods.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }
    return Array.from(new Set(prods.map(p => p.brand)));
  }

  async getStats() {
    const totalProducts = this.products.length;
    const categoryCounts = {};
    let totalValue = 0;

    this.products.forEach(p => {
      categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
      totalValue += p.price;
    });

    const averagePrice = totalProducts > 0 ? Math.round(totalValue / totalProducts) : 0;

    return {
      totalProducts,
      categoryCounts,
      averagePrice,
      categories: Object.keys(categoryCounts)
    };
  }
}

// Export singleton instance
const productStore = new ProductStore();
module.exports = productStore;
