/* global React, I, Shell, Sidebar, TopBar, ROLES */

// ===== 11. Files & Storage =====
const FilesScreen = ({ theme = 'light', roleId = 'rd', variant = 'default' }) => {
  const nav = useNav();
  const r = ROLES[roleId] || ROLES.rd;
  const nearLimit = variant === 'near' || variant === 'full';
  const full = variant === 'full';
  const empty = variant === 'empty';

  // All possible files; we'll filter by the user's modules
  const ALL_FILES = [
    ['NCCC-procurement-2026-draft.pdf', 'knowledge', 'Knowledge', 'PDF', '1.4 MB', 'ok', 'Indexed', '22 May 13:42'],
    ['NCCC-procurement-2024.pdf', 'knowledge', 'Knowledge', 'PDF', '1.2 MB', 'ok', 'Indexed', '22 May 13:41'],
    ['briefing-q1.docx', 'knowledge', 'Knowledge', 'DOCX', '420 KB', 'ok', 'Indexed', '21 May 16:18'],
    ['pipeline.py', 'coding', 'Coding', 'PY', '3.2 KB', 'ok', 'Available', '22 May 14:02'],
    ['normalize.py', 'coding', 'Coding', 'PY', '1.4 KB', 'ok', 'Available', '22 May 14:01'],
    ['k8s-deploy.yaml', 'coding', 'Coding', 'YAML', '2.1 KB', 'ok', 'Available', '20 May 09:22'],
    ['maiduguri-02.wav', 'dialect', 'Dialect', 'WAV', '64 MB', 'ok', 'Result ready', '22 May 14:22'],
    ['press-kano.mp4', 'dialect', 'Dialect', 'MP4', '112 MB', 'warn', 'Processing', '22 May 14:25'],
    ['interview-04.m4a', 'dialect', 'Dialect', 'M4A', '24 MB', 'muted', 'Queued', '22 May 14:30'],
    ['auth-failures-2026-05-18.log', 'forensics', 'Forensics', 'LOG', '3.4 MB', 'ok', 'Result ready', '22 May 11:04'],
    ['incident-bundle-NTP.zip', 'forensics', 'Forensics', 'ZIP', '82 MB', 'warn', 'Processing · 17%', '22 May 09:47'],
    ['evidence-archive-04.tar.gz', 'forensics', 'Forensics', 'TAR.GZ', '6 MB', 'danger', 'Failed', '21 May 18:11'],
  ];
  const visibleFiles = ALL_FILES.filter(([, modId]) => r.modules.includes(modId));
  const fileCount = visibleFiles.length;

  // Storage breakdown per module — fake but consistent per user
  const STORAGE_BY_MOD = {
    knowledge: 84,
    coding: 26,
    dialect: 180,
    forensics: 110,
  };
  const MOD_LABEL = {
    knowledge: 'KNOWLEDGE',
    coding: 'CODING',
    dialect: 'DIALECT',
    forensics: 'FORENSICS',
  };
  const breakdown = r.modules.map(id => [id, STORAGE_BY_MOD[id]]);
  const baseUsed = breakdown.reduce((s, [, v]) => s + v, 0);
  const used = full ? Math.max(baseUsed, 498) : nearLimit ? Math.max(baseUsed, 462) : baseUsed;
  const pct = Math.round((used / 500) * 100);

  // Filter tabs — only modules the user has access to
  const [filter, setFilter] = React.useState('all');
  const filterTabs = [['all', 'All'], ...r.modules.map(id => [id, MOD_LABEL[id].charAt(0) + MOD_LABEL[id].slice(1).toLowerCase()])];
  const shownFiles = filter === 'all' ? visibleFiles : visibleFiles.filter(([, modId]) => modId === filter);

  const empty_copy_modules = r.modules.map(id => id === 'forensics' ? 'Forensics' : id.charAt(0).toUpperCase() + id.slice(1));
  const emptyCopy = empty_copy_modules.length === 1
    ? `Files you upload in ${empty_copy_modules[0]} will appear here.`
    : `Files you upload in ${empty_copy_modules.slice(0, -1).join(', ')} or ${empty_copy_modules.slice(-1)} will appear here.`;

  return (
    <Shell theme={theme}>
      <Sidebar active="files" roleId={roleId} themeName={theme}
        storageOverride={{used, total: 500, by: {}}} />
      <div className="a-main">
        <TopBar module="Files & storage" title="All files" themeName={theme} />

        <div className="a-ph">
          <div>
            <h1 className="a-ph__title">Files & storage</h1>
            <p className="a-ph__sub">All uploads across your workspaces. Deleting files frees storage quota.</p>
          </div>
          <div className="a-ph__actions">
            <button className="a-btn">{I.search}<span>Search</span></button>
            <button className="a-btn primary">{I.upload}<span>Upload</span></button>
          </div>
        </div>

        <div style={{padding: '20px 32px', display: 'flex', flexDirection: 'column', gap: 18, flex: 1, overflow: 'hidden'}}>

          <div className="row" style={{gap: 14}}>
            <div className="a-card" style={{flex: 1.6, padding: '16px 18px'}}>
              <div className="row" style={{justifyContent: 'space-between', alignItems: 'baseline'}}>
                <div className="mono-meta">GLOBAL QUOTA</div>
                <div className="mono" style={{fontSize: 12, color: 'var(--fg-3)'}}>500 MB · shared across your workspaces</div>
              </div>
              <div className="row" style={{gap: 14, alignItems: 'baseline', marginTop: 6}}>
                <div className="mono" style={{fontSize: 28, fontWeight: 500, color: full ? 'var(--danger)' : nearLimit ? 'var(--warn)' : 'var(--fg)'}}>{used} MB</div>
                <div className="mono" style={{color: 'var(--fg-3)', fontSize: 12}}>used of 500 MB · {500 - used} MB free</div>
              </div>
              <div className={`a-bar ${full ? 'danger' : nearLimit ? 'warn' : ''}`} style={{marginTop: 12, height: 6}}>
                <i style={{width: `${pct}%`}} />
              </div>
              <div className="row" style={{gap: 16, marginTop: 12, fontSize: 12, flexWrap: 'wrap'}}>
                {breakdown.map(([id, mb]) => (
                  <div key={id} className="row" style={{gap: 6}}>
                    <span className="st-dot ok" />
                    <span className="mono" style={{color: 'var(--fg-3)'}}>{MOD_LABEL[id]}</span>
                    <span className="mono">{mb} MB</span>
                  </div>
                ))}
              </div>
            </div>

            {nearLimit && !full && (
              <div className="a-card" style={{flex: 1, padding: '16px 18px', borderColor: 'var(--warn)', background: 'var(--warn-soft)'}}>
                <div className="row" style={{gap: 8, color: 'var(--warn)'}}>{I.warn}<strong style={{color: 'var(--fg)'}}>Storage near limit</strong></div>
                <p style={{margin: '6px 0 10px', fontSize: 13, color: 'var(--fg-2)'}}>
                  You have {500 - used} MB remaining. New uploads may be rejected if quota is exceeded. Deleting files frees storage quota.
                </p>
                <button className="a-btn sm">Review largest files</button>
              </div>
            )}
            {full && (
              <div className="a-card" style={{flex: 1, padding: '16px 18px', borderColor: 'var(--danger)', background: 'var(--danger-soft)'}}>
                <div className="row" style={{gap: 8, color: 'var(--danger)'}}>{I.warn}<strong style={{color: 'var(--fg)'}}>Storage full</strong></div>
                <p style={{margin: '6px 0 10px', fontSize: 13, color: 'var(--fg-2)'}}>
                  You've reached your 500 MB quota. New uploads are blocked until you free space. Deleting files frees storage quota.
                </p>
                <button className="a-btn sm">Review largest files</button>
              </div>
            )}
            {!nearLimit && (
              <div className="a-card a-statcard" style={{flex: 1, padding: '16px 18px'}}>
                <div className="mono-meta">FILES</div>
                <div className="mono" style={{fontSize: 28, fontWeight: 500}}>{fileCount}</div>
                <div className="mono" style={{fontSize: 11, color: 'var(--fg-3)', marginTop: 2}}>across {r.modules.length} {r.modules.length === 1 ? 'workspace' : 'workspaces'}</div>
              </div>
            )}
          </div>

          <div className="a-card" style={{overflow: 'hidden', flex: 1, display: 'flex', flexDirection: 'column'}}>
            <div className="row" style={{padding: '10px 14px', borderBottom: '1px solid var(--border-soft)'}}>
              <div className="seg">
                {filterTabs.map(([id, label]) => (
                  <button key={id} className={filter === id ? 'active' : ''}
                    onClick={() => setFilter(id)}>{label}</button>
                ))}
              </div>
              <div className="mono-meta" style={{marginLeft: 'auto'}}>{shownFiles.length} {shownFiles.length === 1 ? 'FILE' : 'FILES'}</div>
            </div>
            {empty ? (
              <div className="col" style={{padding: '60px 16px', alignItems: 'center', gap: 8, textAlign: 'center'}}>
                <div style={{color: 'var(--fg-3)'}}>{I.folder}</div>
                <div style={{fontSize: 14}}>No files yet</div>
                <div className="muted" style={{fontSize: 12.5, maxWidth: 320}}>{emptyCopy}</div>
                <button className="a-btn sm" style={{marginTop: 6}}>Upload</button>
              </div>
            ) : (
              <table className="a-table" style={{flex: 1}}>
                <thead><tr><th style={{minWidth: 280}}>File</th><th>Workspace</th><th>Type</th><th>Size</th><th>Status</th><th>Uploaded</th><th></th></tr></thead>
                <tbody>
                  {shownFiles.map(([f, modId, m, t, sz, st, stat, time]) => (
                    <tr key={f}>
                      <td><div className="row" style={{gap: 10}}><span style={{color: 'var(--fg-3)'}}>{I.file}</span><span style={{color: 'var(--fg)'}}>{f}</span></div></td>
                      <td><span className="mono" style={{fontSize: 12, color: 'var(--fg-2)'}}>{m}</span></td>
                      <td><span className="a-pill mono">{t}</span></td>
                      <td className="mono" style={{fontSize: 12}}>{sz}</td>
                      <td><span className={`a-pill ${st} mono`}><span className="dot" />{stat}</span></td>
                      <td className="mono" style={{fontSize: 12, color: 'var(--fg-3)'}}>{time}</td>
                      <td><div className="row" style={{gap: 4, justifyContent: 'flex-end'}}>
                        {stat === 'Result ready' && <button className="a-btn ghost sm">View</button>}
                        <button className="a-btn ghost sm" style={{color: 'var(--fg-3)'}}
                          onClick={nav ? () => nav.openModal('delete-file') : undefined}>{I.trash}</button>
                      </div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </Shell>
  );
};

// Delete confirmation modal
const DeleteFileModal = ({ theme = 'light', roleId = 'rd' }) => (
  <Shell theme={theme}>
    <Sidebar active="files" roleId={roleId} themeName={theme} />
    <div className="a-main" style={{position: 'relative'}}>
      <TopBar module="Files & storage" title="All files" themeName={theme} />
      <div style={{padding: 32, opacity: .35, filter: 'blur(.5px)'}}>
        <div className="a-card" style={{height: 600}} />
      </div>
      <div className="a-modal-back">
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
            <button className="a-btn">Cancel</button>
            <button className="a-btn danger">Delete file</button>
          </div>
        </div>
      </div>
    </div>
  </Shell>
);

// ===== 12. Account & Settings =====
const AccountScreen = ({ theme = 'light', roleId = 'rd' }) => {
  const r = ROLES[roleId] || ROLES.rd;
  const emailSlug = r.name.toLowerCase().split(' ').map((p,i) => i === 0 ? p[0] : p).join('.');
  const email = `${emailSlug}@nccc.gov.ng`;
  const staffId = { general: 'NCCC-03877', rd: 'NCCC-04217', dli: 'NCCC-04102', forensics: 'NCCC-04007', admin: 'NCCC-03012' }[roleId];
  const moduleNames = { knowledge: 'Knowledge', coding: 'Coding', dialect: 'Dialect', forensics: 'Forensics Intelligence' };
  return (
  <Shell theme={theme}>
    <Sidebar active="settings" roleId={roleId} themeName={theme} />
    <div className="a-main">
      <TopBar module="Account" title="Settings" themeName={theme} />
      <div className="a-ph">
        <div>
          <h1 className="a-ph__title">Account &amp; settings</h1>
          <p className="a-ph__sub">Profile and access are managed by Andal administrators for v1.</p>
        </div>
      </div>

      <div style={{padding: '24px 32px', display: 'flex', gap: 24, flex: 1, overflow: 'hidden'}}>

        <div className="col" style={{width: 220, gap: 2}}>
          {[
            ['Profile', true],
            ['Modules', false],
            ['Appearance', false],
            ['Security', false],
            ['Notifications', false],
          ].map(([n, a]) => (
            <div key={n} className={`a-nav-item ${a ? 'active' : ''}`} style={{padding: a ? '7px 10px' : '8px 10px'}}>
              <span>{n}</span>
            </div>
          ))}
        </div>

        <div className="col" style={{flex: 1, gap: 18, minWidth: 0}}>

          <div className="a-card">
            <div className="row" style={{padding: '14px 18px', borderBottom: '1px solid var(--border-soft)'}}>
              <div>
                <div style={{fontWeight: 500}}>Profile</div>
                <div className="muted" style={{fontSize: 12.5}}>Managed by admin. To request a change, contact your directorate.</div>
              </div>
              <span className="a-pill mono" style={{marginLeft: 'auto'}}>READ-ONLY</span>
            </div>
            <div style={{padding: '14px 18px', display: 'grid', gridTemplateColumns: '160px 1fr', columnGap: 18, rowGap: 12, fontSize: 13.5}}>
              <div className="mono-meta">FULL NAME</div><div>{r.name}</div>
              <div className="mono-meta">EMAIL</div><div className="mono" style={{fontSize: 12.5}}>{email}</div>
              <div className="mono-meta">STAFF ID</div><div className="mono" style={{fontSize: 12.5}}>{staffId}</div>
              <div className="mono-meta">DEPARTMENT</div><div>{r.dept}</div>
              <div className="mono-meta">ACCESS LEVEL</div><div>{r.role}</div>
              <div className="mono-meta">MEMBER SINCE</div><div className="mono" style={{fontSize: 12.5}}>14 May 2026</div>
            </div>
          </div>

          <div className="a-card">
            <div className="row" style={{padding: '14px 18px', borderBottom: '1px solid var(--border-soft)'}}>
              <div style={{fontWeight: 500}}>Workspaces available</div>
              <span className="mono-meta" style={{marginLeft: 'auto'}}>{r.modules.length} {r.modules.length === 1 ? 'WORKSPACE' : 'WORKSPACES'}</span>
            </div>
            <div style={{padding: '4px 8px 8px'}}>
              {[
                ['knowledge', 'Knowledge', I.book, 'All approved staff'],
                ['coding', 'Coding', I.code, 'R&D department'],
                ['dialect', 'Dialect', I.voice, 'DLI / Forensics only'],
                ['forensics', 'Forensics Intelligence', I.shield, 'Forensics only'],
              ].filter(([id]) => r.modules.includes(id)).map(([id, n, icon, scope]) => (
                <div key={n} className="row" style={{padding: '10px 10px', borderRadius: 6}}>
                  <span style={{color: 'var(--fg)'}}>{icon}</span>
                  <div className="col" style={{lineHeight: 1.2, marginLeft: 4}}>
                    <span style={{color: 'var(--fg)'}}>{n}</span>
                    <span className="mono" style={{fontSize: 10.5, color: 'var(--fg-3)'}}>{scope}</span>
                  </div>
                  <span className="a-pill ok mono" style={{marginLeft: 'auto'}}><span className="dot" />ENABLED</span>
                </div>
              ))}
            </div>
          </div>

          <div className="a-card">
            <div className="row" style={{padding: '14px 18px', borderBottom: '1px solid var(--border-soft)'}}>
              <div style={{fontWeight: 500}}>Appearance</div>
            </div>
            <div className="row" style={{padding: '14px 18px', gap: 18}}>
              <div className="col" style={{flex: 1, gap: 2}}>
                <div>Theme</div>
                <div className="muted" style={{fontSize: 12.5}}>Saved to this account.</div>
              </div>
              <div className="seg">
                <button className={theme === 'light' ? 'active' : ''}>{I.sun}<span style={{marginLeft:6}}>Light</span></button>
                <button className={theme === 'dark' ? 'active' : ''}>{I.moon}<span style={{marginLeft:6}}>Dark</span></button>
                <button>System</button>
              </div>
            </div>
          </div>

          <div className="row" style={{justifyContent: 'flex-end', gap: 8}}>
            <button className="a-btn">{I.signout}<span>Sign out</span></button>
          </div>
        </div>
      </div>
    </div>
  </Shell>
  );
};

Object.assign(window, { FilesScreen, DeleteFileModal, AccountScreen });
