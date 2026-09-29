'use client';

import React from 'react';
import { KeywordData } from '@/types/seo';
import { KeywordOverviewCard } from './KeywordOverviewCard';
import { GlobalVolumeBreakdown } from './GlobalVolumeBreakdown';
import { KeywordIdeasTable } from './KeywordIdeasTable';
import { SerpOverviewTable } from './SerpOverviewTable';
import { KeyRound, Sparkles, ArrowUpRight, RefreshCw } from 'lucide-react';

interface KeywordExplorerViewProps {
  data: KeywordData | null;
  loading: boolean;
  onRefresh: () => void;
  onAskAiAboutKeyword: () => void;
}

export const KeywordExplorerView: React.FC<KeywordExplorerViewProps> = ({
  data,
  loading,
  onRefresh,
  onAskAiAboutKeyword,
}) => {
  if (loading) {
    return (
      <div className="space-y-5 animate-pulse">
        <div className="h-28 bg-gray-900/60 rounded-2xl border border-gray-800" />
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-4 h-48 bg-gray-900/60 rounded-2xl border border-gray-800" />
          <div className="md:col-span-8 h-48 bg-gray-900/60 rounded-2xl border border-gray-800" />
        </div>
        <div className="h-72 bg-gray-900/60 rounded-2xl border border-gray-800" />
        <div className="h-72 bg-gray-900/60 rounded-2xl border border-gray-800" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-12 text-center rounded-2xl bg-gray-900/40 border border-gray-800 max-w-xl mx-auto my-12">
        <KeyRound className="h-12 w-12 text-blue-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-white">Search Any Keyword</h3>
        <p className="text-sm text-gray-400 mt-2">
          Type any seed keyword (e.g., <code className="text-blue-400">seo tools</code> or <code className="text-blue-400">nextjs boilerplate</code>) in the search bar above to inspect live volume, difficulty, and Google SERP rankings.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-950/40 via-gray-900 to-indigo-950/30 border border-blue-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <KeyRound className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white tracking-tight">&quot;{data.keyword}&quot;</h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-mono">
                {data.country} Market
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">
              Live Keyword Difficulty, Exact CPC, and Search Intent from Google Ads & SERP v3 API
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onRefresh}
            className="p-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-700 transition-all text-xs flex items-center gap-1.5"
            title="Refresh Live Data"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Re-fetch</span>
          </button>

          <button
            onClick={onAskAiAboutKeyword}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-medium text-xs flex items-center gap-1.5 transition-all shadow-md shadow-indigo-600/20"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Ask AI: Content Angle</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Primary Overview & Metrics */}
      <KeywordOverviewCard data={data} />

      {/* 2-Column: Global Volume & SERP preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4">
          <GlobalVolumeBreakdown
            breakdown={data.countryBreakdown}
            totalGlobal={data.globalVolumeTotal}
          />
        </div>
        <div className="lg:col-span-8">
          <SerpOverviewTable results={data.serpResults} keyword={data.keyword} />
        </div>
      </div>

      {/* Ideas and Questions Table */}
      <KeywordIdeasTable
        ideas={data.ideas}
        questions={data.questions}
        seedKeyword={data.keyword}
      />
    </div>
  );
};
