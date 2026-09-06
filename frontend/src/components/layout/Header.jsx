import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Menu,
  Sparkles,
  Scale,
  Heart,
  Bell,
  User,
  LogOut,
  Shield,
  Sliders,
  LogIn,
  Cpu
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useProduct } from '../../context/ProductContext';
import { ThemeToggle } from '../common/ThemeToggle';
import { AISettingsModal } from '../common/AISettingsModal';
import { chatApi } from '../../services/api';

export const Header = ({ onToggleSidebar }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const { compareList, savedProductIds } = useProduct();
  const navigate = useNavigate();

  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [aiStatus, setAiStatus] = useState(null);

  useEffect(() => {
    chatApi.getAIStatus().then(data => setAiStatus(data)).catch(() => {});
  }, []);

  return (
    <header className="h-16 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-[#09090b]/80 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between z-30 shrink-0">
      {/* Left: Mobile Toggle & Logo */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-xl text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          aria-label="Toggle navigation drawer"
        >
          <Menu className="w-5 h-5" />
        </button>

        <Link to="/chat" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 text-white flex items-center justify-center shadow-md shadow-brand-500/25 group-hover:scale-105 transition-transform">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <span className="text-base sm:text-lg font-black tracking-tight text-zinc-900 dark:text-zinc-50">
              Product<span className="text-brand-600 dark:text-brand-400">AI</span>
            </span>
          </div>
        </Link>

        {/* AI Live Status Indicator */}
        <div className="hidden md:flex items-center gap-2 pl-3 border-l border-zinc-200 dark:border-zinc-800 text-xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-zinc-500 dark:text-zinc-400 font-medium">
            AI Engine: <strong className="text-emerald-500 font-semibold">Online</strong>
          </span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-1.5 sm:gap-2.5">
        {/* Compare quick link */}
        <Link
          to="/compare"
          className="relative p-2 rounded-xl text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          title="Compare Tray"
        >
          <Scale className="w-5 h-5" />
          {compareList.length > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-brand-600 text-white text-[10px] font-extrabold flex items-center justify-center animate-scale">
              {compareList.length}
            </span>
          )}
        </Link>

        {/* Real AI Model Status & Config button */}
        <button
          onClick={() => setIsAIModalOpen(true)}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold border transition-all ${
            aiStatus?.isRealLLM
              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
              : 'bg-brand-500/10 text-brand-600 dark:text-brand-400 border-brand-500/30 hover:bg-brand-500/20'
          }`}
          title="Configure AI Model (Gemini / OpenAI)"
        >
          <Sparkles className="w-3.5 h-3.5 text-brand-500 animate-pulse" />
          <span className="hidden sm:inline">
            {aiStatus?.isRealLLM ? (aiStatus.activeProvider === 'gemini' ? 'Gemini 1.5 Flash' : 'OpenAI Active') : 'Connect Real AI'}
          </span>
        </button>

        {/* Wishlist quick link */}
        <Link
          to="/saved"
          className="relative p-2 rounded-xl text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          title="Saved Wishlist"
        >
          <Heart className="w-5 h-5" />
          {savedProductIds.length > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-extrabold flex items-center justify-center">
              {savedProductIds.length}
            </span>
          )}
        </Link>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* User Profile / Auth State */}
        {isAuthenticated ? (
          <div className="flex items-center gap-2 pl-2 border-l border-zinc-200 dark:border-zinc-800">
            <Link
              to="/profile"
              className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors group"
            >
              <img
                src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                alt={user.name}
                className="w-7 h-7 rounded-full object-cover border border-brand-500/40"
              />
              <span className="hidden sm:inline text-xs font-semibold text-zinc-700 dark:text-zinc-200 max-w-[120px] truncate">
                {user.name.split(' ')[0]}
              </span>
            </Link>

            <button
              onClick={logout}
              className="p-2 rounded-xl text-zinc-400 hover:text-rose-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              title="Log out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-brand-600 hover:bg-brand-500 text-white shadow-sm transition-all ml-1"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Login</span>
          </Link>
        )}
      </div>

      {/* AI Model Configuration Modal */}
      <AISettingsModal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        onModelChanged={(status) => setAiStatus(status)}
      />
    </header>
  );
};
