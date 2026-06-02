import { Shell } from '../../components/Shell';
import { Sidebar } from '../../components/Sidebar';
import { TopBar } from '../../components/TopBar';
import { I } from '../../components/icons';
import { useNav } from '../../nav/NavContext';
import { useToast } from '../../toast/Toast';
import type { Theme } from '../../types';

// [name, email, staffId, dept, status, access, storage, lastActive]
type UserRow = [string, string, string, string, string, string, string, string];

const USERS: UserRow[] = [
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

// ===== 13. Admin Users =====
export const AdminUsersScreen = ({ theme = 'light' }: { theme?: Theme }) => {
  const nav = useNav();
  const toast = useToast();

  return (
    <Shell theme={theme}>
      <Sidebar active="admin-users" roleId="admin" />
      <div className="a-main">
        <TopBar module="Admin · Users" title="All users" themeName={theme} />

        <div className="a-ph">
          <div>
            <h1 className="a-ph__title">Users</h1>
            <p className="a-ph__sub">Approve pending accounts, manage access, and disable accounts.</p>
          </div>
          <div className="a-ph__actions">
            <button className="a-btn" onClick={() => toast('ok', 'Export started', 'users-2026-05-30.csv · 31 rows')}>
              {I.download}
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        <div style={{ padding: '20px 32px', flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="row" style={{ gap: 12 }}>
            <div className="a-card a-statcard" style={{ flex: 1 }}>
              <div className="a-statcard__label">PENDING</div>
              <div className="a-statcard__val mono" style={{ color: 'var(--warn)' }}>
                2
              </div>
              <div className="a-statcard__delta">awaiting approval</div>
            </div>
            <div className="a-card a-statcard" style={{ flex: 1 }}>
              <div className="a-statcard__label">ACTIVE</div>
              <div className="a-statcard__val mono">26</div>
              <div className="a-statcard__delta">across 5 departments</div>
            </div>
            <div className="a-card a-statcard" style={{ flex: 1 }}>
              <div className="a-statcard__label">DISABLED</div>
              <div className="a-statcard__val mono">3</div>
              <div className="a-statcard__delta">no recent activity</div>
            </div>
            <div className="a-card a-statcard" style={{ flex: 1 }}>
              <div className="a-statcard__label">QUOTA USED</div>
              <div className="a-statcard__val mono">8.4 GB</div>
              <div className="a-statcard__delta">of 15 GB allocated</div>
            </div>
          </div>

          <div className="a-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div className="row" style={{ padding: '10px 14px', borderBottom: '1px solid var(--border-soft)', gap: 8 }}>
              <div className="seg">
                <button className="active">
                  All <span className="mono" style={{ color: 'var(--fg-3)', marginLeft: 4 }}>31</span>
                </button>
                <button>
                  Pending <span className="mono" style={{ color: 'var(--warn)', marginLeft: 4 }}>2</span>
                </button>
                <button>Active</button>
                <button>Disabled</button>
              </div>
              <div
                className="a-input"
                style={{ flex: 1, maxWidth: 320, height: 30, marginLeft: 10, display: 'flex', alignItems: 'center', gap: 8, color: 'var(--fg-3)' }}
              >
                {I.search}
                <span style={{ fontSize: 13 }}>Search by name, email, or staff ID…</span>
              </div>
              <div className="mono-meta" style={{ marginLeft: 'auto' }}>
                SHOWING 9 OF 31
              </div>
            </div>

            <div className="a-scroll-x"><table className="a-table a-table--cards">
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
                {USERS.map(([n, em, sid, dept, st, access, sto, la]) => (
                  <tr key={n} style={st === 'pending' ? { background: 'var(--warn-soft)' } : {}}>
                    <td data-label="User">
                      <div className="row" style={{ gap: 10 }}>
                        <div className="a-avatar mono" style={{ width: 26, height: 26, fontSize: 10 }}>
                          {n.split(' ').map((p) => p[0]).join('')}
                        </div>
                        <span>{n}</span>
                      </div>
                    </td>
                    <td data-label="Email" className="mono" style={{ fontSize: 12, color: 'var(--fg-2)' }}>
                      {em}
                    </td>
                    <td data-label="Staff ID" className="mono" style={{ fontSize: 12, color: 'var(--fg-3)' }}>
                      {sid}
                    </td>
                    <td data-label="Department">{dept === '—' ? <span className="muted">Unassigned</span> : dept}</td>
                    <td data-label="Status">
                      {st === 'pending' && (
                        <span className="a-pill warn">
                          <span className="dot" />
                          PENDING
                        </span>
                      )}
                      {st === 'active' && (
                        <span className="a-pill ok">
                          <span className="dot" />
                          ACTIVE
                        </span>
                      )}
                      {st === 'disabled' && (
                        <span className="a-pill danger">
                          <span className="dot" />
                          DISABLED
                        </span>
                      )}
                    </td>
                    <td data-label="Access" className="mono" style={{ fontSize: 11.5, color: 'var(--fg-2)' }}>
                      {access}
                    </td>
                    <td data-label="Storage" className="mono" style={{ fontSize: 12, color: 'var(--fg-3)' }}>
                      {sto}
                    </td>
                    <td data-label="Last active" className="mono" style={{ fontSize: 11.5, color: 'var(--fg-3)' }}>
                      {la}
                    </td>
                    <td data-label="" className="a-cell-actions">
                      <div className="row" style={{ gap: 4, justifyContent: 'flex-end' }}>
                        {st === 'pending' ? (
                          <button className="a-btn primary sm" onClick={nav ? () => nav.openModal('approve-user') : undefined}>
                            Review &amp; approve
                          </button>
                        ) : st === 'active' ? (
                          <button className="a-btn ghost sm" onClick={nav ? () => nav.openModal('disable-user') : undefined}>
                            Edit access
                          </button>
                        ) : (
                          <button className="a-btn ghost sm">Re-enable</button>
                        )}
                        <button className="a-btn ghost sm" style={{ color: 'var(--fg-3)', width: 26, padding: 0 }}>
                          {I.more}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table></div>
          </div>
        </div>
      </div>
    </Shell>
  );
};
