import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Scale, X, ArrowRight, Trash2 } from 'lucide-react';
import { useProduct } from '../../context/ProductContext';
import { formatPrice } from '../../utils/formatters';

export const CompareDrawer = () => {
  const { compareList, removeFromCompare, clearCompare } = useProduct();
  const navigate = useNavigate();
  const location = useLocation();

  // Do not show floating drawer if already on the /compare page
  if (compareList.length === 0 || location.pathname === '/compare') {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-2xl animate-slide-up">
      <div className="flex items-center justify-between gap-3 p-3 sm:p-4 rounded-2xl bg-zinc-900/95 dark:bg-zinc-900/95 text-white border border-brand-500/30 shadow-2xl backdrop-blur-xl">
        {/* Left Status & Mini Thumbnails */}
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="hidden sm:flex p-2.5 rounded-xl bg-brand-600 text-white shadow-md shadow-brand-500/30">
            <Scale className="w-5 h-5" />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto py-1">
            {compareList.map(product => (
              <div
                key={product.id}
                className="relative group shrink-0 w-12 h-12 rounded-xl overflow-hidden border border-white/20 bg-zinc-800"
                title={product.name}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFromCompare(product.id);
                  }}
                  className="absolute inset-0 bg-black/70 text-rose-400 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                  title="Remove"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="hidden md:block text-xs text-zinc-300 pl-1 font-medium">
            <span>{compareList.length} of 4 items selected</span>
          </div>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={clearCompare}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            title="Clear all"
          >
            <Trash2 className="w-4 h-4" />
          </button>

          <button
            onClick={() => navigate('/compare')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-brand-600 hover:bg-brand-500 text-white shadow-lg shadow-brand-600/30 active:scale-95 transition-all"
          >
            <span>Compare</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
