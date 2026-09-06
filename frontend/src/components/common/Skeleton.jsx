import React from 'react';

export const Skeleton = ({ className = '', rounded = 'rounded-lg' }) => {
  return (
    <div
      className={`animate-pulse bg-zinc-200 dark:bg-zinc-800/80 ${rounded} ${className}`}
    />
  );
};
