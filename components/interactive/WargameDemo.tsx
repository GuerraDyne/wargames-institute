'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui';

type TerrainType = 'plains' | 'forest' | 'hills' | 'river' | 'city';

interface Territory {
  id: number;
  name: string;
  owner: 'player' | 'enemy' | 'neutral';
  units: number;
  terrain?: TerrainType;
  isObjective?: boolean;
  victoryPoints?: number;
  x: number;
  y: number;
  connections: number[];
}

const INITIAL_TERRITORIES: Territory[] = [
  { id: 1, name: 'Alpha', owner: 'player', units: 3, x: 100, y: 150, connections: [2, 4] },
  { id: 2, name: 'Bravo', owner: 'neutral', units: 2, x: 250, y: 100, connections: [1, 3, 5] },
  { id: 3, name: 'Charlie', owner: 'enemy', units: 3, x: 400, y: 150, connections: [2, 6] },
  { id: 4, name: 'Delta', owner: 'neutral', units: 2, x: 100, y: 300, connections: [1, 5, 7] },
  { id: 5, name: 'Echo', owner: 'neutral', units: 1, x: 250, y: 250, connections: [2, 4, 6, 8] },
  { id: 6, name: 'Foxtrot', owner: 'enemy', units: 2, x: 400, y: 300, connections: [3, 5, 9] },
  { id: 7, name: 'Golf', owner: 'player', units: 2, x: 100, y: 450, connections: [4, 8] },
  { id: 8, name: 'Hotel', owner: 'neutral', units: 1, x: 250, y: 400, connections: [5, 7, 9] },
  { id: 9, name: 'India', owner: 'enemy', units: 3, x: 400, y: 450, connections: [6, 8] },
];

export const WargameDemo: React.FC = () => {
  const [territories, setTerritories] = useState<Territory[]>(INITIAL_TERRITORIES);
  const [selectedTerritory, setSelectedTerritory] = useState<number | null>(null);
  const [turn, setTurn] = useState<'player' | 'enemy'>('player');
  const [gameLog, setGameLog] = useState<string[]>(['Game started. Player turn.']);
  const [gameOver, setGameOver] = useState(false);

  const addLog = (message: string) => {
    setGameLog(prev => [...prev.slice(-4), message]);
  };

  const handleTerritoryClick = (id: number) => {
    const territory = territories.find(t => t.id === id);
    if (!territory) return;

    if (turn !== 'player') {
      addLog('Wait for enemy turn to complete.');
      return;
    }

    if (!selectedTerritory) {
      if (territory.owner === 'player' && territory.units > 1) {
        setSelectedTerritory(id);
        addLog(`Selected ${territory.name} (${territory.units} units)`);
      } else {
        addLog('Select your territory with 2+ units.');
      }
    } else {
      const source = territories.find(t => t.id === selectedTerritory);
      if (!source) return;

      if (id === selectedTerritory) {
        setSelectedTerritory(null);
        addLog('Selection cancelled.');
        return;
      }

      if (!source.connections.includes(id)) {
        addLog('Territories not connected.');
        return;
      }

      if (territory.owner === 'player') {
        addLog('Cannot attack your own territory.');
        return;
      }

      // Attack!
      attackTerritory(selectedTerritory, id);
      setSelectedTerritory(null);
    }
  };

  const attackTerritory = (fromId: number, toId: number) => {
    const from = territories.find(t => t.id === fromId)!;
    const to = territories.find(t => t.id === toId)!;

    const attackerUnits = from.units - 1;
    const defenderUnits = to.units;

    // Simple combat: attacker wins if they have more units
    const attackerWins = attackerUnits > defenderUnits;

    setTerritories(prev =>
      prev.map(t => {
        if (t.id === fromId) {
          return { ...t, units: 1 };
        }
        if (t.id === toId) {
          if (attackerWins) {
            return { ...t, owner: 'player', units: attackerUnits - defenderUnits };
          } else {
            return { ...t, units: defenderUnits - attackerUnits };
          }
        }
        return t;
      })
    );

    if (attackerWins) {
      addLog(`⚔️ ${from.name} conquered ${to.name}!`);
    } else {
      addLog(`⚔️ ${to.name} defended against ${from.name}.`);
    }

    // Check win condition
    setTimeout(() => checkWinCondition(), 500);

    // End player turn
    setTimeout(() => {
      setTurn('enemy');
      addLog('Enemy turn...');
      executeEnemyTurn();
    }, 1000);
  };

  const executeEnemyTurn = () => {
    setTimeout(() => {
      setTerritories(prev => {
        const newTerritories = [...prev];
        const enemyTerritories = newTerritories.filter(t => t.owner === 'enemy' && t.units > 1);

        if (enemyTerritories.length > 0) {
          const attacker = enemyTerritories[Math.floor(Math.random() * enemyTerritories.length)];
          const possibleTargets = attacker.connections
            .map(id => newTerritories.find(t => t.id === id))
            .filter(t => t && t.owner !== 'enemy');

          if (possibleTargets.length > 0) {
            const target = possibleTargets[Math.floor(Math.random() * possibleTargets.length)]!;

            const attackerUnits = attacker.units - 1;
            const defenderUnits = target.units;
            const attackerWins = attackerUnits > defenderUnits;

            if (attackerWins) {
              addLog(`⚔️ Enemy: ${attacker.name} conquered ${target.name}!`);
              return newTerritories.map(t => {
                if (t.id === attacker.id) return { ...t, units: 1 };
                if (t.id === target.id) return { ...t, owner: 'enemy', units: attackerUnits - defenderUnits };
                return t;
              });
            } else {
              addLog(`⚔️ Enemy: ${target.name} defended.`);
            }
          }
        }

        return newTerritories;
      });

      setTimeout(() => checkWinCondition(), 500);

      setTurn('player');
      addLog('Your turn.');
    }, 1500);
  };

  const checkWinCondition = () => {
    const playerTerritories = territories.filter(t => t.owner === 'player').length;
    const enemyTerritories = territories.filter(t => t.owner === 'enemy').length;

    if (enemyTerritories === 0) {
      setGameOver(true);
      addLog('🎉 VICTORY! You conquered all territories!');
    } else if (playerTerritories === 0) {
      setGameOver(true);
      addLog('💀 DEFEAT! Enemy conquered all your territories.');
    }
  };

  const resetGame = () => {
    setTerritories(INITIAL_TERRITORIES);
    setSelectedTerritory(null);
    setTurn('player');
    setGameLog(['Game restarted. Player turn.']);
    setGameOver(false);
  };

  const ownerColors = {
    player: '#4a9fb8',
    enemy: '#d4a564',
    neutral: '#3a3a3a',
  };

  return (
    <div className="bg-background-secondary border border-tactical-cyan/30 p-6">
      <div className="mb-4">
        <h3 className="font-mono text-tactical-cyan uppercase tracking-wider mb-2">
          Territory Control Wargame
        </h3>
        <p className="text-xs text-muted mb-2">
          Select your territory (2+ units), then click adjacent enemy/neutral territory to attack
        </p>
        <div className="flex items-center gap-4 text-xs">
          <div>
            <span className="text-muted">Turn: </span>
            <span className={turn === 'player' ? 'text-tactical-cyan' : 'text-tactical-amber'}>
              {turn.toUpperCase()}
            </span>
          </div>
          <div>
            <span className="text-muted">Player: </span>
            <span className="text-tactical-cyan">{territories.filter(t => t.owner === 'player').length}</span>
          </div>
          <div>
            <span className="text-muted">Enemy: </span>
            <span className="text-tactical-amber">{territories.filter(t => t.owner === 'enemy').length}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        {/* Game Board */}
        <div className="relative">
          <svg
            width="500"
            height="600"
            viewBox="0 0 500 600"
            className="border border-tactical-blue/20 bg-background"
          >
            {/* Background grid */}
            <defs>
              <pattern id="wargameGrid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(74, 159, 184, 0.1)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#wargameGrid)" />

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
            {territories.map(territory => (
              <g key={territory.id}>
                <motion.circle
                  cx={territory.x}
                  cy={territory.y}
                  r={30}
                  fill={ownerColors[territory.owner]}
                  stroke={selectedTerritory === territory.id ? '#00d9ff' : 'rgba(74, 159, 184, 0.5)'}
                  strokeWidth={selectedTerritory === territory.id ? '3' : '2'}
                  onClick={() => handleTerritoryClick(territory.id)}
                  className="cursor-pointer transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                />

                <text
                  x={territory.x}
                  y={territory.y - 5}
                  fontSize="11"
                  fill="#e8e8e8"
                  textAnchor="middle"
                  className="pointer-events-none font-mono font-bold"
                >
                  {territory.name}
                </text>

                <text
                  x={territory.x}
                  y={territory.y + 10}
                  fontSize="14"
                  fill="#e8e8e8"
                  textAnchor="middle"
                  className="pointer-events-none font-mono"
                >
                  {territory.units}
                </text>
              </g>
            ))}
          </svg>
        </div>

        {/* Game Log & Controls */}
        <div className="flex-shrink-0 w-64 space-y-4">
          <div className="border border-tactical-cyan/30 p-3 bg-background">
            <h4 className="font-mono text-xs uppercase tracking-wider text-tactical-cyan mb-2">Combat Log</h4>
            <div className="space-y-1 text-xs text-muted font-mono max-h-32 overflow-y-auto">
              {gameLog.map((log, i) => (
                <div key={i}>{log}</div>
              ))}
            </div>
          </div>

          {gameOver && (
            <div className="border-2 border-tactical-cyan p-4 bg-background-tertiary">
              <h4 className="font-mono text-tactical-cyan uppercase tracking-wider mb-2">Game Over</h4>
              <Button onClick={resetGame} variant="primary" size="sm" className="w-full">
                Play Again
              </Button>
            </div>
          )}

          {!gameOver && (
            <Button onClick={resetGame} variant="outline" size="sm" className="w-full">
              Reset Game
            </Button>
          )}

          <div className="border border-tactical-cyan/30 p-3 bg-background">
            <h4 className="font-mono text-xs uppercase tracking-wider text-tactical-cyan mb-2">Legend</h4>
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: ownerColors.player }} />
                <span className="text-muted">Player</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: ownerColors.enemy }} />
                <span className="text-muted">Enemy</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: ownerColors.neutral }} />
                <span className="text-muted">Neutral</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
