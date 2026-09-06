import React from 'react';
import { Sparkles, Cpu } from 'lucide-react';

export const TypingIndicator = () => {
  return (
    <div className="flex items-start gap-3.5 max-w-3xl animate-fade-in my-3">
      {/* ProductAI Avatar */}
      <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 text-white flex items-center justify-center shadow-md shadow-brand-500/20 shrink-0 mt-0.5">
        <Sparkles className="w-4 h-4 animate-pulse" />
      </div>

      {/* Reasoning Box */}
      <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white dark:bg-[#121215] border border-zinc-200/80 dark:border-zinc-800 shadow-sm text-xs font-medium text-zinc-600 dark:text-zinc-300">
        <Cpu className="w-4 h-4 text-brand-500 animate-spin" />
        <span className="animate-pulse">ProductAI is evaluating specs and scoring matches...</span>

        {/* Pulsing Dots */}
        <div className="flex items-center gap-1 ml-1">
          <div className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
};
