'use client';

import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { formatNumber } from '@/lib/utils';
import { TrendingUp, BarChart2 } from 'lucide-react';

interface TrafficChartProps {
  data: { date: string; traffic: number; backlinks: number }[];
  domain: string;
}

export const TrafficChart: React.FC<TrafficChartProps> = ({ data, domain }) => {
  const [metric, setMetric] = useState<'traffic' | 'backlinks'>('traffic');

  return (
    <div className="p-5 rounded-2xl bg-gray-900/60 border border-gray-800/80">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-white">Historical Performance Curve</h3>
            <span className="text-xs text-gray-500">({domain})</span>
          </div>
          <p className="text-xs text-gray-400 mt-0.5">
            {metric === 'traffic'
              ? 'Estimated monthly organic search visitors over the last 12 months'
              : 'Indexed backlink acquisition profile over the last 12 months'}
          </p>
        </div>

        {/* Metric Selector Toggle */}
        <div className="flex items-center gap-1 p-1 bg-gray-950 rounded-xl border border-gray-800">
          <button
            onClick={() => setMetric('traffic')}
            className={`px-3 py-1 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
              metric === 'traffic'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <TrendingUp className="h-3.5 w-3.5" />
            <span>Organic Traffic</span>
          </button>
          <button
            onClick={() => setMetric('backlinks')}
            className={`px-3 py-1 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
              metric === 'backlinks'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <BarChart2 className="h-3.5 w-3.5" />
            <span>Backlinks</span>
          </button>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="trafficGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="backlinksGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
            <XAxis
              dataKey="date"
              stroke="#6b7280"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#374151' }}
            />
            <YAxis
              stroke="#6b7280"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#374151' }}
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
                            backgroundColor: metric === 'traffic' ? '#3b82f6' : '#06b6d4',
                          }}
                        />
                        <span>
                          {metric === 'traffic' ? 'Traffic:' : 'Backlinks:'}{' '}
                          {payload[0].value?.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            {metric === 'traffic' ? (
              <Area
                type="monotone"
                dataKey="traffic"
                stroke="#3b82f6"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#trafficGradient)"
              />
            ) : (
              <Area
                type="monotone"
                dataKey="backlinks"
                stroke="#06b6d4"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#backlinksGradient)"
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
