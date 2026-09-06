import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Send, Square, Sparkles, Trash2, ArrowUp, Cpu } from 'lucide-react';
import { useChat } from '../../context/ChatContext';
import { WelcomeScreen } from './WelcomeScreen';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';
import { FollowUpChips } from './FollowUpChips';
import { AISettingsModal } from '../common/AISettingsModal';
import { chatApi } from '../../services/api';

export const ChatArea = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [aiStatus, setAiStatus] = useState(null);

  useEffect(() => {
    chatApi.getAIStatus().then(data => setAiStatus(data)).catch(() => {});
  }, []);

  const {
    messages,
    isGenerating,
    followUpChips,
    sendMessage,
    stopGenerating,
    regenerateResponse,
    clearCurrentChat
  } = useChat();

  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  // Auto-send initial prompt if passed via navigation state (e.g. from Landing Page hero search)
  useEffect(() => {
    if (location.state?.initialPrompt) {
      const prompt = location.state.initialPrompt;
      navigate(location.pathname, { replace: true, state: {} });
      sendMessage(prompt);
    }
  }, [location.state, navigate, sendMessage]);

  // Auto-scroll to bottom whenever messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isGenerating]);

  // Adjust textarea height dynamically
  const handleInputChange = (e) => {
    setInput(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!input.trim() || isGenerating) return;

    const text = input;
    setInput('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
    sendMessage(text);
  };

  const handleSelectPrompt = (promptText) => {
    sendMessage(promptText);
  };

  const handleEditUserMessage = (oldContent) => {
    setInput(oldContent);
    textareaRef.current?.focus();
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden relative bg-[#f8fafc] dark:bg-[#09090b]">
      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="max-w-4xl mx-auto flex flex-col">
          {messages.length === 0 ? (
            <WelcomeScreen onSelectPrompt={handleSelectPrompt} />
          ) : (
            <>
              {/* Header Action Bar */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-zinc-200/80 dark:border-zinc-800/80 text-xs text-zinc-500">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-brand-500" />
                    AI Conversation
                  </span>

                  {/* AI Model indicator */}
                  <button
                    onClick={() => setIsAIModalOpen(true)}
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold border transition-all ${
                      aiStatus?.isRealLLM
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700 hover:border-brand-500/50'
                    }`}
                    title="Change AI Model (Gemini / OpenAI)"
                  >
                    <Cpu className="w-3 h-3 text-brand-500" />
                    <span>{aiStatus?.isRealLLM ? aiStatus.name : 'Real AI: Connect Gemini'}</span>
                  </button>
                </div>

                <button
                  onClick={clearCurrentChat}
                  className="flex items-center gap-1 hover:text-rose-500 transition-colors p-1"
                  title="Clear conversation"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear</span>
                </button>
              </div>

              {/* Message Items */}
              {messages.map((msg, index) => (
                <MessageBubble
                  key={msg.id || index}
                  message={msg}
                  onRegenerate={
                    index === messages.length - 1 && msg.role === 'assistant'
                      ? regenerateResponse
                      : undefined
                  }
                  onEditUserMessage={handleEditUserMessage}
                />
              ))}

              {/* Typing indicator */}
              {isGenerating && messages[messages.length - 1]?.role === 'user' && (
                <TypingIndicator />
              )}

              {/* Follow Up Chips */}
              {!isGenerating && followUpChips && followUpChips.length > 0 && (
                <FollowUpChips chips={followUpChips} onSelect={handleSelectPrompt} />
              )}

              <div ref={messagesEndRef} />
            </>
          )}
        </div>
      </div>

      {/* Floating Stop Generating Button */}
      {isGenerating && (
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 animate-fade-in">
          <button
            onClick={stopGenerating}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/90 dark:bg-zinc-800/90 text-white text-xs font-semibold shadow-lg backdrop-blur-md hover:bg-zinc-950 border border-white/10 active:scale-95 transition-all"
          >
            <Square className="w-3.5 h-3.5 fill-current text-rose-400" />
            <span>Stop generating</span>
          </button>
        </div>
      )}

      {/* Input Box Area */}
      <div className="p-4 sm:p-5 border-t border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-[#09090b]/90 backdrop-blur-md">
        <div className="max-w-4xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="relative flex items-end gap-2 p-2 rounded-2xl bg-zinc-100 dark:bg-[#121215] border border-zinc-300 dark:border-zinc-800 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/20 transition-all shadow-sm"
          >
            <textarea
              ref={textareaRef}
              rows={1}
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything: e.g. 'Suggest a laptop under ₹60,000 for programming' or 'Compare phones'..."
              className="flex-1 max-h-40 min-h-[44px] py-2.5 px-3 bg-transparent text-sm sm:text-base text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none resize-none"
            />

            <button
              type="submit"
              disabled={!input.trim() || isGenerating}
              className={`p-2.5 rounded-xl transition-all duration-200 shrink-0 ${
                input.trim() && !isGenerating
                  ? 'bg-brand-600 hover:bg-brand-500 text-white shadow-md shadow-brand-500/20 scale-100'
                  : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed scale-95'
              }`}
              title="Send message"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </form>

          {/* Micro-disclaimer */}
          <div className="text-[11px] text-zinc-400 dark:text-zinc-500 text-center mt-2.5">
            ProductAI evaluates real-world specifications, pricing, and user reviews to generate recommendations.
          </div>
        </div>
      </div>

      {/* AI Model Configuration Modal */}
      <AISettingsModal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        onModelChanged={(status) => setAiStatus(status)}
      />
    </div>
  );
};
