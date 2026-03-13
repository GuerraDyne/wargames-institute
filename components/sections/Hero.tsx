'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button, GridOverlay, GlitchText } from '../ui';
import Link from 'next/link';
import { TacticalMapBackdrop } from './TacticalMapBackdrop';

export const Hero: React.FC = () => {
  const [mapRevealed, setMapRevealed] = useState(false);

  const toggleMapReveal = () => {
    setMapRevealed(prev => !prev);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <TacticalMapBackdrop />
      <GridOverlay pattern="square" opacity={0.06} animated={true} />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_54%_38%,rgba(10,26,38,0.02),transparent_52%)] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/8 via-background/10 to-background/34 pointer-events-none" />

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        {mapRevealed ? (
          <button
            type="button"
            onClick={toggleMapReveal}
            className="absolute right-6 top-24 z-20 inline-flex items-center gap-3 border border-tactical-cyan/30 bg-background/60 px-4 py-3 font-mono text-xs uppercase tracking-[0.22em] text-tactical-cyan backdrop-blur-sm transition-colors hover:bg-background/80"
          >
            <span>Raise Briefing</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-tactical-cyan/30">
              ↑
            </span>
          </button>
        ) : null}

        <motion.div
          className="max-w-7xl mx-auto pt-8 md:pt-4 pb-32 md:pb-36"
          animate={{ y: mapRevealed ? 840 : 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Tactical Header */}
          <motion.div
            className="inline-block font-mono text-xs text-tactical-cyan uppercase tracking-widest mb-6 border border-tactical-cyan/30 bg-background/55 backdrop-blur-sm px-4 py-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-muted">STATUS:</span> OPERATIONAL <span className="text-muted">|</span> CLASSIFICATION: PUBLIC
          </motion.div>

          <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,0.92fr)_minmax(360px,0.9fr)] gap-8 items-start">
            <motion.div
              className="max-w-3xl text-left bg-[linear-gradient(180deg,rgba(7,11,15,0.38),rgba(7,11,15,0.12))] border border-tactical-cyan/14 backdrop-blur-[5px] px-6 py-8 md:px-8 md:py-10 shadow-[0_20px_80px_rgba(0,0,0,0.18)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <div className="font-mono text-[11px] md:text-xs uppercase tracking-[0.28em] text-tactical-amber mb-4">
                Wargame Education, Mechanics, and Research
              </div>

              <motion.h1
                className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-[0.95] max-w-[10ch]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
              >
                <GlitchText trigger="once">WARGAME THE</GlitchText>
                <br />
                <span className="text-tactical-cyan">DECISION</span>
                <br />
                <span className="text-foreground">BEFORE IT IS</span>
                <br />
                <span className="text-tactical-amber">REAL</span>
              </motion.h1>

              <motion.p
                className="text-lg md:text-xl text-muted max-w-3xl mb-8 text-balance"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Learn how wargames work, how mechanics shape decisions, how to read classic systems, and how playable models can be used to explore real-world problems.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row items-start gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55 }}
              >
                <Link href="/research">
                  <Button variant="primary" size="lg">
                    START LEARNING
                  </Button>
                </Link>
                <Link href="/projects">
                  <Button variant="outline" size="lg">
                    SEE DEMOS
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              className="hidden xl:block bg-[linear-gradient(180deg,rgba(10,14,18,0.18),rgba(10,14,18,0.04))] border border-tactical-cyan/12 backdrop-blur-[2px] p-5 self-stretch"
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
            >
              <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-tactical-cyan mb-4">
                Site Focus
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="border border-tactical-cyan/14 bg-background/14 p-4 min-h-[132px]">
                  <div className="font-mono text-xs uppercase tracking-wider text-tactical-amber mb-2">How to Play</div>
                  <p className="text-muted">Explain turn structures, counters, terrain, combat systems, objectives, and the logic behind common wargame designs.</p>
                </div>
                <div className="border border-tactical-cyan/14 bg-background/14 p-4 min-h-[132px]">
                  <div className="font-mono text-xs uppercase tracking-wider text-tactical-amber mb-2">Mechanics</div>
                  <p className="text-muted">Break down what specific rules are doing and why some mechanics produce insight while others only produce chrome.</p>
                </div>
                <div className="border border-tactical-cyan/14 bg-background/14 p-4 col-span-2 min-h-[148px]">
                  <div className="font-mono text-xs uppercase tracking-wider text-tactical-amber mb-2">Research Through Play</div>
                  <p className="text-muted">Show how wargames can be used to test assumptions, explore strategic questions, and turn messy issues into something playable enough to study.</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Key Features Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mt-16"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {[
              { title: 'Play', icon: '🎲', description: 'Learn how systems run' },
              { title: 'Study', icon: '📚', description: 'Read mechanics and methods' },
              { title: 'Analyze', icon: '🔍', description: 'Break down game logic' },
              { title: 'Model', icon: '⚙️', description: 'Turn problems into systems' },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="relative bg-[linear-gradient(180deg,rgba(17,17,17,0.24),rgba(9,14,19,0.48))] backdrop-blur-[3px] border border-tactical-blue/24 p-6 hover:border-tactical-cyan transition-all group"
                whileHover={{ y: -5 }}
              >
                {/* Corner brackets */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-tactical-cyan/40" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-tactical-cyan/40" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-tactical-cyan/40" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-tactical-cyan/40" />

                <div className="text-3xl mb-3 filter grayscale group-hover:grayscale-0 transition-all">
                  {feature.icon}
                </div>
                <h3 className="font-mono text-sm uppercase tracking-wider text-tactical-cyan mb-2">
                  {feature.title}
                </h3>
                <p className="text-xs text-muted">{feature.description}</p>

                {/* Tactical number */}
                <div className="absolute top-2 right-2 font-mono text-[10px] text-muted/30">
                  {String(index + 1).padStart(2, '0')}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.button
            type="button"
            onClick={toggleMapReveal}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 group"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <div className="flex flex-col items-center gap-2">
              <span className="font-mono text-[10px] text-muted uppercase tracking-[0.35em] group-hover:text-tactical-cyan transition-colors">
                {mapRevealed ? 'Raise Briefing' : 'Reveal Theater'}
              </span>
              <motion.div
                className="w-10 h-10 rounded-full border border-tactical-cyan/28 bg-background/24 flex items-center justify-center text-tactical-cyan"
                animate={{ y: mapRevealed ? [0, -6, 0] : [0, 6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                {mapRevealed ? '↑' : '↓'}
              </motion.div>
              <motion.div
                className="w-0.5 h-10 bg-gradient-to-b from-tactical-cyan/80 to-transparent"
                animate={{ height: [48, 24, 48] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
          </motion.button>
        </motion.div>
      </div>

      {/* Tactical Crosshair Decoration (bottom corner) */}
      <div className="absolute bottom-8 right-4 md:bottom-10 md:right-10 w-24 h-24 md:w-32 md:h-32 opacity-20 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-full h-px bg-tactical-cyan" />
        <div className="absolute top-0 left-1/2 w-px h-full bg-tactical-cyan" />
        <div className="absolute top-1/2 left-1/2 w-16 h-16 -translate-x-1/2 -translate-y-1/2 border border-tactical-cyan rounded-full" />
      </div>
    </section>
  );
};
