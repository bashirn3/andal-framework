import { useState, type KeyboardEvent } from 'react';
import { I } from './icons';
import { Lockup } from './Shell';
import { useNav } from '../nav/NavContext';
import { useToast } from '../toast/Toast';
import { CONVOS, MODULES, ROLES, STORAGE } from '../data/roles';
import type { Conversation, ModuleDef, ModuleId, RoleId, StorageUsage } from '../types';

// Enter/Space activates a non-button element used as a control.
const onActivate = (fn?: () => void) => (e: KeyboardEvent) => {
  if (!fn) return;
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    fn();
  }
};

// ===== Module accordion item =====
interface ModuleGroupProps {
  m: ModuleDef;
  expanded: boolean;
  active: boolean;
  conversations?: Conversation[];
  showAll?: boolean;
  onToggle?: () => void;
  onNew?: () => void;
  onConv?: (i: number) => void;
  activeConvIndex?: number;
}

const ModuleGroup = ({
  m,
  expanded,
  active,
  conversations = [],
  showAll = false,
  onToggle,
  onNew,
  onConv,
  activeConvIndex = -1,
}: ModuleGroupProps) => {
  const list = showAll ? conversations : conversations.slice(0, 4);
  return (
    <div className={`a-mod ${expanded ? 'open' : ''} ${active ? 'active' : ''}`}>
      <div
        className="a-mod__head"
        onClick={onToggle}
        onKeyDown={onActivate(onToggle)}
        role={onToggle ? 'button' : undefined}
        tabIndex={onToggle ? 0 : undefined}
        aria-expanded={expanded}
        title="Expand · open via New conversation or history"
      >
        <span className="a-nav-ico">{m.icon}</span>
        <span className="a-mod__label">{m.label}</span>
        <span className="a-mod__count mono">{conversations.length}</span>
        <span className="a-mod__chev">{expanded ? I.chev : I.chevR}</span>
      </div>
      {expanded && (
        <div className="a-mod__body">
          <div
            className="a-mod__new"
            onClick={onNew}
            onKeyDown={onActivate(onNew)}
            role={onNew ? 'button' : undefined}
            tabIndex={onNew ? 0 : undefined}
          >
            <span className="a-mod__new-ico">{I.plus}</span>
            <span>New conversation</span>
          </div>
          {list.length === 0 && <div className="a-mod__empty mono">No history yet</div>}
          {list.map((c, i) => (
            <div
              key={i}
              className={`a-mod__conv ${c.active || i === activeConvIndex ? 'active' : ''}`}
              onClick={onConv ? () => onConv(i) : undefined}
              onKeyDown={onActivate(onConv ? () => onConv(i) : undefined)}
              role={onConv ? 'button' : undefined}
              tabIndex={onConv ? 0 : undefined}
            >
              <span className="a-mod__conv-title">{c.title}</span>
              <span className="a-mod__conv-time mono">{c.time}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ===== Sidebar =====
interface SidebarProps {
  active?: string;
  roleId?: RoleId;
  conversationsOverride?: Partial<Record<ModuleId, Conversation[]>> | null;
  storageOverride?: StorageUsage | null;
  expandedOverride?: ModuleId[] | null;
}

export const Sidebar = ({
  active = 'knowledge',
  roleId = 'rd',
  conversationsOverride = null,
  storageOverride = null,
  expandedOverride = null,
}: SidebarProps) => {
  const r = ROLES[roleId] || ROLES.rd;
  const nav = useNav();
  const toast = useToast();
  const [menuOpen, setMenuOpen] = useState(false);
  const visible = MODULES.filter((m) => r.modules.includes(m.id));

  const goAccount = (to: string) => {
    setMenuOpen(false);
    nav?.navigate(to);
  };
  const signOut = () => {
    setMenuOpen(false);
    nav?.navigate('/login');
    toast('ok', 'Signed out', 'Your session has ended.');
  };
  const storage = storageOverride || STORAGE[roleId];
  const pct = Math.round((storage.used / storage.total) * 100);
  const barClass = pct >= 95 ? 'danger' : pct >= 80 ? 'warn' : '';

  const open = nav?.sidebarOpen ?? false;

  return (
    <>
      {open && <div className="a-side__backdrop" onClick={() => nav?.setSidebarOpen(false)} />}
      <aside className="a-side" data-open={open}>
        <Lockup />
      <div className="a-side__scroll">
        <div className="col" style={{ gap: 4 }}>
          <div className="a-side__group-title">
            <span>Workspaces</span>
          </div>

          <div className="a-mods">
            {visible.map((m) => {
              const isActive = m.id === active;
              const isExpanded = nav
                ? nav.expanded.has(m.id)
                : expandedOverride
                  ? expandedOverride.includes(m.id)
                  : isActive;
              const convs =
                (conversationsOverride && conversationsOverride[m.id]) || CONVOS[m.id] || [];
              // Mark the active conversation when the route is .../chat for the active module.
              const activeConvIndex =
                nav && isActive && nav.route && nav.route.endsWith('/chat') ? 0 : -1;
              return (
                <ModuleGroup
                  key={m.id}
                  m={m}
                  expanded={isExpanded}
                  active={isActive}
                  conversations={convs}
                  activeConvIndex={activeConvIndex}
                  onToggle={nav ? () => nav.toggleExpand(m.id) : undefined}
                  onNew={nav ? () => nav.navigate('/' + m.id) : undefined}
                  onConv={nav ? () => nav.navigate('/' + m.id + '/chat') : undefined}
                />
              );
            })}
          </div>
        </div>

        {r.admin && (
          <div className="col" style={{ gap: 4 }}>
            <div className="a-side__group-title">
              <span>Administration</span>
            </div>
            <div className="a-nav">
              <div
                className={`a-nav-item ${active === 'admin-users' ? 'active' : ''}`}
                onClick={nav ? () => nav.navigate('/admin/users') : undefined}
              >
                <span className="a-nav-ico">{I.users}</span>
                <span>Users</span>
                <span className="a-nav-meta mono">2</span>
              </div>
              <div
                className={`a-nav-item ${active === 'admin-policy' ? 'active' : ''}`}
                onClick={nav ? () => nav.navigate('/admin/policy') : undefined}
              >
                <span className="a-nav-ico">{I.policy}</span>
                <span>Access policies</span>
              </div>
              <div
                className={`a-nav-item ${active === 'admin-audit' ? 'active' : ''}`}
                onClick={nav ? () => nav.navigate('/admin/audit') : undefined}
              >
                <span className="a-nav-ico">{I.log}</span>
                <span>Audit log</span>
              </div>
            </div>
          </div>
        )}

        <div className="col" style={{ gap: 4, marginTop: 'auto' }}>
          <div className="a-side__group-title">
            <span>Account</span>
          </div>
          <div className="a-nav">
            <div
              className={`a-nav-item ${active === 'files' ? 'active' : ''}`}
              onClick={nav ? () => nav.navigate('/files') : undefined}
            >
              <span className="a-nav-ico">{I.folder}</span>
              <span>Files &amp; storage</span>
            </div>
            <div
              className={`a-nav-item ${active === 'settings' ? 'active' : ''}`}
              onClick={nav ? () => nav.navigate('/settings') : undefined}
            >
              <span className="a-nav-ico">{I.cog}</span>
              <span>Settings</span>
            </div>
          </div>
        </div>
      </div>

      <div className="a-side__foot">
        <div className="a-quota">
          <div className="a-quota__row">
            <span className="a-quota__label">Storage</span>
            <span className="a-quota__val mono">
              {storage.used} / {storage.total} MB
            </span>
          </div>
          <div className={`a-bar ${barClass}`}>
            <i style={{ width: `${pct}%` }} />
          </div>
          <div className="a-quota__row" style={{ marginTop: 2 }}>
            <span className="a-quota__sub mono">{pct}% used</span>
            <span className="a-quota__sub mono">{storage.total - storage.used} MB free</span>
          </div>
        </div>

        <div className="a-usermenu">
          {menuOpen && (
            <>
              <div className="a-attach__back" onClick={() => setMenuOpen(false)} />
              <div className="a-usermenu__pop" role="menu">
                <button className="a-usermenu__item" role="menuitem" onClick={() => goAccount('/settings')}>
                  <span className="a-nav-ico">{I.cog}</span>
                  <span>Account &amp; settings</span>
                </button>
                <button className="a-usermenu__item" role="menuitem" onClick={() => goAccount('/files')}>
                  <span className="a-nav-ico">{I.folder}</span>
                  <span>Files &amp; storage</span>
                </button>
                <div className="a-usermenu__sep" />
                <button className="a-usermenu__item danger" role="menuitem" onClick={signOut}>
                  <span className="a-nav-ico">{I.signout}</span>
                  <span>Sign out</span>
                </button>
              </div>
            </>
          )}
          <button
            className="a-user"
            onClick={nav ? () => setMenuOpen((o) => !o) : undefined}
            aria-haspopup="menu"
            aria-expanded={menuOpen}
          >
            <div className="a-avatar mono">{r.initials}</div>
            <div className="col" style={{ lineHeight: 1.2, minWidth: 0, flex: 1, alignItems: 'flex-start' }}>
              <div className="a-user__name">{r.name}</div>
              <div className="a-user__role mono">{r.role}</div>
            </div>
            <div className="a-user__chev">{I.chev}</div>
          </button>
        </div>
      </div>
      </aside>
    </>
  );
};
