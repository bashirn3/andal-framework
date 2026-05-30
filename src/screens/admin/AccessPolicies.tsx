import { useState } from 'react';
import { Shell } from '../../components/Shell';
import { Sidebar } from '../../components/Sidebar';
import { TopBar } from '../../components/TopBar';
import { I } from '../../components/icons';
import { useToast } from '../../toast/Toast';
import type { Theme } from '../../types';

// [label, roleSlug] — order matches the columns [Knowledge, Coding, Dialect, Forensics]
const DEPTS: Array<[string, string]> = [
  ['General Staff', 'staff'],
  ['R&D', 'research'],
  ['DLI', 'language'],
  ['Forensics', 'forensics'],
  ['Platform Admin', 'admin'],
];
const COLS = ['Knowledge', 'Coding', 'Dialect', 'Forensics'];
const INITIAL: number[][] = [
  [1, 0, 0, 0],
  [1, 1, 0, 0],
  [1, 0, 1, 0],
  [1, 0, 1, 1],
  [1, 1, 1, 1],
];

// ===== 16. Access Policies =====
export const AccessPoliciesScreen = ({ theme = 'light' }: { theme?: Theme }) => {
  const toast = useToast();
  const [baseline, setBaseline] = useState<number[][]>(INITIAL.map((r) => [...r]));
  const [grid, setGrid] = useState<number[][]>(INITIAL.map((r) => [...r]));
  const dirty = JSON.stringify(grid) !== JSON.stringify(baseline);

  // Knowledge (column 0) is available to all approved users — locked on.
  const toggle = (i: number, j: number) => {
    if (j === 0) return;
    setGrid((g) => g.map((row, ri) => (ri === i ? row.map((v, ci) => (ci === j ? (v ? 0 : 1) : v)) : row)));
  };

  const save = () => {
    setBaseline(grid.map((r) => [...r]));
    toast('ok', 'Access policies saved', 'Applies on each user’s next session refresh.');
  };
  const discard = () => {
    setGrid(baseline.map((r) => [...r]));
    toast('info', 'Changes discarded');
  };

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
            <button className="a-btn" onClick={discard} disabled={!dirty}>
              Discard
            </button>
            <button className="a-btn primary" onClick={save} disabled={!dirty}>
              Save changes
            </button>
          </div>
        </div>

        <div style={{ padding: '20px 32px', flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="a-card" style={{ padding: 0, overflow: 'hidden' }}>
            <div className="a-scroll-x">
              <table className="a-table a-matrix">
                <thead>
                  <tr>
                    <th style={{ width: 220 }}>Department / role</th>
                    {COLS.map((c) => (
                      <th key={c}>{c}</th>
                    ))}
                    <th>Override</th>
                  </tr>
                </thead>
                <tbody>
                  {DEPTS.map(([n, slug], i) => (
                    <tr key={slug}>
                      <td>
                        <div className="col" style={{ lineHeight: 1.2 }}>
                          <span style={{ fontWeight: 500 }}>{n}</span>
                          <span className="mono" style={{ fontSize: 10.5, color: 'var(--fg-3)' }}>
                            role: {slug}
                          </span>
                        </div>
                      </td>
                      {grid[i].map((v, j) => (
                        <td key={j}>
                          <div className="row" style={{ justifyContent: 'center' }}>
                            {j === 0 ? (
                              <span className="a-check on" title="All approved users have Knowledge">
                                {I.check}
                              </span>
                            ) : (
                              <button
                                className={`a-check ${v ? 'on' : ''}`}
                                onClick={() => toggle(i, j)}
                                aria-pressed={!!v}
                                title={`${v ? 'Remove' : 'Grant'} ${COLS[j]} for ${n}`}
                              >
                                {v ? I.check : null}
                              </button>
                            )}
                          </div>
                        </td>
                      ))}
                      <td>
                        <div className="row" style={{ justifyContent: 'center' }}>
                          <button className="a-btn ghost sm" onClick={() => toast('info', 'Per-user overrides', `${n} — coming soon`)}>
                            Per-user
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
                <div className="mono-meta">{dirty ? 'UNSAVED CHANGES' : 'RECENT CHANGES'}</div>
                <span className="a-link" style={{ marginLeft: 'auto', fontSize: 12 }}>
                  View audit
                </span>
              </div>
              <div className="col" style={{ gap: 8, marginTop: 8, fontSize: 12.5 }}>
                {dirty ? (
                  <div className="row" style={{ gap: 8, color: 'var(--warn)' }}>
                    {I.warn}
                    <span style={{ color: 'var(--fg-2)' }}>You have unsaved policy edits. Save to apply.</span>
                  </div>
                ) : (
                  <>
                    <div className="row" style={{ gap: 8 }}>
                      <span className="mono" style={{ color: 'var(--fg-3)', minWidth: 96 }}>22 May 09:14</span>
                      <span>
                        P. Obi added <strong>Coding</strong> to <strong>R&D</strong>
                      </span>
                    </div>
                    <div className="row" style={{ gap: 8 }}>
                      <span className="mono" style={{ color: 'var(--fg-3)', minWidth: 96 }}>21 May 17:02</span>
                      <span>
                        P. Obi removed <strong>Forensics</strong> from <strong>DLI</strong>
                      </span>
                    </div>
                    <div className="row" style={{ gap: 8 }}>
                      <span className="mono" style={{ color: 'var(--fg-3)', minWidth: 96 }}>18 May 11:48</span>
                      <span>
                        P. Obi created role <strong>language</strong>
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
};
