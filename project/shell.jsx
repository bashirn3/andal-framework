/* global React */

// ===== Icons =====
const Icon = ({ d, size = 16, ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...rest}>
    {Array.isArray(d) ? d.map((p, i) => <path key={i} d={p} />) : <path d={d} />}
  </svg>
);

const I = {
  book: <Icon d="M4 5a2 2 0 0 1 2-2h12v18H6a2 2 0 0 1-2-2zM20 17H6" />,
  code: <Icon d={["M8 8 4 12l4 4", "M16 8l4 4-4 4", "M14 4l-4 16"]} />,
  voice: <Icon d={["M12 3v12", "M9 6v6", "M15 6v6", "M6 9v3", "M18 9v3", "M5 18h14", "M12 18v3"]} />,
  shield: <Icon d={["M12 3l8 3v6c0 4.5-3.4 8.4-8 9-4.6-.6-8-4.5-8-9V6z", "M9 12l2 2 4-4"]} />,
  plus: <Icon d={["M12 5v14", "M5 12h14"]} />,
  send: <Icon d="M5 12l14-7-5 16-3-7-6-2z" />,
  attach: <Icon d="M21 12.5l-9 9a5 5 0 0 1-7-7l9-9a3.5 3.5 0 0 1 5 5l-9 9a2 2 0 1 1-3-3l8-8" />,
  search: <Icon d={["M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z", "M21 21l-4.3-4.3"]} />,
  sun: <Icon d={["M12 4v2", "M12 18v2", "M4 12H2", "M22 12h-2", "M5.6 5.6L4.2 4.2", "M19.8 19.8l-1.4-1.4", "M5.6 18.4l-1.4 1.4", "M19.8 4.2l-1.4 1.4"]} />,
  moon: <Icon d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z" />,
  chev: <Icon d="M7 9l5 5 5-5" />,
  chevR: <Icon d="M9 7l5 5-5 5" />,
  users: <Icon d={["M16 14a4 4 0 1 0-8 0", "M12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z", "M20 21v-2a4 4 0 0 0-3-3.87", "M4 21v-2a4 4 0 0 1 3-3.87"]} />,
  policy: <Icon d={["M4 6h16", "M4 12h10", "M4 18h16", "M18 12l2 2 4-4"]} />,
  log: <Icon d={["M9 6h11", "M9 12h11", "M9 18h11", "M5 6h.01", "M5 12h.01", "M5 18h.01"]} />,
  file: <Icon d={["M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z", "M14 3v6h6"]} />,
  folder: <Icon d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />,
  trash: <Icon d={["M4 7h16", "M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2", "M6 7l1 13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-13"]} />,
  more: <Icon d={["M12 5h.01", "M12 12h.01", "M12 19h.01"]} />,
  check: <Icon d="M5 12l5 5L20 7" />,
  x: <Icon d={["M6 6l12 12", "M18 6L6 18"]} />,
  arrow: <Icon d={["M5 12h14", "M13 5l7 7-7 7"]} />,
  arrowUp: <Icon d={["M12 19V5", "M5 12l7-7 7 7"]} />,
  copy: <Icon d={["M9 9h10v10H9z", "M5 15V5h10"]} />,
  refresh: <Icon d={["M3 12a9 9 0 0 1 15-6.7L21 8", "M21 3v5h-5", "M21 12a9 9 0 0 1-15 6.7L3 16", "M3 21v-5h5"]} />,
  bolt: <Icon d="M13 3L4 14h7l-1 7 9-11h-7l1-7z" />,
  upload: <Icon d={["M12 4v12", "M7 9l5-5 5 5", "M4 20h16"]} />,
  download: <Icon d={["M12 4v12", "M17 11l-5 5-5-5", "M4 20h16"]} />,
  warn: <Icon d={["M12 3l10 17H2z", "M12 10v4", "M12 18h.01"]} />,
  info: <Icon d={["M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z", "M12 11v6", "M12 8h.01"]} />,
  wifi: <Icon d={["M2 9a16 16 0 0 1 20 0", "M5 13a11 11 0 0 1 14 0", "M8.5 16.5a6 6 0 0 1 7 0", "M12 20h.01"]} />,
  clock: <Icon d={["M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z", "M12 7v5l3 2"]} />,
  cog: <Icon d={["M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z", "M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H9a1.6 1.6 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V9a1.6 1.6 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z"]} />,
  signout: <Icon d={["M9 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4", "M16 17l5-5-5-5", "M21 12H9"]} />,
};

// ===== Roles =====
const ROLES = {
  general: {
    id: 'general',
    name: 'Tunde Lawal',
    initials: 'TL',
    role: 'General staff',
    dept: 'Office of the SA',
    modules: ['knowledge'],
    admin: false,
  },
  rd: {
    id: 'rd',
    name: 'Adamu Bashir',
    initials: 'AB',
    role: 'R&D engineer',
    dept: 'Research & Development',
    modules: ['knowledge', 'coding'],
    admin: false,
  },
  dli: {
    id: 'dli',
    name: 'Folake Okeke',
    initials: 'FO',
    role: 'DLI analyst',
    dept: 'Dialect & Language Intelligence',
    modules: ['knowledge', 'dialect'],
    admin: false,
  },
  forensics: {
    id: 'forensics',
    name: 'Mahmoud Tanko',
    initials: 'MT',
    role: 'Forensics lead',
    dept: 'Digital Forensics',
    modules: ['knowledge', 'dialect', 'forensics'],
    admin: false,
  },
  admin: {
    id: 'admin',
    name: 'Patrick Obi',
    initials: 'PO',
    role: 'Platform admin',
    dept: 'Platform',
    modules: ['knowledge', 'coding', 'dialect', 'forensics'],
    admin: true,
  },
};

// ===== Module definitions =====
const MODULES = [
  { id: 'knowledge', label: 'Knowledge', icon: I.book },
  { id: 'coding', label: 'Coding', icon: I.code },
  { id: 'dialect', label: 'Dialect', icon: I.voice },
  { id: 'forensics', label: 'Forensics Intelligence', icon: I.shield },
];

// Per-module conversation history
const CONVOS = {
  knowledge: [
    { title: 'Procurement clause comparison', time: '2h' },
    { title: 'Q1 status memo · draft', time: '1d' },
    { title: 'Standards translation', time: '3d' },
    { title: 'Vendor agreement summary', time: '6d' },
  ],
  coding: [
    { title: 'Loader refactor · pipeline.py', time: '12m' },
    { title: 'k8s manifest review', time: '2h' },
    { title: 'Edge cases · normalize()', time: '1d' },
  ],
  dialect: [
    { title: 'Field interview · Maiduguri 02', time: '20m' },
    { title: 'Press conference · Kano', time: '3h' },
    { title: 'Radio bulletin · Yobe', time: '2d' },
  ],
  forensics: [
    { title: 'auth-failures · gateway-01', time: '3h' },
    { title: 'NTP-incident · 18 May', time: '1d' },
    { title: 'Archive triage · evidence-04', time: '4d' },
  ],
};

// ===== Storage usage per role (different breakdowns) =====
const STORAGE = {
  general: { used: 32, total: 500, by: { knowledge: 32 } },
  rd: { used: 110, total: 500, by: { knowledge: 84, coding: 26 } },
  dli: { used: 218, total: 500, by: { knowledge: 38, dialect: 180 } },
  forensics: { used: 380, total: 500, by: { knowledge: 22, dialect: 78, forensics: 280 } },
  admin: { used: 92, total: 500, by: { knowledge: 40, coding: 12, dialect: 24, forensics: 16 } },
};

// ===== Brand lockup =====
const Lockup = () => (
  <div className="a-side__brand">
    <div className="a-logo">A</div>
    <div className="col" style={{lineHeight:1.1}}>
      <div className="a-brand-text">Andal</div>
      <div className="a-brand-sub mono">NCCC · v1.0</div>
    </div>
  </div>
);

// ===== Module accordion item =====
const ModuleGroup = ({ m, expanded, active, conversations = [], showAll = false,
  onSelect, onToggle, onNew, onConv, activeConvIndex = -1 }) => {
  const list = showAll ? conversations : conversations.slice(0, 4);
  return (
    <div className={`a-mod ${expanded ? 'open' : ''} ${active ? 'active' : ''}`}>
      <div className="a-mod__head" onClick={onToggle} role={onToggle ? 'button' : undefined}
        title="Click to expand · use New conversation or history to open">
        <span className="a-nav-ico">{m.icon}</span>
        <span className="a-mod__label">{m.label}</span>
        <span className="a-mod__count mono">{conversations.length}</span>
        <span className="a-mod__chev">{expanded ? I.chev : I.chevR}</span>
      </div>
      {expanded && (
        <div className="a-mod__body">
          <div className="a-mod__new" onClick={onNew} role={onNew ? 'button' : undefined}>
            <span className="a-mod__new-ico">{I.plus}</span>
            <span>New conversation</span>
          </div>
          {list.length === 0 && (
            <div className="a-mod__empty mono">No history yet</div>
          )}
          {list.map((c, i) => (
            <div key={i}
              className={`a-mod__conv ${(c.active || i === activeConvIndex) ? 'active' : ''}`}
              onClick={onConv ? () => onConv(i) : undefined}
              role={onConv ? 'button' : undefined}
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
const Sidebar = ({
  active = 'knowledge',
  roleId = 'rd',
  conversationsOverride = null,
  storageOverride = null,
  expandedOverride = null,
  themeName = 'light',
}) => {
  const r = ROLES[roleId] || ROLES.rd;
  const nav = useNav();
  const visible = MODULES.filter(m => r.modules.includes(m.id));
  const storage = storageOverride || STORAGE[roleId];
  const pct = Math.round((storage.used / storage.total) * 100);
  const barClass = pct >= 95 ? 'danger' : pct >= 80 ? 'warn' : '';

  return (
    <aside className="a-side">
      <Lockup />
      <div className="a-side__scroll">

        <div className="col" style={{gap: 4}}>
          <div className="a-side__group-title">
            <span>Workspaces</span>
          </div>

          <div className="a-mods">
            {visible.map(m => {
              const isActive = m.id === active;
              const isExpanded = nav
                ? nav.expanded.has(m.id)
                : (expandedOverride ? expandedOverride.includes(m.id) : isActive);
              const convs = (conversationsOverride && conversationsOverride[m.id]) || CONVOS[m.id] || [];
              // Mark active conversation if route is .../chat (for the active module)
              const activeConvIndex = (nav && isActive && nav.route && nav.route.endsWith('/chat')) ? 0 : -1;
              return (
                <ModuleGroup
                  key={m.id}
                  m={m}
                  expanded={isExpanded}
                  active={isActive}
                  conversations={convs}
                  activeConvIndex={activeConvIndex}
                  onSelect={nav ? () => nav.navigate('/' + m.id) : undefined}
                  onToggle={nav ? () => nav.toggleExpand(m.id) : undefined}
                  onNew={nav ? () => nav.navigate('/' + m.id) : undefined}
                  onConv={nav ? () => nav.navigate('/' + m.id + '/chat') : undefined}
                />
              );
            })}
          </div>
        </div>

        {r.admin && (
          <div className="col" style={{gap: 4}}>
            <div className="a-side__group-title"><span>Administration</span></div>
            <div className="a-nav">
              <div className={`a-nav-item ${active === 'admin-users' ? 'active' : ''}`}
                onClick={nav ? () => nav.navigate('/admin/users') : undefined}>
                <span className="a-nav-ico">{I.users}</span><span>Users</span>
                <span className="a-nav-meta mono">2</span>
              </div>
              <div className={`a-nav-item ${active === 'admin-policy' ? 'active' : ''}`}
                onClick={nav ? () => nav.navigate('/admin/policy') : undefined}>
                <span className="a-nav-ico">{I.policy}</span><span>Access policies</span>
              </div>
              <div className={`a-nav-item ${active === 'admin-audit' ? 'active' : ''}`}
                onClick={nav ? () => nav.navigate('/admin/audit') : undefined}>
                <span className="a-nav-ico">{I.log}</span><span>Audit log</span>
              </div>
            </div>
          </div>
        )}

        <div className="col" style={{gap: 4, marginTop: 'auto'}}>
          <div className="a-side__group-title"><span>Account</span></div>
          <div className="a-nav">
            <div className={`a-nav-item ${active === 'files' ? 'active' : ''}`}
              onClick={nav ? () => nav.navigate('/files') : undefined}>
              <span className="a-nav-ico">{I.folder}</span><span>Files &amp; storage</span>
            </div>
            <div className={`a-nav-item ${active === 'settings' ? 'active' : ''}`}
              onClick={nav ? () => nav.navigate('/settings') : undefined}>
              <span className="a-nav-ico">{I.cog}</span><span>Settings</span>
            </div>
          </div>
        </div>
      </div>

      <div className="a-side__foot">
        <div className="a-quota">
          <div className="a-quota__row">
            <span className="a-quota__label">Storage</span>
            <span className="a-quota__val mono">{storage.used} / {storage.total} MB</span>
          </div>
          <div className={`a-bar ${barClass}`}><i style={{width: `${pct}%`}} /></div>
          <div className="a-quota__row" style={{marginTop:2}}>
            <span className="a-quota__sub mono">{pct}% used</span>
            <span className="a-quota__sub mono">{storage.total - storage.used} MB free</span>
          </div>
        </div>

        <div className="a-user">
          <div className="a-avatar mono">{r.initials}</div>
          <div className="col" style={{lineHeight: 1.2, minWidth: 0, flex:1}}>
            <div className="a-user__name">{r.name}</div>
            <div className="a-user__role mono">{r.role}</div>
          </div>
          <div className="a-user__chev">{I.chev}</div>
        </div>
      </div>
    </aside>
  );
};

// ===== Top bar =====
const TopBar = ({ module = 'Knowledge', title = 'New conversation', actions = null, themeName = 'light' }) => {
  const nav = useNav();
  return (
    <div className="a-topbar">
      <div className="a-crumb">
        <span className="a-crumb__module mono">{module}</span>
        <span className="a-crumb__sep">/</span>
        <span className="a-crumb__title">{title}</span>
      </div>
      <div className="a-topbar__actions">
        {actions}
        <button className="a-btn ghost icon" title="Search">{I.search}</button>
        <button className="a-btn ghost icon" title="Toggle theme"
          onClick={nav ? () => nav.toggleTheme() : undefined}
        >{themeName === 'dark' ? I.sun : I.moon}</button>
      </div>
    </div>
  );
};

// ===== Shell wrapper =====
const Shell = ({ children, theme = 'light' }) => (
  <div className="andal" data-theme={theme}>{children}</div>
);

Object.assign(window, { Icon, I, Lockup, Sidebar, TopBar, Shell, MODULES, ROLES, CONVOS, STORAGE });
