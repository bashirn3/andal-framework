import { useState, type ReactNode } from 'react';
import { I } from '../icons';
import { useNav } from '../../nav/NavContext';

// Shared dark backdrop. The underlying screen stays mounted behind it.
const ModalBack = ({ children }: { children: ReactNode }) => {
  const nav = useNav();
  return (
    <div className="a-modal-back" onClick={nav ? nav.closeModal : undefined}>
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
};

export const ClearSessionOverlay = () => {
  const nav = useNav();
  if (!nav) return null;
  return (
    <ModalBack>
      <div className="a-modal">
        <div className="a-modal__hd">
          <div className="a-modal__title">Clear this conversation?</div>
        </div>
        <div className="a-modal__body">
          The full message history will be removed from your sidebar. Attached files remain in{' '}
          <strong>Files &amp; storage</strong> until deleted there.
        </div>
        <div className="a-modal__ft">
          <button className="a-btn" onClick={() => nav.closeModal()}>
            Cancel
          </button>
          <button
            className="a-btn danger"
            onClick={() => {
              nav.closeModal();
              nav.navigate('/knowledge');
            }}
          >
            Clear conversation
          </button>
        </div>
      </div>
    </ModalBack>
  );
};

export const DeleteFileOverlay = () => {
  const nav = useNav();
  if (!nav) return null;
  return (
    <ModalBack>
      <div className="a-modal">
        <div className="a-modal__hd">
          <div className="a-modal__title">
            Delete{' '}
            <span className="mono" style={{ fontSize: 14 }}>
              incident-bundle-NTP.zip
            </span>
            ?
          </div>
        </div>
        <div className="a-modal__body">
          <p style={{ margin: 0 }}>
            This file is currently being processed. Deleting it cancels the job and removes the file
            permanently.
          </p>
          <div className="row" style={{ gap: 12, marginTop: 12, padding: '10px 12px', background: 'var(--bg-soft)', borderRadius: 8 }}>
            <div className="col" style={{ flex: 1, gap: 2 }}>
              <span className="mono-meta">FREES</span>
              <span className="mono" style={{ fontSize: 16 }}>
                82 MB
              </span>
            </div>
            <div className="col" style={{ flex: 1, gap: 2 }}>
              <span className="mono-meta">NEW QUOTA</span>
              <span className="mono" style={{ fontSize: 16 }}>
                308 / 500 MB
              </span>
            </div>
          </div>
          <p style={{ margin: '10px 0 0', fontSize: 12.5, color: 'var(--fg-3)' }}>
            Deleting files frees storage quota.
          </p>
        </div>
        <div className="a-modal__ft">
          <button className="a-btn" onClick={() => nav.closeModal()}>
            Cancel
          </button>
          <button className="a-btn danger" onClick={() => nav.closeModal()}>
            Delete file
          </button>
        </div>
      </div>
    </ModalBack>
  );
};

export const ApproveUserOverlay = () => {
  const nav = useNav();
  // Department selection gates the approve button (admin must assign a department).
  const [dept, setDept] = useState('Research & Development');
  const [accessLevel, setAccessLevel] = useState('Standard staff');
  if (!nav) return null;

  const DEPTS = ['Unassigned', 'Research & Development', 'DLI', 'Digital Forensics', 'General staff', 'Platform'];
  const assigned = dept !== 'Unassigned';

  return (
    <ModalBack>
      <div className="a-modal" style={{ width: 560 }}>
        <div className="a-modal__hd" style={{ paddingBottom: 14, borderBottom: '1px solid var(--border-soft)' }}>
          <div className="row" style={{ gap: 12 }}>
            <div className="a-avatar mono" style={{ width: 40, height: 40, fontSize: 13 }}>
              HY
            </div>
            <div className="col" style={{ lineHeight: 1.25 }}>
              <div className="a-modal__title" style={{ margin: 0 }}>
                Halima Yusuf
              </div>
              <div className="mono" style={{ fontSize: 12, color: 'var(--fg-3)' }}>
                h.yusuf@nccc.gov.ng · NCCC-04302
              </div>
            </div>
            <span className="a-pill warn mono" style={{ marginLeft: 'auto' }}>
              <span className="dot" />
              PENDING
            </span>
          </div>
        </div>
        <div className="a-modal__body" style={{ padding: '14px 20px' }}>
          <p style={{ margin: '0 0 14px', fontSize: 13 }}>
            Approving this account allows the user to sign in and access the modules assigned to this
            department.
          </p>
          <div className="col" style={{ gap: 14 }}>
            <div className="a-field">
              <label className="a-label">Department / directorate</label>
              <select className="a-input" value={dept} onChange={(e) => setDept(e.target.value)}>
                {DEPTS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              <div className="a-help">Determines default module access. Can be overridden after approval.</div>
            </div>

            <div className="a-field">
              <label className="a-label">Access level</label>
              <div className="seg">
                {['Standard staff', 'Lead', 'Admin'].map((lvl) => (
                  <button key={lvl} className={accessLevel === lvl ? 'active' : ''} onClick={() => setAccessLevel(lvl)}>
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="a-modal__ft">
          <button className="a-btn ghost" style={{ marginRight: 'auto', color: 'var(--fg-3)' }}>
            View profile
          </button>
          <button className="a-btn" onClick={() => nav.closeModal()}>
            Cancel
          </button>
          <button className="a-btn primary" disabled={!assigned} onClick={() => nav.closeModal()}>
            Approve account
          </button>
        </div>
      </div>
    </ModalBack>
  );
};

export const DisableUserOverlay = () => {
  const nav = useNav();
  if (!nav) return null;
  return (
    <ModalBack>
      <div className="a-modal">
        <div className="a-modal__hd">
          <div className="row" style={{ gap: 10 }}>
            <span style={{ color: 'var(--danger)' }}>{I.warn}</span>
            <div className="a-modal__title">Disable account?</div>
          </div>
        </div>
        <div className="a-modal__body">
          <p style={{ margin: '0 0 12px' }}>
            <strong style={{ color: 'var(--fg)' }}>Tunde Lawal</strong> will no longer be able to sign in. Their
            history and uploaded files will remain stored unless removed by an administrator.
          </p>
        </div>
        <div className="a-modal__ft">
          <button className="a-btn" onClick={() => nav.closeModal()}>
            Cancel
          </button>
          <button className="a-btn danger" onClick={() => nav.closeModal()}>
            Disable account
          </button>
        </div>
      </div>
    </ModalBack>
  );
};
