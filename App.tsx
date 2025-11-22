import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AiChat from './components/AiChat';
import HomePage from './components/HomePage';
import DetailPage from './components/DetailPage';
import ClientTutorial from './components/ClientTutorial';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-slate-950 text-slate-200 pb-20 font-sans selection:bg-primary-500/30">
        
        {/* Navbar - Global */}
        <nav className="sticky top-0 z-30 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="bg-gradient-to-br from-primary-500 to-purple-600 text-white p-2 rounded-lg shadow-lg shadow-primary-500/20">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                   <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </div>
              <span className="font-bold text-xl tracking-tight text-white">CloudFly<span className="text-primary-500">.Reviews</span></span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link to="/" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">首页</Link>
              <Link to="/#chart" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">数据对比</Link>
              
              {/* Dropdown Menu */}
              <div className="relative group h-full flex items-center cursor-pointer">
                 <div className="flex items-center gap-1 text-sm font-medium text-slate-300 group-hover:text-white transition-colors py-4">
                    客户端教程
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                 </div>
                 <div className="absolute top-[calc(100%-0.5rem)] left-1/2 -translate-x-1/2 w-48 bg-slate-800 rounded-xl shadow-xl border border-slate-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 overflow-hidden">
                    <div className="py-2">
                       <Link to="/tutorial/windows" className="block px-4 py-2.5 text-sm text-slate-300 hover:bg-primary-600 hover:text-white transition-colors flex items-center gap-2">
                         <span className="text-blue-400">❖</span> Windows
                       </Link>
                       <Link to="/tutorial/android" className="block px-4 py-2.5 text-sm text-slate-300 hover:bg-primary-600 hover:text-white transition-colors flex items-center gap-2">
                         <span className="text-green-400">❖</span> Android
                       </Link>
                       <Link to="/tutorial/ios" className="block px-4 py-2.5 text-sm text-slate-300 hover:bg-primary-600 hover:text-white transition-colors flex items-center gap-2">
                         <span className="text-slate-100">❖</span> iOS / iPhone
                       </Link>
                       <Link to="/tutorial/mac" className="block px-4 py-2.5 text-sm text-slate-300 hover:bg-primary-600 hover:text-white transition-colors flex items-center gap-2">
                         <span className="text-slate-400">❖</span> macOS
                       </Link>
                    </div>
                 </div>
              </div>

              <Link to="/#guide" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">选购指南</Link>
            </div>
          </div>
        </nav>

        {/* Route Content */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/airport/:id" element={<DetailPage />} />
          <Route path="/tutorial/:platform" element={<ClientTutorial />} />
        </Routes>

        {/* Footer - Global */}
        <footer className="bg-slate-900 border-t border-slate-800 py-12 mt-0">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-slate-500 text-sm mb-4">
              免责声明：本站仅提供网络加速服务评测与技术交流，不提供任何非法网络服务。请遵守当地法律法规。
            </p>
            <p className="text-slate-600 text-xs">
              &copy; {new Date().getFullYear()} CloudFly Reviews. Powered by React & Gemini.
            </p>
          </div>
        </footer>

        {/* AI Widget - Global */}
        <AiChat />
      </div>
    </Router>
  );
};

export default App;