import React, { useState, useEffect } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { useToast } from '../../context/ToastContext';
import { chatApi } from '../../services/api';
import {
  Sparkles,
  Cpu,
  CheckCircle2,
  ExternalLink,
  Key,
  ShieldCheck,
  AlertCircle,
  Eye,
  EyeOff,
  Zap
} from 'lucide-react';

export const AISettingsModal = ({ isOpen, onClose, onModelChanged }) => {
  const toast = useToast();

  const [aiStatus, setAiStatus] = useState(null);
  const [selectedProvider, setSelectedProvider] = useState('gemini');
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);

  // Fetch current AI status
  const fetchStatus = async () => {
    try {
      setLoading(true);
      const data = await chatApi.getAIStatus();
      setAiStatus(data);
      if (data.activeProvider) {
        setSelectedProvider(data.activeProvider === 'universal' ? 'gemini' : data.activeProvider);
      }
    } catch (err) {
      console.warn('Failed to load AI status:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchStatus();
      setApiKey('');
    }
  }, [isOpen]);

  const handleSave = async (e) => {
    if (e) e.preventDefault();

    if (selectedProvider !== 'universal' && (!apiKey || !apiKey.trim())) {
      toast.error('Please enter a valid API key.');
      return;
    }

    try {
      setVerifying(true);
      const res = await chatApi.updateAISettings({
        provider: selectedProvider,
        apiKey: apiKey.trim()
      });

      toast.success(res.message || 'AI model updated successfully!');
      setAiStatus(res.status);
      setApiKey('');
      if (onModelChanged) onModelChanged(res.status);
      onClose();
    } catch (err) {
      toast.error(err.message || 'Failed to connect to AI provider.');
    } finally {
      setVerifying(false);
    }
  };

  const handleSwitchToUniversal = async () => {
    try {
      setVerifying(true);
      const res = await chatApi.updateAISettings({ provider: 'universal' });
      toast.info('Switched to Universal Explainable AI Engine.');
      setAiStatus(res.status);
      if (onModelChanged) onModelChanged(res.status);
      onClose();
    } catch (err) {
      toast.error(err.message || 'Failed to switch provider.');
    } finally {
      setVerifying(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="AI Model & Search Engine Settings" maxWidth="max-w-xl">
      <div className="space-y-6 text-left">
        {/* Active Engine Badge Header */}
        <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              aiStatus?.isRealLLM
                ? 'bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-md shadow-emerald-500/20'
                : 'bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400'
            }`}>
              {aiStatus?.isRealLLM ? <Sparkles className="w-5 h-5 animate-pulse" /> : <Cpu className="w-5 h-5" />}
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                Current Active Engine
              </div>
              <div className="font-extrabold text-sm sm:text-base text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <span>{aiStatus?.name || 'Universal AI Engine'}</span>
                {aiStatus?.isRealLLM && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold border border-emerald-500/20">
                    Live Real-Time AI
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Informational Callout */}
        <div className="p-4 rounded-2xl bg-brand-500/10 border border-brand-500/25 text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
          <div className="font-bold text-brand-700 dark:text-brand-300 flex items-center gap-1.5 mb-1 text-sm">
            <Sparkles className="w-4 h-4" />
            <span>Search Anything in the World</span>
          </div>
          Connecting a real AI model like <strong>Google Gemini</strong> allows ProductAI to search, analyze, and compare <strong>ANY product, brand, gadget, appliance, or conceptual tech question</strong> with real-world specifications, pricing in ₹, and explainable pros/cons.
        </div>

        {/* Provider Selector Tabs */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
            Select AI Provider
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setSelectedProvider('gemini')}
              className={`p-3.5 rounded-2xl border text-left transition-all relative ${
                selectedProvider === 'gemini'
                  ? 'border-brand-500 bg-brand-50/50 dark:bg-brand-950/30 ring-2 ring-brand-500/20'
                  : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#121215] hover:border-zinc-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-xs sm:text-sm text-zinc-900 dark:text-zinc-100">
                  Google Gemini
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  Free
                </span>
              </div>
              <p className="text-[11px] text-zinc-500">Gemini 1.5 Flash (Sub-second web intelligence)</p>
            </button>

            <button
              type="button"
              onClick={() => setSelectedProvider('openai')}
              className={`p-3.5 rounded-2xl border text-left transition-all ${
                selectedProvider === 'openai'
                  ? 'border-brand-500 bg-brand-50/50 dark:bg-brand-950/30 ring-2 ring-brand-500/20'
                  : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#121215] hover:border-zinc-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-xs sm:text-sm text-zinc-900 dark:text-zinc-100">
                  OpenAI
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-purple-500/10 text-purple-600 dark:text-purple-400">
                  GPT-4o
                </span>
              </div>
              <p className="text-[11px] text-zinc-500">GPT-4o-mini reasoning engine</p>
            </button>
          </div>
        </div>

        {/* API Key Input Form */}
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-zinc-400" />
                <span>{selectedProvider === 'gemini' ? 'Gemini API Key' : 'OpenAI API Key'}</span>
              </label>

              {selectedProvider === 'gemini' && (
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-brand-600 dark:text-brand-400 font-semibold hover:underline flex items-center gap-1"
                >
                  <span>Get Free Key at Google AI Studio</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>

            <div className="relative">
              <input
                type={showKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder={selectedProvider === 'gemini' ? 'AIzaSy...' : 'sk-...'}
                className="w-full py-2.5 px-3.5 pr-10 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 font-mono"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 p-1"
              >
                {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[11px] text-zinc-400 mt-1">
              Keys are stored securely in your session and in <code>backend/.env</code>.
            </p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-zinc-200 dark:border-zinc-800">
            <button
              type="button"
              onClick={handleSwitchToUniversal}
              disabled={verifying}
              className="text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300 flex items-center gap-1"
            >
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>Use Local Universal Engine</span>
            </button>

            <div className="flex items-center gap-2">
              <Button variant="secondary" size="sm" onClick={onClose} disabled={verifying}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="sm"
                disabled={verifying || !apiKey.trim()}
                icon={Sparkles}
              >
                {verifying ? 'Verifying...' : 'Verify & Connect'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};
