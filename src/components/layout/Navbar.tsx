'use client';

import React, { useState } from 'react';
import { Search, Globe, Sparkles, SlidersHorizontal, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface NavbarProps {
  activeTab: 'site-explorer' | 'keyword-explorer' | 'site-audit' | 'search-console' | 'settings';
  onTabChange: (tab: any) => void;
  searchQuery: string;
  onSearch: (query: string, country?: string) => void;
  selectedCountry: string;
  onCountryChange: (country: string) => void;
  onToggleAi: () => void;
  isAiOpen: boolean;
}

const COUNTRIES = [
  { code: 'US', name: 'United States 🇺🇸' },
  { code: 'GB', name: 'United Kingdom 🇬🇧' },
  { code: 'PK', name: 'Pakistan 🇵🇰' },
  { code: 'IN', name: 'India 🇮🇳' },
  { code: 'CA', name: 'Canada 🇨🇦' },
  { code: 'AU', name: 'Australia 🇦🇺' },
  { code: 'DE', name: 'Germany 🇩🇪' },
];

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  searchQuery,
  onSearch,
  selectedCountry,
  onCountryChange,
  onToggleAi,
  isAiOpen,
}) => {
  const [inputValue, setInputValue] = useState(searchQuery);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSearch(inputValue.trim(), selectedCountry);
    }
  };

  const getPlaceholder = () => {
    switch (activeTab) {
      case 'site-explorer':
        return 'Enter domain, URL or subdomain (e.g. vercel.com)...';
      case 'keyword-explorer':
        return 'Enter seed keyword (e.g. nextjs seo, ai marketing)...';
      case 'site-audit':
        return 'Enter website URL to audit (e.g. https://example.com)...';
      case 'search-console':
        return 'Enter verified domain (e.g. vercel.com)...';
      default:
        return 'Search across GrowthDesk...';
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-800 bg-[#0b0f19]/90 backdrop-blur-md px-4 sm:px-6 py-3">
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 max-w-[1600px] mx-auto">
        {/* Left: Brand & Mode Badges */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onTabChange('site-explorer')}>
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent">
                GrowthDesk
              </span>
              <span className="ml-1 text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                Enterprise
              </span>
            </div>
          </div>

          {/* Mobile AI toggle button */}
          <button
            onClick={onToggleAi}
            className="md:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-medium"
          >
            <Sparkles className="h-3.5 w-3.5" />
            AI Assistant
          </button>
        </div>

        {/* Center: Universal Interactive Search Bar */}
        <div className="w-full md:max-w-2xl">
          <form onSubmit={handleSubmit} className="relative flex items-center">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Search className="h-4 w-4" />
              </div>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={getPlaceholder()}
                className="w-full pl-10 pr-24 py-2 bg-gray-900/90 text-sm text-gray-100 placeholder-gray-500 rounded-xl border border-gray-700/80 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-inner"
              />
              <button
                type="submit"
                className="absolute inset-y-1 right-1 px-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-medium flex items-center gap-1 transition-all"
              >
                <span>Analyze</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Country Selector (for keyword analysis) */}
            {activeTab === 'keyword-explorer' && (
              <div className="ml-2 relative hidden sm:block">
                <select
                  value={selectedCountry}
                  onChange={(e) => onCountryChange(e.target.value)}
                  className="bg-gray-900 text-xs text-gray-200 py-2 px-3 pr-7 rounded-xl border border-gray-700 focus:outline-none focus:border-blue-500 cursor-pointer appearance-none"
                >
                  {COUNTRIES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none text-gray-400">
                  <Globe className="h-3.5 w-3.5" />
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Right: Quick actions & AI Drawer trigger */}
        <div className="hidden md:flex items-center gap-2.5">
          <button
            onClick={() => onTabChange('settings')}
            className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'settings'
                ? 'bg-gray-800 text-white border-gray-600'
                : 'bg-gray-900/50 text-gray-300 border-gray-800 hover:border-gray-700'
            }`}
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            API Keys
          </button>

          <button
            onClick={onToggleAi}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2 transition-all shadow-md ${
              isAiOpen
                ? 'bg-indigo-600 text-white ring-2 ring-indigo-400/50'
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>AI SEO Copilot</span>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
