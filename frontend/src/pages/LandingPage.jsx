import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Cpu,
  Scale,
  Search,
  ShieldCheck,
  ChevronDown,
  Layers,
  Database,
  Code2,
  CheckCircle2,
  Zap,
  Laptop,
  Smartphone,
  Headphones,
  Gamepad2,
  Camera,
  Watch,
  Star,
  SlidersHorizontal,
  TrendingUp,
  BarChart3,
  Check,
  UserCheck,
  ShoppingBag,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { ThemeToggle } from '../components/common/ThemeToggle';
import { Button } from '../components/common/Button';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { formatPrice } from '../utils/formatters';

export const LandingPage = () => {
  const navigate = useNavigate();
  const { demoLogin, isAuthenticated, user } = useAuth();
  const toast = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState(0);

  // Handle direct search submission from the hero search bar
  const handleHeroSearch = async (queryText) => {
    const q = queryText || searchQuery;
    if (!q || !q.trim()) {
      navigate('/chat');
      return;
    }
    // Auto demo-login if not logged in to give instant frictionless experience
    if (!isAuthenticated) {
      await demoLogin('user');
    }
    navigate('/chat', { state: { initialPrompt: q.trim() } });
  };

  const handleInstantDemo = async () => {
    await demoLogin('user');
    navigate('/chat');
  };

  // 4 Featured Flagship Products for the Live Showcase
  const featuredProducts = [
    {
      id: 'laptop-1',
      name: 'Lenovo LOQ 15 Gen 9',
      subtitle: 'Intel Core i7 13th Gen • NVIDIA RTX 4060 (115W)',
      brand: 'Lenovo',
      category: 'Laptops',
      price: 74999,
      originalPrice: 92999,
      rating: 4.6,
      reviews: 1420,
      image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80',
      matchScore: 97,
      highlight: 'Best for ML & Gaming',
      specs: ['16GB DDR5', 'RTX 4060 8GB', '144Hz IPS', '512GB Gen4 SSD'],
      prompt: 'Suggest a laptop for coding, machine learning and gaming under ₹80,000.'
    },
    {
      id: 'laptop-2',
      name: 'Apple MacBook Air M3',
      subtitle: 'Apple M3 Chip • 18-Hour Battery • Silent Fanless',
      brand: 'Apple',
      category: 'Laptops',
      price: 104900,
      originalPrice: 114900,
      rating: 4.8,
      reviews: 2890,
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
      matchScore: 98,
      highlight: 'Best for Productivity',
      specs: ['Apple M3 8-Core', '16GB Unified RAM', 'Liquid Retina', '1.24 kg'],
      prompt: 'Why is MacBook Air M3 recommended for software engineering?'
    },
    {
      id: 'phone-2',
      name: 'OnePlus 12R 5G',
      subtitle: 'Snapdragon 8 Gen 2 • 100W SuperVOOC • 5500mAh',
      brand: 'OnePlus',
      category: 'Smartphones',
      price: 42999,
      originalPrice: 47999,
      rating: 4.6,
      reviews: 1850,
      image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
      matchScore: 95,
      highlight: 'Best Flagship Value',
      specs: ['16GB RAM', '1.5K ProXDR 120Hz', '50MP Sony IMX890', '5500mAh'],
      prompt: 'Is OnePlus 12R the best performance smartphone under ₹45,000?'
    },
    {
      id: 'audio-1',
      name: 'Sony WH-1000XM5',
      subtitle: 'Industry-Leading ANC • LDAC Hi-Res Audio • 30h Playback',
      brand: 'Sony',
      category: 'Headphones',
      price: 28990,
      originalPrice: 34990,
      rating: 4.7,
      reviews: 3210,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      matchScore: 96,
      highlight: 'Best Noise Cancellation',
      specs: ['Auto NC Optimizer', '8 Microphones', '30-hr Battery', 'Multipoint'],
      prompt: 'Find wireless headphones with active noise cancellation and long battery life.'
    }
  ];

  const categories = [
    { name: 'Laptops', count: '8 Models', icon: Laptop, prompt: 'Suggest a laptop for coding and machine learning under ₹80,000.' },
    { name: 'Smartphones', count: '7 Models', icon: Smartphone, prompt: 'I need a smartphone with a good camera under ₹30,000.' },
    { name: 'Headphones', count: '5 Models', icon: Headphones, prompt: 'Find the best wireless headphones with active noise cancellation.' },
    { name: 'Gaming Gear', count: '6 Models', icon: Gamepad2, prompt: 'Which gaming laptop or gear delivers the highest FPS under ₹1,00,000?' },
    { name: 'Cameras', count: '3 Models', icon: Camera, prompt: 'Recommend a mirrorless 4K camera for vlogging and content creation.' },
    { name: 'Smartwatches', count: '4 Models', icon: Watch, prompt: 'Find a smartwatch with long battery life and health tracking.' }
  ];

  const quickPrompts = [
    { label: '💻 Coding Laptop < ₹60k', query: 'Suggest a laptop under ₹60,000 for programming with at least 16GB RAM.' },
    { label: '📸 Camera Phone < ₹30k', query: 'I need a phone with a good camera under ₹30,000.' },
    { label: '🎧 Best ANC Headphones', query: 'Find wireless headphones with active noise cancellation and long battery life.' },
    { label: '⚡ Lenovo LOQ vs ASUS TUF', query: 'Compare Lenovo LOQ and ASUS TUF gaming laptops.' },
    { label: '🔥 Gaming Beast < ₹80k', query: 'Suggest a high performance gaming laptop with RTX 4060 under ₹80,000.' }
  ];

  const faqs = [
    {
      q: 'How does the AI Recommendation Engine calculate the match score?',
      a: 'ProductAI uses a Multi-Attribute Decision Making (MADM) scoring model. It extracts user constraints (budget, category, usage, RAM, GPU) via Natural Language Processing, and evaluates each candidate product against weighted parameters: Category Alignment (25%), Budget Tolerance (25%), Hardware Specs (20%), Persona Overlap (15%), Rating & Sentiment (8%), and Value Index (7%).'
    },
    {
      q: 'Can the chatbot maintain context across multiple turns?',
      a: 'Yes. If a user asks "Suggest phones under ₹30,000" and then follows up with "What about Samsung?", the conversation manager merges the active constraints so the assistant understands that you are still seeking Samsung phones strictly within the ₹30,000 budget.'
    },
    {
      q: 'What makes ProductAI different from standard e-commerce search?',
      a: 'Traditional e-commerce platforms rely on simplistic keyword matching and rank products based on paid advertising and vendor sponsorship. ProductAI is 100% unbiased, hardware-aware, and provides transparent mathematical reasoning ("Why this product?") with explicit pros and cons.'
    },
    {
      q: 'What happens if external LLM APIs are offline or unconfigured?',
      a: 'ProductAI features a dual-mode fallback architecture. When external LLM APIs are unavailable, the local explainable recommendation engine executes automatically with zero latency, full deterministic scoring, and detailed specifications comparison.'
    },
    {
      q: 'Is this project designed for real-world e-commerce deployment?',
      a: 'Yes. The system utilizes a decoupled REST API architecture with JWT authentication, user profile personalization, resilient database abstraction (dual MongoDB / JSON repo), and a responsive React 18 frontend.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 selection:bg-brand-500 selection:text-white relative overflow-x-hidden">
      {/* Background Radial Glow & Grid Mesh */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 dark:opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-brand-500/15 via-indigo-500/5 to-transparent blur-3xl pointer-events-none" />

      {/* Top Navigation */}
      <header className="sticky top-0 z-40 h-16 border-b border-zinc-200/80 dark:border-zinc-800/80 bg-white/85 dark:bg-[#09090b]/85 backdrop-blur-md px-4 sm:px-8 flex items-center justify-between transition-all">
        <div className="flex items-center gap-2.5">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 text-white flex items-center justify-center shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="font-extrabold text-lg tracking-tight">
              Product<span className="text-brand-600 dark:text-brand-400">AI</span>
            </span>
          </Link>
        </div>

        {/* Center Quick Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-zinc-600 dark:text-zinc-400">
          <a href="#showcase" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
            Featured Products
          </a>
          <a href="#pipeline" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
            MADM Pipeline
          </a>
          <a href="#comparison" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
            Why ProductAI
          </a>
          <a href="#faq" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
            FAQ
          </a>
          <Link to="/products" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
            Catalog (30+)
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline-block text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                Hi, <strong className="text-zinc-900 dark:text-zinc-200">{user?.name}</strong>
              </span>
              <Button
                variant="primary"
                size="sm"
                onClick={() => navigate('/chat')}
                icon={ArrowRight}
              >
                Open Chat
              </Button>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden sm:inline-flex px-3 py-1.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
              >
                Sign In
              </Link>
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleHeroSearch()}
                icon={ArrowRight}
              >
                Launch Assistant
              </Button>
            </>
          )}
        </div>
      </header>

      {/* Hero Section with Live Omni-Search */}
      <section className="relative z-10 pt-12 pb-16 sm:pt-20 sm:pb-24 px-4 sm:px-8 max-w-5xl mx-auto text-center">
        {/* Project Tag Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 dark:bg-brand-500/15 text-brand-700 dark:text-brand-300 border border-brand-500/25 text-xs sm:text-sm font-semibold mb-6 shadow-xs animate-fade-in">
          <Sparkles className="w-4 h-4 text-brand-500 animate-pulse" />
          <span>Next-Generation AI E-Commerce Decision Engine</span>
        </div>

        {/* Hero Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 max-w-4xl mx-auto leading-[1.08] mb-6">
          Shop Smarter with AI That{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-indigo-500 to-purple-500 dark:from-brand-400 dark:via-indigo-300 dark:to-purple-300">
            Understands Tech
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-10 font-normal">
          Stop scrolling through pages of sponsored ads. Ask for what you need in plain English — our hardware-aware MADM engine matches real specs, budget limits, and user sentiment with mathematical precision.
        </p>

        {/* Interactive Live Hero Omni-Search Bar */}
        <div className="max-w-2xl mx-auto mb-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleHeroSearch();
            }}
            className="relative flex items-center p-2 rounded-2xl bg-white dark:bg-[#121215] border-2 border-brand-500/30 dark:border-brand-500/40 shadow-xl shadow-brand-500/10 focus-within:border-brand-500 focus-within:ring-4 focus-within:ring-brand-500/20 transition-all duration-300"
          >
            <div className="p-2.5 text-brand-600 dark:text-brand-400 shrink-0">
              <Search className="w-5 h-5" />
            </div>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="e.g. Best laptop for programming and machine learning under ₹80,000..."
              className="flex-1 py-2 px-2 bg-transparent text-sm sm:text-base text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none"
            />

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs sm:text-sm flex items-center gap-1.5 shadow-md shadow-brand-500/25 transition-all duration-200 active:scale-95 shrink-0"
            >
              <Sparkles className="w-4 h-4" />
              <span>Ask AI</span>
            </button>
          </form>
        </div>

        {/* Clickable Quick-Prompt Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto mb-10">
          <span className="text-xs text-zinc-400 dark:text-zinc-500 mr-1 font-medium hidden sm:inline">
            Try asking:
          </span>
          {quickPrompts.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleHeroSearch(item.query)}
              className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#121215] hover:bg-brand-50 dark:hover:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-800 hover:border-brand-500/50 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-brand-600 dark:hover:text-brand-400 shadow-xs transition-all duration-200 active:scale-95"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Floating Trust Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto">
          <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-[#121215]/70 border border-zinc-200/80 dark:border-zinc-800/80 backdrop-blur-sm shadow-xs">
            <div className="text-xl sm:text-2xl font-black text-brand-600 dark:text-brand-400">&lt;100ms</div>
            <div className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 mt-0.5">Inference Latency</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-[#121215]/70 border border-zinc-200/80 dark:border-zinc-800/80 backdrop-blur-sm shadow-xs">
            <div className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400">98.4%</div>
            <div className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 mt-0.5">Match Precision</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-[#121215]/70 border border-zinc-200/80 dark:border-zinc-800/80 backdrop-blur-sm shadow-xs">
            <div className="text-xl sm:text-2xl font-black text-indigo-600 dark:text-indigo-400">30+ Models</div>
            <div className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 mt-0.5">Verified Hardware</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-[#121215]/70 border border-zinc-200/80 dark:border-zinc-800/80 backdrop-blur-sm shadow-xs">
            <div className="text-xl sm:text-2xl font-black text-purple-600 dark:text-purple-400">100%</div>
            <div className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 mt-0.5">Explainable Rationale</div>
          </div>
        </div>
      </section>

      {/* Interactive Live Simulation Terminal Card */}
      <section className="px-4 sm:px-8 max-w-4xl mx-auto mb-20 sm:mb-24">
        <div className="rounded-3xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden">
          {/* Terminal Window Header */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/50">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 text-xs font-mono font-semibold text-zinc-600 dark:text-zinc-300">
                productai-madm-runtime.preview
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-zinc-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>LIVE AI STREAM</span>
            </div>
          </div>

          {/* Terminal Content */}
          <div className="p-5 sm:p-7 space-y-4 text-left">
            {/* Simulated User Message */}
            <div className="flex justify-end">
              <div className="max-w-lg px-4 py-2.5 rounded-2xl rounded-br-sm bg-brand-600 text-white text-xs sm:text-sm font-medium shadow-sm">
                "I need a laptop for computer science, machine learning and gaming under ₹80,000."
              </div>
            </div>

            {/* Simulated AI Response Card */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 text-white flex items-center justify-center shrink-0 shadow-md">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="flex-1 p-4 sm:p-5 rounded-2xl bg-zinc-50 dark:bg-[#18181d] border border-zinc-200/80 dark:border-zinc-800">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current text-amber-500" />
                      97% Match Score
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-brand-500/10 text-brand-600 dark:text-brand-300">
                      Value Index: 9.4/10
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-zinc-900 dark:text-zinc-100">
                    ₹74,999 <span className="text-zinc-400 line-through text-[11px]">₹92,999</span>
                  </span>
                </div>

                <h4 className="font-extrabold text-sm sm:text-base text-zinc-900 dark:text-zinc-50 mb-1">
                  Top Recommendation: Lenovo LOQ 15 Gen 9 (Intel Core i7 / RTX 4060)
                </h4>

                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 mb-3 leading-relaxed">
                  <strong>Why this product?</strong> Features a dedicated 115W NVIDIA RTX 4060 GPU and 14-core Intel i7-13650HX processor, ideal for compiling code, training neural networks, and AAA gaming. Comes in ₹5,001 below your ₹80,000 budget.
                </p>

                {/* Micro spec pills */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  <span className="px-2 py-0.5 rounded-md bg-white dark:bg-zinc-800 text-[11px] font-mono text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                    16GB DDR5 5200MHz
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-white dark:bg-zinc-800 text-[11px] font-mono text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                    RTX 4060 (8GB VRAM)
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-white dark:bg-zinc-800 text-[11px] font-mono text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                    144Hz 100% sRGB
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-white dark:bg-zinc-800 text-[11px] font-mono text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                    512GB PCIe Gen4
                  </span>
                </div>

                {/* Action button inside preview */}
                <div className="flex items-center gap-2 pt-2 border-t border-zinc-200/60 dark:border-zinc-800">
                  <button
                    onClick={() => handleHeroSearch('Suggest a laptop for coding, machine learning and gaming under ₹80,000.')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-xs transition-colors"
                  >
                    <span>Run Query Live</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleHeroSearch('Compare Lenovo LOQ and MacBook Air M3 for programming.')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-200/80 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 text-xs font-semibold transition-colors"
                  >
                    <Scale className="w-3.5 h-3.5" />
                    <span>Compare with MacBook M3</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Hardware Showcase Grid */}
      <section id="showcase" className="py-16 sm:py-20 px-4 sm:px-8 max-w-6xl mx-auto border-t border-zinc-200/80 dark:border-zinc-800/80">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-bold mb-3">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Curated Hardware Catalog</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
            Trending Flagship Tech
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto mt-2">
            Click on any flagship device below to ask ProductAI for an in-depth spec analysis or comparison.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((p) => (
            <div
              key={p.id}
              className="group rounded-2xl bg-white dark:bg-[#121215] border border-zinc-200/90 dark:border-zinc-800 hover:border-brand-500/50 dark:hover:border-brand-500/50 shadow-sm hover:shadow-xl dark:hover:shadow-brand-500/5 transition-all duration-300 flex flex-col overflow-hidden"
            >
              {/* Product Image Box */}
              <div className="relative aspect-video sm:aspect-square overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-zinc-950/80 backdrop-blur-md text-white text-[10px] font-bold">
                  {p.brand}
                </div>
                <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-emerald-500 text-white text-[11px] font-bold shadow-sm">
                  {p.matchScore}% Match
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider mb-1">
                    {p.highlight}
                  </div>
                  <h3 className="font-extrabold text-base text-zinc-900 dark:text-zinc-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors mb-1 line-clamp-1">
                    {p.name}
                  </h3>
                  <p className="text-xs text-zinc-500 line-clamp-1 mb-3">
                    {p.subtitle}
                  </p>

                  {/* Spec pills */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {p.specs.slice(0, 3).map((spec, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-300 text-[10px] font-mono"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  {/* Price & Rating */}
                  <div className="flex items-baseline justify-between mb-4 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                    <div>
                      <span className="text-lg font-black text-zinc-900 dark:text-zinc-100">
                        {formatPrice(p.price)}
                      </span>
                      <span className="ml-1.5 text-xs text-zinc-400 line-through">
                        {formatPrice(p.originalPrice)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{p.rating}</span>
                    </div>
                  </div>

                  {/* Direct Action Button */}
                  <button
                    onClick={() => handleHeroSearch(p.prompt)}
                    className="w-full py-2.5 px-3 rounded-xl bg-zinc-100 hover:bg-brand-600 dark:bg-zinc-800 dark:hover:bg-brand-600 text-zinc-800 dark:text-zinc-200 hover:text-white dark:hover:text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all duration-200 group-hover:shadow-md"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-brand-500 group-hover:text-white" />
                    <span>Ask AI About This</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Products CTA */}
        <div className="text-center mt-10">
          <Button
            variant="outline"
            size="md"
            onClick={() => navigate('/products')}
            icon={Search}
          >
            Explore All 30+ Indexed Products in Catalog
          </Button>
        </div>
      </section>

      {/* Category Explorer Grid */}
      <section className="py-16 bg-zinc-100/60 dark:bg-zinc-900/30 border-y border-zinc-200/80 dark:border-zinc-800/80 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 mb-1">
              Faceted Categorization
            </h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-100">
              Browse by Tech Domain
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {categories.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <button
                  key={idx}
                  onClick={() => handleHeroSearch(cat.prompt)}
                  className="group p-4 rounded-2xl bg-white dark:bg-[#121215] border border-zinc-200/80 dark:border-zinc-800 hover:border-brand-500/50 dark:hover:border-brand-500/50 shadow-xs hover:shadow-md transition-all text-center flex flex-col items-center active:scale-95"
                >
                  <div className="p-3 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 group-hover:bg-brand-600 group-hover:text-white transition-all duration-200 mb-2.5">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <span className="font-bold text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                    {cat.name}
                  </span>
                  <span className="text-[11px] text-zinc-400 mt-0.5">
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison: ProductAI vs Traditional E-Commerce */}
      <section id="comparison" className="py-16 sm:py-20 px-4 sm:px-8 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-bold mb-3">
            <Scale className="w-3.5 h-3.5" />
            <span>The ProductAI Advantage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
            Why Traditional Search Fails Tech Buyers
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto mt-2">
            See how explainable AI eliminates buyer remorse compared to legacy e-commerce stores.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Traditional Way */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#121215] border border-rose-200/60 dark:border-rose-900/40 shadow-sm relative overflow-hidden">
            <div className="flex items-center gap-2 mb-4 text-rose-600 dark:text-rose-400 font-bold text-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              Traditional E-Commerce Search (Amazon / Flipkart)
            </div>
            <ul className="space-y-3.5 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 font-bold">✕</span>
                <span><strong>Sponsored Ad Overload:</strong> Results prioritized by merchant ad spend rather than technical merit.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 font-bold">✕</span>
                <span><strong>Manual Filter Fatigue:</strong> Requires manually clicking 12 different checkboxes for RAM, GPU wattage, and panel type.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 font-bold">✕</span>
                <span><strong>Zero Spec Rationale:</strong> No explanation of trade-offs, thermal throttling, or real-world battery life.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 font-bold">✕</span>
                <span><strong>Context-Free Queries:</strong> Cannot handle progressive refinement like "Now make it under ₹50,000".</span>
              </li>
            </ul>
          </div>

          {/* ProductAI Way */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#121215] border border-emerald-200/80 dark:border-emerald-900/50 shadow-md relative overflow-hidden ring-2 ring-emerald-500/20">
            <div className="flex items-center gap-2 mb-4 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              ProductAI Intelligent Shopping Assistant
            </div>
            <ul className="space-y-3.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>100% Unbiased Algorithm:</strong> Ranked purely by multi-attribute mathematical suitability and value score.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Natural Language Understanding:</strong> Casual queries automatically extract budget bounds, GPU tiers, and use cases.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Transparent "Why This Product":</strong> Clear bulleted breakdown of pros, cons, and budget savings.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Multi-Turn Constraint Memory:</strong> Smoothly handles follow-ups, comparisons, and budget updates.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* How It Works Section (MADM Pipeline) */}
      <section id="pipeline" className="py-16 sm:py-20 bg-zinc-100/60 dark:bg-zinc-900/30 border-y border-zinc-200/80 dark:border-zinc-800/80 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 mb-2">
              Decision Science Pipeline
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-100">
              How ProductAI Computes Recommendations
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto mt-2">
              A four-stage mathematical recommendation architecture engineered for high precision and transparent decision making.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 shadow-sm relative group hover:border-brand-500/50 transition-all">
              <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold text-sm mb-4">
                01
              </div>
              <h4 className="font-bold text-base mb-2">Natural Query</h4>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                User expresses casual requirements (e.g. "Good camera phone under 30k with clean software").
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 shadow-sm relative group hover:border-brand-500/50 transition-all">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm mb-4">
                02
              </div>
              <h4 className="font-bold text-base mb-2">Constraint Extraction</h4>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                NLP entity parser detects category, maximum budget, target brand, and specific hardware specs.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 shadow-sm relative group hover:border-brand-500/50 transition-all">
              <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-sm mb-4">
                03
              </div>
              <h4 className="font-bold text-base mb-2">Multi-Factor MADM</h4>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Evaluates candidate products against 6 weighted parameters (Budget 25%, Category 25%, Hardware 20%, etc.).
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 shadow-sm relative group hover:border-brand-500/50 transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-sm mb-4">
                04
              </div>
              <h4 className="font-bold text-base mb-2">Explainable Verdict</h4>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Generates actionable "Why this product?" rationale with trade-offs and specs comparison.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 1-Click Instant Demo Persona Launcher */}
      <section className="py-16 px-4 sm:px-8 max-w-4xl mx-auto text-center">
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-brand-600/10 via-indigo-600/5 to-purple-600/10 border border-brand-500/30 dark:border-brand-500/20 backdrop-blur-md">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/15 text-brand-700 dark:text-brand-300 text-xs font-bold mb-4">
            <Zap className="w-3.5 h-3.5" />
            <span>Frictionless 1-Click Demo Launcher</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-100 mb-3">
            Try ProductAI Instantly
          </h3>

          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 max-w-lg mx-auto mb-8">
            Experience the full shopping intelligence platform with zero signup required:
          </p>

          <div className="max-w-md mx-auto">
            {/* Shopper Demo */}
            <button
              onClick={() => handleInstantDemo()}
              className="w-full p-6 rounded-2xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 hover:border-brand-500 text-left transition-all shadow-lg hover:shadow-2xl active:scale-[0.99] group cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="w-10 h-10 rounded-2xl bg-brand-500/15 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold">
                  <UserCheck className="w-5 h-5" />
                </span>
                <span className="text-xs font-bold text-brand-600 dark:text-brand-400 group-hover:translate-x-1 transition-transform flex items-center gap-1.5 bg-brand-500/10 px-3 py-1.5 rounded-full">
                  Launch Assistant <ArrowRight className="w-4 h-4" />
                </span>
              </div>
              <h4 className="font-extrabold text-base text-zinc-900 dark:text-zinc-100 mb-1">
                Explore as Aarav Sharma (Shopper Demo)
              </h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">
                1-Click Instant Login • Pre-configured Wishlist & Preferences
              </p>
              <div className="text-xs text-zinc-400 leading-relaxed">
                Ask queries across any domain, compare specs side-by-side, search products, and experience transparent Google Gemini intelligence.
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Tech Stack Grid */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 max-w-5xl mx-auto border-t border-zinc-200/80 dark:border-zinc-800/80">
        <div className="text-center mb-12">
          <h2 className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 mb-2">
            Engineered For High Reliability
          </h2>
          <h3 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100">
            Technology Stack & Frameworks
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 flex flex-col items-center text-center shadow-xs">
            <Code2 className="w-8 h-8 text-brand-500 mb-2" />
            <span className="font-bold text-sm">React 18 + Vite</span>
            <span className="text-xs text-zinc-400">High-Performance SPA</span>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 flex flex-col items-center text-center shadow-xs">
            <Layers className="w-8 h-8 text-indigo-500 mb-2" />
            <span className="font-bold text-sm">Tailwind CSS</span>
            <span className="text-xs text-zinc-400">Design Tokens & Glass</span>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 flex flex-col items-center text-center shadow-xs">
            <Cpu className="w-8 h-8 text-emerald-500 mb-2" />
            <span className="font-bold text-sm">Node + Express</span>
            <span className="text-xs text-zinc-400">Decoupled REST API</span>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 flex flex-col items-center text-center shadow-xs">
            <Database className="w-8 h-8 text-purple-500 mb-2" />
            <span className="font-bold text-sm">Dual-Mode DB</span>
            <span className="text-xs text-zinc-400">MongoDB + Resilient Repo</span>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section id="faq" className="py-16 px-4 sm:px-8 max-w-3xl mx-auto border-t border-zinc-200/80 dark:border-zinc-800/80">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-center mb-8">
          Frequently Asked Questions
        </h3>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#121215] overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-bold text-sm sm:text-base text-zinc-800 dark:text-zinc-200"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-zinc-400 transition-transform duration-200 shrink-0 ml-2 ${
                    openFaq === idx ? 'rotate-180 text-brand-500' : ''
                  }`}
                />
              </button>

              {openFaq === idx && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-zinc-100 dark:border-zinc-800 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-10 px-4 text-center text-xs text-zinc-500 dark:text-zinc-400 bg-white/50 dark:bg-[#09090b]/50">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-lg bg-brand-600 text-white flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <span className="font-bold text-sm text-zinc-900 dark:text-zinc-100">ProductAI</span>
        </div>
        <p className="mb-2 max-w-md mx-auto">
          Intelligent AI Product Recommendation & Shopping Assistant — Hardware-Aware Decision Support System.
        </p>
        <p className="font-medium text-zinc-600 dark:text-zinc-300">
          Next-Generation Intelligent E-Commerce Shopping Assistant • 2026
        </p>
      </footer>
    </div>
  );
};
