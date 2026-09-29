'use client';

import React, { useState } from 'react';
import { GscData } from '@/types/seo';
import { formatNumber, exportToCsv } from '@/lib/utils';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  BarChart3,
  MousePointerClick,
  Eye,
  Percent,
  TrendingUp,
  Download,
  Search,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  ExternalLink,
  RefreshCw,
} from 'lucide-react';

interface SearchConsoleViewProps {
  data: GscData | null;
  loading: boolean;
  onRefresh: () => void;
  onAskAi: () => void;
}

export const SearchConsoleView: React.FC<SearchConsoleViewProps> = ({
  data,
  loading,
  onRefresh,
  onAskAi,
}) => {
  const [activeTab, setActiveTab] = useState<'queries' | 'pages'>('queries');
  const [chartMetric, setChartMetric] = useState<'clicks' | 'impressions'>('clicks');
  const [filterText, setFilterText] = useState('');

  if (loading) {
    return (
      <div className="space-y-5 animate-pulse">
        <div className="h-28 bg-gray-900/60 rounded-2xl border border-gray-800" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
          {Array.from({ length: 4 }).map((_, i) => (
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
        <BarChart3 className="h-12 w-12 text-blue-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-white">No Search Console Data</h3>
        <p className="text-sm text-gray-400 mt-2">
          Connect your domain or search above to pull 100% verified first-party clicks, impressions, and CTR.
        </p>
      </div>
    );
  }

  const filteredQueries = data.topQueries.filter((q) =>
    q.query.toLowerCase().includes(filterText.toLowerCase())
  );

  const filteredPages = data.topPages.filter((p) =>
    p.page.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleExport = () => {
    if (activeTab === 'queries') {
      exportToCsv(
        `gsc-queries-${data.domain}-${new Date().toISOString().slice(0, 10)}`,
        filteredQueries.map((q) => ({
          Search_Query: q.query,
          Clicks: q.clicks,
          Impressions: q.impressions,
          CTR_Percent: q.ctr,
          Average_Position: q.position,
        }))
      );
    } else {
      exportToCsv(
        `gsc-pages-${data.domain}-${new Date().toISOString().slice(0, 10)}`,
        filteredPages.map((p) => ({
          Landing_Page: p.page,
          Clicks: p.clicks,
          Impressions: p.impressions,
          CTR_Percent: p.ctr,
          Average_Position: p.position,
        }))
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-950/40 via-gray-900 to-indigo-950/30 border border-blue-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <BarChart3 className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white tracking-tight">{data.domain}</h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                <ShieldCheck className="h-3 w-3" />
                Google Search Console Verified
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">
              100% verified first-party organic traffic, impressions, CTR, and SERP positions
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onRefresh}
            className="p-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-700 transition-all text-xs flex items-center gap-1.5"
            title="Refresh GSC Data"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Sync Live</span>
          </button>

          <button
            onClick={onAskAi}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-medium text-xs flex items-center gap-1.5 transition-all shadow-md shadow-indigo-600/20"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Ask AI: CTR Opportunities</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* 4 Top Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Total Clicks */}
        <div className="p-4 rounded-2xl bg-gray-900/60 border border-gray-800/80 flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-400 text-xs font-medium">
            <span>Total Clicks (30d)</span>
            <MousePointerClick className="h-4 w-4 text-blue-400" />
          </div>
          <div className="my-2">
            <span className="text-3xl font-extrabold text-blue-400 tracking-tight">
              {formatNumber(data.totalClicks)}
            </span>
          </div>
          <div className="text-[11px] text-gray-400">Verified organic clicks</div>
        </div>

        {/* Total Impressions */}
        <div className="p-4 rounded-2xl bg-gray-900/60 border border-gray-800/80 flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-400 text-xs font-medium">
            <span>Total Impressions</span>
            <Eye className="h-4 w-4 text-purple-400" />
          </div>
          <div className="my-2">
            <span className="text-3xl font-extrabold text-purple-300 tracking-tight">
              {formatNumber(data.totalImpressions)}
            </span>
          </div>
          <div className="text-[11px] text-gray-400">SERP appearances in search</div>
        </div>

        {/* Average CTR */}
        <div className="p-4 rounded-2xl bg-gray-900/60 border border-gray-800/80 flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-400 text-xs font-medium">
            <span>Average CTR</span>
            <Percent className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="my-2">
            <span className="text-3xl font-extrabold text-emerald-400 tracking-tight">
              {data.averageCtr}%
            </span>
          </div>
          <div className="text-[11px] text-gray-400">Click-through conversion rate</div>
        </div>

        {/* Average Position */}
        <div className="p-4 rounded-2xl bg-gray-900/60 border border-gray-800/80 flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-400 text-xs font-medium">
            <span>Average Position</span>
            <TrendingUp className="h-4 w-4 text-amber-400" />
          </div>
          <div className="my-2">
            <span className="text-3xl font-extrabold text-white tracking-tight font-mono">
              {data.averagePosition}
            </span>
          </div>
          <div className="text-[11px] text-gray-400">Across all ranked queries</div>
        </div>
      </div>

      {/* 30-Day Clicks & Impressions Area Chart */}
      <div className="p-5 rounded-2xl bg-gray-900/60 border border-gray-800/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-sm font-semibold text-white">Performance Over Time (Last 30 Days)</h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Daily trend of verified first-party organic traffic on {data.domain}
            </p>
          </div>

          <div className="flex items-center gap-1 p-1 bg-gray-950 rounded-xl border border-gray-800 text-xs">
            <button
              onClick={() => setChartMetric('clicks')}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                chartMetric === 'clicks'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              Clicks
            </button>
            <button
              onClick={() => setChartMetric('impressions')}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                chartMetric === 'impressions'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              Impressions
            </button>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data.timeSeries} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="clicksGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="impressionsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a855f7" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#a855f7" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
              <XAxis dataKey="date" stroke="#6b7280" fontSize={11} tickLine={false} />
              <YAxis
                stroke="#6b7280"
                fontSize={11}
                tickLine={false}
                tickFormatter={(v) => formatNumber(v)}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-gray-900 border border-gray-700 p-2.5 rounded-xl shadow-xl">
                        <div className="text-xs font-semibold text-gray-300 mb-1">{label}</div>
                        <div className="text-sm font-bold text-white flex items-center gap-2">
                          <span
                            className="h-2 w-2 rounded-full"
                            style={{
                              backgroundColor: chartMetric === 'clicks' ? '#3b82f6' : '#a855f7',
                            }}
                          />
                          <span>
                            {chartMetric === 'clicks' ? 'Clicks:' : 'Impressions:'}{' '}
                            {payload[0].value?.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              {chartMetric === 'clicks' ? (
                <Area
                  type="monotone"
                  dataKey="clicks"
                  stroke="#3b82f6"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#clicksGrad)"
                />
              ) : (
                <Area
                  type="monotone"
                  dataKey="impressions"
                  stroke="#a855f7"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#impressionsGrad)"
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tables for Queries and Pages */}
      <div className="p-5 rounded-2xl bg-gray-900/60 border border-gray-800/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-1 p-1 bg-gray-950 rounded-xl border border-gray-800 text-xs">
            <button
              onClick={() => setActiveTab('queries')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'queries' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              Top Queries ({data.topQueries.length})
            </button>
            <button
              onClick={() => setActiveTab('pages')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'pages' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              Top Landing Pages ({data.topPages.length})
            </button>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="h-3.5 w-3.5 absolute left-3 top-2.5 text-gray-400" />
              <input
                type="text"
                placeholder="Filter results..."
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
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-950/80 text-gray-400 font-semibold border-b border-gray-800 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">
                  {activeTab === 'queries' ? 'Top Search Query' : 'Landing Page URL'}
                </th>
                <th className="py-3 px-3">Clicks</th>
                <th className="py-3 px-3">Impressions</th>
                <th className="py-3 px-3">CTR</th>
                <th className="py-3 px-3">Avg Position</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60 font-normal">
              {activeTab === 'queries' ? (
                filteredQueries.map((q, idx) => (
                  <tr key={idx} className="hover:bg-gray-800/30 transition-colors">
                    <td className="py-3 px-4 font-medium text-white max-w-sm truncate">
                      &quot;{q.query}&quot;
                    </td>
                    <td className="py-3 px-3 font-semibold text-blue-400 font-mono">
                      {formatNumber(q.clicks)}
                    </td>
                    <td className="py-3 px-3 text-gray-300 font-mono">
                      {formatNumber(q.impressions)}
                    </td>
                    <td className="py-3 px-3 text-emerald-400 font-mono font-medium">{q.ctr}%</td>
                    <td className="py-3 px-3">
                      <span className="font-mono font-semibold px-2 py-0.5 rounded bg-gray-800 text-gray-200 border border-gray-700 text-[11px]">
                        {q.position}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                filteredPages.map((p, idx) => (
                  <tr key={idx} className="hover:bg-gray-800/30 transition-colors">
                    <td className="py-3 px-4 font-medium text-white max-w-sm">
                      <a
                        href={p.page}
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-200 hover:text-blue-400 truncate flex items-center gap-1.5"
                      >
                        <span className="truncate">{p.page}</span>
                        <ExternalLink className="h-3 w-3 flex-shrink-0 text-gray-500" />
                      </a>
                    </td>
                    <td className="py-3 px-3 font-semibold text-blue-400 font-mono">
                      {formatNumber(p.clicks)}
                    </td>
                    <td className="py-3 px-3 text-gray-300 font-mono">
                      {formatNumber(p.impressions)}
                    </td>
                    <td className="py-3 px-3 text-emerald-400 font-mono font-medium">{p.ctr}%</td>
                    <td className="py-3 px-3">
                      <span className="font-mono font-semibold px-2 py-0.5 rounded bg-gray-800 text-gray-200 border border-gray-700 text-[11px]">
                        {p.position}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
