'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui';

interface HexCell {
  q: number;
  r: number;
  terrain: 'plains' | 'hills' | 'water' | 'forest';
  controlled: 'player' | 'enemy' | 'neutral';
  unit: number;
  objective?: boolean;
  label?: string;
}

interface EnemyMove {
  origin: HexCell;
  target: HexCell;
}

const TERRAIN_COLORS = {
  plains: '#2a3a2a',
  hills: '#4a4a3a',
  water: '#1a3a4a',
  forest: '#1a3a1a',
};

const CONTROL_COLORS = {
  player: 'rgba(74, 159, 184, 0.5)',
  enemy: 'rgba(212, 165, 100, 0.5)',
  neutral: 'rgba(110, 118, 126, 0.24)',
};

const TERRAIN_DEFENSE = {
  plains: 0,
  hills: 1,
  water: -99,
  forest: 2,
};

const terrainForHex = (q: number, r: number): HexCell['terrain'] => {
  const signature = Math.abs(q * 7 + r * 11 + q * r);
  if (signature % 9 === 0) return 'water';
  if (signature % 4 === 0) return 'forest';
  if (signature % 3 === 0) return 'hills';
  return 'plains';
};

const createInitialGrid = (): HexCell[] => {
  const radius = 3;
  const cells: HexCell[] = [];
  const scenario = new Map<string, Partial<HexCell>>([
    ['-2,1', { controlled: 'player', unit: 2, label: 'Lead' }],
    ['-3,2', { controlled: 'player', unit: 1, label: 'Reserve' }],
    ['-1,2', { controlled: 'player', unit: 1, objective: true, label: 'Base' }],
    ['0,0', { controlled: 'neutral', unit: 0, objective: true, label: 'Relay' }],
    ['1,0', { controlled: 'enemy', unit: 2, label: 'Screen' }],
    ['2,0', { controlled: 'enemy', unit: 1, objective: true, label: 'Node' }],
    ['2,-1', { controlled: 'enemy', unit: 1, label: 'Spear' }],
    ['1,2', { controlled: 'enemy', unit: 1, label: 'High Pt' }],
    ['0,1', { controlled: 'neutral', unit: 1, label: 'Ridge' }],
    ['0,-1', { controlled: 'neutral', unit: 1, label: 'Woods' }],
    ['-1,-1', { controlled: 'neutral', unit: 0, label: 'Overwatch' }],
    ['1,1', { controlled: 'neutral', unit: 0, label: 'Gap' }],
    ['-1,3', { controlled: 'neutral', unit: 0, label: 'Road' }],
    ['-2,3', { controlled: 'neutral', unit: 0, label: 'Tree Line' }],
    ['3,-1', { controlled: 'enemy', unit: 1, label: 'Flank' }],
    ['-3,1', { controlled: 'neutral', unit: 0, label: 'Track' }],
  ]);

  for (let q = -radius; q <= radius; q++) {
    for (let r = -radius; r <= radius; r++) {
      if (Math.abs(q + r) > radius) continue;
      const key = `${q},${r}`;
      const overrides = scenario.get(key);
      cells.push({
        q,
        r,
        terrain: overrides?.terrain ?? terrainForHex(q, r),
        controlled: overrides?.controlled ?? 'neutral',
        unit: overrides?.unit ?? 0,
        objective: overrides?.objective,
        label: overrides?.label,
      });
    }
  }

  return cells.map(cell => {
    if (cell.label === 'Base') return { ...cell, terrain: 'plains' };
    if (cell.label === 'Relay') return { ...cell, terrain: 'plains' };
    if (cell.label === 'Node') return { ...cell, terrain: 'hills' };
    if (cell.label === 'Screen') return { ...cell, terrain: 'forest' };
    if (cell.label === 'Woods') return { ...cell, terrain: 'forest' };
    if (cell.label === 'Ridge' || cell.label === 'High Pt' || cell.label === 'Overwatch') {
      return { ...cell, terrain: 'hills' };
    }
    if (cell.q === 1 && cell.r === -1) return { ...cell, terrain: 'water', label: 'River' };
    if (cell.q === 2 && cell.r === -2) return { ...cell, terrain: 'water', label: 'Marsh' };
    return cell;
  });
};

export const HexGridMap: React.FC = () => {
  const [grid, setGrid] = useState<HexCell[]>(() => createInitialGrid());
  const [selectedHex, setSelectedHex] = useState<{ q: number; r: number } | null>(null);
  const [turn, setTurn] = useState<'player' | 'enemy'>('player');
  const [actionsLeft, setActionsLeft] = useState(3);
  const [round, setRound] = useState(1);
  const [reservePoints, setReservePoints] = useState(2);
  const [log, setLog] = useState<string[]>(['Advance on the objective network and deny enemy control.']);
  const [status, setStatus] = useState('Select a blue unit, then move, attack, or reinforce to build local superiority.');
  const [gameOver, setGameOver] = useState(false);

  const addLog = (entry: string) => {
    setLog(prev => [...prev.slice(-5), entry]);
  };

  const getCell = (q: number, r: number) => grid.find(cell => cell.q === q && cell.r === r);

  const getNeighbors = (q: number, r: number) => [
    [q + 1, r],
    [q - 1, r],
    [q, r + 1],
    [q, r - 1],
    [q + 1, r - 1],
    [q - 1, r + 1],
  ];

  const isAdjacent = (from: { q: number; r: number }, to: { q: number; r: number }) =>
    getNeighbors(from.q, from.r).some(([q, r]) => q === to.q && r === to.r);

  const objectiveCount = (owner: 'player' | 'enemy') =>
    grid.filter(cell => cell.objective && cell.controlled === owner).length;

  const startPlayerPhase = (cells: HexCell[]) => {
    const income = 1 + cells.filter(cell => cell.objective && cell.controlled === 'player').length;
    setTurn('player');
    setActionsLeft(3);
    setReservePoints(prev => prev + income);
    setRound(prev => prev + 1);
  };

  const chooseEnemyMove = (cells: HexCell[]): EnemyMove | null => {
    const enemyCells = cells.filter(cell => cell.controlled === 'enemy' && cell.unit > 0);
    let bestMove: EnemyMove | null = null;
    let bestScore = -Infinity;

    enemyCells.forEach(origin => {
      getNeighbors(origin.q, origin.r).forEach(([q, r]) => {
        const target = cells.find(cell => cell.q === q && cell.r === r);
        if (!target || target.terrain === 'water' || target.controlled === 'enemy') {
          return;
        }

        const score =
          (target.objective ? 4 : 0) +
          (target.controlled === 'player' ? 3 : 1) +
          (target.unit === 0 ? 1 : 0) -
          TERRAIN_DEFENSE[target.terrain];

        if (score > bestScore) {
          bestScore = score;
          bestMove = { origin, target };
        }
      });
    });

    return bestMove;
  };

  const endPlayerAction = () => {
    setActionsLeft(prev => {
      const next = prev - 1;
      if (next <= 0) {
        window.setTimeout(() => runEnemyTurn(), 550);
      }
      return next;
    });
  };

  const evaluateVictory = (nextGrid: HexCell[]) => {
    const playerObjectives = nextGrid.filter(cell => cell.objective && cell.controlled === 'player').length;
    const enemyObjectives = nextGrid.filter(cell => cell.objective && cell.controlled === 'enemy').length;
    const playerUnits = nextGrid.filter(cell => cell.controlled === 'player' && cell.unit > 0).length;
    const enemyUnits = nextGrid.filter(cell => cell.controlled === 'enemy' && cell.unit > 0).length;

    if (playerObjectives >= 2 || enemyUnits === 0) {
      setGameOver(true);
      setStatus('Victory. You seized the objective network and collapsed the enemy screen.');
      addLog('Mission success: player controls the decisive ground.');
      return true;
    }

    if (enemyObjectives >= 2 || playerUnits === 0) {
      setGameOver(true);
      setStatus('Defeat. Enemy retained the network and your force lost tempo.');
      addLog('Mission failed: enemy holds the decisive ground.');
      return true;
    }

    return false;
  };

  const hexToPixel = (q: number, r: number, size: number) => {
    const x = size * (3/2 * q);
    const y = size * (Math.sqrt(3)/2 * q + Math.sqrt(3) * r);
    return { x, y };
  };

  const handleHexClick = (q: number, r: number) => {
    if (turn !== 'player' || gameOver) {
      return;
    }

    const cell = getCell(q, r);
    if (!cell || cell.terrain === 'water') {
      return;
    }

    if (!selectedHex) {
      if (cell.controlled === 'player' && cell.unit > 0) {
        setSelectedHex({ q, r });
        setStatus(`Selected ${cell.label ?? `${q},${r}`}. Maneuver or attack an adjacent hex.`);
      } else {
        addLog('Select a friendly occupied hex first.');
      }
      return;
    }

    if (selectedHex.q === q && selectedHex.r === r) {
      setSelectedHex(null);
      setStatus('Selection cleared.');
      return;
    }

    if (!isAdjacent(selectedHex, { q, r })) {
      addLog('Orders invalid: target hex is not adjacent.');
      return;
    }

    const origin = getCell(selectedHex.q, selectedHex.r);
    if (!origin || origin.unit <= 0) {
      setSelectedHex(null);
      return;
    }

    if (cell.controlled === 'player') {
      if (origin.unit <= 1) {
        addLog('Keep at least one unit in the origin hex or reinforce before pushing forward.');
        return;
      }
      const nextGrid = grid.map(entry => {
        if (entry.q === origin.q && entry.r === origin.r) {
          return { ...entry, unit: Math.max(0, entry.unit - 1) };
        }
        if (entry.q === cell.q && entry.r === cell.r) {
          return { ...entry, unit: entry.unit + 1 };
        }
        return entry;
      });
      setGrid(nextGrid);
      setSelectedHex(null);
      addLog(`Reinforced ${cell.label ?? `${q},${r}`}.`);
      setStatus('Force shifted forward. Use concentration to prepare a decisive attack.');
      endPlayerAction();
      return;
    }

    if (cell.controlled === 'neutral' && cell.unit === 0) {
      if (origin.unit <= 1) {
        addLog('You need spare strength to occupy new ground.');
        return;
      }
      const nextGrid = grid.map(entry => {
        if (entry.q === origin.q && entry.r === origin.r) {
          return { ...entry, unit: Math.max(0, entry.unit - 1) };
        }
        if (entry.q === cell.q && entry.r === cell.r) {
          return { ...entry, controlled: 'player' as const, unit: 1 };
        }
        return entry;
      });
      setGrid(nextGrid);
      setSelectedHex(null);
      addLog(`Advanced into ${cell.label ?? `${q},${r}`}.`);
      setStatus('Ground taken. Objectives matter more than empty space.');
      evaluateVictory(nextGrid);
      endPlayerAction();
      return;
    }

    const attackPower = origin.unit + 1;
    const defensePower = Math.max(1, cell.unit + TERRAIN_DEFENSE[cell.terrain]);
    const attackerWins = attackPower >= defensePower;

    const nextGrid = grid.map(entry => {
      if (entry.q === origin.q && entry.r === origin.r) {
        return { ...entry, unit: Math.max(0, entry.unit - 1) };
      }
      if (entry.q === cell.q && entry.r === cell.r) {
        if (attackerWins) {
          return {
            ...entry,
            controlled: 'player' as const,
            unit: Math.max(1, origin.unit - 1),
          };
        }

        return {
          ...entry,
          unit: Math.max(1, entry.unit - 1),
        };
      }
      return entry;
    });

    setGrid(nextGrid);
    setSelectedHex(null);
    if (attackerWins) {
      addLog(`Attack succeeded at ${cell.label ?? `${q},${r}`}.`);
      setStatus('Assault successful. Press the objective line before the enemy recovers.');
    } else {
      addLog(`Attack repulsed at ${cell.label ?? `${q},${r}`}.`);
      setStatus('The defense held. Build odds before attacking prepared terrain.');
    }
    evaluateVictory(nextGrid);
    endPlayerAction();
  };

  const reinforceSelected = () => {
    if (turn !== 'player' || gameOver || !selectedHex) {
      return;
    }

    if (reservePoints <= 0) {
      addLog('No reserve points available. Hold objectives to generate more.');
      return;
    }

    const selectedCell = getCell(selectedHex.q, selectedHex.r);
    if (!selectedCell || selectedCell.controlled !== 'player') {
      addLog('Select a friendly hex to reinforce.');
      return;
    }

    setGrid(prev =>
      prev.map(cell =>
        cell.q === selectedHex.q && cell.r === selectedHex.r
          ? { ...cell, unit: cell.unit + 1 }
          : cell
      )
    );
    setReservePoints(prev => prev - 1);
    addLog(`Reinforced ${selectedCell.label ?? `${selectedHex.q},${selectedHex.r}`}.`);
    setStatus('Reserve converted into combat power. Build odds before attacking terrain.');
    endPlayerAction();
  };

  const runEnemyTurn = () => {
    setTurn('enemy');
    setSelectedHex(null);
    setStatus('Enemy phase: opposing forces are repositioning.');

    window.setTimeout(() => {
      setGrid(prevGrid => {
        const enemyCells = prevGrid.filter(cell => cell.controlled === 'enemy' && cell.unit > 0);
        const playerObjectives = prevGrid.filter(cell => cell.objective && cell.controlled !== 'enemy');

        if (enemyCells.length === 0) {
          startPlayerPhase(prevGrid);
          return prevGrid;
        }

        const bestMove = chooseEnemyMove(prevGrid);

        if (!bestMove) {
          addLog('Enemy holds position and probes for openings.');
          startPlayerPhase(prevGrid);
          setStatus('Your phase. Select a unit and continue the assault.');
          return prevGrid;
        }

        const { origin: enemyOrigin, target: enemyTarget } = bestMove;

        const attackPower = enemyOrigin.unit + 1;
        const defensePower = Math.max(1, enemyTarget.unit + TERRAIN_DEFENSE[enemyTarget.terrain]);
        const enemyWins = attackPower >= defensePower;

        const nextGrid = prevGrid.map(entry => {
          if (entry.q === enemyOrigin.q && entry.r === enemyOrigin.r) {
            return { ...entry, unit: Math.max(0, entry.unit - 1) };
          }
          if (entry.q === enemyTarget.q && entry.r === enemyTarget.r) {
            if (enemyWins) {
              return {
                ...entry,
                controlled: 'enemy' as const,
                unit: Math.max(1, enemyOrigin.unit - 1),
              };
            }

            return {
              ...entry,
              unit: Math.max(1, entry.unit - 1),
            };
          }
          return entry;
        });

        addLog(
          enemyWins
            ? `Enemy seized ${enemyTarget.label ?? `${enemyTarget.q},${enemyTarget.r}`}.`
            : `Enemy attack stalled at ${enemyTarget.label ?? `${enemyTarget.q},${enemyTarget.r}`}.`
        );

        if (!evaluateVictory(nextGrid)) {
          const enemyObjectivePressure = playerObjectives.length <= 1
            ? 'Enemy pressure is mounting on the center.'
            : 'Enemy is testing your flanks.';
          setStatus(`Your phase. ${enemyObjectivePressure}`);
        }

        startPlayerPhase(nextGrid);
        return nextGrid;
      });
    }, 700);
  };

  const resetScenario = () => {
    setGrid(createInitialGrid());
    setSelectedHex(null);
    setTurn('player');
    setActionsLeft(3);
    setRound(1);
    setReservePoints(2);
    setLog(['Advance on the objective network and deny enemy control.']);
    setStatus('Select a blue unit, then move, attack, or reinforce to build local superiority.');
    setGameOver(false);
  };

  const size = 22;
  const centerX = 300;
  const centerY = 300;

  const hexPoints = (cx: number, cy: number, size: number) => {
    const points = [];
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i;
      const x = cx + size * Math.cos(angle);
      const y = cy + size * Math.sin(angle);
      points.push(`${x},${y}`);
    }
    return points.join(' ');
  };

  return (
    <div className="bg-background-secondary border border-tactical-cyan/30 p-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-mono text-tactical-cyan uppercase tracking-wider mb-2">
            Tactical Hex Skirmish
          </h3>
          <p className="text-xs text-muted">Two actions per round. Maneuver, attack, and seize the objective network.</p>
        </div>
        <div className="font-mono text-sm text-right">
          <div>
            <span className="text-muted">Turn: </span>
            <span className={turn === 'player' ? 'text-tactical-cyan' : 'text-tactical-amber'}>
              {turn.toUpperCase()}
            </span>
          </div>
          <div className="text-xs text-muted">Round {round} | Actions {actionsLeft}</div>
          <div className="text-xs text-muted">Reserve {reservePoints}</div>
        </div>
      </div>

      <div className="mb-4 border border-tactical-cyan/20 bg-background px-3 py-2 text-xs text-muted min-h-14 flex items-center">
        {status}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.14fr)_minmax(300px,0.86fr)] gap-5 items-start">
        <svg
          viewBox="0 0 600 600"
          className="border border-tactical-blue/20 bg-background w-full h-auto max-w-[680px] mx-auto xl:mx-0"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Grid lines */}
          <defs>
            <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(74, 159, 184, 0.1)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#smallGrid)" />

          {/* Hexes */}
          {grid.map((cell, index) => {
            const { x, y } = hexToPixel(cell.q, cell.r, size);
            const isSelected = selectedHex?.q === cell.q && selectedHex?.r === cell.r;
            const animationDelay = (index % 10) * 0.04;

            return (
              <motion.g
                key={`${cell.q},${cell.r}`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: animationDelay }}
              >
                <polygon
                  points={hexPoints(centerX + x, centerY + y, size)}
                  fill={cell.controlled !== 'neutral' ? CONTROL_COLORS[cell.controlled] : TERRAIN_COLORS[cell.terrain]}
                  stroke={isSelected ? '#00d9ff' : 'rgba(74, 159, 184, 0.3)'}
                  strokeWidth={isSelected ? '2' : '1'}
                  onClick={() => handleHexClick(cell.q, cell.r)}
                  className="cursor-pointer transition-all hover:stroke-tactical-cyan-bright hover:stroke-2"
                  style={{ transition: 'all 0.2s' }}
                />

                {/* Coordinate label */}
                <text
                  x={centerX + x}
                  y={centerY + y}
                  fontSize="8"
                  fill="rgba(232, 232, 232, 0.3)"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="pointer-events-none font-mono"
                >
                  {cell.unit > 0 ? cell.unit : `${cell.q},${cell.r}`}
                </text>

                {cell.objective && (
                  <circle
                    cx={centerX + x}
                    cy={centerY + y}
                    r="7"
                    fill="none"
                    stroke="rgba(212,165,100,0.85)"
                    strokeWidth="1.2"
                    strokeDasharray="2 3"
                    className="pointer-events-none"
                  />
                )}
              </motion.g>
            );
          })}

          {/* Center crosshair */}
          <line x1={centerX - 10} y1={centerY} x2={centerX + 10} y2={centerY} stroke="rgba(74, 159, 184, 0.5)" strokeWidth="1" />
          <line x1={centerX} y1={centerY - 10} x2={centerX} y2={centerY + 10} stroke="rgba(74, 159, 184, 0.5)" strokeWidth="1" />
        </svg>

        {/* Legend */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-tactical-cyan/30 p-3 bg-background">
            <h4 className="font-mono text-xs uppercase tracking-wider text-tactical-cyan mb-2">Mechanic Demonstrated</h4>
            <div className="space-y-2 text-xs text-muted">
              <p>This demo is about <span className="text-foreground font-semibold">hex adjacency, terrain friction, local superiority, and initiative</span>.</p>
              <p>You get three actions and reserve points each round. Every move should improve your local odds or secure an objective before the enemy phase begins.</p>
            </div>
          </div>

          <div className="border border-tactical-cyan/30 p-3 bg-background">
            <h4 className="font-mono text-xs uppercase tracking-wider text-tactical-cyan mb-2">Scenario</h4>
            <div className="space-y-1 text-xs text-muted">
              <div>Player objectives: <span className="text-tactical-cyan font-mono">{objectiveCount('player')}</span></div>
              <div>Enemy objectives: <span className="text-tactical-amber font-mono">{objectiveCount('enemy')}</span></div>
              <div>Reserve available: <span className="text-tactical-cyan font-mono">{reservePoints}</span></div>
              <div>Win by holding 2 objectives or eliminating enemy forces.</div>
            </div>
          </div>

          <div className="border border-tactical-cyan/30 p-3 bg-background">
            <h4 className="font-mono text-xs uppercase tracking-wider text-tactical-cyan mb-2">Terrain</h4>
            <div className="space-y-1 text-xs">
              {Object.entries(TERRAIN_COLORS).map(([terrain, color]) => (
                <div key={terrain} className="flex items-center gap-2">
                  <div className="w-4 h-4 border border-tactical-cyan/30" style={{ backgroundColor: color }} />
                  <span className="text-muted capitalize">{terrain}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-tactical-cyan/30 p-3 bg-background">
            <h4 className="font-mono text-xs uppercase tracking-wider text-tactical-cyan mb-2">Control</h4>
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border border-tactical-cyan" style={{ backgroundColor: CONTROL_COLORS.player }} />
                <span className="text-muted">Player</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border border-tactical-amber" style={{ backgroundColor: CONTROL_COLORS.enemy }} />
                <span className="text-muted">Enemy</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border border-muted/50" style={{ backgroundColor: CONTROL_COLORS.neutral }} />
                <span className="text-muted">Neutral</span>
              </div>
            </div>
          </div>

          {selectedHex && (
            <div className="border border-tactical-cyan/30 p-2 min-h-[92px]">
              <h4 className="font-mono text-xs uppercase tracking-wider text-tactical-cyan mb-1">Selected</h4>
              <div className="text-xs text-muted space-y-0.5">
                <div>Coords: [{selectedHex.q}, {selectedHex.r}]</div>
                <div>
                  Terrain: {grid.find(c => c.q === selectedHex.q && c.r === selectedHex.r)?.terrain}
                </div>
                <div>
                  Label: {grid.find(c => c.q === selectedHex.q && c.r === selectedHex.r)?.label}
                </div>
              </div>
            </div>
          )}

          <div className="border border-tactical-cyan/30 p-3 bg-background min-h-[220px] md:col-span-2">
            <h4 className="font-mono text-xs uppercase tracking-wider text-tactical-cyan mb-2">Action Log</h4>
            <div className="space-y-1 text-xs text-muted font-mono">
              {log.map((entry, index) => (
                <div key={`${entry}-${index}`}>{entry}</div>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 flex flex-col sm:flex-row gap-3">
            <Button onClick={reinforceSelected} variant="primary" size="sm" disabled={turn !== 'player' || !selectedHex || reservePoints <= 0}>
              Reinforce Selected
            </Button>
            <Button onClick={turn === 'player' ? runEnemyTurn : resetScenario} variant={turn === 'player' ? 'outline' : 'primary'} size="sm">
              {turn === 'player' ? 'Force End Phase' : 'Reset Scenario'}
            </Button>
            {!gameOver && turn === 'player' && (
              <Button onClick={resetScenario} variant="outline" size="sm">
                Reset Scenario
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
