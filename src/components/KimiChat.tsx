import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function KimiChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'assistant',
      content: "Greetings, seeker of wisdom. I am Kimi, your reasoning companion. Share with me a question, a dilemma, or a thought you wish to explore, and together we shall navigate the depths of understanding.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isThinking) return;

    const userMessage: Message = {
      id: Date.now(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsThinking(true);

    // Simulate API response (since we can't use external APIs)
    setTimeout(() => {
      const responses = [
        "An intriguing perspective. Let us examine this through multiple lenses. First, consider the underlying assumptions—what do we take for granted here? Often, the most profound insights emerge when we question what seems obvious.",
        "Your inquiry touches upon a fundamental aspect of reasoning. The key lies not in seeking a single answer, but in understanding the framework within which the question exists. What context shapes this thought?",
        "I sense layers within your question. On the surface, it appears straightforward, yet beneath lies a web of interconnected ideas. Let us unravel these threads methodically, starting with the core premise.",
        "Fascinating. This reminds me of the dialectical method—thesis, antithesis, synthesis. What opposing viewpoint might challenge this position? In examining its contrary, we often discover deeper truth.",
        "Consider this: every question carries within it the seeds of its own answer. The way you've framed this reveals certain assumptions. What if we reframe it entirely? New perspectives often yield unexpected clarity.",
      ];

      const assistantMessage: Message = {
        id: Date.now(),
        role: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsThinking(false);
    }, 2000 + Math.random() * 1500);
  };

  return (
    <div className="h-full flex flex-col p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-4 md:mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center">
            <span className="text-lg md:text-xl font-display font-bold text-white">K</span>
          </div>
          <div>
            <h2 className="font-display text-lg md:text-xl text-amber-200">Kimi Reasoning Engine</h2>
            <p className="text-xs md:text-sm text-white/40">Powered by advanced reasoning AI</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 md:space-y-6 pr-2 scrollbar-thin scrollbar-thumb-amber-500/20 scrollbar-track-transparent">
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[90%] md:max-w-[80%] rounded-2xl px-4 md:px-5 py-3 md:py-4 ${
                  message.role === 'user'
                    ? 'bg-amber-500/20 border border-amber-500/30 text-amber-100'
                    : 'bg-white/5 border border-white/10 text-white/80'
                }`}
              >
                <p className="text-sm md:text-base leading-relaxed">{message.content}</p>
                <p className="text-[10px] md:text-xs text-white/30 mt-2">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isThinking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-white/5 border border-white/10 rounded-2xl px-4 md:px-5 py-3 md:py-4">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span className="text-xs md:text-sm text-white/40">Reasoning...</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="mt-4 md:mt-6">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Share your thoughts or questions..."
            className="w-full bg-white/5 border border-amber-500/20 rounded-xl px-4 md:px-5 py-3 md:py-4 pr-14 md:pr-16 text-sm md:text-base text-white placeholder-white/30 focus:outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 transition-all"
            disabled={isThinking}
          />
          <button
            type="submit"
            disabled={!input.trim() || isThinking}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 md:w-11 md:h-11 rounded-lg bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-white disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105 active:scale-95 transition-transform"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 2L11 13" />
              <path d="M22 2L15 22L11 13L2 9L22 2Z" />
            </svg>
          </button>
        </div>
        <p className="text-[10px] md:text-xs text-white/20 mt-2 text-center">
          Kimi API simulated for demonstration purposes
        </p>
      </form>
    </div>
  );
}
