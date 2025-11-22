import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { getGeminiResponse } from '../services/geminiService';

const AiChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: '你好！我是云游助手。想找便宜的？还是速度快的？我可以帮你推荐机场！', timestamp: Date.now() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const responseText = await getGeminiResponse(input);
    
    const botMsg: ChatMessage = { role: 'model', text: responseText, timestamp: Date.now() };
    setMessages(prev => [...prev, botMsg]);
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>
      {/* Trigger Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-primary-600 hover:bg-primary-500 text-white rounded-full shadow-lg shadow-primary-600/40 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-96 h-[500px] bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-colors">
          {/* Header */}
          <div className="bg-gray-50 dark:bg-slate-800 p-4 border-b border-gray-200 dark:border-slate-700 flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <h3 className="font-bold text-gray-900 dark:text-white">AI 选购助手</h3>
            <span className="text-xs text-gray-500 dark:text-slate-400 ml-auto bg-gray-200 dark:bg-slate-700 px-2 py-1 rounded">Gemini 2.5 Flash</span>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-slate-900">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-primary-600 text-white rounded-tr-none' 
                      : 'bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-200 rounded-tl-none border border-gray-200 dark:border-slate-700 shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-slate-800 text-gray-500 dark:text-slate-400 rounded-2xl rounded-tl-none px-4 py-2 text-xs border border-gray-200 dark:border-slate-700 flex items-center gap-1 shadow-sm">
                   <span>Thinking</span>
                   <span className="animate-bounce">.</span>
                   <span className="animate-bounce delay-75">.</span>
                   <span className="animate-bounce delay-150">.</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-gray-100 dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700">
            <div className="flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="例如：推荐一个看奈飞便宜的机场"
                className="flex-1 bg-white dark:bg-slate-900 text-gray-900 dark:text-white text-sm rounded-lg border border-gray-300 dark:border-slate-600 focus:border-primary-500 focus:outline-none px-3 py-2"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="bg-primary-600 hover:bg-primary-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg px-4 py-2 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AiChat;