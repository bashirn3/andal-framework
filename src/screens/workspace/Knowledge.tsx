import { useEffect, useRef } from 'react';
import { Shell } from '../../components/Shell';
import { Sidebar } from '../../components/Sidebar';
import { TopBar } from '../../components/TopBar';
import { Composer, SuggestList, TrustNote } from '../../components/Composer';
import { ChatMessages, useMockChat } from '../../components/Chat';
import { I } from '../../components/icons';
import { ROLES } from '../../data/roles';
import type { RoleId, Theme } from '../../types';

const SUGGESTED = [
  'Draft a one-page status memo from these bullet points',
  'Summarize the attached document into five key findings',
  'Compare two policy clauses and highlight discrepancies',
  'Translate this briefing into formal English',
];

// ===== 5/6 + 10. Knowledge workspace — interactive (home → live thread) =====
export const KnowledgeScreen = ({
  theme = 'light',
  roleId = 'rd',
  firstName,
}: {
  theme?: Theme;
  roleId?: RoleId;
  firstName?: string;
}) => {
  const r = ROLES[roleId] || ROLES.rd;
  const name = firstName || r.name.split(' ')[0];
  const { messages, send, reset } = useMockChat();
  const started = messages.length > 0;

  // Keep the latest message in view as a reply streams in.
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  return (
    <Shell theme={theme}>
      <Sidebar active="knowledge" roleId={roleId} />
      <div className="a-main">
        <TopBar
          module="Knowledge"
          title="New conversation"
          themeName={theme}
          actions={
            started ? (
              <button className="a-btn ghost sm" onClick={reset}>
                {I.trash}
                <span>Clear session</span>
              </button>
            ) : (
              <button className="a-btn ghost sm">
                {I.plus}
                <span>New</span>
              </button>
            )
          }
        />

        {started ? (
          <div className="a-chat">
            <div className="a-chat__scroll" ref={scrollRef}>
              <ChatMessages
                messages={messages}
                userName={name}
                userInitials={r.initials}
                assistantLabel="Andal Knowledge"
              />
            </div>
            <div className="a-chat__dock">
              <Composer placeholder="Reply or attach more context…" onSend={send} autoFocus />
              <TrustNote />
            </div>
          </div>
        ) : (
          <div className="a-home">
            <div className="a-home__inner">
              <div>
                <div className="a-home__eyebrow">ANDAL KNOWLEDGE</div>
                <h1 className="a-home__title" style={{ marginTop: 8 }}>
                  What are we working on, {name}?
                </h1>
                <p className="a-home__sub" style={{ marginTop: 10 }}>
                  Draft, summarize, compare, translate, or ground a question in a document you attach.
                </p>
              </div>

              <Composer placeholder="Ask Andal Knowledge…" onSend={send} />

              <div className="col" style={{ gap: 10 }}>
                <div className="mono-meta">SUGGESTED</div>
                <SuggestList items={SUGGESTED} onPick={(s) => send(s)} />
              </div>
            </div>
            <TrustNote />
          </div>
        )}
      </div>
    </Shell>
  );
};
