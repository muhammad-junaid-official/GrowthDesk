'use client';

import React, { useState } from 'react';
import { AuditIssue } from '@/types/seo';
import {
  AlertCircle,
  AlertTriangle,
  Info,
  ChevronDown,
  ChevronUp,
  Languages,
  CheckCircle,
  Wrench,
} from 'lucide-react';

interface IssuesListProps {
  issues: AuditIssue[];
  url: string;
}

export const IssuesList: React.FC<IssuesListProps> = ({ issues, url }) => {
  const [filterType, setFilterType] = useState<'all' | 'critical' | 'warning' | 'notice'>('all');
  const [expandedIssueId, setExpandedIssueId] = useState<string | null>(null);
  const [showUrduId, setShowUrduId] = useState<string | null>(null);

  const filteredIssues = issues.filter((issue) => {
    if (filterType === 'all') return true;
    return issue.type === filterType;
  });

  const getIssueBadge = (type: AuditIssue['type']) => {
    switch (type) {
      case 'critical':
        return {
          icon: AlertCircle,
          label: 'Critical',
          classes: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
        };
      case 'warning':
        return {
          icon: AlertTriangle,
          label: 'Warning',
          classes: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
        };
      case 'notice':
        return {
          icon: Info,
          label: 'Notice',
          classes: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
        };
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedIssueId(expandedIssueId === id ? null : id);
  };

  const toggleUrdu = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setShowUrduId(showUrduId === id ? null : id);
  };

  return (
    <div className="p-5 rounded-2xl bg-gray-900/60 border border-gray-800/80 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-white">Actionable Audit Issues & Fixes</h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Step-by-step technical recommendations with dual English & Roman Urdu guidance
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1 p-1 bg-gray-950 rounded-xl border border-gray-800 text-xs">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1 rounded-lg font-medium transition-all ${
              filterType === 'all'
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            All ({issues.length})
          </button>
          <button
            onClick={() => setFilterType('critical')}
            className={`px-3 py-1 rounded-lg font-medium transition-all ${
              filterType === 'critical'
                ? 'bg-rose-600 text-white'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            Critical ({issues.filter((i) => i.type === 'critical').length})
          </button>
          <button
            onClick={() => setFilterType('warning')}
            className={`px-3 py-1 rounded-lg font-medium transition-all ${
              filterType === 'warning'
                ? 'bg-amber-600 text-white'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            Warnings ({issues.filter((i) => i.type === 'warning').length})
          </button>
          <button
            onClick={() => setFilterType('notice')}
            className={`px-3 py-1 rounded-lg font-medium transition-all ${
              filterType === 'notice'
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            Notices ({issues.filter((i) => i.type === 'notice').length})
          </button>
        </div>
      </div>

      {/* Issues list */}
      <div className="space-y-3">
        {filteredIssues.length === 0 ? (
          <div className="py-8 text-center text-gray-500 text-xs bg-gray-950/40 rounded-xl border border-gray-800">
            No issues found in this category!
          </div>
        ) : (
          filteredIssues.map((issue) => {
            const badge = getIssueBadge(issue.type);
            const Icon = badge.icon;
            const isExpanded = expandedIssueId === issue.id;
            const isUrduOpen = showUrduId === issue.id;

            return (
              <div
                key={issue.id}
                className="rounded-xl border border-gray-800 bg-gray-950/60 overflow-hidden hover:border-gray-700 transition-all"
              >
                <div
                  onClick={() => toggleExpand(issue.id)}
                  className="p-3.5 flex items-center justify-between gap-3 cursor-pointer select-none"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`p-1.5 rounded-lg border flex items-center justify-center ${badge.classes}`}
                    >
                      <Icon className="h-4 w-4" />
                    </span>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-white">{issue.title}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-gray-800 text-gray-400 font-mono">
                          {issue.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-400 mt-0.5">{issue.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Roman Urdu Quick Toggle */}
                    {issue.recommendationUrdu && (
                      <button
                        onClick={(e) => toggleUrdu(e, issue.id)}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold flex items-center gap-1 border transition-all ${
                          isUrduOpen
                            ? 'bg-emerald-600 text-white border-emerald-500'
                            : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20'
                        }`}
                        title="View explanation in Roman Urdu"
                      >
                        <Languages className="h-3 w-3" />
                        <span>Roman Urdu</span>
                      </button>
                    )}

                    <div className="text-gray-400 hover:text-white">
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Expanded details & Urdu explanation */}
                {(isExpanded || isUrduOpen) && (
                  <div className="px-4 pb-4 pt-1 border-t border-gray-900 bg-gray-900/30 text-xs space-y-3">
                    <div className="flex items-start gap-2 pt-2">
                      <Wrench className="h-3.5 w-3.5 text-blue-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-gray-300 font-semibold mb-0.5">How to Fix (English):</div>
                        <div className="text-gray-400 leading-relaxed">{issue.recommendation}</div>
                      </div>
                    </div>

                    {issue.recommendationUrdu && isUrduOpen && (
                      <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-emerald-200">
                        <div className="flex items-center gap-1.5 font-bold mb-1 text-[11px] text-emerald-400">
                          <Languages className="h-3.5 w-3.5" />
                          <span>Roman Urdu Tafseelat (Wazahat):</span>
                        </div>
                        <p className="text-[11px] leading-relaxed text-emerald-100">
                          {issue.recommendationUrdu}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
