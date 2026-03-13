'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui';

interface SystemLevel {
  id: string;
  title: string;
  description: string;
  elements: string[];
  complexity: number;
}

const SYSTEMS: SystemLevel[] = [
  {
    id: 'complex',
    title: 'Real-World Problem',
    description: 'A live situation with too many interacting variables to play directly',
    elements: [
      'Political relations',
      'Economic factors',
      'Weather patterns',
      'Supply chains',
      'Troop morale',
      'Intelligence data',
      'Terrain features',
      'Public opinion',
      'Technology levels',
      'Alliance dynamics',
      'Cultural factors',
      'Historical context',
      'Resource availability',
      'Communication networks',
      'Leadership decisions',
    ],
    complexity: 100,
  },
  {
    id: 'abstract',
    title: 'Playable Abstraction',
    description: 'Key variables selected, simplified, and turned into a model',
    elements: [
      'Territory control',
      'Unit strength',
      'Resource points',
      'Strategic positions',
      'Supply lines',
      'Combat effectiveness',
    ],
    complexity: 40,
  },
  {
    id: 'playable',
    title: 'Wargame',
    description: 'A gameable system for testing choices and observing consequences',
    elements: [
      'Game board',
      'Player pieces',
      'Turn structure',
      'Victory conditions',
      'Rule mechanics',
    ],
    complexity: 15,
  },
];

export const SystemAbstractionViz: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextStep = () => {
    if (currentStep < SYSTEMS.length - 1 && !isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        setIsAnimating(false);
      }, 600);
    }
  };

  const prevStep = () => {
    if (currentStep > 0 && !isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(prev => prev - 1);
        setIsAnimating(false);
      }, 600);
    }
  };

  const reset = () => {
    setCurrentStep(0);
  };

  const currentSystem = SYSTEMS[currentStep];

  return (
    <div className="bg-background-secondary border border-tactical-cyan/30 p-6">
      <div className="mb-6">
        <h3 className="font-mono text-tactical-cyan uppercase tracking-wider mb-2">
          From Reality to Play
        </h3>
        <p className="text-xs text-muted">
          See how wargames simplify real-world problems into playable systems without losing the mechanisms that matter
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
        {SYSTEMS.map((system, index) => (
          <div key={system.id} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              <motion.div
                className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-mono text-sm ${
                  index === currentStep
                    ? 'border-tactical-cyan bg-tactical-cyan/20 text-tactical-cyan'
                    : index < currentStep
                    ? 'border-tactical-cyan/50 bg-tactical-cyan/10 text-tactical-cyan/50'
                    : 'border-tactical-blue/30 bg-background text-muted'
                }`}
                animate={index === currentStep ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 1, repeat: Infinity }}
              >
                {index + 1}
              </motion.div>
              <div className="mt-2 text-xs text-center font-mono">
                <div className={index === currentStep ? 'text-tactical-cyan' : 'text-muted'}>
                  {system.title.split(' ')[0]}
                </div>
                <div className={index === currentStep ? 'text-tactical-cyan' : 'text-muted'}>
                  {system.title.split(' ')[1]}
                </div>
              </div>
            </div>

            {index < SYSTEMS.length - 1 && (
              <div className="flex-1 h-0.5 mx-2">
                <motion.div
                  className="h-full bg-tactical-cyan/20"
                  initial={{ width: '0%' }}
                  animate={{ width: index < currentStep ? '100%' : '0%' }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Main Visualization */}
      <div className="border border-tactical-blue/30 bg-background p-6 mb-6 min-h-96">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-start justify-between mb-4 min-h-20">
              <div>
                <h4 className="text-2xl font-bold text-tactical-cyan mb-2">
                  {currentSystem.title}
                </h4>
                <p className="text-muted">{currentSystem.description}</p>
              </div>

              <div className="text-right">
                <div className="font-mono text-xs text-muted mb-1">Complexity Level</div>
                <div className="text-3xl font-bold text-tactical-amber">
                  {currentSystem.complexity}%
                </div>
              </div>
            </div>

            {/* Complexity Bar */}
            <div className="mb-6">
              <div className="h-2 bg-background-secondary border border-tactical-blue/30 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-tactical-cyan to-tactical-amber"
                  initial={{ width: '0%' }}
                  animate={{ width: `${currentSystem.complexity}%` }}
                  transition={{ duration: 1, delay: 0.3 }}
                />
              </div>
            </div>

            {/* Elements Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {currentSystem.elements.map((element, index) => (
                <motion.div
                  key={element}
                  className="border border-tactical-cyan/20 bg-background-secondary p-3 text-sm"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                >
                  <div className="flex items-start gap-2">
                    <span className="text-tactical-cyan text-xs mt-0.5">&gt;</span>
                    <span className="text-muted flex-1">{element}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Insights */}
            <motion.div
              className="mt-6 border-l-2 border-tactical-cyan pl-4 text-sm min-h-14"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {currentStep === 0 && (
                <p className="text-muted italic">
                  The real world is too dense to play directly. A useful wargame begins by deciding what must stay and what can be abstracted away.
                </p>
              )}
              {currentStep === 1 && (
                <p className="text-muted italic">
                  Good abstraction is selective, not reductive. It preserves the mechanisms that generate meaningful choices.
                </p>
              )}
              {currentStep === 2 && (
                <p className="text-muted italic">
                  Once the problem is gameable, players can test decisions, compare approaches, and learn from outcomes instead of passively reading about them.
                </p>
              )}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <Button
          onClick={prevStep}
          disabled={currentStep === 0 || isAnimating}
          variant="outline"
          size="sm"
        >
          ← Previous
        </Button>

        <div className="font-mono text-xs text-muted">
          Step {currentStep + 1} of {SYSTEMS.length}
        </div>

        {currentStep < SYSTEMS.length - 1 ? (
          <Button
            onClick={nextStep}
            disabled={isAnimating}
            variant="primary"
            size="sm"
          >
            Next →
          </Button>
        ) : (
          <Button onClick={reset} variant="secondary" size="sm">
            Reset
          </Button>
        )}
      </div>
    </div>
  );
};
