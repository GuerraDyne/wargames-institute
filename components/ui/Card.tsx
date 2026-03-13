'use client';

import React from 'react';
import { motion } from 'framer-motion';

export interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'briefing' | 'tactical';
  className?: string;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  className = '',
  hover = true,
}) => {
  const id = React.useId();
  const baseStyles = 'relative bg-background-secondary border rounded transition-all duration-300';

  const variantStyles = {
    default: 'border-border p-6',
    briefing: 'border-tactical-cyan/30 p-6 before:absolute before:top-0 before:left-0 before:w-1 before:h-full before:bg-tactical-cyan before:opacity-50',
    tactical: 'border-tactical-blue p-8 bg-gradient-to-br from-background-secondary to-background-tertiary',
  };

  const hoverStyles = hover
    ? 'hover:border-border-highlight hover:shadow-[0_0_30px_rgba(74,159,184,0.2)] hover:-translate-y-1'
    : '';
  const seed = Array.from(id).reduce((total, char) => total + char.charCodeAt(0), 0);
  const coordinateLetter = String.fromCharCode(65 + (seed % 26));
  const coordinateNumber = (seed % 99) + 1;

  return (
    <motion.div
      className={`${baseStyles} ${variantStyles[variant]} ${hoverStyles} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      {/* Tactical grid coordinates (top-right) */}
      <div className="absolute top-2 right-2 font-mono text-xs text-muted opacity-30">
        [{coordinateLetter}-{coordinateNumber}]
      </div>

      {children}

      {/* Tactical corner brackets */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-tactical-cyan/20" />
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-tactical-cyan/20" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-tactical-cyan/20" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-tactical-cyan/20" />
    </motion.div>
  );
};
