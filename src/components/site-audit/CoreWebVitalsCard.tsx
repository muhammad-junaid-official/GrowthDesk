'use client';

import React from 'react';
import { CoreWebVitals } from '@/types/seo';
import { Gauge, Zap, Sparkles, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

interface CoreWebVitalsCardProps {
  vitals: CoreWebVitals;
}

export const CoreWebVitalsCard: React.FC<CoreWebVitalsCardProps> = ({ vitals }) => {
  const getRatingBadge = (rating: 'good' | 'needs-improvement' | 'poor') => {
    switch (rating) {
      case 'good':
        return {
          label: 'Good',
          icon: CheckCircle2,
          color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
        };
      case 'needs-improvement':
        return {
          label: 'Needs Work',
          icon: AlertTriangle,
          color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
        };
      case 'poor':
        return {
          label: 'Poor',
          icon: XCircle,
          color: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
        };
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-400';
    if (score >= 70) return 'text-amber-400';
    return 'text-rose-400';
  };

  const vitalItems = [
    {
      name: 'Largest Contentful Paint (LCP)',
      value: `${vitals.lcp.value}${vitals.lcp.unit}`,
      threshold: 'Target: ≤ 2.5s',
      rating: vitals.lcp.rating,
      description: 'Measures loading performance of primary page content.',
    },
    {
      name: 'Interaction to Next Paint (INP)',
      value: `${vitals.inp.value}${vitals.inp.unit}`,
      threshold: 'Target: ≤ 200ms',
      rating: vitals.inp.rating,
      description: 'Measures page responsiveness to user inputs & clicks.',
    },
    {
      name: 'Cumulative Layout Shift (CLS)',
      value: `${vitals.cls.value}`,
      threshold: 'Target: ≤ 0.1',
      rating: vitals.cls.rating,
      description: 'Measures visual stability and shifts during render.',
    },
    {
      name: 'Time to First Byte (TTFB)',
      value: `${vitals.ttfb.value}${vitals.ttfb.unit}`,
      threshold: 'Target: ≤ 800ms',
      rating: vitals.ttfb.rating,
      description: 'Measures server response and network latency.',
    },
  ];

  return (
    <div className="p-5 rounded-2xl bg-gray-900/60 border border-gray-800/80 space-y-5">
      {/* Header and Lighthouse Triple Score */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-gray-800">
        <div>
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-amber-400" />
            <h3 className="text-sm font-semibold text-white">Google PageSpeed & Core Web Vitals</h3>
          </div>
          <p className="text-xs text-gray-400 mt-0.5">
            Official Google Web Vitals ranking signals measured on mobile simulation
          </p>
        </div>

        {/* 3 Lighthouse Scores */}
        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-xl bg-gray-950 border border-gray-800 text-center">
            <div className="text-[10px] text-gray-400 font-semibold uppercase">Performance</div>
            <div className={`text-base font-extrabold ${getScoreColor(vitals.performanceScore)}`}>
              {vitals.performanceScore}
            </div>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-gray-950 border border-gray-800 text-center">
            <div className="text-[10px] text-gray-400 font-semibold uppercase">SEO Score</div>
            <div className={`text-base font-extrabold ${getScoreColor(vitals.seoScore)}`}>
              {vitals.seoScore}
            </div>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-gray-950 border border-gray-800 text-center">
            <div className="text-[10px] text-gray-400 font-semibold uppercase">Accessibility</div>
            <div className={`text-base font-extrabold ${getScoreColor(vitals.accessibilityScore)}`}>
              {vitals.accessibilityScore}
            </div>
          </div>
        </div>
      </div>

      {/* 4 Web Vitals Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {vitalItems.map((item, idx) => {
          const badge = getRatingBadge(item.rating);
          const Icon = badge.icon;
          return (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-gray-950/70 border border-gray-800/80 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                  <span className="font-medium truncate">{item.name}</span>
                </div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-2xl font-black text-white font-mono">{item.value}</span>
                </div>
                <div className="text-[10px] text-gray-500 font-mono">{item.threshold}</div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-gray-900 flex items-center justify-between">
                <span
                  className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${badge.color}`}
                >
                  <Icon className="h-3 w-3" />
                  {badge.label}
                </span>
                <span className="text-[10px] text-gray-500">Google Signal</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
