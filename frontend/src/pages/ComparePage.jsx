import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Scale,
  Sparkles,
  Trophy,
  X,
  Plus,
  ArrowRight,
  Star,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useProduct } from '../context/ProductContext';
import { compareApi } from '../services/api';
import { formatPrice } from '../utils/formatters';
import { Button } from '../components/common/Button';

export const ComparePage = () => {
  const { compareList, removeFromCompare, clearCompare } = useProduct();
  const navigate = useNavigate();

  const [comparisonData, setComparisonData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchComparison = async () => {
      if (compareList.length < 2) {
        setComparisonData(null);
        return;
      }

      setLoading(true);
      try {
        const ids = compareList.map(p => p.id);
        const data = await compareApi.compareProducts(ids);
        setComparisonData(data);
      } catch (err) {
        console.error('Failed to compare products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchComparison();
  }, [compareList]);

  if (compareList.length < 2) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto">
        <div className="w-16 h-16 rounded-2xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center mb-4">
          <Scale className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
          Compare Products Side-by-Side
        </h2>
        <p className="text-sm text-zinc-500 mb-6 leading-relaxed">
          Select at least 2 products (up to 4) to generate an AI comparative benchmark analysis and winner declaration.
        </p>
        <Button
          variant="primary"
          onClick={() => navigate('/products')}
          icon={Plus}
        >
          Browse & Select Products
        </Button>
      </div>
    );
  }

  const summary = comparisonData?.comparisonSummary;
  const winner = summary?.winner;

  // Spec keys to display in matrix
  const specKeys = [
    { label: 'Processor / CPU', key: 'processor' },
    { label: 'RAM / Memory', key: 'ram' },
    { label: 'Storage', key: 'storage' },
    { label: 'Graphics / GPU', key: 'gpu' },
    { label: 'Display Screen', key: 'display' },
    { label: 'Battery Life', key: 'battery' },
    { label: 'Weight', key: 'weight' },
    { label: 'Operating System', key: 'os' }
  ];

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-6 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-2.5">
            <Scale className="w-6 h-6 text-brand-500" />
            Product Comparison Matrix
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
            Analyzing {compareList.length} products across technical benchmarks and pricing efficiency
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={() => navigate('/products')}>
            Add More Products
          </Button>
          <Button variant="outline" size="sm" onClick={clearCompare}>
            Clear All
          </Button>
        </div>
      </div>

      {/* AI Comparison Verdict Card */}
      {winner && (
        <div className="mb-8 p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-white dark:to-[#121215] border border-brand-500/30 shadow-lg animate-slide-up">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-brand-600 dark:text-brand-400 mb-2">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>AI Comparative Decision</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-zinc-100 mb-3 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-amber-500 shrink-0" />
            Recommended Winner: {winner.name}
          </h3>

          <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed max-w-3xl mb-4 font-normal">
            {winner.verdict}
          </p>

          {/* Quick Winner Badges */}
          <div className="flex flex-wrap gap-2 text-xs">
            {summary.specHighlights?.priceWinner && (
              <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 font-semibold">
                💰 Lowest Price: {summary.specHighlights.priceWinner}
              </span>
            )}
            {summary.specHighlights?.ratingWinner && (
              <span className="px-3 py-1 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30 font-semibold">
                ⭐ Highest Rated: {summary.specHighlights.ratingWinner}
              </span>
            )}
            {summary.specHighlights?.valueWinner && (
              <span className="px-3 py-1 rounded-full bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30 font-semibold">
                🏆 Best Overall Value: {summary.specHighlights.valueWinner}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Comparison Grid Table */}
      <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#121215] shadow-sm mb-12">
        <table className="w-full text-left border-collapse min-w-[650px]">
          {/* Header Row: Images & Names */}
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
              <th className="p-4 w-48 text-xs font-bold uppercase text-zinc-400">Products</th>
              {compareList.map(product => (
                <th key={product.id} className="p-4 align-top">
                  <div className="relative flex flex-col">
                    <button
                      onClick={() => removeFromCompare(product.id)}
                      className="absolute -top-1 -right-1 p-1 rounded-full bg-zinc-200 dark:bg-zinc-800 hover:text-rose-500 text-zinc-500 transition-colors"
                      title="Remove from comparison"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>

                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 mb-3 border border-zinc-200 dark:border-zinc-700">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <span className="text-xs font-bold text-brand-600 dark:text-brand-400">
                      {product.brand}
                    </span>
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 line-clamp-2 mt-0.5">
                      {product.name}
                    </h4>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-xs sm:text-sm">
            {/* Price Row */}
            <tr className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/20">
              <td className="p-4 font-bold text-zinc-500 dark:text-zinc-400">Price (INR)</td>
              {compareList.map(p => {
                const isLowest = summary?.lowestPriceProductId === p.id;
                return (
                  <td key={p.id} className="p-4 font-extrabold text-base">
                    <span className={isLowest ? 'text-emerald-600 dark:text-emerald-400' : 'text-zinc-900 dark:text-zinc-100'}>
                      {formatPrice(p.price)}
                    </span>
                    {isLowest && (
                      <span className="block text-[10px] text-emerald-500 font-bold uppercase">
                        Lowest Price
                      </span>
                    )}
                  </td>
                );
              })}
            </tr>

            {/* Rating Row */}
            <tr className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/20">
              <td className="p-4 font-bold text-zinc-500 dark:text-zinc-400">Rating</td>
              {compareList.map(p => {
                const isHighest = summary?.highestRatingProductId === p.id;
                return (
                  <td key={p.id} className="p-4">
                    <div className="flex items-center gap-1 font-bold">
                      <Star className="w-3.5 h-3.5 fill-current text-amber-500" />
                      <span>{p.rating} / 5</span>
                    </div>
                    {isHighest && (
                      <span className="block text-[10px] text-amber-500 font-bold uppercase">
                        Top Rated
                      </span>
                    )}
                  </td>
                );
              })}
            </tr>

            {/* AI Value Score */}
            <tr className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/20 bg-indigo-50/30 dark:bg-indigo-950/10">
              <td className="p-4 font-bold text-brand-600 dark:text-brand-400 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Value Index</span>
              </td>
              {compareList.map(p => (
                <td key={p.id} className="p-4 font-bold text-brand-600 dark:text-brand-400 text-sm">
                  {p.valueScore || 9.0} / 10
                </td>
              ))}
            </tr>

            {/* Detailed Hardware Specs Rows */}
            {specKeys.map(spec => (
              <tr key={spec.key} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/20">
                <td className="p-4 font-medium text-zinc-500 dark:text-zinc-400">{spec.label}</td>
                {compareList.map(p => (
                  <td key={p.id} className="p-4 font-mono text-xs text-zinc-800 dark:text-zinc-200">
                    {p.specifications?.[spec.key] || 'N/A'}
                  </td>
                ))}
              </tr>
            ))}

            {/* Top Pros */}
            <tr className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/20">
              <td className="p-4 font-bold text-emerald-600 dark:text-emerald-400">Key Advantage</td>
              {compareList.map(p => (
                <td key={p.id} className="p-4 text-xs text-zinc-700 dark:text-zinc-300">
                  <div className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{p.pros?.[0] || 'High quality construct'}</span>
                  </div>
                </td>
              ))}
            </tr>

            {/* Trade-offs */}
            <tr className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/20">
              <td className="p-4 font-bold text-rose-500">Trade-off</td>
              {compareList.map(p => (
                <td key={p.id} className="p-4 text-xs text-zinc-600 dark:text-zinc-400">
                  <div className="flex items-start gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                    <span>{p.cons?.[0] || 'Standard limitations'}</span>
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
