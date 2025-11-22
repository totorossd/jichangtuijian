import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Provider } from '../types';

interface ComparisonChartProps {
  data: Provider[];
}

const ComparisonChart: React.FC<ComparisonChartProps> = ({ data }) => {
  // Sort by score for better visualization, take top 5 for chart readability if list is long
  const chartData = [...data].sort((a, b) => b.speedScore - a.speedScore);

  return (
    <div className="w-full bg-slate-850 rounded-xl p-6 border border-slate-700 shadow-lg">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        性能雷达：速度 vs 价格
      </h3>
      <div className="h-[400px] w-full text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="name" stroke="#94a3b8" tick={{fill: '#94a3b8'}} interval={0} angle={-45} textAnchor="end" height={80} />
            <YAxis stroke="#94a3b8" tick={{fill: '#94a3b8'}} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569', color: '#f1f5f9' }}
              itemStyle={{ color: '#cbd5e1' }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Bar dataKey="speedScore" name="速度评分 (0-100)" fill="#6366f1" radius={[4, 4, 0, 0]}>
               {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={`rgba(99, 102, 241, ${0.5 + (index % 5) * 0.1})`} />
                ))}
            </Bar>
            <Bar dataKey="startPrice" name="起步价 (CNY)" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ComparisonChart;
