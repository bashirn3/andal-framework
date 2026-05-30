/* global React, ReactDOM,
   useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakColor,
   NavContext, Stage, ROLES, I,
   LoginScreen, SignupScreen, PendingScreen, OnboardingScreen, WelcomeScreen,
   KnowledgeScreen, CodingScreen, DialectScreen, DialectResultScreen,
   ForensicsScreen, ForensicsResultScreen, ActiveChatScreen,
   FilesScreen, AccountScreen,
   AdminUsersScreen, AccessPoliciesScreen, AuditLogScreen
*/

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "role": "rd",
  "accent": "verdant",
  "density": "comfortable"
}/*EDITMODE-END*/;

const ACCENT_SWATCHES = [
  ['verdant', '#008751'],
  ['ink',     '#2a4d96'],
  ['dusk',    '#a64a3e'],
  ['sage',    '#5a7b50'],
];

const ROLE_BLURB = {
  general: 'Knowledge only · skips the welcome picker',
  rd: 'Knowledge + Coding',
  dli: 'Knowledge + Dialect',
  forensics: 'Knowledge + Dialect + Forensics',
  admin: 'All workspaces + admin tools',
};

// ===== Standalone modal overlays =====
// Each modal is just the dark backdrop + modal card; the underlying screen
// remains visible behind it. Closed via close() in nav context.

const ModalBack = ({ children }) => {
  const nav = React.useContext(NavContext);
  return (
    <div className="a-modal-back" onClick={nav && nav.closeModal}>
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
};

const ClearSessionOverlay = () => {
  const nav = React.useContext(NavContext);
  return (
    <ModalBack>
      <div className="a-modal">
        <div className="a-modal__hd"><div className="a-modal__title">Clear this conversation?</div></div>
        <div className="a-modal__body">
          The full message history will be removed from your sidebar. Attached files remain in <strong>Files &amp; storage</strong> until deleted there.
        </div>
        <div className="a-modal__ft">
          <button className="a-btn" onClick={() => nav.closeModal()}>Cancel</button>
          <button className="a-btn danger" onClick={() => { nav.closeModal(); nav.navigate('/knowledge'); }}>Clear conversation</button>
        </div>
      </div>
    </ModalBack>
  );
};

const DeleteFileOverlay = () => {
  const nav = React.useContext(NavContext);
  return (
    <ModalBack>
      <div className="a-modal">
        <div className="a-modal__hd">
          <div className="a-modal__title">Delete <span className="mono" style={{fontSize: 14}}>incident-bundle-NTP.zip</span>?</div>
        </div>
        <div className="a-modal__body">
          <p style={{margin: 0}}>This file is currently being processed. Deleting it cancels the job and removes the file permanently.</p>
          <div className="row" style={{gap: 12, marginTop: 12, padding: '10px 12px', background: 'var(--bg-soft)', borderRadius: 8}}>
            <div className="col" style={{flex: 1, gap: 2}}>
              <span className="mono-meta">FREES</span>
              <span className="mono" style={{fontSize: 16}}>82 MB</span>
            </div>
            <div className="col" style={{flex: 1, gap: 2}}>
              <span className="mono-meta">NEW QUOTA</span>
              <span className="mono" style={{fontSize: 16}}>308 / 500 MB</span>
            </div>
          </div>
          <p style={{margin: '10px 0 0', fontSize: 12.5, color: 'var(--fg-3)'}}>Deleting files frees storage quota.</p>
        </div>
        <div className="a-modal__ft">
          <button className="a-btn" onClick={() => nav.closeModal()}>Cancel</button>
          <button className="a-btn danger" onClick={() => nav.closeModal()}>Delete file</button>
        </div>
      </div>
    </ModalBack>
  );
};

const ApproveUserOverlay = () => {
  const nav = React.useContext(NavContext);
  const [dept, setDept] = React.useState('R&D');
  return (
    <ModalBack>
      <div className="a-modal" style={{width: 560}}>
        <div className="a-modal__hd" style={{paddingBottom: 14, borderBottom: '1px solid var(--border-soft)'}}>
          <div className="row" style={{gap: 12}}>
            <div className="a-avatar mono" style={{width: 40, height: 40, fontSize: 13}}>HY</div>
            <div className="col" style={{lineHeight: 1.25}}>
              <div className="a-modal__title" style={{margin: 0}}>Halima Yusuf</div>
              <div className="mono" style={{fontSize: 12, color: 'var(--fg-3)'}}>h.yusuf@nccc.gov.ng · NCCC-04302</div>
            </div>
            <span className="a-pill warn mono" style={{marginLeft: 'auto'}}><span className="dot" />PENDING</span>
          </div>
        </div>
        <div className="a-modal__body" style={{padding: '14px 20px'}}>
          <p style={{margin: '0 0 14px', fontSize: 13}}>Approving this account allows the user to sign in and access the modules assigned to this department.</p>
          <div className="col" style={{gap: 14}}>
            <div className="a-field">
              <label className="a-label">Department / directorate</label>
              <div className="a-input" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <span style={{color: 'var(--fg)'}}>{dept}</span>
                <span style={{color: 'var(--fg-3)'}}>{I.chev}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="a-modal__ft">
          <button className="a-btn" onClick={() => nav.closeModal()}>Cancel</button>
          <button className="a-btn primary" onClick={() => nav.closeModal()}>Approve account</button>
        </div>
      </div>
    </ModalBack>
  );
};

const DisableUserOverlay = () => {
  const nav = React.useContext(NavContext);
  return (
    <ModalBack>
      <div className="a-modal">
        <div className="a-modal__hd">
          <div className="row" style={{gap: 10}}>
            <span style={{color: 'var(--danger)'}}>{I.warn}</span>
            <div className="a-modal__title">Disable account?</div>
          </div>
        </div>
        <div className="a-modal__body">
          <p style={{margin: '0 0 12px'}}>
            <strong style={{color: 'var(--fg)'}}>Tunde Lawal</strong> will no longer be able to sign in. Their history and uploaded files will remain stored unless removed by an administrator.
          </p>
        </div>
        <div className="a-modal__ft">
          <button className="a-btn" onClick={() => nav.closeModal()}>Cancel</button>
          <button className="a-btn danger" onClick={() => nav.closeModal()}>Disable account</button>
        </div>
      </div>
    </ModalBack>
  );
};

// ===== Forbidden screen for direct-URL guard =====
const ForbiddenInline = ({ theme = 'light', module = 'this workspace' }) => {
  const nav = React.useContext(NavContext);
  return (
    <div className="andal" data-theme={theme}>
      <div style={{margin: 'auto', maxWidth: 460, textAlign: 'center', padding: 60}}>
        <div className="mono" style={{fontSize: 11, color: 'var(--fg-3)'}}>HTTP 403 · /forbidden</div>
        <h2 style={{margin: '12px 0', fontSize: 20, fontWeight: 500}}>Workspace not available</h2>
        <p style={{color: 'var(--fg-3)', fontSize: 13.5, margin: '0 0 18px'}}>You do not have access to <span className="mono">{module}</span>. Request access from your directorate lead.</p>
        <button className="a-btn primary" onClick={() => nav.navigate('/welcome')}>Return to welcome</button>
      </div>
    </div>
  );
};

// ===== Router =====
function Router({ route, role, theme }) {
  const r = ROLES[role];
  const ensure = (modId, Comp, props = {}) => {
    if (!r.modules.includes(modId)) return <ForbiddenInline theme={theme} module={modId} />;
    return <Comp theme={theme} roleId={role} {...props} />;
  };

  // Auth
  if (route === '/login')       return <LoginScreen theme={theme} />;
  if (route === '/signup')      return <SignupScreen theme={theme} />;
  if (route === '/pending')     return <PendingScreen theme={theme} />;
  if (route === '/onboarding')  return <OnboardingScreen theme={theme} />;

  // Welcome — general staff skips it
  if (route === '/welcome') {
    if (r.modules.length === 1) return <KnowledgeScreen theme={theme} roleId={role} />;
    return <WelcomeScreen theme={theme} roleId={role} />;
  }

  // Workspaces
  if (route === '/knowledge')        return <KnowledgeScreen theme={theme} roleId={role} />;
  if (route === '/knowledge/chat')   return <ActiveChatScreen theme={theme} roleId={role} />;
  if (route === '/coding')           return ensure('coding', CodingScreen);
  if (route === '/coding/chat')      return ensure('coding', CodingScreen);
  if (route === '/dialect')          return ensure('dialect', DialectScreen);
  if (route === '/dialect/chat')     return ensure('dialect', DialectResultScreen);
  if (route === '/forensics')        return ensure('forensics', ForensicsScreen);
  if (route === '/forensics/chat')   return ensure('forensics', ForensicsResultScreen);

  // Account
  if (route === '/files')    return <FilesScreen theme={theme} roleId={role} />;
  if (route === '/settings') return <AccountScreen theme={theme} roleId={role} />;

  // Admin (only if user is admin)
  if (route.startsWith('/admin')) {
    if (!r.admin) return <ForbiddenInline theme={theme} module="admin" />;
    if (route === '/admin/users')  return <AdminUsersScreen theme={theme} />;
    if (route === '/admin/policy') return <AccessPoliciesScreen theme={theme} />;
    if (route === '/admin/audit')  return <AuditLogScreen theme={theme} />;
  }

  return <LoginScreen theme={theme} />;
}

// ===== App =====
function PrototypeApp() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [route, setRoute] = React.useState('/login');
  const [expanded, setExpanded] = React.useState(new Set(['knowledge']));
  const [theme, setTheme] = React.useState('light');
  const [modal, setModal] = React.useState(null);

  const role = t.role;
  const r = ROLES[role];

  // Apply tweak attributes to root for accent/density CSS overrides
  React.useEffect(() => {
    document.documentElement.setAttribute('data-andal-accent', t.accent);
    document.documentElement.setAttribute('data-andal-density', t.density);
    document.body.setAttribute('data-andal-accent', t.accent);
    document.body.setAttribute('data-andal-density', t.density);
  }, [t.accent, t.density]);

  // When role changes, bounce away from now-forbidden routes
  React.useEffect(() => {
    const mod = route.split('/')[1];
    if (['coding','dialect','forensics'].includes(mod) && !r.modules.includes(mod)) {
      setRoute(r.modules.length === 1 ? '/knowledge' : '/welcome');
    }
    if (route.startsWith('/admin') && !r.admin) {
      setRoute('/welcome');
    }
    // Also reset modal — its content may not match the new role
    setModal(null);
    // Keep currently-active module expanded after role swap
    setExpanded(prev => {
      const next = new Set([...prev].filter(id => r.modules.includes(id)));
      if (next.size === 0 && r.modules[0]) next.add(r.modules[0]);
      return next;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role]);

  const navigate = React.useCallback((to) => {
    const mod = to.split('/')[1];
    if (['knowledge','coding','dialect','forensics'].includes(mod)) {
      setExpanded(prev => {
        if (prev.has(mod)) return prev;
        const next = new Set(prev);
        next.add(mod);
        return next;
      });
    }
    setRoute(to);
    setModal(null);
  }, []);

  const toggleExpand = React.useCallback((id) => {
    setExpanded(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }, []);

  const toggleTheme = React.useCallback(() => {
    setTheme(p => p === 'light' ? 'dark' : 'light');
  }, []);

  const ctx = {
    route, navigate, role,
    expanded, toggleExpand,
    theme, setTheme, toggleTheme,
    modal, openModal: setModal, closeModal: () => setModal(null),
  };

  // On unauthenticated routes, push login if user tries to go somewhere else
  // (Trivial — our routes always check auth via the Router branches above.)

  return (
    <NavContext.Provider value={ctx}>
      <Stage>
        <div style={{position: 'relative', width: 1440, height: 900}}>
          <Router route={route} role={role} theme={theme} />
          {modal === 'clear-session' && <ClearSessionOverlay />}
          {modal === 'delete-file' && <DeleteFileOverlay />}
          {modal === 'approve-user' && <ApproveUserOverlay />}
          {modal === 'disable-user' && <DisableUserOverlay />}
        </div>
      </Stage>

      <TweaksPanel title="Andal · Tweaks">
        <TweakSection label="Viewing as" />
        <TweakRadio
          label="Role"
          value={t.role}
          options={['general','rd','dli','forensics','admin']}
          onChange={(v) => setTweak('role', v)}
        />
        <div style={{
          fontSize: 10.5, color: 'rgba(41,38,27,.55)',
          padding: '2px 2px 0', lineHeight: 1.45,
        }}>
          {ROLE_BLURB[role]}
        </div>

        <TweakSection label="Feel" />
        <TweakColor
          label="Accent"
          value={ACCENT_SWATCHES.find(([k]) => k === t.accent)?.[1] || ACCENT_SWATCHES[0][1]}
          options={ACCENT_SWATCHES.map(([, hex]) => hex)}
          onChange={(hex) => {
            const found = ACCENT_SWATCHES.find(([, h]) => h === hex);
            if (found) setTweak('accent', found[0]);
          }}
        />
        <TweakRadio
          label="Density"
          value={t.density}
          options={['compact', 'comfortable', 'spacious']}
          onChange={(v) => setTweak('density', v)}
        />

        <TweakSection label="Jump to" />
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6}}>
          {[
            ['Sign in', '/login'],
            ['Sign up', '/signup'],
            ['Pending', '/pending'],
            ['Welcome', '/welcome'],
            ['Knowledge', '/knowledge'],
            ['Files', '/files'],
            ['Settings', '/settings'],
            ['Admin · Users', '/admin/users'],
          ].map(([n, to]) => {
            // Hide admin shortcut for non-admins
            if (to.startsWith('/admin') && !r.admin) return null;
            const active = route === to || (to !== '/login' && route.startsWith(to));
            return (
              <button
                key={to}
                onClick={() => navigate(to)}
                style={{
                  appearance: 'none', border: '1px solid rgba(0,0,0,.08)',
                  background: active ? 'rgba(0,135,81,.12)' : 'rgba(255,255,255,.5)',
                  color: active ? '#006c40' : 'rgba(41,38,27,.8)',
                  borderRadius: 6, padding: '5px 8px', fontSize: 11,
                  fontFamily: 'inherit', cursor: 'default', textAlign: 'left',
                }}
              >{n}</button>
            );
          })}
        </div>
      </TweaksPanel>
    </NavContext.Provider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<PrototypeApp />);
