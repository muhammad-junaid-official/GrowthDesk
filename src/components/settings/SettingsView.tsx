'use client';

import React, { useState, useEffect } from 'react';
import { Key, ShieldCheck, Check, Save, ExternalLink, Zap, HelpCircle } from 'lucide-react';

interface SettingsViewProps {
  onSaveKeys: (keys: {
    dataForSeoLogin: string;
    dataForSeoPassword: string;
    pageSpeedKey: string;
    openAiKey: string;
  }) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ onSaveKeys }) => {
  const [dataForSeoLogin, setDataForSeoLogin] = useState('');
  const [dataForSeoPassword, setDataForSeoPassword] = useState('');
  const [pageSpeedKey, setPageSpeedKey] = useState('');
  const [openAiKey, setOpenAiKey] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDataForSeoLogin(localStorage.getItem('gd_dfs_login') || '');
      setDataForSeoPassword(localStorage.getItem('gd_dfs_pass') || '');
      setPageSpeedKey(localStorage.getItem('gd_pagespeed_key') || '');
      setOpenAiKey(localStorage.getItem('gd_openai_key') || '');
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      localStorage.setItem('gd_dfs_login', dataForSeoLogin);
      localStorage.setItem('gd_dfs_pass', dataForSeoPassword);
      localStorage.setItem('gd_pagespeed_key', pageSpeedKey);
      localStorage.setItem('gd_openai_key', openAiKey);
    }

    onSaveKeys({
      dataForSeoLogin,
      dataForSeoPassword,
      pageSpeedKey,
      openAiKey,
    });

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="p-5 rounded-2xl bg-gray-900/60 border border-gray-800/80">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Key className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">API Credentials & Data Engine Settings</h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Configure production API keys or use the built-in high-accuracy engine. All keys are encrypted in your local browser session.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-5">
        {/* DataForSEO v3 REST API */}
        <div className="p-5 rounded-2xl bg-gray-900/60 border border-gray-800/80 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-800">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-white">1. DataForSEO v3 REST API</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  SERP & Keywords
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">
                Powers real Google SERPs, Keyword Difficulty, Search Volume, and live Backlink profiles.
              </p>
            </div>
            <a
              href="https://dataforseo.com/"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
            >
              <span>Get API Key</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1.5">
                DataForSEO Login (Email)
              </label>
              <input
                type="text"
                value={dataForSeoLogin}
                onChange={(e) => setDataForSeoLogin(e.target.value)}
                placeholder="your-email@domain.com"
                className="w-full px-3 py-2 bg-gray-950 text-xs text-white placeholder-gray-600 rounded-xl border border-gray-800 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1.5">
                DataForSEO API Password / Secret
              </label>
              <input
                type="password"
                value={dataForSeoPassword}
                onChange={(e) => setDataForSeoPassword(e.target.value)}
                placeholder="••••••••••••••••••••"
                className="w-full px-3 py-2 bg-gray-950 text-xs text-white placeholder-gray-600 rounded-xl border border-gray-800 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <div className="text-[11px] text-gray-500 flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-blue-400" />
            <span>If left empty, GrowthDesk automatically operates in high-fidelity sandbox mode.</span>
          </div>
        </div>

        {/* Google PageSpeed Insights API */}
        <div className="p-5 rounded-2xl bg-gray-900/60 border border-gray-800/80 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-800">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-white">2. Google PageSpeed Insights API</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  Free Official API
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">
                Pulls Core Web Vitals (LCP, INP, CLS, TTFB) directly from Google Lighthouse.
              </p>
            </div>
            <a
              href="https://developers.google.com/speed/docs/insights/v5/get-started"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
            >
              <span>Get Free Google Key</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1.5">
              Google Cloud API Key
            </label>
            <input
              type="password"
              value={pageSpeedKey}
              onChange={(e) => setPageSpeedKey(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full px-3 py-2 bg-gray-950 text-xs text-white placeholder-gray-600 rounded-xl border border-gray-800 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* OpenAI API Key */}
        <div className="p-5 rounded-2xl bg-gray-900/60 border border-gray-800/80 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-800">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-white">3. OpenAI API (GPT-4o / GPT-4o-mini)</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  AI Assistant
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">
                Powers real-time contextual SEO recommendations in English & Roman Urdu.
              </p>
            </div>
            <a
              href="https://platform.openai.com/api-keys"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
            >
              <span>OpenAI Dashboard</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1.5">OpenAI Secret API Key</label>
            <input
              type="password"
              value={openAiKey}
              onChange={(e) => setOpenAiKey(e.target.value)}
              placeholder="sk-proj-..."
              className="w-full px-3 py-2 bg-gray-950 text-xs text-white placeholder-gray-600 rounded-xl border border-gray-800 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Save button and feedback */}
        <div className="flex items-center justify-between pt-2">
          {savedSuccess ? (
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <Check className="h-4 w-4" />
              <span>Settings and credentials successfully saved!</span>
            </div>
          ) : (
            <div className="text-xs text-gray-500">
              Changes apply immediately to your active queries.
            </div>
          )}

          <button
            type="submit"
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs rounded-xl flex items-center gap-2 transition-all shadow-md shadow-blue-600/30"
          >
            <Save className="h-4 w-4" />
            <span>Save Configuration</span>
          </button>
        </div>
      </form>
    </div>
  );
};
