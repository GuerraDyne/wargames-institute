'use client';

import React, { useState } from 'react';
import { Button, Card } from '../ui';

type Player = 'blue' | 'red' | null;

interface Hex {
  q: number; // column
  r: number; // row
  unit: Player;
}

interface GameState {
  hexes: Hex[];
  selectedUnit: { q: number; r: number } | null;
  currentPlayer: Player;
  turnCount: number;
  gameLog: string[];
  winner: Player;
}

const HEX_SIZE = 30;
const MAP_WIDTH = 8;
const MAP_HEIGHT = 6;

// Objective hex (center of map)
const OBJECTIVE = { q: 4, r: 3 };

// Initial unit positions
const INITIAL_UNITS: Hex[] = [
  // Blue (player) units - bottom row
  { q: 2, r: 5, unit: 'blue' },
  { q: 3, r: 5, unit: 'blue' },
  { q: 4, r: 5, unit: 'blue' },
  { q: 5, r: 5, unit: 'blue' },
  // Red (enemy) units - top row
  { q: 2, r: 0, unit: 'red' },
  { q: 3, r: 0, unit: 'red' },
  { q: 4, r: 0, unit: 'red' },
  { q: 5, r: 0, unit: 'red' },
];

export const ZoneOfControlDemo: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    hexes: INITIAL_UNITS,
    selectedUnit: null,
    currentPlayer: 'blue',
    turnCount: 1,
    gameLog: ['🎯 Capture the center objective!', '🔵 Blue turn: Select and move a unit'],
    winner: null,
  });

  const [hoveredHex, setHoveredHex] = useState<{ q: number; r: number } | null>(null);

  // Offset coordinate to pixel (creates rectangular grid)
  const hexToPixel = (col: number, row: number) => {
    const offsetX = (row % 2 === 1) ? HEX_SIZE * 3/4 : 0; // Odd rows shift right
    const x = HEX_SIZE * 3/2 * col + offsetX + 60;
    const y = HEX_SIZE * Math.sqrt(3) * row + 60;
    return { x, y };
  };

  // Get all adjacent hexes (6 neighbors) - adjusted for odd-r offset
  const getNeighbors = (q: number, r: number) => {
    const isOddRow = r % 2 === 1;

    if (isOddRow) {
      return [
        { q: q + 1, r: r },     // E
        { q: q - 1, r: r },     // W
        { q: q + 1, r: r - 1 }, // NE
        { q: q, r: r - 1 },     // NW
        { q: q + 1, r: r + 1 }, // SE
        { q: q, r: r + 1 },     // SW
      ];
    } else {
      return [
        { q: q + 1, r: r },     // E
        { q: q - 1, r: r },     // W
        { q: q, r: r - 1 },     // NE
        { q: q - 1, r: r - 1 }, // NW
        { q: q, r: r + 1 },     // SE
        { q: q - 1, r: r + 1 }, // SW
      ];
    }
  };

  // Check if a hex is in enemy ZOC
  const isInEnemyZOC = (q: number, r: number, player: Player): boolean => {
    if (!player) return false;
    const enemyPlayer: Player = player === 'blue' ? 'red' : 'blue';
    const neighbors = getNeighbors(q, r);

    return neighbors.some(neighbor => {
      if (neighbor.q < 0 || neighbor.q >= MAP_WIDTH || neighbor.r < 0 || neighbor.r >= MAP_HEIGHT) return false;
      const unit = gameState.hexes.find(h => h.q === neighbor.q && h.r === neighbor.r);
      return unit?.unit === enemyPlayer;
    });
  };

  // Get unit at hex
  const getUnitAt = (q: number, r: number) => {
    return gameState.hexes.find(h => h.q === q && h.r === r);
  };

  // Check if move is valid
  const isValidMove = (fromQ: number, fromR: number, toQ: number, toR: number): boolean => {
    const neighbors = getNeighbors(fromQ, fromR);
    const isAdjacent = neighbors.some(n => n.q === toQ && n.r === toR);

    if (!isAdjacent) return false;
    if (toQ < 0 || toQ >= MAP_WIDTH || toR < 0 || toR >= MAP_HEIGHT) return false;

    return true;
  };

  // Switch turn
  const endTurn = () => {
    const nextPlayer = gameState.currentPlayer === 'blue' ? 'red' : 'blue';
    const newLog = [...gameState.gameLog];
    newLog.push(`${nextPlayer === 'blue' ? '🔵 Blue' : '🔴 Red'} turn`);

    setGameState(prev => ({
      ...prev,
      currentPlayer: nextPlayer,
      selectedUnit: null,
      turnCount: nextPlayer === 'blue' ? prev.turnCount + 1 : prev.turnCount,
      gameLog: newLog.slice(-6),
    }));
  };

  // Handle hex click
  const handleHexClick = (q: number, r: number) => {
    if (gameState.winner) return;

    const clickedUnit = getUnitAt(q, r);

    // Select own unit
    if (clickedUnit?.unit === gameState.currentPlayer) {
      setGameState(prev => ({
        ...prev,
        selectedUnit: { q, r },
      }));
      return;
    }

    // Move or attack with selected unit
    if (gameState.selectedUnit) {
      const { q: fromQ, r: fromR } = gameState.selectedUnit;

      if (isValidMove(fromQ, fromR, q, r)) {
        const targetUnit = getUnitAt(q, r);
        const inZOC = isInEnemyZOC(q, r, gameState.currentPlayer);

        let newHexes = gameState.hexes.filter(h => !(h.q === fromQ && h.r === fromR));
        const newLog = [...gameState.gameLog];

        // Combat: eliminate enemy unit
        if (targetUnit && targetUnit.unit !== gameState.currentPlayer) {
          newHexes = newHexes.filter(h => !(h.q === q && h.r === r));
          newHexes.push({ q, r, unit: gameState.currentPlayer });
          newLog.push(`${gameState.currentPlayer === 'blue' ? '🔵' : '🔴'} captured enemy unit at (${q},${r})!`);
        } else {
          // Normal move
          newHexes.push({ q, r, unit: gameState.currentPlayer });
          if (inZOC) {
            newLog.push(`${gameState.currentPlayer === 'blue' ? '🔵' : '🔴'} entered ZOC - movement stops!`);
          } else {
            newLog.push(`${gameState.currentPlayer === 'blue' ? '🔵' : '🔴'} moved to (${q},${r})`);
          }
        }

        // Check victory
        let winner: Player = null;
        const isObjective = q === OBJECTIVE.q && r === OBJECTIVE.r;
        if (isObjective) {
          winner = gameState.currentPlayer;
          newLog.push(`🎉 ${winner === 'blue' ? 'BLUE' : 'RED'} WINS! Objective captured!`);
        }

        // Check elimination victory
        const blueUnits = newHexes.filter(h => h.unit === 'blue').length;
        const redUnits = newHexes.filter(h => h.unit === 'red').length;
        if (blueUnits === 0) {
          winner = 'red';
          newLog.push('🎉 RED WINS! All blue units eliminated!');
        } else if (redUnits === 0) {
          winner = 'blue';
          newLog.push('🎉 BLUE WINS! All red units eliminated!');
        }

        setGameState({
          hexes: newHexes,
          selectedUnit: null,
          currentPlayer: gameState.currentPlayer, // Stay on same turn until "End Turn"
          turnCount: gameState.turnCount,
          gameLog: newLog.slice(-6),
          winner,
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
      gameLog: ['🎯 Capture the center objective!', '🔵 Blue turn: Select and move a unit'],
      winner: null,
    });
  };

  // Render hexagon
  const renderHex = (q: number, r: number) => {
    const { x, y } = hexToPixel(q, r);
    const unit = getUnitAt(q, r);
    const isSelected = gameState.selectedUnit?.q === q && gameState.selectedUnit?.r === r;
    const isHovered = hoveredHex?.q === q && hoveredHex?.r === r;
    const isObjective = q === OBJECTIVE.q && r === OBJECTIVE.r;
    const inZOC = unit?.unit !== gameState.currentPlayer && isInEnemyZOC(q, r, gameState.currentPlayer);

    const points = Array.from({ length: 6 }, (_, i) => {
      const angle = (Math.PI / 3) * i;
      const px = x + HEX_SIZE * Math.cos(angle);
      const py = y + HEX_SIZE * Math.sin(angle);
      return `${px},${py}`;
    }).join(' ');

    let fillColor = '#1a1a1a';
    if (isObjective) fillColor = '#2a2a0a';
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
          <circle cx={x} cy={y} r={6} fill="#d4a564" opacity={0.4} />
        )}

        {/* Unit marker */}
        {unit && (
          <g>
            <rect
              x={x - 16}
              y={y - 11}
              width={32}
              height={22}
              fill={unit.unit === 'blue' ? '#4a9fb8' : '#d4564a'}
              stroke={unit.unit === 'blue' ? '#6abfdf' : '#f47464'}
              strokeWidth={2}
              rx={2}
            />
            <text
              x={x}
              y={y + 4}
              textAnchor="middle"
              fill="white"
              fontSize="10"
              fontWeight="bold"
              fontFamily="monospace"
            >
              {unit.unit === 'blue' ? 'INF' : 'INF'}
            </text>
          </g>
        )}

        {/* Objective marker */}
        {isObjective && (
          <text x={x} y={y - 22} textAnchor="middle" fontSize="14" opacity={0.7}>
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
          <svg width="520" height="420" className="bg-background-tertiary border border-tactical-cyan/20">
            {Array.from({ length: MAP_HEIGHT }, (_, r) =>
              Array.from({ length: MAP_WIDTH }, (_, q) => renderHex(q, r))
            )}
          </svg>

          <div className="mt-4 flex gap-3">
            <Button
              variant="primary"
              onClick={endTurn}
              size="sm"
              disabled={gameState.winner !== null}
            >
              End Turn
            </Button>
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
              <div className={gameState.currentPlayer === 'blue' ? 'text-tactical-cyan font-bold' : ''}>
                Current: {gameState.currentPlayer === 'blue' ? '🔵 Blue' : '🔴 Red'}
              </div>
              <div>Blue Units: {gameState.hexes.filter(h => h.unit === 'blue').length}</div>
              <div>Red Units: {gameState.hexes.filter(h => h.unit === 'red').length}</div>
              {gameState.winner && (
                <div className="text-tactical-amber font-bold mt-2">
                  Winner: {gameState.winner === 'blue' ? '🔵 BLUE' : '🔴 RED'}!
                </div>
              )}
            </div>
          </div>

          <div className="bg-background-secondary p-4 border border-tactical-amber/20">
            <div className="text-sm font-mono uppercase tracking-wider text-tactical-amber mb-2">
              Rules
            </div>
            <ul className="text-xs space-y-2 text-muted">
              <li>• Click your unit to select it</li>
              <li>• Click adjacent hex to move</li>
              <li>• <strong className="text-tactical-amber">ZOC: Entering enemy zone stops movement</strong></li>
              <li>• Move into enemy unit to <strong>eliminate</strong> it</li>
              <li>• You can move multiple units per turn</li>
              <li>• Click "End Turn" when done</li>
              <li>• <strong className="text-tactical-cyan">Victory:</strong> Capture 🎯 or eliminate all enemies</li>
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
            <strong className="text-tactical-cyan">What This Teaches:</strong> Zone of Control creates front lines. Units can't slip past enemies - they must fight through or flank around. This is foundational to tactical wargaming.
          </div>
        </div>
      </div>
    </Card>
  );
};
