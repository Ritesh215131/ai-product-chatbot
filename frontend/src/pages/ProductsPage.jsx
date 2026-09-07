import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  Filter,
  SlidersHorizontal,
  Star,
  RotateCcw,
  Sparkles,
  Laptop,
  Smartphone,
  Headphones,
  Watch,
  Camera,
  Tablet,
  Monitor,
  Gamepad2,
  X
} from 'lucide-react';
import { productApi } from '../services/api';
import { ProductCard } from '../components/product/ProductCard';
import { Skeleton } from '../components/common/Skeleton';
import { CATEGORIES } from '../utils/constants';

export const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isAiSearch, setIsAiSearch] = useState(false);
  const [isAiGenerated, setIsAiGenerated] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [maxPrice, setMaxPrice] = useState(250000);
  const [minRating, setMinRating] = useState(0);
  const [selectedRam, setSelectedRam] = useState('');
  const [sortBy, setSortBy] = useState('recommended');
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  const AI_SUGGESTIONS = [
    '1.5 Ton 5-Star Split AC',
    'Marathon Running Shoes',
    'Espresso Coffee Maker',
    'Mechanical Gaming Keyboard',
    'Sony 65" 4K OLED TV',
    'Mirrorless 4K Camera'
  ];

  // Available brands dynamic computation
  const availableBrands = useMemo(() => {
    const prods = selectedCategory === 'All'
      ? products
      : products.filter(p => p.category === selectedCategory);
    return Array.from(new Set(prods.map(p => p.brand))).filter(Boolean);
  }, [products, selectedCategory]);

  const loadProducts = async (customParams = {}) => {
    setLoading(true);
    try {
      const activeAi = customParams.forceAiSearch !== undefined ? customParams.forceAiSearch : isAiSearch;
      const activeSearch = customParams.search !== undefined ? customParams.search : search;

      const data = await productApi.getProducts({
        category: selectedCategory,
        brand: selectedBrand,
        maxPrice,
        minRating,
        ram: selectedRam,
        search: activeSearch,
        sortBy,
        aiSearch: activeAi
      });
      setProducts(data.products || []);
      setIsAiGenerated(Boolean(data.isAiGenerated));
    } catch (err) {
      console.error('Failed to load products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [selectedCategory, selectedBrand, maxPrice, minRating, selectedRam, sortBy]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadProducts();
  };

  const handleQuickSearch = (term) => {
    setSearch(term);
    setSelectedCategory('All');
    setSelectedBrand('All');
    setIsAiSearch(true);
    loadProducts({ search: term, forceAiSearch: true });
  };

  const handleResetFilters = () => {
    setSearch('');
    setIsAiSearch(false);
    setIsAiGenerated(false);
    setSelectedCategory('All');
    setSelectedBrand('All');
    setMaxPrice(250000);
    setMinRating(0);
    setSelectedRam('');
    setSortBy('recommended');
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#f8fafc] dark:bg-[#09090b]">
      {/* Search & Action Bar */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-[#121215]/90 backdrop-blur-md p-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center gap-3">
          {/* Smart Search Bar */}
          <form onSubmit={handleSearchSubmit} className="relative flex-1 w-full flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search any product (e.g. '1.5 ton split AC', 'Nike Pegasus 41', 'Sony OLED TV')..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all"
              />
            </div>

            {/* AI Live Search Toggle */}
            <button
              type="button"
              onClick={() => {
                const nextAi = !isAiSearch;
                setIsAiSearch(nextAi);
                if (search.trim()) {
                  loadProducts({ forceAiSearch: nextAi });
                }
              }}
              className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all border shrink-0 ${
                isAiSearch
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-purple-500 shadow-md shadow-purple-500/20'
                  : 'bg-zinc-100 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700'
              }`}
              title="Search universal product catalog using real Google Gemini AI"
            >
              <Sparkles className={`w-3.5 h-3.5 ${isAiSearch ? 'animate-pulse text-amber-300' : 'text-purple-500'}`} />
              <span className="hidden sm:inline">{isAiSearch ? 'Gemini AI Active' : 'Gemini AI Search'}</span>
            </button>
          </form>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
            <button
              onClick={() => setShowFiltersMobile(prev => !prev)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-xs font-semibold text-zinc-800 dark:text-zinc-200 focus:outline-none focus:border-brand-500"
            >
              <option value="recommended">Sort: AI Value Index</option>
              <option value="rating">Sort: Highest Rated</option>
              <option value="popular">Sort: Most Popular</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* AI Quick Suggestion Chips */}
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto pt-2.5 pb-1 no-scrollbar text-xs">
          <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-purple-500" />
            AI Suggestions:
          </span>
          {AI_SUGGESTIONS.map((item) => (
            <button
              key={item}
              onClick={() => handleQuickSearch(item)}
              className="px-2.5 py-1 rounded-lg text-xs bg-purple-50 hover:bg-purple-100 dark:bg-purple-950/40 dark:hover:bg-purple-900/50 text-purple-700 dark:text-purple-300 font-medium whitespace-nowrap transition-colors border border-purple-200/60 dark:border-purple-800/50"
            >
              {item}
            </button>
          ))}
        </div>

        {/* Category Pill Scroller */}
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto pt-2 pb-1 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setSelectedBrand('All');
                setIsAiGenerated(false);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat && !isAiGenerated
                  ? 'bg-brand-600 text-white shadow-sm shadow-brand-500/20'
                  : 'bg-zinc-100 dark:bg-zinc-800/60 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Catalog Viewport */}
      <div className="flex-1 overflow-hidden flex max-w-7xl w-full mx-auto p-4 sm:p-6 gap-6">
        {/* Left Filter Sidebar */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-40 w-72 bg-white dark:bg-[#121215] lg:bg-transparent p-5 lg:p-0 rounded-2xl border-r lg:border-r-0 border-zinc-200 dark:border-zinc-800 overflow-y-auto shrink-0 transition-transform duration-300 ${
            showFiltersMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-zinc-200 dark:border-zinc-800">
            <h3 className="text-sm font-bold flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
              <SlidersHorizontal className="w-4 h-4 text-brand-500" />
              <span>Multi-Faceted Filters</span>
            </h3>
            <div className="flex items-center gap-1">
              <button
                onClick={handleResetFilters}
                className="p-1 rounded-lg text-zinc-400 hover:text-brand-500 transition-colors"
                title="Reset Filters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setShowFiltersMobile(false)}
                className="lg:hidden p-1 text-zinc-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {/* Price Budget Slider */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                <span>Max Budget</span>
                <span className="text-brand-600 dark:text-brand-400">
                  ₹{maxPrice.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min="5000"
                max="250000"
                step="5000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-brand-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-zinc-400 mt-1">
                <span>₹5,000</span>
                <span>₹2,50,000</span>
              </div>
            </div>

            {/* Brand Filter */}
            {availableBrands.length > 0 && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                  Brand
                </label>
                <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
                  <button
                    onClick={() => setSelectedBrand('All')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                      selectedBrand === 'All'
                        ? 'bg-brand-600 text-white'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                    }`}
                  >
                    All Brands
                  </button>
                  {availableBrands.map(b => (
                    <button
                      key={b}
                      onClick={() => setSelectedBrand(b)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                        selectedBrand === b
                          ? 'bg-brand-600 text-white'
                          : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Minimum Rating */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                Minimum Rating
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {[0, 4.0, 4.5].map((val) => (
                  <button
                    key={val}
                    onClick={() => setMinRating(val)}
                    className={`flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                      minRating === val
                        ? 'bg-brand-50 dark:bg-brand-950/60 border-brand-500 text-brand-600 dark:text-brand-400'
                        : 'border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                    }`}
                  >
                    {val === 0 ? 'Any' : (
                      <>
                        <Star className="w-3 h-3 fill-current text-amber-500" />
                        <span>{val}+</span>
                      </>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* RAM Filter */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                Memory (RAM)
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {['', '8GB', '16GB', '32GB'].map((ram) => (
                  <button
                    key={ram}
                    onClick={() => setSelectedRam(ram)}
                    className={`py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                      selectedRam === ram
                        ? 'bg-brand-50 dark:bg-brand-950/60 border-brand-500 text-brand-600 dark:text-brand-400'
                        : 'border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                    }`}
                  >
                    {ram || 'Any'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Right Product Grid */}
        <div className="flex-1 overflow-y-auto pr-1">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map(n => (
                <div key={n} className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 space-y-3">
                  <Skeleton className="aspect-[4/3] w-full" />
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-8 w-full" />
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-14 h-14 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 mb-4">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-200 mb-2">
                {search ? `No catalog items found for "${search}"` : 'No products match your criteria'}
              </h3>
              <p className="text-sm text-zinc-500 max-w-md mb-6">
                {search
                  ? `Search the universal market for "${search}" using Google Gemini AI with real-time Indian pricing & specs.`
                  : 'Try broadening your filters, increasing your budget, or search any product via Gemini AI.'}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {search && (
                  <button
                    onClick={() => {
                      setIsAiSearch(true);
                      loadProducts({ forceAiSearch: true });
                    }}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold transition-all shadow-lg shadow-purple-500/25"
                  >
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Search Market for "{search}" via Gemini AI</span>
                  </button>
                )}
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2.5 rounded-xl bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-bold transition-all"
                >
                  Reset All Filters
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* AI Discovered Products Notification Banner */}
              {isAiGenerated && (
                <div className="mb-4 p-3.5 rounded-2xl bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-brand-500/10 border border-purple-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-sm">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                      <Sparkles className="w-4 h-4 text-amber-300" />
                    </div>
                    <div>
                      <div className="font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                        <span>Real-Time Market Discovery by Google Gemini AI</span>
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      </div>
                      <span className="text-zinc-500 dark:text-zinc-400">
                        Showing live verified models matching "{search}" with real-world INR pricing, specs, and trade-offs.
                      </span>
                    </div>
                  </div>
                  <span className="self-start sm:self-auto px-2.5 py-1 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-300 font-bold text-[10px] uppercase tracking-wider shrink-0 border border-purple-200 dark:border-purple-800">
                    Live Gemini AI
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between mb-4 text-xs text-zinc-500">
                <span>
                  Showing <strong>{products.length}</strong> {isAiGenerated ? 'AI-discovered market products' : 'verified products'}
                </span>
                <span className="hidden sm:inline">
                  {isAiGenerated ? 'Powered by Google Gemini 3.1 Flash' : 'Calculated via ProductAI Recommendation Engine'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
