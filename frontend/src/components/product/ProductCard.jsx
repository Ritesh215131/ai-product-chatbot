import React from 'react';
import { Star, Heart, Scale, ExternalLink, Sparkles, Check } from 'lucide-react';
import { useProduct } from '../../context/ProductContext';
import { formatPrice, formatDiscount } from '../../utils/formatters';
import { Badge } from '../common/Badge';

export const ProductCard = ({ product, showMatch = true }) => {
  const { toggleSaveProduct, isProductSaved, addToCompare, compareList, openProductDetail } = useProduct();

  if (!product) return null;

  const isSaved = isProductSaved(product.id);
  const isInCompare = compareList.some(p => p.id === product.id);
  const discountText = formatDiscount(product.price, product.originalPrice);

  return (
    <div className="group relative flex flex-col bg-white dark:bg-[#121215] border border-zinc-200/90 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl dark:hover:shadow-indigo-500/5 hover:border-brand-500/40 dark:hover:border-brand-500/40 transition-all duration-300">
      {/* Top Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900/60">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Brand Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className="px-2.5 py-0.5 text-xs font-semibold rounded-md bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md text-zinc-900 dark:text-zinc-100 border border-zinc-200/60 dark:border-zinc-700/60 shadow-sm">
            {product.brand}
          </span>
          {discountText && (
            <span className="px-2 py-0.5 text-xs font-bold rounded-md bg-rose-500 text-white shadow-sm">
              {discountText}
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={() => toggleSaveProduct(product.id)}
          title={isSaved ? 'Remove from Saved' : 'Save to Wishlist'}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-200 ${
            isSaved
              ? 'bg-rose-500 text-white scale-105 shadow-md shadow-rose-500/30'
              : 'bg-white/80 dark:bg-zinc-900/80 text-zinc-600 dark:text-zinc-300 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-white dark:hover:bg-zinc-900'
          }`}
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
        </button>

        {/* AI Match Score Progress Tag */}
        {showMatch && (product.matchScore || product.valueScore) && (
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between px-3 py-1.5 rounded-xl bg-zinc-950/85 backdrop-blur-md border border-white/10 text-white text-xs font-medium shadow-md">
            <div className="flex items-center gap-1.5 text-emerald-400">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>AI Match: <strong>{product.matchScore || Math.round(product.valueScore * 10)}%</strong></span>
            </div>
            {/* Visual Progress Bar */}
            <div className="w-20 h-1.5 rounded-full bg-zinc-800 overflow-hidden ml-2">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
                style={{ width: `${product.matchScore || Math.round(product.valueScore * 10)}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 sm:p-5">
        {/* Rating & Category */}
        <div className="flex items-center justify-between gap-2 mb-2 text-xs">
          <span className="text-zinc-500 dark:text-zinc-400 font-medium">
            {product.category}
          </span>
          <div className="flex items-center gap-1 text-amber-500 font-semibold">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>{product.rating}</span>
            <span className="text-zinc-400 dark:text-zinc-500 font-normal">
              ({product.reviews?.toLocaleString('en-IN') || 0})
            </span>
          </div>
        </div>

        {/* Product Title */}
        <h3
          onClick={() => openProductDetail(product)}
          className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100 hover:text-brand-600 dark:hover:text-brand-400 cursor-pointer line-clamp-2 transition-colors mb-2"
          title={product.name}
        >
          {product.name}
        </h3>

        {/* Key Hardware Specs Pills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {product.specifications?.ram && (
            <span className="px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-300 text-[11px] font-medium">
              {product.specifications.ram.split(' ')[0]}
            </span>
          )}
          {product.specifications?.storage && (
            <span className="px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-300 text-[11px] font-medium">
              {product.specifications.storage.split(' ')[0]}
            </span>
          )}
          {product.specifications?.gpu && (
            <span className="px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 text-[11px] font-medium">
              GPU
            </span>
          )}
          {product.specifications?.processor && (
            <span className="px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-300 text-[11px] font-medium truncate max-w-[120px]">
              {product.specifications.processor.split('(')[0]}
            </span>
          )}
        </div>

        {/* Pricing */}
        <div className="mt-auto pt-2 border-t border-zinc-100 dark:border-zinc-800/60 flex items-baseline gap-2 mb-4">
          <span className="text-lg sm:text-xl font-extrabold text-zinc-900 dark:text-zinc-100">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-xs text-zinc-400 dark:text-zinc-500 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => openProductDetail(product)}
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Details
          </button>

          <button
            onClick={() => addToCompare(product)}
            className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
              isInCompare
                ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                : 'bg-brand-50 hover:bg-brand-100 dark:bg-brand-950/60 dark:hover:bg-brand-900/60 text-brand-600 dark:text-brand-300 border border-brand-200/60 dark:border-brand-800/60'
            }`}
          >
            {isInCompare ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                Added
              </>
            ) : (
              <>
                <Scale className="w-3.5 h-3.5" />
                Compare
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
