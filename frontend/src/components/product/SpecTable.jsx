import React from 'react';

export const SpecTable = ({ specifications = {} }) => {
  if (!specifications || Object.keys(specifications).length === 0) {
    return (
      <div className="text-sm text-zinc-500 italic py-4">
        No technical specifications available for this product.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
      <table className="w-full text-left text-sm">
        <thead className="bg-zinc-50 dark:bg-zinc-900/60 border-b border-zinc-200 dark:border-zinc-800 text-xs text-zinc-500 dark:text-zinc-400 font-semibold uppercase tracking-wider">
          <tr>
            <th className="px-4 py-3 w-1/3">Hardware / Feature</th>
            <th className="px-4 py-3">Specification Details</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/80">
          {Object.entries(specifications).map(([key, value]) => {
            const formattedKey = key
              .replace(/([A-Z])/g, ' $1')
              .replace(/^./, str => str.toUpperCase());

            return (
              <tr
                key={key}
                className="hover:bg-zinc-50/70 dark:hover:bg-zinc-800/30 transition-colors"
              >
                <td className="px-4 py-3 font-medium text-zinc-700 dark:text-zinc-300">
                  {formattedKey}
                </td>
                <td className="px-4 py-3 text-zinc-900 dark:text-zinc-100 font-mono text-xs">
                  {value}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
