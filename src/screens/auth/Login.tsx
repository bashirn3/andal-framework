import { Shell } from '../../components/Shell';
import { useNav } from '../../nav/NavContext';
import { ROLES } from '../../data/roles';
import type { Theme } from '../../types';
import { AuthLeft } from './AuthLeft';

type LoginVariant = 'default' | 'invalid' | 'pending' | 'disabled';

export const LoginScreen = ({
  theme = 'light',
  variant = 'default',
}: {
  theme?: Theme;
  variant?: LoginVariant;
}) => {
  const nav = useNav();
  const onSignIn = () => {
    if (!nav) return;
    const r = ROLES[nav.role];
    // General staff (single workspace) skip the picker.
    if (r.modules.length === 1) nav.navigate('/knowledge');
    else nav.navigate('/welcome');
  };
  const showInvalid = variant === 'invalid';
  const showPending = variant === 'pending';
  const showDisabled = variant === 'disabled';

  return (
    <Shell theme={theme}>
      <div className="a-auth">
        <AuthLeft minimal />
        <div className="a-auth__right">
          <div className="a-auth__form">
            <div className="col" style={{ gap: 6 }}>
              <h1 className="a-auth__title">Sign in to Andal</h1>
              <p className="a-auth__sub">Use your Andal account credentials.</p>
            </div>

            {showInvalid && (
              <div
                className="a-auth__notice"
                style={{
                  borderColor: 'var(--danger)',
                  color: 'var(--danger)',
                  background: 'var(--danger-soft)',
                }}
              >
                The email or password you entered is incorrect.
              </div>
            )}
            {showPending && (
              <div
                className="a-auth__notice"
                style={{ borderColor: 'var(--warn)', color: 'var(--warn)', background: 'var(--warn-soft)' }}
              >
                <strong style={{ display: 'block', marginBottom: 2, color: 'var(--fg)' }}>
                  Account pending approval
                </strong>
                Your account is awaiting administrator review. You'll receive an email once it is
                approved.
              </div>
            )}
            {showDisabled && (
              <div
                className="a-auth__notice"
                style={{ borderColor: 'var(--danger)', background: 'var(--danger-soft)' }}
              >
                <strong style={{ display: 'block', marginBottom: 2, color: 'var(--fg)' }}>
                  Account disabled
                </strong>
                Contact a platform administrator to restore access.
              </div>
            )}

            <div className="col" style={{ gap: 14 }}>
              <div className="a-field">
                <label className="a-label">Work email</label>
                <input className={`a-input ${showInvalid ? 'error' : ''}`} defaultValue="a.bashir@nccc.gov.ng" />
              </div>
              <div className="a-field">
                <div className="row" style={{ justifyContent: 'space-between' }}>
                  <label className="a-label">Password</label>
                  <span className="a-link" style={{ fontSize: 12 }}>
                    Forgot password?
                  </span>
                </div>
                <input
                  type="password"
                  className={`a-input ${showInvalid ? 'error' : ''}`}
                  defaultValue="••••••••••••"
                />
              </div>
            </div>

            <button className="a-btn primary lg" style={{ width: '100%' }} onClick={onSignIn}>
              Sign in
            </button>

            <div className="a-auth__divider">or</div>
            <div className="row" style={{ justifyContent: 'center', fontSize: 13, color: 'var(--fg-2)' }}>
              New to Andal?&nbsp;
              <span className="a-link" onClick={nav ? () => nav.navigate('/signup') : undefined}>
                Create account
              </span>
            </div>

            <div className="a-auth__foot">FOR NCCC INTERNAL USE ONLY.</div>
          </div>
        </div>
      </div>
    </Shell>
  );
};
