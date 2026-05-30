import { Shell } from '../../components/Shell';
import { useNav } from '../../nav/NavContext';
import type { Theme } from '../../types';
import { AuthLeft } from './AuthLeft';

export const PendingScreen = ({ theme = 'light' }: { theme?: Theme }) => {
  const nav = useNav();
  return (
    <Shell theme={theme}>
      <div className="a-auth">
        <AuthLeft minimal />
        <div className="a-auth__right">
          <div className="a-auth__form">
            <div className="row" style={{ gap: 8 }}>
              <span className="a-pill warn">
                <span className="dot" />
                PENDING
              </span>
              <span className="mono-meta">ACCOUNT · #NEW-04217</span>
            </div>

            <div className="col" style={{ gap: 10 }}>
              <h1 className="a-auth__title">Account pending approval</h1>
              <p className="a-auth__sub" style={{ fontSize: 14, lineHeight: 1.55 }}>
                Your account has been created. An administrator must approve your account and assign
                your department before you can access Andal.
              </p>
            </div>

            <div className="a-card" style={{ padding: 14 }}>
              <div className="mono-meta" style={{ marginBottom: 10 }}>
                NEXT STEPS
              </div>
              <ol
                style={{
                  margin: 0,
                  paddingLeft: 18,
                  color: 'var(--fg-2)',
                  fontSize: 13,
                  lineHeight: 1.7,
                }}
              >
                <li>An administrator reviews your profile.</li>
                <li>Your department and module access are assigned.</li>
                <li>
                  You'll receive a confirmation email at{' '}
                  <span className="mono" style={{ color: 'var(--fg)' }}>
                    a.bashir@nccc.gov.ng
                  </span>
                  .
                </li>
              </ol>
            </div>

            <div className="row" style={{ gap: 8 }}>
              <button className="a-btn" onClick={nav ? () => nav.navigate('/login') : undefined}>
                Return to sign in
              </button>
              <button className="a-btn ghost">Check status</button>
            </div>

            <div className="a-auth__foot">TYPICAL REVIEW · 1 BUSINESS DAY</div>
          </div>
        </div>
      </div>
    </Shell>
  );
};
