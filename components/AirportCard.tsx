import React from 'react';
import { Link } from 'react-router-dom';
import { Provider } from '../types';

interface AirportCardProps {
  provider: Provider;
}

const AirportCard: React.FC<AirportCardProps> = ({ provider }) => {
  return (
    <div className="bg-white dark:bg-slate-850 rounded-xl overflow-hidden border border-gray-200 dark:border-slate-700 hover:border-primary-500 dark:hover:border-primary-500 transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/10 group flex flex-col h-full relative">
      
      {provider.badge && (
        <div className="absolute top-0 right-0 bg-gradient-to-bl from-red-500 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-bl-xl shadow-md z-20">
          {provider.badge}
        </div>
      )}

      <div className="p-6 flex-1">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
             <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-slate-700 overflow-hidden border-2 border-gray-200 dark:border-slate-600 group-hover:border-primary-500 transition-colors">
               <img src={provider.logoUrl} alt={provider.name} className="w-full h-full object-cover opacity-90 dark:opacity-80 group-hover:opacity-100" />
             </div>
             <div>
               <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{provider.name}</h3>
               <div className="flex items-center gap-1 text-yellow-500 dark:text-yellow-400 text-sm">
                 <span>★</span>
                 <span>{provider.rating}</span>
               </div>
             </div>
          </div>
          <div className="text-right">
             <span className="text-xs text-gray-500 dark:text-slate-400 block">起步价</span>
             <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">¥{provider.startPrice}</span>
             <span className="text-xs text-gray-500 dark:text-slate-500">/月</span>
          </div>
        </div>
        
        <p className="text-gray-600 dark:text-slate-400 text-sm mb-4 line-clamp-3 h-14">{provider.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {provider.tags.map(tag => (
            <span key={tag} className="px-2 py-1 bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300 text-xs rounded-md border border-gray-200 dark:border-slate-700">
              {tag}
            </span>
          ))}
        </div>

        <div className="space-y-2 text-sm text-gray-500 dark:text-slate-300">
          <div className="flex justify-between items-center">
            <span>速度</span>
            <div className="w-32 h-2 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${provider.speedScore}%` }}></div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span>稳定性</span>
            <div className="w-32 h-2 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${provider.stabilityScore}%` }}></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="px-6 py-4 bg-gray-50 dark:bg-slate-900/50 border-t border-gray-200 dark:border-slate-800">
        <Link 
          to={`/airport/${provider.id}`}
          className="w-full py-2 bg-primary-600 hover:bg-primary-500 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
        >
          查看详情
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default AirportCard;