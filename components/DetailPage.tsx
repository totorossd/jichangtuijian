import React, { useEffect, useLayoutEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PROVIDERS } from '../constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const provider = PROVIDERS.find(p => p.id === id);

  useLayoutEffect(() => {
     window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (provider) {
      document.title = `${provider.name} 怎么样？2025深度评测与价格表 | CloudFly`;
      
      // Dynamic Meta Description Update (Basic)
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', `${provider.name}深度评测。${provider.description} 了解详细价格、晚高峰速度测试、流媒体解锁情况及用户真实评价。`);
      }
    }
  }, [provider]);

  if (!provider) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-gray-500 dark:text-slate-400">
        <h2 className="text-2xl font-bold mb-4">未找到相关机场信息</h2>
        <button onClick={() => navigate('/')} className="text-primary-600 dark:text-primary-500 hover:underline">
          返回首页
        </button>
      </div>
    );
  }

  // Mock data for specific speed chart
  const speedData = [
    { name: '08:00', speed: provider.speedScore * 0.9 },
    { name: '12:00', speed: provider.speedScore * 0.95 },
    { name: '20:00', speed: provider.speedScore * 0.85 }, // Peak time drop
    { name: '24:00', speed: provider.speedScore * 1.0 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Breadcrumb */}
      <nav className="flex mb-8 text-sm text-gray-500 dark:text-slate-400">
        <Link to="/" className="hover:text-gray-900 dark:hover:text-white transition-colors">首页</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 dark:text-white font-medium">{provider.name}</span>
      </nav>

      {/* Header Card */}
      <div className="bg-white dark:bg-slate-850 rounded-2xl p-8 border border-gray-200 dark:border-slate-700 shadow-xl mb-12 flex flex-col md:flex-row gap-8 items-start transition-colors duration-300">
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gray-100 dark:bg-slate-700 overflow-hidden border-4 border-gray-200 dark:border-slate-600 flex-shrink-0">
          <img src={provider.logoUrl} alt={provider.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-4 mb-4">
             <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">{provider.name}</h1>
             <div className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 px-3 py-1 rounded-full font-bold">
                 <span>★</span>
                 <span>{provider.rating}</span>
             </div>
          </div>
          <p className="text-lg text-gray-600 dark:text-slate-300 mb-6 leading-relaxed">
            {provider.longDescription || provider.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {provider.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-gray-100 dark:bg-slate-800 text-primary-700 dark:text-primary-300 text-sm rounded-full border border-gray-200 dark:border-slate-700">
                #{tag}
              </span>
            ))}
          </div>
        </div>
        <div className="flex-shrink-0 w-full md:w-auto flex flex-col gap-4">
           <a href="#" className="w-full md:w-48 py-3 bg-primary-600 hover:bg-primary-500 text-center text-white rounded-xl font-bold shadow-lg shadow-primary-600/30 transition-all transform hover:-translate-y-1">
             前往官网购买
           </a>
           <div className="grid grid-cols-2 gap-4 text-center">
             <div className="bg-gray-50 dark:bg-slate-900 p-3 rounded-lg border border-gray-200 dark:border-slate-700">
               <div className="text-xs text-gray-500 dark:text-slate-500">速度得分</div>
               <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{provider.speedScore}</div>
             </div>
             <div className="bg-gray-50 dark:bg-slate-900 p-3 rounded-lg border border-gray-200 dark:border-slate-700">
               <div className="text-xs text-gray-500 dark:text-slate-500">稳定性</div>
               <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400">{provider.stabilityScore}</div>
             </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (Main Content) */}
        <div className="lg:col-span-2 space-y-12">
          
          {/* Features */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <span className="w-1 h-8 bg-primary-500 rounded-full"></span>
              核心特性
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {provider.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-white dark:bg-slate-900/50 p-4 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm dark:shadow-none">
                   <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path></svg>
                   <span className="text-gray-700 dark:text-slate-300">{feature}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Speed Chart */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <span className="w-1 h-8 bg-indigo-500 rounded-full"></span>
              全天速度监控
            </h2>
            <div className="bg-white dark:bg-slate-850 p-6 rounded-xl border border-gray-200 dark:border-slate-700 h-80 shadow-sm dark:shadow-none">
               <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={speedData}>
                   <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" opacity={0.3} />
                   <XAxis dataKey="name" stroke="#94a3b8" />
                   <YAxis stroke="#94a3b8" />
                   <Tooltip 
                    cursor={{fill: 'rgba(148, 163, 184, 0.1)'}} 
                    contentStyle={{ backgroundColor: '#fff', borderColor: '#e2e8f0', color: '#0f172a', borderRadius: '0.5rem' }}
                    itemStyle={{ color: '#0f172a' }} 
                   />
                   <Bar dataKey="speed" fill="#6366f1" name="下载速率 (Mbps)" radius={[4, 4, 0, 0]} />
                 </BarChart>
               </ResponsiveContainer>
            </div>
            <p className="text-xs text-gray-500 dark:text-slate-500 mt-2 text-center">* 数据基于千兆宽带环境测试，实际体验可能因地区和运营商而异。</p>
          </section>

          {/* Reviews */}
          {provider.reviews && provider.reviews.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <span className="w-1 h-8 bg-yellow-500 rounded-full"></span>
                用户真实评价
              </h2>
              <div className="space-y-4">
                {provider.reviews.map((review, idx) => (
                  <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm dark:shadow-none">
                    <div className="flex justify-between items-start mb-2">
                       <div className="font-bold text-gray-900 dark:text-slate-200">{review.user}</div>
                       <div className="text-xs text-gray-500">{review.date}</div>
                    </div>
                    <div className="flex text-yellow-500 text-sm mb-2">
                      {[...Array(5)].map((_, i) => (
                        <span key={i}>{i < review.rating ? '★' : '☆'}</span>
                      ))}
                    </div>
                    <p className="text-gray-600 dark:text-slate-400 text-sm">{review.content}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column (Sidebar - Pricing) */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">套餐价格</h2>
              <div className="space-y-4">
                {provider.plans?.map((plan, idx) => (
                  <div key={idx} className="bg-white dark:bg-slate-850 rounded-xl border border-gray-200 dark:border-slate-700 overflow-hidden hover:border-primary-500/50 transition-all shadow-sm dark:shadow-none">
                     <div className="p-5 border-b border-gray-100 dark:border-slate-700/50 flex justify-between items-center bg-gray-50 dark:bg-slate-800/50">
                        <h3 className="font-bold text-gray-900 dark:text-white">{plan.name}</h3>
                        <div className="text-right">
                          <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">¥{plan.price}</span>
                          <span className="text-xs text-gray-500 dark:text-slate-500">/{plan.period}</span>
                        </div>
                     </div>
                     <div className="p-5">
                       <div className="text-sm font-medium text-gray-700 dark:text-slate-300 mb-3">包含 {plan.traffic} 流量</div>
                       <ul className="space-y-2">
                         {plan.features.map((feature, fIdx) => (
                           <li key={fIdx} className="text-xs text-gray-600 dark:text-slate-400 flex items-center gap-2">
                             <span className="w-1.5 h-1.5 rounded-full bg-primary-500"></span>
                             {feature}
                           </li>
                         ))}
                       </ul>
                     </div>
                  </div>
                ))}
                {(!provider.plans || provider.plans.length === 0) && (
                  <div className="text-gray-500 text-sm text-center p-4">暂无详细套餐数据</div>
                )}
              </div>
            </section>

             <section className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-800 dark:to-slate-900 rounded-xl p-6 border border-gray-200 dark:border-slate-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">CloudFly 简评</h3>
                <p className="text-sm text-gray-600 dark:text-slate-400 leading-relaxed">
                  {provider.name} 在我们的测试中表现 {provider.speedScore > 90 ? '非常出色' : '良好'}。
                  其 {provider.tags[0]} 特性对于特定用户群体非常有吸引力。
                  如果您预算在 ¥{provider.startPrice} 左右，这是一个值得尝试的选择。
                </p>
             </section>
          </div>
        </div>
      </div>

    </div>
  );
};

export default DetailPage;