'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button, Card } from '../ui';

type Player = 'blue' | 'red' | null;

interface Hex {
  q: number; // axial coordinates
  r: number;
  unit: Player;
}

interface GameState {
  hexes: Hex[];
  selectedUnit: { q: number; r: number } | null;
  currentPlayer: Player;
  turnCount: number;
  movesMade: number;
  gameLog: string[];
}

const HEX_SIZE = 35;
const MAP_WIDTH = 7;
const MAP_HEIGHT = 7;

// Objective hexes that must be captured to win
const OBJECTIVE_HEXES = [
  { q: 3, r: 3 }, // Center objective
];

// Initial unit positions
const INITIAL_UNITS: Hex[] = [
  // Blue (player) units - bottom
  { q: 1, r: 5, unit: 'blue' },
  { q: 2, r: 5, unit: 'blue' },
  { q: 3, r: 5, unit: 'blue' },
  { q: 4, r: 5, unit: 'blue' },
  // Red (enemy) units - top
  { q: 2, r: 1, unit: 'red' },
  { q: 3, r: 1, unit: 'red' },
  { q: 4, r: 1, unit: 'red' },
  { q: 5, r: 1, unit: 'red' },
];

export const ZoneOfControlDemo: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    hexes: INITIAL_UNITS,
    selectedUnit: null,
    currentPlayer: 'blue',
    turnCount: 1,
    movesMade: 0,
    gameLog: ['🎯 Capture the center objective!', '🔵 Blue moves first. Click a unit to select it.'],
  });

  const [hoveredHex, setHoveredHex] = useState<{ q: number; r: number } | null>(null);

  // Axial to pixel conversion
  const hexToPixel = (q: number, r: number) => {
    const x = HEX_SIZE * (Math.sqrt(3) * q + Math.sqrt(3) / 2 * r) + 250;
    const y = HEX_SIZE * (3 / 2 * r) + 100;
    return { x, y };
  };

  // Get all adjacent hexes (6 neighbors)
  const getNeighbors = (q: number, r: number) => {
    return [
      { q: q + 1, r: r },
      { q: q - 1, r: r },
      { q: q, r: r + 1 },
      { q: q, r: r - 1 },
      { q: q + 1, r: r - 1 },
      { q: q - 1, r: r + 1 },
    ].filter(hex => hex.q >= 0 && hex.q < MAP_WIDTH && hex.r >= 0 && hex.r < MAP_HEIGHT);
  };

  // Check if a hex is in enemy ZOC
  const isInEnemyZOC = (q: number, r: number, player: Player): boolean => {
    if (!player) return false;
    const enemyPlayer: Player = player === 'blue' ? 'red' : 'blue';
    const neighbors = getNeighbors(q, r);

    return neighbors.some(neighbor => {
      const unit = gameState.hexes.find(h => h.q === neighbor.q && h.r === neighbor.r);
      return unit?.unit === enemyPlayer;
    });
  };

  // Get unit at hex
  const getUnitAt = (q: number, r: number) => {
    return gameState.hexes.find(h => h.q === q && h.r === r);
  };

  // Check if hex is a valid move destination
  const isValidMove = (fromQ: number, fromR: number, toQ: number, toR: number): boolean => {
    const neighbors = getNeighbors(fromQ, fromR);
    const isAdjacent = neighbors.some(n => n.q === toQ && n.r === toR);

    if (!isAdjacent) return false;

    const destUnit = getUnitAt(toQ, toR);
    if (destUnit?.unit) return false; // Can't move into occupied hex

    return true;
  };

  // Handle hex click
  const handleHexClick = (q: number, r: number) => {
    const clickedUnit = getUnitAt(q, r);

    // If selecting own unit
    if (clickedUnit?.unit === gameState.currentPlayer) {
      setGameState(prev => ({
        ...prev,
        selectedUnit: { q, r },
      }));
      return;
    }

    // If trying to move selected unit
    if (gameState.selectedUnit) {
      const { q: fromQ, r: fromR } = gameState.selectedUnit;

      if (isValidMove(fromQ, fromR, q, r)) {
        // Check if destination is in enemy ZOC
        const inZOC = isInEnemyZOC(q, r, gameState.currentPlayer);

        // Move the unit
        const newHexes = gameState.hexes.filter(h => !(h.q === fromQ && h.r === fromR));
        newHexes.push({ q, r, unit: gameState.currentPlayer });

        const newLog = [...gameState.gameLog];
        if (inZOC) {
          newLog.push(`${gameState.currentPlayer === 'blue' ? '🔵' : '🔴'} Unit entered enemy ZOC at (${q},${r}) - MOVEMENT STOPS!`);
        } else {
          newLog.push(`${gameState.currentPlayer === 'blue' ? '🔵' : '🔴'} Moved to (${q},${r})`);
        }

        // Check victory condition
        const isObjective = OBJECTIVE_HEXES.some(obj => obj.q === q && obj.r === r);
        if (isObjective && gameState.currentPlayer === 'blue') {
          newLog.push('🎉 VICTORY! Blue captured the objective!');
        }

        // If in ZOC, unit must stop (loses remaining movement)
        const nextPlayer = inZOC ? (gameState.currentPlayer === 'blue' ? 'red' : 'blue') : gameState.currentPlayer;
        const nextMoves = inZOC ? 0 : gameState.movesMade + 1;
        const switchTurn = nextMoves >= 3; // 3 moves per turn

        setGameState({
          hexes: newHexes,
          selectedUnit: null,
          currentPlayer: switchTurn ? (gameState.currentPlayer === 'blue' ? 'red' : 'blue') : nextPlayer,
          turnCount: switchTurn ? gameState.turnCount + 1 : gameState.turnCount,
          movesMade: switchTurn ? 0 : nextMoves,
          gameLog: newLog.slice(-6),
        });
      }
    }
  };

  const resetGame = () => {
    setGameState({
      hexes: INITIAL_UNITS,
      selectedUnit: null,
      currentPlayer: 'blue',
      turnCount: 1,
      movesMade: 0,
      gameLog: ['🎯 Capture the center objective!', '🔵 Blue moves first. Click a unit to select it.'],
    });
  };

  // Render hexagons
  const renderHex = (q: number, r: number) => {
    const { x, y } = hexToPixel(q, r);
    const unit = getUnitAt(q, r);
    const isSelected = gameState.selectedUnit?.q === q && gameState.selectedUnit?.r === r;
    const isHovered = hoveredHex?.q === q && hoveredHex?.r === r;
    const isObjective = OBJECTIVE_HEXES.some(obj => obj.q === q && obj.r === r);
    const inZOC = isInEnemyZOC(q, r, gameState.currentPlayer);

    const points = Array.from({ length: 6 }, (_, i) => {
      const angle = (Math.PI / 3) * i;
      const px = x + HEX_SIZE * Math.cos(angle);
      const py = y + HEX_SIZE * Math.sin(angle);
      return `${px},${py}`;
    }).join(' ');

    let fillColor = '#1a1a1a';
    if (isObjective) fillColor = '#2a1a0a';
    if (unit?.unit === 'blue') fillColor = '#1a3a5a';
    if (unit?.unit === 'red') fillColor = '#5a1a1a';
    if (isSelected) fillColor = '#2a5a2a';

    let strokeColor = isObjective ? '#d4a564' : '#3d5a80';
    let strokeWidth = isObjective ? 2 : 1;
    if (isSelected) {
      strokeColor = '#4a9fb8';
      strokeWidth = 3;
    }
    if (isHovered) strokeWidth = 2;

    return (
      <g key={`${q}-${r}`}>
        <polygon
          points={points}
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          className="cursor-pointer transition-all"
          onClick={() => handleHexClick(q, r)}
          onMouseEnter={() => setHoveredHex({ q, r })}
          onMouseLeave={() => setHoveredHex(null)}
          opacity={0.9}
        />

        {/* ZOC indicator */}
        {inZOC && !unit && (
          <circle cx={x} cy={y} r={8} fill="#d4a564" opacity={0.3} />
        )}

        {/* Unit marker */}
        {unit && (
          <g>
            <rect
              x={x - 18}
              y={y - 12}
              width={36}
              height={24}
              fill={unit.unit === 'blue' ? '#4a9fb8' : '#d4564a'}
              stroke={unit.unit === 'blue' ? '#6abfdf' : '#f47464'}
              strokeWidth={2}
              rx={2}
            />
            <text
              x={x}
              y={y + 5}
              textAnchor="middle"
              fill="white"
              fontSize="11"
              fontWeight="bold"
              fontFamily="monospace"
            >
              {unit.unit === 'blue' ? 'INF' : 'INF'}
            </text>
          </g>
        )}

        {/* Objective marker */}
        {isObjective && (
          <text x={x} y={y - 25} textAnchor="middle" fontSize="16" opacity={0.6}>
            🎯
          </text>
        )}
      </g>
    );
  };

  return (
    <Card className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        {/* Game board */}
        <div>
          <svg width="600" height="400" className="bg-background-tertiary border border-tactical-cyan/20">
            {Array.from({ length: MAP_HEIGHT }, (_, r) =>
              Array.from({ length: MAP_WIDTH }, (_, q) => renderHex(q, r))
            )}
          </svg>

          <div className="mt-4 flex gap-3">
            <Button variant="outline" onClick={resetGame} size="sm">
              Reset Game
            </Button>
          </div>
        </div>

        {/* Game info */}
        <div className="space-y-4">
          <div className="bg-background-secondary p-4 border border-tactical-cyan/20">
            <div className="text-sm font-mono uppercase tracking-wider text-tactical-cyan mb-2">
              Game Status
            </div>
            <div className="space-y-2 text-sm">
              <div>Turn: {gameState.turnCount}</div>
              <div>Current: {gameState.currentPlayer === 'blue' ? '🔵 Blue' : '🔴 Red'}</div>
              <div>Moves: {gameState.movesMade}/3</div>
            </div>
          </div>

          <div className="bg-background-secondary p-4 border border-tactical-amber/20">
            <div className="text-sm font-mono uppercase tracking-wider text-tactical-amber mb-2">
              ZOC Rules
            </div>
            <ul className="text-xs space-y-2 text-muted">
              <li>• Units exert control over adjacent hexes</li>
              <li>• Entering enemy ZOC <strong className="text-tactical-amber">ends movement immediately</strong></li>
              <li>• Use ZOC to create defensive lines</li>
              <li>• Multiple units can screen an advance</li>
              <li>• Victory: 🔵 Blue captures center objective</li>
            </ul>
          </div>

          <div className="bg-background-tertiary p-3 border-l-2 border-tactical-cyan">
            <div className="text-xs font-mono uppercase tracking-wider text-tactical-cyan mb-2">
              Activity Log
            </div>
            <div className="space-y-1 text-xs text-muted font-mono">
              {gameState.gameLog.map((log, i) => (
                <div key={i}>{log}</div>
              ))}
            </div>
          </div>

          <div className="bg-background-secondary p-3 text-xs text-muted">
            <strong className="text-tactical-cyan">What This Teaches:</strong> Zone of Control (ZOC) is how wargames model front lines and positional control. Units can't just walk past enemies - they get "stuck" in adjacent hexes, creating realistic friction and forcing players to screen, flank, or breakthrough.
          </div>
        </div>
      </div>
    </Card>
  );
};
