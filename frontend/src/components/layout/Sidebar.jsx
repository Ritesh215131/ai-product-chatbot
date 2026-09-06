import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Plus,
  MessageSquare,
  Search,
  Scale,
  Heart,
  Sliders,
  Shield,
  Trash2,
  Sparkles,
  ChevronRight,
  Clock
} from 'lucide-react';
import { useChat } from '../../context/ChatContext';
import { useAuth } from '../../context/AuthContext';
import { useProduct } from '../../context/ProductContext';
import { groupConversationsByDate } from '../../utils/formatters';

export const Sidebar = ({ isOpen, onClose }) => {
  const {
    conversations,
    currentConversationId,
    loadConversation,
    startNewChat,
    deleteConversation
  } = useChat();
  const { user, isAuthenticated } = useAuth();
  const { compareList, savedProductIds } = useProduct();
  const navigate = useNavigate();

  const grouped = groupConversationsByDate(conversations);

  const handleNewChat = () => {
    startNewChat();
    navigate('/chat');
    if (window.innerWidth < 1024) onClose();
  };

  const handleSelectConv = (id) => {
    loadConversation(id);
    navigate('/chat');
    if (window.innerWidth < 1024) onClose();
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`fixed lg:static top-0 left-0 bottom-0 w-72 bg-white dark:bg-[#121215] border-r border-zinc-200 dark:border-zinc-800/80 flex flex-col z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top: Brand Header */}
        <div className="p-4 border-b border-zinc-200/80 dark:border-zinc-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 text-white flex items-center justify-center shadow-md shadow-brand-500/20">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight text-zinc-900 dark:text-zinc-50">
                Product<span className="text-brand-600 dark:text-brand-400">AI</span>
              </span>
              <span className="block text-[10px] text-zinc-400 font-medium">AI Shopping Assistant</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
          >
            ✕
          </button>
        </div>

        {/* New Chat CTA Button */}
        <div className="p-3.5">
          <button
            onClick={handleNewChat}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-brand-600 hover:bg-brand-500 text-white shadow-md shadow-brand-600/20 active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>New Chat</span>
          </button>
        </div>

        {/* Primary App Navigation */}
        <div className="px-3 py-2 space-y-1 border-b border-zinc-200/80 dark:border-zinc-800/80">
          <NavLink
            to="/chat"
            className={({ isActive }) =>
              `flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300 font-semibold'
                  : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`
            }
          >
            <div className="flex items-center gap-2.5">
              <MessageSquare className="w-4 h-4" />
              <span>AI Chatbot</span>
            </div>
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) =>
              `flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300 font-semibold'
                  : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`
            }
          >
            <div className="flex items-center gap-2.5">
              <Search className="w-4 h-4" />
              <span>Product Search</span>
            </div>
          </NavLink>

          <NavLink
            to="/compare"
            className={({ isActive }) =>
              `flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300 font-semibold'
                  : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`
            }
          >
            <div className="flex items-center gap-2.5">
              <Scale className="w-4 h-4" />
              <span>Compare</span>
            </div>
            {compareList.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-brand-500 text-white text-[10px] font-bold">
                {compareList.length}
              </span>
            )}
          </NavLink>

          <NavLink
            to="/saved"
            className={({ isActive }) =>
              `flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300 font-semibold'
                  : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`
            }
          >
            <div className="flex items-center gap-2.5">
              <Heart className="w-4 h-4" />
              <span>Saved Products</span>
            </div>
            {savedProductIds.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-rose-500 text-white text-[10px] font-bold">
                {savedProductIds.length}
              </span>
            )}
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300 font-semibold'
                  : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`
            }
          >
            <div className="flex items-center gap-2.5">
              <Sliders className="w-4 h-4" />
              <span>Preferences</span>
            </div>
          </NavLink>
        </div>

        {/* Middle: Chat History Feed */}
        <div className="flex-1 overflow-y-auto px-3 py-3">
          <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 px-3 mb-2 flex items-center gap-1.5">
            <Clock className="w-3 h-3" />
            <span>Chat History</span>
          </div>

          {!isAuthenticated ? (
            <div className="px-3 py-6 text-center text-xs text-zinc-400">
              <p className="mb-2">Log in to save and browse previous chat sessions.</p>
              <NavLink to="/login" className="text-brand-600 dark:text-brand-400 font-semibold underline">
                Sign in now
              </NavLink>
            </div>
          ) : conversations.length === 0 ? (
            <div className="px-3 py-6 text-center text-xs text-zinc-400 italic">
              No conversations yet. Start by asking a question!
            </div>
          ) : (
            <div className="space-y-4">
              {Object.entries(grouped).map(([groupTitle, convList]) => {
                if (convList.length === 0) return null;

                return (
                  <div key={groupTitle}>
                    <div className="text-[10px] font-semibold text-zinc-400 dark:text-zinc-500 px-3 mb-1">
                      {groupTitle}
                    </div>

                    <div className="space-y-0.5">
                      {convList.map((conv) => (
                        <div
                          key={conv.id}
                          className={`group relative flex items-center justify-between px-3 py-2 rounded-xl text-xs cursor-pointer transition-all ${
                            currentConversationId === conv.id
                              ? 'bg-zinc-200/70 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-semibold'
                              : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/40 hover:text-zinc-900 dark:hover:text-zinc-200'
                          }`}
                          onClick={() => handleSelectConv(conv.id)}
                        >
                          <div className="flex items-center gap-2 truncate pr-6">
                            <MessageSquare className="w-3.5 h-3.5 shrink-0 text-zinc-400" />
                            <span className="truncate">{conv.title}</span>
                          </div>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteConversation(conv.id);
                            }}
                            className="opacity-0 group-hover:opacity-100 p-1 text-zinc-400 hover:text-rose-500 transition-opacity"
                            title="Delete"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Bottom: User Card Footer */}
        {isAuthenticated && (
          <div className="p-3 border-t border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/20">
            <NavLink
              to="/profile"
              className="flex items-center gap-3 p-2 rounded-xl hover:bg-zinc-200/60 dark:hover:bg-zinc-800/60 transition-colors group"
            >
              <img
                src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover border border-brand-500/40"
              />
              <div className="flex-1 min-w-0">
                <span className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 truncate">
                  {user.name}
                </span>
                <span className="block text-[11px] text-zinc-400 truncate">
                  Verified Shopper
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:translate-x-0.5 transition-transform" />
            </NavLink>
          </div>
        )}
      </aside>
    </>
  );
};
