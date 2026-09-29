'use client';

import React, { useState } from 'react';
import { BacklinkItem } from '@/types/seo';
import { exportToCsv } from '@/lib/utils';
import { Download, Search, ExternalLink, Filter, ShieldCheck, ShieldAlert } from 'lucide-react';

interface BacklinksTableProps {
  backlinks: BacklinkItem[];
  domain: string;
}

export const BacklinksTable: React.FC<BacklinksTableProps> = ({ backlinks, domain }) => {
  const [filterType, setFilterType] = useState<'All' | 'DoFollow' | 'NoFollow'>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLinks = backlinks.filter((link) => {
    const matchesFilter = filterType === 'All' || link.linkType === filterType;
    const matchesSearch =
      link.sourceUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.anchorText.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.sourceTitle.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleExport = () => {
    exportToCsv(
      `backlinks-${domain}-${new Date().toISOString().slice(0, 10)}`,
      filteredLinks.map((b) => ({
        Source_URL: b.sourceUrl,
        Source_Title: b.sourceTitle,
        Target_URL: b.targetUrl,
        Anchor_Text: b.anchorText,
        Domain_Rating: b.domainRating,
        Link_Type: b.linkType,
        First_Seen: b.firstSeen,
        Last_Seen: b.lastSeen,
      }))
    );
  };

  return (
    <div className="p-5 rounded-2xl bg-gray-900/60 border border-gray-800/80">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="text-sm font-semibold text-white">Live Backlink Profile Table</h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Showing {filteredLinks.length} referring URLs pointing to {domain}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Table search */}
          <div className="relative">
            <Search className="h-3.5 w-3.5 absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              placeholder="Filter anchors or URLs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-3 py-1.5 bg-gray-950 text-xs text-gray-200 placeholder-gray-500 rounded-xl border border-gray-800 focus:outline-none focus:border-blue-500 w-44 sm:w-56"
            />
          </div>

          {/* DoFollow / NoFollow filter */}
          <div className="flex items-center gap-1 p-0.5 bg-gray-950 rounded-xl border border-gray-800 text-xs">
            {(['All', 'DoFollow', 'NoFollow'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  filterType === type ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Export to CSV */}
          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-white text-xs font-medium border border-gray-700 transition-all"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-800">
        <table className="w-full text-left text-xs">
          <thead className="bg-gray-950/80 text-gray-400 font-semibold border-b border-gray-800 uppercase tracking-wider text-[10px]">
            <tr>
              <th className="py-3 px-4">Referring Page & Title</th>
              <th className="py-3 px-3">DR</th>
              <th className="py-3 px-4">Anchor & Target URL</th>
              <th className="py-3 px-3">Type</th>
              <th className="py-3 px-3">First / Last Seen</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/60 font-normal">
            {filteredLinks.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-gray-500">
                  No backlinks matching current filters.
                </td>
              </tr>
            ) : (
              filteredLinks.map((link) => (
                <tr key={link.id} className="hover:bg-gray-800/30 transition-colors">
                  <td className="py-3 px-4 max-w-xs">
                    <div className="font-medium text-gray-200 truncate">{link.sourceTitle}</div>
                    <a
                      href={link.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] text-blue-400 hover:text-blue-300 truncate flex items-center gap-1 mt-0.5"
                    >
                      <span className="truncate">{link.sourceUrl}</span>
                      <ExternalLink className="h-3 w-3 flex-shrink-0" />
                    </a>
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-mono font-semibold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      {link.domainRating}
                    </span>
                  </td>
                  <td className="py-3 px-4 max-w-xs">
                    <div className="font-semibold text-gray-200 bg-gray-950 px-2 py-1 rounded border border-gray-800 inline-block mb-1">
                      &quot;{link.anchorText}&quot;
                    </div>
                    <div className="text-[11px] text-gray-400 truncate">{link.targetUrl}</div>
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        link.linkType === 'DoFollow'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-gray-800 text-gray-400 border border-gray-700'
                      }`}
                    >
                      {link.linkType === 'DoFollow' ? (
                        <ShieldCheck className="h-3 w-3" />
                      ) : (
                        <ShieldAlert className="h-3 w-3" />
                      )}
                      {link.linkType}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-[11px] text-gray-400 whitespace-nowrap">
                    <div>Seen: {link.firstSeen}</div>
                    <div className="text-[10px] text-gray-500">Last: {link.lastSeen}</div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
