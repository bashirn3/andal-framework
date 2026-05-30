import { I } from '../../components/icons';

// Left panel of the auth split-screen.
// `minimal` (login) shows just the ONSA + NCCC logo placeholders.
export const AuthLeft = ({ minimal = false }: { minimal?: boolean }) => {
  if (minimal) {
    return (
      <div className="a-auth__left a-auth__left--minimal">
        <div className="a-auth__logos">
          <div className="a-auth__logo-block">
            <div className="a-logo-stamp-lg mono">
              ONSA
              <br />
              LOGO
            </div>
            <div className="mono-meta">ONSA</div>
          </div>
          <div className="a-auth__logo-divider" />
          <div className="a-auth__logo-block">
            <div className="a-logo-stamp-lg mono">
              NCCC
              <br />
              LOGO
            </div>
            <div className="mono-meta">NCCC</div>
          </div>
        </div>
        <div style={{ marginTop: 'auto' }}>
          <div className="a-auth__meta">
            <span>BUILT BY R&amp;D AND NCCC</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="a-auth__left">
      <div className="a-auth__brandrow">
        <div className="a-logo">A</div>
        <div className="col" style={{ lineHeight: 1.1 }}>
          <div className="a-brand-text">Andal</div>
          <div className="a-brand-sub mono">NCCC · v1.0</div>
        </div>
        <div className="row" style={{ marginLeft: 'auto', gap: 6 }}>
          <span className="a-logo-stamp mono">ONSA LOGO</span>
          <span className="a-logo-stamp mono">NCCC LOGO</span>
        </div>
      </div>

      <div className="a-auth__quote">
        <h2>Andal.</h2>
        <p>The NCCC internal AI workspace.</p>
      </div>

      <div className="col" style={{ gap: 10, marginTop: 32 }}>
        {[
          [I.book, 'Knowledge', 'Draft, summarize, compare, translate.'],
          [I.code, 'Coding', 'Review, refactor, generate tests.'],
          [I.voice, 'Dialect', 'Hausa, Kanuri, Fulfulde — transcribed and translated.'],
          [I.shield, 'Forensics Intelligence', 'Logs, reports, artifacts — structured into findings.'],
        ].map(([icon, name, desc], i) => (
          <div className="row" key={i} style={{ gap: 12, alignItems: 'flex-start' }}>
            <span style={{ color: 'var(--fg-3)', marginTop: 2 }}>{icon}</span>
            <div className="col" style={{ lineHeight: 1.35 }}>
              <span style={{ fontSize: 14 }}>{name}</span>
              <span style={{ fontSize: 12.5, color: 'var(--fg-3)' }}>{desc}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 'auto' }}>
        <div className="a-auth__meta">
          <span>BUILT BY R&amp;D AND NCCC</span>
        </div>
      </div>
    </div>
  );
};
