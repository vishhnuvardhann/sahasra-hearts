import { useState, useCallback, ReactNode, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HEART_STYLES = ['💖', '💘', '💕', '💓', '💗', '💝', '✨'];

interface BurstParticle {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  emoji: string;
  driftX: number;
  driftRotate: number;
}

export function HeartBurst({ children }: { children: ReactNode }) {
  const [particles, setParticles] = useState<BurstParticle[]>([]);

  const handleBurst = useCallback((_e: MouseEvent<HTMLDivElement>) => {
    // Determine burst logic based on click position or let it stay relative
    const newParticles: BurstParticle[] = Array.from({ length: 40 }).map((_, i) => {
      const angle = (Math.random() * Math.PI * 2);
      const velocity = 80 + Math.random() * 200;
      return {
        id: Date.now() + i,
        x: Math.cos(angle) * velocity,
        y: Math.sin(angle) * velocity - 100, 
        rotation: Math.random() * 360,
        scale: 0.6 + Math.random() * 1.6,
        emoji: HEART_STYLES[Math.floor(Math.random() * HEART_STYLES.length)],
        driftX: Math.cos(angle) * velocity + (Math.random() * 100 - 50),
        driftRotate: (Math.random() * 360 - 180),
      };
    });

    setParticles(prev => [...prev.slice(-40), ...newParticles]);

    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.includes(p)));
    }, 8000);
  }, []);

  return (
    <div className="relative isolate" onClick={handleBurst}>
      {children}
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{ opacity: 1, scale: 0, x: 0, y: 0, rotate: 0 }}
            animate={{ 
              opacity: 1,
              scale: [0, particle.scale, particle.scale], 
              x: [0, particle.x, particle.driftX], 
              y: [0, particle.y, particle.y - 2000],
              rotate: [0, particle.rotation, particle.rotation + particle.driftRotate]
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ 
              duration: 6 + Math.random() * 2, 
              times: [0, 0.1, 1],
              ease: ["easeOut", "linear"]
            }}
            className="absolute top-1/2 left-1/2 pointer-events-none drop-shadow-md z-50 select-none"
            style={{ 
              marginTop: '-1rem', 
              marginLeft: '-1rem',
              fontSize: '2rem'
            }}
          >
            {particle.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
