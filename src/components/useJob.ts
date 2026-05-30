import { useCallback, useEffect, useRef, useState } from 'react';

// Mock async-job runner: idle → queued → processing (animated %) → completed.
// Purely local timers; no real upload or processing happens.
export type JobStatus = 'idle' | 'queued' | 'processing' | 'completed' | 'failed';

export interface JobState {
  status: JobStatus;
  progress: number;
  fileName: string | null;
}

export function useJob() {
  const [state, setState] = useState<JobState>({ status: 'idle', progress: 0, fileName: null });
  const timers = useRef<Array<ReturnType<typeof setTimeout>>>([]);

  const clear = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  useEffect(() => clear, []);

  const start = useCallback((fileName: string, onComplete?: () => void) => {
    clear();
    setState({ status: 'queued', progress: 0, fileName });

    timers.current.push(
      setTimeout(() => {
        setState((s) => ({ ...s, status: 'processing', progress: 6 }));

        const tick = () => {
          setState((s) => {
            if (s.status !== 'processing') return s;
            const next = Math.min(100, s.progress + Math.random() * 14 + 6);
            if (next >= 100) {
              timers.current.push(
                setTimeout(() => {
                  setState((p) => ({ ...p, status: 'completed', progress: 100 }));
                  onComplete?.();
                }, 350),
              );
              return { ...s, progress: 100 };
            }
            timers.current.push(setTimeout(tick, 260 + Math.random() * 180));
            return { ...s, progress: next };
          });
        };
        tick();
      }, 700),
    );
  }, []);

  const reset = useCallback(() => {
    clear();
    setState({ status: 'idle', progress: 0, fileName: null });
  }, []);

  return { ...state, start, reset };
}
