import React from 'react';
import { useProduct } from '../../context/ProductContext';
import { Modal } from '../common/Modal';
import { SpecTable } from './SpecTable';
import { AIVerdictCard } from './AIVerdictCard';
import { formatPrice, formatDiscount } from '../../utils/formatters';
import { Star, Heart, Scale, Check, CheckCircle } from 'lucide-react';
import { Button } from '../common/Button';

export const ProductDetailModal = () => {
  const { activeDetailProduct, closeProductDetail, toggleSaveProduct, isProductSaved, addToCompare, compareList } = useProduct();

  if (!activeDetailProduct) return null;

  const product = activeDetailProduct;
  const isSaved = isProductSaved(product.id);
  const isInCompare = compareList.some(p => p.id === product.id);
  const discountText = formatDiscount(product.price, product.originalPrice);

  return (
    <Modal
      isOpen={Boolean(activeDetailProduct)}
      onClose={closeProductDetail}
      title={product.name}
      maxWidth="max-w-4xl"
    >
      <div className="space-y-6">
        {/* Top Product Snapshot Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Gallery Image */}
          <div className="md:col-span-5 rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 aspect-square">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Details & Buy Action */}
          <div className="md:col-span-7 flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-300 border border-brand-200/60 dark:border-brand-800/60">
                {product.brand}
              </span>
              <span className="text-xs text-zinc-500">{product.category}</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-zinc-100 mb-3">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4 text-sm">
              <div className="flex items-center text-amber-500 font-bold gap-1">
                <Star className="w-4 h-4 fill-current" />
                <span>{product.rating}</span>
              </div>
              <span className="text-zinc-400">•</span>
              <span className="text-zinc-600 dark:text-zinc-400 text-xs">
                {product.reviews?.toLocaleString('en-IN') || 0} customer ratings
              </span>
            </div>

            {/* Price Box */}
            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 mb-5">
              <div className="flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-100">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-zinc-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                {discountText && (
                  <span className="px-2 py-0.5 text-xs font-bold rounded-md bg-emerald-500 text-white">
                    {discountText}
                  </span>
                )}
              </div>
              <p className="text-xs text-zinc-500 mt-1">Inclusive of all local taxes</p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-2.5 mb-5">
              <Button
                variant="primary"
                className="flex-1"
                icon={Scale}
                onClick={() => addToCompare(product)}
              >
                {isInCompare ? 'In Comparison Tray' : 'Add to Compare'}
              </Button>

              <Button
                variant={isSaved ? 'danger' : 'secondary'}
                icon={Heart}
                onClick={() => toggleSaveProduct(product.id)}
              >
                {isSaved ? 'Saved' : 'Wishlist'}
              </Button>
            </div>

            {/* Key Features Bullet points */}
            {product.features && product.features.length > 0 && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                  Key Highlights
                </h4>
                <ul className="space-y-1.5">
                  {product.features.map((feat, idx) => (
                    <li key={idx} className="text-xs text-zinc-700 dark:text-zinc-300 flex items-start gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-brand-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* AI Verdict Section */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">
            1. AI Intelligence & Synthesis
          </h4>
          <AIVerdictCard product={product} />
        </div>

        {/* Technical Specs Section */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">
            2. Full Technical Specifications
          </h4>
          <SpecTable specifications={product.specifications} />
        </div>
      </div>
    </Modal>
  );
};
