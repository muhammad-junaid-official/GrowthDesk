'use client';

import React from 'react';
import { KeywordData, SearchIntent } from '@/types/seo';
import { formatNumber, formatCurrency } from '@/lib/utils';
import { Search, DollarSign, Target, Globe, AlertCircle, CheckCircle, Flame } from 'lucide-react';

interface KeywordOverviewCardProps {
  data: KeywordData;
}

export const KeywordOverviewCard: React.FC<KeywordOverviewCardProps> = ({ data }) => {
  const getDifficultyDetails = (kd: number) => {
    if (kd <= 20) {
      return {
        label: 'Easy',
        color: 'text-emerald-400',
        bg: 'bg-emerald-500/10',
        border: 'border-emerald-500/30',
        progressColor: '#10b981',
        description: 'You will need about 2-5 backlinks to rank in top 10.',
      };
    }
    if (kd <= 40) {
      return {
        label: 'Medium',
        color: 'text-blue-400',
        bg: 'bg-blue-500/10',
        border: 'border-blue-500/30',
        progressColor: '#3b82f6',
        description: 'You will need about 10-25 referring domains to rank in top 10.',
      };
    }
    if (kd <= 65) {
      return {
        label: 'Hard',
        color: 'text-amber-400',
        bg: 'bg-amber-500/10',
        border: 'border-amber-500/30',
        progressColor: '#f59e0b',
        description: 'Competitive term. Expect to build 35+ high authority backlinks.',
      };
    }
    return {
      label: 'Super Hard',
      color: 'text-rose-400',
      bg: 'bg-rose-500/10',
      border: 'border-rose-500/30',
      progressColor: '#f43f5e',
      description: 'Extremely competitive. Dominated by tier-1 global domain authorities.',
    };
  };

  const getIntentBadge = (intent: SearchIntent) => {
    switch (intent) {
      case 'Informational':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'Commercial':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'Transactional':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Navigational':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    }
  };

  const kdDetails = getDifficultyDetails(data.difficulty);

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
      {/* Primary KD Gauge Card */}
      <div className="md:col-span-4 p-5 rounded-2xl bg-gray-900/60 border border-gray-800/80 flex flex-col justify-between">
        <div className="flex items-center justify-between text-xs font-semibold text-gray-400">
          <span>Keyword Difficulty</span>
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${kdDetails.bg} ${kdDetails.color} ${kdDetails.border}`}>
            {kdDetails.label}
          </span>
        </div>

        <div className="my-5 flex items-center gap-5">
          <div className="relative h-24 w-24 flex items-center justify-center flex-shrink-0">
            {/* Circular SVG Gauge */}
            <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-gray-800"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                stroke={kdDetails.progressColor}
                strokeDasharray={`${data.difficulty}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-black text-white">{data.difficulty}</span>
              <span className="text-[9px] text-gray-500 uppercase font-mono">KD</span>
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold text-white">Chances to Rank</div>
            <p className="text-xs text-gray-400 mt-1 leading-relaxed">{kdDetails.description}</p>
          </div>
        </div>

        <div className="pt-3 border-t border-gray-800 text-[11px] text-gray-500 flex items-center gap-1.5">
          <CheckCircle className="h-3.5 w-3.5 text-blue-400" />
          <span>Calculated with DataForSEO v3 live algorithm</span>
        </div>
      </div>

      {/* Metrics breakdown (Volume, CPC, Global, Intent) */}
      <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        {/* Search Volume */}
        <div className="p-4 rounded-2xl bg-gray-900/60 border border-gray-800/80 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-medium text-gray-400">
            <span>Search Volume</span>
            <Search className="h-4 w-4 text-blue-400" />
          </div>
          <div className="my-2">
            <span className="text-3xl font-extrabold text-white tracking-tight">
              {formatNumber(data.searchVolume)}
            </span>
            <div className="text-[11px] text-gray-400 mt-0.5">Searches / month ({data.country})</div>
          </div>
          <div className="text-[10px] text-emerald-400 flex items-center gap-1 font-medium">
            <Flame className="h-3 w-3" />
            <span>High discovery term</span>
          </div>
        </div>

        {/* Global Volume */}
        <div className="p-4 rounded-2xl bg-gray-900/60 border border-gray-800/80 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-medium text-gray-400">
            <span>Global Volume</span>
            <Globe className="h-4 w-4 text-cyan-400" />
          </div>
          <div className="my-2">
            <span className="text-3xl font-extrabold text-cyan-300 tracking-tight">
              {formatNumber(data.globalVolumeTotal)}
            </span>
            <div className="text-[11px] text-gray-400 mt-0.5">Across all countries</div>
          </div>
          <div className="text-[10px] text-gray-400">US leads with 43%</div>
        </div>

        {/* CPC */}
        <div className="p-4 rounded-2xl bg-gray-900/60 border border-gray-800/80 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-medium text-gray-400">
            <span>CPC (Google Ads)</span>
            <DollarSign className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="my-2">
            <span className="text-3xl font-extrabold text-emerald-400 tracking-tight">
              {formatCurrency(data.cpc)}
            </span>
            <div className="text-[11px] text-gray-400 mt-0.5">Cost Per Click estimate</div>
          </div>
          <div className="text-[10px] text-gray-400">Paid ad competition: Moderate</div>
        </div>

        {/* Search Intent */}
        <div className="p-4 rounded-2xl bg-gray-900/60 border border-gray-800/80 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-medium text-gray-400">
            <span>Search Intent</span>
            <Target className="h-4 w-4 text-purple-400" />
          </div>
          <div className="my-2">
            <span
              className={`inline-block px-2.5 py-1 rounded-lg text-sm font-bold border ${getIntentBadge(
                data.intent
              )}`}
            >
              {data.intent}
            </span>
            <div className="text-[11px] text-gray-400 mt-1">Algorithm SERP classification</div>
          </div>
          <div className="text-[10px] text-gray-400">Target with dedicated guide/page</div>
        </div>
      </div>
    </div>
  );
};
