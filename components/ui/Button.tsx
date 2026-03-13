'use client';

import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'font-mono uppercase tracking-wider relative overflow-hidden transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantStyles = {
    primary: 'bg-tactical-blue text-foreground border border-tactical-cyan hover:bg-tactical-cyan hover:shadow-[0_0_20px_rgba(74,159,184,0.5)] hover:scale-105',
    secondary: 'bg-tactical-amber text-background border border-tactical-amber-dark hover:shadow-[0_0_20px_rgba(212,165,100,0.5)] hover:scale-105',
    outline: 'bg-transparent text-tactical-cyan border border-tactical-cyan hover:bg-tactical-cyan/10 hover:shadow-[0_0_15px_rgba(74,159,184,0.3)]',
    ghost: 'bg-transparent text-foreground hover:bg-background-secondary hover:text-tactical-cyan border border-transparent hover:border-tactical-cyan/30',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-6 py-2.5 text-sm',
    lg: 'px-8 py-3.5 text-base',
  };

  return (
    <motion.button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={disabled || isLoading}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span>Processing...</span>
        </span>
      ) : (
        children
      )}

      {/* Tactical corner accent */}
      <span className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-current opacity-50" />
      <span className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-current opacity-50" />
    </motion.button>
  );
};
