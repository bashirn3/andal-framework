import type { ReactNode } from 'react';
import { Shell } from '../../components/Shell';
import { Sidebar } from '../../components/Sidebar';
import { TopBar } from '../../components/TopBar';
import { I } from '../../components/icons';
import { useNav } from '../../nav/NavContext';
import { useToast } from '../../toast/Toast';
import { ROLES } from '../../data/roles';
import type { ModuleId, RoleId, Theme } from '../../types';

const STAFF_IDS: Record<RoleId, string> = {
  general: 'NCCC-03877',
  rd: 'NCCC-04217',
  dli: 'NCCC-04102',
  forensics: 'NCCC-04007',
  admin: 'NCCC-03012',
};

const WORKSPACE_ROWS: Array<[ModuleId, string, ReactNode, string]> = [
  ['knowledge', 'Knowledge', I.book, 'All approved staff'],
  ['coding', 'Coding', I.code, 'R&D department'],
  ['dialect', 'Dialect', I.voice, 'DLI / Forensics only'],
  ['forensics', 'Forensics Intelligence', I.shield, 'Forensics only'],
];

// ===== 12. Account & Settings =====
export const AccountScreen = ({
  theme = 'light',
  roleId = 'rd',
}: {
  theme?: Theme;
  roleId?: RoleId;
}) => {
  const nav = useNav();
  const toast = useToast();
  const r = ROLES[roleId] || ROLES.rd;
  const emailSlug = r.name
    .toLowerCase()
    .split(' ')
    .map((p, i) => (i === 0 ? p[0] : p))
    .join('.');
  const email = `${emailSlug}@nccc.gov.ng`;
  const staffId = STAFF_IDS[roleId];

  return (
    <Shell theme={theme}>
      <Sidebar active="settings" roleId={roleId} />
      <div className="a-main">
        <TopBar module="Account" title="Settings" themeName={theme} />
        <div className="a-ph">
          <div>
            <h1 className="a-ph__title">Account &amp; settings</h1>
            <p className="a-ph__sub">Profile and access are managed by Andal administrators for v1.</p>
          </div>
        </div>

        <div style={{ padding: '24px 32px', display: 'flex', gap: 24, flex: 1, overflow: 'hidden' }}>
          <div className="col" style={{ width: 220, gap: 2 }}>
            {(
              [
                ['Profile', true],
                ['Modules', false],
                ['Appearance', false],
                ['Security', false],
                ['Notifications', false],
              ] as const
            ).map(([n, a]) => (
              <div key={n} className={`a-nav-item ${a ? 'active' : ''}`} style={{ padding: a ? '7px 10px' : '8px 10px' }}>
                <span>{n}</span>
              </div>
            ))}
          </div>

          <div className="col" style={{ flex: 1, gap: 18, minWidth: 0 }}>
            <div className="a-card">
              <div className="row" style={{ padding: '14px 18px', borderBottom: '1px solid var(--border-soft)' }}>
                <div>
                  <div style={{ fontWeight: 500 }}>Profile</div>
                  <div className="muted" style={{ fontSize: 12.5 }}>
                    Managed by admin. To request a change, contact your directorate.
                  </div>
                </div>
                <span className="a-pill mono" style={{ marginLeft: 'auto' }}>
                  READ-ONLY
                </span>
              </div>
              <div
                style={{
                  padding: '14px 18px',
                  display: 'grid',
                  gridTemplateColumns: '160px 1fr',
                  columnGap: 18,
                  rowGap: 12,
                  fontSize: 13.5,
                }}
              >
                <div className="mono-meta">FULL NAME</div>
                <div>{r.name}</div>
                <div className="mono-meta">EMAIL</div>
                <div className="mono" style={{ fontSize: 12.5 }}>
                  {email}
                </div>
                <div className="mono-meta">STAFF ID</div>
                <div className="mono" style={{ fontSize: 12.5 }}>
                  {staffId}
                </div>
                <div className="mono-meta">DEPARTMENT</div>
                <div>{r.dept}</div>
                <div className="mono-meta">ACCESS LEVEL</div>
                <div>{r.role}</div>
                <div className="mono-meta">MEMBER SINCE</div>
                <div className="mono" style={{ fontSize: 12.5 }}>
                  14 May 2026
                </div>
              </div>
            </div>

            <div className="a-card">
              <div className="row" style={{ padding: '14px 18px', borderBottom: '1px solid var(--border-soft)' }}>
                <div style={{ fontWeight: 500 }}>Workspaces available</div>
                <span className="mono-meta" style={{ marginLeft: 'auto' }}>
                  {r.modules.length} {r.modules.length === 1 ? 'WORKSPACE' : 'WORKSPACES'}
                </span>
              </div>
              <div style={{ padding: '4px 8px 8px' }}>
                {WORKSPACE_ROWS.filter(([id]) => r.modules.includes(id)).map(([, n, icon, scope]) => (
                  <div key={n} className="row" style={{ padding: '10px 10px', borderRadius: 6 }}>
                    <span style={{ color: 'var(--fg)' }}>{icon}</span>
                    <div className="col" style={{ lineHeight: 1.2, marginLeft: 4 }}>
                      <span style={{ color: 'var(--fg)' }}>{n}</span>
                      <span className="mono" style={{ fontSize: 10.5, color: 'var(--fg-3)' }}>
                        {scope}
                      </span>
                    </div>
                    <span className="a-pill ok mono" style={{ marginLeft: 'auto' }}>
                      <span className="dot" />
                      ENABLED
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="a-card">
              <div className="row" style={{ padding: '14px 18px', borderBottom: '1px solid var(--border-soft)' }}>
                <div style={{ fontWeight: 500 }}>Appearance</div>
              </div>
              <div className="row" style={{ padding: '14px 18px', gap: 18 }}>
                <div className="col" style={{ flex: 1, gap: 2 }}>
                  <div>Theme</div>
                  <div className="muted" style={{ fontSize: 12.5 }}>
                    Saved to this account.
                  </div>
                </div>
                <div className="seg">
                  <button className={theme === 'light' ? 'active' : ''}>
                    {I.sun}
                    <span style={{ marginLeft: 6 }}>Light</span>
                  </button>
                  <button className={theme === 'dark' ? 'active' : ''}>
                    {I.moon}
                    <span style={{ marginLeft: 6 }}>Dark</span>
                  </button>
                  <button>System</button>
                </div>
              </div>
            </div>

            <div className="row" style={{ justifyContent: 'flex-end', gap: 8 }}>
              <button
                className="a-btn"
                onClick={() => {
                  toast('ok', 'Signed out', 'Your session has ended.');
                  nav?.navigate('/login');
                }}
              >
                {I.signout}
                <span>Sign out</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
};
