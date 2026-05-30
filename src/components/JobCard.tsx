import { I } from './icons';
import type { JobState } from './useJob';

// Visual status of a running mock job (queued → processing → completed).
export const JobCard = ({
  job,
  meta,
  onView,
  onReset,
}: {
  job: JobState;
  meta: string;
  onView: () => void;
  onReset: () => void;
}) => {
  if (job.status === 'idle') return null;

  const pill =
    job.status === 'completed'
      ? { cls: 'ok', label: 'COMPLETED' }
      : job.status === 'processing'
        ? { cls: 'warn', label: 'PROCESSING' }
        : { cls: 'muted', label: 'QUEUED' };

  return (
    <div className="a-card" style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div className="row" style={{ gap: 10 }}>
        <span className={`a-pill ${pill.cls} mono`}>
          <span className="dot" />
          {pill.label}
        </span>
        <span className="mono" style={{ fontSize: 12.5, color: 'var(--fg-2)' }}>
          {job.fileName}
        </span>
        <span className="mono" style={{ marginLeft: 'auto', fontSize: 12 }}>
          {Math.round(job.progress)}%
        </span>
      </div>

      <div className="a-progress">
        <i style={{ width: `${job.progress}%`, transition: 'width .25s ease' }} />
      </div>

      <div className="row" style={{ gap: 8 }}>
        <span className="mono" style={{ fontSize: 11, color: 'var(--fg-3)' }}>{meta}</span>
        <div className="row" style={{ marginLeft: 'auto', gap: 6 }}>
          {job.status === 'completed' ? (
            <>
              <button className="a-btn ghost sm" onClick={onReset}>
                Dismiss
              </button>
              <button className="a-btn primary sm" onClick={onView}>
                {I.arrow}
                <span>View result</span>
              </button>
            </>
          ) : (
            <span className="mono" style={{ fontSize: 11, color: 'var(--fg-3)' }}>
              {job.status === 'queued' ? 'Waiting for a worker…' : 'Running asynchronously…'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
