import { Shell } from '../../components/Shell';
import { Sidebar } from '../../components/Sidebar';
import { TopBar } from '../../components/TopBar';
import { I } from '../../components/icons';
import type { Theme } from '../../types';

// [timestamp, actor, action, target, module, details]
type AuditRow = [string, string, string, string, string, string];

const ROWS: AuditRow[] = [
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

const colorFor = (a: string): string => {
  if (a.includes('approved') || a === 'sign_in' || a.endsWith('_completed') || a === 'user_signed_up') return 'ok';
  if (a === 'user_disabled' || a.includes('failed') || a === 'quota_exceeded') return 'danger';
  if (a.includes('changed') || a === 'file_deleted') return 'warn';
  return 'muted';
};

// ===== 17. Audit Log =====
export const AuditLogScreen = ({ theme = 'light' }: { theme?: Theme }) => (
  <Shell theme={theme}>
    <Sidebar active="admin-audit" roleId="admin" />
    <div className="a-main">
      <TopBar module="Admin · Audit log" title="All events" themeName={theme} />

      <div className="a-ph">
        <div>
          <h1 className="a-ph__title">Audit log</h1>
          <p className="a-ph__sub">Append-only record of platform events. Retained for 365 days.</p>
        </div>
        <div className="a-ph__actions">
          <button className="a-btn">
            {I.download}
            <span>Export JSON</span>
          </button>
        </div>
      </div>

      <div style={{ padding: '16px 32px 20px', flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div className="row" style={{ gap: 8 }}>
          <div
            className="a-input"
            style={{ flex: 1, maxWidth: 360, height: 32, display: 'flex', alignItems: 'center', gap: 8, color: 'var(--fg-3)' }}
          >
            {I.search}
            <span style={{ fontSize: 13 }}>Filter events…</span>
          </div>
          <div className="seg">
            <button className="active">All</button>
            <button>Auth</button>
            <button>Files</button>
            <button>Jobs</button>
            <button>Access</button>
          </div>
          <div className="seg" style={{ marginLeft: 'auto' }}>
            <button>1h</button>
            <button>24h</button>
            <button className="active">7d</button>
            <button>30d</button>
          </div>
        </div>

        <div className="a-card" style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <table className="a-table">
            <thead>
              <tr>
                <th style={{ width: 170 }}>Timestamp</th>
                <th style={{ width: 140 }}>Actor</th>
                <th style={{ width: 180 }}>Action</th>
                <th>Target</th>
                <th style={{ width: 100 }}>Module</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map(([t, actor, action, target, mod, meta], i) => (
                <tr key={i}>
                  <td className="mono" style={{ fontSize: 11.5, color: 'var(--fg-3)' }}>
                    {t}
                  </td>
                  <td>{actor === '—' ? <span className="mono muted">SYSTEM</span> : actor}</td>
                  <td>
                    <span className={`a-pill ${colorFor(action)} mono`}>
                      <span className="dot" />
                      {action}
                    </span>
                  </td>
                  <td className="mono" style={{ fontSize: 12 }}>
                    {target}
                  </td>
                  <td className="mono" style={{ fontSize: 12, color: 'var(--fg-2)' }}>
                    {mod}
                  </td>
                  <td className="mono" style={{ fontSize: 11.5, color: 'var(--fg-3)' }}>
                    {meta}
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
