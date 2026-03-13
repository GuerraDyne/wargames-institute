'use client';

import React, { useState } from 'react';
import { Button, Card } from '../ui';

type TerrainType = 'open' | 'forest' | 'city';
type CombatResult = 'AE' | 'AR' | 'EX' | 'DR' | 'DE';

interface Unit {
  id: string;
  strength: number;
  type: 'infantry' | 'armor' | 'artillery';
}

interface CombatState {
  attackers: Unit[];
  defenders: Unit[];
  terrain: TerrainType;
  lastResult: CombatResult | null;
  combatLog: string[];
  combatsResolved: number;
}

const CRT_TABLE: Record<string, Record<number, CombatResult>> = {
  '1:3': { 1: 'AE', 2: 'AE', 3: 'AE', 4: 'AR', 5: 'AR', 6: 'AR' },
  '1:2': { 1: 'AE', 2: 'AE', 3: 'AR', 4: 'AR', 5: 'AR', 6: 'EX' },
  '1:1': { 1: 'AE', 2: 'AR', 3: 'AR', 4: 'EX', 5: 'EX', 6: 'DR' },
  '2:1': { 1: 'AR', 2: 'EX', 3: 'EX', 4: 'DR', 5: 'DR', 6: 'DE' },
  '3:1': { 1: 'EX', 2: 'DR', 3: 'DR', 4: 'DR', 5: 'DE', 6: 'DE' },
  '4:1': { 1: 'DR', 2: 'DR', 3: 'DE', 4: 'DE', 5: 'DE', 6: 'DE' },
};

const RESULT_NAMES: Record<CombatResult, string> = {
  'AE': 'Attacker Eliminated',
  'AR': 'Attacker Retreats',
  'EX': 'Exchange (Both Lose)',
  'DR': 'Defender Retreats',
  'DE': 'Defender Eliminated',
};

const TERRAIN_MODIFIERS: Record<TerrainType, { shift: number; name: string }> = {
  open: { shift: 0, name: 'Open Ground (No modifier)' },
  forest: { shift: -1, name: 'Forest (-1 column shift)' },
  city: { shift: -2, name: 'City (-2 column shifts)' },
};

const UNIT_STATS = {
  infantry: { attack: 2, defense: 3, name: 'Infantry', icon: '🎖️' },
  armor: { attack: 4, defense: 2, name: 'Armor', icon: '🛡️' },
  artillery: { attack: 3, defense: 1, name: 'Artillery', icon: '💥' },
};

const INITIAL_ATTACKERS: Unit[] = [
  { id: 'a1', strength: 3, type: 'infantry' },
  { id: 'a2', strength: 2, type: 'armor' },
];

const INITIAL_DEFENDERS: Unit[] = [
  { id: 'd1', strength: 2, type: 'infantry' },
  { id: 'd2', strength: 1, type: 'infantry' },
];

export const CombatResultsTableDemo: React.FC = () => {
  const [state, setState] = useState<CombatState>({
    attackers: INITIAL_ATTACKERS,
    defenders: INITIAL_DEFENDERS,
    terrain: 'open',
    lastResult: null,
    combatLog: ['⚔️ Configure your forces and attack!'],
    combatsResolved: 0,
  });

  const calculateAttackStrength = () => {
    return state.attackers.reduce((total, unit) => {
      return total + (unit.strength * UNIT_STATS[unit.type].attack);
    }, 0);
  };

  const calculateDefenseStrength = () => {
    return state.defenders.reduce((total, unit) => {
      return total + (unit.strength * UNIT_STATS[unit.type].defense);
    }, 0);
  };

  const getOddsRatio = (): string => {
    const attack = calculateAttackStrength();
    const defense = calculateDefenseStrength();
    const ratio = attack / defense;

    if (ratio >= 4) return '4:1';
    if (ratio >= 3) return '3:1';
    if (ratio >= 2) return '2:1';
    if (ratio >= 1) return '1:1';
    if (ratio >= 0.5) return '1:2';
    return '1:3';
  };

  const getModifiedOdds = (): string => {
    const baseOdds = getOddsRatio();
    const terrainShift = TERRAIN_MODIFIERS[state.terrain].shift;

    const oddsOrder = ['1:3', '1:2', '1:1', '2:1', '3:1', '4:1'];
    const currentIndex = oddsOrder.indexOf(baseOdds);
    const newIndex = Math.max(0, Math.min(oddsOrder.length - 1, currentIndex + terrainShift));

    return oddsOrder[newIndex];
  };

  const resolveCombat = () => {
    const modifiedOdds = getModifiedOdds();
    const dieRoll = Math.floor(Math.random() * 6) + 1;
    const result = CRT_TABLE[modifiedOdds][dieRoll];

    let newAttackers = [...state.attackers];
    let newDefenders = [...state.defenders];

    // Apply combat result
    switch (result) {
      case 'AE':
        newAttackers = [];
        break;
      case 'AR':
        // Remove one attacker
        if (newAttackers.length > 0) {
          newAttackers = newAttackers.slice(0, -1);
        }
        break;
      case 'EX':
        // Both lose one unit
        if (newAttackers.length > 0) newAttackers = newAttackers.slice(0, -1);
        if (newDefenders.length > 0) newDefenders = newDefenders.slice(0, -1);
        break;
      case 'DR':
        // Remove one defender
        if (newDefenders.length > 0) {
          newDefenders = newDefenders.slice(0, -1);
        }
        break;
      case 'DE':
        newDefenders = [];
        break;
    }

    const logEntry = `🎲 Roll: ${dieRoll} on ${modifiedOdds} → ${RESULT_NAMES[result]}`;

    setState({
      ...state,
      attackers: newAttackers,
      defenders: newDefenders,
      lastResult: result,
      combatLog: [...state.combatLog, logEntry].slice(-5),
      combatsResolved: state.combatsResolved + 1,
    });
  };

  const reset = () => {
    setState({
      attackers: INITIAL_ATTACKERS,
      defenders: INITIAL_DEFENDERS,
      terrain: 'open',
      lastResult: null,
      combatLog: ['⚔️ Configure your forces and attack!'],
      combatsResolved: 0,
    });
  };

  const addUnit = (side: 'attackers' | 'defenders', type: 'infantry' | 'armor' | 'artillery') => {
    const newUnit: Unit = {
      id: `${side[0]}${Date.now()}`,
      strength: 1,
      type,
    };

    setState({
      ...state,
      [side]: [...state[side], newUnit],
    });
  };

  const removeUnit = (side: 'attackers' | 'defenders', id: string) => {
    setState({
      ...state,
      [side]: state[side].filter(u => u.id !== id),
    });
  };

  const modifiedOdds = getModifiedOdds();
  const baseOdds = getOddsRatio();

  return (
    <Card className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Forces Setup */}
        <div className="space-y-6">
          {/* Attackers */}
          <div className="bg-background-secondary p-4 border-l-4 border-tactical-cyan">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-mono text-sm uppercase tracking-wider text-tactical-cyan">
                Attacking Force
              </h3>
              <div className="text-2xl font-bold text-tactical-cyan">
                {calculateAttackStrength()}
              </div>
            </div>

            <div className="space-y-2 mb-3">
              {state.attackers.map(unit => (
                <div key={unit.id} className="flex items-center justify-between bg-background p-2 border border-tactical-cyan/20">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{UNIT_STATS[unit.type].icon}</span>
                    <span className="text-sm">{UNIT_STATS[unit.type].name}</span>
                    <span className="text-xs text-muted">(ATK: {UNIT_STATS[unit.type].attack} × {unit.strength})</span>
                  </div>
                  <button
                    onClick={() => removeUnit('attackers', unit.id)}
                    className="text-xs text-tactical-amber hover:text-tactical-cyan"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <button onClick={() => addUnit('attackers', 'infantry')} className="text-xs px-2 py-1 border border-tactical-cyan/30 hover:bg-tactical-cyan/10">
                + INF
              </button>
              <button onClick={() => addUnit('attackers', 'armor')} className="text-xs px-2 py-1 border border-tactical-cyan/30 hover:bg-tactical-cyan/10">
                + ARM
              </button>
              <button onClick={() => addUnit('attackers', 'artillery')} className="text-xs px-2 py-1 border border-tactical-cyan/30 hover:bg-tactical-cyan/10">
                + ART
              </button>
            </div>
          </div>

          {/* Defenders */}
          <div className="bg-background-secondary p-4 border-l-4 border-tactical-amber">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-mono text-sm uppercase tracking-wider text-tactical-amber">
                Defending Force
              </h3>
              <div className="text-2xl font-bold text-tactical-amber">
                {calculateDefenseStrength()}
              </div>
            </div>

            <div className="space-y-2 mb-3">
              {state.defenders.map(unit => (
                <div key={unit.id} className="flex items-center justify-between bg-background p-2 border border-tactical-amber/20">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{UNIT_STATS[unit.type].icon}</span>
                    <span className="text-sm">{UNIT_STATS[unit.type].name}</span>
                    <span className="text-xs text-muted">(DEF: {UNIT_STATS[unit.type].defense} × {unit.strength})</span>
                  </div>
                  <button
                    onClick={() => removeUnit('defenders', unit.id)}
                    className="text-xs text-tactical-amber hover:text-tactical-cyan"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <button onClick={() => addUnit('defenders', 'infantry')} className="text-xs px-2 py-1 border border-tactical-amber/30 hover:bg-tactical-amber/10">
                + INF
              </button>
              <button onClick={() => addUnit('defenders', 'armor')} className="text-xs px-2 py-1 border border-tactical-amber/30 hover:bg-tactical-amber/10">
                + ARM
              </button>
              <button onClick={() => addUnit('defenders', 'artillery')} className="text-xs px-2 py-1 border border-tactical-amber/30 hover:bg-tactical-amber/10">
                + ART
              </button>
            </div>
          </div>

          {/* Terrain Selection */}
          <div className="bg-background-tertiary p-4">
            <div className="font-mono text-xs uppercase tracking-wider text-tactical-cyan mb-3">
              Defender Terrain
            </div>
            <div className="flex gap-2">
              {(['open', 'forest', 'city'] as TerrainType[]).map(terrain => (
                <button
                  key={terrain}
                  onClick={() => setState({ ...state, terrain })}
                  className={`text-xs px-3 py-2 border ${
                    state.terrain === terrain
                      ? 'border-tactical-cyan bg-tactical-cyan/20 text-tactical-cyan'
                      : 'border-tactical-cyan/30 hover:bg-tactical-cyan/10'
                  }`}
                >
                  {terrain.toUpperCase()}
                </button>
              ))}
            </div>
            <div className="text-xs text-muted mt-2">
              {TERRAIN_MODIFIERS[state.terrain].name}
            </div>
          </div>
        </div>

        {/* Right: Combat Resolution */}
        <div className="space-y-4">
          {/* Odds Display */}
          <div className="bg-background-secondary p-6 border border-tactical-cyan/20 text-center">
            <div className="text-xs text-muted mb-2">COMBAT ODDS</div>
            <div className="text-4xl font-bold text-tactical-cyan mb-2">
              {modifiedOdds}
            </div>
            {baseOdds !== modifiedOdds && (
              <div className="text-xs text-tactical-amber">
                (Base: {baseOdds}, Terrain: {TERRAIN_MODIFIERS[state.terrain].shift})
              </div>
            )}
            <div className="text-xs text-muted mt-2">
              {calculateAttackStrength()} ATK vs {calculateDefenseStrength()} DEF
            </div>
          </div>

          {/* CRT Table */}
          <div className="bg-background-tertiary p-4 border border-tactical-cyan/20">
            <div className="text-xs font-mono uppercase tracking-wider text-tactical-cyan mb-3">
              Combat Results Table
            </div>
            <div className="text-xs space-y-1 font-mono">
              {Object.entries(CRT_TABLE[modifiedOdds]).map(([die, result]) => (
                <div
                  key={die}
                  className={`flex justify-between p-2 ${
                    state.lastResult === result ? 'bg-tactical-cyan/20 border border-tactical-cyan' : 'bg-background'
                  }`}
                >
                  <span>Roll {die}:</span>
                  <span className="text-tactical-amber">{result} - {RESULT_NAMES[result]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Combat Button */}
          <Button
            variant="primary"
            onClick={resolveCombat}
            disabled={state.attackers.length === 0 || state.defenders.length === 0}
            className="w-full"
          >
            RESOLVE COMBAT
          </Button>

          <Button variant="outline" onClick={reset} className="w-full" size="sm">
            Reset
          </Button>

          {/* Combat Log */}
          <div className="bg-background-secondary p-3 border-l-2 border-tactical-cyan">
            <div className="text-xs font-mono uppercase tracking-wider text-tactical-cyan mb-2">
              Combat Log
            </div>
            <div className="space-y-1 text-xs text-muted font-mono">
              {state.combatLog.map((log, i) => (
                <div key={i}>{log}</div>
              ))}
            </div>
          </div>

          {/* Teaching Note */}
          <div className="bg-background-tertiary p-3 text-xs text-muted">
            <strong className="text-tactical-cyan">What This Teaches:</strong> The Combat Results Table (CRT) is how classic wargames resolve combat through odds and dice. Higher force ratios give better odds, but terrain shifts the column left (favoring defenders). This teaches force concentration, combined arms, and when attacking is favorable.
          </div>
        </div>
      </div>
    </Card>
  );
};
