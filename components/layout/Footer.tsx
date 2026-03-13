import React from 'react';
import Link from 'next/link';
import { TacticalDivider } from '../ui';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  type FooterLink = {
    label: string;
    href: string;
    external?: boolean;
  };

  const footerSections: Array<{ title: string; links: FooterLink[] }> = [
    {
      title: 'Institute',
      links: [
        { label: 'About', href: '/about' },
        { label: 'Research', href: '/research' },
        { label: 'Education', href: '/education' },
        { label: 'Projects', href: '/projects' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Case Studies', href: '/case-studies' },
        { label: 'Library', href: '/resources' },
        { label: 'Blog', href: '/blog' },
      ],
    },
    {
      title: 'Connect',
      links: [
        { label: 'Contact', href: '/contact' },
        { label: 'Email', href: 'mailto:contact@wargames.institute' },
      ],
    },
  ];

  return (
    <footer className="relative bg-background-secondary border-t border-tactical-cyan/20 mt-20">
      {/* Tactical grid background */}
      <div className="absolute inset-0 tactical-grid opacity-10 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Branding Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 border-2 border-tactical-cyan relative flex items-center justify-center">
                <div className="w-4 h-4 relative">
                  <div className="absolute top-1/2 left-0 w-full h-px bg-tactical-cyan" />
                  <div className="absolute top-0 left-1/2 w-px h-full bg-tactical-cyan" />
                  <div className="absolute top-1/2 left-1/2 w-1 h-1 -translate-x-1/2 -translate-y-1/2 border border-tactical-cyan" />
                </div>
              </div>
              <div className="font-mono text-sm font-bold uppercase tracking-wider">
                Wargames<span className="text-tactical-cyan">.</span>Institute
              </div>
            </div>
            <p className="text-sm text-muted mb-4">
              Teaching how wargames work, what they teach, and how playable models can illuminate real-world problems.
            </p>
            <div className="font-mono text-xs text-muted/50">
              CLASSIFICATION: PUBLIC
              <br />
              STATUS: OPERATIONAL
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-mono text-sm uppercase tracking-wider text-tactical-cyan mb-4 border-b border-tactical-cyan/20 pb-2">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted hover:text-foreground hover:translate-x-1 inline-block transition-all"
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                    >
                      <span className="mr-2 text-tactical-cyan">&gt;</span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <TacticalDivider variant="gradient" className="my-0" />

        {/* Bottom Bar */}
        <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted">
          <div className="font-mono">
            &copy; {currentYear} Wargames.Institute. All systems operational.
          </div>

          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>

          <div className="font-mono text-xs text-muted/50">
            BUILD: v1.0.0 | {new Date().toISOString().split('T')[0]}
          </div>
        </div>
      </div>

      {/* Tactical status bar */}
      <div className="h-1 bg-gradient-to-r from-tactical-blue via-tactical-cyan to-tactical-blue opacity-50" />
    </footer>
  );
};
