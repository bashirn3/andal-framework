import { Shell } from '../../components/Shell';
import { Sidebar } from '../../components/Sidebar';
import { TopBar } from '../../components/TopBar';
import { Composer, TrustNote } from '../../components/Composer';
import { ChatMessages, useMockChat } from '../../components/Chat';
import { I } from '../../components/icons';
import type { RoleId, Theme } from '../../types';

// Syntax-highlighted code sample (matches the design's token classes).
const CODE_HTML = `<span class="tok-key">import</span> asyncio
<span class="tok-key">import</span> aiohttp
<span class="tok-key">from</span> typing <span class="tok-key">import</span> AsyncIterator

<span class="tok-key">async def</span> <span class="tok-fn">stream_batches</span>(urls: <span class="tok-typ">list[str]</span>, *, limit: <span class="tok-typ">int</span> = <span class="tok-num">8</span>) -> <span class="tok-typ">AsyncIterator[dict]</span>:
    sem = asyncio.Semaphore(limit)
    <span class="tok-key">async with</span> aiohttp.ClientSession() <span class="tok-key">as</span> s:
        <span class="tok-key">async def</span> <span class="tok-fn">fetch</span>(u):
            <span class="tok-key">async with</span> sem, s.get(u) <span class="tok-key">as</span> r:
                <span class="tok-key">return await</span> r.json()
        <span class="tok-cmt"># Yield rows as soon as each request settles</span>
        <span class="tok-key">for</span> coro <span class="tok-key">in</span> asyncio.as_completed([fetch(u) <span class="tok-key">for</span> u <span class="tok-key">in</span> urls]):
            payload = <span class="tok-key">await</span> coro
            <span class="tok-key">for</span> row <span class="tok-key">in</span> payload[<span class="tok-str">"items"</span>]:
                <span class="tok-key">yield</span> row`;

// ===== 7. Coding workspace (active conversation) =====
export const CodingScreen = ({
  theme = 'light',
  roleId = 'rd',
}: {
  theme?: Theme;
  roleId?: RoleId;
}) => {
  const { messages, send } = useMockChat();
  return (
  <Shell theme={theme}>
    <Sidebar active="coding" roleId={roleId} expandedOverride={['coding']} />
    <div className="a-main">
      <TopBar
        module="Coding"
        title="Loader refactor · pipeline.py"
        themeName={theme}
        actions={
          <>
            <button className="a-btn ghost sm">
              {I.refresh}
              <span>Regenerate</span>
            </button>
            <button className="a-btn ghost sm">
              {I.trash}
              <span>Clear</span>
            </button>
          </>
        }
      />

      <div className="a-chat">
        <div className="a-chat__scroll">
          <div className="a-msg user">
            <div className="a-msg__avatar user">AB</div>
            <div className="a-msg__body" style={{ alignItems: 'flex-end' }}>
              <div className="a-msg__meta mono">14:02 · Adamu</div>
              <div className="a-msg__bubble">
                Refactor this synchronous loader into an async streaming pipeline. Use{' '}
                <span className="a-inlinecode mono">asyncio</span> and bound concurrency to 8.
              </div>
              <div className="row" style={{ marginTop: 6, gap: 6 }}>
                <span className="a-chip">
                  <span className="a-chip__icon">{I.file}</span>pipeline.py <span className="ext">· 3.2 KB</span>
                </span>
              </div>
            </div>
          </div>

          <div className="a-msg">
            <div className="a-msg__avatar assistant mono">A</div>
            <div className="a-msg__body">
              <div className="a-msg__meta mono">14:02 · Andal Coding</div>
              <div className="a-msg__bubble">
                Here's an async version that streams batches and bounds concurrency with a semaphore.
                The original blocked on each <span className="a-inlinecode mono">requests.get</span>; this
                yields rows as they arrive.
              </div>

              <div className="a-code">
                <div className="a-code__head">
                  <span className="a-code__lang mono">pipeline.py</span>
                  <span className="mono" style={{ color: 'var(--fg-4)' }}>
                    · python
                  </span>
                  <span className="a-code__copy mono">{I.copy} Copy</span>
                </div>
                <div className="a-code__body" dangerouslySetInnerHTML={{ __html: CODE_HTML }} />
              </div>

              <div className="a-msg__bubble" style={{ marginTop: 4 }}>
                Three things to note: the semaphore caps in-flight requests at 8,{' '}
                <span className="a-inlinecode mono">as_completed</span> preserves streaming order on
                settlement (not input order), and the session is reused across all fetches.
              </div>

              <div className="a-msg__actions">
                <span className="a-msg__action">{I.copy} Copy</span>
                <span className="a-msg__action">{I.refresh} Regenerate</span>
                <span className="a-msg__action">{I.bolt} Generate tests</span>
              </div>
            </div>
          </div>

          <ChatMessages messages={messages} userName="Adamu" userInitials="AB" assistantLabel="Andal Coding" />
        </div>

        <div className="a-chat__dock">
          <Composer
            placeholder="Ask Andal Coding…"
            attached={[{ name: 'normalize.py', size: '1.4 KB' }]}
            onSend={send}
          />
          <TrustNote />
        </div>
      </div>
    </div>
  </Shell>
  );
};
