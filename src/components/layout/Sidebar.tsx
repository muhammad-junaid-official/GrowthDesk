'use client';

import React from 'react';
import {
  Globe,
  KeyRound,
  Activity,
  Sparkles,
  BarChart3,
  Settings,
  ExternalLink,
  ChevronRight,
  Shield,
  Layers,
} from 'lucide-react';

interface SidebarProps {
  activeTab: 'site-explorer' | 'keyword-explorer' | 'site-audit' | 'search-console' | 'settings';
  onTabChange: (tab: any) => void;
  onOpenAi: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange, onOpenAi }) => {
  const navItems = [
    {
      id: 'site-explorer',
      label: 'Site Explorer',
      description: 'Domain & Backlink Analysis',
      icon: Globe,
      badge: 'Live',
    },
    {
      id: 'keyword-explorer',
      label: 'Keyword Explorer',
      description: 'Volume, KD & SERP Intent',
      icon: KeyRound,
      badge: 'v3',
    },
    {
      id: 'site-audit',
      label: 'Technical Site Audit',
      description: 'Crawler & Core Web Vitals',
      icon: Activity,
      badge: '100%',
    },
    {
      id: 'search-console',
      label: 'Search Console',
      description: '1st-Party Clicks, CTR & Pos',
      icon: BarChart3,
      badge: 'GSC',
    },
    {
      id: 'settings',
      label: 'API Keys & Settings',
      description: 'DataForSEO & OpenAI Credentials',
      icon: Settings,
      badge: null,
    },
  ];

  return (
    <aside className="w-full lg:w-64 flex-shrink-0 border-r border-gray-800 bg-[#0f1422]/60 p-4 flex flex-col justify-between min-h-[calc(100vh-61px)]">
      <div className="space-y-6">
        {/* Navigation Group */}
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 px-3 mb-2.5">
            Core SEO Modules
          </div>
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white font-medium shadow-md shadow-blue-600/30'
                      : 'text-gray-400 hover:text-gray-100 hover:bg-gray-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-1.5 rounded-lg ${
                        isActive ? 'bg-blue-500 text-white' : 'bg-gray-800/80 text-gray-300'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold">{item.label}</div>
                      <div
                        className={`text-[10px] truncate max-w-[130px] ${
                          isActive ? 'text-blue-100' : 'text-gray-500'
                        }`}
                      >
                        {item.description}
                      </div>
                    </div>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${
                        isActive
                          ? 'bg-blue-700 text-white'
                          : 'bg-gray-800 text-gray-400 border border-gray-700'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* AI Quick Callout */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-br from-indigo-950/70 via-gray-900 to-blue-950/70 border border-indigo-500/20 relative overflow-hidden">
          <div className="flex items-center gap-2 mb-1.5">
            <Sparkles className="h-4 w-4 text-indigo-400" />
            <span className="text-xs font-semibold text-indigo-200">SEO AI Copilot</span>
          </div>
          <p className="text-[11px] text-gray-400 mb-3 leading-relaxed">
            Active context syncs automatically. Ask questions in English or Roman Urdu.
          </p>
          <button
            onClick={onOpenAi}
            className="w-full py-1.5 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium flex items-center justify-center gap-1.5 transition-all shadow-sm"
          >
            <span>Open Assistant</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Footer / System Status */}
      <div className="pt-4 border-t border-gray-800/60 text-xs text-gray-500 space-y-2">
        <div className="flex items-center justify-between text-[11px]">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Data Accuracy
          </span>
          <span className="text-gray-300 font-mono font-medium">100% Verified</span>
        </div>
        <div className="flex items-center justify-between text-[11px]">
          <span>DataForSEO v3 API</span>
          <span className="text-emerald-400">Ready</span>
        </div>
      </div>
    </aside>
  );
};
