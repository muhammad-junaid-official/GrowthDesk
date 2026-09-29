'use client';

import React from 'react';
import { TechnicalAuditData } from '@/types/seo';
import { HealthScoreCard } from './HealthScoreCard';
import { CoreWebVitalsCard } from './CoreWebVitalsCard';
import { CrawlerDetails } from './CrawlerDetails';
import { IssuesList } from './IssuesList';
import { Activity, Sparkles, ArrowUpRight, RefreshCw } from 'lucide-react';

interface SiteAuditViewProps {
  data: TechnicalAuditData | null;
  loading: boolean;
  onRefresh: () => void;
  onAskAiAboutAudit: () => void;
}

export const SiteAuditView: React.FC<SiteAuditViewProps> = ({
  data,
  loading,
  onRefresh,
  onAskAiAboutAudit,
}) => {
  if (loading) {
    return (
      <div className="space-y-5 animate-pulse">
        <div className="h-28 bg-gray-900/60 rounded-2xl border border-gray-800" />
        <div className="h-44 bg-gray-900/60 rounded-2xl border border-gray-800" />
        <div className="h-64 bg-gray-900/60 rounded-2xl border border-gray-800" />
        <div className="h-80 bg-gray-900/60 rounded-2xl border border-gray-800" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-12 text-center rounded-2xl bg-gray-900/40 border border-gray-800 max-w-xl mx-auto my-12">
        <Activity className="h-12 w-12 text-blue-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-white">No Site Audit Performed Yet</h3>
        <p className="text-sm text-gray-400 mt-2">
          Enter any complete website URL (e.g. <code className="text-blue-400">https://vercel.com</code>) in the search bar above to crawl the page and inspect Core Web Vitals.
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
            <Activity className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white tracking-tight">{data.url}</h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Live Crawled
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">
              Scanned on {new Date(data.scannedAt).toLocaleTimeString()} · Status code: {data.statusCode}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onRefresh}
            className="p-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-700 transition-all text-xs flex items-center gap-1.5"
            title="Re-crawl URL"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Re-crawl</span>
          </button>

          <button
            onClick={onAskAiAboutAudit}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-medium text-xs flex items-center gap-1.5 transition-all shadow-md shadow-indigo-600/20"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Ask AI: Fix Technical Issues</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Health Score & Error Summary */}
      <HealthScoreCard
        healthScore={data.healthScore}
        totalChecks={data.totalChecks}
        passedChecks={data.passedChecks}
        criticalCount={data.criticalErrorsCount}
        warningsCount={data.warningsCount}
        noticesCount={data.noticesCount}
        statusCode={data.statusCode}
        loadTimeMs={data.loadTimeMs}
      />

      {/* Google PageSpeed & Core Web Vitals */}
      <CoreWebVitalsCard vitals={data.coreWebVitals} />

      {/* Crawler On-Page Tag Inspector */}
      <CrawlerDetails meta={data.meta} url={data.url} />

      {/* Actionable Issues List */}
      <IssuesList issues={data.issues} url={data.url} />
    </div>
  );
};
