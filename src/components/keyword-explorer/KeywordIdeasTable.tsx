'use client';

import React, { useState } from 'react';
import { KeywordIdea, SearchIntent } from '@/types/seo';
import { formatNumber, formatCurrency, exportToCsv } from '@/lib/utils';
import { Download, Search, HelpCircle, Layers, Flame } from 'lucide-react';

interface KeywordIdeasTableProps {
  ideas: KeywordIdea[];
  questions: KeywordIdea[];
  seedKeyword: string;
}

export const KeywordIdeasTable: React.FC<KeywordIdeasTableProps> = ({
  ideas,
  questions,
  seedKeyword,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'questions'>('all');
  const [filterText, setFilterText] = useState('');

  const currentList = activeTab === 'all' ? ideas : questions;
  const filteredItems = currentList.filter((k) =>
    k.keyword.toLowerCase().includes(filterText.toLowerCase())
  );

  const getKdBadge = (kd: number) => {
    if (kd <= 20) return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    if (kd <= 40) return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    if (kd <= 65) return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
  };

  const handleExport = () => {
    exportToCsv(
      `keyword-ideas-${seedKeyword}-${activeTab}-${new Date().toISOString().slice(0, 10)}`,
      filteredItems.map((item) => ({
        Keyword: item.keyword,
        Search_Volume: item.volume,
        Keyword_Difficulty: item.difficulty,
        CPC: item.cpc,
        Intent: item.intent,
        Competitive_Density: item.competitiveDensity,
      }))
    );
  };

  return (
    <div className="p-5 rounded-2xl bg-gray-900/60 border border-gray-800/80">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        {/* Tabs for Keyword Ideas vs Questions */}
        <div className="flex items-center gap-1 p-1 bg-gray-950 rounded-xl border border-gray-800 text-xs">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'all'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            <span>Matching Terms ({ideas.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('questions')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'questions'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Questions & PAA ({questions.length})</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          {/* Table search filter */}
          <div className="relative">
            <Search className="h-3.5 w-3.5 absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search terms..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="pl-8 pr-3 py-1.5 bg-gray-950 text-xs text-gray-200 placeholder-gray-500 rounded-xl border border-gray-800 focus:outline-none focus:border-blue-500 w-44"
            />
          </div>

          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-white text-xs font-medium border border-gray-700 transition-all"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-800">
        <table className="w-full text-left text-xs">
          <thead className="bg-gray-950/80 text-gray-400 font-semibold border-b border-gray-800 uppercase tracking-wider text-[10px]">
            <tr>
              <th className="py-3 px-4">Keyword Idea</th>
              <th className="py-3 px-3">Volume</th>
              <th className="py-3 px-3">KD</th>
              <th className="py-3 px-3">CPC</th>
              <th className="py-3 px-3">Intent</th>
              <th className="py-3 px-4">12-Mo Trend</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/60 font-normal">
            {filteredItems.map((item) => (
              <tr key={item.id} className="hover:bg-gray-800/30 transition-colors">
                <td className="py-3 px-4 font-medium text-white max-w-xs">
                  <div className="flex items-center gap-2">
                    <span className="truncate">{item.keyword}</span>
                  </div>
                </td>
                <td className="py-3 px-3 font-semibold text-gray-200">
                  {formatNumber(item.volume)}
                </td>
                <td className="py-3 px-3">
                  <span
                    className={`inline-block font-mono font-bold px-2 py-0.5 rounded-md border text-[11px] ${getKdBadge(
                      item.difficulty
                    )}`}
                  >
                    {item.difficulty}
                  </span>
                </td>
                <td className="py-3 px-3 font-mono text-emerald-400">
                  {formatCurrency(item.cpc)}
                </td>
                <td className="py-3 px-3">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-gray-800 text-gray-300 border border-gray-700">
                    {item.intent}
                  </span>
                </td>
                <td className="py-3 px-4 w-32">
                  {/* Micro mini-bar sparkline */}
                  <div className="flex items-end gap-1 h-5">
                    {item.trend.map((point, pIdx) => (
                      <div
                        key={pIdx}
                        className="w-1.5 bg-blue-500/60 hover:bg-blue-400 rounded-t transition-all"
                        style={{ height: `${(point / 100) * 100}%` }}
                        title={`Month ${pIdx + 1}: ${point}%`}
                      />
                    ))}
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
