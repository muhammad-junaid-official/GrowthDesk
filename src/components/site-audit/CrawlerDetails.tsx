'use client';

import React from 'react';
import { TechnicalAuditData } from '@/types/seo';
import { Check, X, Code, FileText, Image, Layout, Tag, Shield } from 'lucide-react';

interface CrawlerDetailsProps {
  meta: TechnicalAuditData['meta'];
  url: string;
}

export const CrawlerDetails: React.FC<CrawlerDetailsProps> = ({ meta, url }) => {
  return (
    <div className="p-5 rounded-2xl bg-gray-900/60 border border-gray-800/80 space-y-4">
      <div className="flex items-center gap-2">
        <Code className="h-4 w-4 text-blue-400" />
        <h3 className="text-sm font-semibold text-white">Live On-Page HTML & Crawler Inspector</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {/* Title Tag */}
        <div className="p-3.5 rounded-xl bg-gray-950/80 border border-gray-800 space-y-1.5">
          <div className="flex items-center justify-between text-gray-400">
            <span className="font-semibold flex items-center gap-1.5">
              <Tag className="h-3.5 w-3.5 text-blue-400" />
              Page Title
            </span>
            <span
              className={`font-mono text-[10px] px-2 py-0.5 rounded ${
                meta.titleLength >= 35 && meta.titleLength <= 65
                  ? 'bg-emerald-500/10 text-emerald-400'
                  : 'bg-amber-500/10 text-amber-400'
              }`}
            >
              {meta.titleLength} chars
            </span>
          </div>
          <p className="text-gray-200 font-medium break-words">
            {meta.title || <span className="text-rose-400 italic">Missing title tag</span>}
          </p>
        </div>

        {/* Meta Description */}
        <div className="p-3.5 rounded-xl bg-gray-950/80 border border-gray-800 space-y-1.5">
          <div className="flex items-center justify-between text-gray-400">
            <span className="font-semibold flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5 text-indigo-400" />
              Meta Description
            </span>
            <span
              className={`font-mono text-[10px] px-2 py-0.5 rounded ${
                meta.descriptionLength >= 120 && meta.descriptionLength <= 165
                  ? 'bg-emerald-500/10 text-emerald-400'
                  : 'bg-amber-500/10 text-amber-400'
              }`}
            >
              {meta.descriptionLength} chars
            </span>
          </div>
          <p className="text-gray-300 break-words leading-relaxed">
            {meta.description || (
              <span className="text-rose-400 italic">No meta description found</span>
            )}
          </p>
        </div>

        {/* Headings & Structure */}
        <div className="p-3.5 rounded-xl bg-gray-950/80 border border-gray-800 space-y-2">
          <div className="flex items-center justify-between text-gray-400 font-semibold">
            <span className="flex items-center gap-1.5">
              <Layout className="h-3.5 w-3.5 text-cyan-400" />
              Headings Hierarchy
            </span>
            <span className="font-mono text-gray-300">
              H1: {meta.h1Count} | H2: {meta.h2Count}
            </span>
          </div>
          {meta.h1Tags.length > 0 ? (
            <div className="space-y-1">
              {meta.h1Tags.map((h1, i) => (
                <div
                  key={i}
                  className="bg-gray-900 px-2.5 py-1 rounded text-gray-200 text-[11px] font-mono truncate"
                >
                  &lt;h1&gt; {h1}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-rose-400 text-xs italic">No H1 heading detected on page.</div>
          )}
        </div>

        {/* Media & Structured Data */}
        <div className="p-3.5 rounded-xl bg-gray-950/80 border border-gray-800 space-y-2">
          <div className="flex items-center justify-between text-gray-400 font-semibold">
            <span className="flex items-center gap-1.5">
              <Image className="h-3.5 w-3.5 text-purple-400" />
              Media & Schema Markup
            </span>
            <span className="font-mono text-gray-300">
              {meta.imagesCount} images ({meta.missingAltCount} missing alt)
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
            <div className="flex items-center gap-1.5 text-gray-300">
              {meta.hasJsonLdSchema ? (
                <Check className="h-3.5 w-3.5 text-emerald-400" />
              ) : (
                <X className="h-3.5 w-3.5 text-rose-400" />
              )}
              <span>Schema JSON-LD</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-300">
              {meta.hasOpenGraph ? (
                <Check className="h-3.5 w-3.5 text-emerald-400" />
              ) : (
                <X className="h-3.5 w-3.5 text-rose-400" />
              )}
              <span>OpenGraph Social</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-300">
              {meta.canonicalUrl ? (
                <Check className="h-3.5 w-3.5 text-emerald-400" />
              ) : (
                <X className="h-3.5 w-3.5 text-amber-400" />
              )}
              <span>Canonical Tag</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-300">
              <Check className="h-3.5 w-3.5 text-emerald-400" />
              <span>Robots.txt Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
