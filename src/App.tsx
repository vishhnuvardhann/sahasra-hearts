import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BackgroundElements } from './components/BackgroundElements';
import { CursorSparkles } from './components/CursorSparkles';
import { HeartBurst } from './components/HeartBurst';

function App() {
  const [showSubtext, setShowSubtext] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSubtext(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center font-sans">
      <BackgroundElements />
      <CursorSparkles />
      
      <main className="relative z-10 w-full max-w-md mx-auto p-6 md:p-0">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1.2, ease: "easeOut" }}
           className="glass-panel rounded-3xl p-10 flex flex-col items-center text-center shadow-[0_8px_32px_rgba(255,183,197,0.3)] relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent pointer-events-none rounded-3xl mix-blend-overlay" />
          
          <motion.h1 
            className="font-serif text-5xl md:text-6xl font-semibold bg-gradient-to-r from-rose-500 via-pink-500 to-rose-400 bg-clip-text text-transparent mb-6 tracking-tight drop-shadow-sm leading-tight"
            initial={{ scale: 0.9, filter: 'blur(10px)' }}
            animate={{ scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.5, delay: 0.2 }}
          >
            For Sahasra 💖
          </motion.h1>

          <AnimatePresence>
            {showSubtext && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-pink-900/80 font-medium text-xl mb-12 leading-relaxed max-w-[280px]"
              >
                You make my world softer, prettier, and brighter ✨
              </motion.p>
            )}
          </AnimatePresence>

          <HeartBurst>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 25px rgba(255, 105, 180, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="relative group bg-gradient-to-r from-rose-400 to-pink-400 text-white font-semibold py-4 px-10 rounded-full shadow-[0_4px_14px_0_rgba(255,105,180,0.39)] hover:shadow-[0_6px_20px_rgba(255,105,180,0.23)] transition-all duration-300 overflow-hidden"
            >
               <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg]" />
               <span className="relative z-10 flex items-center gap-2 text-xl drop-shadow-md">
                 Press Me 💖
               </span>
            </motion.button>
          </HeartBurst>
        </motion.div>
      </main>
    </div>
  );
}

export default App;
