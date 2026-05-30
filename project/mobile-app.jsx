/* global React, ReactDOM, useTweaks, TweaksPanel, TweakSection, TweakRadio,
   PhoneFrame, BottomTabs, M_ROLES,
   M_Login, M_Welcome, M_Knowledge, M_KnowledgeChat,
   M_Dialect, M_DialectResult, M_Files, M_Account
*/

const M_TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "role": "rd"
}/*EDITMODE-END*/;

const M_ROLE_BLURB = {
  general: 'Knowledge only',
  rd: 'Knowledge + Coding',
  dli: 'Knowledge + Dialect',
  forensics: 'Knowledge + Dialect + Forensics',
};

function MobileApp() {
  const [t, setTweak] = useTweaks(M_TWEAK_DEFAULTS);
  const role = t.role;
  const r = M_ROLES[role];

  // Screen stack — each entry is a route string
  const [stack, setStack] = React.useState(['/login']);
  const [tab, setTab] = React.useState('home');
  const route = stack[stack.length - 1];

  // When role changes, reset to a safe home
  React.useEffect(() => {
    if (route === '/login') return;
    setStack(['/' + (r.modules.length === 1 ? r.modules[0] : 'welcome')]);
    setTab('home');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role]);

  const push = (to) => setStack(s => [...s, to]);
  const pop = () => setStack(s => s.length > 1 ? s.slice(0, -1) : s);

  // Bottom tab handler — replace the stack with a single root for the tab
  const onTab = (id) => {
    setTab(id);
    if (id === 'home') {
      setStack(['/' + (r.modules.length === 1 ? r.modules[0] : 'welcome')]);
    } else if (id === 'files') {
      setStack(['/files']);
    } else if (id === 'account') {
      setStack(['/account']);
    }
  };

  const signIn = () => {
    setTab('home');
    setStack(['/' + (r.modules.length === 1 ? r.modules[0] : 'welcome')]);
  };

  const openWorkspace = (id) => {
    push('/' + id);
  };

  const signOut = () => {
    setTab('home');
    setStack(['/login']);
  };

  // Whether to show bottom tabs (hidden on login)
  const showTabs = route !== '/login';

  const renderRoute = () => {
    if (route === '/login') return <M_Login onSignIn={signIn} />;
    if (route === '/welcome') return <M_Welcome roleId={role} onOpen={openWorkspace} />;
    if (route === '/knowledge') return <M_Knowledge roleId={role}
      onBack={r.modules.length > 1 ? pop : null}
      onOpenChat={() => push('/knowledge/chat')} />;
    if (route === '/knowledge/chat') return <M_KnowledgeChat onBack={pop} />;
    if (route === '/coding') return <M_Knowledge roleId={role}
      onBack={pop}
      onOpenChat={() => push('/knowledge/chat')} />;
    if (route === '/dialect') return <M_Dialect onBack={pop} onResult={() => push('/dialect/result')} />;
    if (route === '/dialect/result') return <M_DialectResult onBack={pop} />;
    if (route === '/forensics') return <M_Knowledge roleId={role} onBack={pop} onOpenChat={() => push('/knowledge/chat')} />;
    if (route === '/files') return <M_Files roleId={role} onOpenFile={() => {}} />;
    if (route === '/account') return <M_Account roleId={role} onSignOut={signOut} />;
    return <M_Login onSignIn={signIn} />;
  };

  return (
    <>
      <PhoneFrame>
        {renderRoute()}
        {showTabs && <BottomTabs tab={tab} onTab={onTab} />}
      </PhoneFrame>

      <TweaksPanel title="Andal Mobile · Tweaks">
        <TweakSection label="Viewing as" />
        <TweakRadio
          label="Role"
          value={role}
          options={['general','rd','dli','forensics']}
          onChange={(v) => setTweak('role', v)}
        />
        <div style={{
          fontSize: 10.5, color: 'rgba(41,38,27,.55)',
          padding: '2px 2px 0', lineHeight: 1.45,
        }}>
          {M_ROLE_BLURB[role]}
        </div>

        <TweakSection label="Jump to" />
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6}}>
          {[
            ['Sign in', '/login'],
            ['Welcome', '/welcome'],
            ['Knowledge', '/knowledge'],
            ['Knowledge chat', '/knowledge/chat'],
            ['Dialect', '/dialect'],
            ['Dialect result', '/dialect/result'],
            ['Files', '/files'],
            ['Account', '/account'],
          ].map(([n, to]) => {
            const isCurrent = route === to;
            return (
              <button key={to} onClick={() => {
                setStack([to]);
                setTab(to === '/files' ? 'files' : to === '/account' ? 'account' : 'home');
              }} style={{
                appearance: 'none', border: '1px solid rgba(0,0,0,.08)',
                background: isCurrent ? 'rgba(0,135,81,.12)' : 'rgba(255,255,255,.5)',
                color: isCurrent ? '#006c40' : 'rgba(41,38,27,.8)',
                borderRadius: 6, padding: '5px 8px', fontSize: 11,
                fontFamily: 'inherit', cursor: 'default', textAlign: 'left',
              }}>{n}</button>
            );
          })}
        </div>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<MobileApp />);
