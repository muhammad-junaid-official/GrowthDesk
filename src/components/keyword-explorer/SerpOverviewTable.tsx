'use client';

import React from 'react';
import { SerpResultItem } from '@/types/seo';
import { formatNumber } from '@/lib/utils';
import { ExternalLink, ListOrdered, Link2 } from 'lucide-react';

interface SerpOverviewTableProps {
  results: SerpResultItem[];
  keyword: string;
}

export const SerpOverviewTable: React.FC<SerpOverviewTableProps> = ({ results, keyword }) => {
  return (
    <div className="p-5 rounded-2xl bg-gray-900/60 border border-gray-800/80">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-1.5">
            <ListOrdered className="h-4 w-4 text-blue-400" />
            <h3 className="text-sm font-semibold text-white">Live SERP Top 10 Overview</h3>
          </div>
          <p className="text-xs text-gray-400 mt-0.5">
            Top organic ranking pages on Google for &quot;{keyword}&quot;
          </p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-800">
        <table className="w-full text-left text-xs">
          <thead className="bg-gray-950/80 text-gray-400 font-semibold border-b border-gray-800 uppercase tracking-wider text-[10px]">
            <tr>
              <th className="py-3 px-3 w-12 text-center">#</th>
              <th className="py-3 px-4">Ranking Page & Title</th>
              <th className="py-3 px-3">DR</th>
              <th className="py-3 px-3">Backlinks</th>
              <th className="py-3 px-3">Est. Traffic</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/60 font-normal">
            {results.map((item) => (
              <tr key={item.position} className="hover:bg-gray-800/30 transition-colors">
                <td className="py-3 px-3 text-center font-bold text-gray-400">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-gray-800 text-[11px] text-white">
                    {item.position}
                  </span>
                </td>
                <td className="py-3 px-4 max-w-md">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-white hover:text-blue-400 flex items-center gap-1.5 line-clamp-1"
                  >
                    <span>{item.title}</span>
                    <ExternalLink className="h-3 w-3 flex-shrink-0 text-gray-500" />
                  </a>
                  <div className="text-[11px] text-blue-400/80 truncate mt-0.5">{item.url}</div>
                  <p className="text-[11px] text-gray-400 line-clamp-1 mt-1 leading-snug">
                    {item.snippet}
                  </p>
                </td>
                <td className="py-3 px-3">
                  <span className="font-mono font-semibold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    {item.domainRating}
                  </span>
                </td>
                <td className="py-3 px-3 text-gray-300 font-mono">
                  <div className="flex items-center gap-1">
                    <Link2 className="h-3 w-3 text-gray-500" />
                    <span>{formatNumber(item.backlinksCount)}</span>
                  </div>
                </td>
                <td className="py-3 px-3 font-semibold text-white font-mono">
                  {formatNumber(item.estimatedTraffic)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
