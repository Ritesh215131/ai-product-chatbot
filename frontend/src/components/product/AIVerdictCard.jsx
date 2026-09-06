import React from 'react';
import { Sparkles, CheckCircle2, AlertTriangle, Target, Award } from 'lucide-react';
import { Badge } from '../common/Badge';

export const AIVerdictCard = ({ product }) => {
  if (!product) return null;

  return (
    <div className="rounded-2xl bg-gradient-to-br from-indigo-50/70 via-purple-50/40 to-white dark:from-indigo-950/30 dark:via-zinc-900/60 dark:to-[#121215] border border-indigo-200/80 dark:border-indigo-900/40 p-5 sm:p-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-indigo-100 dark:border-indigo-950/80">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-500/20">
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              ProductAI Intelligent Verdict
            </h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Algorithmically computed from hardware benchmarks and customer sentiments
            </p>
          </div>
        </div>

        {/* Value Score Pill */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-bold">
          <Award className="w-3.5 h-3.5" />
          <span>Value Index: {product.valueScore || 9.2}/10</span>
        </div>
      </div>

      {/* Target Audience / Best For */}
      {product.targetPersonas && product.targetPersonas.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
            <Target className="w-3.5 h-3.5 text-indigo-500" />
            <span>Best Suited For:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {product.targetPersonas.map((persona, idx) => (
              <Badge key={idx} variant="brand" size="sm">
                {persona}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Pros & Cons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
        {/* Pros */}
        <div className="rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/30 p-3.5">
          <h5 className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-300 mb-2.5 uppercase tracking-wide">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            Key Advantages (Pros)
          </h5>
          <ul className="space-y-1.5">
            {(product.pros || ['Excellent overall performance']).map((pro, idx) => (
              <li key={idx} className="text-xs text-zinc-700 dark:text-zinc-300 flex items-start gap-2">
                <span className="text-emerald-500 font-bold">•</span>
                <span>{pro}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Cons */}
        <div className="rounded-xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/30 p-3.5">
          <h5 className="flex items-center gap-1.5 text-xs font-bold text-rose-700 dark:text-rose-300 mb-2.5 uppercase tracking-wide">
            <AlertTriangle className="w-4 h-4 text-rose-500" />
            Trade-Offs to Note (Cons)
          </h5>
          <ul className="space-y-1.5">
            {(product.cons || ['Standard trade-offs for this price bracket']).map((con, idx) => (
              <li key={idx} className="text-xs text-zinc-700 dark:text-zinc-300 flex items-start gap-2">
                <span className="text-rose-500 font-bold">•</span>
                <span>{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Synthesis Note */}
      <div className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed italic border-t border-indigo-100/60 dark:border-zinc-800 pt-3">
        💡 <strong>AI Summary:</strong> {product.description}
      </div>
    </div>
  );
};
