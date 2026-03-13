'use client';

import React from 'react';
import { motion } from 'framer-motion';

export interface GridOverlayProps {
  pattern?: 'square' | 'hex' | 'dots';
  opacity?: number;
  animated?: boolean;
  className?: string;
}

export const GridOverlay: React.FC<GridOverlayProps> = ({
  pattern = 'square',
  opacity = 0.15,
  animated = true,
  className = '',
}) => {
  const patternClasses = {
    square: 'tactical-grid',
    hex: 'hex-grid',
    dots: '',
  };

  const dotsPattern = pattern === 'dots' ? (
    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="dots" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill={`rgba(74, 159, 184, ${opacity})`} />
        </pattern>
      </defs>
      <rect x="0" y="0" width="100%" height="100%" fill="url(#dots)" />
    </svg>
  ) : null;

  return (
    <motion.div
      className={`absolute inset-0 pointer-events-none ${patternClasses[pattern]} ${className}`}
      style={{ opacity: pattern !== 'dots' ? opacity : 1 }}
      initial={animated ? { opacity: 0 } : undefined}
      animate={animated ? { opacity: pattern !== 'dots' ? opacity : 1 } : undefined}
      transition={animated ? { duration: 1.5, ease: 'easeOut' } : undefined}
    >
      {dotsPattern}
    </motion.div>
  );
};
