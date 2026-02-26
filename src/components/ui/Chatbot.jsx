import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I am the ROi AI Assistant. Ask me anything about our foundation processes, QA/QC standards, or project scoping!", isBot: true }
  ]);
  
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isLoading]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    
    // 1. Add user message to UI immediately
    setMessages(prev => [...prev, { text: userMessage, isBot: false }]);
    setInput('');
    setIsLoading(true);

    try {
      // ⚠️ REPLACE THIS URL with your actual FastAPI/Backend endpoint
      const response = await fetch('https://your-api-url.com/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();
      
      // 2. Add the AI's response to the UI
      setMessages(prev => [...prev, { text: data.reply, isBot: true }]);
      
    } catch (error) {
      console.error("Chat API Error:", error);
      // Fallback message if the API is down or not connected yet
      setMessages(prev => [...prev, { 
        text: "I'm currently offline for maintenance, but you can still reach our team via the contact form above!", 
        isBot: true 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-[#2a221a] rounded-xl border border-white/10 shadow-2xl overflow-hidden flex flex-col h-[450px]"
          >
            {/* Header */}
            <div className="bg-[#1a140f] p-4 border-b border-white/10 flex justify-between items-center">
              <div>
                <h3 className="text-white font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  ROi AI Assistant
                </h3>
                <p className="text-xs text-gray-400 mt-1">Ask me about ROi Construction</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages Container */}
            <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4">
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`max-w-[85%] rounded-lg p-3 text-sm leading-relaxed ${
                    msg.isBot 
                      ? 'bg-[#1a140f] text-gray-300 self-start border border-white/5 rounded-tl-none' 
                      : 'bg-roi-orange text-white self-end rounded-tr-none'
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              
              {/* Animated Loading State */}
              {isLoading && (
                <div className="bg-[#1a140f] text-gray-400 self-start border border-white/5 rounded-lg rounded-tl-none p-3 flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin text-roi-orange" />
                  <span className="text-xs">AI is thinking...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className="p-3 bg-[#1a140f] border-t border-white/10 flex gap-2 items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                disabled={isLoading}
                className="flex-1 bg-[#2a221a] text-white text-sm rounded-lg px-4 py-2.5 border border-white/5 focus:outline-none focus:border-roi-orange transition-colors disabled:opacity-50"
              />
              <button 
                type="submit" 
                disabled={isLoading || !input.trim()}
                className="bg-roi-orange text-white p-2.5 rounded-lg hover:bg-orange-600 transition-colors flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-roi-orange text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl hover:bg-orange-600 transition-transform hover:scale-105"
        aria-label="Toggle Chatbot"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </>
  );
}