/* global React, I, Shell, Sidebar, TopBar */

// ===== 13. Admin Users =====
const AdminUsersScreen = ({ theme = 'light', roleId = 'admin' }) => {
  const nav = useNav();
  const users = [
    ['Halima Yusuf', 'h.yusuf@nccc.gov.ng', 'NCCC-04302', '—', 'pending', '—', '—', 'just now'],
    ['Sani Mohammed', 's.mohammed@nccc.gov.ng', 'NCCC-04298', '—', 'pending', '—', '—', '2 hr ago'],
    ['Folake Okeke', 'f.okeke@nccc.gov.ng', 'NCCC-04102', 'DLI', 'active', 'KN · DI', '218 MB', '4 min ago'],
    ['Mahmoud Tanko', 'm.tanko@nccc.gov.ng', 'NCCC-04007', 'Forensics', 'active', 'KN · DI · FX', '380 MB', '1 hr ago'],
    ['Adamu Bashir', 'a.bashir@nccc.gov.ng', 'NCCC-04217', 'R&D', 'active', 'KN · CD', '110 MB', '12 min ago'],
    ['Chioma Eze', 'c.eze@nccc.gov.ng', 'NCCC-04188', 'R&D', 'active', 'KN · CD', '64 MB', 'today'],
    ['Tunde Lawal', 't.lawal@nccc.gov.ng', 'NCCC-03877', 'General', 'active', 'KN', '12 MB', '3 days ago'],
    ['Imran Ali', 'i.ali@nccc.gov.ng', 'NCCC-03455', 'General', 'disabled', '—', '0 MB', '14 days ago'],
    ['Patrick Obi', 'p.obi@nccc.gov.ng', '—', 'Platform Admin', 'active', 'ALL', '92 MB', '7 min ago'],
  ];

  return (
    <Shell theme={theme}>
      <Sidebar active="admin-users" roleId="admin" themeName={theme} />
      <div className="a-main">
        <TopBar module="Admin · Users" title="All users" themeName={theme} />

        <div className="a-ph">
          <div>
            <h1 className="a-ph__title">Users</h1>
            <p className="a-ph__sub">Approve pending accounts, manage access, and disable accounts.</p>
          </div>
          <div className="a-ph__actions">
            <button className="a-btn">{I.download}<span>Export CSV</span></button>
          </div>
        </div>

        <div style={{padding: '20px 32px', flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 14}}>
          <div className="row" style={{gap: 12}}>
            <div className="a-card a-statcard" style={{flex: 1}}>
              <div className="a-statcard__label">PENDING</div>
              <div className="a-statcard__val mono" style={{color: 'var(--warn)'}}>2</div>
              <div className="a-statcard__delta">awaiting approval</div>
            </div>
            <div className="a-card a-statcard" style={{flex: 1}}>
              <div className="a-statcard__label">ACTIVE</div>
              <div className="a-statcard__val mono">26</div>
              <div className="a-statcard__delta">across 5 departments</div>
            </div>
            <div className="a-card a-statcard" style={{flex: 1}}>
              <div className="a-statcard__label">DISABLED</div>
              <div className="a-statcard__val mono">3</div>
              <div className="a-statcard__delta">no recent activity</div>
            </div>
            <div className="a-card a-statcard" style={{flex: 1}}>
              <div className="a-statcard__label">QUOTA USED</div>
              <div className="a-statcard__val mono">8.4 GB</div>
              <div className="a-statcard__delta">of 15 GB allocated</div>
            </div>
          </div>

          <div className="a-card" style={{flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden'}}>
            <div className="row" style={{padding: '10px 14px', borderBottom: '1px solid var(--border-soft)', gap: 8}}>
              <div className="seg">
                <button className="active">All <span className="mono" style={{color:'var(--fg-3)', marginLeft:4}}>31</span></button>
                <button>Pending <span className="mono" style={{color:'var(--warn)', marginLeft:4}}>2</span></button>
                <button>Active</button>
                <button>Disabled</button>
              </div>
              <div className="a-input" style={{flex: 1, maxWidth: 320, height: 30, marginLeft: 10, display: 'flex', alignItems: 'center', gap: 8, color: 'var(--fg-3)'}}>
                {I.search}<span style={{fontSize: 13}}>Search by name, email, or staff ID…</span>
              </div>
              <div className="mono-meta" style={{marginLeft: 'auto'}}>SHOWING 9 OF 31</div>
            </div>

            <table className="a-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Staff ID</th>
                  <th>Department</th>
                  <th>Status</th>
                  <th>Access</th>
                  <th>Storage</th>
                  <th>Last active</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {users.map(([n, em, sid, dept, st, access, sto, la], i) => (
                  <tr key={n} style={st === 'pending' ? {background: 'var(--warn-soft)'} : {}}>
                    <td>
                      <div className="row" style={{gap: 10}}>
                        <div className="a-avatar mono" style={{width: 26, height: 26, fontSize: 10}}>
                          {n.split(' ').map(p => p[0]).join('')}
                        </div>
                        <span>{n}</span>
                      </div>
                    </td>
                    <td className="mono" style={{fontSize: 12, color: 'var(--fg-2)'}}>{em}</td>
                    <td className="mono" style={{fontSize: 12, color: 'var(--fg-3)'}}>{sid}</td>
                    <td>{dept === '—' ? <span className="muted">Unassigned</span> : dept}</td>
                    <td>
                      {st === 'pending' && <span className="a-pill warn"><span className="dot" />PENDING</span>}
                      {st === 'active' && <span className="a-pill ok"><span className="dot" />ACTIVE</span>}
                      {st === 'disabled' && <span className="a-pill danger"><span className="dot" />DISABLED</span>}
                    </td>
                    <td className="mono" style={{fontSize: 11.5, color: 'var(--fg-2)'}}>{access}</td>
                    <td className="mono" style={{fontSize: 12, color: 'var(--fg-3)'}}>{sto}</td>
                    <td className="mono" style={{fontSize: 11.5, color: 'var(--fg-3)'}}>{la}</td>
                    <td>
                      <div className="row" style={{gap: 4, justifyContent: 'flex-end'}}>
                        {st === 'pending'
                          ? <button className="a-btn primary sm"
                              onClick={nav ? () => nav.openModal('approve-user') : undefined}>Review &amp; approve</button>
                          : st === 'active'
                            ? <button className="a-btn ghost sm"
                                onClick={nav ? () => nav.openModal('disable-user') : undefined}>Edit access</button>
                            : <button className="a-btn ghost sm">Re-enable</button>}
                        <button className="a-btn ghost sm" style={{color: 'var(--fg-3)', width: 26, padding: 0}}>{I.more}</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Shell>
  );
};

// ===== 14. Approve User Modal =====
const ApproveUserModal = ({ theme = 'light' }) => (
  <Shell theme={theme}>
    <Sidebar active="admin-users" roleId="admin" themeName={theme} />
    <div className="a-main" style={{position: 'relative'}}>
      <TopBar module="Admin · Users" title="Approve user" themeName={theme} />
      <div style={{padding: 32, opacity: .35, filter: 'blur(.5px)'}}>
        <div className="a-card" style={{height: 600}} />
      </div>

      <div className="a-modal-back">
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
                <div className="a-input" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer'}}>
                  <span style={{color: 'var(--fg)'}}>Research & Development</span>
                  <span style={{color: 'var(--fg-3)'}}>{I.chev}</span>
                </div>
                <div className="a-help">Determines default module access. Can be overridden after approval.</div>
              </div>

              <div className="a-field">
                <label className="a-label">Access level</label>
                <div className="row" style={{gap: 8}}>
                  <div className="seg">
                    <button className="active">Standard staff</button>
                    <button>Lead</button>
                    <button>Admin</button>
                  </div>
                </div>
              </div>

              <div className="col" style={{gap: 6}}>
                <label className="a-label">Module access preview</label>
                <div className="a-card" style={{padding: '4px 8px'}}>
                  {[
                    ['Knowledge', I.book, true, 'inherited from department'],
                    ['Coding', I.code, true, 'inherited from department'],
                    ['Dialect', I.voice, false, 'not granted to R&D'],
                    ['Forensics Intelligence', I.shield, false, 'not granted to R&D'],
                  ].map(([n, icon, on, reason]) => (
                    <div key={n} className="row" style={{padding: '8px 8px', borderRadius: 4}}>
                      <span style={{color: on ? 'var(--fg-2)' : 'var(--fg-4)'}}>{icon}</span>
                      <div className="col" style={{lineHeight: 1.2, marginLeft: 4}}>
                        <span style={{color: on ? 'var(--fg)' : 'var(--fg-3)', fontSize: 13}}>{n}</span>
                        <span className="mono" style={{fontSize: 10.5, color: 'var(--fg-3)'}}>{reason}</span>
                      </div>
                      <span style={{marginLeft: 'auto', color: on ? 'var(--accent)' : 'var(--fg-4)'}}>{on ? I.check : I.x}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="a-modal__ft">
            <button className="a-btn ghost" style={{marginRight: 'auto', color: 'var(--fg-3)'}}>View profile</button>
            <button className="a-btn">Cancel</button>
            <button className="a-btn primary">Approve account</button>
          </div>
        </div>
      </div>
    </div>
  </Shell>
);

// ===== 15. Disable User Modal =====
const DisableUserModal = ({ theme = 'light' }) => (
  <Shell theme={theme}>
    <Sidebar active="admin-users" roleId="admin" themeName={theme} />
    <div className="a-main" style={{position: 'relative'}}>
      <TopBar module="Admin · Users" title="Disable account" themeName={theme} />
      <div style={{padding: 32, opacity: .35, filter: 'blur(.5px)'}}>
        <div className="a-card" style={{height: 600}} />
      </div>

      <div className="a-modal-back">
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
            <div className="row" style={{gap: 12, padding: '10px 12px', background: 'var(--bg-soft)', borderRadius: 8, fontSize: 12.5}}>
              <div className="col" style={{flex: 1, gap: 2}}><span className="mono-meta">EMAIL</span><span className="mono">t.lawal@nccc.gov.ng</span></div>
              <div className="col" style={{flex: 1, gap: 2}}><span className="mono-meta">DEPT</span><span>General staff</span></div>
              <div className="col" style={{flex: 1, gap: 2}}><span className="mono-meta">FILES</span><span className="mono">3 · 12 MB</span></div>
            </div>
          </div>
          <div className="a-modal__ft">
            <button className="a-btn">Cancel</button>
            <button className="a-btn danger">Disable account</button>
          </div>
        </div>
      </div>
    </div>
  </Shell>
);

// ===== 16. Access Policies =====
const AccessPoliciesScreen = ({ theme = 'light' }) => {
  const depts = [
    ['General Staff', 'staff', [1,0,0,0]],
    ['R&D', 'research', [1,1,0,0]],
    ['DLI', 'language', [1,0,1,0]],
    ['Forensics', 'forensics', [1,0,1,1]],
    ['Platform Admin', 'admin', [1,1,1,1]],
  ];
  return (
    <Shell theme={theme}>
      <Sidebar active="admin-policy" roleId="admin" themeName={theme} />
      <div className="a-main">
        <TopBar module="Admin · Access policies" title="Department matrix" themeName={theme} />

        <div className="a-ph">
          <div>
            <h1 className="a-ph__title">Access policies</h1>
            <p className="a-ph__sub">Configure which departments can access each module. Changes affect what modules users can see after their next session refresh.</p>
          </div>
          <div className="a-ph__actions">
            <button className="a-btn">Discard</button>
            <button className="a-btn primary">Save changes</button>
          </div>
        </div>

        <div style={{padding: '20px 32px', flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 16}}>

          <div className="a-card" style={{padding: 0, overflow: 'hidden'}}>
            <table className="a-table a-matrix">
              <thead>
                <tr>
                  <th style={{width: 220}}>Department / role</th>
                  <th>Knowledge</th>
                  <th>Coding</th>
                  <th>Dialect</th>
                  <th>Forensics</th>
                  <th>Override</th>
                </tr>
              </thead>
              <tbody>
                {depts.map(([n, slug, perms], i) => (
                  <tr key={slug}>
                    <td>
                      <div className="col" style={{lineHeight: 1.2}}>
                        <span style={{fontWeight: 500}}>{n}</span>
                        <span className="mono" style={{fontSize: 10.5, color: 'var(--fg-3)'}}>role: {slug}</span>
                      </div>
                    </td>
                    {perms.map((v, j) => (
                      <td key={j}>
                        <div className="row" style={{justifyContent: 'center'}}>
                          <span className={`a-check ${v ? 'on' : ''}`}>{v ? I.check : null}</span>
                        </div>
                      </td>
                    ))}
                    <td>
                      <div className="row" style={{justifyContent: 'center'}}>
                        <button className="a-btn ghost sm">Per-user</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="row" style={{gap: 14, alignItems: 'stretch'}}>
            <div className="a-card" style={{flex: 1, padding: '14px 16px'}}>
              <div className="mono-meta" style={{marginBottom: 8}}>POLICY NOTES</div>
              <ul style={{margin: 0, paddingLeft: 18, color: 'var(--fg-2)', fontSize: 13, lineHeight: 1.7}}>
                <li>Module access is computed from the user's department, then any per-user override.</li>
                <li>Unauthorized modules are hidden from the user's sidebar — not shown disabled.</li>
                <li>Changes apply on next session refresh; the audit log captures the diff.</li>
              </ul>
            </div>
            <div className="a-card" style={{flex: 1, padding: '14px 16px'}}>
              <div className="row">
                <div className="mono-meta">RECENT CHANGES</div>
                <span className="a-link" style={{marginLeft: 'auto', fontSize: 12}}>View audit</span>
              </div>
              <div className="col" style={{gap: 8, marginTop: 8, fontSize: 12.5}}>
                <div className="row" style={{gap: 8}}><span className="mono" style={{color: 'var(--fg-3)', minWidth: 96}}>22 May 09:14</span><span>P. Obi added <strong>Coding</strong> to <strong>R&D</strong></span></div>
                <div className="row" style={{gap: 8}}><span className="mono" style={{color: 'var(--fg-3)', minWidth: 96}}>21 May 17:02</span><span>P. Obi removed <strong>Forensics</strong> from <strong>DLI</strong></span></div>
                <div className="row" style={{gap: 8}}><span className="mono" style={{color: 'var(--fg-3)', minWidth: 96}}>18 May 11:48</span><span>P. Obi created role <strong>language</strong></span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
};

// ===== 17. Audit Log =====
const AuditLogScreen = ({ theme = 'light' }) => {
  const rows = [
    ['2026-05-22 14:38:12', 'P. Obi', 'user_approved', 'H. Yusuf', '—', 'dept: R&D · access: KN, CD'],
    ['2026-05-22 14:25:04', 'F. Okeke', 'job_created', 'maiduguri-02.wav', 'Dialect', 'task: transcribe+translate · src: hausa'],
    ['2026-05-22 14:22:48', 'F. Okeke', 'job_completed', 'maiduguri-02.wav', 'Dialect', 'duration: 14:22 · confidence: high'],
    ['2026-05-22 14:02:11', 'A. Bashir', 'file_uploaded', 'pipeline.py', 'Coding', 'size: 3.2 KB · type: py'],
    ['2026-05-22 13:42:00', 'A. Bashir', 'file_uploaded', 'NCCC-procurement-2026-draft.pdf', 'Knowledge', 'size: 1.4 MB'],
    ['2026-05-22 11:04:33', 'M. Tanko', 'job_created', 'auth-failures-2026-05-18.log', 'Forensics', 'type: log analysis'],
    ['2026-05-22 09:47:09', 'M. Tanko', 'file_uploaded', 'incident-bundle-NTP.zip', 'Forensics', 'size: 82 MB'],
    ['2026-05-22 09:14:27', 'P. Obi', 'module_access_changed', 'role: R&D', '—', 'added: Coding'],
    ['2026-05-22 08:32:18', 'A. Bashir', 'sign_in', 'a.bashir@nccc.gov.ng', '—', 'ip: 10.42.1.18 · ua: chrome 124'],
    ['2026-05-22 04:08:55', '—', 'quota_exceeded', 'i.ali@nccc.gov.ng', '—', 'attempted: 18 MB · remaining: 0 MB'],
    ['2026-05-21 18:11:00', 'M. Tanko', 'file_uploaded', 'evidence-archive-04.tar.gz', 'Forensics', 'size: 6 MB'],
    ['2026-05-21 18:11:42', '—', 'job_failed', 'evidence-archive-04.tar.gz', 'Forensics', 'reason: malformed archive header'],
    ['2026-05-21 17:02:14', 'P. Obi', 'module_access_changed', 'role: DLI', '—', 'removed: Forensics'],
    ['2026-05-21 16:18:33', 'A. Bashir', 'file_uploaded', 'briefing-q1.docx', 'Knowledge', 'size: 420 KB'],
    ['2026-05-21 11:22:08', 'P. Obi', 'user_disabled', 'I. Ali', '—', 'reason: separation'],
    ['2026-05-21 09:14:11', 'H. Yusuf', 'user_signed_up', 'h.yusuf@nccc.gov.ng', '—', 'staff_id: NCCC-04302'],
    ['2026-05-20 17:50:00', 'F. Okeke', 'sign_out', 'f.okeke@nccc.gov.ng', '—', 'session: 6h 12m'],
    ['2026-05-20 09:22:18', 'A. Bashir', 'file_deleted', 'k8s-deploy.yaml.bak', 'Coding', 'freed: 2.1 KB'],
  ];

  const colorFor = (a) => {
    if (a.includes('approved') || a === 'sign_in' || a.endsWith('_completed') || a === 'user_signed_up') return 'ok';
    if (a === 'user_disabled' || a.includes('failed') || a === 'quota_exceeded') return 'danger';
    if (a.includes('changed') || a === 'file_deleted') return 'warn';
    return 'muted';
  };

  return (
    <Shell theme={theme}>
      <Sidebar active="admin-audit" roleId="admin" themeName={theme} />
      <div className="a-main">
        <TopBar module="Admin · Audit log" title="All events" themeName={theme} />

        <div className="a-ph">
          <div>
            <h1 className="a-ph__title">Audit log</h1>
            <p className="a-ph__sub">Append-only record of platform events. Retained for 365 days.</p>
          </div>
          <div className="a-ph__actions">
            <button className="a-btn">{I.download}<span>Export JSON</span></button>
          </div>
        </div>

        <div style={{padding: '16px 32px 20px', flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 14}}>
          <div className="row" style={{gap: 8}}>
            <div className="a-input" style={{flex: 1, maxWidth: 360, height: 32, display: 'flex', alignItems: 'center', gap: 8, color: 'var(--fg-3)'}}>
              {I.search}<span style={{fontSize: 13}}>Filter events…</span>
            </div>
            <div className="seg">
              <button className="active">All</button>
              <button>Auth</button>
              <button>Files</button>
              <button>Jobs</button>
              <button>Access</button>
            </div>
            <div className="seg" style={{marginLeft: 'auto'}}>
              <button>1h</button>
              <button>24h</button>
              <button className="active">7d</button>
              <button>30d</button>
            </div>
          </div>

          <div className="a-card" style={{flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column'}}>
            <table className="a-table">
              <thead>
                <tr>
                  <th style={{width: 170}}>Timestamp</th>
                  <th style={{width: 140}}>Actor</th>
                  <th style={{width: 180}}>Action</th>
                  <th>Target</th>
                  <th style={{width: 100}}>Module</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(([t, actor, action, target, mod, meta], i) => (
                  <tr key={i}>
                    <td className="mono" style={{fontSize: 11.5, color: 'var(--fg-3)'}}>{t}</td>
                    <td>{actor === '—' ? <span className="mono muted">SYSTEM</span> : actor}</td>
                    <td><span className={`a-pill ${colorFor(action)} mono`}><span className="dot" />{action}</span></td>
                    <td className="mono" style={{fontSize: 12}}>{target}</td>
                    <td className="mono" style={{fontSize: 12, color: 'var(--fg-2)'}}>{mod}</td>
                    <td className="mono" style={{fontSize: 11.5, color: 'var(--fg-3)'}}>{meta}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Shell>
  );
};

Object.assign(window, { AdminUsersScreen, ApproveUserModal, DisableUserModal, AccessPoliciesScreen, AuditLogScreen });
