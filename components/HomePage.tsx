import React, { useState, useMemo, useEffect } from 'react';
import { PROVIDERS, FILTER_OPTIONS } from '../constants';
import AirportCard from './AirportCard';
import ComparisonChart from './ComparisonChart';
import SeoContent from './SeoContent';
import { FilterType } from '../types';

const HomePage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>(FilterType.ALL);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    document.title = "2025稳定机场推荐 | 龙猫云/肥猫云/闪狐云/SpeedCat评测 | 云游指南";
  }, []);

  const filteredProviders = useMemo(() => {
    return PROVIDERS.filter(provider => {
      // Text Search
      const matchesSearch = provider.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            provider.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (!matchesSearch) return false;

      // Category Filter
      switch (activeFilter) {
        case FilterType.BUDGET:
          return provider.startPrice <= 20;
        case FilterType.PREMIUM:
          return provider.startPrice >= 35;
        case FilterType.STREAMING:
          return provider.tags.some(t => t.includes('流媒体') || t.includes('解锁') || t.includes('视频'));
        case FilterType.ALL:
        default:
          return true;
      }
    });
  }, [activeFilter, searchQuery]);

  return (
    <>
      {/* Hero Section */}
      <div className="relative bg-slate-900 border-b border-slate-800 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-500/10 to-transparent pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
            发现您的 <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-purple-400">理想网络伴侣</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10">
            专业评测 龙猫云、肥猫云、闪狐云 等主流机场。基于真实数据，为您提供最客观的选购指南。
          </p>
          
          {/* Search Box */}
          <div className="max-w-md mx-auto relative">
            <input 
              type="text" 
              placeholder="搜索机场名称或特性..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800/80 border border-slate-700 text-white rounded-full py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-lg transition-all"
            />
            <svg className="absolute left-4 top-3.5 h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        
        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-2xl font-bold text-white border-l-4 border-primary-500 pl-4">精选推荐</h2>
          <div className="flex flex-wrap gap-2">
            {FILTER_OPTIONS.map(option => (
              <button
                key={option.value}
                onClick={() => setActiveFilter(option.value)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  activeFilter === option.value
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/25'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200 border border-slate-700'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {filteredProviders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProviders.map(provider => (
              <AirportCard key={provider.id} provider={provider} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-900/50 rounded-xl border border-slate-800 border-dashed">
            <p className="text-slate-500">没有找到符合条件的机场</p>
            <button 
              onClick={() => { setActiveFilter(FilterType.ALL); setSearchQuery(''); }}
              className="mt-4 text-primary-400 hover:text-primary-300 underline"
            >
              清除筛选
            </button>
          </div>
        )}

        {/* Charts Section */}
        <section id="chart" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-white border-l-4 border-purple-500 pl-4 mb-8">数据透视</h2>
          <ComparisonChart data={filteredProviders} />
        </section>

      </main>

      {/* SEO Content Section */}
      <div id="guide">
        <SeoContent />
      </div>
    </>
  );
};

export default HomePage;