import { useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { I } from './icons';

// ===== Attach popup =====
interface AttachOption {
  id: string;
  label: string;
  sub: string;
  icon: ReactNode;
}

const ATTACH_OPTIONS: AttachOption[] = [
  { id: 'device', label: 'Upload from device', sub: 'Browse files on this computer', icon: I.upload },
  { id: 'documents', label: 'Documents', sub: 'PDF, DOCX, TXT, Markdown', icon: I.file },
  { id: 'code', label: 'Code files', sub: '.py, .ts, .json, .yaml, .sql and more', icon: I.code },
  { id: 'media', label: 'Audio or video', sub: '.wav, .mp3, .m4a, .mp4, .mov', icon: I.voice },
  { id: 'evidence', label: 'Evidence bundle', sub: '.log, .csv, .zip, .tar.gz, .eml', icon: I.folder },
  { id: 'files', label: 'From Files & storage', sub: "Pick something you've already uploaded", icon: I.folder },
];

const AttachPopup = ({ onClose }: { onClose: () => void }) => (
  <>
    <div className="a-attach__back" onClick={onClose} />
    <div className="a-attach__pop" role="menu">
      <div className="a-attach__hd">
        <span className="mono-meta">ATTACH</span>
      </div>
      <div className="a-attach__list">
        {ATTACH_OPTIONS.map((opt) => (
          <button key={opt.id} className="a-attach__item" onClick={onClose} role="menuitem">
            <span className="a-attach__ico">{opt.icon}</span>
            <div
              className="col"
              style={{ lineHeight: 1.25, alignItems: 'flex-start', flex: 1, minWidth: 0 }}
            >
              <span className="a-attach__label">{opt.label}</span>
              <span className="a-attach__sub">{opt.sub}</span>
            </div>
            <span className="a-attach__arrow">{I.chevR}</span>
          </button>
        ))}
      </div>
      <div className="a-attach__ft mono">≤ 500 MB per file · scanned before upload</div>
    </div>
  </>
);

// ===== Composer with attach =====
export interface Attachment {
  name: string;
  size?: string;
}

interface ComposerProps {
  placeholder?: string;
  attached?: Attachment[];
  hint?: string;
  /** Called with the typed text when the user sends. Omit for a display-only composer. */
  onSend?: (text: string) => void;
  autoFocus?: boolean;
}

export const Composer = ({
  placeholder = 'Ask Andal anything…',
  attached = [],
  hint = 'Press ⏎ to send · ⇧⏎ for newline',
  onSend,
  autoFocus = false,
}: ComposerProps) => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const taRef = useRef<HTMLTextAreaElement>(null);

  const grow = () => {
    const ta = taRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = Math.min(ta.scrollHeight, 200) + 'px';
  };

  const send = () => {
    const t = text.trim();
    if (!t || !onSend) return;
    onSend(t);
    setText('');
    requestAnimationFrame(() => {
      if (taRef.current) taRef.current.style.height = 'auto';
    });
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="a-composer">
      {attached.length > 0 && (
        <div className="row" style={{ gap: 6, flexWrap: 'wrap' }}>
          {attached.map((a, i) => (
            <span key={i} className="a-chip">
              <span className="a-chip__icon">{I.file}</span>
              {a.name}
              {a.size && <span className="ext">· {a.size}</span>}
              <span className="x">{I.x}</span>
            </span>
          ))}
        </div>
      )}
      <textarea
        ref={taRef}
        className="a-composer__ta"
        rows={1}
        placeholder={placeholder}
        value={text}
        autoFocus={autoFocus}
        onChange={(e) => {
          setText(e.target.value);
          grow();
        }}
        onKeyDown={onKeyDown}
      />
      <div className="a-composer__bar">
        <div className="a-attach__wrap">
          <button className="a-btn ghost sm" onClick={() => setOpen((o) => !o)}>
            {I.attach}
            <span>Attach</span>
          </button>
          {open && <AttachPopup onClose={() => setOpen(false)} />}
        </div>
        <span className="a-composer__hint">{hint}</span>
        <button
          className="a-btn primary sm"
          style={{ width: 30, padding: 0 }}
          onClick={send}
          disabled={!onSend || !text.trim()}
          title="Send"
        >
          {I.arrowUp}
        </button>
      </div>
    </div>
  );
};

export const SuggestList = ({
  items,
  onPick,
}: {
  items: string[];
  onPick?: (s: string) => void;
}) => (
  <div className="a-suggest">
    {items.map((s, i) => (
      <button key={i} className="a-suggest__item" onClick={onPick ? () => onPick(s) : undefined}>
        <span>{s}</span>
        <span className="arrow">{I.chevR}</span>
      </button>
    ))}
  </div>
);

export const TrustNote = () => (
  <div
    className="row"
    style={{
      justifyContent: 'center',
      gap: 6,
      fontFamily: 'var(--font-mono)',
      fontSize: 10.5,
      color: 'var(--fg-3)',
      padding: '10px 0 14px',
    }}
  >
    {I.info} Andal can make mistakes. Verify before acting on sensitive output.
  </div>
);
