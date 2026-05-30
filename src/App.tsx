import { useCallback, useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import { ROLES } from './data/roles';
import { NavContext, type ModalId, type NavValue, type Route } from './nav/NavContext';
import { Stage } from './nav/Stage';
import { Router } from './Router';
import { TweaksPanel } from './tweaks/TweaksPanel';
import {
  ApproveUserOverlay,
  ClearSessionOverlay,
  DeleteFileOverlay,
  DisableUserOverlay,
} from './components/modals/Modals';
import type { Accent, Density, ModuleId, RoleId, Theme } from './types';

const WORKSPACE_MODULES: ModuleId[] = ['knowledge', 'coding', 'dialect', 'forensics'];

export default function App() {
  const [role, setRole] = useState<RoleId>('rd');
  const [accent, setAccent] = useState<Accent>('verdant');
  const [density, setDensity] = useState<Density>('comfortable');
  const [route, setRoute] = useState<Route>('/login');
  const [expanded, setExpanded] = useState<Set<ModuleId>>(new Set(['knowledge']));
  const [theme, setTheme] = useState<Theme>('light');
  const [modal, setModal] = useState<ModalId>(null);

  const r = ROLES[role];

  // Apply accent/density to the document root so the CSS overrides resolve.
  useEffect(() => {
    document.documentElement.setAttribute('data-andal-accent', accent);
    document.documentElement.setAttribute('data-andal-density', density);
    document.body.setAttribute('data-andal-accent', accent);
    document.body.setAttribute('data-andal-density', density);
  }, [accent, density]);

  // When the role changes, bounce away from now-forbidden routes and reset
  // modal/expanded state so they match the new identity.
  useEffect(() => {
    setRoute((current) => {
      const mod = current.split('/')[1] as ModuleId;
      if (['coding', 'dialect', 'forensics'].includes(mod) && !r.modules.includes(mod)) {
        return r.modules.length === 1 ? '/knowledge' : '/welcome';
      }
      if (current.startsWith('/admin') && !r.admin) return '/welcome';
      return current;
    });
    setModal(null);
    setExpanded((prev) => {
      const next = new Set([...prev].filter((id) => r.modules.includes(id)));
      if (next.size === 0 && r.modules[0]) next.add(r.modules[0]);
      return next;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role]);

  const navigate = useCallback((to: Route) => {
    const mod = to.split('/')[1] as ModuleId;
    if (WORKSPACE_MODULES.includes(mod)) {
      setExpanded((prev) => {
        if (prev.has(mod)) return prev;
        const next = new Set(prev);
        next.add(mod);
        return next;
      });
    }
    setRoute(to);
    setModal(null);
  }, []);

  const toggleExpand = useCallback((id: ModuleId) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const toggleTheme = useCallback(() => {
    const flip = () => setTheme((p) => (p === 'light' ? 'dark' : 'light'));
    // Cross-fade the whole UI via the View Transitions API where supported.
    // flushSync forces the DOM update inside the callback so the transition
    // captures the new theme correctly.
    const doc = document as Document & { startViewTransition?: (cb: () => void) => void };
    if (doc.startViewTransition) doc.startViewTransition(() => flushSync(flip));
    else flip();
  }, []);

  const ctx: NavValue = {
    route,
    navigate,
    role,
    expanded,
    toggleExpand,
    theme,
    setTheme,
    toggleTheme,
    modal,
    openModal: setModal,
    closeModal: () => setModal(null),
  };

  return (
    <NavContext.Provider value={ctx}>
      <Stage>
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <div key={route} className="a-route" style={{ width: '100%', height: '100%' }}>
            <Router route={route} role={role} theme={theme} />
          </div>
          {/* Modals live in their own themed scope so the CSS variables
              (--bg-elev, --border, text colors) resolve. */}
          {modal && (
            <div className="andal andal--overlay" data-theme={theme}>
              {modal === 'clear-session' && <ClearSessionOverlay />}
              {modal === 'delete-file' && <DeleteFileOverlay />}
              {modal === 'approve-user' && <ApproveUserOverlay />}
              {modal === 'disable-user' && <DisableUserOverlay />}
            </div>
          )}
        </div>
      </Stage>

      <TweaksPanel
        role={role}
        accent={accent}
        density={density}
        route={route}
        isAdmin={r.admin}
        onRole={setRole}
        onAccent={setAccent}
        onDensity={setDensity}
        onJump={navigate}
      />
    </NavContext.Provider>
  );
}
