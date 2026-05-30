import { useState } from 'react';
import { Shell } from '../../components/Shell';
import { Sidebar } from '../../components/Sidebar';
import { TopBar } from '../../components/TopBar';
import { I } from '../../components/icons';
import { useToast } from '../../toast/Toast';
import { ROLES } from '../../data/roles';
import type { ModuleId, RoleId, Theme } from '../../types';

// Parse a human size like "82 MB" / "420 KB" / "3.2 KB" into megabytes.
const parseMB = (s: string): number => {
  const m = s.match(/([\d.]+)\s*(GB|MB|KB)/i);
  if (!m) return 0;
  const n = parseFloat(m[1]);
  const u = m[2].toUpperCase();
  return u === 'GB' ? n * 1024 : u === 'KB' ? n / 1024 : n;
};

type FilesVariant = 'default' | 'near' | 'full' | 'empty';

// [name, moduleId, moduleLabel, type, size, statusClass, statusLabel, uploaded]
type FileRow = [string, ModuleId, string, string, string, string, string, string];

const ALL_FILES: FileRow[] = [
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

const STORAGE_BY_MOD: Record<ModuleId, number> = {
  knowledge: 84,
  coding: 26,
  dialect: 180,
  forensics: 110,
};
const MOD_LABEL: Record<ModuleId, string> = {
  knowledge: 'KNOWLEDGE',
  coding: 'CODING',
  dialect: 'DIALECT',
  forensics: 'FORENSICS',
};

// ===== 11. Files & Storage =====
export const FilesScreen = ({
  theme = 'light',
  roleId = 'rd',
  variant = 'default',
}: {
  theme?: Theme;
  roleId?: RoleId;
  variant?: FilesVariant;
}) => {
  const toast = useToast();
  const r = ROLES[roleId] || ROLES.rd;
  const nearLimit = variant === 'near' || variant === 'full';
  const full = variant === 'full';
  const empty = variant === 'empty';

  const [deleted, setDeleted] = useState<Set<string>>(new Set());
  const [pending, setPending] = useState<FileRow | null>(null);

  // Only files in workspaces the user can access, minus deleted ones.
  const allVisible = ALL_FILES.filter(([, modId]) => r.modules.includes(modId));
  const visibleFiles = allVisible.filter(([f]) => !deleted.has(f));
  const fileCount = visibleFiles.length;

  const breakdown = r.modules.map((id) => [id, STORAGE_BY_MOD[id]] as const);
  const baseUsed = breakdown.reduce((s, [, v]) => s + v, 0);
  const freed = allVisible.filter(([f]) => deleted.has(f)).reduce((s, row) => s + parseMB(row[4]), 0);
  const rawUsed = full ? Math.max(baseUsed, 498) : nearLimit ? Math.max(baseUsed, 462) : baseUsed;
  const used = Math.max(0, Math.round(rawUsed - freed));
  const pct = Math.round((used / 500) * 100);

  const confirmDelete = () => {
    if (!pending) return;
    setDeleted((prev) => new Set(prev).add(pending[0]));
    toast('ok', 'File deleted', `Freed ${pending[4]} · deleting files frees storage quota.`);
    setPending(null);
  };

  // Filter tabs — only modules the user has access to.
  const [filter, setFilter] = useState<'all' | ModuleId>('all');
  const filterTabs: Array<['all' | ModuleId, string]> = [
    ['all', 'All'],
    ...r.modules.map((id) => [id, MOD_LABEL[id].charAt(0) + MOD_LABEL[id].slice(1).toLowerCase()] as ['all' | ModuleId, string]),
  ];
  const shownFiles = filter === 'all' ? visibleFiles : visibleFiles.filter(([, modId]) => modId === filter);

  const emptyCopyModules = r.modules.map((id) =>
    id === 'forensics' ? 'Forensics' : id.charAt(0).toUpperCase() + id.slice(1),
  );
  const emptyCopy =
    emptyCopyModules.length === 1
      ? `Files you upload in ${emptyCopyModules[0]} will appear here.`
      : `Files you upload in ${emptyCopyModules.slice(0, -1).join(', ')} or ${emptyCopyModules.slice(-1)} will appear here.`;

  return (
    <Shell theme={theme}>
      <Sidebar active="files" roleId={roleId} storageOverride={{ used, total: 500, by: {} }} />
      <div className="a-main">
        <TopBar module="Files & storage" title="All files" themeName={theme} />

        <div className="a-ph">
          <div>
            <h1 className="a-ph__title">Files &amp; storage</h1>
            <p className="a-ph__sub">All uploads across your workspaces. Deleting files frees storage quota.</p>
          </div>
          <div className="a-ph__actions">
            <button className="a-btn" onClick={() => toast('info', 'Search', 'Type to filter files (demo).')}>
              {I.search}
              <span>Search</span>
            </button>
            <button
              className="a-btn primary"
              onClick={() =>
                full
                  ? toast('danger', 'Upload blocked', 'Storage full — free space first.')
                  : toast('ok', 'Upload ready', 'Pick a file to add to this workspace.')
              }
            >
              {I.upload}
              <span>Upload</span>
            </button>
          </div>
        </div>

        <div style={{ padding: '20px 32px', display: 'flex', flexDirection: 'column', gap: 18, flex: 1, overflow: 'hidden' }}>
          <div className="row" style={{ gap: 14 }}>
            <div className="a-card" style={{ flex: 1.6, padding: '16px 18px' }}>
              <div className="row" style={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div className="mono-meta">GLOBAL QUOTA</div>
                <div className="mono" style={{ fontSize: 12, color: 'var(--fg-3)' }}>
                  500 MB · shared across your workspaces
                </div>
              </div>
              <div className="row" style={{ gap: 14, alignItems: 'baseline', marginTop: 6 }}>
                <div
                  className="mono"
                  style={{ fontSize: 28, fontWeight: 500, color: full ? 'var(--danger)' : nearLimit ? 'var(--warn)' : 'var(--fg)' }}
                >
                  {used} MB
                </div>
                <div className="mono" style={{ color: 'var(--fg-3)', fontSize: 12 }}>
                  used of 500 MB · {500 - used} MB free
                </div>
              </div>
              <div className={`a-bar ${full ? 'danger' : nearLimit ? 'warn' : ''}`} style={{ marginTop: 12, height: 6 }}>
                <i style={{ width: `${pct}%` }} />
              </div>
              <div className="row" style={{ gap: 16, marginTop: 12, fontSize: 12, flexWrap: 'wrap' }}>
                {breakdown.map(([id, mb]) => (
                  <div key={id} className="row" style={{ gap: 6 }}>
                    <span className="st-dot ok" />
                    <span className="mono" style={{ color: 'var(--fg-3)' }}>
                      {MOD_LABEL[id]}
                    </span>
                    <span className="mono">{mb} MB</span>
                  </div>
                ))}
              </div>
            </div>

            {nearLimit && !full && (
              <div className="a-card" style={{ flex: 1, padding: '16px 18px', borderColor: 'var(--warn)', background: 'var(--warn-soft)' }}>
                <div className="row" style={{ gap: 8, color: 'var(--warn)' }}>
                  {I.warn}
                  <strong style={{ color: 'var(--fg)' }}>Storage near limit</strong>
                </div>
                <p style={{ margin: '6px 0 10px', fontSize: 13, color: 'var(--fg-2)' }}>
                  You have {500 - used} MB remaining. New uploads may be rejected if quota is exceeded.
                  Deleting files frees storage quota.
                </p>
                <button className="a-btn sm">Review largest files</button>
              </div>
            )}
            {full && (
              <div className="a-card" style={{ flex: 1, padding: '16px 18px', borderColor: 'var(--danger)', background: 'var(--danger-soft)' }}>
                <div className="row" style={{ gap: 8, color: 'var(--danger)' }}>
                  {I.warn}
                  <strong style={{ color: 'var(--fg)' }}>Storage full</strong>
                </div>
                <p style={{ margin: '6px 0 10px', fontSize: 13, color: 'var(--fg-2)' }}>
                  You've reached your 500 MB quota. New uploads are blocked until you free space. Deleting
                  files frees storage quota.
                </p>
                <button className="a-btn sm">Review largest files</button>
              </div>
            )}
            {!nearLimit && (
              <div className="a-card a-statcard" style={{ flex: 1, padding: '16px 18px' }}>
                <div className="mono-meta">FILES</div>
                <div className="mono" style={{ fontSize: 28, fontWeight: 500 }}>
                  {fileCount}
                </div>
                <div className="mono" style={{ fontSize: 11, color: 'var(--fg-3)', marginTop: 2 }}>
                  across {r.modules.length} {r.modules.length === 1 ? 'workspace' : 'workspaces'}
                </div>
              </div>
            )}
          </div>

          <div className="a-card" style={{ overflow: 'hidden', flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div className="row" style={{ padding: '10px 14px', borderBottom: '1px solid var(--border-soft)' }}>
              <div className="seg">
                {filterTabs.map(([id, label]) => (
                  <button key={id} className={filter === id ? 'active' : ''} onClick={() => setFilter(id)}>
                    {label}
                  </button>
                ))}
              </div>
              <div className="mono-meta" style={{ marginLeft: 'auto' }}>
                {shownFiles.length} {shownFiles.length === 1 ? 'FILE' : 'FILES'}
              </div>
            </div>
            {empty ? (
              <div className="col" style={{ padding: '60px 16px', alignItems: 'center', gap: 8, textAlign: 'center' }}>
                <div style={{ color: 'var(--fg-3)' }}>{I.folder}</div>
                <div style={{ fontSize: 14 }}>No files yet</div>
                <div className="muted" style={{ fontSize: 12.5, maxWidth: 320 }}>
                  {emptyCopy}
                </div>
                <button className="a-btn sm" style={{ marginTop: 6 }}>
                  Upload
                </button>
              </div>
            ) : (
              <table className="a-table" style={{ flex: 1 }}>
                <thead>
                  <tr>
                    <th style={{ minWidth: 280 }}>File</th>
                    <th>Workspace</th>
                    <th>Type</th>
                    <th>Size</th>
                    <th>Status</th>
                    <th>Uploaded</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {shownFiles.map((row) => {
                    const [f, , m, t, sz, st, stat, time] = row;
                    return (
                      <tr key={f}>
                        <td>
                          <div className="row" style={{ gap: 10 }}>
                            <span style={{ color: 'var(--fg-3)' }}>{I.file}</span>
                            <span style={{ color: 'var(--fg)' }}>{f}</span>
                          </div>
                        </td>
                        <td>
                          <span className="mono" style={{ fontSize: 12, color: 'var(--fg-2)' }}>
                            {m}
                          </span>
                        </td>
                        <td>
                          <span className="a-pill mono">{t}</span>
                        </td>
                        <td className="mono" style={{ fontSize: 12 }}>
                          {sz}
                        </td>
                        <td>
                          <span className={`a-pill ${st} mono`}>
                            <span className="dot" />
                            {stat}
                          </span>
                        </td>
                        <td className="mono" style={{ fontSize: 12, color: 'var(--fg-3)' }}>
                          {time}
                        </td>
                        <td>
                          <div className="row" style={{ gap: 4, justifyContent: 'flex-end' }}>
                            {stat === 'Result ready' && (
                              <button className="a-btn ghost sm" onClick={() => toast('info', 'Opening result', f)}>
                                View
                              </button>
                            )}
                            <button
                              className="a-btn ghost sm"
                              style={{ color: 'var(--fg-3)' }}
                              title="Delete file"
                              onClick={() => setPending(row)}
                            >
                              {I.trash}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {pending && (
        <div className="a-modal-back" onClick={() => setPending(null)}>
          <div className="a-modal" onClick={(e) => e.stopPropagation()}>
            <div className="a-modal__hd">
              <div className="a-modal__title">
                Delete{' '}
                <span className="mono" style={{ fontSize: 14 }}>
                  {pending[0]}
                </span>
                ?
              </div>
            </div>
            <div className="a-modal__body">
              <p style={{ margin: 0 }}>
                This removes the file permanently
                {pending[6].toLowerCase().includes('processing') ? ' and cancels its job' : ''}.
              </p>
              <div className="row" style={{ gap: 12, marginTop: 12, padding: '10px 12px', background: 'var(--bg-soft)', borderRadius: 8 }}>
                <div className="col" style={{ flex: 1, gap: 2 }}>
                  <span className="mono-meta">FREES</span>
                  <span className="mono" style={{ fontSize: 16 }}>
                    {pending[4]}
                  </span>
                </div>
                <div className="col" style={{ flex: 1, gap: 2 }}>
                  <span className="mono-meta">NEW QUOTA</span>
                  <span className="mono" style={{ fontSize: 16 }}>
                    {Math.max(0, Math.round(used - parseMB(pending[4])))} / 500 MB
                  </span>
                </div>
              </div>
              <p style={{ margin: '10px 0 0', fontSize: 12.5, color: 'var(--fg-3)' }}>
                Deleting files frees storage quota.
              </p>
            </div>
            <div className="a-modal__ft">
              <button className="a-btn" onClick={() => setPending(null)}>
                Cancel
              </button>
              <button className="a-btn danger" onClick={confirmDelete}>
                Delete file
              </button>
            </div>
          </div>
        </div>
      )}
    </Shell>
  );
};
