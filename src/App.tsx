import { useCallback, useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import { ROLES } from './data/roles';
import { NavContext, type ModalId, type NavValue, type Route } from './nav/NavContext';
import { Stage } from './nav/Stage';
import { Router } from './Router';
import { TweaksPanel } from './tweaks/TweaksPanel';
import { ToastProvider } from './toast/Toast';
import { ApproveUserOverlay, ClearSessionOverlay, DisableUserOverlay } from './components/modals/Modals';
import type { Accent, Density, ModuleId, RoleId, Theme } from './types';

const WORKSPACE_MODULES: ModuleId[] = ['knowledge', 'coding', 'dialect', 'forensics'];
const ACCENTS: Accent[] = ['verdant', 'ink', 'dusk', 'sage'];
const DENSITIES: Density[] = ['compact', 'comfortable', 'spacious'];

const lsGet = (k: string): string | null => {
  try {
    return localStorage.getItem(k);
  } catch {
    return null;
  }
};
const lsSet = (k: string, v: string): void => {
  try {
    localStorage.setItem(k, v);
  } catch {
    /* ignore (private mode, etc.) */
  }
};

const TITLES: Array<[string, string]> = [
  ['/login', 'Sign in'],
  ['/signup', 'Create account'],
  ['/pending', 'Pending approval'],
  ['/onboarding', 'Welcome'],
  ['/welcome', 'Welcome'],
  ['/knowledge', 'Knowledge'],
  ['/coding', 'Coding'],
  ['/dialect', 'Dialect'],
  ['/forensics', 'Forensics'],
  ['/files', 'Files & storage'],
  ['/settings', 'Settings'],
  ['/states', 'System states'],
  ['/admin/users', 'Admin · Users'],
  ['/admin/policy', 'Admin · Access policies'],
  ['/admin/audit', 'Admin · Audit log'],
];
const titleFor = (route: string) =>
  'Andal · ' + (TITLES.find(([p]) => route === p || route.startsWith(p + '/'))?.[1] ?? 'Prototype');

export default function App() {
  const [role, setRole] = useState<RoleId>(() => {
    const v = lsGet('andal.role');
    return v && v in ROLES ? (v as RoleId) : 'rd';
  });
  const [accent, setAccent] = useState<Accent>(() => {
    const v = lsGet('andal.accent') as Accent | null;
    return v && ACCENTS.includes(v) ? v : 'verdant';
  });
  const [density, setDensity] = useState<Density>(() => {
    const v = lsGet('andal.density') as Density | null;
    return v && DENSITIES.includes(v) ? v : 'comfortable';
  });
  const [theme, setTheme] = useState<Theme>(() => {
    const v = lsGet('andal.theme');
    if (v === 'light' || v === 'dark') return v;
    return window.matchMedia?.('(prefers-color-scheme: dark)')?.matches ? 'dark' : 'light';
  });
  const [route, setRoute] = useState<Route>(() => window.location.hash.replace(/^#/, '') || '/login');
  const [expanded, setExpanded] = useState<Set<ModuleId>>(new Set(['knowledge']));
  const [modal, setModal] = useState<ModalId>(null);

  const r = ROLES[role];

  // Persist preferences.
  useEffect(() => lsSet('andal.role', role), [role]);
  useEffect(() => lsSet('andal.accent', accent), [accent]);
  useEffect(() => lsSet('andal.density', density), [density]);
  useEffect(() => lsSet('andal.theme', theme), [theme]);

  // Apply accent/density to the document root so the CSS overrides resolve.
  useEffect(() => {
    document.documentElement.setAttribute('data-andal-accent', accent);
    document.documentElement.setAttribute('data-andal-density', density);
    document.body.setAttribute('data-andal-accent', accent);
    document.body.setAttribute('data-andal-density', density);
  }, [accent, density]);

  // Tab title follows the route.
  useEffect(() => {
    document.title = titleFor(route);
  }, [route]);

  // Keep the URL hash in sync (enables refresh, back/forward, deep-linking).
  useEffect(() => {
    if (window.location.hash !== '#' + route) window.history.pushState(null, '', '#' + route);
  }, [route]);
  useEffect(() => {
    const sync = () => setRoute((prev) => {
      const h = window.location.hash.replace(/^#/, '') || '/login';
      return prev === h ? prev : h;
    });
    window.addEventListener('popstate', sync);
    window.addEventListener('hashchange', sync);
    return () => {
      window.removeEventListener('popstate', sync);
      window.removeEventListener('hashchange', sync);
    };
  }, []);

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
    <ToastProvider>
      <NavContext.Provider value={ctx}>
        <Stage>
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <div key={route} className="a-route" style={{ width: '100%', height: '100%' }}>
              <Router route={route} role={role} theme={theme} />
            </div>
            {/* Modals live in their own themed scope so the CSS variables resolve. */}
            {modal && (
              <div className="andal andal--overlay" data-theme={theme}>
                {modal === 'clear-session' && <ClearSessionOverlay />}
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
    </ToastProvider>
  );
}
