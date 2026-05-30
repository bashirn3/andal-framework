import { useNav } from '../nav/NavContext';
import type { Theme } from '../types';

// Direct-URL guard: shown when a route is requested for a module the
// current role can't access (HTTP 403 analogue).
export const ForbiddenInline = ({
  theme = 'light',
  module = 'this workspace',
}: {
  theme?: Theme;
  module?: string;
}) => {
  const nav = useNav();
  return (
    <div className="andal" data-theme={theme}>
      <div style={{ margin: 'auto', maxWidth: 460, textAlign: 'center', padding: 60 }}>
        <div className="mono" style={{ fontSize: 11, color: 'var(--fg-3)' }}>
          HTTP 403 · /forbidden
        </div>
        <h2 style={{ margin: '12px 0', fontSize: 20, fontWeight: 500 }}>Workspace not available</h2>
        <p style={{ color: 'var(--fg-3)', fontSize: 13.5, margin: '0 0 18px' }}>
          You do not have access to <span className="mono">{module}</span>. Request access from your
          directorate lead.
        </p>
        <button className="a-btn primary" onClick={nav ? () => nav.navigate('/welcome') : undefined}>
          Return to welcome
        </button>
      </div>
    </div>
  );
};
