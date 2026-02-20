import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { KimiChat } from './components/KimiChat';
import { GrokSunset } from './components/GrokSunset';
import { StarField } from './components/StarField';

type ActivePanel = 'kimi' | 'grok';

function App() {
  const [activePanel, setActivePanel] = useState<ActivePanel>('kimi');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a12] text-white relative overflow-hidden flex flex-col">
      <StarField />

      {/* Nebula gradient overlay */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-900/10 via-transparent to-cyan-900/20" />
        <div className="absolute bottom-0 right-0 w-3/4 h-3/4 bg-gradient-to-tl from-violet-900/10 via-transparent to-transparent" />
      </div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : -20 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 px-4 md:px-8 lg:px-12 py-6 md:py-8"
      >
        <div className="max-w-7xl mx-auto">
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl tracking-tight">
            <span className="text-amber-200">Mind</span>
            <span className="text-white/30 mx-2 md:mx-3">&</span>
            <span className="text-cyan-300">Cosmos</span>
          </h1>
          <p className="text-white/40 mt-2 text-sm md:text-base font-light tracking-wide">
            AI-Powered Reasoning & Celestial Predictions
          </p>
        </div>
      </motion.header>

      {/* Tab Navigation */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: mounted ? 1 : 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative z-10 px-4 md:px-8 lg:px-12"
      >
        <div className="max-w-7xl mx-auto flex gap-2 md:gap-4">
          <button
            onClick={() => setActivePanel('kimi')}
            className={`relative px-4 md:px-6 py-3 md:py-4 text-sm md:text-base font-medium tracking-wide transition-all duration-300 rounded-t-xl ${
              activePanel === 'kimi'
                ? 'text-amber-200'
                : 'text-white/40 hover:text-white/60'
            }`}
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2a10 10 0 110 20 10 10 0 010-20z" />
                <path d="M12 8v4l3 3" />
              </svg>
              Kimi Reasoning
            </span>
            {activePanel === 'kimi' && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-gradient-to-b from-amber-500/20 to-amber-500/5 rounded-t-xl border border-b-0 border-amber-500/30"
              />
            )}
          </button>

          <button
            onClick={() => setActivePanel('grok')}
            className={`relative px-4 md:px-6 py-3 md:py-4 text-sm md:text-base font-medium tracking-wide transition-all duration-300 rounded-t-xl ${
              activePanel === 'grok'
                ? 'text-cyan-300'
                : 'text-white/40 hover:text-white/60'
            }`}
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
              Grok Sunset
            </span>
            {activePanel === 'grok' && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-gradient-to-b from-cyan-500/20 to-cyan-500/5 rounded-t-xl border border-b-0 border-cyan-500/30"
              />
            )}
          </button>
        </div>
      </motion.nav>

      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex-1 px-4 md:px-8 lg:px-12 pb-6 md:pb-8"
      >
        <div className="max-w-7xl mx-auto h-full">
          <div className={`rounded-2xl rounded-tl-none backdrop-blur-xl border h-full min-h-[500px] md:min-h-[600px] ${
            activePanel === 'kimi'
              ? 'bg-gradient-to-br from-amber-950/30 via-amber-950/10 to-transparent border-amber-500/20'
              : 'bg-gradient-to-br from-cyan-950/30 via-cyan-950/10 to-transparent border-cyan-500/20'
          }`}>
            <AnimatePresence mode="wait">
              {activePanel === 'kimi' ? (
                <motion.div
                  key="kimi"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.4 }}
                  className="h-full"
                >
                  <KimiChat />
                </motion.div>
              ) : (
                <motion.div
                  key="grok"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="h-full"
                >
                  <GrokSunset />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.main>

      {/* Footer */}
      <footer className="relative z-10 px-4 md:px-8 lg:px-12 py-4 md:py-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-white/25 text-xs md:text-sm font-light tracking-wide">
            Requested by <span className="text-white/40">@stringer_kade</span> · Built by <span className="text-white/40">@clonkbot</span>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
