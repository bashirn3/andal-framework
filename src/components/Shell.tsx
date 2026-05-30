import type { ReactNode } from 'react';
import type { Theme } from '../types';

// Root frame for every screen. Carries the theme so CSS tokens resolve.
export const Shell = ({ children, theme = 'light' }: { children: ReactNode; theme?: Theme }) => (
  <div className="andal" data-theme={theme}>
    {children}
  </div>
);

export const Lockup = () => (
  <div className="a-side__brand">
    <div className="a-logo">A</div>
    <div className="col" style={{ lineHeight: 1.1 }}>
      <div className="a-brand-text">Andal</div>
      <div className="a-brand-sub mono">NCCC · v1.0</div>
    </div>
  </div>
);
