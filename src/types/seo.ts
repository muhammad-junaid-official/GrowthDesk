export type SearchIntent = 'Informational' | 'Commercial' | 'Transactional' | 'Navigational';

export interface BacklinkItem {
  id: string;
  sourceUrl: string;
  sourceTitle: string;
  targetUrl: string;
  anchorText: string;
  domainRating: number;
  linkType: 'DoFollow' | 'NoFollow' | 'UGC' | 'Sponsored';
  firstSeen: string;
  lastSeen: string;
}

export interface TopPageItem {
  url: string;
  traffic: number;
  trafficPercent: number;
  keywordsCount: number;
  topKeyword: string;
  topKeywordVolume: number;
}

export interface DomainMetrics {
  domain: string;
  domainRating: number; // 0-100
  urlRating: number; // 0-100
  totalBacklinks: number;
  referringDomains: number;
  organicTrafficMonthly: number;
  organicKeywordsCount: number;
  trafficValueUsd: number;
  dofollowPercent: number;
  historicalTraffic: { date: string; traffic: number; backlinks: number }[];
  backlinks: BacklinkItem[];
  topPages: TopPageItem[];
}

export interface KeywordIdea {
  id: string;
  keyword: string;
  volume: number;
  difficulty: number; // 0-100
  cpc: number;
  intent: SearchIntent;
  competitiveDensity: number; // 0-1
  trend: number[]; // 12-month trend points
}

export interface SerpResultItem {
  position: number;
  title: string;
  url: string;
  domain: string;
  domainRating: number;
  backlinksCount: number;
  estimatedTraffic: number;
  snippet: string;
}

export interface KeywordData {
  keyword: string;
  country: string;
  searchVolume: number;
  difficulty: number; // 0-100
  cpc: number;
  intent: SearchIntent;
  globalVolumeTotal: number;
  countryBreakdown: { country: string; countryCode: string; volume: number; share: number }[];
  ideas: KeywordIdea[];
  questions: KeywordIdea[];
  serpResults: SerpResultItem[];
}

export interface AuditIssue {
  id: string;
  type: 'critical' | 'warning' | 'notice';
  category: 'Meta & Content' | 'Performance' | 'Indexing & Crawl' | 'Security & SSL' | 'Links & Media';
  title: string;
  description: string;
  recommendation: string;
  affectedCount: number;
  recommendationUrdu?: string;
}

export interface CoreWebVitals {
  lcp: { value: number; unit: string; rating: 'good' | 'needs-improvement' | 'poor' }; // Largest Contentful Paint
  inp: { value: number; unit: string; rating: 'good' | 'needs-improvement' | 'poor' }; // Interaction to Next Paint
  cls: { value: number; unit: string; rating: 'good' | 'needs-improvement' | 'poor' }; // Cumulative Layout Shift
  fcp: { value: number; unit: string; rating: 'good' | 'needs-improvement' | 'poor' }; // First Contentful Paint
  ttfb: { value: number; unit: string; rating: 'good' | 'needs-improvement' | 'poor' }; // Time to First Byte
  performanceScore: number; // 0-100
  seoScore: number; // 0-100
  accessibilityScore: number; // 0-100
}

export interface TechnicalAuditData {
  url: string;
  scannedAt: string;
  healthScore: number; // 0-100
  totalChecks: number;
  passedChecks: number;
  criticalErrorsCount: number;
  warningsCount: number;
  noticesCount: number;
  statusCode: number;
  loadTimeMs: number;
  meta: {
    title: string;
    titleLength: number;
    description: string;
    descriptionLength: number;
    canonicalUrl: string | null;
    robotsMeta: string | null;
    h1Count: number;
    h1Tags: string[];
    h2Count: number;
    imagesCount: number;
    missingAltCount: number;
    hasOpenGraph: boolean;
    hasTwitterCard: boolean;
    hasJsonLdSchema: boolean;
    schemaTypes: string[];
    robotsTxtStatus: 'Found' | 'Missing' | 'Blocked';
    sitemapStatus: 'Found' | 'Missing';
  };
  coreWebVitals: CoreWebVitals;
  issues: AuditIssue[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  contextSnapshot?: {
    activeTab: 'site-explorer' | 'keyword-explorer' | 'site-audit' | 'overview';
    targetQuery?: string;
    metricsSummary?: Record<string, string | number>;
  };
}

export interface ApiConfig {
  dataForSeoLogin?: string;
  dataForSeoPassword?: string;
  googlePageSpeedApiKey?: string;
  openAiApiKey?: string;
}
