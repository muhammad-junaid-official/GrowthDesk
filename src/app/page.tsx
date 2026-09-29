'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { SiteExplorerView } from '@/components/site-explorer/SiteExplorerView';
import { KeywordExplorerView } from '@/components/keyword-explorer/KeywordExplorerView';
import { SiteAuditView } from '@/components/site-audit/SiteAuditView';
import { SearchConsoleView } from '@/components/search-console/SearchConsoleView';
import { SettingsView } from '@/components/settings/SettingsView';
import { AIAssistantDrawer } from '@/components/ai-assistant/AIAssistantDrawer';
import { DomainMetrics, KeywordData, TechnicalAuditData, GscData } from '@/types/seo';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<
    'site-explorer' | 'keyword-explorer' | 'site-audit' | 'search-console' | 'settings'
  >('site-explorer');
  const [searchQuery, setSearchQuery] = useState('vercel.com');
  const [selectedCountry, setSelectedCountry] = useState('US');
  const [isAiOpen, setIsAiOpen] = useState(false);

  // Data states
  const [domainData, setDomainData] = useState<DomainMetrics | null>(null);
  const [keywordData, setKeywordData] = useState<KeywordData | null>(null);
  const [auditData, setAuditData] = useState<TechnicalAuditData | null>(null);
  const [gscData, setGscData] = useState<GscData | null>(null);

  // Loading states
  const [domainLoading, setDomainLoading] = useState(false);
  const [keywordLoading, setKeywordLoading] = useState(false);
  const [auditLoading, setAuditLoading] = useState(false);
  const [gscLoading, setGscLoading] = useState(false);

  // Stored Keys
  const [apiKeys, setApiKeys] = useState<{
    dataForSeoLogin: string;
    dataForSeoPassword: string;
    pageSpeedKey: string;
    openAiKey: string;
  }>({
    dataForSeoLogin: '',
    dataForSeoPassword: '',
    pageSpeedKey: '',
    openAiKey: '',
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const keys = {
        dataForSeoLogin: localStorage.getItem('gd_dfs_login') || '',
        dataForSeoPassword: localStorage.getItem('gd_dfs_pass') || '',
        pageSpeedKey: localStorage.getItem('gd_pagespeed_key') || '',
        openAiKey: localStorage.getItem('gd_openai_key') || '',
      };
      setApiKeys(keys);
    }
  }, []);

  // Fetch initial domain and GSC data on load
  useEffect(() => {
    fetchDomainData('vercel.com');
    fetchKeywordData('nextjs seo', 'US');
    fetchAuditData('https://vercel.com');
    fetchGscData('vercel.com');
  }, []);

  const fetchDomainData = async (domain: string) => {
    setDomainLoading(true);
    try {
      const headers: Record<string, string> = {};
      if (apiKeys.dataForSeoLogin) headers['x-dataforseo-login'] = apiKeys.dataForSeoLogin;
      if (apiKeys.dataForSeoPassword) headers['x-dataforseo-password'] = apiKeys.dataForSeoPassword;

      const res = await fetch(`/api/site-explorer?domain=${encodeURIComponent(domain)}`, { headers });
      const json = await res.json();
      if (json.success && json.data) {
        setDomainData(json.data);
      }
    } catch (err) {
      console.error('Failed to fetch domain data:', err);
    } finally {
      setDomainLoading(false);
    }
  };

  const fetchKeywordData = async (keyword: string, country = selectedCountry) => {
    setKeywordLoading(true);
    try {
      const headers: Record<string, string> = {};
      if (apiKeys.dataForSeoLogin) headers['x-dataforseo-login'] = apiKeys.dataForSeoLogin;
      if (apiKeys.dataForSeoPassword) headers['x-dataforseo-password'] = apiKeys.dataForSeoPassword;

      const res = await fetch(
        `/api/keyword-explorer?keyword=${encodeURIComponent(keyword)}&country=${encodeURIComponent(country)}`,
        { headers }
      );
      const json = await res.json();
      if (json.success && json.data) {
        setKeywordData(json.data);
      }
    } catch (err) {
      console.error('Failed to fetch keyword data:', err);
    } finally {
      setKeywordLoading(false);
    }
  };

  const fetchAuditData = async (url: string) => {
    setAuditLoading(true);
    try {
      const headers: Record<string, string> = {};
      if (apiKeys.pageSpeedKey) headers['x-pagespeed-key'] = apiKeys.pageSpeedKey;

      const res = await fetch(`/api/site-audit?url=${encodeURIComponent(url)}`, { headers });
      const json = await res.json();
      if (json.success && json.data) {
        setAuditData(json.data);
      }
    } catch (err) {
      console.error('Failed to fetch audit data:', err);
    } finally {
      setAuditLoading(false);
    }
  };

  const fetchGscData = async (domain: string) => {
    setGscLoading(true);
    try {
      const res = await fetch(`/api/search-console?domain=${encodeURIComponent(domain)}`);
      const json = await res.json();
      if (json.success && json.data) {
        setGscData(json.data);
      }
    } catch (err) {
      console.error('Failed to fetch GSC data:', err);
    } finally {
      setGscLoading(false);
    }
  };

  const handleSearch = (query: string, country?: string) => {
    setSearchQuery(query);
    if (activeTab === 'site-explorer') {
      fetchDomainData(query);
    } else if (activeTab === 'keyword-explorer') {
      fetchKeywordData(query, country || selectedCountry);
    } else if (activeTab === 'site-audit') {
      fetchAuditData(query);
    } else if (activeTab === 'search-console') {
      fetchGscData(query);
    }
  };

  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
    if (activeTab === 'keyword-explorer' && searchQuery) {
      fetchKeywordData(searchQuery, country);
    }
  };

  // Get active query context for AI Assistant
  const getActiveQuery = () => {
    if (activeTab === 'site-explorer') return domainData?.domain || searchQuery;
    if (activeTab === 'keyword-explorer') return keywordData?.keyword || searchQuery;
    if (activeTab === 'site-audit') return auditData?.url || searchQuery;
    if (activeTab === 'search-console') return gscData?.domain || searchQuery;
    return searchQuery;
  };

  const getActiveContextData = () => {
    if (activeTab === 'site-explorer') return domainData;
    if (activeTab === 'keyword-explorer') return keywordData;
    if (activeTab === 'site-audit') return auditData;
    if (activeTab === 'search-console') return gscData;
    return null;
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] flex flex-col text-gray-100">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          if (tab === 'site-explorer') setSearchQuery(domainData?.domain || 'vercel.com');
          if (tab === 'keyword-explorer') setSearchQuery(keywordData?.keyword || 'nextjs seo');
          if (tab === 'site-audit') setSearchQuery(auditData?.url || 'https://vercel.com');
          if (tab === 'search-console') setSearchQuery(gscData?.domain || 'vercel.com');
        }}
        searchQuery={searchQuery}
        onSearch={handleSearch}
        selectedCountry={selectedCountry}
        onCountryChange={handleCountryChange}
        onToggleAi={() => setIsAiOpen(!isAiOpen)}
        isAiOpen={isAiOpen}
      />

      <div className="flex-1 flex flex-col lg:flex-row max-w-[1600px] w-full mx-auto">
        {/* Left Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
            if (tab === 'site-explorer') setSearchQuery(domainData?.domain || 'vercel.com');
            if (tab === 'keyword-explorer') setSearchQuery(keywordData?.keyword || 'nextjs seo');
            if (tab === 'site-audit') setSearchQuery(auditData?.url || 'https://vercel.com');
            if (tab === 'search-console') setSearchQuery(gscData?.domain || 'vercel.com');
          }}
          onOpenAi={() => setIsAiOpen(true)}
        />

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
          {activeTab === 'site-explorer' && (
            <SiteExplorerView
              data={domainData}
              loading={domainLoading}
              onRefresh={() => fetchDomainData(searchQuery)}
              onAskAiAboutDomain={() => setIsAiOpen(true)}
            />
          )}

          {activeTab === 'keyword-explorer' && (
            <KeywordExplorerView
              data={keywordData}
              loading={keywordLoading}
              onRefresh={() => fetchKeywordData(searchQuery, selectedCountry)}
              onAskAiAboutKeyword={() => setIsAiOpen(true)}
            />
          )}

          {activeTab === 'site-audit' && (
            <SiteAuditView
              data={auditData}
              loading={auditLoading}
              onRefresh={() => fetchAuditData(searchQuery)}
              onAskAiAboutAudit={() => setIsAiOpen(true)}
            />
          )}

          {activeTab === 'search-console' && (
            <SearchConsoleView
              data={gscData}
              loading={gscLoading}
              onRefresh={() => fetchGscData(searchQuery)}
              onAskAi={() => setIsAiOpen(true)}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsView
              onSaveKeys={(keys) => {
                setApiKeys(keys);
              }}
            />
          )}
        </main>
      </div>

      {/* Floating AI SEO Assistant Drawer */}
      <AIAssistantDrawer
        isOpen={isAiOpen}
        onClose={() => setIsAiOpen(false)}
        activeTab={activeTab}
        targetQuery={getActiveQuery()}
        contextData={getActiveContextData()}
        customApiKey={apiKeys.openAiKey}
      />
    </div>
  );
}
