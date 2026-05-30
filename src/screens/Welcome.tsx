import type { ReactNode } from 'react';
import { Shell } from '../components/Shell';
import { I } from '../components/icons';
import { useNav } from '../nav/NavContext';
import { CONVOS, MODULES, ROLES } from '../data/roles';
import type { ModuleId, RoleId, Theme } from '../types';

const MODULE_META: Record<ModuleId, { name: string; icon: ReactNode; desc: string }> = {
  knowledge: {
    name: 'Knowledge',
    icon: I.book,
    desc: 'Draft, summarize, compare, and translate. Ground any answer in a document you attach.',
  },
  coding: {
    name: 'Coding',
    icon: I.code,
    desc: 'Review code, refactor, generate tests, and explain unfamiliar stacks.',
  },
  dialect: {
    name: 'Dialect',
    icon: I.voice,
    desc: 'Transcribe and translate Hausa, Kanuri, and Fulfulde audio or video.',
  },
  forensics: {
    name: 'Forensics Intelligence',
    icon: I.shield,
    desc: 'Analyze logs, reports, and forensic artifacts. Extract indicators and structured findings.',
  },
};

// Hour-aware greeting just for readable demo copy.
const greeting = (h = 13) => {
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
};

export const WelcomeScreen = ({
  theme = 'light',
  roleId = 'rd',
}: {
  theme?: Theme;
  roleId?: RoleId;
}) => {
  const r = ROLES[roleId] || ROLES.rd;
  const nav = useNav();
  const visible = MODULES.filter((m) => r.modules.includes(m.id));
  const firstName = r.name.split(' ')[0];

  return (
    <Shell theme={theme}>
      <div className="a-welcome">
        <div className="a-welcome__hd">
          <div className="a-logo">A</div>
          <div className="col" style={{ lineHeight: 1.1 }}>
            <div className="a-brand-text">Andal</div>
            <div className="a-brand-sub mono">NCCC · v1.0</div>
          </div>
          <div className="row" style={{ marginLeft: 'auto', gap: 12 }}>
            <span className="mono-meta">{r.dept.toUpperCase()}</span>
            <span style={{ width: 1, height: 16, background: 'var(--border)' }} />
            <div className="row" style={{ gap: 10 }}>
              <div className="a-avatar mono" style={{ width: 26, height: 26, fontSize: 10 }}>
                {r.initials}
              </div>
              <div className="col" style={{ lineHeight: 1.2 }}>
                <div style={{ fontSize: 12.5 }}>{r.name}</div>
                <div className="mono" style={{ fontSize: 10, color: 'var(--fg-3)' }}>
                  {r.role}
                </div>
              </div>
            </div>
            <button className="a-btn ghost icon" onClick={nav ? () => nav.navigate('/login') : undefined}>
              {I.signout}
            </button>
          </div>
        </div>

        <div className="a-welcome__body">
          <div className="a-welcome__greet">
            <span className="mono-meta">22 MAY · 13:42 · WAT</span>
            <h1>
              {greeting()}, {firstName}.
            </h1>
            <p>Pick a workspace to continue, or jump back into a recent thread.</p>
          </div>

          <div className="a-welcome__grid">
            {visible.map((m) => {
              const meta = MODULE_META[m.id];
              const recents = (CONVOS[m.id] || []).slice(0, 3);
              return (
                <div
                  key={m.id}
                  className="a-mcard"
                  onClick={nav ? () => nav.navigate('/' + m.id) : undefined}
                >
                  <div className="a-mcard__hd">
                    <div className="a-mcard__ico">{meta.icon}</div>
                    <div className="col" style={{ flex: 1, minWidth: 0 }}>
                      <div className="a-mcard__name">{meta.name}</div>
                      <div className="a-mcard__desc">{meta.desc}</div>
                    </div>
                  </div>

                  {recents.length > 0 && (
                    <div className="a-mcard__recents">
                      <div className="a-mcard__recents-hd">Recent</div>
                      {recents.map((c, i) => (
                        <div key={i} className="a-mcard__recent">
                          <span style={{ color: 'var(--fg-4)' }}>{I.clock}</span>
                          <span
                            style={{
                              flex: 1,
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {c.title}
                          </span>
                          <span className="a-mcard__recent-time">{c.time}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="a-mcard__ft">
                    <span>{(CONVOS[m.id] || []).length} threads</span>
                    <span className="a-mcard__cta">Open {I.arrow}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="a-welcome__ft">
          <span>STORAGE · 110 / 500 MB</span>
          <span style={{ marginLeft: 'auto' }}>BUILT BY R&amp;D AND NCCC</span>
        </div>
      </div>
    </Shell>
  );
};
