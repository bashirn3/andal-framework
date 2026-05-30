import { useState } from 'react';
import { Shell } from '../../components/Shell';
import { Sidebar } from '../../components/Sidebar';
import { TopBar } from '../../components/TopBar';
import { I } from '../../components/icons';
import { ROLES } from '../../data/roles';
import type { RoleId, Theme } from '../../types';

// ===== 9. Forensics Intelligence upload home =====
export const ForensicsScreen = ({
  theme = 'light',
  roleId = 'forensics',
  firstName,
}: {
  theme?: Theme;
  roleId?: RoleId;
  firstName?: string;
}) => {
  const r = ROLES[roleId] || ROLES.forensics;
  const name = firstName || r.name.split(' ')[0];
  const [analysis, setAnalysis] = useState('Log analysis');

  return (
    <Shell theme={theme}>
      <Sidebar active="forensics" roleId={roleId} />
      <div className="a-main">
        <TopBar module="Forensics Intelligence" title="New analysis" themeName={theme} />

        <div className="a-home">
          <div className="a-home__inner">
            <div>
              <div className="a-home__eyebrow">ANDAL FORENSICS INTELLIGENCE</div>
              <h1 className="a-home__title" style={{ marginTop: 8 }}>
                Ready for analysis, {name}.
              </h1>
              <p className="a-home__sub" style={{ marginTop: 10 }}>
                Upload logs, reports, archives, or forensic artifacts for structured analysis.
              </p>
            </div>

            <div className="row" style={{ gap: 18, alignItems: 'flex-start' }}>
              <div className="a-dz" style={{ flex: 1 }}>
                <div style={{ color: 'var(--fg-3)' }}>{I.upload}</div>
                <div>
                  <strong>Drop evidence here</strong> or <span className="a-link">browse files</span>
                </div>
                <div className="a-dz__sub">
                  Findings, evidence references, and outstanding questions will be returned as a
                  structured report.
                </div>
                <div className="a-dz__types mono">.LOG · .CSV · .JSON · .ZIP · .TAR · .GZ · .PDF · .TXT · .EML</div>
              </div>

              <div className="col" style={{ width: 260, gap: 14 }}>
                <div className="col" style={{ gap: 6 }}>
                  <div className="mono-meta">ANALYSIS TYPE</div>
                  <div className="a-card" style={{ padding: 4 }}>
                    {(
                      [
                        ['Auto', 'Detect type from content'],
                        ['Log analysis', 'Auth, system, network'],
                        ['Report summary', 'Long-form PDF/TXT'],
                        ['Artifact summary', 'Disk image, registry'],
                        ['Indicator extraction', 'IPs, hashes, domains'],
                      ] as const
                    ).map(([t, sub]) => (
                      <div
                        key={t}
                        className="row"
                        onClick={() => setAnalysis(t)}
                        style={{
                          padding: '8px 10px',
                          borderRadius: 6,
                          background: analysis === t ? 'var(--bg-soft)' : 'transparent',
                          cursor: 'pointer',
                          alignItems: 'flex-start',
                        }}
                      >
                        <div className="col" style={{ lineHeight: 1.25 }}>
                          <span>{t}</span>
                          <span className="mono" style={{ fontSize: 10.5, color: 'var(--fg-3)' }}>
                            {sub}
                          </span>
                        </div>
                        {analysis === t && <span style={{ marginLeft: 'auto', color: 'var(--accent)' }}>{I.check}</span>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="col" style={{ gap: 8 }}>
              <div className="mono-meta">RECENT JOBS</div>
              <div className="a-card" style={{ overflow: 'hidden' }}>
                <table className="a-table">
                  <thead>
                    <tr>
                      <th>Evidence</th>
                      <th>Type</th>
                      <th>Size</th>
                      <th>Submitted</th>
                      <th>Status</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="row" style={{ gap: 8 }}>
                          {I.file}
                          <span>auth-failures-2026-05-18.log</span>
                        </div>
                      </td>
                      <td>Log analysis</td>
                      <td className="mono" style={{ fontSize: 12 }}>
                        3.4 MB
                      </td>
                      <td className="mono" style={{ fontSize: 12 }}>
                        22 May 11:04
                      </td>
                      <td>
                        <span className="a-pill ok">
                          <span className="dot" />
                          COMPLETED
                        </span>
                      </td>
                      <td>
                        <span className="a-link">View result</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="row" style={{ gap: 8 }}>
                          {I.folder}
                          <span>incident-bundle-NTP.zip</span>
                        </div>
                      </td>
                      <td>Auto</td>
                      <td className="mono" style={{ fontSize: 12 }}>
                        82 MB
                      </td>
                      <td className="mono" style={{ fontSize: 12 }}>
                        22 May 09:47
                      </td>
                      <td>
                        <span className="a-pill warn">
                          <span className="dot" />
                          PROCESSING · 17%
                        </span>
                      </td>
                      <td>
                        <span className="muted">—</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
};

// ===== Forensics completed result =====
const FINDINGS = [
  ['F-01', 'high', 'Brute-force pattern against svc-deploy', '847 failed attempts in 54 minutes from 9 distinct IPs, all 185.x.x.x range. No success.'],
  ['F-02', 'high', 'Disabled account svc-legacy targeted', '38 attempts against an account disabled in March. Suggests stale credential leak.'],
  ['F-03', 'med', 'Brief NTP drift on gateway-01', 'Clock drift of 3.2s between 03:12 and 03:14 may affect timestamp correlation downstream.'],
] as const;

const INDICATORS = [
  ['ip', '185.213.44.18', 142],
  ['ip', '185.213.44.19', 119],
  ['ip', '185.213.44.27', 98],
  ['ip', '92.118.39.81', 64],
  ['hash', 'sha256:9a3f…b21c', 1],
  ['hash', 'sha256:401e…77ad', 1],
  ['domain', 'mirror-cdn-12.net', 6],
] as const;

export const ForensicsResultScreen = ({
  theme = 'light',
  roleId = 'forensics',
}: {
  theme?: Theme;
  roleId?: RoleId;
}) => (
  <Shell theme={theme}>
    <Sidebar active="forensics" roleId={roleId} />
    <div className="a-main">
      <TopBar
        module="Forensics Intelligence"
        title="auth-failures-2026-05-18.log · result"
        themeName={theme}
        actions={
          <button className="a-btn ghost sm">
            {I.download}
            <span>Export report</span>
          </button>
        }
      />

      <div style={{ flex: 1, padding: '20px 32px', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div className="row" style={{ gap: 12 }}>
          <div className="a-card a-statcard" style={{ flex: 1 }}>
            <div className="a-statcard__label">EVENTS PARSED</div>
            <div className="a-statcard__val mono">14,302</div>
            <div className="a-statcard__delta">21 hour window · 11 sources</div>
          </div>
          <div className="a-card a-statcard" style={{ flex: 1 }}>
            <div className="a-statcard__label">FINDINGS</div>
            <div className="a-statcard__val mono">7</div>
            <div className="a-statcard__delta">2 high · 4 medium · 1 informational</div>
          </div>
          <div className="a-card a-statcard" style={{ flex: 1 }}>
            <div className="a-statcard__label">INDICATORS</div>
            <div className="a-statcard__val mono">12</div>
            <div className="a-statcard__delta">9 IPs · 2 hashes · 1 domain</div>
          </div>
          <div className="a-card a-statcard" style={{ flex: 1 }}>
            <div className="a-statcard__label">OPEN QUESTIONS</div>
            <div className="a-statcard__val mono">3</div>
            <div className="a-statcard__delta">requires additional evidence</div>
          </div>
        </div>

        <div className="row" style={{ flex: 1, minHeight: 0, gap: 14, alignItems: 'stretch' }}>
          <div className="a-card" style={{ flex: 1.4, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div className="row" style={{ padding: '12px 14px', borderBottom: '1px solid var(--border-soft)' }}>
              <div className="mono-meta">SUMMARY &amp; FINDINGS</div>
            </div>
            <div style={{ padding: '14px 16px', overflow: 'hidden', fontSize: 13.5, lineHeight: 1.6 }}>
              <p style={{ margin: '0 0 14px', color: 'var(--fg-2)' }}>
                Between 03:14 and 04:08 UTC, gateway-01 logged a coordinated burst of{' '}
                <span className="a-inlinecode mono">SSHD</span> authentication failures across 9 source IPs,
                targeting two service accounts. Two findings warrant immediate triage.
              </p>

              <div className="col" style={{ gap: 10 }}>
                {FINDINGS.map(([id, sev, t, d]) => (
                  <div
                    key={id}
                    className="row"
                    style={{ gap: 12, alignItems: 'flex-start', padding: '10px 12px', border: '1px solid var(--border)', borderRadius: 8 }}
                  >
                    <span className="mono" style={{ color: 'var(--fg-3)', fontSize: 11, marginTop: 2 }}>
                      {id}
                    </span>
                    <span
                      className={`a-pill ${sev === 'high' ? 'danger' : sev === 'med' ? 'warn' : 'muted'} mono`}
                      style={{ textTransform: 'uppercase' }}
                    >
                      <span className="dot" />
                      {sev === 'high' ? 'HIGH' : sev === 'med' ? 'MED' : 'INFO'}
                    </span>
                    <div className="col" style={{ flex: 1, gap: 2 }}>
                      <div style={{ color: 'var(--fg)', fontWeight: 500 }}>{t}</div>
                      <div style={{ color: 'var(--fg-3)', fontSize: 12.5 }}>{d}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 14, padding: '10px 12px', background: 'var(--bg-soft)', borderRadius: 8, fontSize: 12.5 }}>
                <strong style={{ display: 'block', marginBottom: 6 }}>Outstanding questions</strong>
                <ol style={{ margin: 0, paddingLeft: 18, color: 'var(--fg-2)' }}>
                  <li>Why does svc-legacy still appear in IAM history? Confirm with directory audit.</li>
                  <li>Are 185.x.x.x sources observed elsewhere in the perimeter? Pull edge logs.</li>
                  <li>Is the NTP drift correlated with the burst onset or coincidental?</li>
                </ol>
              </div>
            </div>
          </div>

          <div className="a-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div className="row" style={{ padding: '12px 14px', borderBottom: '1px solid var(--border-soft)' }}>
              <div className="mono-meta">INDICATORS</div>
            </div>
            <table className="a-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Value</th>
                  <th>Hits</th>
                </tr>
              </thead>
              <tbody>
                {INDICATORS.map(([t, v, h]) => (
                  <tr key={v}>
                    <td>
                      <span className="a-pill mono">{t.toUpperCase()}</span>
                    </td>
                    <td className="mono" style={{ fontSize: 12 }}>
                      {v}
                    </td>
                    <td className="mono" style={{ fontSize: 12, color: 'var(--fg-3)' }}>
                      {h}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </Shell>
);
