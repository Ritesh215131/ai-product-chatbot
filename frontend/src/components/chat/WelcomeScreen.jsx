import React, { useState } from 'react';
import {
  Laptop,
  Smartphone,
  Headphones,
  Gamepad2,
  Camera,
  Watch,
  Sparkles,
  ArrowRight,
  Scale,
  Zap,
  HelpCircle,
  TrendingUp,
  Cpu,
  ShieldCheck
} from 'lucide-react';
import { PROMPT_SUGGESTIONS } from '../../utils/constants';

export const WelcomeScreen = ({ onSelectPrompt }) => {
  const [activeTab, setActiveTab] = useState('popular');

  const categories = [
    {
      name: 'Laptops',
      icon: Laptop,
      count: '8 models',
      prompt: 'Suggest a laptop for coding and machine learning under ₹80,000.',
      gradient: 'from-blue-500/20 to-indigo-500/10'
    },
    {
      name: 'Smartphones',
      icon: Smartphone,
      count: '7 models',
      prompt: 'I need a smartphone with a good camera and strong battery under ₹30,000.',
      gradient: 'from-purple-500/20 to-pink-500/10'
    },
    {
      name: 'Headphones',
      icon: Headphones,
      count: '5 models',
      prompt: 'Find the best wireless headphones with active noise cancellation and long battery life.',
      gradient: 'from-amber-500/20 to-orange-500/10'
    },
    {
      name: 'Gaming Gear',
      icon: Gamepad2,
      count: '6 models',
      prompt: 'Which gaming laptop or gear delivers the highest FPS for competitive esports under ₹1,00,000?',
      gradient: 'from-emerald-500/20 to-teal-500/10'
    },
    {
      name: 'Cameras',
      icon: Camera,
      count: '3 models',
      prompt: 'Recommend a mirrorless 4K camera for vlogging and content creation under ₹75,000.',
      gradient: 'from-rose-500/20 to-red-500/10'
    },
    {
      name: 'Smartwatches',
      icon: Watch,
      count: '4 models',
      prompt: 'Find a smartwatch with at least 7 days battery life, GPS, and health tracking.',
      gradient: 'from-cyan-500/20 to-blue-500/10'
    }
  ];

  const promptCollections = {
    popular: [
      {
        tag: '🔥 Popular',
        title: 'Coding & ML Rig',
        prompt: 'Suggest a laptop for coding, machine learning and gaming under ₹80,000.'
      },
      {
        tag: '📸 Camera Focus',
        title: 'Camera Phone < ₹30k',
        prompt: 'I need a phone with a good camera under ₹30,000.'
      },
      {
        tag: '🎧 Premium Sound',
        title: 'Noise-Cancelling Audio',
        prompt: 'Find wireless headphones with ANC and long battery life.'
      },
      {
        tag: '⚖️ Side-by-Side',
        title: 'Head-to-Head Comparison',
        prompt: 'Compare Lenovo LOQ and ASUS TUF gaming laptops.'
      }
    ],
    budget: [
      {
        tag: '💰 Best Value',
        title: 'Budget Laptop under ₹45,000',
        prompt: 'Which laptop offers the best value for money under ₹45,000 for college work?'
      },
      {
        tag: '💰 Value Phone',
        title: '5G Phone under ₹20,000',
        prompt: 'Recommend a fast 5G smartphone under ₹20,000 with clean software.'
      },
      {
        tag: '💰 Audio Value',
        title: 'TWS Earbuds under ₹5,000',
        prompt: 'Best wireless earbuds with active noise cancellation under ₹5,000.'
      },
      {
        tag: '💰 Smart Wearable',
        title: 'Fitness Watch under ₹4,000',
        prompt: 'Suggest an accurate fitness smartwatch with AMOLED display under ₹4,000.'
      }
    ],
    tech: [
      {
        tag: '⚡ Hardware Specs',
        title: '16GB RAM + RTX GPU',
        prompt: 'Find a product with at least 16GB RAM and dedicated NVIDIA graphics.'
      },
      {
        tag: '💡 Spec Explainer',
        title: 'OLED vs IPS Screens',
        prompt: 'Explain the specifications and trade-offs of OLED versus IPS displays for laptops.'
      },
      {
        tag: '⚖️ Comparison Matrix',
        title: 'MacBook M3 vs Lenovo LOQ',
        prompt: 'Compare MacBook Air M3 and Lenovo LOQ for programming and battery life.'
      },
      {
        tag: '🔍 Cheaper Alternative',
        title: 'Similar but Cheaper',
        prompt: 'Recommend something similar to the Sony WH-1000XM5 headphones but cheaper.'
      }
    ]
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto px-4 py-6 sm:py-10 animate-fade-in text-center">
      {/* Radiant Glowing Emblem */}
      <div className="relative mb-5 group">
        <div className="absolute -inset-2 bg-gradient-to-r from-brand-600 via-indigo-500 to-purple-600 rounded-2xl blur-lg opacity-30 group-hover:opacity-60 transition duration-500 animate-pulse-subtle" />
        <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-500 text-white flex items-center justify-center shadow-xl shadow-brand-500/25 border border-white/20">
          <Sparkles className="w-7 h-7 sm:w-8 sm:h-8" />
        </div>
      </div>

      {/* AI Sparkle Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 dark:bg-brand-500/15 text-brand-700 dark:text-brand-300 border border-brand-500/25 text-xs font-semibold mb-4 shadow-sm">
        <Cpu className="w-3.5 h-3.5 text-brand-500" />
        <span>Hardware-Aware Multi-Attribute Decision System</span>
      </div>

      {/* Main Headline */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 mb-3">
        What can I help you find today?
      </h1>

      {/* Subtitle */}
      <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 max-w-2xl mb-8 leading-relaxed font-normal">
        Ask naturally in plain English. ProductAI evaluates real hardware specifications, budget limits, user ratings, and value scores to recommend the best match.
      </p>

      {/* Category Suggestion Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 w-full mb-8">
        {categories.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <button
              key={idx}
              onClick={() => onSelectPrompt(cat.prompt)}
              className="group relative flex flex-col items-center p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#121215] border border-zinc-200/80 dark:border-zinc-800 hover:border-brand-500/50 dark:hover:border-brand-500/50 shadow-sm hover:shadow-xl hover:shadow-brand-500/5 transition-all duration-300 text-center active:scale-[0.98] overflow-hidden"
            >
              {/* Subtle gradient hover highlight */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
              />

              <div className="relative p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 text-brand-600 dark:text-brand-400 group-hover:bg-brand-600 group-hover:text-white transition-all duration-300 mb-2.5 shadow-inner group-hover:rotate-3 group-hover:scale-110">
                <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>

              <span className="relative text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                {cat.name}
              </span>

              <span className="relative text-[11px] text-zinc-400 dark:text-zinc-500 mt-0.5 font-medium">
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Prompt Collections with Tabs */}
      <div className="w-full text-left bg-white/60 dark:bg-[#121215]/60 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-zinc-200/80 dark:border-zinc-800 shadow-sm mb-6">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-4 border-b border-zinc-200/70 dark:border-zinc-800 pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            Suggested Questions to Get Started:
          </span>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800/80 p-0.5 rounded-lg text-xs font-semibold">
            <button
              onClick={() => setActiveTab('popular')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                activeTab === 'popular'
                  ? 'bg-white dark:bg-zinc-700 text-brand-600 dark:text-brand-300 shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              Popular
            </button>
            <button
              onClick={() => setActiveTab('budget')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                activeTab === 'budget'
                  ? 'bg-white dark:bg-zinc-700 text-brand-600 dark:text-brand-300 shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              Budget & Value
            </button>
            <button
              onClick={() => setActiveTab('tech')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                activeTab === 'tech'
                  ? 'bg-white dark:bg-zinc-700 text-brand-600 dark:text-brand-300 shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              Tech & Compare
            </button>
          </div>
        </div>

        {/* Prompt Chips */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {promptCollections[activeTab].map((p, idx) => (
            <button
              key={idx}
              onClick={() => onSelectPrompt(p.prompt)}
              className="group flex items-center justify-between p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 hover:bg-brand-50/50 dark:hover:bg-zinc-800/80 border border-zinc-200/70 dark:border-zinc-800 hover:border-brand-500/40 text-left transition-all duration-200 shadow-xs"
            >
              <div className="flex-1 pr-3">
                <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 mb-0.5">
                  {p.tag}
                </span>
                <p className="text-xs sm:text-sm font-medium text-zinc-800 dark:text-zinc-200 group-hover:text-brand-600 dark:group-hover:text-brand-300 line-clamp-1">
                  "{p.prompt}"
                </p>
              </div>
              <div className="w-7 h-7 rounded-lg bg-zinc-200/60 dark:bg-zinc-800 group-hover:bg-brand-600 group-hover:text-white text-zinc-500 flex items-center justify-center shrink-0 transition-all">
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Conversational Pro-Tip Footer Banner */}
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800/80 text-xs text-zinc-600 dark:text-zinc-400">
        <Sparkles className="w-3.5 h-3.5 text-brand-500 shrink-0" />
        <span>
          <strong>Pro-Tip:</strong> The assistant retains context across turns. Try following up with{' '}
          <span className="text-brand-600 dark:text-brand-400 font-semibold">"What about Samsung?"</span> or{' '}
          <span className="text-brand-600 dark:text-brand-400 font-semibold">"Can you find something cheaper?"</span>
        </span>
      </div>
    </div>
  );
};
