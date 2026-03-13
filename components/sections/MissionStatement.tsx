'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TacticalDivider } from '../ui';

export const MissionStatement: React.FC = () => {
  return (
    <section className="py-20 bg-background-secondary relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 hex-grid opacity-5 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block font-mono text-xs text-tactical-cyan uppercase tracking-widest mb-4 border border-tactical-cyan/30 px-4 py-2">
              Core Mission
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Understanding <span className="text-tactical-cyan">How Wargames Work</span> and <span className="text-tactical-amber">What They Teach</span>
            </h2>
          </motion.div>

          {/* Core Philosophy */}
          <motion.div
            className="bg-background border border-tactical-blue/30 p-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-start gap-4">
              <div className="w-1 h-full bg-tactical-amber flex-shrink-0" />
              <div>
                <p className="text-lg leading-relaxed mb-4">
                  <span className="text-tactical-cyan font-semibold">Wargames are more than just games—they're systems that model decisions, friction, and strategic trade-offs.</span>
                </p>
                <p className="text-muted leading-relaxed">
                  Whether you're playing <span className="text-foreground font-semibold">Twilight Struggle</span>, <span className="text-foreground font-semibold">Next War</span>, or <span className="text-foreground font-semibold">Warhammer 40K</span>, every mechanic is teaching something about the problem it's modeling.
                </p>
                <p className="text-muted leading-relaxed mt-4">
                  <span className="text-tactical-amber font-semibold">Wargames Institute exists to help you understand what those mechanics are doing and why they matter.</span>
                </p>
              </div>
            </div>
          </motion.div>

          <TacticalDivider variant="gradient" />

          {/* Key Questions */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-background border-l-2 border-tactical-cyan p-6">
              <h3 className="font-mono text-sm uppercase tracking-wider text-tactical-cyan mb-3">
                For Beginners
              </h3>
              <p className="text-muted text-sm">
                Learn how to play complex wargames without getting overwhelmed. We break games down into core mechanics first, then add layers.
              </p>
            </div>
            <div className="bg-background border-l-2 border-tactical-amber p-6">
              <h3 className="font-mono text-sm uppercase tracking-wider text-tactical-amber mb-3">
                For Experienced Players
              </h3>
              <ul className="text-sm text-muted space-y-2">
                <li className="flex items-start">
                  <span className="text-tactical-cyan mr-2">&gt;</span>
                  What is this mechanic actually modeling?
                </li>
                <li className="flex items-start">
                  <span className="text-tactical-cyan mr-2">&gt;</span>
                  Why did designers choose this rule?
                </li>
                <li className="flex items-start">
                  <span className="text-tactical-cyan mr-2">&gt;</span>
                  What can this game teach about real problems?
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Long-term Vision */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="inline-block bg-background-tertiary border border-tactical-cyan/20 px-8 py-6">
              <p className="text-sm text-muted mb-2">COMMUNITY FOCUS</p>
              <p className="text-base max-w-2xl">
                Building a comprehensive resource for wargamers who want to learn complex games, understand mechanics, and use wargames to explore real-world questions.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
