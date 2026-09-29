'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '@/types/seo';
import {
  X,
  Send,
  Sparkles,
  Bot,
  User,
  RotateCcw,
  Languages,
  ArrowRight,
  ShieldAlert,
  Activity,
  KeyRound,
  Globe,
} from 'lucide-react';

interface AIAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  targetQuery: string;
  contextData: any;
  customApiKey?: string;
}

export const AIAssistantDrawer: React.FC<AIAssistantDrawerProps> = ({
  isOpen,
  onClose,
  activeTab,
  targetQuery,
  contextData,
  customApiKey,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      role: 'assistant',
      content: `### 👋 Welcome to GrowthDesk AI SEO Architect!

I have synced with your active session on **${targetQuery || 'your project'}** (${activeTab}). 

Ask me any technical SEO, backlink architecture, or keyword clustering questions in **English** or **Roman Urdu**!`,
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim() || loading) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!messageText) setInput('');
    setLoading(true);

    try {
      // Build context snapshot for the LLM
      const metricsSummary: Record<string, any> = {};
      if (activeTab === 'site-explorer' && contextData) {
        metricsSummary.domainRating = contextData.domainRating;
        metricsSummary.totalBacklinks = contextData.totalBacklinks;
        metricsSummary.referringDomains = contextData.referringDomains;
        metricsSummary.traffic = contextData.organicTrafficMonthly;
      } else if (activeTab === 'keyword-explorer' && contextData) {
        metricsSummary.volume = contextData.searchVolume;
        metricsSummary.kd = contextData.difficulty;
        metricsSummary.cpc = contextData.cpc;
        metricsSummary.intent = contextData.intent;
      } else if (activeTab === 'site-audit' && contextData) {
        metricsSummary.healthScore = contextData.healthScore;
        metricsSummary.criticalErrors = contextData.criticalErrorsCount;
        metricsSummary.warnings = contextData.warningsCount;
        metricsSummary.meta = contextData.meta;
      }

      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(customApiKey ? { 'x-openai-key': customApiKey } : {}),
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          contextSnapshot: {
            activeTab,
            targetQuery,
            metricsSummary,
          },
        }),
      });

      const data = await res.json();
      if (data.success && data.message) {
        setMessages((prev) => [
          ...prev,
          {
            id: `reply-${Date.now()}`,
            role: 'assistant',
            content: data.message,
            timestamp: new Date().toLocaleTimeString(),
          },
        ]);
      } else {
        throw new Error(data.error || 'Failed to fetch AI reply');
      }
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: 'assistant',
          content: `⚠️ Error communicating with AI assistant: ${err.message}. Please verify your API key or network connection.`,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'reset-msg',
        role: 'assistant',
        content: `Chat history cleared. Context is currently locked onto **${targetQuery || 'your analysis'}**. How can I help?`,
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);
  };

  const quickPrompts = [
    {
      label: 'Roman Urdu: Primary Issues & Fixes',
      text: 'Samjhayein ke is page par primary technical issues kya hain aur inhein kaise fix karein?',
      icon: Languages,
    },
    {
      label: 'Analyze Crawl Errors & Meta Fixes',
      text: 'What are the most urgent technical errors found on this page and what exact meta tags or HTML changes do I need to make?',
      icon: Activity,
    },
    {
      label: 'Rank #1 Content Strategy',
      text: `Give me a comprehensive content outline and topical cluster strategy to rank #1 for "${targetQuery}".`,
      icon: KeyRound,
    },
    {
      label: 'High-DR Backlink Blueprint',
      text: `How can I acquire high-authority backlinks (DR > 70) for ${targetQuery} in 2026?`,
      icon: Globe,
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[460px] md:w-[500px] bg-[#0d121f] border-l border-gray-800 shadow-2xl flex flex-col transition-all">
      {/* Drawer Header */}
      <div className="p-4 border-b border-gray-800 bg-[#0b0f19] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white">GrowthDesk AI SEO Copilot</h3>
              <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                GPT-4o
              </span>
            </div>
            <p className="text-[11px] text-gray-400">
              Synced with: <span className="text-blue-400 font-mono">{targetQuery || 'General'}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={clearChat}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-all text-xs"
            title="Clear Chat"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-all"
            title="Close Drawer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Quick Prompts Bar */}
      <div className="px-3.5 py-2.5 bg-gray-950/70 border-b border-gray-800/80 overflow-x-auto flex items-center gap-2 scrollbar-none">
        {quickPrompts.map((q, idx) => {
          const Icon = q.icon;
          return (
            <button
              key={idx}
              onClick={() => handleSend(q.text)}
              disabled={loading}
              className="flex-shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-900 hover:bg-gray-800 border border-gray-700/80 text-[11px] text-gray-300 transition-all whitespace-nowrap"
            >
              <Icon className="h-3 w-3 text-indigo-400" />
              <span>{q.label}</span>
            </button>
          );
        })}
      </div>

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
        {messages.map((m) => {
          const isUser = m.role === 'user';
          return (
            <div
              key={m.id}
              className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isUser && (
                <div className="h-7 w-7 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 flex-shrink-0 mt-0.5">
                  <Bot className="h-4 w-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-3.5 leading-relaxed ${
                  isUser
                    ? 'bg-blue-600 text-white rounded-tr-none'
                    : 'bg-gray-900 border border-gray-800 text-gray-200 rounded-tl-none space-y-2'
                }`}
              >
                <div className="whitespace-pre-wrap font-sans">{m.content}</div>
                <div
                  className={`text-[9px] mt-1 ${
                    isUser ? 'text-blue-200 text-right' : 'text-gray-500'
                  }`}
                >
                  {m.timestamp}
                </div>
              </div>

              {isUser && (
                <div className="h-7 w-7 rounded-lg bg-blue-600 flex items-center justify-center text-white flex-shrink-0 mt-0.5">
                  <User className="h-4 w-4" />
                </div>
              )}
            </div>
          );
        })}

        {loading && (
          <div className="flex gap-2.5 items-center text-gray-400 text-xs">
            <div className="h-7 w-7 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Bot className="h-4 w-4 animate-spin" />
            </div>
            <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 text-gray-400 animate-pulse">
              Analyzing active context & generating response...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <div className="p-3.5 border-t border-gray-800 bg-[#0b0f19]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="relative flex items-center"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything in English or Roman Urdu..."
            disabled={loading}
            className="w-full pl-3.5 pr-12 py-2.5 bg-gray-900 text-xs text-white placeholder-gray-500 rounded-xl border border-gray-700 focus:outline-none focus:border-indigo-500 transition-all"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="absolute right-1.5 p-1.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white rounded-lg transition-all"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
        <div className="flex items-center justify-between text-[10px] text-gray-500 mt-2 px-1">
          <span>Bilingual: English & Roman Urdu</span>
          <span>Context-Aware</span>
        </div>
      </div>
    </div>
  );
};
