'use client';

import React, { useState } from 'react';
import { Button, Card } from '../ui';

type Player = 'blue' | 'red' | null;

interface Hex {
  col: number;
  row: number;
  unit: Player;
  isSupplySource: boolean;
  movesLeft: number;
}

interface GameState {
  hexes: Hex[];
  selectedUnit: { col: number; row: number } | null;
  currentPlayer: Player;
  turnCount: number;
  gameLog: string[];
}

const HEX_SIZE = 30;
const MAP_COLS = 11;
const MAP_ROWS = 7;

// Create full hex grid
const createFullGrid = (): Hex[] => {
  const hexes: Hex[] = [];
  for (let row = 0; row < MAP_ROWS; row++) {
    for (let col = 0; col < MAP_COLS; col++) {
      hexes.push({
        col,
        row,
        unit: null,
        isSupplySource: false,
        movesLeft: 2,
      });
    }
  }
  return hexes;
};

// Initial setup: Supply line scenario
const INITIAL_HEXES = (() => {
  const hexes = createFullGrid();

  // Blue supply source (left edge)
  hexes.find(h => h.col === 0 && h.row === 3)!.isSupplySource = true;

  // Blue supply line units (connected path to front)
  hexes.find(h => h.col === 2 && h.row === 3)!.unit = 'blue';
  hexes.find(h => h.col === 4 && h.row === 3)!.unit = 'blue';
  hexes.find(h => h.col === 6 && h.row === 3)!.unit = 'blue';

  // Blue front line units (need supply)
  hexes.find(h => h.col === 8 && h.row === 3)!.unit = 'blue';
  hexes.find(h => h.col === 9 && h.row === 3)!.unit = 'blue';

  // Red units (can move to cut supply line)
  hexes.find(h => h.col === 4 && h.row === 1)!.unit = 'red';
  hexes.find(h => h.col === 5 && h.row === 1)!.unit = 'red';
  hexes.find(h => h.col === 4 && h.row === 5)!.unit = 'red';
  hexes.find(h => h.col === 5 && h.row === 5)!.unit = 'red';

  return hexes;
})();

export const SupplyLinesDemo: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    hexes: INITIAL_HEXES,
    selectedUnit: null,
    currentPlayer: 'red',
    turnCount: 1,
    gameLog: ['🔴 Red: Move to cut Blue\'s supply line!', '🔵 Blue: Protect your supply route!'],
  });

  const [hoveredHex, setHoveredHex] = useState<{ col: number; row: number } | null>(null);

  // Flat-top hex with odd-r offset coordinates
  const hexToPixel = (col: number, row: number) => {
    const hexWidth = Math.sqrt(3) * HEX_SIZE;
    const hexHeight = 2 * HEX_SIZE;

    const x = col * hexWidth + (row % 2 === 1 ? hexWidth / 2 : 0) + 60;
    const y = row * hexHeight * 0.75 + 60;

    return { x, y };
  };

  // Get adjacent hexes (odd-r offset coordinates)
  const getAdjacentHexes = (col: number, row: number) => {
    const isOddRow = row % 2 === 1;
    const neighbors = isOddRow ? [
      { col: col, row: row - 1 },     // Top
      { col: col, row: row + 1 },     // Bottom
      { col: col - 1, row: row },     // Left
      { col: col + 1, row: row },     // Right
      { col: col + 1, row: row - 1 }, // Top-right
      { col: col + 1, row: row + 1 }, // Bottom-right
    ] : [
      { col: col, row: row - 1 },     // Top
      { col: col, row: row + 1 },     // Bottom
      { col: col - 1, row: row },     // Left
      { col: col + 1, row: row },     // Right
      { col: col - 1, row: row - 1 }, // Top-left
      { col: col - 1, row: row + 1 }, // Bottom-left
    ];

    const unique = neighbors.filter((n, i, arr) =>
      arr.findIndex(x => x.col === n.col && x.row === n.row) === i
    );

    return unique.filter(n =>
      n.col >= 0 && n.col < MAP_COLS && n.row >= 0 && n.row < MAP_ROWS
    );
  };

  // BFS to find supply path
  const findSupplyPath = (fromCol: number, fromRow: number, hexArray: Hex[]): { col: number; row: number }[] | null => {
    const queue: { col: number; row: number; path: { col: number; row: number }[] }[] = [
      { col: fromCol, row: fromRow, path: [{ col: fromCol, row: fromRow }] }
    ];
    const visited = new Set<string>();

    while (queue.length > 0) {
      const current = queue.shift()!;
      const key = `${current.col},${current.row}`;

      if (visited.has(key)) continue;
      visited.add(key);

      const hex = hexArray.find(h => h.col === current.col && h.row === current.row);
      if (!hex) continue;

      // Found supply source!
      if (hex.isSupplySource) {
        return current.path;
      }

      // Can't trace through enemy units
      if (hex.unit === 'red') continue;

      // Explore neighbors
      const neighbors = getAdjacentHexes(current.col, current.row);
      for (const neighbor of neighbors) {
        queue.push({
          col: neighbor.col,
          row: neighbor.row,
          path: [...current.path, { col: neighbor.col, row: neighbor.row }],
        });
      }
    }

    return null; // No supply path found
  };

  // Calculate supply paths for all Blue units
  const calculateSupplyPaths = (hexArray: Hex[]) => {
    const paths: { col: number; row: number }[][] = [];

    hexArray.forEach(hex => {
      if (hex.unit === 'blue' && !hex.isSupplySource) {
        const path = findSupplyPath(hex.col, hex.row, hexArray);
        if (path) {
          paths.push(path);
        }
      }
    });

    return paths;
  };

  // Check if move is valid
  const isValidMove = (fromCol: number, fromRow: number, toCol: number, toRow: number, hexArray: Hex[]): boolean => {
    const neighbors = getAdjacentHexes(fromCol, fromRow);
    const isAdjacent = neighbors.some(n => n.col === toCol && n.row === toRow);
    if (!isAdjacent) return false;

    const destHex = hexArray.find(h => h.col === toCol && h.row === toRow);
    if (!destHex) return false;
    if (destHex.unit) return false; // Can't move into occupied hex
    if (destHex.isSupplySource) return false; // Can't move into supply source

    return true;
  };

  // Handle hex click
  const handleHexClick = (col: number, row: number) => {
    const clickedHex = gameState.hexes.find(h => h.col === col && h.row === row);
    if (!clickedHex) return;

    // Select own unit
    if (clickedHex.unit === gameState.currentPlayer && clickedHex.movesLeft > 0) {
      setGameState(prev => ({
        ...prev,
        selectedUnit: { col, row },
      }));
      return;
    }

    // Move selected unit
    if (gameState.selectedUnit) {
      const { col: fromCol, row: fromRow } = gameState.selectedUnit;
      const movingUnit = gameState.hexes.find(h => h.col === fromCol && h.row === fromRow);

      if (!movingUnit || movingUnit.movesLeft <= 0) {
        setGameState(prev => ({ ...prev, selectedUnit: null }));
        return;
      }

      if (isValidMove(fromCol, fromRow, col, row, gameState.hexes)) {
        const newHexes = gameState.hexes.map(h => {
          if (h.col === fromCol && h.row === fromRow) {
            return { ...h, unit: null };
          }
          if (h.col === col && h.row === row) {
            return { ...h, unit: gameState.currentPlayer, movesLeft: movingUnit.movesLeft - 1 };
          }
          return h;
        });

        const newLog = [...gameState.gameLog];
        newLog.push(`${gameState.currentPlayer === 'blue' ? '🔵' : '🔴'} Moved to (${col},${row})`);

        // Calculate new supply status
        const paths = calculateSupplyPaths(newHexes);
        const blueUnitsInSupply = paths.length;
        const totalBlueUnits = newHexes.filter(h => h.unit === 'blue').length;

        if (blueUnitsInSupply < totalBlueUnits) {
          newLog.push(`⚠️ ${totalBlueUnits - blueUnitsInSupply} Blue unit(s) OUT OF SUPPLY!`);
        }

        // Check if should auto-end turn
        const shouldAutoEnd = shouldAutoEndTurn(newHexes, gameState.currentPlayer);

        setGameState({
          hexes: newHexes,
          selectedUnit: null,
          currentPlayer: shouldAutoEnd ? (gameState.currentPlayer === 'blue' ? 'red' : 'blue') : gameState.currentPlayer,
          turnCount: shouldAutoEnd && gameState.currentPlayer === 'red' ? gameState.turnCount + 1 : gameState.turnCount,
          gameLog: newLog.slice(-6),
        });

        // If auto-ending turn, reset moves
        if (shouldAutoEnd) {
          setTimeout(() => {
            setGameState(prev => ({
              ...prev,
              hexes: prev.hexes.map(h => ({ ...h, movesLeft: 2 })),
            }));
          }, 100);
        }
      }
    }
  };

  const shouldAutoEndTurn = (hexes: Hex[], player: Player): boolean => {
    const playerUnits = hexes.filter(h => h.unit === player);
    return playerUnits.length > 0 && playerUnits.every(h => h.movesLeft === 0);
  };

  const resetGame = () => {
    setGameState({
      hexes: INITIAL_HEXES,
      selectedUnit: null,
      currentPlayer: 'red',
      turnCount: 1,
      gameLog: ['🔴 Red: Move to cut Blue\'s supply line!', '🔵 Blue: Protect your supply route!'],
    });
  };

  // Calculate supply paths
  const supplyPaths = calculateSupplyPaths(gameState.hexes);
  const blueUnitsInSupply = supplyPaths.length;
  const totalBlueUnits = gameState.hexes.filter(h => h.unit === 'blue').length;

  // Render hexagon
  const renderHex = (col: number, row: number) => {
    const { x, y } = hexToPixel(col, row);
    const hex = gameState.hexes.find(h => h.col === col && h.row === row);
    if (!hex) return null;

    const isSelected = gameState.selectedUnit?.col === col && gameState.selectedUnit?.row === row;
    const isHovered = hoveredHex?.col === col && hoveredHex?.row === row;

    // Check if this hex is on a supply path
    const isOnSupplyPath = supplyPaths.some(path =>
      path.some(p => p.col === col && p.row === row)
    );

    // Check if this Blue unit is out of supply
    const isUnitOutOfSupply = hex.unit === 'blue' && !hex.isSupplySource && !supplyPaths.some(path =>
      path[0].col === col && path[0].row === row
    );

    const points = Array.from({ length: 6 }, (_, i) => {
      const angle = (Math.PI / 3) * i + (Math.PI / 6); // +30° for flat-top
      const px = x + HEX_SIZE * Math.cos(angle);
      const py = y + HEX_SIZE * Math.sin(angle);
      return `${px},${py}`;
    }).join(' ');

    let fillColor = '#1a1a1a';
    if (hex.isSupplySource) fillColor = '#2a3a1a';
    if (hex.unit === 'blue') fillColor = '#1a3a5a';
    if (hex.unit === 'red') fillColor = '#5a1a1a';
    if (isSelected) fillColor = '#2a5a2a';
    if (isOnSupplyPath && !hex.unit && !hex.isSupplySource) fillColor = '#1a2a1a';

    let strokeColor = '#3d5a80';
    let strokeWidth = 1;
    if (hex.isSupplySource) {
      strokeColor = '#4a9fb8';
      strokeWidth = 2;
    }
    if (isSelected) {
      strokeColor = '#4a9fb8';
      strokeWidth = 3;
    }
    if (isHovered) strokeWidth = 2;

    return (
      <g key={`${col}-${row}`}>
        <polygon
          points={points}
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          className="cursor-pointer transition-all"
          onClick={() => handleHexClick(col, row)}
          onMouseEnter={() => setHoveredHex({ col, row })}
          onMouseLeave={() => setHoveredHex(null)}
          opacity={0.9}
        />

        {/* Supply path indicator */}
        {isOnSupplyPath && !hex.unit && !hex.isSupplySource && (
          <circle cx={x} cy={y} r={4} fill="#4a9fb8" opacity={0.5} />
        )}

        {/* Unit marker */}
        {hex.unit && (
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
              opacity={isUnitOutOfSupply ? 0.5 : 1}
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

            {/* Moves remaining */}
            {hex.movesLeft < 2 && hex.unit === gameState.currentPlayer && (
              <circle cx={x + 12} cy={y - 12} r={6} fill="#2a2a2a" stroke="#4a9fb8" strokeWidth={1} />
            )}
            {hex.movesLeft < 2 && hex.unit === gameState.currentPlayer && (
              <text x={x + 12} y={y - 9} textAnchor="middle" fontSize="8" fill="#4a9fb8" fontFamily="monospace">
                {hex.movesLeft}
              </text>
            )}
          </g>
        )}

        {/* Supply source marker */}
        {hex.isSupplySource && (
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
          <svg width="750" height="400" className="bg-background-tertiary border border-tactical-cyan/20">
            {Array.from({ length: MAP_ROWS }, (_, row) =>
              Array.from({ length: MAP_COLS }, (_, col) => renderHex(col, row))
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
                Blue In Supply: {blueUnitsInSupply}/{totalBlueUnits}
              </div>
            </div>
          </div>

          <div className="bg-background-secondary p-4 border border-tactical-amber/20">
            <div className="text-sm font-mono uppercase tracking-wider text-tactical-amber mb-2">
              Supply Rules
            </div>
            <ul className="text-xs space-y-2 text-muted">
              <li>• Blue units must trace path to 📦 supply depot</li>
              <li>• Path cannot go through Red units</li>
              <li>• Out-of-supply units: dimmed + ⚠️</li>
              <li>• Cyan dots show active supply routes</li>
              <li>• 🔴 Red: Cut Blue's supply line!</li>
              <li>• 🔵 Blue: Keep supply route open!</li>
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
            <strong className="text-tactical-cyan">What This Teaches:</strong> Supply lines are critical in operational wargames. Units need logistics to fight. Cutting enemy supply (interdiction) is often more decisive than direct combat. This forces players to protect rear areas and creates strategic depth.
          </div>
        </div>
      </div>
    </Card>
  );
};
