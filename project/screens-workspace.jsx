/* global React, I, Shell, Sidebar, TopBar */

// ===== Attach popup =====
const ATTACH_OPTIONS = [
  { id: 'device',    label: 'Upload from device',  sub: 'Browse files on this computer',           icon: I.upload },
  { id: 'documents', label: 'Documents',           sub: 'PDF, DOCX, TXT, Markdown',                icon: I.file },
  { id: 'code',      label: 'Code files',          sub: '.py, .ts, .json, .yaml, .sql and more',   icon: I.code },
  { id: 'media',     label: 'Audio or video',      sub: '.wav, .mp3, .m4a, .mp4, .mov',            icon: I.voice },
  { id: 'evidence',  label: 'Evidence bundle',     sub: '.log, .csv, .zip, .tar.gz, .eml',         icon: I.folder },
  { id: 'files',     label: 'From Files & storage',sub: 'Pick something you\'ve already uploaded', icon: I.folder },
];

const AttachPopup = ({ onClose }) => (
  <>
    <div className="a-attach__back" onClick={onClose} />
    <div className="a-attach__pop" role="menu">
      <div className="a-attach__hd">
        <span className="mono-meta">ATTACH</span>
      </div>
      <div className="a-attach__list">
        {ATTACH_OPTIONS.map(opt => (
          <button key={opt.id} className="a-attach__item" onClick={onClose} role="menuitem">
            <span className="a-attach__ico">{opt.icon}</span>
            <div className="col" style={{lineHeight: 1.25, alignItems: 'flex-start', flex: 1, minWidth: 0}}>
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
const Composer = ({ placeholder = "Ask Andal anything…", attached = [], hint = "Press ⏎ to send · ⇧⏎ for newline" }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="a-composer">
      {attached.length > 0 && (
        <div className="row" style={{gap: 6, flexWrap: 'wrap'}}>
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
      <div className="a-composer__input">
        <span className="a-composer__placeholder">{placeholder}</span>
      </div>
      <div className="a-composer__bar">
        <div className="a-attach__wrap">
          <button className="a-btn ghost sm" onClick={() => setOpen(o => !o)}>{I.attach}<span>Attach</span></button>
          {open && <AttachPopup onClose={() => setOpen(false)} />}
        </div>
        <span className="a-composer__hint">{hint}</span>
        <button className="a-btn primary sm" style={{width: 30, padding: 0}}>{I.arrowUp}</button>
      </div>
    </div>
  );
};

const SuggestList = ({ items, onPick }) => (
  <div className="a-suggest">
    {items.map((s, i) => (
      <button key={i} className="a-suggest__item" onClick={onPick ? () => onPick(s) : undefined}>
        <span>{s}</span>
        <span className="arrow">{I.chevR}</span>
      </button>
    ))}
  </div>
);

const trustNote = (
  <div className="row" style={{justifyContent: 'center', gap: 6, fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--fg-3)', padding: '10px 0 14px'}}>
    {I.info} Andal can make mistakes. Verify before acting on sensitive output.
  </div>
);

// ===== 5/6. Knowledge workspace =====
const KnowledgeScreen = ({ theme = 'light', roleId = 'rd', firstName }) => {
  const r = ROLES[roleId] || ROLES.rd;
  firstName = firstName || r.name.split(' ')[0];
  const nav = useNav();
  const convos = [
    { title: 'Briefing memo · Q1 review' },
    { title: 'Procurement clause comparison' },
    { title: 'Standards translation' },
  ];
  return (
    <Shell theme={theme}>
      <Sidebar active="knowledge" roleId={roleId} themeName={theme} />
      <div className="a-main">
        <TopBar module="Knowledge" title="New conversation" themeName={theme}
          actions={<button className="a-btn ghost sm">{I.plus}<span>New</span></button>} />
        <div className="a-home">
          <div className="a-home__inner">
            <div>
              <div className="a-home__eyebrow">ANDAL KNOWLEDGE</div>
              <h1 className="a-home__title" style={{marginTop: 8}}>What are we working on, {firstName}?</h1>
              <p className="a-home__sub" style={{marginTop: 10}}>Draft, summarize, compare, translate, or ground a question in a document you attach.</p>
            </div>

            <Composer placeholder="Ask Andal Knowledge…" />

            <div className="col" style={{gap: 10}}>
              <div className="mono-meta">SUGGESTED</div>
              <SuggestList items={[
                'Draft a one-page status memo from these bullet points',
                'Summarize the attached document into five key findings',
                'Compare two policy clauses and highlight discrepancies',
                'Translate this briefing into formal English',
              ]} onPick={nav ? () => nav.navigate('/knowledge/chat') : undefined} />
            </div>
          </div>
          {trustNote}
        </div>
      </div>
    </Shell>
  );
};

// ===== 7. Coding workspace (active conversation) =====
const CodingScreen = ({ theme = 'light', roleId = 'rd', firstName }) => {
  const r = ROLES[roleId] || ROLES.rd;
  firstName = firstName || r.name.split(' ')[0];
  const convos = [
    { title: 'Loader refactor · pipeline.py', active: true },
    { title: 'k8s manifest review' },
    { title: 'Edge cases · normalize()' },
  ];
  return (
    <Shell theme={theme}>
      <Sidebar active="coding" roleId={roleId} themeName={theme} expandedOverride={['coding']} />
      <div className="a-main">
        <TopBar module="Coding" title="Loader refactor · pipeline.py" themeName={theme}
          actions={<><button className="a-btn ghost sm">{I.refresh}<span>Regenerate</span></button><button className="a-btn ghost sm">{I.trash}<span>Clear</span></button></>} />

        <div className="a-chat">
          <div className="a-chat__scroll">

            <div className="a-msg user">
              <div className="a-msg__avatar user">AB</div>
              <div className="a-msg__body" style={{alignItems: 'flex-end'}}>
                <div className="a-msg__meta mono">14:02 · Adamu</div>
                <div className="a-msg__bubble">
                  Refactor this synchronous loader into an async streaming pipeline. Use <span className="a-inlinecode mono">asyncio</span> and bound concurrency to 8.
                </div>
                <div className="row" style={{marginTop: 6, gap: 6}}>
                  <span className="a-chip"><span className="a-chip__icon">{I.file}</span>pipeline.py <span className="ext">· 3.2 KB</span></span>
                </div>
              </div>
            </div>

            <div className="a-msg">
              <div className="a-msg__avatar assistant mono">A</div>
              <div className="a-msg__body">
                <div className="a-msg__meta mono">14:02 · Andal Coding</div>
                <div className="a-msg__bubble">
                  Here's an async version that streams batches and bounds concurrency with a semaphore. The original blocked on each <span className="a-inlinecode mono">requests.get</span>; this yields rows as they arrive.
                </div>

                <div className="a-code">
                  <div className="a-code__head">
                    <span className="a-code__lang mono">pipeline.py</span>
                    <span className="mono" style={{color: 'var(--fg-4)'}}>· python</span>
                    <span className="a-code__copy mono">{I.copy} Copy</span>
                  </div>
                  <div className="a-code__body" dangerouslySetInnerHTML={{__html:
`<span class="tok-key">import</span> asyncio
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
                <span class="tok-key">yield</span> row`}} />
                </div>

                <div className="a-msg__bubble" style={{marginTop: 4}}>
                  Three things to note: the semaphore caps in-flight requests at 8, <span className="a-inlinecode mono">as_completed</span> preserves streaming order on settlement (not input order), and the session is reused across all fetches.
                </div>

                <div className="a-msg__actions">
                  <span className="a-msg__action">{I.copy} Copy</span>
                  <span className="a-msg__action">{I.refresh} Regenerate</span>
                  <span className="a-msg__action">{I.bolt} Generate tests</span>
                </div>
              </div>
            </div>

          </div>

          <div style={{padding: '0 64px 18px'}}>
            <Composer placeholder="Ask Andal Coding…" attached={[{name: 'normalize.py', size: '1.4 KB'}]} />
            {trustNote}
          </div>
        </div>
      </div>
    </Shell>
  );
};

// ===== 8. Dialect upload =====
const DialectScreen = ({ theme = 'light', roleId = 'forensics', firstName }) => {
  const r = ROLES[roleId] || ROLES.forensics;
  firstName = firstName || r.name.split(' ')[0];
  const convos = [
    { title: 'Field interview · Maiduguri 02' },
    { title: 'Press conference · Kano' },
  ];
  return (
    <Shell theme={theme}>
      <Sidebar active="dialect" roleId={roleId} themeName={theme} />
      <div className="a-main">
        <TopBar module="Dialect" title="New job" themeName={theme} />

        <div className="a-home">
          <div className="a-home__inner">
            <div>
              <div className="a-home__eyebrow">ANDAL DIALECT</div>
              <h1 className="a-home__title" style={{marginTop: 8}}>What shall we render, {firstName}?</h1>
              <p className="a-home__sub" style={{marginTop: 10}}>Upload audio or video for transcription and translation into English.</p>
            </div>

            <div className="row" style={{gap: 18, alignItems: 'flex-start'}}>
              <div className="col" style={{flex: 1, gap: 14}}>
                <div className="a-dz">
                  <div style={{color: 'var(--fg-3)'}}>{I.upload}</div>
                  <div><strong>Drop audio or video here</strong> or <span className="a-link">browse files</span></div>
                  <div className="a-dz__sub">Up to 500 MB per file. Job runs asynchronously and you'll be notified on completion.</div>
                  <div className="a-dz__types mono">.WAV · .MP3 · .M4A · .OGG · .MP4 · .MOV · .WEBM</div>
                </div>
              </div>

              <div className="col" style={{width: 260, gap: 14}}>
                <div className="col" style={{gap: 6}}>
                  <div className="mono-meta">SOURCE LANGUAGE</div>
                  <div className="a-card" style={{padding: 4}}>
                    {['Auto-detect','Hausa','Kanuri','Fulfulde'].map((l, i) => (
                      <div key={l} className="row" style={{padding: '8px 10px', borderRadius: 6, background: i === 1 ? 'var(--bg-soft)' : 'transparent', cursor: 'pointer'}}>
                        <span>{l}</span>
                        {i === 1 && <span style={{marginLeft: 'auto', color: 'var(--accent)'}}>{I.check}</span>}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col" style={{gap: 6}}>
                  <div className="mono-meta">TASK</div>
                  <div className="seg" style={{flexDirection:'column', width: '100%', padding: 4}}>
                    {['Transcribe','Translate','Transcribe + translate'].map((t, i) => (
                      <button key={t} className={i === 2 ? 'active' : ''} style={{justifyContent: 'flex-start', height: 32, padding: '0 10px', textAlign: 'left'}}>{t}</button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="col" style={{gap: 8}}>
              <div className="mono-meta">RECENT JOBS</div>
              <div className="a-card" style={{overflow: 'hidden'}}>
                <table className="a-table">
                  <thead><tr><th>File</th><th>Source</th><th>Task</th><th>Duration</th><th>Status</th><th></th></tr></thead>
                  <tbody>
                    <tr>
                      <td><div className="row" style={{gap: 8}}>{I.voice}<span>maiduguri-02.wav</span></div></td>
                      <td className="mono" style={{fontSize: 12}}>Hausa</td>
                      <td>Transcribe + translate</td>
                      <td className="mono" style={{fontSize: 12}}>14:22</td>
                      <td><span className="a-pill ok"><span className="dot" />COMPLETED</span></td>
                      <td><span className="a-link">View result</span></td>
                    </tr>
                    <tr>
                      <td><div className="row" style={{gap: 8}}>{I.voice}<span>press-kano.mp4</span></div></td>
                      <td className="mono" style={{fontSize: 12}}>Auto · Hausa</td>
                      <td>Transcribe</td>
                      <td className="mono" style={{fontSize: 12}}>08:11</td>
                      <td><span className="a-pill warn"><span className="dot" />PROCESSING · 42%</span></td>
                      <td><span className="muted">—</span></td>
                    </tr>
                    <tr>
                      <td><div className="row" style={{gap: 8}}>{I.voice}<span>interview-04.m4a</span></div></td>
                      <td className="mono" style={{fontSize: 12}}>Kanuri</td>
                      <td>Translate</td>
                      <td className="mono" style={{fontSize: 12}}>22:48</td>
                      <td><span className="a-pill muted"><span className="dot" />QUEUED</span></td>
                      <td><span className="muted">—</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
};

// ===== 8b. Dialect completed result =====
const DialectResultScreen = ({ theme = 'light', roleId = 'forensics' }) => {
  const convos = [
    { title: 'Field interview · Maiduguri 02', active: true },
    { title: 'Press conference · Kano' },
  ];
  return (
    <Shell theme={theme}>
      <Sidebar active="dialect" roleId={roleId} themeName={theme} />
      <div className="a-main">
        <TopBar module="Dialect" title="maiduguri-02.wav · result" themeName={theme}
          actions={<><button className="a-btn ghost sm">{I.download}<span>Export</span></button></>} />

        <div style={{flex: 1, padding: '24px 32px', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 18}}>
          <div className="row" style={{gap: 14, alignItems: 'flex-start'}}>
            <div className="a-card a-statcard" style={{flex: 1}}>
              <div className="a-statcard__label">SOURCE</div>
              <div className="a-statcard__val">Hausa</div>
              <div className="a-statcard__delta">auto-detected · 99.1% confidence</div>
            </div>
            <div className="a-card a-statcard" style={{flex: 1}}>
              <div className="a-statcard__label">DURATION</div>
              <div className="a-statcard__val mono">14:22</div>
              <div className="a-statcard__delta">3 speakers · 1 ambient marker</div>
            </div>
            <div className="a-card a-statcard" style={{flex: 1}}>
              <div className="a-statcard__label">QUALITY</div>
              <div className="a-statcard__val">High</div>
              <div className="a-statcard__delta">overall WER 6.4% · 4 ambiguity notes</div>
            </div>
            <div className="a-card a-statcard" style={{flex: 1}}>
              <div className="a-statcard__label">JOB</div>
              <div className="a-statcard__val mono" style={{fontSize: 14}}>JOB-7F22A</div>
              <div className="a-statcard__delta">completed 14:38 · 22 May</div>
            </div>
          </div>

          <div className="row" style={{gap: 14, flex: 1, minHeight: 0, alignItems: 'stretch'}}>
            <div className="a-card" style={{flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden'}}>
              <div className="row" style={{padding: '12px 14px', borderBottom: '1px solid var(--border-soft)'}}>
                <div className="mono-meta">SOURCE TRANSCRIPT</div>
                <span className="a-pill mono" style={{marginLeft: 'auto'}}>HAU</span>
              </div>
              <div style={{padding: '14px 16px', flex: 1, overflow: 'hidden', fontSize: 13.5, lineHeight: 1.65, color: 'var(--fg-2)'}}>
                <div className="row" style={{gap: 10, marginBottom: 10}}>
                  <span className="mono" style={{color: 'var(--fg-3)', fontSize: 11, minWidth: 44}}>00:12</span>
                  <span className="mono" style={{fontSize: 11, color: 'var(--accent-text)'}}>S1</span>
                  <span style={{flex: 1}}>Ranar Talata, mun tafi taron jami'an tsaro a Maiduguri don tattauna batutuwan da suka shafi tsaro.</span>
                </div>
                <div className="row" style={{gap: 10, marginBottom: 10}}>
                  <span className="mono" style={{color: 'var(--fg-3)', fontSize: 11, minWidth: 44}}>00:34</span>
                  <span className="mono" style={{fontSize: 11, color: 'var(--accent-text)'}}>S2</span>
                  <span style={{flex: 1}}>An yi shawarwari kan yadda za a inganta hadin gwiwar yan kasuwa <span style={{background: 'var(--warn-soft)', color: 'var(--warn)', padding: '0 3px', borderRadius: 3}}>[ambiguous: aiki / aikin]</span> da hukuma.</span>
                </div>
                <div className="row" style={{gap: 10, marginBottom: 10}}>
                  <span className="mono" style={{color: 'var(--fg-3)', fontSize: 11, minWidth: 44}}>01:05</span>
                  <span className="mono" style={{fontSize: 11, color: 'var(--accent-text)'}}>S1</span>
                  <span style={{flex: 1}}>Bayan haka, an tabbatar da cewa za a aiwatar da matakan tsaro a duk fadin jihar.</span>
                </div>
                <div className="row" style={{gap: 10, marginBottom: 10}}>
                  <span className="mono" style={{color: 'var(--fg-3)', fontSize: 11, minWidth: 44}}>01:48</span>
                  <span className="mono" style={{fontSize: 11, color: 'var(--accent-text)'}}>S3</span>
                  <span style={{flex: 1}}>Mun yi alkawarin cewa za mu ci gaba da hada kai da al'umma don wannan manufa.</span>
                </div>
              </div>
            </div>

            <div className="a-card" style={{flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden'}}>
              <div className="row" style={{padding: '12px 14px', borderBottom: '1px solid var(--border-soft)'}}>
                <div className="mono-meta">ENGLISH TRANSLATION</div>
                <span className="a-pill ok mono" style={{marginLeft: 'auto'}}><span className="dot" />HIGH CONFIDENCE</span>
              </div>
              <div style={{padding: '14px 16px', flex: 1, overflow: 'hidden', fontSize: 13.5, lineHeight: 1.65}}>
                <div className="row" style={{gap: 10, marginBottom: 10}}>
                  <span className="mono" style={{color: 'var(--fg-3)', fontSize: 11, minWidth: 44}}>00:12</span>
                  <span style={{flex: 1}}>On Tuesday, we went to a security officials' meeting in Maiduguri to discuss matters relating to security.</span>
                </div>
                <div className="row" style={{gap: 10, marginBottom: 10}}>
                  <span className="mono" style={{color: 'var(--fg-3)', fontSize: 11, minWidth: 44}}>00:34</span>
                  <span style={{flex: 1}}>Discussions were held on how to strengthen cooperation between traders and the authorities.</span>
                </div>
                <div className="row" style={{gap: 10, marginBottom: 10}}>
                  <span className="mono" style={{color: 'var(--fg-3)', fontSize: 11, minWidth: 44}}>01:05</span>
                  <span style={{flex: 1}}>After that, it was confirmed that security measures would be carried out throughout the state.</span>
                </div>
                <div className="row" style={{gap: 10, marginBottom: 10}}>
                  <span className="mono" style={{color: 'var(--fg-3)', fontSize: 11, minWidth: 44}}>01:48</span>
                  <span style={{flex: 1}}>We have pledged to continue working with the community for this purpose.</span>
                </div>

                <div style={{marginTop: 14, padding: '10px 12px', background: 'var(--warn-soft)', borderRadius: 8, fontSize: 12.5, color: 'var(--fg-2)'}}>
                  <strong style={{display: 'block', marginBottom: 4, color: 'var(--warn)'}}>Notes on ambiguity</strong>
                  At 00:34, the noun form is ambiguous between <span className="a-inlinecode mono">aiki</span> ("work") and <span className="a-inlinecode mono">aikin</span> ("the work of"). Translated as "cooperation between traders and authorities".
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
};

// ===== 9. Forensics Intelligence =====
const ForensicsScreen = ({ theme = 'light', roleId = 'forensics', firstName }) => {
  const r = ROLES[roleId] || ROLES.forensics;
  firstName = firstName || r.name.split(' ')[0];
  const convos = [
    { title: 'NTP-incident · 18 May', active: false },
    { title: 'Auth-fail logs · gateway-01' },
  ];
  return (
    <Shell theme={theme}>
      <Sidebar active="forensics" roleId={roleId} themeName={theme} />
      <div className="a-main">
        <TopBar module="Forensics Intelligence" title="New analysis" themeName={theme} />

        <div className="a-home">
          <div className="a-home__inner">
            <div>
              <div className="a-home__eyebrow">ANDAL FORENSICS INTELLIGENCE</div>
              <h1 className="a-home__title" style={{marginTop: 8}}>Ready for analysis, {firstName}.</h1>
              <p className="a-home__sub" style={{marginTop: 10}}>Upload logs, reports, archives, or forensic artifacts for structured analysis.</p>
            </div>

            <div className="row" style={{gap: 18, alignItems: 'flex-start'}}>
              <div className="a-dz" style={{flex: 1}}>
                <div style={{color: 'var(--fg-3)'}}>{I.upload}</div>
                <div><strong>Drop evidence here</strong> or <span className="a-link">browse files</span></div>
                <div className="a-dz__sub">Findings, evidence references, and outstanding questions will be returned as a structured report.</div>
                <div className="a-dz__types mono">.LOG · .CSV · .JSON · .ZIP · .TAR · .GZ · .PDF · .TXT · .EML</div>
              </div>

              <div className="col" style={{width: 260, gap: 14}}>
                <div className="col" style={{gap: 6}}>
                  <div className="mono-meta">ANALYSIS TYPE</div>
                  <div className="a-card" style={{padding: 4}}>
                    {[
                      ['Auto', 'Detect type from content'],
                      ['Log analysis', 'Auth, system, network'],
                      ['Report summary', 'Long-form PDF/TXT'],
                      ['Artifact summary', 'Disk image, registry'],
                      ['Indicator extraction', 'IPs, hashes, domains'],
                    ].map(([t, sub], i) => (
                      <div key={t} className="row" style={{padding: '8px 10px', borderRadius: 6, background: i === 1 ? 'var(--bg-soft)' : 'transparent', cursor: 'pointer', alignItems:'flex-start'}}>
                        <div className="col" style={{lineHeight: 1.25}}>
                          <span>{t}</span>
                          <span className="mono" style={{fontSize: 10.5, color: 'var(--fg-3)'}}>{sub}</span>
                        </div>
                        {i === 1 && <span style={{marginLeft: 'auto', color: 'var(--accent)'}}>{I.check}</span>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="col" style={{gap: 8}}>
              <div className="mono-meta">RECENT JOBS</div>
              <div className="a-card" style={{overflow: 'hidden'}}>
                <table className="a-table">
                  <thead><tr><th>Evidence</th><th>Type</th><th>Size</th><th>Submitted</th><th>Status</th><th></th></tr></thead>
                  <tbody>
                    <tr>
                      <td><div className="row" style={{gap: 8}}>{I.file}<span>auth-failures-2026-05-18.log</span></div></td>
                      <td>Log analysis</td>
                      <td className="mono" style={{fontSize: 12}}>3.4 MB</td>
                      <td className="mono" style={{fontSize: 12}}>22 May 11:04</td>
                      <td><span className="a-pill ok"><span className="dot" />COMPLETED</span></td>
                      <td><span className="a-link">View result</span></td>
                    </tr>
                    <tr>
                      <td><div className="row" style={{gap: 8}}>{I.folder}<span>incident-bundle-NTP.zip</span></div></td>
                      <td>Auto</td>
                      <td className="mono" style={{fontSize: 12}}>82 MB</td>
                      <td className="mono" style={{fontSize: 12}}>22 May 09:47</td>
                      <td><span className="a-pill warn"><span className="dot" />PROCESSING · 17%</span></td>
                      <td><span className="muted">—</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
};

// ===== Forensics result =====
const ForensicsResultScreen = ({ theme = 'light', roleId = 'forensics' }) => (
  <Shell theme={theme}>
    <Sidebar active="forensics" roleId={roleId} themeName={theme} />
    <div className="a-main">
      <TopBar module="Forensics Intelligence" title="auth-failures-2026-05-18.log · result" themeName={theme}
        actions={<button className="a-btn ghost sm">{I.download}<span>Export report</span></button>} />

      <div style={{flex: 1, padding: '20px 32px', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 14}}>
        <div className="row" style={{gap: 12}}>
          <div className="a-card a-statcard" style={{flex: 1}}><div className="a-statcard__label">EVENTS PARSED</div><div className="a-statcard__val mono">14,302</div><div className="a-statcard__delta">21 hour window · 11 sources</div></div>
          <div className="a-card a-statcard" style={{flex: 1}}><div className="a-statcard__label">FINDINGS</div><div className="a-statcard__val mono">7</div><div className="a-statcard__delta">2 high · 4 medium · 1 informational</div></div>
          <div className="a-card a-statcard" style={{flex: 1}}><div className="a-statcard__label">INDICATORS</div><div className="a-statcard__val mono">12</div><div className="a-statcard__delta">9 IPs · 2 hashes · 1 domain</div></div>
          <div className="a-card a-statcard" style={{flex: 1}}><div className="a-statcard__label">OPEN QUESTIONS</div><div className="a-statcard__val mono">3</div><div className="a-statcard__delta">requires additional evidence</div></div>
        </div>

        <div className="row" style={{flex: 1, minHeight: 0, gap: 14, alignItems: 'stretch'}}>
          <div className="a-card" style={{flex: 1.4, display: 'flex', flexDirection: 'column', overflow:'hidden'}}>
            <div className="row" style={{padding: '12px 14px', borderBottom: '1px solid var(--border-soft)'}}>
              <div className="mono-meta">SUMMARY & FINDINGS</div>
            </div>
            <div style={{padding: '14px 16px', overflow: 'hidden', fontSize: 13.5, lineHeight: 1.6}}>
              <p style={{margin: '0 0 14px', color: 'var(--fg-2)'}}>
                Between 03:14 and 04:08 UTC, gateway-01 logged a coordinated burst of <span className="a-inlinecode mono">SSHD</span> authentication failures across 9 source IPs, targeting two service accounts. Two findings warrant immediate triage.
              </p>

              <div className="col" style={{gap: 10}}>
                {[
                  ['F-01', 'high', 'Brute-force pattern against svc-deploy', '847 failed attempts in 54 minutes from 9 distinct IPs, all 185.x.x.x range. No success.'],
                  ['F-02', 'high', 'Disabled account svc-legacy targeted', '38 attempts against an account disabled in March. Suggests stale credential leak.'],
                  ['F-03', 'med',  'Brief NTP drift on gateway-01', 'Clock drift of 3.2s between 03:12 and 03:14 may affect timestamp correlation downstream.'],
                ].map(([id, sev, t, d]) => (
                  <div key={id} className="row" style={{gap: 12, alignItems: 'flex-start', padding: '10px 12px', border: '1px solid var(--border)', borderRadius: 8}}>
                    <span className="mono" style={{color: 'var(--fg-3)', fontSize: 11, marginTop: 2}}>{id}</span>
                    <span className={`a-pill ${sev === 'high' ? 'danger' : sev === 'med' ? 'warn' : 'muted'} mono`} style={{textTransform: 'uppercase'}}><span className="dot" />{sev === 'high' ? 'HIGH' : sev === 'med' ? 'MED' : 'INFO'}</span>
                    <div className="col" style={{flex: 1, gap: 2}}>
                      <div style={{color: 'var(--fg)', fontWeight: 500}}>{t}</div>
                      <div style={{color: 'var(--fg-3)', fontSize: 12.5}}>{d}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{marginTop: 14, padding: '10px 12px', background: 'var(--bg-soft)', borderRadius: 8, fontSize: 12.5}}>
                <strong style={{display: 'block', marginBottom: 6}}>Outstanding questions</strong>
                <ol style={{margin: 0, paddingLeft: 18, color: 'var(--fg-2)'}}>
                  <li>Why does svc-legacy still appear in IAM history? Confirm with directory audit.</li>
                  <li>Are 185.x.x.x sources observed elsewhere in the perimeter? Pull edge logs.</li>
                  <li>Is the NTP drift correlated with the burst onset or coincidental?</li>
                </ol>
              </div>
            </div>
          </div>

          <div className="a-card" style={{flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden'}}>
            <div className="row" style={{padding: '12px 14px', borderBottom: '1px solid var(--border-soft)'}}>
              <div className="mono-meta">INDICATORS</div>
            </div>
            <table className="a-table">
              <thead><tr><th>Type</th><th>Value</th><th>Hits</th></tr></thead>
              <tbody>
                {[
                  ['ip', '185.213.44.18', 142],
                  ['ip', '185.213.44.19', 119],
                  ['ip', '185.213.44.27', 98],
                  ['ip', '92.118.39.81', 64],
                  ['hash', 'sha256:9a3f…b21c', 1],
                  ['hash', 'sha256:401e…77ad', 1],
                  ['domain', 'mirror-cdn-12.net', 6],
                ].map(([t, v, h]) => (
                  <tr key={v}>
                    <td><span className="a-pill mono">{t.toUpperCase()}</span></td>
                    <td className="mono" style={{fontSize: 12}}>{v}</td>
                    <td className="mono" style={{fontSize: 12, color: 'var(--fg-3)'}}>{h}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </Shell>
);

// ===== 10. Active Knowledge chat =====
const ActiveChatScreen = ({ theme = 'light', roleId = 'rd' }) => {
  const nav = useNav();
  const convos = [
    { title: 'Procurement clause comparison', active: true },
    { title: 'Briefing memo · Q1 review' },
  ];
  return (
    <Shell theme={theme}>
      <Sidebar active="knowledge" roleId={roleId} themeName={theme} />
      <div className="a-main">
        <TopBar module="Knowledge" title="Procurement clause comparison" themeName={theme}
          actions={<><button className="a-btn ghost sm"
            onClick={nav ? () => nav.openModal('clear-session') : undefined}>{I.trash}<span>Clear session</span></button></>} />

        <div className="a-chat">
          <div className="a-chat__scroll">
            <div className="a-msg user">
              <div className="a-msg__avatar user">AB</div>
              <div className="a-msg__body" style={{alignItems: 'flex-end'}}>
                <div className="a-msg__meta mono">13:48 · Adamu</div>
                <div className="a-msg__bubble">
                  Compare clauses 4.2 and 7.1 of these two procurement frameworks and highlight any discrepancy in the supplier obligation language.
                </div>
                <div className="row" style={{marginTop: 6, gap: 6}}>
                  <span className="a-chip"><span className="a-chip__icon">{I.file}</span>NCCC-procurement-2024.pdf <span className="ext">· 1.2 MB</span></span>
                  <span className="a-chip"><span className="a-chip__icon">{I.file}</span>NCCC-procurement-2026-draft.pdf <span className="ext">· 1.4 MB</span></span>
                </div>
              </div>
            </div>

            <div className="a-msg">
              <div className="a-msg__avatar assistant mono">A</div>
              <div className="a-msg__body">
                <div className="a-msg__meta mono">13:48 · Andal Knowledge</div>
                <div className="a-msg__bubble">
                  <p style={{margin: '0 0 10px'}}>Both clauses cover supplier obligations but use different framing. Three substantive discrepancies:</p>
                  <ol style={{margin: '0 0 10px', paddingLeft: 18, lineHeight: 1.65}}>
                    <li><strong>Notification window.</strong> The 2024 framework requires written notice within <span className="a-inlinecode mono">30 days</span> of any subcontracting change; the 2026 draft reduces this to <span className="a-inlinecode mono">14 days</span> and adds an electronic-filing requirement.</li>
                    <li><strong>Liability cap.</strong> 2024 caps supplier liability at the contract value; 2026 introduces a separate clause for data-handling breaches with no stated cap.</li>
                    <li><strong>Audit access.</strong> 2026 adds a right of on-site inspection with 5 business days' notice — not present in 2024.</li>
                  </ol>
                  <p style={{margin: 0}}>The language change in 4.2 is largely tightening; the 7.1 changes materially shift risk allocation toward the supplier.<span className="a-caret" /></p>
                </div>

                <div className="a-msg__actions">
                  <span className="a-msg__action">{I.copy} Copy</span>
                  <span className="a-msg__action">{I.refresh} Regenerate</span>
                  <span className="a-msg__action">{I.bolt} Continue</span>
                </div>
              </div>
            </div>

          </div>

          <div style={{padding: '0 64px 18px'}}>
            <Composer placeholder="Reply or attach more context…" />
            {trustNote}
          </div>
        </div>
      </div>
    </Shell>
  );
};

// Clear session modal
const ClearSessionModal = ({ theme = 'light', roleId = 'rd' }) => (
  <Shell theme={theme}>
    <Sidebar active="knowledge" roleId={roleId} themeName={theme} />
    <div className="a-main" style={{position: 'relative'}}>
      <TopBar module="Knowledge" title="Procurement clause comparison" themeName={theme} />
      <div className="a-chat">
        <div className="a-chat__scroll" style={{opacity: .35, filter: 'blur(.5px)'}}>
          <div className="a-msg user">
            <div className="a-msg__avatar user">AB</div>
            <div className="a-msg__body"><div className="a-msg__bubble">Compare clauses 4.2 and 7.1…</div></div>
          </div>
        </div>
      </div>

      <div className="a-modal-back">
        <div className="a-modal">
          <div className="a-modal__hd">
            <div className="a-modal__title">Clear this conversation?</div>
          </div>
          <div className="a-modal__body">
            The full message history will be removed from your sidebar. Attached files remain in <strong>Files &amp; storage</strong> until deleted there.
          </div>
          <div className="a-modal__ft">
            <button className="a-btn">Cancel</button>
            <button className="a-btn danger">Clear conversation</button>
          </div>
        </div>
      </div>
    </div>
  </Shell>
);

Object.assign(window, { Composer, KnowledgeScreen, CodingScreen, DialectScreen, DialectResultScreen, ForensicsScreen, ForensicsResultScreen, ActiveChatScreen, ClearSessionModal });
