/* global React, MI, M_ROLES, M_MODULES, M_CONVOS, StatusBar, AppBar, BottomTabs, Brand */

// ===== LOGIN =====
const M_Login = ({ onSignIn }) => (
  <>
    <StatusBar />
    <div className="m-login">
      <div className="m-login__logos">
        <div className="m-login__logo">ONSA<br/>LOGO</div>
        <div className="m-login__logo">NCCC<br/>LOGO</div>
      </div>
      <div className="m-login__hd">
        <h1>Sign in to Andal</h1>
        <p>Use your Andal account credentials.</p>
      </div>
      <div style={{display:'flex', flexDirection:'column', gap:14}}>
        <div className="m-field">
          <label className="m-label">Work email</label>
          <input className="m-input" defaultValue="a.bashir@nccc.gov.ng" />
        </div>
        <div className="m-field">
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <label className="m-label">Password</label>
            <span className="m-link">Forgot?</span>
          </div>
          <input type="password" className="m-input" defaultValue="••••••••••••" />
        </div>
        <button className="m-btn primary full" style={{marginTop: 6}} onClick={onSignIn}>Sign in</button>
        <div style={{textAlign:'center', fontSize: 13, color:'var(--fg-3)'}}>
          New to Andal? <span className="m-link">Create account</span>
        </div>
      </div>
      <div className="m-login__foot">BUILT BY R&amp;D AND NCCC</div>
    </div>
  </>
);

// ===== WELCOME =====
const M_Welcome = ({ roleId, onOpen }) => {
  const r = M_ROLES[roleId];
  const firstName = r.name.split(' ')[0];
  const visible = M_MODULES.filter(m => r.modules.includes(m.id));
  return (
    <>
      <StatusBar />
      <div className="m-appbar">
        <Brand sub="NCCC · v1.0" />
        <div style={{marginLeft:'auto', display:'flex', alignItems:'center', gap:8}}>
          <button className="m-iconbtn">{MI.bell}</button>
        </div>
      </div>
      <div className="m-body">
        <div className="m-scroll">
          <div className="m-greet">
            <span className="m-greet__eyebrow">22 MAY · 13:42 · WAT</span>
            <h1 className="m-greet__title">Good afternoon, {firstName}.</h1>
            <p className="m-greet__sub">Pick a workspace to continue.</p>
          </div>

          <div className="m-wcards">
            {visible.map(m => {
              const recents = (M_CONVOS[m.id] || []).slice(0, 2);
              return (
                <button key={m.id} className="m-wcard" onClick={() => onOpen(m.id)}
                  style={{textAlign:'left'}}>
                  <div className="m-wcard__hd">
                    <div className="m-wcard__ico">{m.icon}</div>
                    <div style={{flex:1, minWidth:0, display:'flex', flexDirection:'column', lineHeight:1.25}}>
                      <span className="m-wcard__name">{m.name}</span>
                      <span className="m-wcard__desc">{m.desc}</span>
                    </div>
                    <span style={{color:'var(--fg-4)'}}>{MI.chevR}</span>
                  </div>
                  {recents.length > 0 && (
                    <div style={{display:'flex', flexDirection:'column', gap:6}}>
                      {recents.map((c, i) => (
                        <div key={i} className="m-wcard__recent">
                          <span style={{color:'var(--fg-4)'}}>{MI.clock}</span>
                          <span className="m-wcard__recent-title">{c.title}</span>
                          <span className="m-wcard__recent-time">{c.time}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

// ===== KNOWLEDGE HOME =====
const M_Knowledge = ({ roleId, onBack, onOpenChat, onComposerSend }) => {
  const r = M_ROLES[roleId];
  const firstName = r.name.split(' ')[0];
  const [showAttach, setShowAttach] = React.useState(false);
  const recents = M_CONVOS.knowledge.slice(0, 3);
  const suggested = [
    'Draft a one-page status memo',
    'Summarize a document into key findings',
    'Compare two policy clauses',
    'Translate this briefing into English',
  ];
  return (
    <>
      <StatusBar />
      <AppBar
        title="Knowledge"
        onBack={onBack}
        actions={<button className="m-iconbtn">{MI.search}</button>}
      />
      <div className="m-body">
        <div className="m-scroll">
          <div className="m-greet" style={{paddingBottom: 0}}>
            <span className="m-greet__eyebrow">NEW CONVERSATION</span>
            <h1 className="m-greet__title">What are we working on, {firstName}?</h1>
          </div>

          <div style={{display:'flex', flexDirection:'column', gap:8}}>
            <div className="m-section-title">Suggested</div>
            <div className="m-suggest">
              {suggested.map((s, i) => (
                <button key={i} className="m-suggest__item" onClick={onOpenChat}>
                  <span style={{flex:1}}>{s}</span>
                  <span className="m-suggest__arrow">{MI.chevR}</span>
                </button>
              ))}
            </div>
          </div>

          <div style={{display:'flex', flexDirection:'column', gap:8}}>
            <div className="m-section-title">Recent</div>
            <div className="m-thread">
              {recents.map((c, i) => (
                <button key={i} className="m-thread__row" onClick={onOpenChat}>
                  <span style={{color:'var(--fg-4)'}}>{MI.clock}</span>
                  <span className="m-thread__title">{c.title}</span>
                  <span className="m-thread__time">{c.time}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <ComposerM onAttach={() => setShowAttach(true)} placeholder="Ask Andal Knowledge…" />
      </div>
      {showAttach && <AttachSheet onClose={() => setShowAttach(false)} />}
    </>
  );
};

// ===== KNOWLEDGE CHAT =====
const M_KnowledgeChat = ({ onBack }) => {
  const [showAttach, setShowAttach] = React.useState(false);
  return (
    <>
      <StatusBar />
      <AppBar
        title="Procurement clause comparison"
        onBack={onBack}
        actions={<button className="m-iconbtn">{MI.more}</button>}
      />
      <div className="m-body">
        <div className="m-chat" style={{overflow:'hidden'}}>
          <div className="m-msg user">
            <div className="m-msg__meta">13:48 · Adamu</div>
            <div className="m-msg__bubble">
              Compare clauses 4.2 and 7.1 of these two procurement frameworks and flag any discrepancy in supplier obligation language.
            </div>
            <div style={{display:'flex', flexWrap:'wrap', gap:6}}>
              <span className="m-chip">{MI.file}<span>2024.pdf</span><span className="ext">· 1.2 MB</span></span>
              <span className="m-chip">{MI.file}<span>2026-draft.pdf</span><span className="ext">· 1.4 MB</span></span>
            </div>
          </div>

          <div className="m-msg assistant">
            <div className="m-msg__meta">13:48 · Andal Knowledge</div>
            <div className="m-msg__bubble">
              Three substantive discrepancies between the supplier obligation clauses:
              <ol style={{margin:'8px 0 0', paddingLeft:18, lineHeight:1.6}}>
                <li><strong>Notification window.</strong> 2024 requires <span className="mono">30 days</span>; 2026 reduces to <span className="mono">14 days</span>.</li>
                <li><strong>Liability cap.</strong> 2026 introduces uncapped liability for data-handling breaches.</li>
                <li><strong>Audit access.</strong> 2026 adds on-site inspection right with 5 business days' notice.</li>
              </ol>
            </div>
          </div>
        </div>

        <ComposerM onAttach={() => setShowAttach(true)} placeholder="Reply or attach more context…" />
      </div>
      {showAttach && <AttachSheet onClose={() => setShowAttach(false)} />}
    </>
  );
};

// ===== DIALECT UPLOAD =====
const M_Dialect = ({ onBack, onResult }) => {
  const [lang, setLang] = React.useState('Hausa');
  const [task, setTask] = React.useState('Both');
  return (
    <>
      <StatusBar />
      <AppBar
        title="Dialect"
        onBack={onBack}
        actions={<button className="m-iconbtn">{MI.more}</button>}
      />
      <div className="m-body">
        <div className="m-scroll">
          <div className="m-greet" style={{paddingBottom: 0}}>
            <span className="m-greet__eyebrow">NEW JOB</span>
            <h1 className="m-greet__title">What shall we render?</h1>
            <p className="m-greet__sub">Record or upload audio for transcription and translation.</p>
          </div>

          <div className="m-dz">
            <div className="m-record">{MI.mic}</div>
            <div className="m-dz__title">Tap to record</div>
            <div className="m-dz__sub">or <span className="m-link">choose a file</span> from your device. Up to 500 MB.</div>
            <div className="m-dz__types">.WAV · .MP3 · .M4A · .MP4 · .MOV</div>
          </div>

          <div style={{display:'flex', flexDirection:'column', gap:8}}>
            <div className="m-section-title">Source language</div>
            <div className="m-radios">
              {['Auto-detect','Hausa','Kanuri','Fulfulde'].map(l => (
                <button key={l} onClick={() => setLang(l)}>
                  <span>{l}</span>
                  {lang === l && <span className="check">{MI.check}</span>}
                </button>
              ))}
            </div>
          </div>

          <div style={{display:'flex', flexDirection:'column', gap:8}}>
            <div className="m-section-title">Task</div>
            <div className="m-seg">
              <button className={task === 'Transcribe' ? 'active' : ''} onClick={() => setTask('Transcribe')}>Transcribe</button>
              <button className={task === 'Translate' ? 'active' : ''} onClick={() => setTask('Translate')}>Translate</button>
              <button className={task === 'Both' ? 'active' : ''} onClick={() => setTask('Both')}>Both</button>
            </div>
          </div>

          <div style={{display:'flex', flexDirection:'column', gap:8}}>
            <div className="m-section-title">Recent jobs</div>
            <button className="m-file" onClick={onResult} style={{textAlign:'left', width:'100%'}}>
              <div className="m-file__ico">{MI.voice}</div>
              <div className="m-file__main">
                <span className="m-file__name">maiduguri-02.wav</span>
                <span className="m-file__meta"><span>HAU</span><span>·</span><span>14:22</span></span>
              </div>
              <span className="m-file__status ok">DONE</span>
            </button>
            <div className="m-file">
              <div className="m-file__ico">{MI.voice}</div>
              <div className="m-file__main">
                <span className="m-file__name">press-kano.mp4</span>
                <span className="m-file__meta"><span>AUTO</span><span>·</span><span>08:11</span></span>
              </div>
              <span className="m-file__status warn">42%</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// ===== DIALECT RESULT =====
const M_DialectResult = ({ onBack }) => {
  const [tab, setTab] = React.useState('translation');
  return (
    <>
      <StatusBar />
      <AppBar
        title="maiduguri-02.wav"
        onBack={onBack}
        actions={<button className="m-iconbtn">{MI.download}</button>}
      />
      <div className="m-body">
        <div style={{padding:'2px 16px 12px', display:'flex', gap:8, flexWrap:'wrap'}}>
          <span className="m-pill ok"><span className="dot" />HIGH CONFIDENCE</span>
          <span className="m-pill">HAU · 14:22</span>
          <span className="m-pill">3 SPEAKERS</span>
        </div>
        <div className="m-result-tabs">
          <button className={tab === 'source' ? 'active' : ''} onClick={() => setTab('source')}>Source</button>
          <button className={tab === 'translation' ? 'active' : ''} onClick={() => setTab('translation')}>Translation</button>
        </div>
        <div className="m-scroll" style={{paddingTop:12, gap: 0}}>
          {tab === 'translation' ? (
            <>
              {[
                ['00:12', '', 'On Tuesday, we went to a security officials\u2019 meeting in Maiduguri to discuss matters relating to security.'],
                ['00:34', '', 'Discussions were held on how to strengthen cooperation between traders and the authorities.'],
                ['01:05', '', 'After that, it was confirmed that security measures would be carried out throughout the state.'],
                ['01:48', '', 'We have pledged to continue working with the community for this purpose.'],
              ].map(([t, sp, txt], i) => (
                <div key={i} className="m-transcript-row">
                  <div className="m-transcript-row__meta">
                    <span>{t}</span>
                  </div>
                  <div className="m-transcript-row__text">{txt}</div>
                </div>
              ))}
            </>
          ) : (
            <>
              {[
                ['00:12', 'S1', 'Ranar Talata, mun tafi taron jami\u2019an tsaro a Maiduguri don tattauna batutuwan da suka shafi tsaro.'],
                ['00:34', 'S2', 'An yi shawarwari kan yadda za a inganta hadin gwiwar yan kasuwa da hukuma.'],
                ['01:05', 'S1', 'Bayan haka, an tabbatar da cewa za a aiwatar da matakan tsaro a duk fadin jihar.'],
                ['01:48', 'S3', 'Mun yi alkawarin cewa za mu ci gaba da hada kai da al\u2019umma don wannan manufa.'],
              ].map(([t, sp, txt], i) => (
                <div key={i} className="m-transcript-row">
                  <div className="m-transcript-row__meta">
                    <span>{t}</span>
                    <span className="m-transcript-row__speaker">{sp}</span>
                  </div>
                  <div className="m-transcript-row__text">{txt}</div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

// ===== FILES =====
const M_Files = ({ roleId, onBack, onOpenFile }) => {
  const r = M_ROLES[roleId];
  const ALL = [
    ['NCCC-procurement-2026-draft.pdf', 'knowledge', 'PDF', '1.4 MB', 'ok', 'Indexed', '22 May 13:42'],
    ['NCCC-procurement-2024.pdf',       'knowledge', 'PDF', '1.2 MB', 'ok', 'Indexed', '22 May 13:41'],
    ['briefing-q1.docx',                'knowledge', 'DOCX','420 KB','ok', 'Indexed', '21 May 16:18'],
    ['pipeline.py',                     'coding',    'PY',  '3.2 KB','ok', 'Available','22 May 14:02'],
    ['k8s-deploy.yaml',                 'coding',    'YAML','2.1 KB','ok', 'Available','20 May 09:22'],
    ['maiduguri-02.wav',                'dialect',   'WAV', '64 MB', 'ok', 'Result ready','22 May 14:22'],
    ['press-kano.mp4',                  'dialect',   'MP4', '112 MB','warn','Processing','22 May 14:25'],
    ['auth-failures.log',               'forensics', 'LOG', '3.4 MB','ok', 'Result ready','22 May 11:04'],
  ];
  const visible = ALL.filter(([, mod]) => r.modules.includes(mod));
  const STORAGE_BY_MOD = { knowledge: 84, coding: 26, dialect: 180, forensics: 110 };
  const used = r.modules.reduce((s, id) => s + STORAGE_BY_MOD[id], 0);
  const pct = Math.round((used / 500) * 100);

  // Group files by module, in role.modules order
  const grouped = r.modules.map(modId => ({
    modId,
    name: M_MODULES.find(m => m.id === modId).name,
    items: visible.filter(([, mod]) => mod === modId),
  })).filter(g => g.items.length > 0);

  return (
    <>
      <StatusBar />
      <AppBar
        title="Files & storage"
        actions={<button className="m-iconbtn">{MI.search}</button>}
      />
      <div className="m-body">
        <div className="m-scroll">
          <div className="m-quota">
            <div className="m-quota__row">
              <span className="m-quota__label">STORAGE</span>
              <span className="m-quota__free">{500 - used} MB free</span>
            </div>
            <div className="m-quota__row" style={{marginTop: 4}}>
              <span className="m-quota__big">{used} <span style={{fontSize:13, color:'var(--fg-3)'}}>/ 500 MB</span></span>
            </div>
            <div className="m-bar"><i style={{width: `${pct}%`}} /></div>
          </div>

          {grouped.map(g => (
            <div key={g.modId} className="m-files-group">
              <div className="m-files-group__title">{g.name} · {g.items.length}</div>
              {g.items.map(([f, mod, t, sz, st, stat, time]) => (
                <button key={f} className="m-file" onClick={onOpenFile} style={{textAlign:'left', width:'100%'}}>
                  <div className="m-file__ico">{MI.file}</div>
                  <div className="m-file__main">
                    <span className="m-file__name">{f}</span>
                    <span className="m-file__meta">
                      <span>{t}</span><span>·</span><span>{sz}</span><span>·</span><span>{time}</span>
                    </span>
                  </div>
                  <span className={`m-file__status ${st}`}>{stat.toUpperCase()}</span>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

// ===== ACCOUNT =====
const M_Account = ({ roleId, onSignOut }) => {
  const r = M_ROLES[roleId];
  const emailSlug = r.name.toLowerCase().split(' ').map((p,i) => i === 0 ? p[0] : p).join('.');
  const email = `${emailSlug}@nccc.gov.ng`;
  return (
    <>
      <StatusBar />
      <AppBar title="Account" />
      <div className="m-body">
        <div className="m-scroll">
          <div className="m-profile">
            <div className="m-profile__avatar">{r.initials}</div>
            <div className="m-profile__name">{r.name}</div>
            <div className="m-profile__role">{r.role.toUpperCase()}</div>
            <div className="mono" style={{fontSize: 11.5, color: 'var(--fg-3)'}}>{email}</div>
          </div>

          <div style={{display:'flex', flexDirection:'column', gap:8}}>
            <div className="m-section-title">Workspaces</div>
            <div className="m-list">
              {M_MODULES.filter(m => r.modules.includes(m.id)).map(m => (
                <div key={m.id} className="m-list__row">
                  <span className="m-list__ico">{m.icon}</span>
                  <span className="m-list__label">{m.name}</span>
                  <span className="m-pill ok"><span className="dot" />ON</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{display:'flex', flexDirection:'column', gap:8}}>
            <div className="m-section-title">Preferences</div>
            <div className="m-list">
              <button className="m-list__row">
                <span className="m-list__ico">{MI.bell}</span>
                <span className="m-list__label">Notifications</span>
                <span className="m-list__val">On</span>
                <span className="m-list__chev">{MI.chevR}</span>
              </button>
              <button className="m-list__row">
                <span className="m-list__ico">{MI.globe}</span>
                <span className="m-list__label">Language</span>
                <span className="m-list__val">English</span>
                <span className="m-list__chev">{MI.chevR}</span>
              </button>
              <button className="m-list__row">
                <span className="m-list__ico">{MI.cog}</span>
                <span className="m-list__label">Settings</span>
                <span className="m-list__chev">{MI.chevR}</span>
              </button>
            </div>
          </div>

          <div className="m-list">
            <button className="m-list__row danger" onClick={onSignOut}>
              <span className="m-list__ico">{MI.signout}</span>
              <span className="m-list__label">Sign out</span>
            </button>
          </div>

          <div style={{textAlign:'center', fontFamily:'var(--font-mono)', fontSize: 10, color: 'var(--fg-4)', letterSpacing: '0.06em', padding: '4px 0 12px'}}>
            BUILT BY R&amp;D AND NCCC · v1.0
          </div>
        </div>
      </div>
    </>
  );
};

// ===== Composer (bottom-anchored) =====
const ComposerM = ({ placeholder, onAttach }) => (
  <div className="m-composer-wrap">
    <div className="m-composer">
      <div className="m-composer__input">{placeholder}</div>
      <div className="m-composer__bar">
        <button className="m-iconbtn" onClick={onAttach}>{MI.attach}</button>
        <button className="m-iconbtn">{MI.mic}</button>
        <button className="m-composer__send">{MI.send}</button>
      </div>
    </div>
  </div>
);

// ===== Attach sheet =====
const AttachSheet = ({ onClose }) => (
  <div className="m-sheet-back" onClick={onClose}>
    <div className="m-sheet" onClick={(e) => e.stopPropagation()}>
      <div className="m-sheet__handle" />
      <div className="m-sheet__title">Attach</div>
      {[
        ['Upload from device',   'Browse files on this phone',                MI.upload],
        ['Documents',            'PDF, DOCX, TXT, Markdown',                  MI.file],
        ['Audio or video',       'Record or pick a media file',               MI.voice],
        ['From Files & storage', 'Pick something you\u2019ve already uploaded', MI.folder],
      ].map(([label, sub, icon]) => (
        <button key={label} className="m-sheet__option" onClick={onClose}>
          <div className="m-file__ico">{icon}</div>
          <div style={{flex:1, display:'flex', flexDirection:'column', minWidth:0}}>
            <span className="m-sheet__label">{label}</span>
            <span className="m-sheet__sub">{sub}</span>
          </div>
          <span style={{color:'var(--fg-4)'}}>{MI.chevR}</span>
        </button>
      ))}
    </div>
  </div>
);

Object.assign(window, {
  M_Login, M_Welcome, M_Knowledge, M_KnowledgeChat,
  M_Dialect, M_DialectResult, M_Files, M_Account,
  ComposerM, AttachSheet,
});
