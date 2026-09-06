import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Sliders,
  Sparkles,
  Zap,
  BatteryCharging,
  DollarSign,
  Scale,
  Save,
  CheckCircle2,
  Gamepad2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Button } from '../components/common/Button';
import { CATEGORIES } from '../utils/constants';

export const ProfilePage = () => {
  const { user, isAuthenticated, updatePreferences } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const [priority, setPriority] = useState(user?.preferences?.priority || 'balanced');
  const [gamingInterest, setGamingInterest] = useState(Boolean(user?.preferences?.gamingInterest));
  const [preferredCats, setPreferredCats] = useState(user?.preferences?.preferredCategories || ['Laptops', 'Smartphones']);
  const [saving, setSaving] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto">
        <div className="w-16 h-16 rounded-2xl bg-brand-500/10 text-brand-500 flex items-center justify-center mb-4">
          <User className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
          User Profile & AI Preferences
        </h2>
        <p className="text-sm text-zinc-500 mb-6">
          Sign in to view your account details and configure personalized AI preference learning weights.
        </p>
        <Button variant="primary" onClick={() => navigate('/login')}>
          Sign In
        </Button>
      </div>
    );
  }

  const handleToggleCat = (cat) => {
    if (preferredCats.includes(cat)) {
      setPreferredCats(preferredCats.filter(c => c !== cat));
    } else {
      setPreferredCats([...preferredCats, cat]);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updatePreferences({
        priority,
        gamingInterest,
        preferredCategories: preferredCats
      });
      toast.success('AI preference weights saved! Future recommendations will adapt accordingly.');
    } catch (err) {
      toast.error('Failed to update preferences.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto w-full">
      {/* Profile Header Card */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
        <img
          src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
          alt={user.name}
          className="w-20 h-20 rounded-2xl object-cover border-2 border-brand-500/40 shadow-md"
        />

        <div className="flex-1 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
            <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-100">
              {user.name}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase bg-brand-500/15 text-brand-600 dark:text-brand-400">
              Shopper
            </span>
          </div>

          <p className="text-sm text-zinc-500 mb-3">{user.email}</p>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-zinc-400">
            <span>Saved items: <strong>{user.savedProducts?.length || 0}</strong></span>
            <span>•</span>
            <span>Account Status: <strong>Verified Shopper</strong></span>
          </div>
        </div>
      </div>

      {/* AI Preference Learning Matrix */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6">
        <div>
          <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400 font-extrabold text-sm uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>Academic Feature: Preference Learning</span>
          </div>
          <h2 className="text-xl font-black text-zinc-900 dark:text-zinc-100">
            AI Recommendation Weighting Matrix
          </h2>
          <p className="text-xs text-zinc-500 mt-1">
            Configure how the algorithm scores candidate products when multiple options match your queries.
          </p>
        </div>

        {/* Priority Radio Cards */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">
            1. Core Optimization Priority
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              {
                id: 'performance',
                title: 'Performance First',
                desc: 'Increases weight on high-end CPU, dedicated GPU, and RAM capacity.',
                icon: Zap
              },
              {
                id: 'price',
                title: 'Value & Budget First',
                desc: 'Prioritizes maximum savings, discounts, and low acquisition cost.',
                icon: DollarSign
              },
              {
                id: 'battery',
                title: 'Battery & Mobility',
                desc: 'Boosts portable, lightweight devices with marathon battery endurance.',
                icon: BatteryCharging
              },
              {
                id: 'balanced',
                title: 'Balanced Algorithm (Default)',
                desc: 'Standard multi-attribute weighting across all specifications equally.',
                icon: Scale
              }
            ].map(item => {
              const Icon = item.icon;
              const isSelected = priority === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setPriority(item.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-brand-50/70 dark:bg-brand-950/40 border-brand-500 text-brand-900 dark:text-brand-100 shadow-sm'
                      : 'border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Icon className={`w-4 h-4 ${isSelected ? 'text-brand-500' : 'text-zinc-400'}`} />
                      <span className="font-bold text-sm">{item.title}</span>
                    </div>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-brand-500" />}
                  </div>
                  <p className="text-xs text-zinc-500 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Gaming Interest Toggle */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
              <Gamepad2 className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-sm font-bold text-zinc-900 dark:text-zinc-100">
                Gaming & Heavy 3D Graphics Interest
              </span>
              <span className="text-xs text-zinc-500">
                Automatically prioritize dedicated RTX/Radeon graphics in laptop queries
              </span>
            </div>
          </div>

          <input
            type="checkbox"
            checked={gamingInterest}
            onChange={(e) => setGamingInterest(e.target.checked)}
            className="w-5 h-5 accent-brand-600 rounded cursor-pointer"
          />
        </div>

        {/* Preferred Categories Checklist */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">
            2. High-Interest Categories
          </label>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.filter(c => c !== 'All').map(cat => {
              const checked = preferredCats.includes(cat);
              return (
                <button
                  key={cat}
                  onClick={() => handleToggleCat(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    checked
                      ? 'bg-brand-600 text-white shadow-sm'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                  }`}
                >
                  {checked ? `✓ ${cat}` : `+ ${cat}`}
                </button>
              );
            })}
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex justify-end">
          <Button
            variant="primary"
            icon={Save}
            isLoading={saving}
            onClick={handleSave}
          >
            Save AI Preferences
          </Button>
        </div>
      </div>
    </div>
  );
};
