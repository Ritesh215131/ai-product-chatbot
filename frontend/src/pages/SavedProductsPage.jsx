import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Scale, Trash2, ArrowRight, Search, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useProduct } from '../context/ProductContext';
import { productApi } from '../services/api';
import { ProductCard } from '../components/product/ProductCard';
import { Button } from '../components/common/Button';
import { Skeleton } from '../components/common/Skeleton';

export const SavedProductsPage = () => {
  const { isAuthenticated } = useAuth();
  const { savedProductIds, addToCompare } = useProduct();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSaved = async () => {
      if (!isAuthenticated) {
        setProducts([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const data = await productApi.getSavedProducts();
        setProducts(data.products || []);
      } catch (err) {
        console.error('Failed to load saved products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSaved();
  }, [isAuthenticated, savedProductIds]);

  const handleCompareAll = () => {
    products.slice(0, 4).forEach(p => addToCompare(p));
    navigate('/compare');
  };

  if (!isAuthenticated) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto">
        <div className="w-16 h-16 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center mb-4">
          <Heart className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
          Your Saved Wishlist
        </h2>
        <p className="text-sm text-zinc-500 mb-6 leading-relaxed">
          Log in or use the 1-Click Demo account to save products, build your wishlist, and track price changes.
        </p>
        <Button variant="primary" onClick={() => navigate('/login')}>
          Sign In to Access Saved Products
        </Button>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-6 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-2.5">
            <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
            Saved Products & Wishlist
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
            {products.length} {products.length === 1 ? 'item' : 'items'} saved in your personalized catalog
          </p>
        </div>

        {products.length >= 2 && (
          <Button variant="primary" size="sm" icon={Scale} onClick={handleCompareAll}>
            Compare Saved Items
          </Button>
        )}
      </div>

      {/* Content */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {[1, 2, 3].map(n => (
            <div key={n} className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 space-y-3">
              <Skeleton className="aspect-[4/3] w-full" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-8 w-full" />
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center max-w-md mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-zinc-100 dark:bg-zinc-800/80 flex items-center justify-center text-zinc-400 mb-4">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-200 mb-2">
            No saved products yet
          </h3>
          <p className="text-sm text-zinc-500 mb-6">
            Click the heart icon on any product card or in the chat to save products here for easy comparison later.
          </p>
          <Button variant="primary" onClick={() => navigate('/products')} icon={Search}>
            Explore Products
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
