'use client';

import React, { useState } from 'react';
import { Button, Card } from '../ui';

type Player = 'blue' | 'red' | null;

interface Hex {
  col: number;
  row: number;
  unit: Player;
  movesLeft: number; // Moves remaining this turn (max 2)
}

interface GameState {
  hexes: Hex[];
  selectedUnit: { col: number; row: number } | null;
  currentPlayer: Player;
  turnCount: number;
  gameLog: string[];
  winner: Player;
}

const HEX_SIZE = 35;
const MAP_COLS = 8;
const MAP_ROWS = 7;

// Objective hex (center of map)
const OBJECTIVE = { col: 4, row: 3 };

// Initial unit positions
const INITIAL_UNITS: Hex[] = [
  // Blue (player) units - bottom row (now row 6)
  { col: 2, row: 6, unit: 'blue', movesLeft: 2 },
  { col: 3, row: 6, unit: 'blue', movesLeft: 2 },
  { col: 4, row: 6, unit: 'blue', movesLeft: 2 },
  { col: 5, row: 6, unit: 'blue', movesLeft: 2 },
  // Red (enemy) units - top row
  { col: 2, row: 0, unit: 'red', movesLeft: 2 },
  { col: 3, row: 0, unit: 'red', movesLeft: 2 },
  { col: 4, row: 0, unit: 'red', movesLeft: 2 },
  { col: 5, row: 0, unit: 'red', movesLeft: 2 },
];

export const ZoneOfControlDemo: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    hexes: INITIAL_UNITS,
    selectedUnit: null,
    currentPlayer: 'blue',
    turnCount: 1,
    gameLog: ['🎯 Control the objective!', '🔵 Blue turn: Move units (1 move each)'],
    winner: null,
  });

  const [hoveredHex, setHoveredHex] = useState<{ col: number; row: number } | null>(null);

  // Flat-top hex with odd-r offset coordinates
  const hexToPixel = (col: number, row: number) => {
    // For flat-top hex: width = sqrt(3) * size, height = 2 * size
    const hexWidth = Math.sqrt(3) * HEX_SIZE;
    const hexHeight = 2 * HEX_SIZE;

    const x = col * hexWidth + (row % 2 === 1 ? hexWidth / 2 : 0) + 80;
    const y = row * hexHeight * 0.75 + 80;

    return { x, y };
  };

  // Get neighbors for flat-top odd-r offset
  const getNeighbors = (col: number, row: number) => {
    const isOddRow = row % 2 === 1;

    if (isOddRow) {
      return [
        { col: col, row: row - 1 },     // N
        { col: col, row: row + 1 },     // S
        { col: col - 1, row: row },     // NW
        { col: col + 1, row: row },     // NE
        { col: col - 1, row: row },     // SW (same as NW for odd)
        { col: col + 1, row: row },     // SE (same as NE for odd)
        { col: col + 1, row: row - 1 }, // Top-right
        { col: col + 1, row: row + 1 }, // Bottom-right
      ];
    } else {
      return [
        { col: col, row: row - 1 },     // N
        { col: col, row: row + 1 },     // S
        { col: col - 1, row: row - 1 }, // Top-left
        { col: col - 1, row: row + 1 }, // Bottom-left
        { col: col + 1, row: row },     // E
        { col: col - 1, row: row },     // W
      ];
    }
  };

  // Proper flat-top hex neighbors
  const getAdjacentHexes = (col: number, row: number) => {
    const isOddRow = row % 2 === 1;
    const neighbors = isOddRow ? [
      { col: col, row: row - 1 },     // Top
      { col: col, row: row + 1 },     // Bottom
      { col: col - 1, row: row },     // Left
      { col: col + 1, row: row },     // Right
      { col: col, row: row - 1 },     // Top-left (same as top)
      { col: col + 1, row: row - 1 }, // Top-right
      { col: col, row: row + 1 },     // Bottom-left (same as bottom)
      { col: col + 1, row: row + 1 }, // Bottom-right
    ] : [
      { col: col, row: row - 1 },     // Top
      { col: col, row: row + 1 },     // Bottom
      { col: col - 1, row: row },     // Left
      { col: col + 1, row: row },     // Right
      { col: col - 1, row: row - 1 }, // Top-left
      { col: col, row: row - 1 },     // Top-right (same as top)
      { col: col - 1, row: row + 1 }, // Bottom-left
      { col: col, row: row + 1 },     // Bottom-right (same as bottom)
    ];

    // Remove duplicates and filter valid
    const unique = neighbors.filter((n, i, arr) =>
      arr.findIndex(x => x.col === n.col && x.row === n.row) === i
    );

    return unique.filter(n =>
      n.col >= 0 && n.col < MAP_COLS && n.row >= 0 && n.row < MAP_ROWS
    );
  };

  const getUnitAt = (col: number, row: number) => {
    return gameState.hexes.find(h => h.col === col && h.row === row);
  };

  const isInEnemyZOC = (col: number, row: number, player: Player): boolean => {
    if (!player) return false;
    const enemyPlayer: Player = player === 'blue' ? 'red' : 'blue';
    const neighbors = getAdjacentHexes(col, row);

    return neighbors.some(neighbor => {
      const unit = getUnitAt(neighbor.col, neighbor.row);
      return unit?.unit === enemyPlayer;
    });
  };

  // Count adjacent friendly units (using specific hex array)
  const countAdjacentFriendlies = (col: number, row: number, player: Player, hexArray: Hex[]): number => {
    const neighbors = getAdjacentHexes(col, row);
    return neighbors.filter(n => {
      const unit = hexArray.find(h => h.col === n.col && h.row === n.row);
      return unit?.unit === player;
    }).length;
  };

  const isValidMove = (fromCol: number, fromRow: number, toCol: number, toRow: number): boolean => {
    const neighbors = getAdjacentHexes(fromCol, fromRow);
    const isAdjacent = neighbors.some(n => n.col === toCol && n.row === toRow);

    if (!isAdjacent) return false;
    if (toCol < 0 || toCol >= MAP_COLS || toRow < 0 || toRow >= MAP_ROWS) return false;

    return true;
  };

  // Check if all current player's units are out of moves
  const shouldAutoEndTurn = (hexes: Hex[], player: Player): boolean => {
    const playerUnits = hexes.filter(h => h.unit === player);
    return playerUnits.length > 0 && playerUnits.every(h => h.movesLeft === 0);
  };

  const autoEndTurn = (hexes: Hex[], log: string[], currentTurn: number): { hexes: Hex[], log: string[], currentPlayer: Player, turnCount: number } => {
    const nextPlayer = gameState.currentPlayer === 'blue' ? 'red' : 'blue';
    const newLog = [...log];
    newLog.push(`⏭️ Turn ended - ${nextPlayer === 'blue' ? '🔵 Blue' : '🔴 Red'} turn`);

    // Reset movesLeft for all units
    const resetHexes = hexes.map(h => ({ ...h, movesLeft: 2 }));

    return {
      hexes: resetHexes,
      log: newLog.slice(-6),
      currentPlayer: nextPlayer,
      turnCount: nextPlayer === 'blue' ? currentTurn + 1 : currentTurn,
    };
  };

  const handleHexClick = (col: number, row: number) => {
    if (gameState.winner) return;

    const clickedUnit = getUnitAt(col, row);

    // Select own unit that has moves left
    if (clickedUnit?.unit === gameState.currentPlayer) {
      if (clickedUnit.movesLeft <= 0) {
        return; // Can't select units with no moves
      }
      setGameState(prev => ({
        ...prev,
        selectedUnit: { col, row },
      }));
      return;
    }

    // Move or attack with selected unit
    if (gameState.selectedUnit) {
      const { col: fromCol, row: fromRow } = gameState.selectedUnit;
      const movingUnit = getUnitAt(fromCol, fromRow);

      if (!movingUnit || movingUnit.movesLeft <= 0) return;

      if (isValidMove(fromCol, fromRow, col, row)) {
        const targetUnit = getUnitAt(col, row);
        const inZOC = isInEnemyZOC(col, row, gameState.currentPlayer);

        let newHexes = gameState.hexes.filter(h => !(h.col === fromCol && h.row === fromRow));
        const newLog = [...gameState.gameLog];
        let turnEnded = false;

        // Combat: need 2+ units adjacent to kill
        if (targetUnit && targetUnit.unit !== gameState.currentPlayer) {
          // Count friendlies AFTER removing the moving unit (so we don't count it twice)
          const adjacentFriendlies = countAdjacentFriendlies(col, row, gameState.currentPlayer, newHexes);

          if (adjacentFriendlies >= 1) { // Moving unit + 1 already there = 2 total
            newHexes = newHexes.filter(h => !(h.col === col && h.row === row));
            newHexes.push({ col, row, unit: gameState.currentPlayer, movesLeft: 0 });
            newLog.push(`${gameState.currentPlayer === 'blue' ? '🔵' : '🔴'} eliminated enemy! (2+ units)`);
            turnEnded = true; // Attacking ends turn
          } else {
            newLog.push(`❌ Need 2+ units adjacent to attack!`);
            setGameState(prev => ({
              ...prev,
              gameLog: newLog.slice(-6),
            }));
            return;
          }
        } else {
          // Normal move - ZOC stops movement!
          const newMovesLeft = inZOC ? 0 : movingUnit.movesLeft - 1;
          newHexes.push({ col, row, unit: gameState.currentPlayer, movesLeft: newMovesLeft });
          if (inZOC) {
            newLog.push(`${gameState.currentPlayer === 'blue' ? '🔵' : '🔴'} entered ZOC - STOPPED!`);
          } else {
            newLog.push(`${gameState.currentPlayer === 'blue' ? '🔵' : '🔴'} moved (${newMovesLeft} left)`);
          }
        }

        // Check if objective is controlled (don't end game)
        const isObjective = col === OBJECTIVE.col && row === OBJECTIVE.row;
        if (isObjective) {
          newLog.push(`🎯 ${gameState.currentPlayer === 'blue' ? 'Blue' : 'Red'} controls objective!`);
        }

        // Check elimination victory
        const blueUnits = newHexes.filter(h => h.unit === 'blue').length;
        const redUnits = newHexes.filter(h => h.unit === 'red').length;
        let winner: Player = null;
        if (blueUnits === 0) {
          winner = 'red';
          newLog.push('🎉 RED WINS! All blue eliminated!');
        } else if (redUnits === 0) {
          winner = 'blue';
          newLog.push('🎉 BLUE WINS! All red eliminated!');
        }

        // Check if turn should auto-end
        if (turnEnded || shouldAutoEndTurn(newHexes, gameState.currentPlayer)) {
          const endTurnResult = autoEndTurn(newHexes, newLog, gameState.turnCount);
          setGameState({
            hexes: endTurnResult.hexes,
            selectedUnit: null,
            currentPlayer: endTurnResult.currentPlayer,
            turnCount: endTurnResult.turnCount,
            gameLog: endTurnResult.log,
            winner,
          });
        } else {
          setGameState({
            hexes: newHexes,
            selectedUnit: null,
            currentPlayer: gameState.currentPlayer,
            turnCount: gameState.turnCount,
            gameLog: newLog.slice(-6),
            winner,
          });
        }
      }
    }
  };

  const resetGame = () => {
    setGameState({
      hexes: INITIAL_UNITS,
      selectedUnit: null,
      currentPlayer: 'blue',
      turnCount: 1,
      gameLog: ['🎯 Control the objective!', '🔵 Blue turn: 2 moves per unit'],
      winner: null,
    });
  };

  // Flat-top hexagon points
  const getHexPoints = (x: number, y: number) => {
    const points = [];
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i + (Math.PI / 6); // +30° for flat-top
      const px = x + HEX_SIZE * Math.cos(angle);
      const py = y + HEX_SIZE * Math.sin(angle);
      points.push(`${px},${py}`);
    }
    return points.join(' ');
  };

  const renderHex = (col: number, row: number) => {
    const { x, y } = hexToPixel(col, row);
    const unit = getUnitAt(col, row);
    const isSelected = gameState.selectedUnit?.col === col && gameState.selectedUnit?.row === row;
    const isHovered = hoveredHex?.col === col && hoveredHex?.row === row;
    const isObjective = col === OBJECTIVE.col && row === OBJECTIVE.row;
    const objectiveControl = isObjective && unit ? unit.unit : null;
    const inZOC = !unit && isInEnemyZOC(col, row, gameState.currentPlayer);

    let fillColor = '#1a1a1a';
    if (isObjective && !unit) fillColor = '#2a2a0a';
    if (isObjective && objectiveControl === 'blue') fillColor = '#1a4a6a';
    if (isObjective && objectiveControl === 'red') fillColor = '#6a1a1a';
    if (unit?.unit === 'blue' && !isObjective) fillColor = '#1a3a5a';
    if (unit?.unit === 'red' && !isObjective) fillColor = '#5a1a1a';
    if (isSelected) fillColor = '#2a5a2a';

    let strokeColor = isObjective ? '#d4a564' : '#3d5a80';
    let strokeWidth = isObjective ? 2 : 1;
    if (isSelected) {
      strokeColor = '#4a9fb8';
      strokeWidth = 3;
    }
    if (isHovered) strokeWidth = 2;

    return (
      <g key={`${col}-${row}`}>
        <polygon
          points={getHexPoints(x, y)}
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          className="cursor-pointer transition-all"
          onClick={() => handleHexClick(col, row)}
          onMouseEnter={() => setHoveredHex({ col, row })}
          onMouseLeave={() => setHoveredHex(null)}
          opacity={0.9}
        />

        {/* ZOC indicator */}
        {inZOC && (
          <circle cx={x} cy={y} r={8} fill="#d4a564" opacity={0.3} />
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
              opacity={unit.movesLeft === 0 ? 0.4 : 1}
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
            {/* Show moves left */}
            {unit.movesLeft > 0 && (
              <circle cx={x + 12} cy={y - 8} r={5} fill="#4a9fb8" opacity={0.8}>
                <title>{unit.movesLeft} moves left</title>
              </circle>
            )}
            {unit.movesLeft > 0 && (
              <text x={x + 12} y={y - 6} textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">
                {unit.movesLeft}
              </text>
            )}
          </g>
        )}

        {/* Objective marker */}
        {isObjective && (
          <text x={x} y={y - 28} textAnchor="middle" fontSize="16" opacity={0.8}>
            🎯
          </text>
        )}
      </g>
    );
  };

  const objControl = getUnitAt(OBJECTIVE.col, OBJECTIVE.row);

  return (
    <Card className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        <div>
          <svg width="600" height="560" className="bg-background-tertiary border border-tactical-cyan/20">
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

        <div className="space-y-4">
          <div className="bg-background-secondary p-4 border border-tactical-cyan/20">
            <div className="text-sm font-mono uppercase tracking-wider text-tactical-cyan mb-2">
              Status
            </div>
            <div className="space-y-2 text-sm">
              <div>Turn: {gameState.turnCount}</div>
              <div className={gameState.currentPlayer === 'blue' ? 'text-tactical-cyan font-bold' : ''}>
                {gameState.currentPlayer === 'blue' ? '🔵 Blue' : '🔴 Red'}
              </div>
              <div>Blue: {gameState.hexes.filter(h => h.unit === 'blue').length}</div>
              <div>Red: {gameState.hexes.filter(h => h.unit === 'red').length}</div>
              <div className="text-tactical-amber">
                🎯 {objControl ? `${objControl.unit === 'blue' ? 'Blue' : 'Red'} controls` : 'Contested'}
              </div>
            </div>
          </div>

          <div className="bg-background-secondary p-4 border border-tactical-amber/20">
            <div className="text-sm font-mono uppercase tracking-wider text-tactical-amber mb-2">
              Rules
            </div>
            <ul className="text-xs space-y-2 text-muted">
              <li>• Each unit gets <strong className="text-tactical-cyan">2 moves</strong> per turn</li>
              <li>• <strong className="text-tactical-amber">ZOC: Entering enemy zone STOPS movement</strong></li>
              <li>• Enemy zones shown with amber dots</li>
              <li>• <strong>Combat: Need 2+ units to kill</strong></li>
              <li>• Turn auto-ends when all units used or combat</li>
              <li>• <strong className="text-tactical-cyan">Victory:</strong> Eliminate all enemies</li>
            </ul>
          </div>

          <div className="bg-background-tertiary p-3 border-l-2 border-tactical-cyan">
            <div className="text-xs font-mono uppercase tracking-wider text-tactical-cyan mb-2">
              Log
            </div>
            <div className="space-y-1 text-xs text-muted font-mono">
              {gameState.gameLog.map((log, i) => (
                <div key={i}>{log}</div>
              ))}
            </div>
          </div>

          <div className="bg-background-secondary p-3 text-xs text-muted">
            <strong className="text-tactical-cyan">Teaches:</strong> ZOC creates front lines. Force concentration (2+ units) needed to attack. Objective control is contested, not instant victory.
          </div>
        </div>
      </div>
    </Card>
  );
};
