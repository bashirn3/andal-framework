import { useState, type ReactNode } from 'react';
import { Shell } from '../../components/Shell';
import { Sidebar } from '../../components/Sidebar';
import { TopBar } from '../../components/TopBar';
import { I } from '../../components/icons';
import { useNav } from '../../nav/NavContext';
import { useToast } from '../../toast/Toast';
import { useJob } from '../../components/useJob';
import { JobCard } from '../../components/JobCard';
import { ROLES } from '../../data/roles';
import type { RoleId, Theme } from '../../types';

// ===== 8. Dialect upload home =====
export const DialectScreen = ({
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
  const nav = useNav();
  const toast = useToast();
  const job = useJob();
  const [lang, setLang] = useState('Hausa');
  const [task, setTask] = useState('Transcribe + translate');

  const startJob = () => {
    job.start('maiduguri-02.wav', () =>
      toast('ok', 'Transcription complete', 'maiduguri-02.wav · ready to view'),
    );
    toast('info', 'Job queued', `maiduguri-02.wav · ${lang} · ${task}`);
  };

  return (
    <Shell theme={theme}>
      <Sidebar active="dialect" roleId={roleId} />
      <div className="a-main">
        <TopBar module="Dialect" title="New job" themeName={theme} />

        <div className="a-home">
          <div className="a-home__inner">
            <div>
              <div className="a-home__eyebrow">ANDAL DIALECT</div>
              <h1 className="a-home__title" style={{ marginTop: 8 }}>
                What shall we render, {name}?
              </h1>
              <p className="a-home__sub" style={{ marginTop: 10 }}>
                Upload audio or video for transcription and translation into English.
              </p>
            </div>

            <div className="row" style={{ gap: 18, alignItems: 'flex-start' }}>
              <div className="col" style={{ flex: 1, gap: 14 }}>
                <div className="a-dz">
                  <div style={{ color: 'var(--fg-3)' }}>{I.upload}</div>
                  <div>
                    <strong>Drop audio or video here</strong> or{' '}
                    <span className="a-link" role="button" onClick={startJob}>
                      browse files
                    </span>
                  </div>
                  <div className="a-dz__sub">
                    Up to 500 MB per file. Job runs asynchronously and you'll be notified on
                    completion.
                  </div>
                  <div className="a-dz__types mono">.WAV · .MP3 · .M4A · .OGG · .MP4 · .MOV · .WEBM</div>
                </div>
                <button
                  className="a-btn primary"
                  style={{ alignSelf: 'flex-start' }}
                  onClick={startJob}
                  disabled={job.status === 'queued' || job.status === 'processing'}
                >
                  {I.bolt}
                  <span>Start transcription</span>
                </button>
                <JobCard
                  job={job}
                  meta={`${job.fileName ?? ''} · ${lang} · ${task}`}
                  onView={() => nav?.navigate('/dialect/chat')}
                  onReset={job.reset}
                />
              </div>

              <div className="col" style={{ width: 260, gap: 14 }}>
                <div className="col" style={{ gap: 6 }}>
                  <div className="mono-meta">SOURCE LANGUAGE</div>
                  <div className="a-card" style={{ padding: 4 }}>
                    {['Auto-detect', 'Hausa', 'Kanuri', 'Fulfulde'].map((l) => (
                      <div
                        key={l}
                        className="row"
                        onClick={() => setLang(l)}
                        style={{
                          padding: '8px 10px',
                          borderRadius: 6,
                          background: lang === l ? 'var(--bg-soft)' : 'transparent',
                          cursor: 'pointer',
                        }}
                      >
                        <span>{l}</span>
                        {lang === l && <span style={{ marginLeft: 'auto', color: 'var(--accent)' }}>{I.check}</span>}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col" style={{ gap: 6 }}>
                  <div className="mono-meta">TASK</div>
                  <div className="seg" style={{ flexDirection: 'column', width: '100%', padding: 4 }}>
                    {['Transcribe', 'Translate', 'Transcribe + translate'].map((t) => (
                      <button
                        key={t}
                        className={task === t ? 'active' : ''}
                        onClick={() => setTask(t)}
                        style={{ justifyContent: 'flex-start', height: 32, padding: '0 10px', textAlign: 'left' }}
                      >
                        {t}
                      </button>
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
                      <th>File</th>
                      <th>Source</th>
                      <th>Task</th>
                      <th>Duration</th>
                      <th>Status</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="row" style={{ gap: 8 }}>
                          {I.voice}
                          <span>maiduguri-02.wav</span>
                        </div>
                      </td>
                      <td className="mono" style={{ fontSize: 12 }}>
                        Hausa
                      </td>
                      <td>Transcribe + translate</td>
                      <td className="mono" style={{ fontSize: 12 }}>
                        14:22
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
                          {I.voice}
                          <span>press-kano.mp4</span>
                        </div>
                      </td>
                      <td className="mono" style={{ fontSize: 12 }}>
                        Auto · Hausa
                      </td>
                      <td>Transcribe</td>
                      <td className="mono" style={{ fontSize: 12 }}>
                        08:11
                      </td>
                      <td>
                        <span className="a-pill warn">
                          <span className="dot" />
                          PROCESSING · 42%
                        </span>
                      </td>
                      <td>
                        <span className="muted">—</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="row" style={{ gap: 8 }}>
                          {I.voice}
                          <span>interview-04.m4a</span>
                        </div>
                      </td>
                      <td className="mono" style={{ fontSize: 12 }}>
                        Kanuri
                      </td>
                      <td>Translate</td>
                      <td className="mono" style={{ fontSize: 12 }}>
                        22:48
                      </td>
                      <td>
                        <span className="a-pill muted">
                          <span className="dot" />
                          QUEUED
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

// ===== 8b. Dialect completed result =====
type TranscriptLine = { time: string; speaker?: string; text: ReactNode };

const SOURCE_LINES: TranscriptLine[] = [
  {
    time: '00:12',
    speaker: 'S1',
    text: "Ranar Talata, mun tafi taron jami'an tsaro a Maiduguri don tattauna batutuwan da suka shafi tsaro.",
  },
  {
    time: '00:34',
    speaker: 'S2',
    text: (
      <>
        An yi shawarwari kan yadda za a inganta hadin gwiwar yan kasuwa{' '}
        <span style={{ background: 'var(--warn-soft)', color: 'var(--warn)', padding: '0 3px', borderRadius: 3 }}>
          [ambiguous: aiki / aikin]
        </span>{' '}
        da hukuma.
      </>
    ),
  },
  {
    time: '01:05',
    speaker: 'S1',
    text: 'Bayan haka, an tabbatar da cewa za a aiwatar da matakan tsaro a duk fadin jihar.',
  },
  {
    time: '01:48',
    speaker: 'S3',
    text: "Mun yi alkawarin cewa za mu ci gaba da hada kai da al'umma don wannan manufa.",
  },
];

const TRANSLATION_LINES = [
  { time: '00:12', text: "On Tuesday, we went to a security officials' meeting in Maiduguri to discuss matters relating to security." },
  { time: '00:34', text: 'Discussions were held on how to strengthen cooperation between traders and the authorities.' },
  { time: '01:05', text: 'After that, it was confirmed that security measures would be carried out throughout the state.' },
  { time: '01:48', text: 'We have pledged to continue working with the community for this purpose.' },
];

export const DialectResultScreen = ({
  theme = 'light',
  roleId = 'forensics',
}: {
  theme?: Theme;
  roleId?: RoleId;
}) => (
  <Shell theme={theme}>
    <Sidebar active="dialect" roleId={roleId} />
    <div className="a-main">
      <TopBar
        module="Dialect"
        title="maiduguri-02.wav · result"
        themeName={theme}
        actions={
          <button className="a-btn ghost sm">
            {I.download}
            <span>Export</span>
          </button>
        }
      />

      <div
        style={{
          flex: 1,
          padding: '24px 32px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          gap: 18,
        }}
      >
        <div className="row" style={{ gap: 14, alignItems: 'flex-start' }}>
          <div className="a-card a-statcard" style={{ flex: 1 }}>
            <div className="a-statcard__label">SOURCE</div>
            <div className="a-statcard__val">Hausa</div>
            <div className="a-statcard__delta">auto-detected · 99.1% confidence</div>
          </div>
          <div className="a-card a-statcard" style={{ flex: 1 }}>
            <div className="a-statcard__label">DURATION</div>
            <div className="a-statcard__val mono">14:22</div>
            <div className="a-statcard__delta">3 speakers · 1 ambient marker</div>
          </div>
          <div className="a-card a-statcard" style={{ flex: 1 }}>
            <div className="a-statcard__label">QUALITY</div>
            <div className="a-statcard__val">High</div>
            <div className="a-statcard__delta">overall WER 6.4% · 4 ambiguity notes</div>
          </div>
          <div className="a-card a-statcard" style={{ flex: 1 }}>
            <div className="a-statcard__label">JOB</div>
            <div className="a-statcard__val mono" style={{ fontSize: 14 }}>
              JOB-7F22A
            </div>
            <div className="a-statcard__delta">completed 14:38 · 22 May</div>
          </div>
        </div>

        <div className="row" style={{ gap: 14, flex: 1, minHeight: 0, alignItems: 'stretch' }}>
          <div className="a-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div className="row" style={{ padding: '12px 14px', borderBottom: '1px solid var(--border-soft)' }}>
              <div className="mono-meta">SOURCE TRANSCRIPT</div>
              <span className="a-pill mono" style={{ marginLeft: 'auto' }}>
                HAU
              </span>
            </div>
            <div
              style={{
                padding: '14px 16px',
                flex: 1,
                overflow: 'hidden',
                fontSize: 13.5,
                lineHeight: 1.65,
                color: 'var(--fg-2)',
              }}
            >
              {SOURCE_LINES.map((l, i) => (
                <div key={i} className="row" style={{ gap: 10, marginBottom: 10 }}>
                  <span className="mono" style={{ color: 'var(--fg-3)', fontSize: 11, minWidth: 44 }}>
                    {l.time}
                  </span>
                  <span className="mono" style={{ fontSize: 11, color: 'var(--accent-text)' }}>
                    {l.speaker}
                  </span>
                  <span style={{ flex: 1 }}>{l.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="a-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div className="row" style={{ padding: '12px 14px', borderBottom: '1px solid var(--border-soft)' }}>
              <div className="mono-meta">ENGLISH TRANSLATION</div>
              <span className="a-pill ok mono" style={{ marginLeft: 'auto' }}>
                <span className="dot" />
                HIGH CONFIDENCE
              </span>
            </div>
            <div style={{ padding: '14px 16px', flex: 1, overflow: 'hidden', fontSize: 13.5, lineHeight: 1.65 }}>
              {TRANSLATION_LINES.map((l, i) => (
                <div key={i} className="row" style={{ gap: 10, marginBottom: 10 }}>
                  <span className="mono" style={{ color: 'var(--fg-3)', fontSize: 11, minWidth: 44 }}>
                    {l.time}
                  </span>
                  <span style={{ flex: 1 }}>{l.text}</span>
                </div>
              ))}

              <div
                style={{
                  marginTop: 14,
                  padding: '10px 12px',
                  background: 'var(--warn-soft)',
                  borderRadius: 8,
                  fontSize: 12.5,
                  color: 'var(--fg-2)',
                }}
              >
                <strong style={{ display: 'block', marginBottom: 4, color: 'var(--warn)' }}>
                  Notes on ambiguity
                </strong>
                At 00:34, the noun form is ambiguous between <span className="a-inlinecode mono">aiki</span> ("work")
                and <span className="a-inlinecode mono">aikin</span> ("the work of"). Translated as "cooperation
                between traders and authorities".
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Shell>
);
