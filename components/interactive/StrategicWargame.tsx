'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui';

type UnitType = 'infantry' | 'armor' | 'artillery';
type TerrainType = 'plains' | 'forest' | 'hills' | 'city';

interface Unit {
  type: UnitType;
  strength: number;
}

interface Territory {
  id: number;
  name: string;
  owner: 'player' | 'enemy' | 'neutral';
  units: Unit[];
  terrain: TerrainType;
  isObjective: boolean;
  victoryPoints: number;
  x: number;
  y: number;
  connections: number[];
}

const UNIT_ICONS: Record<UnitType, string> = {
  infantry: '🎖️',
  armor: '🛡️',
  artillery: '💥',
};

const UNIT_STATS: Record<UnitType, { attack: number; defense: number; name: string }> = {
  infantry: { attack: 2, defense: 3, name: 'Infantry' },
  armor: { attack: 4, defense: 2, name: 'Armor' },
  artillery: { attack: 3, defense: 1, name: 'Artillery' },
};

const TERRAIN_BONUSES: Record<TerrainType, { defense: number; description: string }> = {
  plains: { defense: 0, description: 'Open ground, no bonuses' },
  forest: { defense: 2, description: '+2 defense bonus' },
  hills: { defense: 1, description: '+1 defense, observe advantage' },
  city: { defense: 3, description: '+3 defense, strategic objective' },
};

const INITIAL_STATE: Territory[] = [
  { id: 1, name: 'Port Alpha', owner: 'player', units: [{ type: 'infantry', strength: 3 }], terrain: 'city', isObjective: true, victoryPoints: 3, x: 100, y: 150, connections: [2, 4] },
  { id: 2, name: 'Forest Pass', owner: 'neutral', units: [{ type: 'infantry', strength: 1 }], terrain: 'forest', isObjective: false, victoryPoints: 1, x: 250, y: 100, connections: [1, 3, 5] },
  { id: 3, name: 'Hill 304', owner: 'enemy', units: [{ type: 'infantry', strength: 2 }], terrain: 'hills', isObjective: false, victoryPoints: 1, x: 400, y: 150, connections: [2, 6] },
  { id: 4, name: 'Supply Depot', owner: 'player', units: [{ type: 'armor', strength: 2 }], terrain: 'plains', isObjective: false, victoryPoints: 1, x: 100, y: 300, connections: [1, 5, 7] },
  { id: 5, name: 'Central Plains', owner: 'neutral', units: [], terrain: 'plains', isObjective: false, victoryPoints: 1, x: 250, y: 250, connections: [2, 4, 6, 8] },
  { id: 6, name: 'Fort Bravo', owner: 'enemy', units: [{ type: 'artillery', strength: 2 }, { type: 'infantry', strength: 1 }], terrain: 'city', isObjective: true, victoryPoints: 3, x: 400, y: 300, connections: [3, 5, 9] },
  { id: 7, name: 'South Ridge', owner: 'neutral', units: [{ type: 'infantry', strength: 1 }], terrain: 'hills', isObjective: false, victoryPoints: 1, x: 100, y: 450, connections: [4, 8] },
  { id: 8, name: 'Valley Road', owner: 'neutral', units: [], terrain: 'plains', isObjective: false, victoryPoints: 1, x: 250, y: 400, connections: [5, 7, 9] },
  { id: 9, name: 'Enemy HQ', owner: 'enemy', units: [{ type: 'infantry', strength: 3 }], terrain: 'city', isObjective: true, victoryPoints: 5, x: 400, y: 450, connections: [6, 8] },
];

export const StrategicWargame: React.FC = () => {
  const [territories, setTerritories] = useState<Territory[]>(INITIAL_STATE);
  const [selectedTerritory, setSelectedTerritory] = useState<number | null>(null);
  const [turn, setTurn] = useState<'player' | 'enemy'>('player');
  const [turnNumber, setTurnNumber] = useState(1);
  const [actionsLeft, setActionsLeft] = useState(3);
  const [supplyPoints, setSupplyPoints] = useState(5);
  const [gameLog, setGameLog] = useState<string[]>(['⚔️ Strategic Wargame: Secure objectives to win!']);
  const [strategyTip, setStrategyTip] = useState<string>('💡 Tip: Click one of your territories to select it, then maneuver, reinforce, or attack. Objectives generate supply each turn.');
  const [gameOver, setGameOver] = useState(false);
  const [hoveredTerritory, setHoveredTerritory] = useState<number | null>(null);

  const addLog = (message: string) => {
    setGameLog(prev => [...prev.slice(-5), message]);
  };

  const calculateScore = () => {
    let playerScore = 0;
    let enemyScore = 0;

    territories.forEach(t => {
      if (t.owner === 'player') playerScore += t.victoryPoints;
      if (t.owner === 'enemy') enemyScore += t.victoryPoints;
    });

    return { playerScore, enemyScore };
  };

  const calculateCombatStrength = (units: Unit[], isDefender: boolean, terrain: TerrainType) => {
    let strength = 0;
    units.forEach(unit => {
      const stats = UNIT_STATS[unit.type];
      strength += (isDefender ? stats.defense : stats.attack) * unit.strength;
    });

    if (isDefender) {
      strength += TERRAIN_BONUSES[terrain].defense * units.length;
    }

    return strength;
  };

  const explainCombat = (attacker: Territory, defender: Territory, attackerStrength: number, defenderStrength: number) => {
    const terrainBonus = TERRAIN_BONUSES[defender.terrain].defense;

    setStrategyTip(
      `⚔️ Combat Analysis: Attacker strength ${attackerStrength} vs Defender strength ${defenderStrength}. ` +
      `Defender has ${terrainBonus > 0 ? `+${terrainBonus} terrain bonus (${defender.terrain})` : 'no terrain advantage'}. ` +
      `${attackerStrength > defenderStrength ? 'Attack favored!' : 'Defense favored!'}`
    );
  };

  const handleTerritoryClick = (id: number) => {
    const territory = territories.find(t => t.id === id);
    if (!territory || turn !== 'player' || gameOver || actionsLeft <= 0) return;

    if (!selectedTerritory) {
      if (territory.owner === 'player' && territory.units.length > 0) {
        setSelectedTerritory(id);
        addLog(`📍 Selected ${territory.name}`);

        const connectedEnemies = territory.connections
          .map(cid => territories.find(t => t.id === cid))
          .filter(t => t && t.owner !== 'player');

        if (connectedEnemies.length > 0) {
          setStrategyTip(`💡 ${territory.name} can attack ${connectedEnemies.map(t => t!.name).join(', ')}`);
        } else {
          setStrategyTip(`💡 ${territory.name} selected. Use command actions below to reinforce, or click an adjacent territory to maneuver.`);
        }
      } else if (territory.owner === 'player') {
        addLog('⚠️ Territory has no units to attack with');
      } else {
        addLog('⚠️ Select your territory first');
      }
    } else {
      const source = territories.find(t => t.id === selectedTerritory);
      if (!source) return;

      if (id === selectedTerritory) {
        setSelectedTerritory(null);
        addLog('❌ Attack cancelled');
        return;
      }

      if (!source.connections.includes(id)) {
        addLog('⚠️ Territories not connected');
        return;
      }

      if (territory.owner === 'player') {
        moveTerritory(selectedTerritory, id, territory.owner === 'player');
        setSelectedTerritory(null);
        return;
      }

      if (territory.owner === 'neutral' && territory.units.length === 0) {
        moveTerritory(selectedTerritory, id, false);
      } else {
        attackTerritory(selectedTerritory, id);
      }
      setSelectedTerritory(null);
    }
  };

  const spendAction = () => {
    setActionsLeft(prev => {
      const next = prev - 1;
      if (next <= 0) {
        setTimeout(() => endTurn(), 600);
      }
      return next;
    });
  };

  const moveTerritory = (fromId: number, toId: number, friendlyMove: boolean) => {
    const source = territories.find(t => t.id === fromId)!;
    const destination = territories.find(t => t.id === toId)!;

    if (source.units.length === 0) {
      addLog('⚠️ No units available to maneuver');
      return;
    }

    const mobileStrength = source.units.reduce((sum, unit) => sum + unit.strength, 0);
    if (mobileStrength <= 0) {
      addLog('⚠️ No strength available to move');
      return;
    }

    let moved = false;
    const movementForce = source.units.map(unit => {
      if (!moved && unit.strength > 0) {
        moved = true;
        return { ...unit, strength: unit.strength - 1 };
      }
      return unit;
    }).filter(unit => unit.strength > 0);

    const movedUnit = source.units.find(unit => unit.strength > 0);
    if (!movedUnit) {
      addLog('⚠️ No unit available to maneuver');
      return;
    }

    const forwardForce = [{ type: movedUnit.type, strength: 1 } satisfies Unit];

    setTerritories(prev => prev.map(territory => {
      if (territory.id === fromId) {
        return { ...territory, units: movementForce };
      }
      if (territory.id === toId) {
        if (friendlyMove) {
          return {
            ...territory,
            units: [...territory.units, ...forwardForce],
          };
        }

        return {
          ...territory,
          owner: 'player',
          units: forwardForce,
        };
      }
      return territory;
    }));

    addLog(friendlyMove ? `↔️ Reinforced ${destination.name}` : `🚚 Advanced into ${destination.name}`);
    setStrategyTip(friendlyMove ? '💡 Reinforce fronts before attacking objectives.' : '💡 Maneuver creates attack lanes and secures empty ground.');
    spendAction();
  };

  const reinforceSelected = (unitType: UnitType) => {
    if (turn !== 'player' || gameOver || !selectedTerritory) {
      return;
    }

    const cost = unitType === 'armor' ? 2 : 1;
    if (supplyPoints < cost) {
      addLog('⚠️ Not enough supply for reinforcement');
      return;
    }

    setSupplyPoints(prev => prev - cost);
    setTerritories(prev => prev.map(territory =>
      territory.id === selectedTerritory
        ? {
            ...territory,
            units: [...territory.units, { type: unitType, strength: 1 }],
          }
        : territory
    ));
    addLog(`🧰 Reinforced ${territories.find(t => t.id === selectedTerritory)?.name} with ${UNIT_STATS[unitType].name}`);
    setStrategyTip('💡 Supply converts into force density. Build before decisive attacks.');
    spendAction();
  };

  const attackTerritory = (fromId: number, toId: number) => {
    const attacker = territories.find(t => t.id === fromId)!;
    const defender = territories.find(t => t.id === toId)!;

    const attackerStrength = calculateCombatStrength(attacker.units, false, attacker.terrain);
    const defenderStrength = calculateCombatStrength(defender.units, true, defender.terrain);

    explainCombat(attacker, defender, attackerStrength, defenderStrength);

    const attackerWins = attackerStrength > defenderStrength;
    const casualtyRatio = Math.min(attackerStrength, defenderStrength) / Math.max(attackerStrength, defenderStrength);

    setTerritories(prev =>
      prev.map(t => {
        if (t.id === fromId) {
          // Attacker takes casualties
          const newUnits = t.units.map(u => ({
            ...u,
            strength: Math.max(1, Math.floor(u.strength * (1 - casualtyRatio * 0.3)))
          })).filter(u => u.strength > 0);
          return { ...t, units: newUnits };
        }
        if (t.id === toId) {
          if (attackerWins) {
            // Defender loses, attacker captures with remaining units
            const conquestForce = attacker.units.map(u => ({
              ...u,
              strength: Math.max(1, Math.floor(u.strength * 0.7))
            }));
            return { ...t, owner: 'player', units: conquestForce };
          } else {
            // Defender holds, takes casualties
            const newUnits = t.units.map(u => ({
              ...u,
              strength: Math.max(1, Math.floor(u.strength * (1 - casualtyRatio * 0.5)))
            })).filter(u => u.strength > 0);
            return { ...t, units: newUnits };
          }
        }
        return t;
      })
    );

    if (attackerWins) {
      addLog(`✅ ${attacker.name} conquered ${defender.name}!`);
      if (defender.isObjective) {
        addLog(`🎯 Strategic objective captured! +${defender.victoryPoints} VP`);
      }
    } else {
      addLog(`🛡️ ${defender.name} successfully defended!`);
    }

    spendAction();
    setTimeout(() => checkWinCondition(), 500);
  };

  const endTurn = () => {
    if (turn !== 'player' || gameOver) return;
    setTurn('enemy');
    setTurnNumber(prev => prev + 1);
    addLog(`📅 Turn ${turnNumber + 1}: Enemy phase`);
    setTimeout(() => executeEnemyTurn(), 1500);
  };

  const executeEnemyTurn = () => {
    // Smarter AI: prioritize objectives, consider strength
    setTerritories(prev => {
      const newTerritories = [...prev];
      const enemyTerritories = newTerritories.filter(t => t.owner === 'enemy' && t.units.length > 0);

      if (enemyTerritories.length === 0) {
        setTurn('player');
        return prev;
      }

      // Find best attack opportunity
      let bestAttack: { from: Territory; to: Territory; strength: number } | null = null;

      for (const attacker of enemyTerritories) {
        for (const connId of attacker.connections) {
          const target = newTerritories.find(t => t.id === connId);
          if (!target || target.owner === 'enemy') {
            continue;
          }

          const attackStrength = calculateCombatStrength(attacker.units, false, attacker.terrain);
          const defenseStrength = calculateCombatStrength(target.units, true, target.terrain);
          const score = attackStrength - defenseStrength + (target.isObjective ? 5 : 0);

          if (!bestAttack || score > bestAttack.strength) {
            bestAttack = { from: attacker, to: target, strength: score };
          }
        }
      }

      if (!bestAttack || bestAttack.strength <= -3) {
        setTurn('player');
        addLog(`📅 Turn ${turnNumber + 1}: Your phase`);
        addLog('Enemy consolidates position');
        return newTerritories;
      }

      const { from, to } = bestAttack as { from: Territory; to: Territory; strength: number };

      const attackerStrength = calculateCombatStrength(from.units, false, from.terrain);
      const defenderStrength = calculateCombatStrength(to.units, true, to.terrain);
      const attackerWins = attackerStrength > defenderStrength;
      const casualtyRatio = Math.min(attackerStrength, defenderStrength) / Math.max(attackerStrength, defenderStrength);

      addLog(`⚔️ Enemy: ${from.name} attacks ${to.name}!`);

      const updatedTerritories = newTerritories.map(t => {
        if (t.id === from.id) {
          const newUnits = t.units.map(u => ({
            ...u,
            strength: Math.max(1, Math.floor(u.strength * (1 - casualtyRatio * 0.3)))
          })).filter(u => u.strength > 0);
          return { ...t, units: newUnits };
        }
        if (t.id === to.id) {
          if (attackerWins) {
            const conquestForce = from.units.map((u: Unit) => ({
              ...u,
              strength: Math.max(1, Math.floor(u.strength * 0.7))
            }));
            if (to.isObjective) {
              addLog(`🎯 Enemy captured objective ${to.name}!`);
            }
            return { ...t, owner: 'enemy' as const, units: conquestForce };
          } else {
            const newUnits = t.units.map(u => ({
              ...u,
              strength: Math.max(1, Math.floor(u.strength * (1 - casualtyRatio * 0.5)))
            })).filter(u => u.strength > 0);
            addLog(`🛡️ ${to.name} held against enemy attack!`);
            return { ...t, units: newUnits };
          }
        }
        return t;
      });

      setTimeout(() => checkWinCondition(), 500);
      setTurn('player');
      const playerObjectives = updatedTerritories.filter(t => t.owner === 'player' && t.isObjective).length;
      setSupplyPoints(prev => prev + 2 + playerObjectives);
      setActionsLeft(3);
      addLog(`📅 Turn ${turnNumber + 1}: Your phase`);
      setStrategyTip('💡 Your command phase refreshed. Select a territory and spend actions on reinforcement, maneuver, or attack.');

      return updatedTerritories;
    });
  };

  const checkWinCondition = () => {
    const { playerScore, enemyScore } = calculateScore();

    const playerTerritories = territories.filter(t => t.owner === 'player').length;
    const enemyTerritories = territories.filter(t => t.owner === 'enemy').length;

    if (playerScore >= 9) {
      setGameOver(true);
      addLog('🎉 VICTORY! Strategic objectives secured!');
      setStrategyTip('🏆 You won by controlling key objectives - a demonstration of strategic thinking!');
    } else if (enemyScore >= 9) {
      setGameOver(true);
      addLog('💀 DEFEAT! Enemy secured strategic objectives');
      setStrategyTip('Try again - focus on capturing and holding objectives, not just territory');
    } else if (enemyTerritories === 0) {
      setGameOver(true);
      addLog('🎉 TOTAL VICTORY! Enemy forces eliminated!');
    } else if (playerTerritories === 0) {
      setGameOver(true);
      addLog('💀 DEFEAT! All your territories lost');
    }
  };

  const resetGame = () => {
    setTerritories(INITIAL_STATE);
    setSelectedTerritory(null);
    setTurn('player');
    setTurnNumber(1);
    setActionsLeft(3);
    setSupplyPoints(5);
    setGameLog(['⚔️ Strategic Wargame: Secure objectives to win!']);
    setStrategyTip('💡 Tip: Click one of your territories to select it, then maneuver, reinforce, or attack. Objectives generate supply each turn.');
    setGameOver(false);
  };

  const ownerColors = {
    player: '#4a9fb8',
    enemy: '#d4a564',
    neutral: '#4a4a4a',
  };

  const { playerScore, enemyScore } = calculateScore();

  return (
    <div className="bg-background-secondary border border-tactical-cyan/30 p-6">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-mono text-tactical-cyan uppercase tracking-wider mb-1">
              Strategic Territory Control
            </h3>
            <p className="text-xs text-muted">
              Objective-based wargame demonstrating terrain, combined arms, and strategic thinking
            </p>
          </div>
            <div className="text-right">
              <div className="text-xs text-muted">Turn {turnNumber}</div>
              <div className={`font-mono text-sm ${turn === 'player' ? 'text-tactical-cyan' : 'text-tactical-amber'}`}>
                {turn === 'player' ? 'YOUR TURN' : 'ENEMY TURN'}
              </div>
              <div className="text-xs text-muted mt-1">Actions {actionsLeft}</div>
            </div>
          </div>

        {/* Score Display */}
        <div className="flex items-center gap-4 text-sm mb-2">
          <div className="flex items-center gap-2">
            <span className="text-tactical-cyan">●</span>
            <span className="text-muted">Player VP:</span>
            <span className="font-mono text-tactical-cyan font-bold">{playerScore}/10</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-tactical-amber">●</span>
            <span className="text-muted">Enemy VP:</span>
            <span className="font-mono text-tactical-amber font-bold">{enemyScore}/10</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-tactical-cyan">◆</span>
            <span className="text-muted">Supply:</span>
            <span className="font-mono text-tactical-cyan font-bold">{supplyPoints}</span>
          </div>
        </div>

        {/* Strategy Tip */}
        <div className="bg-background border border-tactical-cyan/20 p-2 text-xs text-muted min-h-14 flex items-center">
          {strategyTip}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.18fr)_minmax(360px,0.95fr)] gap-6 items-start">
        <div className="space-y-4">
          <div className="relative w-full">
            <svg
              viewBox="0 0 500 600"
              className="border border-tactical-blue/20 bg-background w-full h-auto max-w-[580px] mx-auto xl:mx-0"
              preserveAspectRatio="xMidYMid meet"
            >
            {/* Background */}
            <defs>
              <pattern id="strategicGrid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(74, 159, 184, 0.1)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#strategicGrid)" />

            {/* Connections */}
            {territories.map(territory =>
              territory.connections.map(connId => {
                const connected = territories.find(t => t.id === connId);
                if (!connected || connId < territory.id) return null;

                return (
                  <line
                    key={`${territory.id}-${connId}`}
                    x1={territory.x}
                    y1={territory.y}
                    x2={connected.x}
                    y2={connected.y}
                    stroke="rgba(74, 159, 184, 0.2)"
                    strokeWidth="2"
                    strokeDasharray="4,4"
                  />
                );
              })
            )}

            {/* Territories */}
            {territories.map(territory => {
              const totalStrength = territory.units.reduce((sum, u) => sum + u.strength, 0);

              return (
                <g key={territory.id}>
                  <motion.circle
                    cx={territory.x}
                    cy={territory.y}
                    r={territory.isObjective ? 35 : 30}
                    fill={ownerColors[territory.owner]}
                    stroke={
                      selectedTerritory === territory.id
                        ? '#00d9ff'
                        : territory.isObjective
                        ? '#d4a564'
                        : 'rgba(74, 159, 184, 0.5)'
                    }
                    strokeWidth={selectedTerritory === territory.id ? '3' : territory.isObjective ? '2' : '1.5'}
                    onClick={() => handleTerritoryClick(territory.id)}
                    onMouseEnter={() => setHoveredTerritory(territory.id)}
                    onMouseLeave={() => setHoveredTerritory(null)}
                    className="cursor-pointer transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  />

                  {/* Objective marker */}
                  {territory.isObjective && (
                    <circle
                      cx={territory.x}
                      cy={territory.y}
                      r={38}
                      fill="none"
                      stroke="#d4a564"
                      strokeWidth="1"
                      strokeDasharray="3,3"
                      className="pointer-events-none"
                    />
                  )}

                  <text
                    x={territory.x}
                    y={territory.y - 12}
                    fontSize="10"
                    fill="#e8e8e8"
                    textAnchor="middle"
                    className="pointer-events-none font-mono font-bold"
                  >
                    {territory.name}
                  </text>

                  {totalStrength > 0 && (
                    <text
                      x={territory.x}
                      y={territory.y + 5}
                      fontSize="16"
                      fill="#e8e8e8"
                      textAnchor="middle"
                      className="pointer-events-none font-mono font-bold"
                    >
                      {totalStrength}
                    </text>
                  )}

                  {/* Unit type indicators */}
                  {territory.units.length > 0 && (
                    <text
                      x={territory.x}
                      y={territory.y + 18}
                      fontSize="10"
                      fill="#a0a0a0"
                      textAnchor="middle"
                      className="pointer-events-none"
                    >
                      {territory.units.map(u => UNIT_ICONS[u.type]).join('')}
                    </text>
                  )}
                </g>
              );
            })}
            </svg>
          </div>

          {gameOver ? (
            <div className="border-2 border-tactical-cyan p-4 bg-background-tertiary max-w-[580px] mx-auto xl:mx-0">
              <h4 className="font-mono text-tactical-cyan uppercase tracking-wider mb-3">Game Over</h4>
              <div className="text-sm mb-3">
                <div>Final Score:</div>
                <div className="font-mono">Player: {playerScore} VP</div>
                <div className="font-mono">Enemy: {enemyScore} VP</div>
              </div>
              <Button onClick={resetGame} variant="primary" size="sm" className="w-full">
                Play Again
              </Button>
            </div>
          ) : (
            <div className="border border-tactical-cyan/30 p-4 bg-background max-w-[580px] mx-auto xl:mx-0">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-wider text-tactical-cyan mb-2">Command Actions</h4>
                  <p className="text-[11px] text-muted max-w-xl">
                    Select a friendly territory, then reinforce it or click adjacent nodes to maneuver and attack. This demo is teaching action economy and objective sequencing.
                  </p>
                </div>
                <Button onClick={resetGame} variant="outline" size="sm" className="shrink-0">
                  Reset Game
                </Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <Button onClick={() => reinforceSelected('infantry')} variant="outline" size="sm" disabled={!selectedTerritory || supplyPoints < 1}>
                  INF +1
                </Button>
                <Button onClick={() => reinforceSelected('armor')} variant="outline" size="sm" disabled={!selectedTerritory || supplyPoints < 2}>
                  ARM +1
                </Button>
                <Button onClick={() => reinforceSelected('artillery')} variant="outline" size="sm" disabled={!selectedTerritory || supplyPoints < 1}>
                  ART +1
                </Button>
                <Button onClick={endTurn} variant="primary" size="sm" disabled={turn !== 'player'}>
                  End Turn
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-tactical-cyan/30 p-3 bg-background min-h-[190px]">
            <h4 className="font-mono text-xs uppercase tracking-wider text-tactical-cyan mb-2">Combat Log</h4>
            <div className="space-y-1 text-xs text-muted font-mono">
              {gameLog.map((log, i) => (
                <div key={i}>{log}</div>
              ))}
            </div>
          </div>

          <div className="border border-tactical-cyan/30 p-3 bg-background min-h-[190px]">
            <h4 className="font-mono text-xs uppercase tracking-wider text-tactical-cyan mb-2">
              Territory Info
            </h4>
            {hoveredTerritory ? (
              <div className="text-xs space-y-1">
                {(() => {
                  const t = territories.find(ter => ter.id === hoveredTerritory)!;
                  return (
                    <>
                      <div className="font-bold text-foreground mb-2">{t.name}</div>
                      <div className="text-muted">
                        Owner: <span className={`font-mono ${
                          t.owner === 'player' ? 'text-tactical-cyan' :
                          t.owner === 'enemy' ? 'text-tactical-amber' :
                          'text-muted'
                        }`}>{t.owner.toUpperCase()}</span>
                      </div>
                      <div className="text-muted">Terrain: <span className="text-foreground capitalize">{t.terrain}</span></div>
                      <div className="text-muted text-[10px]">{TERRAIN_BONUSES[t.terrain].description}</div>
                      {t.isObjective && (
                        <div className="text-tactical-amber mt-1">🎯 Strategic Objective ({t.victoryPoints} VP)</div>
                      )}
                      {t.units.length > 0 ? (
                        <div className="mt-2 pt-2 border-t border-tactical-cyan/20">
                          <div className="text-muted mb-1">Forces:</div>
                          {t.units.map((u, i) => (
                            <div key={i} className="flex items-center justify-between">
                              <span>{UNIT_ICONS[u.type]} {UNIT_STATS[u.type].name}</span>
                              <span className="font-mono">{u.strength}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="mt-2 pt-2 border-t border-tactical-cyan/20 text-muted italic text-[10px]">
                          No military forces
                        </div>
                      )}
                    </>
                  );
                })()}
              </div>
            ) : (
              <div className="text-xs text-muted italic">
                Hover over territories to view details
              </div>
            )}
          </div>

          <div className="border border-tactical-cyan/30 p-3 bg-background min-h-[170px]">
            <h4 className="font-mono text-xs uppercase tracking-wider text-tactical-cyan mb-2">Unit Types</h4>
            <div className="space-y-2 text-xs">
              {Object.entries(UNIT_STATS).map(([type, stats]) => (
                <div key={type} className="flex items-center justify-between">
                  <span>
                    {UNIT_ICONS[type as UnitType]} {stats.name}
                  </span>
                  <span className="text-muted font-mono text-[10px]">
                    ATK:{stats.attack} DEF:{stats.defense}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-tactical-cyan/30 p-3 bg-background min-h-[170px]">
            <h4 className="font-mono text-xs uppercase tracking-wider text-tactical-cyan mb-2">
              Concepts Demonstrated
            </h4>
            <ul className="text-xs text-muted space-y-1">
              <li>• Objective-based victory</li>
              <li>• Action economy and tempo</li>
              <li>• Terrain effects on combat</li>
              <li>• Combined arms warfare</li>
              <li>• Force concentration</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
