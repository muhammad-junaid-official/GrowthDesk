'use client';

import React from 'react';
import { AlertCircle, AlertTriangle, Info, CheckCircle2, ShieldCheck } from 'lucide-react';

interface HealthScoreCardProps {
  healthScore: number;
  totalChecks: number;
  passedChecks: number;
  criticalCount: number;
  warningsCount: number;
  noticesCount: number;
  statusCode: number;
  loadTimeMs: number;
}

export const HealthScoreCard: React.FC<HealthScoreCardProps> = ({
  healthScore,
  totalChecks,
  passedChecks,
  criticalCount,
  warningsCount,
  noticesCount,
  statusCode,
  loadTimeMs,
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 90) return '#10b981';
    if (score >= 70) return '#3b82f6';
    if (score >= 50) return '#f59e0b';
    return '#f43f5e';
  };

  const scoreColor = getScoreColor(healthScore);

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
      {/* Circular Health Score */}
      <div className="md:col-span-4 p-5 rounded-2xl bg-gray-900/60 border border-gray-800/80 flex flex-col justify-between">
        <div className="flex items-center justify-between text-xs font-semibold text-gray-400">
          <span>Overall Site Health Score</span>
          <span className="text-[10px] text-gray-500 font-mono">Status: {statusCode} OK</span>
        </div>

        <div className="my-5 flex items-center gap-5">
          <div className="relative h-24 w-24 flex items-center justify-center flex-shrink-0">
            <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-gray-800"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                stroke={scoreColor}
                strokeDasharray={`${healthScore}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-white">{healthScore}</span>
              <span className="text-[9px] text-gray-500 uppercase font-mono">/100</span>
            </div>
          </div>

          <div>
            <div className="text-sm font-bold text-white">
              {healthScore >= 85 ? 'Excellent Technical Health' : healthScore >= 70 ? 'Moderate Health' : 'Needs Optimization'}
            </div>
            <p className="text-xs text-gray-400 mt-1">
              {passedChecks} of {totalChecks} critical SEO technical audits passed.
            </p>
            <div className="text-[11px] text-gray-500 font-mono mt-1">
              Response Time: {loadTimeMs}ms
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-gray-800 text-[11px] text-gray-400 flex items-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
          <span>Real-time live crawler scan verification</span>
        </div>
      </div>

      {/* 3 Issue Count Cards */}
      <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        {/* Critical Errors */}
        <div className="p-4 rounded-2xl bg-gray-900/60 border border-rose-500/20 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-semibold text-rose-400">
            <span>Critical Errors</span>
            <AlertCircle className="h-4 w-4" />
          </div>
          <div className="my-2">
            <span className="text-3xl font-extrabold text-rose-400">{criticalCount}</span>
            <div className="text-[11px] text-gray-400 mt-0.5">High severity issues</div>
          </div>
          <div className="text-[10px] text-rose-300 font-medium">
            Blocks indexing or rank potential
          </div>
        </div>

        {/* Warnings */}
        <div className="p-4 rounded-2xl bg-gray-900/60 border border-amber-500/20 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-semibold text-amber-400">
            <span>Warnings</span>
            <AlertTriangle className="h-4 w-4" />
          </div>
          <div className="my-2">
            <span className="text-3xl font-extrabold text-amber-400">{warningsCount}</span>
            <div className="text-[11px] text-gray-400 mt-0.5">Medium severity issues</div>
          </div>
          <div className="text-[10px] text-amber-300 font-medium">
            Affects CTR and user experience
          </div>
        </div>

        {/* Notices */}
        <div className="p-4 rounded-2xl bg-gray-900/60 border border-blue-500/20 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-semibold text-blue-400">
            <span>Notices</span>
            <Info className="h-4 w-4" />
          </div>
          <div className="my-2">
            <span className="text-3xl font-extrabold text-blue-400">{noticesCount}</span>
            <div className="text-[11px] text-gray-400 mt-0.5">Minor recommendations</div>
          </div>
          <div className="text-[10px] text-blue-300 font-medium">
            Best practices & structured data
          </div>
        </div>
      </div>
    </div>
  );
};
