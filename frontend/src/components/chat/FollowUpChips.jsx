import React from 'react';
import { CornerDownRight } from 'lucide-react';

export const FollowUpChips = ({ chips = [], onSelect }) => {
  if (!chips || chips.length === 0) return null;

  return (
    <div className="flex flex-col gap-2 my-3 pl-11 animate-fade-in">
      <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
        <CornerDownRight className="w-3.5 h-3.5 text-brand-500" />
        <span>Suggested Follow-Ups:</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {chips.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(chip)}
            className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-brand-50 hover:bg-brand-100 dark:bg-brand-950/50 dark:hover:bg-brand-900/60 text-brand-700 dark:text-brand-300 border border-brand-200/80 dark:border-brand-800/60 shadow-sm active:scale-95 transition-all text-left"
          >
            {chip}
          </button>
        ))}
      </div>
    </div>
  );
};
