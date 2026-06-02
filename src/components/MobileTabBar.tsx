import { I } from './icons';
import { useNav } from '../nav/NavContext';
import { ROLES } from '../data/roles';
import type { ReactNode } from 'react';

// Mobile-only bottom tab bar (thumb-reachable primary navigation).
// Hidden on desktop via CSS; not rendered on auth / welcome routes.
const AUTHISH = ['/login', '/signup', '/pending', '/onboarding', '/welcome'];

export function MobileTabBar() {
  const nav = useNav();
  if (!nav) return null;
  const { route, navigate, role, setSidebarOpen } = nav;
  if (AUTHISH.includes(route)) return null;

  const home = '/' + (ROLES[role].modules[0] ?? 'knowledge');
  const inWorkspace = ['knowledge', 'coding', 'dialect', 'forensics'].includes(route.split('/')[1]);

  const Tab = ({
    icon,
    label,
    active,
    onClick,
  }: {
    icon: ReactNode;
    label: string;
    active: boolean;
    onClick: () => void;
  }) => (
    <button className={active ? 'active' : ''} onClick={onClick} aria-current={active ? 'page' : undefined}>
      {icon}
      <span className="a-tabbar__label">{label}</span>
    </button>
  );

  return (
    <div className="andal a-shellchrome" data-theme={nav.theme}>
      <nav className="a-tabbar" aria-label="Primary">
        <Tab icon={I.home} label="Home" active={inWorkspace} onClick={() => navigate(home)} />
        <Tab icon={I.folder} label="Files" active={route === '/files'} onClick={() => navigate('/files')} />
        <Tab icon={I.cog} label="Account" active={route === '/settings'} onClick={() => navigate('/settings')} />
        <Tab icon={I.menu} label="Menu" active={false} onClick={() => setSidebarOpen(true)} />
      </nav>
    </div>
  );
}
