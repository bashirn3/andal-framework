import { useState } from 'react';
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

type Category = 'all' | 'auth' | 'files' | 'jobs' | 'access';
const categoryOf = (a: string): Exclude<Category, 'all'> | 'other' => {
  if (['sign_in', 'sign_out', 'user_signed_up'].includes(a)) return 'auth';
  if (['file_uploaded', 'file_deleted', 'quota_exceeded'].includes(a)) return 'files';
  if (['job_created', 'job_completed', 'job_failed'].includes(a)) return 'jobs';
  if (['user_approved', 'user_disabled', 'module_access_changed'].includes(a)) return 'access';
  return 'other';
};

const CATS: Array<[Category, string]> = [
  ['all', 'All'],
  ['auth', 'Auth'],
  ['files', 'Files'],
  ['jobs', 'Jobs'],
  ['access', 'Access'],
];

type Range = '1h' | '24h' | '7d' | '30d';
const RANGE_MS: Record<Range, number> = {
  '1h': 60 * 60 * 1000,
  '24h': 24 * 60 * 60 * 1000,
  '7d': 7 * 24 * 60 * 60 * 1000,
  '30d': 30 * 24 * 60 * 60 * 1000,
};
const RANGES: Range[] = ['1h', '24h', '7d', '30d'];

// "Now" is anchored to the newest event so the relative ranges are meaningful.
const NOW = Math.max(...ROWS.map((r) => new Date(r[0].replace(' ', 'T')).getTime()));

// ===== 17. Audit Log =====
export const AuditLogScreen = ({ theme = 'light' }: { theme?: Theme }) => {
  const [cat, setCat] = useState<Category>('all');
  const [range, setRange] = useState<Range>('7d');
  const [query, setQuery] = useState('');

  const q = query.trim().toLowerCase();
  const filtered = ROWS.filter((row) => {
    const [t, actor, action, target, mod, meta] = row;
    if (cat !== 'all' && categoryOf(action) !== cat) return false;
    if (NOW - new Date(t.replace(' ', 'T')).getTime() > RANGE_MS[range]) return false;
    if (q && ![actor, action, target, mod, meta].join(' ').toLowerCase().includes(q)) return false;
    return true;
  });

  return (
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
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Filter events…"
                style={{ border: 0, outline: 'none', background: 'transparent', flex: 1, fontSize: 13, color: 'var(--fg)' }}
              />
            </div>
            <div className="seg">
              {CATS.map(([id, label]) => (
                <button key={id} className={cat === id ? 'active' : ''} onClick={() => setCat(id)}>
                  {label}
                </button>
              ))}
            </div>
            <div className="seg" style={{ marginLeft: 'auto' }}>
              {RANGES.map((r) => (
                <button key={r} className={range === r ? 'active' : ''} onClick={() => setRange(r)}>
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div className="a-card" style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div className="row" style={{ padding: '8px 14px', borderBottom: '1px solid var(--border-soft)' }}>
              <span className="mono-meta">
                {filtered.length} {filtered.length === 1 ? 'EVENT' : 'EVENTS'}
                {cat !== 'all' ? ` · ${cat.toUpperCase()}` : ''} · LAST {range.toUpperCase()}
              </span>
            </div>
            <div className="a-scroll-x">
              <table className="a-table a-table--cards">
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
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={6} style={{ textAlign: 'center', padding: '36px 16px', color: 'var(--fg-3)' }}>
                        No events match these filters.
                      </td>
                    </tr>
                  ) : (
                    filtered.map(([t, actor, action, target, mod, meta], i) => (
                      <tr key={i}>
                        <td data-label="Time" className="mono" style={{ fontSize: 11.5, color: 'var(--fg-3)' }}>{t}</td>
                        <td data-label="Actor">{actor === '—' ? <span className="mono muted">SYSTEM</span> : actor}</td>
                        <td data-label="Action">
                          <span className={`a-pill ${colorFor(action)} mono`}>
                            <span className="dot" />
                            {action}
                          </span>
                        </td>
                        <td data-label="Target" className="mono" style={{ fontSize: 12 }}>{target}</td>
                        <td data-label="Module" className="mono" style={{ fontSize: 12, color: 'var(--fg-2)' }}>{mod}</td>
                        <td data-label="Details" className="mono" style={{ fontSize: 11.5, color: 'var(--fg-3)' }}>{meta}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
};
