import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react';
import { I } from '../components/icons';

export type ToastKind = 'ok' | 'warn' | 'danger' | 'info';
interface Toast {
  id: number;
  kind: ToastKind;
  title: string;
  sub?: string;
}
type ToastFn = (kind: ToastKind, title: string, sub?: string) => void;

// No-op default so components can call useToast() outside a provider safely.
const ToastCtx = createContext<ToastFn>(() => {});
export const useToast = () => useContext(ToastCtx);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const idRef = useRef(0);

  const push = useCallback<ToastFn>((kind, title, sub) => {
    const id = ++idRef.current;
    setToasts((t) => [...t, { id, kind, title, sub }]);
    window.setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3600);
  }, []);

  const icon = (k: ToastKind) =>
    k === 'danger' || k === 'warn' ? I.warn : k === 'ok' ? I.check : I.info;

  return (
    <ToastCtx.Provider value={push}>
      {children}
      <div className="a-toaster" role="region" aria-label="Notifications">
        {toasts.map((t) => (
          <div key={t.id} className={`a-toast ${t.kind}`} role="status">
            <span className="a-toast__ico">{icon(t.kind)}</span>
            <div className="col" style={{ gap: 2, minWidth: 0 }}>
              <div className="a-toast__title">{t.title}</div>
              {t.sub && <div className="a-toast__sub">{t.sub}</div>}
            </div>
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}
