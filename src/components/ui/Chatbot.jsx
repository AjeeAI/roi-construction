import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Markdown from 'react-markdown';

/** * Generate a session ID once per mount to maintain stateful 
 * memory in LangGraph.
 */
const THREAD_ID = `roi-session-${Math.random().toString(36).substring(7)}`;

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLimitReached, setIsLimitReached] = useState(false);
  const [messages, setMessages] = useState([
    { 
      text: "Hello! I am the **ROi AI Assistant**. Ask me about our **'Zero Guesswork'** policy, structural integrity, or project ROI.", 
      isBot: true 
    }
  ]);
  
  const messagesEndRef = useRef(null);


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e) => {
    e.preventDefault();
    
    // Prevent sending if empty, loading, or rate limit exceeded
    if (!input.trim() || isLoading || isLimitReached) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { text: userMessage, isBot: false }]);
    setInput('');
    setIsLoading(true);

    // Initialize an empty message for the AI to stream tokens into
    setMessages(prev => [...prev, { text: '', isBot: true }]);

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/chat`, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: userMessage,
          thread_id: THREAD_ID 
        }),
      });

      if (!response.ok) throw new Error('Failed to fetch');

    
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullText = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        fullText += chunk;

        /**
         * Monitor the stream for the specific limit message triggered 
         * by the LangGraph assistant node.
         */
        if (fullText.includes("reached the limit of our 'Zero Guesswork' preview")) {
          setIsLimitReached(true);
        }

        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1].text = fullText;
          return updated;
        });
      }

    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [
        ...prev.slice(0, -1),
        { 
          text: "Connection error. Please reach us at **roiconstructionng@gmail.com**[cite: 18].", 
          isBot: true 
        }
      ]);
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
            className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-[#2a221a] rounded-xl border border-white/10 shadow-2xl flex flex-col h-[500px] overflow-hidden"
          >
          
            <div className="bg-[#1a140f] p-4 border-b border-white/10 flex justify-between items-center">
              <h3 className="text-white font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                ROi AI Consultant
              </h3>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Chat Area: Renders markdown for professional technical presentation */}
            <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4 bg-[#2a221a]">
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`max-w-[85%] rounded-lg p-3 text-sm ${
                    msg.isBot 
                      ? 'bg-[#1a140f] text-gray-300 self-start border border-white/5 rounded-tl-none' 
                      : 'bg-[#ea580c] text-white self-end rounded-tr-none'
                  }`}
                >
                  <div className="prose prose-invert prose-sm max-w-none prose-p:leading-relaxed prose-strong:text-[#ea580c] prose-ul:list-disc prose-ul:ml-4">
                    <Markdown>{msg.text}</Markdown>
                  </div>
                </div>
              ))}
              {isLoading && messages[messages.length-1].text === "" && (
                <div className="text-gray-400 text-xs animate-pulse">ROi AI agent is thinking...</div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form: UI locks once the 4-response preview limit is met */}
            <form onSubmit={handleSend} className="p-3 bg-[#1a140f] border-t border-white/10 flex gap-2">
              <input
                type="text"
                value={input}
                disabled={isLimitReached}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isLimitReached ? "Preview limit reached" : "Ask about foundations..."}
                className={`flex-1 bg-[#2a221a] text-white text-sm rounded-lg px-4 py-2 border border-white/5 focus:outline-none focus:border-[#ea580c] transition-all ${
                  isLimitReached ? 'opacity-50 cursor-not-allowed italic' : ''
                }`}
              />
              <button 
                type="submit" 
                disabled={isLimitReached || !input.trim() || isLoading}
                className="bg-[#ea580c] text-white p-2 rounded-lg hover:bg-orange-600 transition-colors disabled:bg-gray-700 disabled:cursor-not-allowed"
              >
                {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} className="rotate-45" />}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-[#ea580c] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-transform"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </>
  );
}