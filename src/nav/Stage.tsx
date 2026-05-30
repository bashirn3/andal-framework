import type { ReactNode } from 'react';

// Full-viewport container. The app frame fills the window (no letterbox);
// this also serves as the positioning context for modal overlays.
export function Stage({ children }: { children: ReactNode }) {
  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'auto' }}>{children}</div>
  );
}
