import { useMemo } from 'react';
import { motion } from 'framer-motion';

export function BackgroundElements() {
  const hearts = useMemo(() => {
    return Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      scale: 0.2 + Math.random() * 0.8,
      delay: Math.random() * 10,
      duration: 15 + Math.random() * 20,
      opacity: 0.1 + Math.random() * 0.2,
    }));
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-white">
      {/* Animated gradient background */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-pink-100 via-rose-50 to-orange-50 opacity-80 animate-gradient"
        style={{ backgroundSize: '400% 400%' }}
      />
      
      {/* Subtle bloom/glow elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-slow"></div>
      <div className="absolute top-1/3 right-1/4 w-[30rem] h-[30rem] bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-1/4 left-1/2 w-80 h-80 bg-lavender rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow" style={{ animationDelay: '4s' }}></div>

      {/* Floating hearts */}
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-pink-300"
          initial={{ 
            x: `${heart.x}vw`, 
            y: `${heart.y}vh`, 
            scale: heart.scale,
            opacity: heart.opacity 
          }}
          animate={{
            y: [`${heart.y}vh`, `${heart.y - 15}vh`, `${heart.y}vh`],
            x: [`${heart.x}vw`, `${heart.x + (Math.random() > 0.5 ? 2 : -2)}vw`, `${heart.x}vw`]
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: "easeInOut"
          }}
        >
          {/* Premium UI Heart */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none">
             <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
