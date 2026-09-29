'use client';

import React from 'react';
import { formatNumber } from '@/lib/utils';
import { Globe } from 'lucide-react';

interface GlobalVolumeBreakdownProps {
  breakdown: { country: string; countryCode: string; volume: number; share: number }[];
  totalGlobal: number;
}

export const GlobalVolumeBreakdown: React.FC<GlobalVolumeBreakdownProps> = ({
  breakdown,
  totalGlobal,
}) => {
  return (
    <div className="p-5 rounded-2xl bg-gray-900/60 border border-gray-800/80">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4 text-cyan-400" />
          <h3 className="text-sm font-semibold text-white">Global Volume by Geography</h3>
        </div>
        <span className="text-xs text-cyan-400 font-mono font-semibold">
          Total: {formatNumber(totalGlobal)}
        </span>
      </div>

      <div className="space-y-3">
        {breakdown.map((item) => (
          <div key={item.countryCode} className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-300 font-medium">{item.country}</span>
              <div className="flex items-center gap-2 font-mono">
                <span className="text-white">{formatNumber(item.volume)}</span>
                <span className="text-gray-500 text-[10px]">({item.share}%)</span>
              </div>
            </div>
            <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-cyan-500 rounded-full transition-all"
                style={{ width: `${item.share}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
