'use client';

import React from 'react';
import { DomainMetrics } from '@/types/seo';
import { formatNumber, formatCurrency } from '@/lib/utils';
import { Shield, Link2, Users, TrendingUp, DollarSign, Award } from 'lucide-react';

interface DomainMetricsCardsProps {
  metrics: DomainMetrics;
}

export const DomainMetricsCards: React.FC<DomainMetricsCardsProps> = ({ metrics }) => {
  const getDrColor = (dr: number) => {
    if (dr >= 70) return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
    if (dr >= 45) return 'text-blue-400 border-blue-500/30 bg-blue-500/10';
    if (dr >= 25) return 'text-amber-400 border-amber-500/30 bg-amber-500/10';
    return 'text-rose-400 border-rose-500/30 bg-rose-500/10';
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3.5">
      {/* Domain Rating (DR) */}
      <div className="p-4 rounded-2xl bg-gray-900/60 border border-gray-800/80 hover:border-gray-700 transition-all flex flex-col justify-between">
        <div className="flex items-center justify-between text-gray-400 text-xs font-medium">
          <span>Domain Rating</span>
          <Award className="h-4 w-4 text-blue-400" />
        </div>
        <div className="my-2 flex items-baseline gap-2">
          <span className="text-3xl font-extrabold tracking-tight text-white">{metrics.domainRating}</span>
          <span className="text-xs text-gray-500 font-mono">/ 100</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${getDrColor(metrics.domainRating)}`}>
            {metrics.domainRating >= 70 ? 'Very High Authority' : metrics.domainRating >= 45 ? 'Good Authority' : 'Emerging'}
          </span>
        </div>
      </div>

      {/* URL Rating (UR) */}
      <div className="p-4 rounded-2xl bg-gray-900/60 border border-gray-800/80 hover:border-gray-700 transition-all flex flex-col justify-between">
        <div className="flex items-center justify-between text-gray-400 text-xs font-medium">
          <span>URL Rating (UR)</span>
          <Shield className="h-4 w-4 text-indigo-400" />
        </div>
        <div className="my-2 flex items-baseline gap-2">
          <span className="text-3xl font-extrabold tracking-tight text-white">{metrics.urlRating}</span>
          <span className="text-xs text-gray-500 font-mono">/ 100</span>
        </div>
        <div className="text-[11px] text-gray-400">Page-level link strength</div>
      </div>

      {/* Total Backlinks */}
      <div className="p-4 rounded-2xl bg-gray-900/60 border border-gray-800/80 hover:border-gray-700 transition-all flex flex-col justify-between">
        <div className="flex items-center justify-between text-gray-400 text-xs font-medium">
          <span>Total Backlinks</span>
          <Link2 className="h-4 w-4 text-cyan-400" />
        </div>
        <div className="my-2">
          <span className="text-3xl font-extrabold tracking-tight text-cyan-400">
            {formatNumber(metrics.totalBacklinks)}
          </span>
        </div>
        <div className="text-[11px] text-gray-400 flex items-center justify-between">
          <span>DoFollow:</span>
          <span className="text-gray-200 font-medium">{metrics.dofollowPercent}%</span>
        </div>
      </div>

      {/* Referring Domains */}
      <div className="p-4 rounded-2xl bg-gray-900/60 border border-gray-800/80 hover:border-gray-700 transition-all flex flex-col justify-between">
        <div className="flex items-center justify-between text-gray-400 text-xs font-medium">
          <span>Referring Domains</span>
          <Users className="h-4 w-4 text-emerald-400" />
        </div>
        <div className="my-2">
          <span className="text-3xl font-extrabold tracking-tight text-emerald-400">
            {formatNumber(metrics.referringDomains)}
          </span>
        </div>
        <div className="text-[11px] text-gray-400">Unique referencing domains</div>
      </div>

      {/* Organic Traffic */}
      <div className="p-4 rounded-2xl bg-gray-900/60 border border-gray-800/80 hover:border-gray-700 transition-all flex flex-col justify-between">
        <div className="flex items-center justify-between text-gray-400 text-xs font-medium">
          <span>Organic Traffic</span>
          <TrendingUp className="h-4 w-4 text-amber-400" />
        </div>
        <div className="my-2">
          <span className="text-3xl font-extrabold tracking-tight text-white">
            {formatNumber(metrics.organicTrafficMonthly)}
          </span>
        </div>
        <div className="text-[11px] text-gray-400 flex items-center justify-between">
          <span>Keywords:</span>
          <span className="text-gray-200 font-medium">{formatNumber(metrics.organicKeywordsCount)}</span>
        </div>
      </div>

      {/* Organic Traffic Value */}
      <div className="p-4 rounded-2xl bg-gray-900/60 border border-gray-800/80 hover:border-gray-700 transition-all flex flex-col justify-between">
        <div className="flex items-center justify-between text-gray-400 text-xs font-medium">
          <span>Traffic Value</span>
          <DollarSign className="h-4 w-4 text-emerald-400" />
        </div>
        <div className="my-2">
          <span className="text-3xl font-extrabold tracking-tight text-emerald-300">
            {formatCurrency(metrics.trafficValueUsd)}
          </span>
        </div>
        <div className="text-[11px] text-gray-400">Estimated Google Ads value</div>
      </div>
    </div>
  );
};
