import React from 'react';

export interface TacticalDividerProps {
  variant?: 'gradient' | 'dashed' | 'dotted' | 'coordinates';
  className?: string;
}

export const TacticalDivider: React.FC<TacticalDividerProps> = ({
  variant = 'gradient',
  className = '',
}) => {
  if (variant === 'gradient') {
    return <div className={`tactical-divider my-8 ${className}`} />;
  }

  if (variant === 'dashed') {
    return (
      <div className={`my-8 border-t border-dashed border-tactical-cyan/30 ${className}`} />
    );
  }

  if (variant === 'dotted') {
    return (
      <div className={`my-8 border-t border-dotted border-tactical-cyan/30 ${className}`} />
    );
  }

  if (variant === 'coordinates') {
    return (
      <div className={`relative my-8 h-px bg-tactical-cyan/20 ${className}`}>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 font-mono text-xs text-tactical-cyan/50 bg-background px-2">
          [SECTOR-A]
        </div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 font-mono text-xs text-tactical-cyan/50 bg-background px-2">
          [SECTOR-B]
        </div>
      </div>
    );
  }

  return null;
};
