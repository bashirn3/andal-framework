import { Shell } from '../../components/Shell';
import { Sidebar } from '../../components/Sidebar';
import { TopBar } from '../../components/TopBar';
import { Composer, TrustNote } from '../../components/Composer';
import { ChatMessages, useMockChat } from '../../components/Chat';
import { I } from '../../components/icons';
import { useNav } from '../../nav/NavContext';
import type { RoleId, Theme } from '../../types';

// ===== 10. Active Knowledge chat (canned example + live continuation) =====
export const ActiveChatScreen = ({
  theme = 'light',
  roleId = 'rd',
}: {
  theme?: Theme;
  roleId?: RoleId;
}) => {
  const nav = useNav();
  const { messages, send } = useMockChat();
  return (
    <Shell theme={theme}>
      <Sidebar active="knowledge" roleId={roleId} />
      <div className="a-main">
        <TopBar
          module="Knowledge"
          title="Procurement clause comparison"
          themeName={theme}
          actions={
            <button className="a-btn ghost sm" onClick={nav ? () => nav.openModal('clear-session') : undefined}>
              {I.trash}
              <span>Clear session</span>
            </button>
          }
        />

        <div className="a-chat">
          <div className="a-chat__scroll">
            <div className="a-msg user">
              <div className="a-msg__avatar user">AB</div>
              <div className="a-msg__body" style={{ alignItems: 'flex-end' }}>
                <div className="a-msg__meta mono">13:48 · Adamu</div>
                <div className="a-msg__bubble">
                  Compare clauses 4.2 and 7.1 of these two procurement frameworks and highlight any
                  discrepancy in the supplier obligation language.
                </div>
                <div className="row" style={{ marginTop: 6, gap: 6 }}>
                  <span className="a-chip">
                    <span className="a-chip__icon">{I.file}</span>NCCC-procurement-2024.pdf{' '}
                    <span className="ext">· 1.2 MB</span>
                  </span>
                  <span className="a-chip">
                    <span className="a-chip__icon">{I.file}</span>NCCC-procurement-2026-draft.pdf{' '}
                    <span className="ext">· 1.4 MB</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="a-msg">
              <div className="a-msg__avatar assistant mono">A</div>
              <div className="a-msg__body">
                <div className="a-msg__meta mono">13:48 · Andal Knowledge</div>
                <div className="a-msg__bubble">
                  <p style={{ margin: '0 0 10px' }}>
                    Both clauses cover supplier obligations but use different framing. Three substantive
                    discrepancies:
                  </p>
                  <ol style={{ margin: '0 0 10px', paddingLeft: 18, lineHeight: 1.65 }}>
                    <li>
                      <strong>Notification window.</strong> The 2024 framework requires written notice
                      within <span className="a-inlinecode mono">30 days</span> of any subcontracting
                      change; the 2026 draft reduces this to{' '}
                      <span className="a-inlinecode mono">14 days</span> and adds an electronic-filing
                      requirement.
                    </li>
                    <li>
                      <strong>Liability cap.</strong> 2024 caps supplier liability at the contract value;
                      2026 introduces a separate clause for data-handling breaches with no stated cap.
                    </li>
                    <li>
                      <strong>Audit access.</strong> 2026 adds a right of on-site inspection with 5 business
                      days' notice — not present in 2024.
                    </li>
                  </ol>
                  <p style={{ margin: 0 }}>
                    The language change in 4.2 is largely tightening; the 7.1 changes materially shift risk
                    allocation toward the supplier.
                    <span className="a-caret" />
                  </p>
                </div>

                <div className="a-msg__actions">
                  <span className="a-msg__action">{I.copy} Copy</span>
                  <span className="a-msg__action">{I.refresh} Regenerate</span>
                  <span className="a-msg__action">{I.bolt} Continue</span>
                </div>
              </div>
            </div>

            <ChatMessages messages={messages} userName="Adamu" userInitials="AB" assistantLabel="Andal Knowledge" />
          </div>

          <div style={{ padding: '0 64px 18px' }}>
            <Composer placeholder="Reply or attach more context…" onSend={send} />
            <TrustNote />
          </div>
        </div>
      </div>
    </Shell>
  );
};
