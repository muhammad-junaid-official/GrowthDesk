'use client';

import React from 'react';
import { DomainMetrics } from '@/types/seo';
import { DomainMetricsCards } from './DomainMetricsCards';
import { TrafficChart } from './TrafficChart';
import { BacklinksTable } from './BacklinksTable';
import { TopPagesTable } from './TopPagesTable';
import { Globe, ArrowUpRight, Sparkles, RefreshCw } from 'lucide-react';

interface SiteExplorerViewProps {
  data: DomainMetrics | null;
  loading: boolean;
  onRefresh: () => void;
  onAskAiAboutDomain: () => void;
}

export const SiteExplorerView: React.FC<SiteExplorerViewProps> = ({
  data,
  loading,
  onRefresh,
  onAskAiAboutDomain,
}) => {
  if (loading) {
    return (
      <div className="space-y-5 animate-pulse">
        <div className="h-28 bg-gray-900/60 rounded-2xl border border-gray-800" />
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3.5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-28 bg-gray-900/60 rounded-2xl border border-gray-800" />
          ))}
        </div>
        <div className="h-72 bg-gray-900/60 rounded-2xl border border-gray-800" />
        <div className="h-80 bg-gray-900/60 rounded-2xl border border-gray-800" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-12 text-center rounded-2xl bg-gray-900/40 border border-gray-800 max-w-xl mx-auto my-12">
        <Globe className="h-12 w-12 text-blue-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-white">No Domain Analyzed Yet</h3>
        <p className="text-sm text-gray-400 mt-2">
          Enter any target domain (e.g., <code className="text-blue-400">vercel.com</code> or <code className="text-blue-400">github.com</code>) in the search bar above to generate a full backlink profile and traffic breakdown.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Banner for Current Domain */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-950/40 via-gray-900 to-indigo-950/30 border border-blue-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Globe className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white tracking-tight">{data.domain}</h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Verified 100%
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">
              Live SERP & Backlink profile powered by DataForSEO v3 REST API
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
            <span>Re-crawl</span>
          </button>

          <button
            onClick={onAskAiAboutDomain}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-medium text-xs flex items-center gap-1.5 transition-all shadow-md shadow-indigo-600/20"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Ask AI: Growth Strategy</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* 6 Key Stat Cards */}
      <DomainMetricsCards metrics={data} />

      {/* 12-Month Traffic & Backlinks Curve */}
      <TrafficChart data={data.historicalTraffic} domain={data.domain} />

      {/* Grid: Top Pages & Backlinks Table */}
      <TopPagesTable topPages={data.topPages} domain={data.domain} />

      <BacklinksTable backlinks={data.backlinks} domain={data.domain} />
    </div>
  );
};
