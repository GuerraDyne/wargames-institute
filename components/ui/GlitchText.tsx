'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export interface GlitchTextProps {
  children: string;
  className?: string;
  trigger?: 'hover' | 'always' | 'once';
}

export const GlitchText: React.FC<GlitchTextProps> = ({
  children,
  className = '',
  trigger = 'hover',
}) => {
  const [isGlitching, setIsGlitching] = useState(trigger === 'always');

  React.useEffect(() => {
    if (trigger === 'once') {
      setIsGlitching(true);
      const timeout = setTimeout(() => setIsGlitching(false), 1000);
      return () => clearTimeout(timeout);
    }
  }, [trigger]);

  const handleHover = () => {
    if (trigger === 'hover') {
      setIsGlitching(true);
    }
  };

  const handleHoverEnd = () => {
    if (trigger === 'hover') {
      setIsGlitching(false);
    }
  };

  return (
    <span
      className={`relative inline-block ${className}`}
      onMouseEnter={handleHover}
      onMouseLeave={handleHoverEnd}
    >
      <span className="relative z-10">{children}</span>

      {isGlitching && (
        <>
          {/* Red glitch layer */}
          <motion.span
            className="absolute top-0 left-0 text-red-500 opacity-70 -z-10"
            aria-hidden="true"
            animate={{
              x: [0, -2, 2, -1, 1, 0],
              y: [0, 1, -1, 2, -2, 0],
            }}
            transition={{
              duration: 0.3,
              repeat: trigger === 'always' ? Infinity : 0,
              repeatDelay: 2,
            }}
          >
            {children}
          </motion.span>

          {/* Cyan glitch layer */}
          <motion.span
            className="absolute top-0 left-0 text-tactical-cyan-bright opacity-70 -z-10"
            aria-hidden="true"
            animate={{
              x: [0, 2, -2, 1, -1, 0],
              y: [0, -1, 1, -2, 2, 0],
            }}
            transition={{
              duration: 0.3,
              repeat: trigger === 'always' ? Infinity : 0,
              repeatDelay: 2,
              delay: 0.05,
            }}
          >
            {children}
          </motion.span>
        </>
      )}
    </span>
  );
};
