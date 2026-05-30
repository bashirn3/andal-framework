import { Shell } from '../../components/Shell';
import { useNav } from '../../nav/NavContext';
import type { Theme } from '../../types';
import { AuthLeft } from './AuthLeft';

type SignupVariant = 'default' | 'mismatch' | 'exists';

export const SignupScreen = ({
  theme = 'light',
  variant = 'default',
}: {
  theme?: Theme;
  variant?: SignupVariant;
}) => {
  const nav = useNav();
  const showMismatch = variant === 'mismatch';
  const showExists = variant === 'exists';

  return (
    <Shell theme={theme}>
      <div className="a-auth">
        <AuthLeft minimal />
        <div className="a-auth__right">
          <div className="a-auth__form" style={{ maxWidth: 400 }}>
            <div className="col" style={{ gap: 6 }}>
              <h1 className="a-auth__title">Create an Andal account</h1>
              <p className="a-auth__sub">
                Your account will require admin approval before you can access Andal.
              </p>
            </div>

            {showExists && (
              <div
                className="a-auth__notice"
                style={{ borderColor: 'var(--danger)', background: 'var(--danger-soft)' }}
              >
                An account with this email already exists. <span className="a-link">Sign in instead</span>.
              </div>
            )}

            <div className="col" style={{ gap: 12 }}>
              <div className="a-field">
                <label className="a-label">Full name</label>
                <input className="a-input" defaultValue="Adamu Bashir" />
              </div>
              <div className="a-field">
                <label className="a-label">Work email</label>
                <input className={`a-input ${showExists ? 'error' : ''}`} defaultValue="a.bashir@nccc.gov.ng" />
              </div>
              <div className="a-field">
                <label className="a-label">
                  Staff ID <span style={{ color: 'var(--fg-4)' }}>· optional</span>
                </label>
                <input className="a-input mono" placeholder="e.g. NCCC-04217" />
              </div>
              <div className="row" style={{ gap: 10 }}>
                <div className="a-field" style={{ flex: 1 }}>
                  <label className="a-label">Password</label>
                  <input
                    type="password"
                    className={`a-input ${showMismatch ? 'error' : ''}`}
                    defaultValue="••••••••••"
                  />
                </div>
                <div className="a-field" style={{ flex: 1 }}>
                  <label className="a-label">Confirm</label>
                  <input
                    type="password"
                    className={`a-input ${showMismatch ? 'error' : ''}`}
                    defaultValue="••••••••"
                  />
                </div>
              </div>
              {showMismatch && <div className="a-help error">Passwords do not match.</div>}
            </div>

            <div className="a-auth__notice">
              An administrator will assign your department and module access. You won't be asked to
              choose those here.
            </div>

            <button
              className="a-btn primary lg"
              style={{ width: '100%' }}
              onClick={nav ? () => nav.navigate('/pending') : undefined}
            >
              Create account
            </button>

            <div className="row" style={{ justifyContent: 'center', fontSize: 13, color: 'var(--fg-2)' }}>
              Already have an account?&nbsp;
              <span className="a-link" onClick={nav ? () => nav.navigate('/login') : undefined}>
                Sign in
              </span>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
};
