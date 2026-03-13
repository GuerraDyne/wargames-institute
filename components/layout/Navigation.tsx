'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'How Wargames Work', href: '/wargames' },
  { label: 'Research', href: '/research' },
  { label: 'Education', href: '/education' },
  { label: 'Projects', href: '/projects' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Resources', href: '/resources' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export const Navigation: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col lg:flex-row items-stretch lg:items-center gap-1">
      {navItems.map((item, index) => {
        const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

        return (
          <Link
            key={item.href}
            href={item.href}
            className="relative px-4 py-2 font-mono text-sm uppercase tracking-wider transition-colors group w-full lg:w-auto"
          >
            <span
              className={`relative z-10 ${
                isActive ? 'text-tactical-cyan' : 'text-muted hover:text-foreground'
              }`}
            >
              {item.label}
            </span>

            {/* Active indicator */}
            {isActive && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-tactical-cyan"
                layoutId="activeNav"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}

            {/* Hover effect */}
            <div className="absolute inset-0 border border-transparent group-hover:border-tactical-cyan/20 transition-colors" />

            {/* Tactical number */}
            <span className="absolute top-0 right-0 text-[8px] text-muted/30 font-mono">
              {String(index + 1).padStart(2, '0')}
            </span>
          </Link>
        );
      })}
    </nav>
  );
};
