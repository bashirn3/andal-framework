import { useCallback, useEffect, useRef, useState } from 'react';
import { I } from './icons';
import type { Attachment } from './Composer';

// ===== Mock chat engine =====
// Purely local + canned. No network, no real model — replies are picked from a
// small canned set and "streamed" character-by-character for a live feel.

export interface ChatMessage {
  id: number;
  role: 'user' | 'assistant';
  text: string;
  time: string;
  attachments?: Attachment[];
  streaming?: boolean;
  done?: boolean;
}

const clock = () =>
  new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

const REPLIES: Array<{ match: RegExp; text: string }> = [
  {
    match: /memo|status|draft/i,
    text:
      'Here is a tight one-page status memo built from your points:\n\n' +
      '• Scope is confirmed and tracking to the 14 June milestone.\n' +
      '• Two risks flagged — vendor onboarding and data migration.\n' +
      '• Next action: circulate for directorate sign-off by Friday.\n\n' +
      'Want me to adjust the tone, or tighten it further?',
  },
  {
    match: /summari/i,
    text:
      'Five key findings from the attached document:\n\n' +
      '1. The current policy predates the 2025 framework and conflicts in two clauses.\n' +
      '2. Reporting obligations are undefined for cross-directorate cases.\n' +
      '3. Retention periods vary between sections 4 and 9.\n' +
      '4. No explicit escalation path for quota breaches.\n' +
      '5. Definitions section omits three terms used later.\n\n' +
      'I can expand any point or pull the supporting passages.',
  },
  {
    match: /compar|clause|discrepan/i,
    text:
      'Comparing the two clauses, the substantive discrepancies are:\n\n' +
      '• Notification window — 30 days in the 2024 text vs 14 days in the draft.\n' +
      '• Liability cap — capped at contract value vs uncapped for data breaches.\n' +
      '• Audit access — the draft adds on-site inspection with 5 days’ notice.\n\n' +
      'Net effect: the later draft shifts risk toward the supplier.',
  },
  {
    match: /translat|formal english|hausa|english/i,
    text:
      'Here is the briefing rendered in formal English:\n\n' +
      '“On Tuesday, officials met in Maiduguri to discuss matters relating to security, ' +
      'agreed to strengthen cooperation with local stakeholders, and confirmed that measures ' +
      'would be implemented statewide.”\n\n' +
      'Let me know if you would prefer a more concise register.',
  },
];

const DEFAULT_REPLY =
  'Understood. Here is how I would approach that:\n\n' +
  '• I will ground the response in any document you attach.\n' +
  '• I can draft, summarize, compare, or translate as needed.\n\n' +
  'Tell me a little more and I will produce a first pass.';

const pickReply = (prompt: string) =>
  REPLIES.find((r) => r.match.test(prompt))?.text ?? DEFAULT_REPLY;

export function useMockChat(initial: ChatMessage[] = []) {
  const [messages, setMessages] = useState<ChatMessage[]>(initial);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const stop = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
  };
  useEffect(() => stop, []);

  const send = useCallback((text: string, attachments?: Attachment[]) => {
    const now = clock();
    const userId = Date.now();
    const asstId = userId + 1;
    const full = pickReply(text);

    setMessages((prev) => [
      ...prev,
      { id: userId, role: 'user', text, time: now, attachments },
      { id: asstId, role: 'assistant', text: '', time: now, streaming: true },
    ]);

    let i = 0;
    const step = Math.max(2, Math.round(full.length / 70));
    stop();
    timer.current = setInterval(() => {
      i += step;
      if (i >= full.length) {
        stop();
        setMessages((prev) =>
          prev.map((m) => (m.id === asstId ? { ...m, text: full, streaming: false, done: true } : m)),
        );
      } else {
        const slice = full.slice(0, i);
        setMessages((prev) => prev.map((m) => (m.id === asstId ? { ...m, text: slice } : m)));
      }
    }, 26);
  }, []);

  const reset = useCallback(() => {
    stop();
    setMessages([]);
  }, []);

  const streaming = messages.some((m) => m.streaming);
  return { messages, send, reset, streaming };
}

// ===== Rendering =====
export function ChatMessages({
  messages,
  userName = 'You',
  userInitials = 'AB',
  assistantLabel = 'Andal',
}: {
  messages: ChatMessage[];
  userName?: string;
  userInitials?: string;
  assistantLabel?: string;
}) {
  return (
    <>
      {messages.map((m) =>
        m.role === 'user' ? (
          <div key={m.id} className="a-msg user">
            <div className="a-msg__avatar user">{userInitials}</div>
            <div className="a-msg__body" style={{ alignItems: 'flex-end' }}>
              <div className="a-msg__meta mono">
                {m.time} · {userName}
              </div>
              <div className="a-msg__bubble">{m.text}</div>
              {m.attachments && m.attachments.length > 0 && (
                <div className="row" style={{ marginTop: 6, gap: 6 }}>
                  {m.attachments.map((a, i) => (
                    <span key={i} className="a-chip">
                      <span className="a-chip__icon">{I.file}</span>
                      {a.name}
                      {a.size && <span className="ext">· {a.size}</span>}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div key={m.id} className="a-msg">
            <div className="a-msg__avatar assistant mono">A</div>
            <div className="a-msg__body">
              <div className="a-msg__meta mono">
                {m.time} · {assistantLabel}
              </div>
              <div className="a-msg__bubble" style={{ whiteSpace: 'pre-wrap' }}>
                {m.text}
                {m.streaming && <span className="a-caret" />}
              </div>
              {m.done && (
                <div className="a-msg__actions">
                  <span className="a-msg__action">{I.copy} Copy</span>
                  <span className="a-msg__action">{I.refresh} Regenerate</span>
                  <span className="a-msg__action">{I.bolt} Continue</span>
                </div>
              )}
            </div>
          </div>
        ),
      )}
    </>
  );
}
