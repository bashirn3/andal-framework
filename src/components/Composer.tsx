import { useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { I } from './icons';
import { useToast } from '../toast/Toast';

// ===== Attach popup =====
interface AttachOption {
  id: string;
  label: string;
  sub: string;
  icon: ReactNode;
  sample: Attachment;
}

const ATTACH_OPTIONS: AttachOption[] = [
  { id: 'device', label: 'Upload from device', sub: 'Browse files on this computer', icon: I.upload, sample: { name: 'document.pdf', size: '480 KB' } },
  { id: 'documents', label: 'Documents', sub: 'PDF, DOCX, TXT, Markdown', icon: I.file, sample: { name: 'policy-brief.pdf', size: '1.1 MB' } },
  { id: 'code', label: 'Code files', sub: '.py, .ts, .json, .yaml, .sql and more', icon: I.code, sample: { name: 'service.py', size: '2.3 KB' } },
  { id: 'media', label: 'Audio or video', sub: '.wav, .mp3, .m4a, .mp4, .mov', icon: I.voice, sample: { name: 'interview.m4a', size: '18 MB' } },
  { id: 'evidence', label: 'Evidence bundle', sub: '.log, .csv, .zip, .tar.gz, .eml', icon: I.folder, sample: { name: 'gateway-01.log', size: '3.4 MB' } },
  { id: 'files', label: 'From Files & storage', sub: "Pick something you've already uploaded", icon: I.folder, sample: { name: 'NCCC-procurement-2024.pdf', size: '1.2 MB' } },
];

const AttachPopup = ({ onClose, onPick }: { onClose: () => void; onPick: (opt: AttachOption) => void }) => (
  <>
    <div className="a-attach__back" onClick={onClose} />
    <div className="a-attach__pop" role="menu">
      <div className="a-attach__hd">
        <span className="mono-meta">ATTACH</span>
      </div>
      <div className="a-attach__list">
        {ATTACH_OPTIONS.map((opt) => (
          <button key={opt.id} className="a-attach__item" onClick={() => onPick(opt)} role="menuitem">
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
  /** Called with the typed text (and any attachments) when the user sends. */
  onSend?: (text: string, attachments?: Attachment[]) => void;
  autoFocus?: boolean;
}

export const Composer = ({
  placeholder = 'Ask Andal anything…',
  attached = [],
  hint = 'Press ⏎ to send · ⇧⏎ for newline',
  onSend,
  autoFocus = false,
}: ComposerProps) => {
  const toast = useToast();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [added, setAdded] = useState<Attachment[]>([]);
  const taRef = useRef<HTMLTextAreaElement>(null);

  const chips = [...attached, ...added];

  const grow = () => {
    const ta = taRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = Math.min(ta.scrollHeight, 200) + 'px';
  };

  const send = () => {
    const t = text.trim();
    if (!t || !onSend) return;
    onSend(t, added);
    setText('');
    setAdded([]);
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
      {chips.length > 0 && (
        <div className="row" style={{ gap: 6, flexWrap: 'wrap' }}>
          {chips.map((a, i) => {
            const removable = i >= attached.length;
            return (
              <span key={i} className="a-chip">
                <span className="a-chip__icon">{I.file}</span>
                {a.name}
                {a.size && <span className="ext">· {a.size}</span>}
                {removable && (
                  <span
                    className="x"
                    role="button"
                    title="Remove"
                    onClick={() => setAdded((prev) => prev.filter((x) => x !== a))}
                  >
                    {I.x}
                  </span>
                )}
              </span>
            );
          })}
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
          {open && (
            <AttachPopup
              onClose={() => setOpen(false)}
              onPick={(opt) => {
                setOpen(false);
                setAdded((prev) => [...prev, opt.sample]);
                toast('ok', 'Attached', `${opt.sample.name} · ${opt.sample.size}`);
              }}
            />
          )}
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
