'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navigation } from './Navigation';
import { motion, useScroll, useTransform } from 'framer-motion';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 100], [0, 0.95]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-md border-b border-tactical-cyan/20 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background grid overlay (visible when scrolled) */}
      {isScrolled && (
        <motion.div
          className="absolute inset-0 tactical-grid pointer-events-none"
          style={{ opacity }}
        />
      )}

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 border-2 border-tactical-cyan relative flex items-center justify-center">
              {/* Tactical crosshair */}
              <div className="w-6 h-6 relative">
                <div className="absolute top-1/2 left-0 w-full h-px bg-tactical-cyan" />
                <div className="absolute top-0 left-1/2 w-px h-full bg-tactical-cyan" />
                <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 -translate-x-1/2 -translate-y-1/2 border border-tactical-cyan" />
              </div>

              {/* Corner accents */}
              <span className="absolute -top-0.5 -left-0.5 w-2 h-2 border-t-2 border-l-2 border-tactical-cyan-bright" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 border-t-2 border-r-2 border-tactical-cyan-bright" />
              <span className="absolute -bottom-0.5 -left-0.5 w-2 h-2 border-b-2 border-l-2 border-tactical-cyan-bright" />
              <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 border-b-2 border-r-2 border-tactical-cyan-bright" />
            </div>

            <div>
              <div className="font-mono text-lg font-bold uppercase tracking-wider text-foreground group-hover:text-tactical-cyan transition-colors">
                Wargames<span className="text-tactical-cyan">.</span>Institute
              </div>
              <div className="font-mono text-[10px] text-muted uppercase tracking-widest">
                Strategic Simulation Systems
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <Navigation />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden w-10 h-10 border border-tactical-cyan relative flex flex-col items-center justify-center gap-1.5"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`w-5 h-0.5 bg-tactical-cyan transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-5 h-0.5 bg-tactical-cyan transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-5 h-0.5 bg-tactical-cyan transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.div
            className="lg:hidden pb-6 border-t border-tactical-cyan/20 mt-2"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="pt-4">
              <Navigation />
            </div>
          </motion.div>
        )}
      </div>

      {/* Tactical status bar */}
      <div className="h-0.5 bg-gradient-to-r from-transparent via-tactical-cyan to-transparent opacity-30" />
    </motion.header>
  );
};
