import React, { useState } from 'react';
import {
  Sparkles,
  User,
  Copy,
  Check,
  RotateCcw,
  ThumbsUp,
  ThumbsDown,
  Share2,
  Edit2
} from 'lucide-react';
import { parseMarkdown } from '../../utils/formatters';
import { ProductCard } from '../product/ProductCard';
import { useToast } from '../../context/ToastContext';

export const MessageBubble = ({
  message,
  onRegenerate,
  onEditUserMessage
}) => {
  const isUser = message.role === 'user';
  const toast = useToast();

  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState(null); // 'like' | 'dislike' | null

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    toast.success('Response copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'ProductAI Recommendation',
        text: message.content
      }).catch(() => {});
    } else {
      handleCopy();
    }
  };

  const handleLike = () => {
    const next = feedback === 'like' ? null : 'like';
    setFeedback(next);
    if (next) toast.info('Thanks for the positive feedback!');
  };

  const handleDislike = () => {
    const next = feedback === 'dislike' ? null : 'dislike';
    setFeedback(next);
    if (next) toast.info('Feedback recorded to improve AI recommendations.');
  };

  if (isUser) {
    return (
      <div className="flex items-start justify-end gap-3 group my-4 animate-slide-up pl-10">
        {/* User Edit Trigger */}
        <button
          onClick={() => onEditUserMessage && onEditUserMessage(message.content)}
          className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all self-center"
          title="Edit message"
        >
          <Edit2 className="w-3.5 h-3.5" />
        </button>

        {/* User Bubble */}
        <div className="max-w-2xl px-5 py-3.5 rounded-2xl rounded-tr-sm bg-brand-600 text-white shadow-md shadow-brand-600/15 text-sm sm:text-base font-normal leading-relaxed">
          {message.content}
        </div>

        {/* User Avatar */}
        <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 flex items-center justify-center shrink-0 mt-0.5 border border-zinc-300 dark:border-zinc-700 shadow-sm">
          <User className="w-4 h-4" />
        </div>
      </div>
    );
  }

  // Assistant Message
  return (
    <div className="flex items-start gap-3.5 group my-4 animate-slide-up pr-4 sm:pr-10">
      {/* ProductAI Avatar */}
      <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 text-white flex items-center justify-center shadow-md shadow-brand-500/20 shrink-0 mt-0.5">
        <Sparkles className="w-4 h-4" />
      </div>

      <div className="flex-1 flex flex-col max-w-3xl overflow-hidden">
        {/* Message Container */}
        <div className="p-4 sm:p-5 rounded-2xl rounded-tl-sm bg-white dark:bg-[#121215] border border-zinc-200/90 dark:border-zinc-800 shadow-sm text-zinc-800 dark:text-zinc-200">
          {/* Formatted Markdown Content */}
          <div
            className="prose-ai text-sm sm:text-base text-zinc-800 dark:text-zinc-200"
            dangerouslySetInnerHTML={{ __html: parseMarkdown(message.content) }}
          />

          {/* Embedded Product Cards Grid (If any products attached to recommendation) */}
          {message.products && message.products.length > 0 && (
            <div className="mt-5 pt-4 border-t border-zinc-100 dark:border-zinc-800/80">
              <div className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-brand-500" />
                <span>Featured Product Matches</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {message.products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Message Toolbar Actions */}
        {!message.isStreaming && (
          <div className="flex items-center gap-1 mt-2 text-zinc-400 dark:text-zinc-500">
            <button
              onClick={handleCopy}
              className="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
              title="Copy response"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </button>

            {onRegenerate && (
              <button
                onClick={onRegenerate}
                className="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
                title="Regenerate response"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={handleLike}
              className={`p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors ${
                feedback === 'like' ? 'text-brand-500 font-bold' : 'hover:text-zinc-700 dark:hover:text-zinc-300'
              }`}
              title="Good recommendation"
            >
              <ThumbsUp className="w-4 h-4" />
            </button>

            <button
              onClick={handleDislike}
              className={`p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors ${
                feedback === 'dislike' ? 'text-rose-500 font-bold' : 'hover:text-zinc-700 dark:hover:text-zinc-300'
              }`}
              title="Not helpful"
            >
              <ThumbsDown className="w-4 h-4" />
            </button>

            <button
              onClick={handleShare}
              className="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
              title="Share"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
