'use client';

import React, { useState } from 'react';
import { Button, Card } from '../ui';

type Player = 'blue' | 'red' | null;

interface Hex {
  q: number;
  r: number;
  unit: Player;
  isSupplySource: boolean;
  isBlocked: boolean; // For enemy interdiction
}

interface GameState {
  hexes: Hex[];
  selectedUnit: { q: number; r: number } | null;
  currentPlayer: Player;
  turnCount: number;
  gameLog: string[];
  supplyPaths: { q: number; r: number }[][];
}

const HEX_SIZE = 30;
const MAP_WIDTH = 9;
const MAP_HEIGHT = 5;

// Initial setup: Linear supply line scenario
const INITIAL_HEXES: Hex[] = [
  // Blue supply source (rear area)
  { q: 0, r: 2, unit: null, isSupplySource: true, isBlocked: false },

  // Blue supply line
  { q: 1, r: 2, unit: 'blue', isSupplySource: false, isBlocked: false },
  { q: 2, r: 2, unit: null, isSupplySource: false, isBlocked: false },
  { q: 3, r: 2, unit: 'blue', isSupplySource: false, isBlocked: false },
  { q: 4, r: 2, unit: null, isSupplySource: false, isBlocked: false },

  // Blue front line units
  { q: 5, r: 2, unit: 'blue', isSupplySource: false, isBlocked: false },
  { q: 6, r: 2, unit: 'blue', isSupplySource: false, isBlocked: false },

  // Red attackers (can move to cut supply)
  { q: 4, r: 0, unit: 'red', isSupplySource: false, isBlocked: false },
  { q: 5, r: 0, unit: 'red', isSupplySource: false, isBlocked: false },
  { q: 4, r: 4, unit: 'red', isSupplySource: false, isBlocked: false },
  { q: 5, r: 4, unit: 'red', isSupplySource: false, isBlocked: false },
];

export const SupplyLinesDemo: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    hexes: INITIAL_HEXES,
    selectedUnit: null,
    currentPlayer: 'red',
    turnCount: 1,
    gameLog: ['🔴 Red: Cut Blue\'s supply line!', '🔵 Blue: Maintain supply to front line units!'],
    supplyPaths: [],
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
    let neighbors;

    if (isOddRow) {
      neighbors = [
        { q: q + 1, r: r },     // E
        { q: q - 1, r: r },     // W
        { q: q + 1, r: r - 1 }, // NE
        { q: q, r: r - 1 },     // NW
        { q: q + 1, r: r + 1 }, // SE
        { q: q, r: r + 1 },     // SW
      ];
    } else {
      neighbors = [
        { q: q + 1, r: r },     // E
        { q: q - 1, r: r },     // W
        { q: q, r: r - 1 },     // NE
        { q: q - 1, r: r - 1 }, // NW
        { q: q, r: r + 1 },     // SE
        { q: q - 1, r: r + 1 }, // SW
      ];
    }

    return neighbors.filter(hex => hex.q >= 0 && hex.q < MAP_WIDTH && hex.r >= 0 && hex.r < MAP_HEIGHT);
  };

  // Get hex data
  const getHexAt = (q: number, r: number) => {
    return gameState.hexes.find(h => h.q === q && h.r === r);
  };

  // BFS to find supply path
  const findSupplyPath = (fromQ: number, fromR: number, player: Player): { q: number; r: number }[] | null => {
    const queue: { q: number; r: number; path: { q: number; r: number }[] }[] = [
      { q: fromQ, r: fromR, path: [{ q: fromQ, r: fromR }] }
    ];
    const visited = new Set<string>();

    while (queue.length > 0) {
      const current = queue.shift()!;
      const key = `${current.q},${current.r}`;

      if (visited.has(key)) continue;
      visited.add(key);

      const hex = getHexAt(current.q, current.r);

      // Found supply source!
      if (hex?.isSupplySource) {
        return current.path;
      }

      // Can't trace through enemy units or blocked hexes
      if (hex?.unit && hex.unit !== player) continue;
      if (hex?.isBlocked) continue;

      // Explore neighbors
      const neighbors = getNeighbors(current.q, current.r);
      for (const neighbor of neighbors) {
        const neighborHex = getHexAt(neighbor.q, neighbor.r);
        if (!neighborHex) continue;

        queue.push({
          q: neighbor.q,
          r: neighbor.r,
          path: [...current.path, { q: neighbor.q, r: neighbor.r }],
        });
      }
    }

    return null; // No supply path found
  };

  // Check which units are in supply
  const calculateSupplyStatus = () => {
    const paths: { q: number; r: number }[][] = [];

    gameState.hexes.forEach(hex => {
      if (hex.unit === 'blue' && !hex.isSupplySource) {
        const path = findSupplyPath(hex.q, hex.r, 'blue');
        if (path) {
          paths.push(path);
        }
      }
    });

    return paths;
  };

  // Check if hex is a valid move
  const isValidMove = (fromQ: number, fromR: number, toQ: number, toR: number): boolean => {
    const neighbors = getNeighbors(fromQ, fromR);
    const isAdjacent = neighbors.some(n => n.q === toQ && n.r === toR);

    if (!isAdjacent) return false;

    const destHex = getHexAt(toQ, toR);
    if (destHex?.unit) return false; // Can't move into occupied hex
    if (destHex?.isSupplySource) return false; // Can't move into supply source

    return true;
  };

  // Handle hex click
  const handleHexClick = (q: number, r: number) => {
    const clickedHex = getHexAt(q, r);

    // Select own unit
    if (clickedHex?.unit === gameState.currentPlayer) {
      setGameState(prev => ({
        ...prev,
        selectedUnit: { q, r },
      }));
      return;
    }

    // Move selected unit
    if (gameState.selectedUnit) {
      const { q: fromQ, r: fromR } = gameState.selectedUnit;

      if (isValidMove(fromQ, fromR, q, r)) {
        const newHexes = gameState.hexes.map(h => {
          if (h.q === fromQ && h.r === fromR) {
            return { ...h, unit: null };
          }
          if (h.q === q && h.r === r) {
            return { ...h, unit: gameState.currentPlayer };
          }
          return h;
        });

        const newLog = [...gameState.gameLog];
        newLog.push(`${gameState.currentPlayer === 'blue' ? '🔵' : '🔴'} Moved to (${q},${r})`);

        // Check if Red cut Blue's supply
        const tempState = { ...gameState, hexes: newHexes };
        const paths = calculateSupplyStatus();

        // Count Blue units in supply
        const blueUnitsInSupply = paths.length;
        const totalBlueUnits = newHexes.filter(h => h.unit === 'blue' && !h.isSupplySource).length;

        if (gameState.currentPlayer === 'red' && blueUnitsInSupply < totalBlueUnits) {
          newLog.push(`⚠️ Supply disrupted! ${totalBlueUnits - blueUnitsInSupply} Blue unit(s) out of supply!`);
        }

        setGameState({
          hexes: newHexes,
          selectedUnit: null,
          currentPlayer: gameState.currentPlayer === 'blue' ? 'red' : 'blue',
          turnCount: gameState.currentPlayer === 'red' ? gameState.turnCount + 1 : gameState.turnCount,
          gameLog: newLog.slice(-6),
          supplyPaths: paths,
        });
      }
    }
  };

  const resetGame = () => {
    setGameState({
      hexes: INITIAL_HEXES,
      selectedUnit: null,
      currentPlayer: 'red',
      turnCount: 1,
      gameLog: ['🔴 Red: Cut Blue\'s supply line!', '🔵 Blue: Maintain supply to front line units!'],
      supplyPaths: [],
    });
  };

  // Calculate supply status
  const supplyPaths = calculateSupplyStatus();
  const blueUnitsInSupply = supplyPaths.length;
  const totalBlueUnits = gameState.hexes.filter(h => h.unit === 'blue' && !h.isSupplySource).length;

  // Render hexagon
  const renderHex = (q: number, r: number) => {
    const { x, y } = hexToPixel(q, r);
    const hex = getHexAt(q, r);
    const isSelected = gameState.selectedUnit?.q === q && gameState.selectedUnit?.r === r;
    const isHovered = hoveredHex?.q === q && hoveredHex?.r === r;

    // Check if this hex is on a supply path
    const isOnSupplyPath = supplyPaths.some(path =>
      path.some(p => p.q === q && p.r === r)
    );

    // Check if this unit is out of supply
    const isUnitOutOfSupply = hex?.unit === 'blue' && !hex.isSupplySource && !supplyPaths.some(path =>
      path[0].q === q && path[0].r === r
    );

    const points = Array.from({ length: 6 }, (_, i) => {
      const angle = (Math.PI / 3) * i; // EXACT copy from working HexGridMap - NO offset
      const px = x + HEX_SIZE * Math.cos(angle);
      const py = y + HEX_SIZE * Math.sin(angle);
      return `${px},${py}`;
    }).join(' ');

    let fillColor = '#1a1a1a';
    if (hex?.isSupplySource) fillColor = '#2a3a1a';
    if (hex?.unit === 'blue') fillColor = '#1a3a5a';
    if (hex?.unit === 'red') fillColor = '#5a1a1a';
    if (isSelected) fillColor = '#2a5a2a';
    if (isOnSupplyPath && !hex?.unit) fillColor = '#1a2a1a';

    let strokeColor = '#3d5a80';
    let strokeWidth = 1;
    if (hex?.isSupplySource) {
      strokeColor = '#4a9fb8';
      strokeWidth = 2;
    }
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

        {/* Supply path indicator */}
        {isOnSupplyPath && !hex?.unit && (
          <circle cx={x} cy={y} r={4} fill="#4a9fb8" opacity={0.5} />
        )}

        {/* Unit marker */}
        {hex?.unit && (
          <g>
            <rect
              x={x - 15}
              y={y - 10}
              width={30}
              height={20}
              fill={hex.unit === 'blue' ? '#4a9fb8' : '#d4564a'}
              stroke={hex.unit === 'blue' ? '#6abfdf' : '#f47464'}
              strokeWidth={2}
              rx={2}
            />
            <text
              x={x}
              y={y + 4}
              textAnchor="middle"
              fill="white"
              fontSize="9"
              fontWeight="bold"
              fontFamily="monospace"
            >
              {hex.unit === 'blue' ? 'INF' : 'RED'}
            </text>

            {/* Out of supply indicator */}
            {isUnitOutOfSupply && (
              <text x={x} y={y - 18} textAnchor="middle" fontSize="14">
                ⚠️
              </text>
            )}
          </g>
        )}

        {/* Supply source marker */}
        {hex?.isSupplySource && (
          <text x={x} y={y + 4} textAnchor="middle" fontSize="16">
            📦
          </text>
        )}
      </g>
    );
  };

  return (
    <Card className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
        {/* Game board */}
        <div>
          <svg width="650" height="300" className="bg-background-tertiary border border-tactical-cyan/20">
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
              Supply Status
            </div>
            <div className="space-y-2 text-sm">
              <div>Turn: {gameState.turnCount}</div>
              <div>Current: {gameState.currentPlayer === 'blue' ? '🔵 Blue' : '🔴 Red'}</div>
              <div className={blueUnitsInSupply === totalBlueUnits ? 'text-tactical-cyan' : 'text-tactical-amber'}>
                Blue Units In Supply: {blueUnitsInSupply}/{totalBlueUnits}
              </div>
            </div>
          </div>

          <div className="bg-background-secondary p-4 border border-tactical-amber/20">
            <div className="text-sm font-mono uppercase tracking-wider text-tactical-amber mb-2">
              Supply Rules
            </div>
            <ul className="text-xs space-y-2 text-muted">
              <li>• Units must trace path to 📦 supply source</li>
              <li>• Path cannot go through enemy units</li>
              <li>• Out-of-supply units marked with ⚠️</li>
              <li>• Green dots show active supply paths</li>
              <li>• 🔴 Red objective: Cut Blue supply lines</li>
              <li>• 🔵 Blue objective: Keep front supplied</li>
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
            <strong className="text-tactical-cyan">What This Teaches:</strong> Supply lines are critical in operational wargames. Units need logistics to fight effectively. Cutting enemy supply (interdiction) is often more decisive than direct combat. This mechanic forces players to protect their rear areas and creates strategic depth.
          </div>
        </div>
      </div>
    </Card>
  );
};
