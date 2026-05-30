import { Shell } from '../../components/Shell';
import { Sidebar } from '../../components/Sidebar';
import { TopBar } from '../../components/TopBar';
import { I } from '../../components/icons';
import { useToast } from '../../toast/Toast';
import type { Theme } from '../../types';

// [label, roleSlug, [knowledge, coding, dialect, forensics]]
const DEPTS: Array<[string, string, number[]]> = [
  ['General Staff', 'staff', [1, 0, 0, 0]],
  ['R&D', 'research', [1, 1, 0, 0]],
  ['DLI', 'language', [1, 0, 1, 0]],
  ['Forensics', 'forensics', [1, 0, 1, 1]],
  ['Platform Admin', 'admin', [1, 1, 1, 1]],
];

// ===== 16. Access Policies =====
export const AccessPoliciesScreen = ({ theme = 'light' }: { theme?: Theme }) => {
  const toast = useToast();
  return (
  <Shell theme={theme}>
    <Sidebar active="admin-policy" roleId="admin" />
    <div className="a-main">
      <TopBar module="Admin · Access policies" title="Department matrix" themeName={theme} />

      <div className="a-ph">
        <div>
          <h1 className="a-ph__title">Access policies</h1>
          <p className="a-ph__sub">
            Configure which departments can access each module. Changes affect what modules users can see
            after their next session refresh.
          </p>
        </div>
        <div className="a-ph__actions">
          <button className="a-btn" onClick={() => toast('info', 'Changes discarded')}>
            Discard
          </button>
          <button
            className="a-btn primary"
            onClick={() => toast('ok', 'Access policies saved', 'Applies on each user’s next session refresh.')}
          >
            Save changes
          </button>
        </div>
      </div>

      <div style={{ padding: '20px 32px', flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div className="a-card" style={{ padding: 0, overflow: 'hidden' }}>
          <table className="a-table a-matrix">
            <thead>
              <tr>
                <th style={{ width: 220 }}>Department / role</th>
                <th>Knowledge</th>
                <th>Coding</th>
                <th>Dialect</th>
                <th>Forensics</th>
                <th>Override</th>
              </tr>
            </thead>
            <tbody>
              {DEPTS.map(([n, slug, perms]) => (
                <tr key={slug}>
                  <td>
                    <div className="col" style={{ lineHeight: 1.2 }}>
                      <span style={{ fontWeight: 500 }}>{n}</span>
                      <span className="mono" style={{ fontSize: 10.5, color: 'var(--fg-3)' }}>
                        role: {slug}
                      </span>
                    </div>
                  </td>
                  {perms.map((v, j) => (
                    <td key={j}>
                      <div className="row" style={{ justifyContent: 'center' }}>
                        <span className={`a-check ${v ? 'on' : ''}`}>{v ? I.check : null}</span>
                      </div>
                    </td>
                  ))}
                  <td>
                    <div className="row" style={{ justifyContent: 'center' }}>
                      <button className="a-btn ghost sm">Per-user</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="row" style={{ gap: 14, alignItems: 'stretch' }}>
          <div className="a-card" style={{ flex: 1, padding: '14px 16px' }}>
            <div className="mono-meta" style={{ marginBottom: 8 }}>
              POLICY NOTES
            </div>
            <ul style={{ margin: 0, paddingLeft: 18, color: 'var(--fg-2)', fontSize: 13, lineHeight: 1.7 }}>
              <li>Module access is computed from the user's department, then any per-user override.</li>
              <li>Unauthorized modules are hidden from the user's sidebar — not shown disabled.</li>
              <li>Changes apply on next session refresh; the audit log captures the diff.</li>
            </ul>
          </div>
          <div className="a-card" style={{ flex: 1, padding: '14px 16px' }}>
            <div className="row">
              <div className="mono-meta">RECENT CHANGES</div>
              <span className="a-link" style={{ marginLeft: 'auto', fontSize: 12 }}>
                View audit
              </span>
            </div>
            <div className="col" style={{ gap: 8, marginTop: 8, fontSize: 12.5 }}>
              <div className="row" style={{ gap: 8 }}>
                <span className="mono" style={{ color: 'var(--fg-3)', minWidth: 96 }}>
                  22 May 09:14
                </span>
                <span>
                  P. Obi added <strong>Coding</strong> to <strong>R&D</strong>
                </span>
              </div>
              <div className="row" style={{ gap: 8 }}>
                <span className="mono" style={{ color: 'var(--fg-3)', minWidth: 96 }}>
                  21 May 17:02
                </span>
                <span>
                  P. Obi removed <strong>Forensics</strong> from <strong>DLI</strong>
                </span>
              </div>
              <div className="row" style={{ gap: 8 }}>
                <span className="mono" style={{ color: 'var(--fg-3)', minWidth: 96 }}>
                  18 May 11:48
                </span>
                <span>
                  P. Obi created role <strong>language</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Shell>
  );
};
