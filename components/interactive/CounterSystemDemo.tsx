'use client';

import React, { useState } from 'react';
import { Button } from '../ui';

type CounterType = 'infantry' | 'armor' | 'artillery';

interface CounterCard {
  id: CounterType;
  label: string;
  symbol: string;
  move: number;
  attack: number;
  defense: number;
  range: string;
  lesson: string;
  whyItMatters: string;
}

const COUNTERS: CounterCard[] = [
  {
    id: 'infantry',
    label: 'Infantry Counter',
    symbol: 'X',
    move: 3,
    attack: 2,
    defense: 3,
    range: 'adjacent',
    lesson: 'Infantry is the baseline unit in many hex-and-counter systems: steady, versatile, and best at holding ground.',
    whyItMatters: 'This teaches that counters are not just tokens. Their printed numbers are the rule arguments that create different battlefield roles.',
  },
  {
    id: 'armor',
    label: 'Armor Counter',
    symbol: '◯',
    move: 5,
    attack: 4,
    defense: 3,
    range: 'adjacent',
    lesson: 'Armor is fast, hard-hitting, and usually strongest when it can exploit open terrain. In many systems it is not weaker than infantry; it is simply optimized for breakthrough and exploitation rather than static defense in rough ground.',
    whyItMatters: 'Hex-and-counter systems often use movement allowance, terrain costs, and combat factors together to show that a unit can be tactically powerful while still being terrain-sensitive.',
  },
  {
    id: 'artillery',
    label: 'Artillery Counter',
    symbol: '●',
    move: 2,
    attack: 3,
    defense: 1,
    range: '2 hexes',
    lesson: 'Artillery is weak in direct defense but shapes the battle by extending reach and softening targets before assaults.',
    whyItMatters: 'This demonstrates that some counters project effects without occupying the front line, which is one way wargames encode combined arms.',
  },
];

export const CounterSystemDemo: React.FC = () => {
  const [selected, setSelected] = useState<CounterType>('infantry');
  const current = COUNTERS.find(counter => counter.id === selected)!;

  return (
    <div className="bg-background-secondary border border-tactical-cyan/30 p-6">
      <div className="mb-5 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <div>
          <h3 className="font-mono text-tactical-cyan uppercase tracking-wider mb-2">
            Hex and Counter Primer
          </h3>
          <p className="text-xs text-muted max-w-2xl">
            This is a compact teaching aid for classic hex-and-counter design. Click each counter type to see how printed values become battlefield behavior.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {COUNTERS.map(counter => (
            <Button
              key={counter.id}
              onClick={() => setSelected(counter.id)}
              variant={selected === counter.id ? 'primary' : 'outline'}
              size="sm"
            >
              {counter.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[280px_minmax(0,1fr)] gap-6 items-start">
        <div className="border border-tactical-cyan/30 bg-background p-5">
          <div className="mx-auto mb-4 h-40 w-40 border-2 border-tactical-cyan/50 bg-[linear-gradient(180deg,rgba(17,17,17,0.2),rgba(10,16,22,0.7))] p-3 font-mono">
            <div className="flex justify-between text-xs text-tactical-amber">
              <span>{current.attack}</span>
              <span>{current.move}</span>
            </div>
            <div className="mt-6 text-center text-4xl text-tactical-cyan">{current.symbol}</div>
            <div className="mt-5 flex justify-between items-end">
              <span className="text-sm text-foreground">{current.label.split(' ')[0]}</span>
              <span className="text-xs text-tactical-amber">{current.defense}</span>
            </div>
          </div>
          <div className="text-center text-xs text-muted">
            Typical counter anatomy: attack top-left, movement top-right, symbol in center, defense bottom-right.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-tactical-cyan/30 bg-background p-4">
            <h4 className="font-mono text-xs uppercase tracking-wider text-tactical-cyan mb-3">Printed Values</h4>
            <div className="space-y-2 text-sm text-muted">
              <div>Attack: <span className="text-foreground font-semibold">{current.attack}</span></div>
              <div>Defense: <span className="text-foreground font-semibold">{current.defense}</span></div>
              <div>Movement: <span className="text-foreground font-semibold">{current.move}</span></div>
              <div>Range / Effect: <span className="text-foreground font-semibold">{current.range}</span></div>
            </div>
          </div>

          <div className="border border-tactical-cyan/30 bg-background p-4">
            <h4 className="font-mono text-xs uppercase tracking-wider text-tactical-cyan mb-3">Mechanic</h4>
            <p className="text-sm text-muted">
              {current.lesson}
            </p>
          </div>

          <div className="border border-tactical-cyan/30 bg-background p-4 md:col-span-2">
            <h4 className="font-mono text-xs uppercase tracking-wider text-tactical-cyan mb-3">Why Hex and Counter Systems Matter</h4>
            <p className="text-sm text-muted">
              {current.whyItMatters}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
