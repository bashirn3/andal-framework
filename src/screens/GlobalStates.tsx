import type { ReactNode } from 'react';
import { Shell } from '../components/Shell';
import { I } from '../components/icons';
import type { Theme } from '../types';

// Compact reference board: all global/system states laid out in one artboard.
const StateCard = ({ label, badge, children }: { label: string; badge?: string; children: ReactNode }) => (
  <div
    style={{
      borderRadius: 12,
      border: '1px solid var(--border)',
      background: 'var(--bg-elev)',
      padding: 0,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      minHeight: 0,
    }}
  >
    <div className="row" style={{ padding: '8px 12px', borderBottom: '1px solid var(--border-soft)', background: 'var(--bg-sub)' }}>
      <span className="mono-meta">{label}</span>
      {badge && (
        <span className="mono" style={{ marginLeft: 'auto', fontSize: 10.5, color: 'var(--fg-3)' }}>
          {badge}
        </span>
      )}
    </div>
    <div style={{ padding: 14, flex: 1, display: 'flex', flexDirection: 'column' }}>{children}</div>
  </div>
);

export const GlobalStatesScreen = ({ theme = 'light' }: { theme?: Theme }) => (
  <Shell theme={theme}>
    <div className="a-main" style={{ width: '100%' }}>
      <div className="a-topbar">
        <div className="a-crumb">
          <span className="a-crumb__module mono">Reference</span>
          <span className="a-crumb__sep">/</span>
          <span className="a-crumb__title">Global states &amp; system messaging</span>
        </div>
        <div className="a-topbar__actions">
          <span className="mono-meta">17 STATES · {theme.toUpperCase()}</span>
        </div>
      </div>

      <div
        style={{
          padding: 24,
          flex: 1,
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridAutoRows: 'minmax(170px, auto)',
          gap: 16,
        }}
      >
        <StateCard label="LOADING" badge="state · streaming">
          <div className="row" style={{ gap: 10, alignItems: 'center' }}>
            <div className="a-msg__avatar assistant mono" style={{ width: 22, height: 22, fontSize: 10 }}>
              A
            </div>
            <div className="mono" style={{ fontSize: 11, color: 'var(--fg-3)' }}>
              Andal is thinking
            </div>
            <span className="a-caret" />
          </div>
          <div className="col" style={{ gap: 6, marginTop: 14 }}>
            <div style={{ height: 8, background: 'var(--bg-soft)', borderRadius: 99, width: '92%' }} />
            <div style={{ height: 8, background: 'var(--bg-soft)', borderRadius: 99, width: '78%' }} />
            <div style={{ height: 8, background: 'var(--bg-soft)', borderRadius: 99, width: '54%' }} />
          </div>
        </StateCard>

        <StateCard label="EMPTY · CONVERSATIONS" badge="sidebar">
          <div className="col" style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8, textAlign: 'center' }}>
            <div style={{ color: 'var(--fg-4)' }}>{I.book}</div>
            <div style={{ fontSize: 13 }}>No conversations yet</div>
            <div className="muted" style={{ fontSize: 12 }}>
              Your previous chats will appear here.
            </div>
            <button className="a-btn sm" style={{ marginTop: 4 }}>
              {I.plus} New
            </button>
          </div>
        </StateCard>

        <StateCard label="ERROR · GENERIC" badge="inline">
          <div className="col" style={{ gap: 8 }}>
            <div className="row" style={{ gap: 8, color: 'var(--danger)' }}>
              {I.warn}
              <strong style={{ color: 'var(--fg)' }}>Something went wrong</strong>
            </div>
            <p style={{ margin: 0, fontSize: 12.5, color: 'var(--fg-2)' }}>
              We couldn't complete this request. Try again, or contact your administrator if it persists.
            </p>
            <div className="mono" style={{ fontSize: 10.5, color: 'var(--fg-3)' }}>
              err.E_RESP_504 · req · r-7f22a
            </div>
            <button className="a-btn sm" style={{ alignSelf: 'flex-start', marginTop: 4 }}>
              {I.refresh} Retry
            </button>
          </div>
        </StateCard>

        <StateCard label="OFFLINE BANNER" badge="top of viewport">
          <div className="row" style={{ gap: 8, padding: '8px 10px', background: 'var(--warn-soft)', borderRadius: 8, color: 'var(--warn)' }}>
            {I.wifi}
            <span style={{ color: 'var(--fg)', fontSize: 12.5 }}>You're offline. Reconnect to continue.</span>
            <span className="mono" style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--fg-3)' }}>
              RECONNECTING…
            </span>
          </div>
          <div className="muted" style={{ fontSize: 11.5, marginTop: 10 }}>
            Composer is read-only until network returns. Drafts are kept locally.
          </div>
        </StateCard>

        <StateCard label="STORAGE NEAR LIMIT" badge="sidebar warning">
          <div className="row">
            <span className="mono-meta">STORAGE</span>
            <span className="mono" style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--warn)' }}>
              462 / 500 MB
            </span>
          </div>
          <div className="a-bar warn" style={{ height: 5, marginTop: 8 }}>
            <i style={{ width: '92%' }} />
          </div>
          <div className="row" style={{ gap: 6, marginTop: 10, color: 'var(--warn)' }}>
            {I.warn}
            <span style={{ fontSize: 12, color: 'var(--fg)' }}>92% used · 38 MB free</span>
          </div>
          <span className="mono" style={{ marginTop: 6, fontSize: 10.5, color: 'var(--fg-3)' }}>
            Deleting files frees storage quota.
          </span>
        </StateCard>

        <StateCard label="STORAGE FULL" badge="upload blocked">
          <div className="row">
            <span className="mono-meta">STORAGE</span>
            <span className="mono" style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--danger)' }}>
              500 / 500 MB
            </span>
          </div>
          <div className="a-bar danger" style={{ height: 5, marginTop: 8 }}>
            <i style={{ width: '100%' }} />
          </div>
          <div className="row" style={{ gap: 6, marginTop: 10, color: 'var(--danger)' }}>
            {I.warn}
            <span style={{ fontSize: 12, color: 'var(--fg)' }}>Storage full · uploads blocked</span>
          </div>
          <button className="a-btn sm" style={{ alignSelf: 'flex-start', marginTop: 8 }}>
            {I.trash} Manage files
          </button>
        </StateCard>

        <StateCard label="ACCOUNT · PENDING" badge="signed-in, no access">
          <div className="col" style={{ gap: 8 }}>
            <span className="a-pill warn">
              <span className="dot" />
              PENDING
            </span>
            <div style={{ fontSize: 13 }}>Account pending approval</div>
            <p style={{ margin: 0, fontSize: 12.5, color: 'var(--fg-2)' }}>
              An administrator must approve your account before modules become available.
            </p>
          </div>
        </StateCard>

        <StateCard label="ACCOUNT · DISABLED" badge="signed-out">
          <div className="col" style={{ gap: 8 }}>
            <span className="a-pill danger">
              <span className="dot" />
              DISABLED
            </span>
            <div style={{ fontSize: 13 }}>This account has been disabled</div>
            <p style={{ margin: 0, fontSize: 12.5, color: 'var(--fg-2)' }}>
              Contact a platform administrator to restore access.
            </p>
          </div>
        </StateCard>

        <StateCard label="FORBIDDEN · DIRECT URL" badge="403">
          <div className="col" style={{ gap: 8 }}>
            <span className="mono" style={{ fontSize: 11, color: 'var(--fg-3)' }}>
              HTTP 403 · /forensics
            </span>
            <div style={{ fontSize: 13 }}>Module not available</div>
            <p style={{ margin: 0, fontSize: 12.5, color: 'var(--fg-2)' }}>
              You do not have access to <span className="mono">Forensics Intelligence</span>. Request access
              from your directorate lead.
            </p>
            <button className="a-btn sm" style={{ alignSelf: 'flex-start', marginTop: 4 }}>
              Return to Knowledge
            </button>
          </div>
        </StateCard>

        <StateCard label="UPLOAD · QUOTA REJECT" badge="toast">
          <div
            className="col"
            style={{ gap: 8, padding: '10px 12px', border: '1px solid var(--danger)', borderRadius: 8, background: 'var(--danger-soft)' }}
          >
            <div className="row" style={{ gap: 8, color: 'var(--danger)' }}>
              {I.warn}
              <strong style={{ color: 'var(--fg)', fontSize: 13 }}>Upload would exceed your quota</strong>
            </div>
            <div className="mono" style={{ fontSize: 11, color: 'var(--fg-2)' }}>
              incident-bundle-NTP.zip · 82 MB
            </div>
            <div className="mono" style={{ fontSize: 11, color: 'var(--fg-3)' }}>
              Available: 38 MB · Deleting files frees storage quota.
            </div>
          </div>
        </StateCard>

        <StateCard label="UPLOAD · FILE TYPE" badge="toast">
          <div className="col" style={{ gap: 8, padding: '10px 12px', border: '1px solid var(--border)', borderRadius: 8, background: 'var(--bg-soft)' }}>
            <div className="row" style={{ gap: 8 }}>
              {I.warn}
              <strong style={{ fontSize: 13 }}>File type not accepted</strong>
            </div>
            <div className="mono" style={{ fontSize: 11, color: 'var(--fg-2)' }}>
              diagram.psd
            </div>
            <div className="mono" style={{ fontSize: 11, color: 'var(--fg-3)' }}>
              Knowledge accepts: PDF · DOCX · TXT
            </div>
          </div>
        </StateCard>

        <StateCard label="JOB · QUEUED" badge="Dialect / Forensics">
          <div className="row" style={{ gap: 10 }}>
            <span className="a-pill muted">
              <span className="dot" />
              QUEUED
            </span>
            <span className="mono" style={{ fontSize: 11, color: 'var(--fg-3)' }}>
              pos · 3 of 5
            </span>
          </div>
          <div className="mono" style={{ fontSize: 11.5, marginTop: 10, color: 'var(--fg-2)' }}>
            interview-04.m4a
          </div>
          <div className="muted" style={{ fontSize: 11.5, marginTop: 4 }}>
            Will start when current job finishes.
          </div>
        </StateCard>

        <StateCard label="JOB · PROCESSING" badge="async">
          <div className="row" style={{ gap: 10 }}>
            <span className="a-pill warn">
              <span className="dot" />
              PROCESSING
            </span>
            <span className="mono" style={{ marginLeft: 'auto', fontSize: 11 }}>
              42%
            </span>
          </div>
          <div className="a-progress" style={{ marginTop: 10 }}>
            <i style={{ width: '42%' }} />
          </div>
          <div className="muted" style={{ fontSize: 11.5, marginTop: 8 }}>
            press-kano.mp4 · est. 3 min remaining
          </div>
        </StateCard>

        <StateCard label="JOB · COMPLETED" badge="result ready">
          <div className="row" style={{ gap: 10 }}>
            <span className="a-pill ok">
              <span className="dot" />
              COMPLETED
            </span>
          </div>
          <div className="mono" style={{ fontSize: 11.5, marginTop: 10 }}>
            maiduguri-02.wav
          </div>
          <div className="muted" style={{ fontSize: 11.5 }}>
            14:22 · 4 ambiguity notes
          </div>
          <button className="a-btn sm" style={{ alignSelf: 'flex-start', marginTop: 8 }}>
            View result
          </button>
        </StateCard>

        <StateCard label="JOB · FAILED" badge="retry available">
          <div className="row" style={{ gap: 10 }}>
            <span className="a-pill danger">
              <span className="dot" />
              FAILED
            </span>
          </div>
          <div className="mono" style={{ fontSize: 11.5, marginTop: 10 }}>
            evidence-archive-04.tar.gz
          </div>
          <div className="muted" style={{ fontSize: 11.5 }}>
            Malformed archive header
          </div>
          <div className="row" style={{ gap: 4, marginTop: 8 }}>
            <button className="a-btn sm">{I.refresh} Retry</button>
            <button className="a-btn ghost sm">View log</button>
          </div>
        </StateCard>

        <StateCard label="LOADING · PAGE" badge="skeleton">
          <div className="col" style={{ gap: 8 }}>
            <div style={{ height: 10, background: 'var(--bg-soft)', borderRadius: 6, width: '40%' }} />
            <div style={{ height: 16, background: 'var(--bg-soft)', borderRadius: 6, width: '70%' }} />
            <div style={{ height: 100, background: 'var(--bg-soft)', borderRadius: 8, marginTop: 6 }} />
          </div>
        </StateCard>

        <StateCard label="EMPTY · FILES" badge="no uploads yet">
          <div className="col" style={{ alignItems: 'center', justifyContent: 'center', gap: 6, flex: 1, textAlign: 'center' }}>
            <div style={{ color: 'var(--fg-4)' }}>{I.folder}</div>
            <div style={{ fontSize: 13 }}>No files yet</div>
            <div className="muted" style={{ fontSize: 11.5, maxWidth: 220 }}>
              Files you upload across modules will appear here. Deleting files frees storage quota.
            </div>
          </div>
        </StateCard>
      </div>
    </div>
  </Shell>
);
