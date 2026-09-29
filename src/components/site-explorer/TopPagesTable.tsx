'use client';

import React from 'react';
import { TopPageItem } from '@/types/seo';
import { formatNumber, exportToCsv } from '@/lib/utils';
import { Download, ExternalLink, Flame } from 'lucide-react';

interface TopPagesTableProps {
  topPages: TopPageItem[];
  domain: string;
}

export const TopPagesTable: React.FC<TopPagesTableProps> = ({ topPages, domain }) => {
  const handleExport = () => {
    exportToCsv(
      `top-pages-${domain}-${new Date().toISOString().slice(0, 10)}`,
      topPages.map((p) => ({
        URL: p.url,
        Monthly_Traffic: p.traffic,
        Traffic_Share_Percent: p.trafficPercent,
        Keywords_Count: p.keywordsCount,
        Top_Keyword: p.topKeyword,
        Top_Keyword_Volume: p.topKeywordVolume,
      }))
    );
  };

  return (
    <div className="p-5 rounded-2xl bg-gray-900/60 border border-gray-800/80">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-1.5">
            <Flame className="h-4 w-4 text-amber-400" />
            <h3 className="text-sm font-semibold text-white">Top Organic Pages</h3>
          </div>
          <p className="text-xs text-gray-400 mt-0.5">
            URLs generating the highest organic search footprint on {domain}
          </p>
        </div>

        <button
          onClick={handleExport}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-white text-xs font-medium border border-gray-700 transition-all"
        >
          <Download className="h-3.5 w-3.5" />
          <span>Export CSV</span>
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-800">
        <table className="w-full text-left text-xs">
          <thead className="bg-gray-950/80 text-gray-400 font-semibold border-b border-gray-800 uppercase tracking-wider text-[10px]">
            <tr>
              <th className="py-3 px-4">Top URL</th>
              <th className="py-3 px-3">Est. Traffic</th>
              <th className="py-3 px-3">Traffic Share</th>
              <th className="py-3 px-3">Keywords</th>
              <th className="py-3 px-4">Primary Organic Keyword</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/60 font-normal">
            {topPages.map((page, idx) => (
              <tr key={idx} className="hover:bg-gray-800/30 transition-colors">
                <td className="py-3 px-4 max-w-sm">
                  <a
                    href={page.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-200 hover:text-blue-400 font-medium truncate flex items-center gap-1"
                  >
                    <span className="truncate">{page.url}</span>
                    <ExternalLink className="h-3 w-3 flex-shrink-0 text-gray-500" />
                  </a>
                </td>
                <td className="py-3 px-3 font-semibold text-white">
                  {formatNumber(page.traffic)}
                </td>
                <td className="py-3 px-3 w-40">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                        style={{ width: `${page.trafficPercent}%` }}
                      />
                    </div>
                    <span className="text-[11px] text-gray-400 font-mono w-9 text-right">
                      {page.trafficPercent}%
                    </span>
                  </div>
                </td>
                <td className="py-3 px-3 text-gray-300 font-mono">
                  {formatNumber(page.keywordsCount)}
                </td>
                <td className="py-3 px-4">
                  <div className="inline-flex items-center gap-2 bg-gray-950 px-2.5 py-1 rounded-lg border border-gray-800">
                    <span className="font-medium text-gray-200">&quot;{page.topKeyword}&quot;</span>
                    <span className="text-[10px] text-gray-400 font-mono">
                      (Vol: {formatNumber(page.topKeywordVolume)})
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
