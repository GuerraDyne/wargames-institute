'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const routes = [
  { id: 'r1', points: '160,140 320,180 430,130 620,210' },
  { id: 'r2', points: '110,360 250,280 420,340 640,300' },
  { id: 'r3', points: '220,500 360,430 520,490 700,420' },
];

const sectors = [
  { id: 's1', x: 120, y: 110, w: 210, h: 140, label: 'SECTOR NORTH' },
  { id: 's2', x: 360, y: 220, w: 240, h: 170, label: 'CENTRAL APPROACH' },
  { id: 's3', x: 180, y: 390, w: 280, h: 150, label: 'SOUTHERN AXIS' },
];

const units = [
  { id: 'u1', x: 210, y: 165, type: 'INF', strength: '3', team: 'player' },
  { id: 'u2', x: 455, y: 152, type: 'ARM', strength: '2', team: 'player' },
  { id: 'u3', x: 305, y: 315, type: 'ART', strength: '1', team: 'neutral' },
  { id: 'u4', x: 565, y: 292, type: 'INF', strength: '3', team: 'enemy' },
  { id: 'u5', x: 405, y: 468, type: 'HQ', strength: '4', team: 'enemy' },
];

const objectives = [
  { id: 'o1', x: 345, y: 170, label: 'OBJ A' },
  { id: 'o2', x: 520, y: 355, label: 'OBJ B' },
  { id: 'o3', x: 255, y: 470, label: 'OBJ C' },
];

const battleZones = [
  { id: 'b1', x: 502, y: 250, radius: 34 },
  { id: 'b2', x: 594, y: 314, radius: 42 },
  { id: 'b3', x: 332, y: 444, radius: 28 },
];

const strikeArcs = [
  { id: 'a1', path: 'M 248 182 Q 352 120 474 188' },
  { id: 'a2', path: 'M 612 280 Q 548 232 472 284' },
  { id: 'a3', path: 'M 266 498 Q 392 386 544 420' },
];

const frontlinePoints = '300,215 360,250 430,262 492,298 566,316 646,362';

export const TacticalMapBackdrop: React.FC = () => {
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width - 0.5) * 24;
        const y = ((event.clientY - rect.top) / rect.height - 0.5) * 24;
        setPointer({ x, y });
      }}
    >
      <div className="absolute inset-0 tactical-map-surface" />
      <div className="absolute inset-0 hex-grid opacity-25" />
      <div className="absolute inset-0 tactical-contours opacity-30" />
      <div className="absolute inset-0 tactical-vignette" />

      <motion.svg
        viewBox="0 0 900 700"
        preserveAspectRatio="xMidYMid slice"
        className="absolute left-1/2 top-1/2 min-w-[1200px] min-h-[100vh] w-[125vw] h-[125vh] -translate-x-1/2 -translate-y-1/2 opacity-90 md:w-[115vw] md:h-[115vh] xl:w-[108vw] xl:h-[108vh]"
        animate={{ x: pointer.x, y: pointer.y }}
        transition={{ type: 'spring', stiffness: 35, damping: 18, mass: 1.2 }}
      >
        <defs>
          <linearGradient id="routeGlow" x1="0%" x2="100%">
            <stop offset="0%" stopColor="rgba(74,159,184,0)" />
            <stop offset="50%" stopColor="rgba(74,159,184,0.75)" />
            <stop offset="100%" stopColor="rgba(74,159,184,0)" />
          </linearGradient>
          <linearGradient id="enemyGlow" x1="0%" x2="100%">
            <stop offset="0%" stopColor="rgba(212,165,100,0)" />
            <stop offset="50%" stopColor="rgba(212,165,100,0.7)" />
            <stop offset="100%" stopColor="rgba(212,165,100,0)" />
          </linearGradient>
          <radialGradient id="blastGlow">
            <stop offset="0%" stopColor="rgba(255,180,90,0.85)" />
            <stop offset="45%" stopColor="rgba(212,165,100,0.38)" />
            <stop offset="100%" stopColor="rgba(212,165,100,0)" />
          </radialGradient>
          <pattern id="microGrid" width="36" height="36" patternUnits="userSpaceOnUse">
            <path d="M 36 0 L 0 0 0 36" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
          </pattern>
        </defs>

        <rect x="0" y="0" width="900" height="700" fill="url(#microGrid)" opacity="0.45" />

        {sectors.map((sector, index) => (
          <g key={sector.id}>
            <motion.rect
              x={sector.x}
              y={sector.y}
              width={sector.w}
              height={sector.h}
              fill="rgba(10, 16, 22, 0.12)"
              stroke="rgba(74, 159, 184, 0.2)"
              strokeWidth="1.5"
              strokeDasharray="8 8"
              animate={{ opacity: [0.24, 0.42, 0.24] }}
              transition={{ duration: 6 + index, repeat: Infinity, ease: 'easeInOut' }}
            />
            <text
              x={sector.x + 14}
              y={sector.y + 24}
              fill="rgba(74, 159, 184, 0.78)"
              fontSize="12"
              fontFamily="var(--font-mono)"
              letterSpacing="2"
            >
              {sector.label}
            </text>
          </g>
        ))}

        {routes.map((route, index) => (
          <g key={route.id}>
            <polyline
              points={route.points}
              fill="none"
              stroke={index === 1 ? 'url(#enemyGlow)' : 'url(#routeGlow)'}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <polyline
              points={route.points}
              fill="none"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="1"
              strokeDasharray="7 9"
            />
          </g>
        ))}

        <polyline
          points={frontlinePoints}
          fill="none"
          stroke="rgba(198,72,72,0.55)"
          strokeWidth="3"
          strokeDasharray="10 10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <polyline
          points={frontlinePoints}
          fill="none"
          stroke="rgba(255,255,255,0.14)"
          strokeWidth="1"
          strokeDasharray="2 16"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {strikeArcs.map((arc, index) => (
          <g key={arc.id}>
            <motion.path
              d={arc.path}
              fill="none"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="1"
              strokeDasharray="5 8"
              animate={{ opacity: [0.1, 0.5, 0.1] }}
              transition={{ duration: 4 + index, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.circle
              r="3.5"
              fill={index === 1 ? 'rgba(212,165,100,0.95)' : 'rgba(74,159,184,0.95)'}
              animate={index === 0 ? { cx: [248, 474], cy: [182, 188] } : index === 1 ? { cx: [612, 472], cy: [280, 284] } : { cx: [266, 544], cy: [498, 420] }}
              transition={{ duration: 2.8 + index * 0.6, repeat: Infinity, ease: 'easeInOut' }}
            />
          </g>
        ))}

        {objectives.map((objective, index) => (
          <g key={objective.id}>
            <motion.circle
              cx={objective.x}
              cy={objective.y}
              r="17"
              fill="rgba(212,165,100,0.08)"
              stroke="rgba(212,165,100,0.85)"
              strokeWidth="1.5"
              animate={{ r: [15, 20, 15], opacity: [0.45, 0.9, 0.45] }}
              transition={{ duration: 3.8 + index, repeat: Infinity, ease: 'easeInOut' }}
            />
            <circle
              cx={objective.x}
              cy={objective.y}
              r="5"
              fill="rgba(212,165,100,0.95)"
            />
            <text
              x={objective.x + 24}
              y={objective.y + 5}
              fill="rgba(212,165,100,0.9)"
              fontSize="12"
              fontFamily="var(--font-mono)"
            >
              {objective.label}
            </text>
          </g>
        ))}

        {battleZones.map((zone, index) => (
          <g key={zone.id}>
            <motion.circle
              cx={zone.x}
              cy={zone.y}
              r={zone.radius}
              fill="url(#blastGlow)"
              animate={{ opacity: [0.18, 0.48, 0.18], scale: [0.88, 1.08, 0.88] }}
              transition={{ duration: 2.2 + index * 0.35, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.circle
              cx={zone.x}
              cy={zone.y}
              r={zone.radius + 14}
              fill="none"
              stroke="rgba(212,165,100,0.42)"
              strokeWidth="1"
              strokeDasharray="4 6"
              animate={{ opacity: [0.18, 0.68, 0.18], scale: [0.78, 1.16, 0.78] }}
              transition={{ duration: 2.9 + index * 0.4, repeat: Infinity, ease: 'easeInOut' }}
            />
          </g>
        ))}

        {units.map((unit, index) => {
          const fill =
            unit.team === 'player'
              ? 'rgba(74,159,184,0.2)'
              : unit.team === 'enemy'
              ? 'rgba(212,165,100,0.2)'
              : 'rgba(180,180,180,0.15)';
          const stroke =
            unit.team === 'player'
              ? 'rgba(74,159,184,0.95)'
              : unit.team === 'enemy'
              ? 'rgba(212,165,100,0.95)'
              : 'rgba(180,180,180,0.65)';

          return (
            <motion.g
              key={unit.id}
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 4 + index * 0.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <rect
                x={unit.x - 28}
                y={unit.y - 18}
                width="56"
                height="36"
                rx="3"
                fill={fill}
                stroke={stroke}
                strokeWidth="1.5"
              />
              <line x1={unit.x - 18} y1={unit.y} x2={unit.x + 18} y2={unit.y} stroke={stroke} strokeWidth="1" />
              <line x1={unit.x} y1={unit.y - 10} x2={unit.x} y2={unit.y + 10} stroke={stroke} strokeWidth="1" />
              <text
                x={unit.x}
                y={unit.y - 22}
                textAnchor="middle"
                fill={stroke}
                fontSize="11"
                fontFamily="var(--font-mono)"
              >
                {unit.type}
              </text>
              <text
                x={unit.x + 18}
                y={unit.y + 14}
                textAnchor="middle"
                fill="rgba(232,232,232,0.88)"
                fontSize="10"
                fontFamily="var(--font-mono)"
              >
                {unit.strength}
              </text>
            </motion.g>
          );
        })}

        {[0, 1, 2, 3, 4, 5].map((index) => (
          <motion.circle
            key={`contact-${index}`}
            cx={140 + index * 112}
            cy={110 + (index % 2) * 56}
            r="2.5"
            fill="rgba(74,159,184,0.88)"
            animate={{ opacity: [0.12, 0.95, 0.12] }}
            transition={{ duration: 1.8 + index * 0.22, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}

        <motion.g
          animate={{ x: [0, 620, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        >
          <rect x="-220" y="0" width="220" height="700" fill="url(#routeGlow)" opacity="0.12" />
        </motion.g>
      </motion.svg>

      <div className="absolute inset-0 tactical-map-fade" />
      <div className="absolute inset-x-[-8%] top-[8%] mx-auto w-[116%] h-[78%] rounded-[2.5rem] border border-tactical-cyan/10 tactical-frame opacity-50 md:inset-x-[-5%] md:w-[110%] md:h-[82%] xl:top-[6%] xl:h-[86%]" />
    </div>
  );
};
